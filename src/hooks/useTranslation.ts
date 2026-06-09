import { useAppContext } from '@/context/AppContext';
import { translations, TranslationKey } from '@/data/translations';

export function useTranslation() {
  const { language } = useAppContext();

  const t = (key: TranslationKey | string) => {
    const translation = translations[key];
    if (translation) {
      return translation[language] || key;
    }

    if (language === 'bn') {
      // Smart translation for dynamic content
      let translated = key;
      
      // Academic levels
      if (key.toLowerCase().includes('nursery')) translated = translated.replace(/Nursery/gi, 'নার্সারি');
      if (key.toLowerCase().includes('kg')) translated = translated.replace(/KG/gi, 'কেজি');
      if (key.toLowerCase().includes('one')) translated = translated.replace(/One/gi, 'প্রথম');
      if (key.toLowerCase().includes('two')) translated = translated.replace(/Two/gi, 'দ্বিতীয়');
      if (key.toLowerCase().includes('three')) translated = translated.replace(/Three/gi, 'তৃতীয়');
      if (key.toLowerCase().includes('four')) translated = translated.replace(/Four/gi, 'চতুর্থ');
      if (key.toLowerCase().includes('five')) translated = translated.replace(/Five/gi, 'পঞ্চম');
      if (key.toLowerCase().includes('six')) translated = translated.replace(/Six/gi, 'ষষ্ঠ');
      if (key.toLowerCase().includes('seven')) translated = translated.replace(/Seven/gi, 'সপ্তম');
      if (key.toLowerCase().includes('eight')) translated = translated.replace(/Eight/gi, 'অষ্টম');
      if (key.toLowerCase().includes('nine')) translated = translated.replace(/Nine/gi, 'নবম');
      if (key.toLowerCase().includes('ten')) translated = translated.replace(/Ten/gi, 'দশম');
      if (key.toLowerCase().includes('eleven')) translated = translated.replace(/Eleven/gi, 'একাদশ');
      if (key.toLowerCase().includes('twelve')) translated = translated.replace(/Twelve/gi, 'দ্বাদশ');

      // Common locations
      if (key.toLowerCase().includes('floor')) translated = translated.replace(/(\d+)(st|nd|rd|th)?\s+Floor/gi, (_, num) => {
        const bnNums: any = { '1': '১ম', '2': '২য়', '3': '৩য়', '4': '৪র্থ', '5': '৫ম', '6': '৬ষ্ঠ', '7': '৭ম', '8': '৮ম', '9': '৯ম' };
        return `${bnNums[num] || num} তলা`;
      });
      if (key.toLowerCase().includes('room')) translated = translated.replace(/Room/gi, 'রুম');
      if (key.toLowerCase().includes('office')) translated = translated.replace(/Office/gi, 'কার্যালয়');
      if (key.toLowerCase().includes('principal')) translated = translated.replace(/Principal/gi, 'অধ্যক্ষ');
      if (key.toLowerCase().includes('teacher')) translated = translated.replace(/Teacher/gi, 'শিক্ষক');
      if (key.toLowerCase().includes('lab')) translated = translated.replace(/Lab/gi, 'ল্যাব');
      if (key.toLowerCase().includes('library')) translated = translated.replace(/Library/gi, 'লাইব্রেরি');

      return translated;
    }

    return key;
  };

  return { t, language };
}
