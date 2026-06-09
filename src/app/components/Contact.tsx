import React from 'react';
import { 
  ChevronLeft, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  AlertCircle, 
  Globe,
  Printer,
  Headphones,
  Navigation,
  ArrowUpRight,
  ShieldAlert
} from 'lucide-react';
import { Card, CardContent } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Separator } from '@/app/components/ui/separator';
import { contactInfo } from "@/data/announcements";
import { useTranslation } from '@/hooks/useTranslation';
import { LanguageToggle } from '@/app/components/LanguageToggle';

interface ContactProps {
  onNavigate: (view: string) => void;
}

export function Contact({ onNavigate }: ContactProps) {
  const { t } = useTranslation();

  // Error Guard
  if (!contactInfo) {
    return (
      <div className="min-h-screen bg-[#0d1f0f] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center mb-6 border border-red-500/20">
          <AlertCircle className="w-10 h-10 text-red-500 animate-pulse" />
        </div>
        <h2 className="text-white font-black uppercase tracking-[0.3em] mb-2">System Error</h2>
        <p className="text-[#a0b5a3] text-xs font-medium mb-6">Contact directory is currently unreachable.</p>
        <button 
          onClick={() => onNavigate('home')} 
          className="bg-[#059669] text-white px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest active:scale-95 transition-all"
        >
          Return Home
        </button>
      </div>
    );
  }

  return (
    <div className="pb-40 bg-[#0d1f0f] min-h-screen font-sans selection:bg-[#fbbf24] selection:text-[#0d1f0f]">
      
{/* 1. HEADER - COMPACT HEIGHT VERSION */}
      <header className="relative bg-[#1a2e1c] px-6 pt-10 pb-8 border-b border-[#059669]/20 overflow-hidden">
        {/* Ambient Glow matching Home & Map pages */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#059669]/10 via-transparent to-transparent opacity-50" />
        
        <div className="max-w-md mx-auto relative z-10">
          <div className="flex items-center gap-4">
            {/* Rectangular Back Button */}
            <button
              onClick={() => onNavigate('home')}
              className="w-11 h-11 rounded-xl bg-[#0d1f0f] flex items-center justify-center border border-[#059669]/20 text-[#059669] hover:text-[#fbbf24] transition-all active:scale-95 shadow-lg"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <div className="flex-1">
              <h1 className="text-[10px] font-black text-[#059669] uppercase tracking-[0.4em] mb-0.5">{t('get_in_touch')}</h1>
              <div className="flex items-center gap-1.5 mt-1">
                <div className="w-1.5 h-1.5 rounded-full bg-[#059669] animate-pulse" />
                <p className="text-[9px] text-[#a0b5a3] uppercase font-bold tracking-widest opacity-60">{t('support_center')}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <LanguageToggle />
              <div className="w-11 h-11 rounded-xl bg-[#fbbf24]/5 border border-[#fbbf24]/10 flex items-center justify-center">
                <Headphones className="w-5 h-5 text-[#fbbf24] opacity-50" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-6 py-10 space-y-10">
        
        {/* 2. DIRECT LINES */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 mb-2 ml-1">
            <div className="w-1.5 h-1.5 rounded-full bg-[#fbbf24] animate-pulse" />
            <h3 className="text-[10px] font-black text-[#059669] uppercase tracking-[0.3em]">{t('direct_channels')}</h3>
          </div>
          
          <div className="grid gap-3">
            {/* Phone Card */}
            <a href={`tel:${contactInfo.phone}`} className="group bg-gradient-to-br from-[#1a2e1c] to-[#0d1f0f] border border-white/5 p-5 rounded-[1.8rem] flex items-center gap-4 active:scale-[0.98] transition-all shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#fbbf24]/5 blur-3xl rounded-full -mr-10 -mt-10" />
              <div className="w-12 h-12 bg-[#0d1f0f] border border-[#059669]/20 rounded-2xl flex items-center justify-center text-[#fbbf24] group-active:border-[#fbbf24]/40 transition-colors shadow-inner shrink-0 relative z-10">
                <Phone size={20} />
              </div>
              <div className="flex-1 min-w-0 relative z-10">
                <p className="text-[8px] uppercase tracking-[0.2em] text-[#059669] font-black mb-1">{t('institutional_desk')}</p>
                <p className="text-[#e8f5e9] font-black text-sm tracking-tight leading-tight">{contactInfo.phone}</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 group-active:bg-[#fbbf24]/10">
                <ArrowUpRight className="w-4 h-4 text-[#059669]/40 group-active:text-[#fbbf24]" />
              </div>
            </a>

            {/* Email Card */}
            <a href={`mailto:${contactInfo.email}`} className="group bg-gradient-to-br from-[#1a2e1c] to-[#0d1f0f] border border-white/5 p-5 rounded-[1.8rem] flex items-center gap-4 active:scale-[0.98] transition-all shadow-xl relative overflow-hidden">
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-[#059669]/5 blur-3xl rounded-full -mr-10 -mb-10" />
              <div className="w-12 h-12 bg-[#0d1f0f] border border-[#059669]/20 rounded-2xl flex items-center justify-center text-[#fbbf24] group-active:border-[#fbbf24]/40 transition-colors shadow-inner shrink-0 relative z-10">
                <Mail size={20} />
              </div>
              <div className="flex-1 min-w-0 relative z-10">
                <p className="text-[8px] uppercase tracking-[0.2em] text-[#059669] font-black mb-1">{t('official_inquiry')}</p>
                <p className="text-[#e8f5e9] font-black text-[13px] tracking-tight truncate">{contactInfo.email}</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 group-active:bg-[#fbbf24]/10">
                <ArrowUpRight className="w-4 h-4 text-[#059669]/40 group-active:text-[#fbbf24]" />
              </div>
            </a>
          </div>
        </section>

        {/* 3. AVAILABILITY & LOCALE */}
        <section className="grid grid-cols-1 gap-4">
          <div className="bg-[#112613] border border-[#059669]/10 rounded-[2rem] p-7 space-y-6">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-[#fbbf24]" />
              <span className="text-[10px] font-black text-white uppercase tracking-widest">{t('operating_hours')}</span>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[9px] text-[#059669] uppercase font-black tracking-widest">{t('academic_dept')}</p>
                  <p className="text-sm font-black text-[#e8f5e9] uppercase">{contactInfo.hours?.weekdays || "08:00 - 14:00"}</p>
                </div>
                <div className="text-right">
                  <p className="text-[9px] text-[#059669] uppercase font-black tracking-widest">{t('admin_office')}</p>
                  <p className="text-sm font-black text-[#e8f5e9] uppercase">{contactInfo.hours?.office || "09:00 - 16:00"}</p>
                </div>
              </div>
              <Separator className="bg-[#059669]/10" />
              <div className="flex items-center gap-4">
                <MapPin className="w-4 h-4 text-[#059669]" />
                <p className="text-[11px] text-[#a0b5a3] font-medium leading-relaxed uppercase">
                  {t(contactInfo.address)}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. EMERGENCY SYSTEM (CRITICAL) */}
        <section>
          <div className="bg-[#450a0a]/20 border border-red-500/20 rounded-[2rem] p-6 relative overflow-hidden group">
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-red-500/5 rounded-full blur-2xl group-hover:bg-red-500/10 transition-all duration-700" />
            <div className="flex items-center gap-5 relative z-10">
              <div className="w-12 h-12 xs:w-14 xs:h-14 bg-[#450a0a] rounded-2xl flex items-center justify-center text-red-500 border border-red-500/30 shadow-2xl shadow-red-500/10 shrink-0">
                <ShieldAlert size={24} className="animate-pulse" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-[9px] font-black text-red-500 uppercase tracking-[0.3em] mb-1">{t('emergency_sos')}</h4>
                <a href={`tel:${contactInfo.emergencyContact}`} className="text-xl xs:text-2xl font-black text-white hover:text-red-400 transition-colors tracking-tighter truncate block">
                  {contactInfo.emergencyContact}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 5. AUXILIARY TOOLS */}
        <section className="grid grid-cols-2 gap-3 xs:gap-4">
          <div className="bg-[#1a2e1c]/40 border border-white/5 p-4 xs:p-5 rounded-2xl flex flex-col gap-3">
             <Printer className="w-4 h-4 text-[#059669]" />
             <div className="min-w-0">
               <p className="text-[8px] text-[#059669] uppercase font-black tracking-widest truncate">{t('fax_line')}</p>
               <p className="text-[#e8f5e9] text-[10px] font-bold uppercase truncate">{contactInfo.fax || "N/A"}</p>
             </div>
          </div>
          <a href={contactInfo.website} target="_blank" rel="noreferrer" className="bg-[#1a2e1c]/40 border border-white/5 p-4 xs:p-5 rounded-2xl flex flex-col gap-3 group active:scale-95 transition-all min-w-0">
             <Globe className="w-4 h-4 text-[#fbbf24]" />
             <div className="min-w-0">
               <p className="text-[8px] text-[#059669] uppercase font-black tracking-widest group-hover:text-[#fbbf24] truncate">{t('official_web')}</p>
               <p className="text-[#e8f5e9] text-[10px] font-bold uppercase flex items-center gap-1 truncate">kcmsc.edu.bd <Navigation size={8} className="rotate-45" /></p>
             </div>
          </a>
        </section>
      </main>
    </div>
  );
}
