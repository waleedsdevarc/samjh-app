function urduNumber(n) {
  n = Math.round(n);
  if (n === 0) return 'صفر';

  const ones = [
    '', 'ایک', 'دو', 'تین', 'چار', 'پانچ', 'چھ', 'سات', 'آٹھ', 'نو',
    'دس', 'گیارہ', 'بارہ', 'تیرہ', 'چودہ', 'پندرہ', 'سولہ', 'سترہ', 'اٹھارہ', 'انیس',
    'بیس', 'اکیس', 'بائیس', 'تئیس', 'چوبیس', 'پچیس', 'چھبیس', 'ستائیس', 'اٹھائیس', 'انتیس',
    'تیس', 'اکتیس', 'بتیس', 'تینتیس', 'چونتیس', 'پینتیس', 'چھتیس', 'سینتیس', 'اڑتیس', 'انتالیس',
    'چالیس', 'اکتالیس', 'بیالیس', 'تینتالیس', 'چوالیس', 'پینتالیس', 'چھیالیس', 'سینتالیس', 'اڑتالیس', 'انچاس',
    'پچاس', 'اکاون', 'باون', 'ترپن', 'چون', 'پچپن', 'چھپن', 'ستاون', 'اٹھاون', 'انسٹھ',
    'ساٹھ', 'اکسٹھ', 'باسٹھ', 'تریسٹھ', 'چوسٹھ', 'پینسٹھ', 'چھیاسٹھ', 'سڑسٹھ', 'اڑسٹھ', 'انہتر',
    'ستر', 'اکہتر', 'بہتر', 'تہتر', 'چوہتر', 'پچہتر', 'چھہتر', 'ستہتر', 'اٹھہتر', 'اناسی',
    'اسی', 'اکیاسی', 'بیاسی', 'تراسی', 'چوراسی', 'پچاسی', 'چھیاسی', 'ستاسی', 'اٹھاسی', 'نواسی',
    'نوے', 'اکانوے', 'بانوے', 'ترانوے', 'چورانوے', 'پچانوے', 'چھیانوے', 'ستانوے', 'اٹھانوے', 'ننانوے',
  ];

  if (n < 100) return ones[n];

  let result = '';
  const lakh     = Math.floor(n / 100000);
  const thousand = Math.floor((n % 100000) / 1000);
  const hundred  = Math.floor((n % 1000) / 100);
  const rem      = n % 100;

  if (lakh > 0)     result += ones[lakh]     + ' لاکھ ';
  if (thousand > 0) result += (thousand < 100 ? ones[thousand] : urduNumber(thousand)) + ' ہزار ';
  if (hundred > 0)  result += ones[hundred]  + ' سو ';
  if (rem > 0)      result += ones[rem];

  return result.trim();
}

// Build sentences as short separate chunks to avoid Chrome's text-too-long bug
function buildSentences(results, animalCounts, useUrdu) {
  const {
    totalAnnualSavings, totalMonthlySavings, monthlyLPGSavings,
    monthlyFertilizerValue, monthlyDigestateVolume, totalDailyDung,
    monthlyBiogas, lpgPrice,
  } = results;

  if (useUrdu) {
    const parts = [];
    if (animalCounts.buffalo > 0) parts.push(`${urduNumber(animalCounts.buffalo)} بھینس`);
    if (animalCounts.cow > 0)     parts.push(`${urduNumber(animalCounts.cow)} گائے`);
    if (animalCounts.goat > 0)    parts.push(`${urduNumber(animalCounts.goat)} بکری`);

    return [
      `سمجھ بائیو گیس کیلکولیٹر۔`,
      `آپ کے پاس ${parts.join(' اور ')} ہیں۔`,
      `آپ کے جانور روزانہ ${urduNumber(Math.round(totalDailyDung))} کلو گوبر دیتے ہیں۔`,
      `ہر مہینے ${urduNumber(Math.round(monthlyBiogas))} مکعب میٹر بائیو گیس بنتی ہے۔`,
      `ہر مہینے ایل پی جی پر ${urduNumber(monthlyLPGSavings)} روپے کی بچت ہوگی۔`,
      `ہر مہینے ${urduNumber(Math.round(monthlyDigestateVolume))} کلو کھاد بھی ملے گی۔`,
      `اس کھاد کی قیمت ${urduNumber(monthlyFertilizerValue)} روپے ہے۔`,
      `کل ملا کر ہر مہینے ${urduNumber(totalMonthlySavings)} روپے بچیں گے۔`,
      `سال بھر میں کل ${urduNumber(totalAnnualSavings)} روپے بچیں گے۔`,
      `یہ حساب ${urduNumber(lpgPrice)} روپے فی کلو ایل پی جی پر ہے۔`,
      `سمجھ استعمال کرنے کا شکریہ۔`,
    ].filter(Boolean);
  }

  // English fallback
  const parts = [];
  if (animalCounts.buffalo > 0) parts.push(`${animalCounts.buffalo} buffalo`);
  if (animalCounts.cow > 0)     parts.push(`${animalCounts.cow} cow${animalCounts.cow > 1 ? 's' : ''}`);
  if (animalCounts.goat > 0)    parts.push(`${animalCounts.goat} goat${animalCounts.goat > 1 ? 's' : ''}`);

  return [
    `Samjh Biogas Calculator.`,
    `You have ${parts.join(' and ')}.`,
    `Your animals produce ${totalDailyDung} kilograms of dung daily.`,
    `This gives ${monthlyBiogas} cubic meters of biogas per month.`,
    `Every month you save ${monthlyLPGSavings.toLocaleString()} rupees on LPG.`,
    `You also get ${Math.round(monthlyDigestateVolume)} kilograms of fertilizer per month.`,
    `That fertilizer is worth ${monthlyFertilizerValue.toLocaleString()} rupees.`,
    `Your total monthly saving is ${totalMonthlySavings.toLocaleString()} rupees.`,
    `Over a full year, you save ${totalAnnualSavings.toLocaleString()} rupees in total.`,
    `Based on LPG at ${lpgPrice} rupees per kilogram.`,
    `Thank you for using Samjh.`,
  ].filter(Boolean);
}

