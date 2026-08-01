import { useState } from 'react';

// ── SVG Diagrams ──────────────────────────────────────────────────────────────

function CrossSectionSVG() {
  return (
    <svg viewBox="0 0 400 215" className="w-full rounded-xl" xmlns="http://www.w3.org/2000/svg">
      {/* Sky */}
      <rect x="0" y="0" width="400" height="108" fill="#f0f9ff"/>
      {/* Ground fill */}
      <rect x="0" y="108" width="400" height="107" fill="#fef3c7" opacity="0.45"/>
      {/* Ground line */}
      <line x1="0" y1="108" x2="400" y2="108" stroke="#92400e" strokeWidth="2.5"/>
      <text x="4" y="122" fontSize="8" fill="#92400e" fontFamily="sans-serif" opacity="0.7">زمین | GROUND</text>

      {/* Underground digester oval */}
      <ellipse cx="200" cy="158" rx="78" ry="52" fill="#fef9f0" stroke="#92400e" strokeWidth="2"/>
      {/* Slurry */}
      <ellipse cx="200" cy="188" rx="52" ry="14" fill="#d4a853" opacity="0.65"/>
      <text x="200" y="192" textAnchor="middle" fontSize="7.5" fill="#78350f" fontFamily="sans-serif" fontStyle="italic">SLURRY / گوبر</text>

      {/* Dome */}
      <path d="M 135 108 Q 200 42 265 108 Z" fill="#dbeafe" stroke="#2563eb" strokeWidth="2"/>

      {/* Gas pipe upward */}
      <line x1="200" y1="42" x2="200" y2="6" stroke="#16a34a" strokeWidth="2.5" strokeDasharray="5,3"/>
      <circle cx="200" cy="42" r="4" fill="#16a34a"/>
      <text x="207" y="18" fontSize="8" fill="#16a34a" fontFamily="sans-serif" fontWeight="bold">→ kitchen</text>

      {/* Inlet pipe underground */}
      <rect x="68" y="102" width="68" height="12" fill="#fef9f0" stroke="#92400e" strokeWidth="1.5"/>

      {/* Inlet tank */}
      <rect x="8" y="68" width="60" height="88" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2" rx="4"/>
      <text x="38" y="63" textAnchor="middle" fontSize="7.5" fill="#166534" fontFamily="sans-serif" fontWeight="bold">① INLET</text>

      {/* Outlet pipe underground */}
      <rect x="268" y="102" width="60" height="12" fill="#fef9f0" stroke="#92400e" strokeWidth="1.5"/>

      {/* Outlet chamber */}
      <rect x="328" y="68" width="60" height="88" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2" rx="4"/>
      <text x="358" y="63" textAnchor="middle" fontSize="7.5" fill="#166534" fontFamily="sans-serif" fontWeight="bold">④ OUTLET</text>

      {/* Overflow arrow to compost */}
      <line x1="388" y1="120" x2="400" y2="120" stroke="#92400e" strokeWidth="2"/>
      <text x="358" y="210" textAnchor="middle" fontSize="7" fill="#92400e" fontFamily="sans-serif">→ ⑤ compost</text>

      {/* Number badges */}
      {[
        { cx: 38,  cy: 95,  n: '①' },
        { cx: 200, cy: 150, n: '②' },
        { cx: 200, cy: 72,  n: '③' },
        { cx: 358, cy: 95,  n: '④' },
      ].map(({ cx, cy, n }) => (
        <g key={n}>
          <circle cx={cx} cy={cy} r="11" fill="#14532d"/>
          <text x={cx} y={cy + 4} textAnchor="middle" fontSize="11" fill="white" fontFamily="sans-serif">{n}</text>
        </g>
      ))}

      {/* Part labels */}
      <text x="200" y="150" textAnchor="middle" fontSize="8.5" fill="#78350f" fontFamily="sans-serif" fontWeight="bold">DIGESTER</text>
      <text x="200" y="78" textAnchor="middle" fontSize="8.5" fill="#1d4ed8" fontFamily="sans-serif" fontWeight="bold">DOME</text>
    </svg>
  );
}

