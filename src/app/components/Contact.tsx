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
  Headphones
} from 'lucide-react';
import { Card, CardContent } from '@/app/components/ui/card';
import { Separator } from '@/app/components/ui/separator';
import { contactInfo } from "@/data/announcements";

interface ContactProps {
  onNavigate: (view: string) => void;
}

export function Contact({ onNavigate }: ContactProps) {
  return (
    <div className="pb-20 bg-[#0d1f0f] min-h-screen font-sans">
      
      {/* 1. Header - Unified with schoolinfo.tsx */}
      <div className="bg-[#1a2e1c] px-6 py-4 border-b border-[#059669]/20">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={() => onNavigate('home')} // Fixed: Now leads back to home
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#1a3a1d] text-[#059669] hover:bg-[#059669]/10 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex-1">
              <h1 className="text-lg font-medium text-[#e8f5e9]">Contact Us</h1>
              <p className="text-[10px] text-[#a0b5a3] uppercase tracking-wide">Get in touch with administration</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-[#059669]/20 flex items-center justify-center">
              <Headphones className="w-5 h-5 text-[#fbbf24]" />
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-6 max-w-2xl mx-auto space-y-4">
        
        {/* 2. Main Contact Card - Matches SchoolInfo Overview style */}
        <Card className="bg-[#1a3a1d] border border-[#059669]/20 overflow-hidden">
          <CardContent className="p-0">
            <div className="p-5 border-b border-[#059669]/10">
              <h3 className="text-white font-semibold flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#fbbf24]"></span>
                General Inquiries
              </h3>
            </div>
            
            <div className="divide-y divide-[#059669]/10">
              {/* Phone */}
              <a href={`tel:${contactInfo.phone}`} className="flex items-center gap-4 p-5 hover:bg-[#059669]/5 transition-colors group">
                <div className="w-10 h-10 bg-[#059669]/20 rounded-xl flex items-center justify-center text-[#fbbf24]">
                  <Phone size={20} />
                </div>
                <div className="flex-1">
                  <p className="text-[10px] uppercase tracking-wider text-[#a0b5a3] font-bold">Phone Number</p>
                  <p className="text-[#e8f5e9] font-medium">{contactInfo.phone}</p>
                </div>
                <ChevronRight size={16} className="text-[#059669]/40 group-hover:text-[#fbbf24] transition-colors" />
              </a>

              {/* Email */}
              <a href={`mailto:${contactInfo.email}`} className="flex items-center gap-4 p-5 hover:bg-[#059669]/5 transition-colors group">
                <div className="w-10 h-10 bg-[#059669]/20 rounded-xl flex items-center justify-center text-[#fbbf24]">
                  <Mail size={20} />
                </div>
                <div className="flex-1">
                  <p className="text-[10px] uppercase tracking-wider text-[#a0b5a3] font-bold">Official Email</p>
                  <p className="text-[#e8f5e9] font-medium break-all">{contactInfo.email}</p>
                </div>
                <ChevronRight size={16} className="text-[#059669]/40 group-hover:text-[#fbbf24] transition-colors" />
              </a>

              {/* Address */}
              <div className="flex items-start gap-4 p-5">
                <div className="w-10 h-10 bg-[#059669]/20 rounded-xl flex items-center justify-center text-[#fbbf24] shrink-0">
                  <MapPin size={20} />
                </div>
                <div className="flex-1">
                  <p className="text-[10px] uppercase tracking-wider text-[#a0b5a3] font-bold">Campus Location</p>
                  <p className="text-[#e8f5e9] font-medium text-sm leading-relaxed">{contactInfo.address}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 3. Office Hours - Matches Key Information style */}
        <Card className="bg-[#1a3a1d] border border-[#059669]/20">
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-[#fbbf24]" />
              <h3 className="font-semibold text-white">Office Hours</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-[#a0b5a3]">School Hours</span>
                <span className="text-sm text-[#e8f5e9] font-medium">{contactInfo.hours.weekdays}</span>
              </div>
              <Separator className="bg-[#059669]/20" />
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-[#a0b5a3]">Administrative Office</span>
                <span className="text-sm text-[#e8f5e9] font-medium">{contactInfo.hours.office}</span>
              </div>
              <Separator className="bg-[#059669]/20" />
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-[#a0b5a3]">Weekends</span>
                <span className="text-sm text-red-400 font-medium">Closed</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 4. Emergency - Matches "High Priority Announcement" style */}
        <Card className="bg-[#1a3a1d] border border-red-500/30">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-red-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-5 h-5 text-red-500" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-semibold text-white text-sm">Emergency Hotline</h4>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 font-bold uppercase">Urgent</span>
                </div>
                <p className="text-xs text-[#a0b5a3] mb-3">Outside of school hours only</p>
                <a
                  href={`tel:${contactInfo.emergencyContact}`}
                  className="inline-flex items-center gap-2 text-red-400 font-bold text-lg hover:text-red-300 transition-colors"
                >
                  <Phone size={16} />
                  {contactInfo.emergencyContact}
                </a>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 5. Additional Tools */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-[#1a3a1d] border border-[#059669]/20 p-4 rounded-xl">
             <Printer className="w-5 h-5 text-[#fbbf24] mb-2" />
             <p className="text-[10px] text-[#a0b5a3] uppercase font-bold">Fax</p>
             <p className="text-[#e8f5e9] text-xs font-medium">{contactInfo.fax}</p>
          </div>
          <div className="bg-[#1a3a1d] border border-[#059669]/20 p-4 rounded-xl">
             <Globe className="w-5 h-5 text-[#fbbf24] mb-2" />
             <p className="text-[10px] text-[#a0b5a3] uppercase font-bold">Website</p>
             <p className="text-[#e8f5e9] text-xs font-medium truncate">{contactInfo.website}</p>
          </div>
        </div>
      </div>
    </div>
  );
}