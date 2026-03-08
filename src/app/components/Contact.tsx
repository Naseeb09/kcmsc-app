import React from 'react';
import { 
  ChevronLeft, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  AlertCircle, 
  ChevronRight,
  Globe,
  Printer,
  Headphones,
  Navigation
} from 'lucide-react';
import { Card, CardContent } from '@/app/components/ui/card';
import { Separator } from '@/app/components/ui/separator';
import { contactInfo } from "@/data/announcements"; // Verify this export exists!

interface ContactProps {
  onNavigate: (view: string) => void;
}

export function Contact({ onNavigate }: ContactProps) {
  // Guard clause to prevent "Cannot read property of undefined" crash
  if (!contactInfo) {
    return (
      <div className="min-h-screen bg-[#0d1f0f] flex items-center justify-center p-6 text-center">
        <div className="space-y-4">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto" />
          <h2 className="text-white font-black uppercase tracking-widest">Data Error</h2>
          <p className="text-[#a0b5a3] text-sm">Contact information could not be loaded.</p>
          <button onClick={() => onNavigate('home')} className="text-[#fbbf24] text-xs font-bold underline">Back to Home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-20 bg-[#0d1f0f] min-h-screen">
      
      {/* HEADER: Matches ClassSearch & FloorNav */}
      <div className="bg-[#1a2e1c] px-6 pt-6 pb-4 border-b border-[#059669]/20 sticky top-0 z-20">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate('home')}
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#0d1f0f] text-[#059669] border border-[#059669]/20"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="flex-1">
              <h1 className="text-[10px] font-black text-[#059669] uppercase tracking-[0.3em]">Support Center</h1>
              <h2 className="text-sm font-bold text-[#e8f5e9]">Contact Administration</h2>
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#fbbf24]/10 border border-[#fbbf24]/20 flex items-center justify-center">
              <Headphones className="w-5 h-5 text-[#fbbf24]" />
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-6 max-w-2xl mx-auto space-y-6">
        
        {/* MAIN CONTACT INFO */}
        <div className="space-y-3">
          <h3 className="text-[10px] font-black text-[#059669] uppercase tracking-[0.4em] ml-1">Direct Lines</h3>
          
          <div className="grid gap-3">
            {/* Phone */}
            <a href={`tel:${contactInfo.phone}`} className="group bg-gradient-to-r from-[#1a3a1d] to-[#0d1f0f] border border-white/5 p-5 rounded-[1.5rem] flex items-center gap-4 hover:border-[#fbbf24]/30 transition-all">
              <div className="w-12 h-12 bg-[#0d1f0f] border border-[#059669]/20 rounded-2xl flex items-center justify-center text-[#fbbf24] group-hover:border-[#fbbf24]/40">
                <Phone size={22} />
              </div>
              <div className="flex-1">
                <p className="text-[9px] uppercase tracking-widest text-[#059669] font-black">Call Office</p>
                <p className="text-[#e8f5e9] font-bold text-base">{contactInfo.phone}</p>
              </div>
              <Navigation className="w-4 h-4 text-[#fbbf24] rotate-45 opacity-0 group-hover:opacity-100 transition-all" />
            </a>

            {/* Email */}
            <a href={`mailto:${contactInfo.email}`} className="group bg-gradient-to-r from-[#1a3a1d] to-[#0d1f0f] border border-white/5 p-5 rounded-[1.5rem] flex items-center gap-4 hover:border-[#fbbf24]/30 transition-all">
              <div className="w-12 h-12 bg-[#0d1f0f] border border-[#059669]/20 rounded-2xl flex items-center justify-center text-[#fbbf24] group-hover:border-[#fbbf24]/40">
                <Mail size={22} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[9px] uppercase tracking-widest text-[#059669] font-black">Official Mail</p>
                <p className="text-[#e8f5e9] font-bold text-sm truncate">{contactInfo.email}</p>
              </div>
            </a>
          </div>
        </div>

        {/* OFFICE HOURS & LOCATION */}
        <div className="grid md:grid-cols-2 gap-4">
          <Card className="bg-[#1a3a1d]/40 border border-white/5 rounded-[1.5rem]">
            <CardContent className="p-5 space-y-4">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#fbbf24]" />
                <span className="text-[10px] font-black text-[#e8f5e9] uppercase tracking-widest">Office Hours</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-[#a0b5a3]">Academic</span>
                  <span className="text-white font-bold">{contactInfo.hours?.weekdays}</span>
                </div>
                <Separator className="bg-white/5" />
                <div className="flex justify-between text-xs">
                  <span className="text-[#a0b5a3]">Admin</span>
                  <span className="text-white font-bold">{contactInfo.hours?.office}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#1a3a1d]/40 border border-white/5 rounded-[1.5rem]">
            <CardContent className="p-5 space-y-3">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#fbbf24]" />
                <span className="text-[10px] font-black text-[#e8f5e9] uppercase tracking-widest">Location</span>
              </div>
              <p className="text-[#a0b5a3] text-xs leading-relaxed font-medium">
                {contactInfo.address}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* EMERGENCY HOTLINE */}
        <Card className="bg-[#450a0a]/20 border border-red-500/20 rounded-[1.5rem] overflow-hidden">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="w-12 h-12 bg-red-500/10 rounded-2xl flex items-center justify-center text-red-500 border border-red-500/20">
              <AlertCircle size={24} />
            </div>
            <div className="flex-1">
              <h4 className="text-[10px] font-black text-red-500 uppercase tracking-widest">Emergency Hotline</h4>
              <a href={`tel:${contactInfo.emergencyContact}`} className="text-lg font-black text-white hover:text-red-400 transition-colors">
                {contactInfo.emergencyContact}
              </a>
            </div>
          </CardContent>
        </Card>

        {/* FOOTER TOOLS */}
        <div className="grid grid-cols-2 gap-3 pb-8">
          <div className="bg-[#1a3a1d]/20 border border-white/5 p-4 rounded-2xl flex items-center gap-3">
             <Printer className="w-4 h-4 text-[#059669]" />
             <div className="min-w-0">
               <p className="text-[8px] text-[#059669] uppercase font-black tracking-widest">Fax</p>
               <p className="text-[#e8f5e9] text-[10px] font-bold truncate">{contactInfo.fax}</p>
             </div>
          </div>
          <a href={contactInfo.website} target="_blank" className="bg-[#1a3a1d]/20 border border-white/5 p-4 rounded-2xl flex items-center gap-3 hover:border-[#fbbf24]/30">
             <Globe className="w-4 h-4 text-[#059669]" />
             <div className="min-w-0">
               <p className="text-[8px] text-[#059669] uppercase font-black tracking-widest">Web</p>
               <p className="text-[#e8f5e9] text-[10px] font-bold truncate">Visit Site</p>
             </div>
          </a>
        </div>
      </div>
    </div>
  );
}