function SiteLayoutSVG() {
  return (
    <svg viewBox="0 0 360 220" className="w-full rounded-xl" style={{ background: '#f0fdf4' }} xmlns="http://www.w3.org/2000/svg">
      {/* Kitchen */}
      <rect x="12" y="82" width="72" height="62" fill="#fef9f0" stroke="#92400e" strokeWidth="2" rx="3"/>
      <polygon points="12,82 48,48 84,82" fill="#92400e" opacity="0.75"/>
      <text x="48" y="118" textAnchor="middle" fontSize="8.5" fill="#78350f" fontFamily="sans-serif" fontWeight="bold">KITCHEN</text>
      <text x="48" y="130" textAnchor="middle" fontSize="8" fill="#78350f" fontFamily="sans-serif">باورچی خانہ</text>

      {/* Digester circle */}
      <circle cx="198" cy="113" r="54" fill="#dbeafe" stroke="#2563eb" strokeWidth="2.5"/>
      <text x="198" y="109" textAnchor="middle" fontSize="9" fill="#1e40af" fontFamily="sans-serif" fontWeight="bold">DIGESTER</text>
      <text x="198" y="122" textAnchor="middle" fontSize="8" fill="#1e40af" fontFamily="sans-serif">3m × 3m</text>
      <text x="198" y="134" textAnchor="middle" fontSize="8" fill="#1e40af" fontFamily="sans-serif">ہاضمہ</text>

      {/* Gas pipe dashed green */}
      <line x1="84" y1="113" x2="144" y2="113" stroke="#16a34a" strokeWidth="2.5" strokeDasharray="7,4"/>
      <text x="114" y="105" textAnchor="middle" fontSize="7.5" fill="#166534" fontFamily="sans-serif" fontWeight="bold">GAS PIPE</text>
      <text x="114" y="115" textAnchor="middle" fontSize="7" fill="#166534" fontFamily="sans-serif">گیس پائپ</text>

      {/* Animal shed */}
      <rect x="272" y="148" width="78" height="52" fill="#fef3c7" stroke="#92400e" strokeWidth="2" rx="3"/>
      <text x="311" y="170" textAnchor="middle" fontSize="8.5" fill="#78350f" fontFamily="sans-serif" fontWeight="bold">ANIMAL</text>
      <text x="311" y="182" textAnchor="middle" fontSize="8.5" fill="#78350f" fontFamily="sans-serif" fontWeight="bold">SHED</text>
      <text x="311" y="193" textAnchor="middle" fontSize="7.5" fill="#78350f" fontFamily="sans-serif">جانوروں کا باڑہ</text>

      {/* Dung path */}
      <line x1="272" y1="167" x2="252" y2="153" stroke="#92400e" strokeWidth="2" strokeDasharray="4,3"/>
      <text x="268" y="143" textAnchor="middle" fontSize="7.5" fill="#92400e" fontFamily="sans-serif" fontWeight="bold">DUNG</text>
      <text x="268" y="153" textAnchor="middle" fontSize="7" fill="#92400e" fontFamily="sans-serif">گوبر</text>

      {/* Distance label */}
      <line x1="84" y1="205" x2="144" y2="205" stroke="#6b7280" strokeWidth="1"/>
      <line x1="84" y1="200" x2="84" y2="210" stroke="#6b7280" strokeWidth="1.5"/>
      <line x1="144" y1="200" x2="144" y2="210" stroke="#6b7280" strokeWidth="1.5"/>
      <text x="114" y="217" textAnchor="middle" fontSize="8" fill="#6b7280" fontFamily="sans-serif">MAX 20m</text>
    </svg>
  );
}

