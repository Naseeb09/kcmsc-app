import { MapPin, ChevronLeft, Navigation, Globe, Compass, Info, Building2, Car, Shield, TrainFront, ExternalLink, Clock, PhoneCall } from 'lucide-react';
import { Badge } from '@/app/components/ui/badge';
import { contactInfo } from "@/data/announcements";
import buildingImg from "@/data/KCMSC Building.jpg";
import { useTranslation } from '@/hooks/useTranslation';
import { LanguageToggle } from '@/app/components/LanguageToggle';

interface MapProps {
  onNavigate: (view: string) => void;
}

export function Map({ onNavigate }: MapProps) {
  const { t, s, language } = useTranslation();
  const pinterestUrl = "https://www.pinterest.com/kcmscofficial/";

  return (
    <div className="pb-24 bg-[#0d1f0f] min-h-screen font-sans selection:bg-[#fbbf24] selection:text-[#0d1f0f]">
      
{/* 1. HEADER - CONTEXTUAL NAVIGATION */}
      <header className="relative bg-[#1a2e1c] px-6 pt-10 pb-8 border-b border-[#059669]/30 overflow-hidden">
        {/* Enhanced Ambient Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#059669]/20 blur-[100px] rounded-full -mr-20 -mt-20 opacity-60" />
        
        <div className="max-w-md mx-auto relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Rectangular Back Button */}
              <button
                onClick={() => onNavigate('home')}
                className="w-11 h-11 rounded-xl bg-[#0d1f0f] flex items-center justify-center border border-[#059669]/40 text-[#059669] shadow-[0_0_15px_rgba(5,150,105,0.1)] active:scale-95 transition-all"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              
              <div>
                <h1 className={s("text-[11px] font-black text-white uppercase tracking-[0.4em] leading-none mb-1.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]")}>
                  {t('campus_label')} <span className="text-[#059669]">{t('location_label')}</span>
                </h1>
                <div className="flex items-center gap-2">
                  {/* Pulsing Status - Aligned with Fees Page style */}
                  <div className="w-1.5 h-1.5 rounded-full bg-[#fbbf24] animate-pulse" />
                  <p className={s("text-[9px] text-[#a0b5a3] uppercase font-bold tracking-[0.2em]")}>{t('find_the_campus')}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <LanguageToggle />
              {/* Contextual Icon Container - Matches the Tuition Structure Style */}
              <div className="w-12 h-12 rounded-2xl bg-[#fbbf24]/5 border border-[#fbbf24]/20 flex items-center justify-center shadow-2xl backdrop-blur-md transition-transform hover:rotate-12">
                  <MapPin className="w-6 h-6 text-[#fbbf24] drop-shadow-[0_0_8px_rgba(251,191,36,0.4)]" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-6 py-8 space-y-6">
        
        {/* 2. Building Hero Section */}
        <section className="relative group">
          <div className="relative bg-[#1a2e1c] border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl">
            <div className="aspect-[4/3] relative">
              <img 
                src={buildingImg}
                alt="KC Model School & College Building"
                className="w-full h-full object-cover transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d1f0f] via-transparent to-transparent opacity-80" />
              
              <div className="absolute bottom-6 left-6 right-6">
                <Badge className={s("bg-[#fbbf24] text-[#0d1f0f] border-0 px-2.5 py-1 text-[9px] font-black uppercase tracking-widest mb-2 shadow-lg")}>{t('main_campus')}</Badge>
                <h3 className="text-2xl font-black text-white uppercase tracking-tight leading-none">KC Model School <br/>& College</h3>
              </div>
            </div>
            
            <div className="p-5 bg-[#112613] flex items-center justify-between border-t border-[#059669]/20">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#059669] shadow-[0_0_8px_#059669]" />
                    <span className={s("text-[10px] font-black text-white uppercase tracking-widest")}>{t('premises_active')}</span>
                </div>
                <a 
                  href={pinterestUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={s("text-[10px] font-black text-[#fbbf24] uppercase tracking-widest flex items-center gap-1.5 hover:underline")}
                >
                    {t('view_gallery')} <ExternalLink size={12} />
                </a>
            </div>
          </div>
        </section>

        {/* 3. Address Card */}
        <div className="bg-[#1a2e1c] border border-[#059669]/20 rounded-[2rem] p-6 shadow-xl">
            <div className="flex items-center gap-4 mb-5">
                <div className="w-12 h-12 rounded-2xl bg-[#0d1f0f] border border-[#fbbf24]/20 flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-[#fbbf24]" />
                </div>
                <div>
                    <p className={s("text-[10px] font-black text-[#059669] uppercase tracking-widest mb-1")}>{t('physical_address')}</p>
                    <p className="text-sm font-bold text-white uppercase leading-tight">{t(contactInfo.address)}</p>
                </div>
            </div>
            <button className={s("w-full bg-[#059669] text-[#0d1f0f] py-4 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 active:scale-95")}>
                <Navigation className="w-4 h-4 fill-current" />
                {t('open_maps_navigation')}
            </button>
        </div>

        {/* 4. Quick Info Grid */}
        <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#1a2e1c] border border-white/5 rounded-[2rem] p-5">
                <Clock className="w-5 h-5 text-[#fbbf24] mb-3" />
                <p className={s("text-[9px] font-black text-[#059669] uppercase tracking-widest mb-1")}>{t('office_hours')}</p>
                <p className="text-xs text-white font-bold uppercase">{t(contactInfo.officeHours)}</p>
            </div>
            <div className="bg-[#1a2e1c] border border-white/5 rounded-[2rem] p-5">
                <PhoneCall className="w-5 h-5 text-[#059669] mb-3" />
                <p className={s("text-[9px] font-black text-[#059669] uppercase tracking-widest mb-1")}>{t('contact_office')}</p>
                <p className="text-xs text-white font-bold uppercase">{contactInfo.phone}</p>
                <button onClick={() => onNavigate('contact')} className={s("text-[9px] font-black text-[#fbbf24] uppercase mt-2 block")}>{t('support_info')} →</button>
            </div>
        </div>

        {/* 5. Context Section */}
        <section className="space-y-3">
            <h4 className={s("text-[10px] font-black text-[#059669] uppercase tracking-[0.3em] ml-2")}>{t('area_context')}</h4>
            <div className="space-y-3">
                <div className="bg-[#112613] border border-white/5 rounded-2xl p-4 flex items-center gap-4">
                    <Building2 size={20} className="text-[#059669]" />
                    <div>
                        <p className="text-xs font-black text-white uppercase">{t('prembagan_landmark')}</p>
                        <p className="text-[10px] text-[#a0b5a3] font-bold uppercase opacity-60">{t('landmark_desc')}</p>
                    </div>
                </div>

                <div className="bg-[#112613] border border-white/5 rounded-2xl p-4 flex items-center gap-4">
                    <TrainFront size={20} className="text-[#fbbf24]" />
                    <div>
                        <p className="text-xs font-black text-white uppercase">{t('public_connectivity')}</p>
                        <p className="text-[10px] text-[#a0b5a3] font-bold uppercase opacity-60">{t('connectivity_desc')}</p>
                    </div>
                </div>
            </div>
        </section>

        {/* 6. Visitor Info */}
        <div className="bg-[#fbbf24]/10 border border-[#fbbf24]/20 rounded-[2rem] p-5">
          <div className="flex items-start gap-3">
            <Info className="text-[#fbbf24] w-5 h-5 shrink-0" />
            <p className="text-[11px] text-white leading-relaxed font-bold uppercase">
              <span className="text-[#fbbf24] font-black mr-1">{t('visitor_info_title')}:</span> 
              {t('visitor_info_desc')}
            </p>
          </div>
        </div>

      </main>
    </div>
  );
}