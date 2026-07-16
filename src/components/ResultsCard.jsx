import { useState, useEffect, useRef } from 'react';
import { calculateSavings } from '../utils/calculations';
import { speakSavings, speakViaBackend, preloadVoices } from '../utils/speech';
import { logCalculation } from '../utils/api';

function fmt(num) {
  return '₨ ' + Math.round(num).toLocaleString('en-PK');
}

// LPG price bands for contextual label
function lpgLabel(price) {
  if (price < 200) return { text: 'سستی قیمت | Low price', color: 'text-blue-600' };
  if (price <= 280) return { text: 'درمیانی | Average market', color: 'text-green-600' };
  if (price <= 340) return { text: 'مہنگی | High price', color: 'text-orange-600' };
  return { text: 'بہت مہنگی | Very high', color: 'text-red-600' };
}

export default function ResultsCard({ animalCounts, onReset }) {
  const [lpgPrice, setLpgPrice] = useState(250);
  const [speaking, setSpeaking] = useState(false);
  const [ttsLoading, setTtsLoading] = useState(false);
  const [logged, setLogged] = useState(false);
  const audioRef = useRef(null);       // Google TTS audio element

  // Preload voices as soon as results screen mounts so they're ready when tapped
  useEffect(() => { preloadVoices(); }, []);

  const results = calculateSavings(animalCounts, lpgPrice);

  // Log to backend once on first render
  useEffect(() => {
    if (!logged) {
      logCalculation(animalCounts, results).then(() => setLogged(true));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSpeak = async () => {
    if (speaking || ttsLoading) {
      window.speechSynthesis.cancel();
      if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
      setSpeaking(false);
      setTtsLoading(false);
      return;
    }
    setTtsLoading(true);

    // Try Google Cloud TTS (real Urdu voice) first
    const audio = await speakViaBackend(results, animalCounts, () => setSpeaking(false));
    if (audio) {
      audioRef.current = audio;
      setTtsLoading(false);
      setSpeaking(true);
      return;
    }

    // Fallback: Web Speech API (English on most systems)
    setTtsLoading(false);
    setSpeaking(true);
    speakSavings(results, animalCounts, () => setSpeaking(false));
  };

  const label = lpgLabel(lpgPrice);
  const lpgSavingsAtMax = Math.round((results.monthlyBiogas / 1.9) * 400 * 12);
  const lpgSavingsAtMin = Math.round((results.monthlyBiogas / 1.9) * 150 * 12);

  return (
    <div className="min-h-screen bg-green-50 pb-8">
      {/* Header */}
      <div className="text-center pt-5 pb-3 px-4">
        <h1 className="text-2xl font-bold text-green-900">🌾 آپ کی بچت</h1>
        <p className="text-gray-500 text-sm">Your Biogas Savings</p>
      </div>

      {/* Annual Savings Hero */}
      <div className="mx-4 bg-white rounded-2xl shadow-lg p-6 text-center border-2 border-green-200 mb-4">
        <p className="text-green-700 font-bold text-base urdu" dir="rtl">سالانہ بچت</p>
        <p className="text-gray-600 text-xs mb-2">Annual Savings</p>
        <p className="text-5xl font-black text-green-700 mb-4">{fmt(results.totalAnnualSavings)}</p>

        <div className="flex justify-around pt-4 border-t border-gray-100">
          <div className="text-center">
            <p className="text-xl font-bold text-orange-500">{fmt(results.monthlyLPGSavings)}</p>
            <p className="text-xs text-gray-500 urdu" dir="rtl">ماہانہ گیس بچت</p>
            <p className="text-xs text-gray-600">Monthly LPG</p>
          </div>
          <div className="w-px bg-gray-200" />
          <div className="text-center">
            <p className="text-xl font-bold text-emerald-600">{fmt(results.monthlyFertilizerValue)}</p>
            <p className="text-xs text-gray-500 urdu" dir="rtl">ماہانہ کھاد</p>
            <p className="text-xs text-gray-600">Monthly Fertilizer</p>
          </div>
          <div className="w-px bg-gray-200" />
          <div className="text-center">
            <p className="text-xl font-bold text-blue-600">{fmt(results.totalMonthlySavings)}</p>
            <p className="text-xs text-gray-500 urdu" dir="rtl">ماہانہ کل</p>
            <p className="text-xs text-gray-600">Monthly Total</p>
          </div>
        </div>
      </div>

      {/* LPG Price — improved UI */}
      <div className="mx-4 bg-white rounded-2xl shadow p-5 border border-gray-200 mb-4">
        <div className="flex justify-between items-start mb-1">
          <div>
            <p className="font-bold text-gray-800">⛽ LPG قیمت | Price</p>
            <p className={`text-xs font-semibold mt-0.5 ${label.color}`}>{label.text}</p>
          </div>
          <div className="text-right">
            <span className="text-2xl font-black text-orange-600">₨{lpgPrice}</span>
            <span className="text-sm text-gray-600">/kg</span>
          </div>
        </div>

        <input
          type="range"
          min={150}
          max={400}
          step={5}
          value={lpgPrice}
          onChange={e => setLpgPrice(Number(e.target.value))}
          className="w-full accent-orange-500 mt-2"
        />

        <div className="flex justify-between text-xs text-gray-600 mt-1 mb-3">
          <span>₨150</span>
          <span className="text-gray-500 font-medium">اپنی رسید دیکھ کر ڈالیں | Check your receipt</span>
          <span>₨400</span>
        </div>

        {/* Savings range preview */}
        <div className="bg-orange-50 rounded-xl p-3 text-center border border-orange-100">
          <p className="text-xs text-gray-500 mb-1">سالانہ بچت کا دائرہ | Annual savings range</p>
          <p className="text-sm">
            <span className="text-blue-600 font-bold">{fmt(lpgSavingsAtMin)}</span>
            <span className="text-gray-600 mx-2">→</span>
            <span className="text-red-600 font-bold">{fmt(lpgSavingsAtMax)}</span>
            <span className="text-gray-600 text-xs ml-1">(LPG only)</span>
          </p>
          <p className="text-xs text-gray-600 mt-0.5">at ₨150/kg → at ₨400/kg</p>
        </div>
      </div>

      {/* Breakdown */}
      <div className="mx-4 bg-green-800 rounded-2xl shadow-lg p-5 text-white space-y-2 mb-4">
        <p className="font-bold text-base text-center urdu mb-3" dir="rtl">📊 مکمل تفصیل | Full Breakdown</p>
        {[
          { urdu: 'روزانہ کھاد', en: 'Daily Dung', val: `${results.totalDailyDung} kg` },
          { urdu: 'روزانہ بائیو گیس', en: 'Daily Biogas', val: `${results.totalDailyBiogas} m³` },
          { urdu: 'ماہانہ بائیو گیس', en: 'Monthly Biogas', val: `${results.monthlyBiogas} m³` },
          { urdu: 'LPG مساوی', en: 'LPG Equivalent', val: `${results.lpgEquivalent} kg/mo` },
          { urdu: 'ماہانہ ڈائجسٹیٹ (کھاد)', en: 'Monthly Digestate', val: `${results.monthlyDigestateVolume} kg` },
          { urdu: 'کھاد کی قیمت', en: 'Fertilizer Value', val: fmt(results.monthlyFertilizerValue) },
          { urdu: 'ماہانہ کل بچت', en: 'Total Monthly', val: fmt(results.totalMonthlySavings), highlight: true },
        ].map(({ urdu, en, val, highlight }) => (
          <div key={en} className={`flex justify-between items-center rounded-xl px-4 py-2.5 ${highlight ? 'bg-yellow-400 text-green-900' : 'bg-green-700'}`}>
            <div>
              <p className={`text-xs urdu ${highlight ? 'text-green-800' : 'text-green-200'}`} dir="rtl">{urdu}</p>
              <p className={`text-xs ${highlight ? 'text-green-700' : 'text-green-300'}`}>{en}</p>
            </div>
            <span className="font-bold">{val}</span>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="mx-4 space-y-3">
        <button
          onClick={handleSpeak}
          className={`w-full py-4 rounded-2xl text-lg font-bold shadow active:scale-95 transition-all flex items-center justify-center gap-2 ${
            speaking
              ? 'bg-red-500 text-white animate-pulse'
              : ttsLoading
              ? 'bg-blue-400 text-white'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {ttsLoading && (
            <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
          )}
          {speaking
            ? '🔴 روکیں | STOP'
            : ttsLoading
            ? 'تیار ہو رہا ہے | Loading...'
            : '🎤 سب کچھ سنیں | LISTEN TO EVERYTHING'}
        </button>
        <p className="text-center text-xs text-gray-600">
          سارے اعداد اردو میں بولے جائیں گے | All figures read aloud in Urdu
        </p>

        <button
          onClick={onReset}
          className="w-full bg-gray-600 text-white py-4 rounded-2xl text-lg font-bold shadow active:scale-95 transition-transform hover:bg-gray-700"
        >
          🔄 دوسرا حساب | CALCULATE ANOTHER
        </button>
      </div>
    </div>
  );
}