function WaterTrapSVG() {
  return (
    <svg viewBox="0 0 310 175" className="w-full rounded-xl bg-gray-50" xmlns="http://www.w3.org/2000/svg">
      {/* Left pipe */}
      <rect x="10" y="62" width="115" height="14" fill="#9ca3af" rx="3"/>
      <text x="60" y="54" textAnchor="middle" fontSize="9" fill="#374151" fontFamily="sans-serif" fontWeight="bold">GAS IN →</text>
      <text x="60" y="44" textAnchor="middle" fontSize="8" fill="#374151" fontFamily="sans-serif">گیس آتی ہے</text>

      {/* Right pipe */}
      <rect x="185" y="62" width="115" height="14" fill="#9ca3af" rx="3"/>
      <text x="242" y="54" textAnchor="middle" fontSize="9" fill="#374151" fontFamily="sans-serif" fontWeight="bold">→ KITCHEN</text>
      <text x="242" y="44" textAnchor="middle" fontSize="8" fill="#374151" fontFamily="sans-serif">باورچی خانہ</text>

      {/* T-joint block */}
      <rect x="115" y="62" width="18" height="14" fill="#6b7280"/>
      {/* Vertical pipe down */}
      <rect x="119" y="76" width="10" height="30" fill="#6b7280"/>

      {/* T-joint label */}
      <text x="152" y="76" fontSize="8.5" fill="#374151" fontFamily="sans-serif" fontWeight="bold">T-JOINT</text>

      {/* Bottle body */}
      <rect x="109" y="106" width="28" height="55" fill="#bfdbfe" stroke="#3b82f6" strokeWidth="1.5" rx="5"/>
      {/* Bottle neck */}
      <rect x="115" y="100" width="16" height="10" fill="#bfdbfe" stroke="#3b82f6" strokeWidth="1" rx="2"/>

      {/* Water fill */}
      <rect x="109" y="126" width="28" height="35" fill="#60a5fa" opacity="0.6" rx="0 0 5 5"/>
      {/* Water level line */}
      <line x1="109" y1="126" x2="137" y2="126" stroke="#1d4ed8" strokeWidth="1.5" strokeDasharray="4,2"/>

      {/* 15cm brace */}
      <line x1="143" y1="126" x2="143" y2="161" stroke="#374151" strokeWidth="1"/>
      <line x1="138" y1="126" x2="148" y2="126" stroke="#374151" strokeWidth="1.5"/>
      <line x1="138" y1="161" x2="148" y2="161" stroke="#374151" strokeWidth="1.5"/>
      <text x="153" y="147" fontSize="9" fill="#374151" fontFamily="sans-serif" fontWeight="bold">15cm</text>
      <text x="153" y="158" fontSize="8" fill="#374151" fontFamily="sans-serif">پانی</text>

      <text x="123" y="172" textAnchor="middle" fontSize="8" fill="#374151" fontFamily="sans-serif">PLASTIC BOTTLE / بوتل</text>
    </svg>
  );
}

// ── Accordion Section ─────────────────────────────────────────────────────────

