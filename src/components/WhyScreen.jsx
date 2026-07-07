// ── SVG: Before/After Monthly Spend ─────────────────────────────────────────

function BeforeAfterSVG() {
  return (
    <svg viewBox="0 0 320 200" className="w-full rounded-xl" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="320" height="200" fill="#f9fafb" rx="12"/>

      {/* Y-axis label */}
      <text x="12" y="18" fontSize="9" fill="#6b7280" fontFamily="sans-serif">₨ / month</text>

      {/* Gridlines */}
      {[0, 25, 50, 75, 100].map(pct => {
        const y = 170 - pct * 1.3;
        return (
          <g key={pct}>
            <line x1="40" y1={y} x2="290" y2={y} stroke="#e5e7eb" strokeWidth="1"/>
            <text x="36" y={y + 3} textAnchor="end" fontSize="8" fill="#9ca3af" fontFamily="sans-serif">
              {pct === 100 ? '₨3k' : pct === 75 ? '₨2.2k' : pct === 50 ? '₨1.5k' : pct === 25 ? '₨750' : '0'}
            </text>
          </g>
        );
      })}

      {/* Without biogas bar (tall, red) */}
      <rect x="80" y="40" width="70" height="130" fill="#ef4444" rx="6"/>
      <text x="115" y="35" textAnchor="middle" fontSize="9" fill="#dc2626" fontFamily="sans-serif" fontWeight="bold">₨3,000</text>
      <text x="115" y="185" textAnchor="middle" fontSize="8" fill="#374151" fontFamily="sans-serif">Without Biogas</text>
      <text x="115" y="196" textAnchor="middle" fontSize="8" fill="#374151" fontFamily="sans-serif" className="urdu">بائیو گیس کے بغیر</text>

      {/* With biogas bar (tiny, green) */}
      <rect x="180" y="157" width="70" height="13" fill="#16a34a" rx="6"/>
      <text x="215" y="150" textAnchor="middle" fontSize="9" fill="#15803d" fontFamily="sans-serif" fontWeight="bold">₨300</text>
      <text x="215" y="185" textAnchor="middle" fontSize="8" fill="#374151" fontFamily="sans-serif">With Biogas</text>
      <text x="215" y="196" textAnchor="middle" fontSize="8" fill="#374151" fontFamily="sans-serif" className="urdu">بائیو گیس کے ساتھ</text>

      {/* 90% off badge */}
      <rect x="243" y="55" width="52" height="28" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" rx="8"/>
      <text x="269" y="67" textAnchor="middle" fontSize="10" fill="#92400e" fontFamily="sans-serif" fontWeight="bold">↓ 90%</text>
      <text x="269" y="78" textAnchor="middle" fontSize="8" fill="#92400e" fontFamily="sans-serif">less cost</text>
    </svg>
  );
}

// ── SVG: Smoke vs Clean Flame ────────────────────────────────────────────────

function SmokeVsCleanSVG() {
  return (
    <svg viewBox="0 0 320 180" className="w-full rounded-xl" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="320" height="180" fill="#f9fafb" rx="12"/>

      {/* Divider */}
      <line x1="160" y1="10" x2="160" y2="175" stroke="#d1d5db" strokeWidth="1.5" strokeDasharray="5,4"/>

      {/* ── LEFT: Firewood ── */}
      {/* Smoke clouds */}
      {[
        { cx: 78, cy: 42, r: 14 },
        { cx: 62, cy: 30, r: 11 },
        { cx: 88, cy: 22, r: 13 },
        { cx: 72, cy: 12, r: 10 },
        { cx: 95, cy: 10, r: 9 },
      ].map(({ cx, cy, r }, i) => (
        <circle key={i} cx={cx} cy={cy} r={r} fill="#9ca3af" opacity="0.65"/>
      ))}
      {/* Flames */}
      <ellipse cx="78" cy="100" rx="18" ry="24" fill="#f97316" opacity="0.9"/>
      <ellipse cx="78" cy="98" rx="10" ry="16" fill="#fbbf24"/>
      {/* Logs */}
      <rect x="52" y="120" width="52" height="10" fill="#92400e" rx="3"/>
      <rect x="58" y="116" width="40" height="8" fill="#78350f" rx="3"/>
      {/* Labels */}
      <text x="78" y="148" textAnchor="middle" fontSize="9" fill="#374151" fontFamily="sans-serif" fontWeight="bold">🪵 Wood / Kerosene</text>
      <text x="78" y="160" textAnchor="middle" fontSize="8" fill="#ef4444" fontFamily="sans-serif">Smoke · Soot · Ash</text>
      <text x="78" y="172" textAnchor="middle" fontSize="8" fill="#ef4444" fontFamily="sans-serif" className="urdu">دھواں · کالک · راکھ</text>

      {/* ── RIGHT: Biogas ── */}
      {/* Clean air (no smoke) */}
      <text x="242" y="20" textAnchor="middle" fontSize="10" fill="#d1fae5" fontFamily="sans-serif">✨ ✨ ✨</text>
      {/* Blue clean flame */}
      <ellipse cx="242" cy="100" rx="18" ry="24" fill="#3b82f6" opacity="0.85"/>
      <ellipse cx="242" cy="98" rx="10" ry="16" fill="#93c5fd"/>
      {/* Burner ring */}
      <ellipse cx="242" cy="122" rx="24" ry="8" fill="#6b7280" stroke="#374151" strokeWidth="1.5"/>
      <ellipse cx="242" cy="122" rx="16" ry="5" fill="#4b5563"/>
      {/* Pipe */}
      <rect x="235" y="128" width="14" height="18" fill="#6b7280" rx="2"/>
      {/* Labels */}
      <text x="242" y="158" textAnchor="middle" fontSize="9" fill="#374151" fontFamily="sans-serif" fontWeight="bold">🔵 Biogas</text>
      <text x="242" y="169" textAnchor="middle" fontSize="8" fill="#16a34a" fontFamily="sans-serif">Clean · Blue · Zero smoke</text>
      <text x="242" y="179" textAnchor="middle" fontSize="8" fill="#16a34a" fontFamily="sans-serif" className="urdu">صاف · نیلا · بغیر دھویں</text>
    </svg>
  );
}

