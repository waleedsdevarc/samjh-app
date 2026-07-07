import { useState, useEffect } from 'react';
import AnimalSelector from './components/AnimalSelector';
import ResultsCard from './components/ResultsCard';
import AdminDashboard from './components/AdminDashboard';
import GuideScreen from './components/GuideScreen';
import WhyScreen from './components/WhyScreen';
import { preloadVoices } from './utils/speech';
import './index.css';

const isAdminRoute = window.location.pathname === '/admin';

const TABS = [
  { id: 'calculator', urdu: 'حساب', en: 'Calculator', emoji: '🧮' },
  { id: 'guide',      urdu: 'راہنما', en: 'Guide',      emoji: '📖' },
  { id: 'why',        urdu: 'کیوں',   en: 'Why',        emoji: '💡' },
];

export default function App() {
  useEffect(() => { preloadVoices(); }, []);

  const [tab, setTab]               = useState('calculator');
  const [calcScreen, setCalcScreen] = useState('selector');
  const [animalCounts, setAnimalCounts] = useState(null);

  if (isAdminRoute) return <AdminDashboard />;

  const handleCalculate = (counts) => { setAnimalCounts(counts); setCalcScreen('results'); };
  const handleReset     = () => { setCalcScreen('selector'); setAnimalCounts(null); };

  return (
    <div className="max-w-md mx-auto bg-green-50 min-h-screen flex flex-col">
      {/* ── Top tab bar ── */}
      <div className="sticky top-0 z-50 bg-green-800 px-3 pt-2 pb-1.5 flex gap-2 shadow-lg">
        {TABS.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex-1 py-1.5 px-1 rounded-xl text-center transition-all active:scale-95 ${
              tab === t.id ? 'bg-white text-green-800 shadow' : 'text-green-100 hover:bg-green-700'
            }`}
          >
            <div className="text-base leading-none">{t.emoji}</div>
            <div className="urdu text-xs font-bold mt-0.5 leading-none" dir="rtl">{t.urdu}</div>
            <div className="text-xs opacity-75 leading-none mt-0.5">{t.en}</div>
          </button>
        ))}
      </div>

      {/* ── Content ── */}
      <div className="flex-1">
        {tab === 'calculator' && (
          calcScreen === 'selector'
            ? <AnimalSelector onCalculate={handleCalculate} />
            : <ResultsCard animalCounts={animalCounts} onReset={handleReset} />
        )}
        {tab === 'guide' && <GuideScreen />}
        {tab === 'why'   && <WhyScreen />}
      </div>
    </div>
  );
}