function Section({ title, urdu, emoji, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="bg-white rounded-2xl shadow-md mb-4 overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-5 py-4 text-left active:bg-gray-50"
      >
        <div>
          <span className="text-lg mr-2">{emoji}</span>
          <span className="font-bold text-green-900 text-base">{urdu}</span>
          <div className="text-xs text-gray-500 mt-0.5 ml-8">{title}</div>
        </div>
        <span className={`text-green-700 text-xl transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>
          ⌄
        </span>
      </button>
      {open && <div className="px-5 pb-5 border-t border-gray-100">{children}</div>}
    </div>
  );
}

function Warn({ children }) {
  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-500 rounded-r-xl p-3 my-3">
      <p className="text-yellow-800 text-sm font-semibold">⚠️ {children}</p>
    </div>
  );
}

function Step({ n, title, urdu, children }) {
  return (
    <div className="flex gap-3 mb-4">
      <div className="flex-shrink-0 w-9 h-9 rounded-full bg-green-700 text-white flex items-center justify-center font-bold text-sm">
        {n}
      </div>
      <div>
        <p className="font-bold text-green-900 text-sm">{title}</p>
        <p className="text-xs text-gray-600 urdu mt-0.5" dir="rtl">{urdu}</p>
        <p className="text-sm text-gray-700 mt-1">{children}</p>
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function GuideScreen() {
  return (
    <div className="pb-8">
      {/* Header */}
      <div className="text-center pt-5 pb-3 px-4">
        <h1 className="text-2xl font-bold text-green-900">📖 راہنما</h1>
        <p className="text-gray-500 text-sm">Biogas Unit — Build & Operate Guide</p>
        <p className="text-xs text-gray-600 mt-1">PDF source: Rahnuma · Samajh · Punjab Villages</p>
      </div>

      <div className="px-4">

        {/* ── Section 1: Before You Start ── */}
        <Section emoji="✅" urdu="شروع سے پہلے" title="Before You Start" defaultOpen={true}>
          <p className="text-sm text-gray-600 mt-3 mb-4">
            چاروں چیزیں ضروری ہیں — ایک بھی غائب ہو تو یونٹ ٹھیک کام نہیں کرے گا۔
            <br/><span className="text-gray-600">Check all four before starting construction.</span>
          </p>
          {[
            {
              emoji: '🐃', en: 'At least 2–3 cattle or buffalo',
              ur: 'کم از کم ۲–۳ مویشی یا بھینس',
              detail: 'Two adult cattle = 20–25 kg dung/day. More animals = more gas.',
              detailUr: 'دو بالغ جانور = ۲۰–۲۵ کلو گوبر روزانہ۔ زیادہ جانور = زیادہ گیس۔',
            },
            {
              emoji: '📍', en: 'Flat yard space ~3m × 3m',
              ur: 'ہموار جگہ تقریباً ۳×۳ میٹر',
              detail: 'Near the animal shed. Kitchen within 20m for the gas pipe.',
              detailUr: 'جانوروں کے باڑے کے قریب۔ باورچی خانہ ۲۰ میٹر کے اندر ہو۔',
            },
            {
              emoji: '💧', en: 'Water source nearby',
              ur: 'قریب پانی کا ذریعہ',
              detail: 'You mix dung + water 1:1 every day. A hand pump or tap is enough.',
              detailUr: 'روزانہ گوبر اور پانی ۱:۱ ملانا ہوگا۔ ہینڈ پمپ یا نل کافی ہے۔',
            },
            {
              emoji: '🧱', en: 'Construction materials',
              ur: 'تعمیراتی سامان',
              detail: 'Cement, sand, bricks, 0.5-inch GI pipe, plastic tubing, biogas burner (any agri shop).',
              detailUr: 'سیمنٹ، ریت، اینٹیں، GI پائپ، پلاسٹک ٹیوب، بائیو گیس برنر (زرعی دکان سے ملتا ہے)۔',
            },
          ].map(({ emoji, en, ur, detail, detailUr }) => (
            <div key={en} className="flex gap-3 mb-4">
              <span className="text-2xl flex-shrink-0">{emoji}</span>
              <div>
                <p className="font-semibold text-green-900 text-sm">{en}</p>
                <p className="text-xs text-gray-500 urdu" dir="rtl">{ur}</p>
                <p className="text-xs text-gray-600 mt-1">{detail}</p>
                <p className="text-xs text-gray-600 urdu mt-0.5" dir="rtl">{detailUr}</p>
              </div>
            </div>
          ))}
        </Section>

        {/* ── Section 2: The 5 Parts ── */}
        <Section emoji="🔩" urdu="یونٹ کے ۵ حصے" title="The 5 Parts of the Unit">
          <p className="text-sm text-gray-500 mt-3 mb-3">ہر بائیو گیس یونٹ میں بالکل ۵ حصے ہوتے ہیں۔ | Every unit has exactly 5 parts.</p>
          <CrossSectionSVG />
          <div className="grid grid-cols-1 gap-3 mt-4">
            {[
              { n: '①', name: 'Inlet Tank', ur: 'داخلہ ٹینک', desc: 'Where you mix dung + water and feed it in daily.', urDesc: 'یہاں گوبر اور پانی ملا کر ڈالتے ہیں۔' },
              { n: '②', name: 'Digester', ur: 'ہاضمہ چیمبر', desc: 'Underground tank where bacteria break down waste and make gas.', urDesc: 'زیر زمین ٹینک جہاں بیکٹیریا گوبر سے گیس بناتے ہیں۔' },
              { n: '③', name: 'Dome', ur: 'گیس گنبد', desc: 'Curved ceiling where gas collects. More pressure = more gas ready.', urDesc: 'گنبد نما چھت جہاں گیس جمع ہوتی ہے۔' },
              { n: '④', name: 'Outlet Chamber', ur: 'خروج چیمبر', desc: 'Digested slurry flows here automatically as new material is pushed in.', urDesc: 'پکا ہوا گوبر یہاں خود بخود آتا ہے۔' },
              { n: '⑤', name: 'Compost Pit', ur: 'کھاد گڑھا', desc: 'Where you collect the slurry fertilizer for your fields.', urDesc: 'یہاں سے کھاد اٹھا کر کھیت میں ڈالتے ہیں۔' },
            ].map(({ n, name, ur, desc, urDesc }) => (
              <div key={n} className="flex gap-3 bg-green-50 rounded-xl p-3">
                <div className="w-8 h-8 rounded-full bg-green-800 text-white flex items-center justify-center font-bold text-xs flex-shrink-0">{n}</div>
                <div>
                  <p className="font-bold text-green-900 text-sm">{name} <span className="text-gray-600 font-normal urdu text-xs" dir="rtl">| {ur}</span></p>
                  <p className="text-xs text-gray-600">{desc}</p>
                  <p className="text-xs text-gray-600 urdu" dir="rtl">{urDesc}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ── Section 3: Site Layout ── */}
        <Section emoji="🗺️" urdu="جگہ کا انتخاب" title="Site Layout">
          <p className="text-sm text-gray-500 mt-3 mb-3">
            باورچی خانہ، ہاضمہ اور باڑہ ایک لائن میں ہوں۔ | Kitchen, digester and shed in a line.
          </p>
          <SiteLayoutSVG />
          <div className="bg-blue-50 rounded-xl p-3 mt-3">
            <p className="text-xs text-blue-800 font-semibold">📏 Key distances / اہم فاصلے</p>
            <ul className="text-xs text-blue-700 mt-1 space-y-1">
              <li>• Kitchen → Digester: <strong>max 20 meters</strong> for gas pipe</li>
              <li>• Animal shed → Digester: <strong>as close as possible</strong></li>
              <li>• Digester space: <strong>3m × 3m flat area</strong></li>
            </ul>
          </div>
        </Section>

        {/* ── Section 4: How to Build ── */}
        <Section emoji="🏗️" urdu="تعمیر کے مراحل" title="How to Build — Step by Step">
          <p className="text-sm text-gray-500 mt-3 mb-4">
            ترتیب سے کریں۔ ہر مرحلہ خشک ہونے کے بعد اگلا شروع کریں۔
            <br/><span className="text-gray-600">Follow in order. Each step must dry before the next begins.</span>
          </p>

          <Step n="01" title="Dig the Pit" urdu="گڑھا کھودیں">
            Dig a <strong>circular pit 1.5m deep × 1.5m wide</strong> for a small family unit (2–3 cattle). Compact the earth floor firmly. <strong>The pit must be circular — not square.</strong>
          </Step>

          <Step n="02" title="Lay the Foundation" urdu="بنیاد ڈالیں">
            Place cobblestones and gravel on the compacted floor. Fill with concrete to <strong>15 cm thick</strong>. Allow to dry for at least <strong>24 hours</strong>. Check it is level with a water level or flat board.
          </Step>

          <Step n="03" title="Place the Center Guide Pipe" urdu="درمیانی پائپ لگائیں">
            At the exact center, place a <strong>0.5-inch GI pipe vertically</strong>. This keeps the dome symmetrical as you build. Secure it with a horizontal rope across the pit at ground level. Check it is perfectly vertical using a string and weight.
          </Step>

          <Step n="04" title="Build the Walls and Dome" urdu="دیواریں اور گنبد بنائیں">
            Lay bricks in a circular shape rising from the foundation. Keep equal distance from the center pipe all around. The dome curves <strong>inward at the top</strong> toward the center pipe. Plaster the inside smooth with cement so it is <strong>airtight</strong>.
          </Step>

          <Step n="05" title="Build the Inlet and Outlet" urdu="داخلہ اور خروج بنائیں">
            <strong>Inlet:</strong> A small rectangular tank on one side, connected at the bottom. Pour your dung-water mix here daily.
            <br/><strong>Outlet:</strong> A similar chamber on the opposite side. Slurry flows here automatically. Add an overflow opening leading to your compost pit.
          </Step>

          <Step n="06" title="Lay the Gas Pipe to Kitchen" urdu="باورچی خانے تک پائپ بچھائیں">
            Run a pipe from the dome to your kitchen stove. At any <strong>low points</strong> in the pipe, install a water trap to stop gas escaping. End the pipe at a tap valve before the burner.
          </Step>

          <div className="mt-2 mb-2">
            <p className="text-xs font-bold text-gray-600 mb-2">Water Trap Detail / پانی کا جال</p>
            <WaterTrapSVG />
          </div>

          <Warn>
            پانی کے جال کے بغیر گیس ضائع ہو جاتی ہے۔ ہر نشیبی جگہ پر لگائیں۔
            <br/>Without water traps, gas escapes. Install at every low point.
          </Warn>

          <div className="bg-orange-50 border-l-4 border-orange-500 rounded-r-xl p-3 mt-3">
            <p className="font-bold text-orange-800 text-sm">⏳ پہلی بار استعمال سے پہلے انتظار کریں | Wait Before First Use</p>
            <p className="text-orange-700 text-xs mt-1">
              تعمیر کے بعد گوبر اور پانی بھر کر بند کر دیں۔ <strong>۳–۴ ہفتے</strong> گیس استعمال نہ کریں — بیکٹیریا کو جمنے کا وقت دیں۔ پہلی گیس بدبو دار ہو گی — یہ نارمل ہے، چھوڑ دیں۔
            </p>
            <p className="text-orange-600 text-xs mt-1">After construction, fill and seal. Do not use gas for <strong>3–4 weeks</strong>. First gas may smell bad — release it and wait.</p>
          </div>
        </Section>

        {/* ── Section 5: Daily Routine ── */}
        <Section emoji="🌅" urdu="روزانہ معمول" title="Daily Routine — How to Use It">
          <p className="text-sm text-gray-500 mt-3 mb-4">
            یونٹ چلنے کے بعد روزانہ صرف <strong>۱۵–۲۰ منٹ</strong> کام کرنا ہوتا ہے۔
            <br/><span className="text-gray-600">Once running, only 15–20 minutes of work each morning.</span>
          </p>

          {[
            { n: '1', emoji: '🐄', en: 'Collect fresh dung (morning)', ur: 'تازہ گوبر اکٹھا کریں (صبح)', detail: 'Must be fresh — dung sitting for over a day loses gas-producing power. Collect ~10–15 kg for 2 cattle.' },
            { n: '2', emoji: '🪣', en: 'Mix with water 1:1', ur: 'پانی کے ساتھ ۱:۱ ملائیں', detail: 'In the inlet tank, mix dung and water in equal parts. Stir until uniform liquid — no solid lumps. Lumps block the system.' },
            { n: '3', emoji: '⬇️', en: 'Feed into the digester', ur: 'ہاضمہ چیمبر میں ڈالیں', detail: 'Pour and push the mixture into the inlet. You will see slurry come out the outlet side — this means it is working.' },
            { n: '4', emoji: '🔥', en: 'Use the gas', ur: 'گیس جلائیں', detail: 'Open the valve slowly and light the burner. Blue flame = clean gas. Yellow/orange = air in pipe, let it run for 30–60 seconds to clear.' },
            { n: '5', emoji: '🌙', en: 'Close the valve at night', ur: 'رات کو والو بند کریں', detail: 'Always close the gas valve when not cooking. Keeps pressure in the dome and prevents overnight gas leaks.' },
          ].map(({ n, emoji, en, ur, detail }) => (
            <div key={n} className="flex gap-3 mb-4">
              <span className="text-2xl flex-shrink-0">{emoji}</span>
              <div>
                <p className="font-semibold text-green-900 text-sm">{en}</p>
                <p className="text-xs text-gray-600 urdu" dir="rtl">{ur}</p>
                <p className="text-xs text-gray-600 mt-1">{detail}</p>
              </div>
            </div>
          ))}

          <Warn>
            پرانا یا خشک گوبر کبھی نہ ڈالیں — بیکٹیریا مر جاتے ہیں۔
            <br/>Never use old or dry dung — it kills the bacteria.
          </Warn>
        </Section>

        {/* ── Section 6: Slurry Fertilizer ── */}
        <Section emoji="🌱" urdu="کھاد — مفت کھاد" title="The Slurry — Your Free Fertilizer">
          <p className="text-sm text-gray-700 mt-3 mb-3">
            آؤٹ لیٹ سے نکلنے والا مواد کچرا نہیں — <strong>خام گوبر سے بہتر کھاد</strong> ہے۔ غذائی اجزاء پہلے سے ٹوٹے ہوئے ہیں جو فوراً پودوں کو ملتے ہیں۔
          </p>
          <p className="text-xs text-gray-500 mb-4">The slurry is better fertilizer than raw dung — nutrients are pre-broken and immediately absorbed by plants.</p>

          <div className="bg-green-800 rounded-xl p-4 mb-4 text-white">
            <p className="font-bold text-sm mb-2">🧪 کھاد میں کیا ہے | What Slurry Contains</p>
            <div className="grid grid-cols-3 gap-2 text-center">
              {[['N', 'Nitrogen', 'نائٹروجن'], ['P', 'Phosphorus', 'فاسفورس'], ['K', 'Potassium', 'پوٹاشیم']].map(([sym, en, ur]) => (
                <div key={sym} className="bg-green-700 rounded-lg p-2">
                  <div className="text-2xl font-black text-yellow-300">{sym}</div>
                  <div className="text-xs">{en}</div>
                  <div className="text-xs opacity-75 urdu" dir="rtl">{ur}</div>
                </div>
              ))}
            </div>
            <p className="text-xs text-green-300 mt-2">+ Zinc, Iron, Copper, Manganese · Improves soil water-holding capacity</p>
          </div>

          <div className="bg-blue-50 rounded-xl p-3 mb-4">
            <p className="font-bold text-blue-800 text-sm mb-1">⏱️ لگانے سے پہلے ۷ دن انتظار کریں | Wait 7 days before applying liquid slurry</p>
            <p className="text-xs text-blue-700">Lets remaining gases escape safely. Solid slurry can be applied sooner.</p>
          </div>

          <p className="font-bold text-green-900 text-sm mb-3">استعمال کے ۳ طریقے | Three Ways to Apply</p>
          {[
            { emoji: '🌾', en: 'Direct on soil', ur: 'براہ راست زمین پر', detail: '10 tons/hectare on irrigated land, or 5 tons/hectare on dry land.' },
            { emoji: '🌿', en: 'Foliar spray (on leaves)', ur: 'پتوں پر چھڑکاؤ', detail: 'Mix 1 part slurry : 5 parts water. Spray early morning or evening — never midday.' },
            { emoji: '💦', en: 'With irrigation water', ur: 'سینچائی کے پانی کے ساتھ', detail: 'Mix liquid slurry into your irrigation channel for even application across the whole field.' },
          ].map(({ emoji, en, ur, detail }) => (
            <div key={en} className="flex gap-3 mb-3">
              <span className="text-xl flex-shrink-0">{emoji}</span>
              <div>
                <p className="font-semibold text-green-900 text-sm">{en} <span className="text-gray-600 font-normal text-xs urdu" dir="rtl">| {ur}</span></p>
                <p className="text-xs text-gray-600">{detail}</p>
              </div>
            </div>
          ))}
        </Section>

        {/* ── Section 7: Troubleshooting ── */}
        <Section emoji="🔧" urdu="مسائل اور حل" title="When Something Goes Wrong">
          <p className="text-sm text-gray-500 mt-3 mb-4">زیادہ تر مسائل کا آسان حل ہے۔ | Most problems have simple fixes.</p>
          <div className="space-y-3">
            {[
              {
                problem: 'No gas coming out', problemUr: 'گیس نہیں آ رہی',
                cause: 'Water trap blocked or pipe cracked', causeUr: 'پانی کا جال بند یا پائپ میں دراڑ',
                fix: 'Check and empty all water traps. Feel along the pipe for cracks. Ensure valve is fully open.',
              },
              {
                problem: 'Gas smells very bad', problemUr: 'گیس بہت بدبودار ہے',
                cause: 'Normal in first 2–3 weeks', causeUr: 'پہلے ۲–۳ ہفتوں میں نارمل',
                fix: 'Do not worry. Release the gas and wait. Bacteria are still establishing — it improves on its own.',
              },
              {
                problem: 'Flame is yellow, not blue', problemUr: 'شعلہ نیلا نہیں پیلا ہے',
                cause: 'Air or moisture in the pipe', causeUr: 'پائپ میں ہوا یا نمی',
                fix: 'Let the burner run 30–60 seconds — flame turns blue once air is purged. If still yellow after 2 min, check water traps.',
              },
              {
                problem: 'Gas production has dropped', problemUr: 'گیس کم ہو گئی ہے',
                cause: 'Not enough fresh dung, or dung is old/dry', causeUr: 'تازہ گوبر کم یا پرانا/خشک',
                fix: 'Feed fresh dung every single day without gaps. In cold weather, production naturally drops — this is normal.',
              },
              {
                problem: 'Slurry not coming out of outlet', problemUr: 'آؤٹ لیٹ سے کھاد نہیں نکل رہی',
                cause: 'Not feeding enough daily volume', causeUr: 'روزانہ مقدار کم ہے',
                fix: 'Increase the dung-water mixture you feed in. The outlet only flows when enough new material is pushed in.',
              },
            ].map(({ problem, problemUr, cause, causeUr, fix }) => (
              <div key={problem} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <p className="font-bold text-red-700 text-sm">{problem}</p>
                <p className="text-xs text-red-500 urdu" dir="rtl">{problemUr}</p>
                <p className="text-xs text-orange-600 mt-1.5"><span className="font-semibold">Cause:</span> {cause}</p>
                <p className="text-xs text-orange-500 urdu" dir="rtl">{causeUr}</p>
                <p className="text-xs text-green-700 mt-1.5"><span className="font-semibold">Fix:</span> {fix}</p>
              </div>
            ))}
          </div>
        </Section>

        <p className="text-center text-xs text-gray-600 mt-2 mb-4">
          Rahnuma · Biogas Adoption Programme · Samajh · Punjab Villages
        </p>
      </div>
    </div>
  );
}