export function preloadVoices() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.getVoices();
  }
}

const API = import.meta.env.VITE_API_URL || 'http://localhost:3001';

// Try Google Cloud TTS via backend — returns Audio element or null
export async function speakViaBackend(results, animalCounts, onEnd) {
  // Always build Urdu text for backend (Google has a real ur-PK voice)
  const sentences = buildSentences(results, animalCounts, true);
  const text = sentences.join(' ');

  try {
    const res = await fetch(`${API}/api/tts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });

    if (!res.ok) return null; // 503 = not configured, fall back silently

    const { audio } = await res.json();
    if (!audio) return null;

    const audioEl = new Audio(`data:audio/mp3;base64,${audio}`);
    audioEl.onended = () => onEnd && onEnd();
    audioEl.onerror = () => { onEnd && onEnd(); };
    await audioEl.play();
    return audioEl;
  } catch {
    return null; // offline or server down — fall back to Web Speech
  }
}

// Speak a queue of short sentences one after another
function speakQueue(sentences, voice, lang, index, onEnd) {
  if (index >= sentences.length) {
    onEnd && onEnd();
    return;
  }

  const utt = new SpeechSynthesisUtterance(sentences[index]);
  utt.lang   = lang;
  utt.rate   = 0.85;
  utt.pitch  = 1;
  utt.volume = 1;
  if (voice) utt.voice = voice;

  utt.onend = () => speakQueue(sentences, voice, lang, index + 1, onEnd);
  utt.onerror = (e) => {
    // 'interrupted' just means cancel() was called — not a real error
    if (e.error !== 'interrupted' && e.error !== 'canceled') {
      console.error(`[Samjh TTS] sentence ${index} error: "${e.error}" — text: "${sentences[index]}"`);
    }
    onEnd && onEnd();
  };

  window.speechSynthesis.speak(utt);
}

// Must be called synchronously inside a click handler
export function speakSavings(results, animalCounts, onEnd) {
  if (!('speechSynthesis' in window)) {
    alert('آواز سپورٹ نہیں ہے | Voice not supported on this device.');
    onEnd && onEnd();
    return;
  }

  window.speechSynthesis.cancel();

  const voices = window.speechSynthesis.getVoices();
  console.log('[Samjh TTS] voices loaded:', voices.length,
    voices.map(v => `${v.name} (${v.lang})`).join(', '));

  const urduVoice  = voices.find(v => v.lang.startsWith('ur'));
  const useUrdu    = !!urduVoice;  // Hindi voice can't read Urdu/Arabic script
  const voice      = urduVoice || voices.find(v => v.name.includes('Zira')) || voices.find(v => v.lang.startsWith('en')) || null;
  const lang       = voice ? voice.lang : 'en-US';

  console.log('[Samjh TTS] selected voice:', voice ? `${voice.name} (${voice.lang})` : 'browser default en-US');

  const sentences = buildSentences(results, animalCounts, useUrdu);
  speakQueue(sentences, voice, lang, 0, onEnd);
}
