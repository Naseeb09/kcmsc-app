import { useState, useEffect } from 'react';
import { ChevronLeft, Users, Star, Award, GraduationCap, Search, X } from 'lucide-react';
import { Card, CardContent } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { useAppContext } from '@/context/AppContext';
import { useTranslation } from '@/hooks/useTranslation';
import { LanguageToggle } from '@/app/components/LanguageToggle';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from '@/app/components/ui/carousel';

interface StaffDirectoryProps {
  onNavigate: (view: string) => void;
}

export function StaffDirectory({ onNavigate }: StaffDirectoryProps) {
  const { teachers } = useAppContext();
  const { t, s, language } = useTranslation();
  const [activeSection, setActiveSection] = useState<'Junior' | 'Senior'>('Senior');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const admins = teachers
    .filter(t => t.section?.toLowerCase() === 'admin')
    .sort((a, b) => {
      const roleA = (a.role || '').toLowerCase();
      const roleB = (b.role || '').toLowerCase();
      
      const getRank = (role: string) => {
        const r = role.toLowerCase();
        if (r.includes('chief advisor')) return 0;
        if (r.includes('principal') && !r.includes('vice')) return 1;
        if (r.includes('acting vice principal')) return 2;
        if (r.includes('vice principal') && r.includes('junior')) return 3;
        if (r.includes('vice principal')) return 4;
        if (r.includes('advisor')) return 5;
        if (r.includes('co-ordinator') || r.includes('coordinator')) return 6;
        return 7;
      };
      
      return getRank(roleA) - getRank(roleB);
    });
  
  const filteredTeachers = teachers.filter(te => {
    const isNotAdmin = te.section?.toLowerCase() !== 'admin';
    const matchesSection = te.section?.toLowerCase() === activeSection.toLowerCase();
    const matchesSearch = te.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         (te.subject || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (te.role || '').toLowerCase().includes(searchQuery.toLowerCase());
    
    if (searchQuery) return matchesSearch;
    return isNotAdmin && matchesSection && matchesSearch;
  });

  const getInitials = (name: string) => {
    const parts = name.split(' ').filter(part => part.length > 0 && !part.includes('.') && !part.includes('('));
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return parts[0]?.slice(0, 2).toUpperCase() || '??';
  };

  return (
    <div className="pb-28 bg-[#0d1f0f] min-h-screen">
      {/* HEADER - RESTORED PREMIUM STYLE */}
      <header className="relative bg-[#1a2e1c] px-6 pt-10 pb-8 border-b border-[#059669]/30 overflow-hidden sticky top-0 z-30">
        {/* Ambient Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#059669]/20 blur-[100px] rounded-full -mr-20 -mt-20 opacity-60" />
        
        <div className="max-w-md mx-auto relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => onNavigate('home')}
                className="w-11 h-11 rounded-xl bg-[#0d1f0f] flex items-center justify-center border border-[#059669]/40 text-[#059669] shadow-[0_0_15px_rgba(5,150,105,0.1)] active:scale-95 transition-all"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              
              <div>
                <h1 className={s("text-[11px] font-black text-white uppercase tracking-[0.4em] leading-none mb-1.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]")}>
                  {t('teacher_label')} <span className="text-[#059669]">{t('directory_label')}</span>
                </h1>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#fbbf24] animate-pulse" />
                  <p className={s("text-[9px] text-[#a0b5a3] uppercase font-bold tracking-[0.2em]")}>{t('teachers_admin')}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <LanguageToggle />
              <button 
                onClick={() => setIsSearching(!isSearching)}
                className={`w-11 h-11 rounded-xl flex items-center justify-center border transition-all ${isSearching ? 'bg-[#fbbf24] border-[#fbbf24] text-[#0d1f0f]' : 'bg-[#1a2e1c] border-[#059669]/40 text-[#fbbf24]'}`}
              >
                {isSearching ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
              </button>
              <div className="w-11 h-11 rounded-xl bg-[#fbbf24]/5 border border-[#fbbf24]/20 flex items-center justify-center shadow-2xl backdrop-blur-md">
                  <Users className="w-5 h-5 text-[#fbbf24] drop-shadow-[0_0_8px_rgba(251,191,36,0.4)]" />
              </div>
            </div>
          </div>

          {isSearching && (
            <div className="animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#059669]" />
                <input 
                  type="text"
                  placeholder={t('search_by_name')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#0d1f0f] border border-[#059669]/40 rounded-xl pl-11 pr-4 py-3.5 text-sm text-white focus:outline-none focus:border-[#fbbf24] transition-all shadow-inner"
                  autoFocus
                />
              </div>
            </div>
          )}
        </div>
      </header>

      <div className="px-6 py-8 max-w-2xl mx-auto space-y-8">
        
        {/* EXECUTIVE SUITE - VERTICAL LIST */}
        {!searchQuery && admins.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-4 h-4 text-[#fbbf24] fill-[#fbbf24]" />
              <h2 className="text-[10px] font-black text-[#059669] uppercase tracking-[0.3em]">{t('executive_suite')}</h2>
            </div>
            
            <div className="space-y-4">
              {admins.map((admin) => (
                <Card key={admin.id} className="bg-gradient-to-br from-[#1a3a1d] to-[#0d1f0f] border-2 border-[#fbbf24]/40 rounded-[2.5rem] overflow-hidden shadow-2xl relative group">
                  {/* Decorative elements */}
                  <div className="absolute top-0 right-0 p-6">
                    <Award className="w-8 h-8 text-[#fbbf24]/10 group-hover:text-[#fbbf24]/30 transition-all" />
                  </div>
                  <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#fbbf24]/5 rounded-full blur-3xl" />
                  
                  <CardContent className="p-6">
                    <div className="flex items-center gap-6">
                      <div className="w-24 h-24 rounded-[2rem] bg-[#0d1f0f] border-2 border-[#fbbf24]/60 flex-shrink-0 overflow-hidden shadow-[0_0_25px_rgba(251,191,36,0.1)]">
                        {admin.imageUrl ? (
                          <img src={admin.imageUrl} alt={admin.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[#fbbf24] text-2xl font-black">
                            {getInitials(admin.name)}
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-black text-white leading-tight mb-1 drop-shadow-md">
                          {t(admin.name)}
                        </h3>
                        <p className="text-[#fbbf24] text-[11px] font-black uppercase tracking-[0.2em] mb-3">
                          {t(admin.role || 'Administration')}
                        </p>
                        {admin.phone && (
                          <div className="flex items-center gap-2 bg-[#0d1f0f]/50 self-start px-3 py-1.5 rounded-full border border-white/5 w-fit">
                            <p className="text-[#a0b5a3] text-[9px] font-bold uppercase tracking-widest">
                              {t('phone_number')}: <span className="text-[#e8f5e9] ml-1">{admin.phone}</span>
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* SEGMENTED CONTROL - RESTORED PREMIUM STYLE */}
        {!searchQuery && (
          <div className="bg-[#1a2e1c] p-1.5 rounded-2xl flex gap-1.5 border border-[#059669]/20 shadow-2xl">
            <button
              onClick={() => setActiveSection('Junior')}
              className={`flex-1 py-3.5 rounded-xl text-[11px] font-black uppercase tracking-[0.15em] transition-all ${
                activeSection === 'Junior' 
                ? 'bg-[#059669] text-white shadow-lg' 
                : 'text-[#a0b5a3] hover:text-[#e8f5e9]'
              }`}
            >
              {t('junior_section')}
            </button>
            <button
              onClick={() => setActiveSection('Senior')}
              className={`flex-1 py-3.5 rounded-xl text-[11px] font-black uppercase tracking-[0.15em] transition-all ${
                activeSection === 'Senior' 
                ? 'bg-[#059669] text-white shadow-lg' 
                : 'text-[#a0b5a3] hover:text-[#e8f5e9]'
              }`}
            >
              {t('senior_section')}
            </button>
          </div>
        )}

        {/* TEACHER LIST - RESTORED PREMIUM STYLE */}
        <div className="space-y-4 pb-10">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-[#059669]" />
              <h2 className="text-[10px] font-black text-[#059669] uppercase tracking-[0.3em]">
                {searchQuery ? t('search_results') : t('faculty_members')}
              </h2>
            </div>
            <span className="text-[9px] font-black text-[#a0b5a3] bg-white/5 px-2 py-1 rounded-full">
              {filteredTeachers.length} {t('members')}
            </span>
          </div>

          <div className="grid gap-4">
            {filteredTeachers.map((te) => (
              <Card key={te.id} className="bg-[#1a3a1d]/40 border border-[#059669]/20 rounded-[1.5rem] hover:border-[#059669]/40 transition-all overflow-hidden">
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl bg-[#0d1f0f] border border-[#059669]/30 flex-shrink-0 overflow-hidden flex items-center justify-center">
                      {te.imageUrl ? (
                        <img src={te.imageUrl} alt={te.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="text-[#059669] text-sm font-black">
                          {getInitials(te.name)}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-black text-white truncate uppercase tracking-tight">
                        {t(te.name)}
                      </h3>
                      <p className={s("text-[10px] text-[#059669] font-bold uppercase tracking-wider mt-0.5")}>
                        {t(te.subject || 'teacher_label')} • {t(te.section || activeSection)}
                      </p>
                      
                      {te.formTeacherOf && (
                        <div className="mt-2 inline-flex items-center bg-[#fbbf24]/10 border border-[#fbbf24]/20 rounded-lg px-2 py-0.5">
                          <p className={s("text-[9px] text-[#fbbf24] font-black uppercase tracking-widest")}>
                            {t('form_teacher_of')} {t(te.formTeacherOf)}
                          </p>
                        </div>
                      )}

                      <div className="mt-4 pt-4 border-t border-[#059669]/10">
                        <p className={s("text-[10px] text-[#a0b5a3] font-bold uppercase tracking-[0.1em]")}>
                          {t('phone_number')}: <span className="text-[#fbbf24]">{te.phone || 'N/A'}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredTeachers.length === 0 && (
            <div className="py-20 text-center">
              <Search className="w-10 h-10 text-[#059669]/20 mx-auto mb-4" />
              <p className="text-[#a0b5a3] text-[10px] font-black uppercase tracking-widest">{t('no_members_found')}</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
