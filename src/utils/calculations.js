export const COEFFICIENTS = {
  cow: {
    dailyDung: 15,
    biogasYield: 0.025,
  },
  buffalo: {
    dailyDung: 9.5,
    biogasYield: 0.075,
  },
  goat: {
    dailyDung: 1.75,
    biogasYield: 0.35,
  },
};

export const CONVERSION = {
  lpgPerM3: 1.9,
  lpgDefaultPrice: 250,
  digestateMultiplier: 1.5,
  fertilizerValue: 15,
};

export function calculateSavings(animalCounts, lpgPrice = 250) {
  let totalDailyDung = 0;
  let totalDailyBiogas = 0;

  Object.entries(animalCounts).forEach(([animal, count]) => {
    if (count > 0) {
      const dailyDung = COEFFICIENTS[animal].dailyDung * count;
      const dailyBiogas = dailyDung * COEFFICIENTS[animal].biogasYield;
      totalDailyDung += dailyDung;
      totalDailyBiogas += dailyBiogas;
    }
  });

  const monthlyBiogas = totalDailyBiogas * 30;
  const lpgEquivalent = monthlyBiogas / CONVERSION.lpgPerM3;
  const monthlyLPGSavings = lpgEquivalent * lpgPrice;

  const monthlyDigestateVolume = totalDailyDung * CONVERSION.digestateMultiplier * 30;
  const monthlyFertilizerValue = monthlyDigestateVolume * CONVERSION.fertilizerValue;

  const totalMonthlySavings = monthlyLPGSavings + monthlyFertilizerValue;
  const totalAnnualSavings = totalMonthlySavings * 12;

  return {
    totalDailyDung: Math.round(totalDailyDung * 10) / 10,
    totalDailyBiogas: Math.round(totalDailyBiogas * 100) / 100,
    monthlyBiogas: Math.round(monthlyBiogas * 10) / 10,
    lpgEquivalent: Math.round(lpgEquivalent * 10) / 10,
    monthlyLPGSavings: Math.round(monthlyLPGSavings),
    monthlyDigestateVolume: Math.round(monthlyDigestateVolume * 10) / 10,
    monthlyFertilizerValue: Math.round(monthlyFertilizerValue),
    totalMonthlySavings: Math.round(totalMonthlySavings),
    totalAnnualSavings: Math.round(totalAnnualSavings),
    lpgPrice,
  };
}
