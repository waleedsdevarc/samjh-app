import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { createClient } from '@libsql/client';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Falls back to a local SQLite file when no Turso credentials are set (local dev).
// In production, set TURSO_DATABASE_URL + TURSO_AUTH_TOKEN so data survives redeploys.
const db = createClient({
  url: process.env.TURSO_DATABASE_URL || `file:${join(__dirname, 'usage.db')}`,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

await db.execute(`
  CREATE TABLE IF NOT EXISTS calculations (
    id               INTEGER PRIMARY KEY AUTOINCREMENT,
    cows             INTEGER NOT NULL DEFAULT 0,
    buffaloes        INTEGER NOT NULL DEFAULT 0,
    goats            INTEGER NOT NULL DEFAULT 0,
    lpg_price        INTEGER NOT NULL DEFAULT 250,
    monthly_savings  INTEGER NOT NULL,
    annual_savings   INTEGER NOT NULL,
    fertilizer_value INTEGER NOT NULL,
    is_seasonal      INTEGER NOT NULL DEFAULT 0,
    created_at       TEXT NOT NULL DEFAULT (datetime('now'))
  )
`);

// ── TTS cache (capped at 300 entries) ────────────────────────────────────────
const TTS_CACHE_MAX = 300;
const ttsCache = new Map();
function ttsCacheSet(key, value) {
  if (ttsCache.size >= TTS_CACHE_MAX) {
    ttsCache.delete(ttsCache.keys().next().value); // evict oldest
  }
  ttsCache.set(key, value);
}

// ── Rate limiters ─────────────────────────────────────────────────────────────
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later.' },
});

const adminLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many admin attempts. Try again in 15 minutes.' },
  skipSuccessfulRequests: true, // only failed attempts count toward the limit
});

const ttsLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'TTS rate limit reached. Please wait.' },
});

// ── CORS ──────────────────────────────────────────────────────────────────────
// ALLOWED_ORIGIN accepts one or more comma-separated origins, e.g.
// "https://samjh.site,https://www.samjh.site,https://samjh-app.netlify.app"
const allowedOrigins = (process.env.ALLOWED_ORIGIN || 'http://localhost:5173')
  .split(',')
  .map(o => o.trim());
const app = express();
app.use(cors({
  origin: (origin, cb) => {
    // Allow requests with no origin (curl, server-to-server) only in dev
    if (!origin && process.env.NODE_ENV !== 'production') return cb(null, true);
    if (allowedOrigins.includes(origin)) return cb(null, true);
    cb(new Error('Not allowed by CORS'));
  },
}));

// ── Body parsing — 10 kb hard cap ────────────────────────────────────────────
app.use(express.json({ limit: '10kb' }));

// ── Apply general limiter to all routes ──────────────────────────────────────
app.use(generalLimiter);

// ── Auth helper (reads key from Authorization header) ─────────────────────────
function getAdminKey(req) {
  const auth = req.headers.authorization || '';
  return auth.startsWith('Bearer ') ? auth.slice(7) : null;
}

function requireAdmin(req, res, next) {
  const provided = getAdminKey(req);
  const expected = process.env.ADMIN_KEY;
  if (!expected || expected === 'change-this-to-something-secret') {
    return res.status(500).json({ error: 'Server misconfigured: ADMIN_KEY not set' });
  }
  if (!provided || provided !== expected) {
    return res.status(401).json({ error: 'Unauthorised' });
  }
  next();
}

// ── Input validation helpers ──────────────────────────────────────────────────
function toInt(val, def, min, max) {
  const n = Number.isInteger(val) ? val : parseInt(val, 10);
  if (isNaN(n)) return def;
  return Math.min(max, Math.max(min, n));
}

function toPositiveNum(val, max = 10_000_000) {
  const n = parseFloat(val);
  if (isNaN(n) || n < 0) return 0;
  return Math.min(n, max);
}

