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

interface ContactProps {
  onNavigate: (view: string) => void;
}

export function Contact({ onNavigate }: ContactProps) {
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
    <div className="pb-20 bg-[#0d1f0f] min-h-screen font-sans selection:bg-[#fbbf24] selection:text-[#0d1f0f]">
      
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
              <h1 className="text-[10px] font-black text-[#059669] uppercase tracking-[0.4em] mb-0.5">Get in touch</h1>
              <div className="flex items-center gap-1.5 mt-1">
                <div className="w-1.5 h-1.5 rounded-full bg-[#059669] animate-pulse" />
                <p className="text-[9px] text-[#a0b5a3] uppercase font-bold tracking-widest opacity-60">Support Center</p>
              </div>
            </div>

            {/* Optional: Keeping the icon but keeping the height small */}
            <div className="w-11 h-11 rounded-xl bg-[#fbbf24]/5 border border-[#fbbf24]/10 flex items-center justify-center">
              <Headphones className="w-5 h-5 text-[#fbbf24] opacity-50" />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-6 py-10 space-y-10">
        
        {/* 2. DIRECT LINES */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#fbbf24] animate-pulse" />
            <h3 className="text-[10px] font-black text-white/90 uppercase tracking-[0.3em]">Communication Channels</h3>
          </div>
          
          <div className="grid gap-4">
            {/* Phone Card */}
            <a href={`tel:${contactInfo.phone}`} className="group bg-[#1a2e1c] border border-white/5 p-6 rounded-[2rem] flex items-center gap-5 active:scale-[0.98] transition-all">
              <div className="w-14 h-14 bg-[#0d1f0f] border border-[#059669]/20 rounded-2xl flex items-center justify-center text-[#fbbf24] group-hover:border-[#fbbf24]/40 transition-colors shadow-inner">
                <Phone size={24} />
              </div>
              <div className="flex-1">
                <p className="text-[9px] uppercase tracking-widest text-[#059669] font-black mb-0.5">Primary Desk</p>
                <p className="text-[#e8f5e9] font-black text-lg tracking-tight">{contactInfo.phone}</p>
              </div>
              <ArrowUpRight className="w-5 h-5 text-[#059669]/40 group-hover:text-[#fbbf24] transition-colors" />
            </a>

            {/* Email Card */}
            <a href={`mailto:${contactInfo.email}`} className="group bg-[#1a2e1c] border border-white/5 p-6 rounded-[2rem] flex items-center gap-5 active:scale-[0.98] transition-all">
              <div className="w-14 h-14 bg-[#0d1f0f] border border-[#059669]/20 rounded-2xl flex items-center justify-center text-[#fbbf24] group-hover:border-[#fbbf24]/40 transition-colors shadow-inner">
                <Mail size={24} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[9px] uppercase tracking-widest text-[#059669] font-black mb-0.5">Admin Mail</p>
                <p className="text-[#e8f5e9] font-black text-sm truncate uppercase tracking-tight">{contactInfo.email}</p>
              </div>
              <ArrowUpRight className="w-5 h-5 text-[#059669]/40 group-hover:text-[#fbbf24] transition-colors" />
            </a>
          </div>
        </section>

        {/* 3. AVAILABILITY & LOCALE */}
        <section className="grid grid-cols-1 gap-4">
          <div className="bg-[#112613] border border-[#059669]/10 rounded-[2rem] p-7 space-y-6">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-[#fbbf24]" />
              <span className="text-[10px] font-black text-white uppercase tracking-widest">Operating Hours</span>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[9px] text-[#059669] uppercase font-black tracking-widest">Academic Dept</p>
                  <p className="text-sm font-black text-[#e8f5e9] uppercase">{contactInfo.hours?.weekdays || "08:00 - 14:00"}</p>
                </div>
                <div className="text-right">
                  <p className="text-[9px] text-[#059669] uppercase font-black tracking-widest">Admin Office</p>
                  <p className="text-sm font-black text-[#e8f5e9] uppercase">{contactInfo.hours?.office || "09:00 - 16:00"}</p>
                </div>
              </div>
              <Separator className="bg-[#059669]/10" />
              <div className="flex items-center gap-4">
                <MapPin className="w-4 h-4 text-[#059669]" />
                <p className="text-[11px] text-[#a0b5a3] font-medium leading-relaxed uppercase">
                  {contactInfo.address}
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
              <div className="w-14 h-14 bg-[#450a0a] rounded-2xl flex items-center justify-center text-red-500 border border-red-500/30 shadow-2xl shadow-red-500/10">
                <ShieldAlert size={28} className="animate-pulse" />
              </div>
              <div className="flex-1">
                <h4 className="text-[9px] font-black text-red-500 uppercase tracking-[0.3em] mb-1">Emergency SOS</h4>
                <a href={`tel:${contactInfo.emergencyContact}`} className="text-2xl font-black text-white hover:text-red-400 transition-colors tracking-tighter">
                  {contactInfo.emergencyContact}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 5. AUXILIARY TOOLS */}
        <section className="grid grid-cols-2 gap-4">
          <div className="bg-[#1a2e1c]/40 border border-white/5 p-5 rounded-2xl flex flex-col gap-3">
             <Printer className="w-4 h-4 text-[#059669]" />
             <div>
               <p className="text-[8px] text-[#059669] uppercase font-black tracking-widest">Fax Line</p>
               <p className="text-[#e8f5e9] text-[10px] font-bold uppercase">{contactInfo.fax || "N/A"}</p>
             </div>
          </div>
          <a href={contactInfo.website} target="_blank" rel="noreferrer" className="bg-[#1a2e1c]/40 border border-white/5 p-5 rounded-2xl flex flex-col gap-3 group active:scale-95 transition-all">
             <Globe className="w-4 h-4 text-[#fbbf24]" />
             <div>
               <p className="text-[8px] text-[#059669] uppercase font-black tracking-widest group-hover:text-[#fbbf24]">Official Web</p>
               <p className="text-[#e8f5e9] text-[10px] font-bold uppercase flex items-center gap-1">kcmsc.edu.bd <Navigation size={8} className="rotate-45" /></p>
             </div>
          </a>
        </section>
      </main>
    </div>
  );
}