// ── SVG: LPG Price Trend ──────────────────────────────────────────────────────

function LpgTrendSVG() {
  const years = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];
  const prices = [85, 98, 112, 130, 148, 165, 190, 220, 255, 285];
  const W = 300, H = 160, PAD_L = 38, PAD_B = 30, PAD_T = 20, PAD_R = 15;
  const chartW = W - PAD_L - PAD_R;
  const chartH = H - PAD_B - PAD_T;
  const minP = 0, maxP = 320;

  const toX = (i) => PAD_L + (i / (years.length - 1)) * chartW;
  const toY = (p) => PAD_T + chartH - ((p - minP) / (maxP - minP)) * chartH;

  const points = prices.map((p, i) => `${toX(i)},${toY(p)}`).join(' ');

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full rounded-xl bg-gray-50" xmlns="http://www.w3.org/2000/svg">
      {/* Gridlines */}
      {[0, 100, 200, 300].map(p => (
        <g key={p}>
          <line x1={PAD_L} y1={toY(p)} x2={W - PAD_R} y2={toY(p)} stroke="#e5e7eb" strokeWidth="1"/>
          <text x={PAD_L - 4} y={toY(p) + 3} textAnchor="end" fontSize="8" fill="#9ca3af" fontFamily="sans-serif">
            {p === 0 ? '0' : `₨${p}`}
          </text>
        </g>
      ))}

      {/* Area fill */}
      <polygon
        points={`${toX(0)},${toY(0)} ${points} ${toX(years.length - 1)},${toY(0)}`}
        fill="#fca5a5" opacity="0.3"
      />

      {/* Line */}
      <polyline points={points} fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinejoin="round"/>

      {/* Data points */}
      {prices.map((p, i) => (
        <circle key={i} cx={toX(i)} cy={toY(p)} r="3" fill="#dc2626"/>
      ))}

      {/* Year labels (every 2nd) */}
      {years.map((y, i) => (
        i % 2 === 0 && (
          <text key={y} x={toX(i)} y={H - PAD_B + 14} textAnchor="middle" fontSize="8" fill="#6b7280" fontFamily="sans-serif">
            {y}
          </text>
        )
      ))}

      {/* Final value callout */}
      <rect x={toX(9) - 28} y={toY(285) - 20} width="56" height="17" fill="#fef2f2" stroke="#ef4444" strokeWidth="1" rx="4"/>
      <text x={toX(9)} y={toY(285) - 8} textAnchor="middle" fontSize="9" fill="#dc2626" fontFamily="sans-serif" fontWeight="bold">₨285/kg</text>

      {/* Y-axis title */}
      <text x="8" y="60" fontSize="8" fill="#9ca3af" fontFamily="sans-serif" transform="rotate(-90,8,60)">₨ per kg</text>
    </svg>
  );
}

// ── Section Card ──────────────────────────────────────────────────────────────

function WhyCard({ emoji, title, urdu, children }) {
  return (
    <div className="bg-white rounded-2xl shadow-md mb-5 overflow-hidden">
      <div className="bg-green-800 px-5 py-3 flex items-center gap-3">
        <span className="text-2xl">{emoji}</span>
        <div>
          <p className="text-white font-bold urdu text-lg" dir="rtl">{urdu}</p>
          <p className="text-green-300 text-xs">{title}</p>
        </div>
      </div>
      <div className="px-5 py-4">{children}</div>
    </div>
  );
}