// ── TTS endpoint ──────────────────────────────────────────────────────────────
app.post('/api/tts', ttsLimiter, async (req, res) => {
  const { text } = req.body;
  if (typeof text !== 'string' || !text.trim()) {
    return res.status(400).json({ error: 'text must be a non-empty string' });
  }
  if (text.length > 2000) {
    return res.status(400).json({ error: 'text too long (max 2000 characters)' });
  }

  const cacheKey = text.trim();
  if (ttsCache.has(cacheKey)) {
    return res.json({ audio: ttsCache.get(cacheKey), cached: true });
  }

  const CHUNK = 180;
  const words = cacheKey.split(' ');
  const chunks = [];
  let current = '';
  for (const word of words) {
    if ((current + ' ' + word).trim().length > CHUNK) {
      if (current) chunks.push(current.trim());
      current = word;
    } else {
      current = (current + ' ' + word).trim();
    }
  }
  if (current) chunks.push(current.trim());

  // Guard against degenerate input producing too many chunks
  if (chunks.length > 20) {
    return res.status(400).json({ error: 'text produces too many chunks' });
  }

  try {
    const audioBuffers = [];
    for (const chunk of chunks) {
      const url = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=ur&q=${encodeURIComponent(chunk)}`;
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36',
          'Referer': 'https://translate.google.com/',
        },
      });

      if (!response.ok) {
        console.error('[TTS] Google Translate error:', response.status);
        return res.status(502).json({ error: 'TTS fetch failed' });
      }

      const arrayBuffer = await response.arrayBuffer();
      audioBuffers.push(Buffer.from(arrayBuffer));
    }

    const combined = Buffer.concat(audioBuffers);
    const base64 = combined.toString('base64');
    ttsCacheSet(cacheKey, base64);
    res.json({ audio: base64 });
  } catch (err) {
    console.error('[TTS] Network error:', err.message);
    res.status(502).json({ error: 'Network error reaching TTS' });
  }
});

// ── Calculation logging ───────────────────────────────────────────────────────
app.post('/api/calculate', async (req, res) => {
  const body = req.body;
  if (!body || typeof body !== 'object') {
    return res.status(400).json({ error: 'Invalid request body' });
  }

  const cows      = toInt(body.cows,      0,   0,  50);
  const buffaloes = toInt(body.buffaloes, 0,   0,  50);
  const goats     = toInt(body.goats,     0,   0,  50);
  const lpgPrice  = toInt(body.lpgPrice,  250, 150, 400);

  const monthlySavings  = toPositiveNum(body.monthlySavings);
  const annualSavings   = toPositiveNum(body.annualSavings);
  const fertilizerValue = toPositiveNum(body.fertilizerValue);

  if (body.monthlySavings == null || body.annualSavings == null) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const isSeasonal = body.isSeasonal ? 1 : 0;

  try {
    await db.execute({
      sql: `INSERT INTO calculations (cows, buffaloes, goats, lpg_price, monthly_savings, annual_savings, fertilizer_value, is_seasonal)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [cows, buffaloes, goats, lpgPrice, monthlySavings, annualSavings, fertilizerValue, isSeasonal],
    });
    res.json(await getStats());
  } catch (err) {
    console.error('[DB] insert error:', err.message);
    res.status(500).json({ error: 'Failed to save calculation' });
  }
});

app.get('/api/stats', async (_req, res) => res.json(await getStats()));

// ── Admin: view records (rate-limited, key via Authorization header) ──────────
app.get('/api/records', adminLimiter, requireAdmin, async (_req, res) => {
  const result = await db.execute('SELECT * FROM calculations ORDER BY created_at DESC');
  res.json(result.rows);
});

// ── Admin: reset data (rate-limited, key via Authorization header) ────────────
app.delete('/api/reset', adminLimiter, requireAdmin, async (_req, res) => {
  await db.execute('DELETE FROM calculations');
  await db.execute("DELETE FROM sqlite_sequence WHERE name='calculations'");
  console.log('[Admin] Data reset');
  res.json({ ok: true, message: 'All records deleted' });
});

async function getStats() {
  const result = await db.execute(`
    SELECT
      COUNT(*)             AS totalUses,
      SUM(annual_savings)  AS totalAnnualSavings,
      SUM(monthly_savings) AS totalMonthlySavings,
      AVG(annual_savings)  AS avgAnnualSavings,
      SUM(cows)            AS totalCows,
      SUM(buffaloes)       AS totalBuffaloes,
      SUM(goats)           AS totalGoats
    FROM calculations
  `);
  const row = result.rows[0];

  return {
    totalUses:           Number(row.totalUses || 0),
    totalAnnualSavings:  Math.round(row.totalAnnualSavings || 0),
    totalMonthlySavings: Math.round(row.totalMonthlySavings || 0),
    avgAnnualSavings:    Math.round(row.avgAnnualSavings || 0),
    totalAnimals: {
      cows:      Number(row.totalCows || 0),
      buffaloes: Number(row.totalBuffaloes || 0),
      goats:     Number(row.totalGoats || 0),
    },
  };
}

const PORT = process.env.API_PORT || 3001;
app.listen(PORT, () => {
  const keyOk = process.env.ADMIN_KEY && process.env.ADMIN_KEY !== 'change-this-to-something-secret';
  console.log(`سمجھ API → http://localhost:${PORT}`);
  console.log(`✅  Urdu TTS: Google Translate proxy active`);
  console.log(keyOk ? '✅  ADMIN_KEY: set' : '⚠️  ADMIN_KEY: using insecure default — set it in .env');
  console.log(`✅  CORS origins: ${allowedOrigins.join(', ')}`);
});
