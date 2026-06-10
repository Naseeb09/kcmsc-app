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
      // Smart translation for dynamic content using word boundaries to protect names
      let translated = key;
      
      const academicMaps: Record<string, string> = {
        'Nursery': 'নার্সারি',
        'KG': 'কেজি',
        'One': 'প্রথম',
        'Two': 'দ্বিতীয়',
        'Three': 'তৃতীয়',
        'Four': 'চতুর্থ',
        'Five': 'পঞ্চম',
        'Six': 'ষষ্ঠ',
        'Seven': 'সপ্তম',
        'Eight': 'অষ্টম',
        'Nine': 'নবম',
        'Ten': 'দশম',
        'Eleven': 'একাদশ',
        'Twelve': 'দ্বাদশ',
        'Class': 'শ্রেণী',
        'Room': 'রুম',
        'Floor': 'তলা',
        'Office': 'কার্যালয়',
        'Principal': 'অধ্যক্ষ',
        'Lab': 'ল্যাব',
        'Library': 'লাইব্রেরি',
        'Teacher': 'শিক্ষক',
        'Senior': 'সিনিয়র',
        'Junior': 'জুনিয়র'
      };

      Object.entries(academicMaps).forEach(([en, bn]) => {
        const regex = new RegExp(`\\b${en}\\b`, 'gi');
        translated = translated.replace(regex, bn);
      });

      // Handle Floor numbers specifically
      translated = translated.replace(/(\d+)(st|nd|rd|th)?\s+Floor/gi, (_, num) => {
        const bnNums: any = { '1': '১ম', '2': '২য়', '3': '৩য়', '4': '৪র্থ', '5': '৫ম', '6': '৬ষ্ঠ', '7': '৭ম', '8': '৮ম', '9': '৯ম' };
        return `${bnNums[num] || num} তলা`;
      });

      return translated;
    }

    return key;
  };

  /**
   * Style helper for "Glitched" headers.
   * Reduces tracking for English and removes it completely for Bengali.
   * Also removes uppercase for Bengali.
   */
  const s = (baseClasses: string) => {
    if (language === 'bn') {
      return baseClasses
        .split(' ')
        .filter(cls => !cls.startsWith('tracking-') && cls !== 'uppercase')
        .join(' ');
    }
    // For English, reduce tracking if it's too wide
    return baseClasses.replace(/tracking-\[0\.4em\]/g, 'tracking-[0.15em]')
                      .replace(/tracking-\[0\.5em\]/g, 'tracking-[0.2em]')
                      .replace(/tracking-widest/g, 'tracking-wider');
  };

  return { t, s, language };
}
