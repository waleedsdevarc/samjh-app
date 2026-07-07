import { useState } from 'react';
import { fetchRecords, resetRecords } from '../utils/api';

function fmt(n) {
  return '₨ ' + Math.round(n).toLocaleString('en-PK');
}

function downloadCSV(records) {
  const headers = ['id', 'date', 'cows', 'buffaloes', 'goats', 'lpg_price', 'monthly_savings', 'annual_savings', 'fertilizer_value', 'seasonal'];
  const rows = records.map(r => [
    r.id,
    r.created_at,
    r.cows,
    r.buffaloes,
    r.goats,
    r.lpg_price,
    r.monthly_savings,
    r.annual_savings,
    r.fertilizer_value,
    r.is_seasonal ? 'Yes' : 'No',
  ]);
  const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `samjh-records-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function AdminDashboard() {
  const [password, setPassword] = useState('');
  const [authed, setAuthed] = useState(false);
  const [records, setRecords] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resetDone, setResetDone] = useState(false);
  const [resetting, setResetting] = useState(false);

  const login = async (e) => {
    e.preventDefault();
    if (!password.trim()) {
      setError('Enter the admin password.');
      return;
    }
    setLoading(true);
    try {
      const data = await fetchRecords(password);
      setRecords(data);
      setAuthed(true);
      setError('');
    } catch (err) {
      if (err.message === 'rate_limited') {
        setError('Too many attempts. Wait 15 minutes and try again.');
      } else {
        setError('Incorrect password or server unreachable.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async () => {
    if (!window.confirm('Delete ALL records? This cannot be undone.')) return;
    setResetting(true);
    try {
      await resetRecords(password);
      setRecords([]);
      setResetDone(true);
    } catch {
      setError('Reset failed.');
    } finally {
      setResetting(false);
    }
  };

  const totalAnnual = records.reduce((s, r) => s + r.annual_savings, 0);

  if (!authed) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="bg-gray-800 rounded-2xl p-8 w-full max-w-sm shadow-xl">
          <h1 className="text-white text-2xl font-bold text-center mb-2">سمجھ Admin</h1>
          <p className="text-gray-400 text-sm text-center mb-6">Samjh Database Dashboard</p>
          <form onSubmit={login} className="space-y-4">
            <input
              type="password"
              placeholder="Admin password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-gray-700 text-white rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
              autoFocus
            />
            {error && <p className="text-red-400 text-sm text-center">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl transition-colors"
            >
              {loading ? 'Loading...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">سمجھ Admin Dashboard</h1>
            <p className="text-gray-400 text-sm">{records.length} records · Total annual savings: {fmt(totalAnnual)}</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => downloadCSV(records)}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl font-semibold text-sm transition-colors"
            >
              ⬇ Download CSV
            </button>
            <button
              onClick={handleReset}
              disabled={resetting}
              className="bg-red-600 hover:bg-red-700 disabled:opacity-60 px-4 py-2 rounded-xl font-semibold text-sm transition-colors"
            >
              {resetting ? 'Deleting...' : '🗑 Reset All Data'}
            </button>
          </div>
        </div>

        {resetDone && (
          <div className="bg-green-900 border border-green-700 rounded-xl p-3 mb-4 text-green-300 text-sm">
            All records deleted successfully.
          </div>
        )}

        {error && (
          <div className="bg-red-900 border border-red-700 rounded-xl p-3 mb-4 text-red-300 text-sm">
            {error}
          </div>
        )}

        {records.length === 0 ? (
          <div className="text-center text-gray-500 py-20 text-lg">No records yet.</div>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-gray-700">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-800 text-gray-300 text-left">
                  <th className="px-4 py-3">#</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">🐃</th>
                  <th className="px-4 py-3">🐄</th>
                  <th className="px-4 py-3">🐐</th>
                  <th className="px-4 py-3">LPG ₨/kg</th>
                  <th className="px-4 py-3">Monthly</th>
                  <th className="px-4 py-3">Annual</th>
                  <th className="px-4 py-3">Seasonal</th>
                </tr>
              </thead>
              <tbody>
                {records.map((r, i) => (
                  <tr key={r.id} className={i % 2 === 0 ? 'bg-gray-900' : 'bg-gray-850'}>
                    <td className="px-4 py-2.5 text-gray-500">{r.id}</td>
                    <td className="px-4 py-2.5 text-gray-400 whitespace-nowrap">{r.created_at.replace('T', ' ').slice(0, 16)}</td>
                    <td className="px-4 py-2.5 font-bold text-center">{r.buffaloes || '–'}</td>
                    <td className="px-4 py-2.5 font-bold text-center">{r.cows || '–'}</td>
                    <td className="px-4 py-2.5 font-bold text-center">{r.goats || '–'}</td>
                    <td className="px-4 py-2.5">{r.lpg_price}</td>
                    <td className="px-4 py-2.5 text-orange-400 font-semibold">{fmt(r.monthly_savings)}</td>
                    <td className="px-4 py-2.5 text-green-400 font-bold">{fmt(r.annual_savings)}</td>
                    <td className="px-4 py-2.5 text-center">{r.is_seasonal ? '⚠️' : '–'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
