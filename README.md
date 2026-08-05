# سمجھ (Samjh): biogas savings calculator

A bilingual Urdu/English web app that estimates how much a household in rural Punjab could save on cooking fuel and fertilizer by installing a biogas digester, based on the number of cows, buffalo, and goats they own.

Live at: https://samjh.site

## What it does

A user picks how many cows, buffalo, and goats they have. The app converts that into daily dung output, daily and monthly biogas yield, LPG-equivalent savings at the current market price, and the value of the leftover digestate as organic fertilizer. Results can be read aloud in Urdu through text-to-speech, since the target audience includes people who may not read comfortably.

The app also includes:

- A step-by-step guide to building and operating a small household biogas unit, with diagrams
- A page explaining why switching to biogas matters (cost, health, environment)
- A password-protected admin view at `/admin` that logs every calculation run through the app, so usage can be tracked over time

## The math

All of it lives in `src/utils/calculations.js`. The core numbers per animal, per day:

| Animal | Dung (kg/day) | Biogas yield (m³ per kg dung) |
|---|---|---|
| Cow | 15 | 0.025 |
| Buffalo | 9.5 | 0.075 |
| Goat | 1.75 | 0.35 |

From there:

1. Daily biogas = dung × yield, summed across all animals the user entered
2. Monthly biogas = daily biogas × 30
3. LPG equivalent (kg/month) = monthly biogas ÷ 1.9 (1.9 m³ of biogas replaces roughly 1 kg of LPG)
4. Monthly LPG savings = LPG equivalent × the user's LPG price (a slider, since local prices vary)
5. Monthly digestate = daily dung × 1.5 × 30 (the slurry byproduct increases in volume once mixed with water)
6. Fertilizer value = digestate × ₨15/kg
7. Total savings = LPG savings + fertilizer value, monthly and annualized

The coefficients come from [`docs/biogas-coefficients.xlsx`](docs/biogas-coefficients.xlsx), sourced from peer-reviewed research (University of Punjab 2018, MDPI 2021, Springer 2022). Citations are in the `Sources & Notes` sheet of that file.

## Stack

| Layer | Tech |
|---|---|
| Frontend | React 19, Vite, Tailwind CSS |
| Backend | Express |
| Database | Turso (hosted SQLite, via `@libsql/client`) |
| Text-to-speech | Google Translate TTS, proxied through the backend to avoid exposing the endpoint directly; falls back to the browser's Web Speech API if that fails |

## Project layout

```
samjh-app/
├── server.js                   Express API: calculation logging, TTS proxy, admin auth
├── netlify.toml                SPA redirect config so /admin doesn't 404 on Netlify
└── src/
    ├── App.jsx                 Tab navigation and the /admin route
    ├── components/
    │   ├── AnimalSelector.jsx  Screen 1: pick animal counts
    │   ├── ResultsCard.jsx     Screen 2: savings breakdown, LPG price slider, TTS
    │   ├── AdminDashboard.jsx  /admin: view, export, and reset logged calculations
    │   ├── GuideScreen.jsx     Build/operate guide
    │   └── WhyScreen.jsx       Why-biogas explainer
    └── utils/
        ├── calculations.js     All the math described above
        ├── speech.js           TTS logic, Urdu number-to-words conversion
        └── api.js              fetch wrappers for the backend
```

## Running it locally

Requires Node 18 or newer.

```bash
npm install

# terminal 1
node server.js

# terminal 2
npm run dev
```

Frontend runs at `localhost:5173`, backend at `localhost:3001`, admin at `localhost:5173/admin`.

Create a `.env` file in the project root for the backend:

```
API_PORT=3001
ADMIN_KEY=pick-a-password
ALLOWED_ORIGIN=http://localhost:5173
```

And a `.env` for the frontend (Vite reads this from the same root):

```
VITE_API_URL=http://localhost:3001
```

Without `TURSO_DATABASE_URL` and `TURSO_AUTH_TOKEN` set, the backend falls back to a local SQLite file (`usage.db`) automatically, so local development doesn't need a hosted database.

## Deployment

The live site runs on Netlify (frontend) and Render (backend), both connected to this repo with auto-deploy on push to `main`. The database is a free Turso instance, set via `TURSO_DATABASE_URL` and `TURSO_AUTH_TOKEN` on Render, so calculation history survives backend redeploys.

## License

MIT. See [LICENSE](LICENSE).