function StatCard({ value, label, urdu, color }) {
  return (
    <div className={`rounded-xl p-4 text-center border-2 ${color}`}>
      <p className="text-3xl font-black">{value}</p>
      <p className="text-xs font-semibold mt-1">{label}</p>
      <p className="text-xs urdu opacity-75" dir="rtl">{urdu}</p>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function WhyScreen() {
  return (
    <div className="bg-green-50 min-h-screen pb-8">
      {/* Header */}
      <div className="text-center pt-5 pb-3 px-4">
        <h1 className="text-2xl font-bold text-green-900">💡 کیوں؟</h1>
        <p className="text-gray-500 text-sm">Why Switch to Biogas?</p>
        <p className="text-xs text-gray-600 mt-1">ہمیں اپنی عادات کیوں بدلنی چاہییں</p>
      </div>

      <div className="px-4">

        {/* ── 1. Real Savings ── */}
        <WhyCard emoji="💰" title="Real Savings — The Numbers" urdu="اصل بچت — اعداد و شمار">
          <p className="text-sm text-gray-700 mb-4">
            گاؤں کا ہر گھر ہر مہینے گیس سلنڈر، لکڑی یا مٹی کے تیل پر پیسے خرچ کرتا ہے۔ بائیو گیس یونٹ آپ کے جانوروں کے گوبر کو <strong>مفت ایندھن</strong> میں بدل دیتا ہے — اور باقی مواد <strong>مفت کھاد</strong> بن جاتا ہے۔
          </p>
          <p className="text-xs text-gray-500 mb-4">Every village family spends money on fuel every month. A biogas unit turns your animals' daily waste into free fuel — and the leftover into free fertilizer.</p>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <StatCard value="↓ 90%" label="Reduction in cooking fuel cost" urdu="کھانا پکانے پر خرچ کم" color="border-green-300 bg-green-50 text-green-800"/>
            <StatCard value="مفت" label="Organic fertilizer from slurry" urdu="گوبر سے مفت کھاد" color="border-emerald-300 bg-emerald-50 text-emerald-800"/>
            <StatCard value="+30%" label="Increase in crop yield" urdu="فصل میں اضافہ" color="border-yellow-300 bg-yellow-50 text-yellow-800"/>
            <StatCard value="25 سال" label="Lifespan of a well-built unit" urdu="اچھی تعمیر کی عمر" color="border-blue-300 bg-blue-50 text-blue-800"/>
          </div>

          <p className="text-xs font-bold text-gray-600 mb-2">ماہانہ خرچ | Monthly Fuel Cost Comparison</p>
          <BeforeAfterSVG />

          <div className="bg-green-50 rounded-xl p-3 mt-3 border border-green-200">
            <p className="text-xs text-green-800 font-semibold">📊 حقیقی مثال | Real Example</p>
            <p className="text-xs text-green-700 mt-1">
              3 مویشیوں والا گھرانہ ۱۰ مکعب میٹر کے یونٹ سے سالانہ ایندھن اور کھاد مل کر <strong>₨ 2,00,000+</strong> بچا سکتا ہے۔
            </p>
            <p className="text-xs text-green-600 mt-0.5">A family with 3 cattle can save ₨200,000+ per year in fuel and fertilizer combined with a 10m³ unit.</p>
          </div>
        </WhyCard>

        {/* ── 2. Health & Environment ── */}
        <WhyCard emoji="🌍" title="Health & Environment" urdu="صحت اور ماحول">
          <p className="text-sm text-gray-700 mb-4">
            لکڑی اور مٹی کا تیل جلانے سے جو دھواں نکلتا ہے وہ گھر کے اندر ہوا کو زہریلا بناتا ہے — خاص طور پر خواتین اور بچوں کے لیے جو زیادہ وقت باورچی خانے میں گزارتے ہیں۔
          </p>
          <p className="text-xs text-gray-500 mb-4">Burning wood and kerosene poisons indoor air — especially harmful to women and children who spend the most time near the stove.</p>

          <SmokeVsCleanSVG />

          <div className="space-y-3 mt-4">
            <div className="flex gap-3 items-start">
              <span className="text-xl flex-shrink-0">🫁</span>
              <div>
                <p className="font-semibold text-red-700 text-sm">Indoor smoke causes lung disease</p>
                <p className="text-xs text-red-600 urdu" dir="rtl">گھر کا دھواں پھیپھڑوں کو نقصان پہنچاتا ہے</p>
                <p className="text-xs text-gray-600 mt-1">WHO estimates indoor air pollution from cooking fires causes millions of premature deaths yearly. Children near smoking stoves are most at risk.</p>
              </div>
            </div>

            <div className="flex gap-3 items-start">
              <span className="text-xl flex-shrink-0">🌳</span>
              <div>
                <p className="font-semibold text-orange-700 text-sm">Firewood = deforestation</p>
                <p className="text-xs text-orange-600 urdu" dir="rtl">لکڑی جلانا = جنگل کی تباہی</p>
                <p className="text-xs text-gray-600 mt-1">Each household burning wood contributes to tree loss, soil erosion, and reduced rainfall in the region.</p>
              </div>
            </div>

            <div className="flex gap-3 items-start">
              <span className="text-xl flex-shrink-0">🔵</span>
              <div>
                <p className="font-semibold text-blue-700 text-sm">Biogas burns clean — zero smoke</p>
                <p className="text-xs text-blue-600 urdu" dir="rtl">بائیو گیس صاف جلتی ہے — بالکل دھواں نہیں</p>
                <p className="text-xs text-gray-600 mt-1">A blue biogas flame produces no smoke, no soot, no ash. The kitchen stays clean. Children breathe clean air.</p>
              </div>
            </div>

            <div className="flex gap-3 items-start">
              <span className="text-xl flex-shrink-0">♻️</span>
              <div>
                <p className="font-semibold text-green-700 text-sm">Waste becomes resource</p>
                <p className="text-xs text-green-600 urdu" dir="rtl">گوبر فضول نہیں — قیمتی ہے</p>
                <p className="text-xs text-gray-600 mt-1">Nothing is wasted. Dung → gas for cooking + slurry for fields. A closed loop with zero waste.</p>
              </div>
            </div>
          </div>
        </WhyCard>

        {/* ── 3. Cost Burden ── */}
        <WhyCard emoji="📈" title="The Rising Cost Burden" urdu="قیمتوں کا بڑھتا بوجھ">
          <p className="text-sm text-gray-700 mb-4">
            LPG سلنڈر کی قیمت ہر سال بڑھتی جا رہی ہے۔ یہ پیسہ گاؤں سے باہر جاتا ہے اور کبھی واپس نہیں آتا۔ بائیو گیس ایک بار خرچ — پھر ہمیشہ مفت۔
          </p>
          <p className="text-xs text-gray-500 mb-4">LPG prices rise every year. That money leaves the village and never returns. Biogas is one-time cost — free forever after.</p>

          <p className="text-xs font-bold text-gray-600 mb-2">LPG قیمت کا رجحان | LPG Price Trend (₨/kg)</p>
          <LpgTrendSVG />

          <div className="space-y-3 mt-4">
            <div className="flex gap-3 items-start">
              <span className="text-xl flex-shrink-0">📦</span>
              <div>
                <p className="font-semibold text-gray-800 text-sm">Cylinder dependency = monthly cash drain</p>
                <p className="text-xs text-gray-500 urdu" dir="rtl">سلنڈر پر انحصار = ہر مہینے پیسہ جانا</p>
                <p className="text-xs text-gray-600 mt-1">A family using 2 cylinders/month spends ₨25,000–35,000 per year — money that leaves the village economy entirely.</p>
              </div>
            </div>

            <div className="flex gap-3 items-start">
              <span className="text-xl flex-shrink-0">🏦</span>
              <div>
                <p className="font-semibold text-gray-800 text-sm">One-time investment, 25-year return</p>
                <p className="text-xs text-gray-500 urdu" dir="rtl">ایک بار خرچ — ۲۵ سال فائدہ</p>
                <p className="text-xs text-gray-600 mt-1">A well-built biogas unit lasts 25 years. Construction cost is recovered in 1–2 years. After that, fuel and fertilizer are free.</p>
              </div>
            </div>

            <div className="flex gap-3 items-start">
              <span className="text-xl flex-shrink-0">💪</span>
              <div>
                <p className="font-semibold text-gray-800 text-sm">Energy independence</p>
                <p className="text-xs text-gray-500 urdu" dir="rtl">توانائی میں خود کفالت</p>
                <p className="text-xs text-gray-600 mt-1">No electricity needed. No cylinders to buy. No dependence on supply chains or price hikes. Your animals produce your fuel — every single day.</p>
              </div>
            </div>
          </div>

          <div className="bg-green-800 rounded-xl p-4 mt-4 text-white text-center">
            <p className="text-lg font-black">آپ کے جانور · آپ کا ایندھن</p>
            <p className="text-sm text-green-300 mt-1">Your animals · Your fuel · Your independence</p>
          </div>
        </WhyCard>

      </div>
    </div>
  );
}
