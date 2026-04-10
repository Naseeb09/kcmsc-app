import React from 'react';
import { 
  Info, History, Target, Eye, Heart, Award, 
  Megaphone, ChevronLeft, School, Sparkles, BookOpen 
} from 'lucide-react';
import { Card, CardContent } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Separator } from '@/app/components/ui/separator';
import { useAppContext } from '@/context/AppContext';
// Import schoolInfo directly as a fallback if context isn't populated
import { schoolInfo as localSchoolInfo } from '@/data/announcements';

interface SchoolInfoProps {
  onNavigate: (view: string) => void;
}

export function SchoolInfo({ onNavigate }: SchoolInfoProps) {
  // Pull notices from context, and check if schoolInfo exists in context too
  const { notices, schoolInfo: contextSchoolInfo } = useAppContext();
  
  // Use context data if available, otherwise fallback to the direct import
  const schoolData = contextSchoolInfo || localSchoolInfo;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-500/20 shadow-red-500/5';
      case 'medium': return 'border-amber-500/20 shadow-amber-500/5';
      default: return 'border-[#059669]/20 shadow-[#059669]/5';
    }
  };

  const getPriorityBadgeColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500 text-white';
      case 'medium': return 'bg-amber-500 text-[#0d1f0f]';
      default: return 'bg-[#059669] text-[#0d1f0f]';
    }
  };

  // Prevent crash if data is still missing
  if (!schoolData) return <div className="min-h-screen bg-[#0d1f0f]" />;

  return (
    <div className="pb-40 bg-[#0d1f0f] min-h-screen font-sans selection:bg-[#fbbf24] selection:text-[#0d1f0f]">
      
      {/* 1. HEADER - STANDOUT RECTANGULAR STYLE */}
      <header className="relative bg-[#1a2e1c] px-6 pt-10 pb-8 border-b border-[#059669]/30 overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#059669]/20 blur-[100px] rounded-full -mr-20 -mt-20 opacity-60" />
        
        <div className="max-w-md mx-auto relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => onNavigate('home')}
                className="w-11 h-11 rounded-xl bg-[#0d1f0f] flex items-center justify-center border border-[#059669]/40 text-[#059669] shadow-[0_0_15px_rgba(5,150,105,0.1)] active:scale-95 transition-all"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              
              <div>
                <h1 className="text-[11px] font-black text-white uppercase tracking-[0.4em] leading-none mb-1.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                  Institutional <span className="text-[#059669]">Profile</span>
                </h1>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#fbbf24] animate-pulse" />
                  <p className="text-[9px] text-[#a0b5a3] uppercase font-bold tracking-[0.2em]">About the School</p>
                </div>
              </div>
            </div>

            {/* Contextual Icon Container */}
            <div className="w-12 h-12 rounded-2xl bg-[#fbbf24]/5 border border-[#fbbf24]/20 flex items-center justify-center shadow-2xl backdrop-blur-md">
                <BookOpen className="w-5 h-5 text-[#fbbf24] drop-shadow-[0_0_8px_rgba(251,191,36,0.4)]" />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-6 py-10 space-y-10">
        
        {/* 2. School Overview */}
        <section>
          <div className="flex items-center gap-2 mb-6 ml-1">
            <Sparkles className="w-3 h-3 text-[#fbbf24]" />
            <h2 className="text-[10px] font-black text-[#059669] uppercase tracking-[0.3em]">Historical Overview</h2>
          </div>
          
          <div className="bg-gradient-to-br from-[#1a2e1c] to-[#112613] border border-white/5 rounded-[2.5rem] p-7 shadow-2xl relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#059669]/5 rounded-full blur-3xl" />
            <div className="flex items-center gap-5 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-[#0d1f0f] flex items-center justify-center border border-[#059669]/20 shadow-inner">
                <History className="w-7 h-7 text-[#fbbf24]" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-black text-white uppercase tracking-wide">{schoolData.name}</h3>
                <p className="text-[10px] text-[#fbbf24] font-bold mt-1 tracking-widest uppercase opacity-80">{schoolData.motto}</p>
              </div>
            </div>
            <p className="text-sm text-[#a0b5a3] leading-relaxed font-medium">{schoolData.about}</p>
          </div>
        </section>

        {/* 3. Mission & Vision */}
        <section className="grid grid-cols-1 gap-4">
          <div className="bg-[#1a2e1c] border border-white/5 rounded-[2rem] p-6 flex flex-col gap-4 shadow-xl">
            <div className="w-10 h-10 rounded-xl bg-[#0d1f0f] flex items-center justify-center border border-[#059669]/20">
              <Target className="w-5 h-5 text-[#fbbf24]" />
            </div>
            <div>
              <h3 className="text-[10px] font-black text-white uppercase tracking-[0.2em] mb-2">Our Mission</h3>
              <p className="text-xs text-[#a0b5a3] leading-relaxed font-medium">{schoolData.mission}</p>
            </div>
          </div>
          
          <div className="bg-[#1a2e1c] border border-white/5 rounded-[2rem] p-6 flex flex-col gap-4 shadow-xl">
            <div className="w-10 h-10 rounded-xl bg-[#0d1f0f] flex items-center justify-center border border-[#059669]/20">
              <Eye className="w-5 h-5 text-[#fbbf24]" />
            </div>
            <div>
              <h3 className="text-[10px] font-black text-white uppercase tracking-[0.2em] mb-2">Our Vision</h3>
              <p className="text-xs text-[#a0b5a3] leading-relaxed font-medium">{schoolData.vision}</p>
            </div>
          </div>
        </section>

        {/* 4. Core Values */}
        <section>
          <h2 className="text-[10px] font-black text-[#059669] uppercase tracking-[0.3em] mb-6 ml-1 flex items-center gap-2">
            <Heart className="w-3 h-3 text-[#fbbf24]" />
            Core Philosophy
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {schoolData.values?.map((value: string, index: number) => (
              <div key={index} className="bg-[#112613] border border-[#059669]/10 rounded-2xl p-4 flex items-center gap-3 shadow-md">
                <div className="w-1.5 h-1.5 rounded-full bg-[#fbbf24]" />
                <span className="text-[10px] font-black text-[#e8f5e9] uppercase tracking-wide">{value}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Statistics */}
        <section>
          <div className="bg-[#1a2e1c] border border-white/5 rounded-[2.5rem] p-8 shadow-2xl">
            <div className="flex items-center gap-3 mb-8">
              <Award className="w-5 h-5 text-[#fbbf24]" />
              <h3 className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Institutional Stats</h3>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[8px] text-[#a0b5a3] uppercase font-black tracking-widest mb-1">Scope</p>
                  <p className="text-xs font-black text-white uppercase">{schoolData.grades}</p>
                </div>
                <div className="text-right">
                  <p className="text-[8px] text-[#a0b5a3] uppercase font-black tracking-widest mb-1">Body</p>
                  <p className="text-xs font-black text-white uppercase">{schoolData.totalStudents}</p>
                </div>
              </div>
              
              <Separator className="bg-[#059669]/10" />
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[8px] text-[#a0b5a3] uppercase font-black tracking-widest mb-1">Ratio</p>
                  <p className="text-xs font-black text-white uppercase">{schoolData.studentTeacherRatio}</p>
                </div>
                <div className="text-right">
                  <p className="text-[8px] text-[#a0b5a3] uppercase font-black tracking-widest mb-1">Accreditation</p>
                  <p className="text-[9px] font-bold text-[#059669] uppercase tracking-tighter">{schoolData.accreditation}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Announcements */}
        <section className="pb-10">
          <div className="flex items-center justify-between mb-6 ml-1">
            <h2 className="text-[10px] font-black text-[#059669] uppercase tracking-[0.3em] flex items-center gap-2">
              <Megaphone className="w-3 h-3 text-[#fbbf24]" />
              Campus Notices
            </h2>
            <Badge className="bg-[#059669]/20 text-[#059669] border-0 text-[9px] font-black uppercase tracking-widest px-2 py-1">{notices?.length || 0} Active</Badge>
          </div>
          
          <div className="space-y-4">
            {notices?.map((announcement: any) => (
              <div 
                key={announcement.id} 
                className={`bg-[#1a2e1c] border-l-4 rounded-2xl p-6 shadow-xl transition-all ${getPriorityColor(announcement.priority)}`}
                style={{ borderLeftColor: announcement.priority === 'high' ? '#ef4444' : announcement.priority === 'medium' ? '#f59e0b' : '#059669' }}
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h4 className="font-black text-white text-[11px] uppercase tracking-wide flex-1 leading-tight">{announcement.title}</h4>
                  <Badge className={`${getPriorityBadgeColor(announcement.priority)} border-0 text-[8px] font-black uppercase tracking-tighter px-2 py-0.5 rounded-md`}>
                    {announcement.priority}
                  </Badge>
                </div>
                <p className="text-[9px] font-black text-[#059669] uppercase tracking-widest mb-3 opacity-60">{formatDate(announcement.date)}</p>
                <p className="text-xs text-[#a0b5a3] leading-relaxed font-medium">{announcement.content}</p>
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}