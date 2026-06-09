import { ChevronLeft, Info, Search, Building2, ArrowRight } from 'lucide-react';
import { useState, useMemo } from 'react';
import { useAppContext } from '@/context/AppContext';
import { useTranslation } from '@/hooks/useTranslation';
import { LanguageToggle } from '@/app/components/LanguageToggle';

interface FloorMapsProps {
  onNavigate: (view: string, data?: any) => void;
}

export function FloorMaps({ onNavigate }: FloorMapsProps) {
  const { floors } = useAppContext();
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');

  // Deep filter for floors
  const filteredFloors = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return floors.filter(f => 
      f.name.toLowerCase().includes(query) || 
      f.purpose.toLowerCase().includes(query) ||
      f.label.toLowerCase().includes(query)
    );
  }, [floors, searchQuery]);

  return (
    <div className="pb-20 bg-[#0d1f0f] min-h-screen">
      <div className="bg-[#1a2e1c] px-6 pt-6 pb-4 border-b border-[#059669]/20 sticky top-0 z-20">
        <div className="max-w-2xl mx-auto space-y-4">
          <div className="flex items-center gap-3">
            <button onClick={() => onNavigate('home')} className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#0d1f0f] text-[#059669] border border-[#059669]/20">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="flex-1">
              <h1 className="text-[10px] font-black text-[#059669] uppercase tracking-[0.3em]">{t('Building Map')}</h1>
              <h2 className="text-sm font-bold text-[#e8f5e9]">{t('Campus Directory')}</h2>
            </div>
            <LanguageToggle />
          </div>
          
          <div className="relative pb-2">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#059669]" />
            <input
              type="text"
              placeholder={t('Search floors or sections...')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0d1f0f] border border-[#059669]/30 rounded-2xl py-4 pl-11 pr-4 text-sm text-white focus:outline-none focus:border-[#fbbf24]/50 transition-all"
            />
          </div>
        </div>
      </div>

      <div className="px-6 py-6 max-w-2xl mx-auto space-y-6">
        {/* COMPACT STRUCTURE INFO BOX */}
        <div className="bg-gradient-to-br from-[#1a3a1d] to-[#0d1f0f] border border-[#059669]/20 rounded-2xl p-4 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-[#fbbf24]/10 flex items-center justify-center flex-shrink-0">
            <Building2 size={20} className="text-[#fbbf24]" />
          </div>
          <p className="text-[11px] text-[#a0b5a3] leading-tight uppercase tracking-tight font-medium">
            {t('Basement to 8th Floor')} • <span className="text-[#059669]">{t('KG to College Sections')}</span>
          </p>
        </div>

        <div className="space-y-3">
          {filteredFloors.map((floor) => (
            <div key={floor.id} onClick={() => onNavigate(`floor-detail-${floor.id}`)} className="group bg-[#1a2e1c] border border-white/5 hover:border-[#fbbf24]/30 rounded-2xl p-4 transition-all cursor-pointer flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center font-black text-[#0d1f0f] text-sm" style={{ backgroundColor: floor.color }}>
                  {floor.label}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#e8f5e9] group-hover:text-[#fbbf24] transition-colors">{t(floor.name)}</h3>
                  <p className="text-[9px] text-[#059669] font-black uppercase tracking-widest">{t(floor.purpose)}</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-[#059669]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}