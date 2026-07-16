const API = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export async function logCalculation(animalCounts, results) {
  try {
    const res = await fetch(`${API}/api/calculate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        cows:            animalCounts.cow,
        buffaloes:       animalCounts.buffalo,
        goats:           animalCounts.goat,
        lpgPrice:        results.lpgPrice,
        monthlySavings:  results.totalMonthlySavings,
        annualSavings:   results.totalAnnualSavings,
        fertilizerValue: results.monthlyFertilizerValue,
      }),
    });
    return await res.json();
  } catch {
    return null;
  }
}

export async function fetchRecords(adminKey) {
  const res = await fetch(`${API}/api/records`, {
    headers: { 'Authorization': `Bearer ${adminKey}` },
  });
  if (res.status === 429) throw new Error('rate_limited');
  if (!res.ok) throw new Error('unauthorised');
  return res.json();
}

export async function resetRecords(adminKey) {
  const res = await fetch(`${API}/api/reset`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${adminKey}` },
  });
  if (res.status === 429) throw new Error('rate_limited');
  if (!res.ok) throw new Error('unauthorised');
  return res.json();
}
