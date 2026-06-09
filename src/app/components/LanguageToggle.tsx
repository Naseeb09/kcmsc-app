import { useAppContext } from '@/context/AppContext';

export function LanguageToggle() {
  const { language, setLanguage } = useAppContext();

  return (
    <div className="flex items-center bg-[#1a2e1c]/80 backdrop-blur-md border border-[#059669]/20 rounded-full p-0.5 shadow-lg">
      <button
        onClick={() => setLanguage('en')}
        className={`px-2 py-0.5 rounded-full text-[9px] font-black transition-all duration-300 ${
          language === 'en'
            ? 'bg-[#059669] text-[#0d1f0f] shadow-sm'
            : 'text-[#a0b5a3] hover:text-[#fbbf24]'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLanguage('bn')}
        className={`px-2 py-0.5 rounded-full text-[9px] font-black transition-all duration-300 ${
          language === 'bn'
            ? 'bg-[#059669] text-[#0d1f0f] shadow-sm'
            : 'text-[#a0b5a3] hover:text-[#fbbf24]'
        }`}
      >
        BN
      </button>
    </div>
  );
}
