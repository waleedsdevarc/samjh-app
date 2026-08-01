import { useState } from 'react';

const ANIMALS = [
  {
    key: 'buffalo',
    emoji: '🐃',
    urdu: 'بھینس',
    en: 'Buffalo',
    dung: '9.5 kg/day',
    border: 'border-green-300',
    warning: null,
  },
  {
    key: 'cow',
    emoji: '🐄',
    urdu: 'گائے',
    en: 'Cow',
    dung: '15 kg/day',
    border: 'border-green-300',
    warning: null,
  },
  {
    key: 'goat',
    emoji: '🐐',
    urdu: 'بکری',
    en: 'Goat',
    dung: '1.75 kg/day',
    border: 'border-green-300',
    warning: null,
  },
];

export default function AnimalSelector({ onCalculate }) {
  const [counts, setCounts] = useState({ cow: 0, buffalo: 0, goat: 0 });

  const inc = (key) => setCounts(c => ({ ...c, [key]: Math.min(50, c[key] + 1) }));
  const dec = (key) => setCounts(c => ({ ...c, [key]: Math.max(0, c[key] - 1) }));

  const total = counts.cow + counts.buffalo + counts.goat;

  return (
    <div className="pb-6">
      <div className="p-4 space-y-4">
      {/* Header */}
      <div className="text-center pt-4 pb-2">
        <h1 className="text-3xl font-bold text-green-900">🌾 سمجھ</h1>
        <p className="text-green-700 font-semibold text-lg mt-1">Samjh – Biogas Savings</p>
        <p className="text-gray-600 text-sm mt-1 urdu" dir="rtl">
          اپنے جانور چنیں اور بچت دیکھیں
        </p>
        <p className="text-gray-500 text-xs">Pick your animals · See your savings</p>
      </div>

      {/* Animal Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {ANIMALS.map(({ key, emoji, urdu, en, dung, border, warning }) => (
          <div key={key} className={`bg-white rounded-2xl shadow-md border-2 ${border} p-5`}>
            <div className="text-center mb-3">
              <span className="text-5xl">{emoji}</span>
              <p className="text-xl font-bold mt-1 urdu" dir="rtl">{urdu}</p>
              <p className="text-gray-500 text-sm font-medium">{en} · {dung} dung</p>
            </div>

            <div className="flex items-center justify-center gap-5">
              <button
                onClick={() => dec(key)}
                className="w-14 h-14 bg-gray-200 rounded-full text-2xl font-bold text-gray-700 active:scale-95 transition-transform flex items-center justify-center shadow"
                aria-label={`Remove ${en}`}
              >
                −
              </button>
              <span className="text-5xl font-bold text-green-800 w-12 text-center">{counts[key]}</span>
              <button
                onClick={() => inc(key)}
                className="w-14 h-14 bg-orange-500 rounded-full text-2xl font-bold text-white active:scale-95 transition-transform flex items-center justify-center shadow"
                aria-label={`Add ${en}`}
              >
                +
              </button>
            </div>

            {warning && counts[key] > 0 && (
              <p className="text-center text-yellow-700 text-xs font-semibold mt-3 bg-yellow-50 rounded-lg p-2">
                ⚠️ {warning}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Calculate Button */}
      <button
        onClick={() => onCalculate(counts)}
        disabled={total === 0}
        className={`w-full py-5 rounded-2xl text-xl font-bold shadow-lg transition-all active:scale-95 ${
          total > 0
            ? 'bg-green-600 text-white hover:bg-green-700'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        {total === 0 ? 'جانور چنیں | Pick Animals' : '💰 بچت دیکھیں | SHOW MY SAVINGS'}
      </button>

      {total > 0 && (
        <p className="text-center text-green-700 text-sm">
          {total} جانور منتخب | {total} animal{total !== 1 ? 's' : ''} selected
        </p>
      )}
    </div>
    </div>
  );
}
