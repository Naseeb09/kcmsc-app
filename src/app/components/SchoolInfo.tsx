import { Info, History, Target, Eye, Heart, Award, Megaphone, ChevronLeft, School, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Separator } from '@/app/components/ui/separator';
import { schoolInfo } from '@/data/announcements';
import { useAppContext } from '@/context/AppContext';

interface SchoolInfoProps {
  onNavigate: (view: string) => void;
}

export function SchoolInfo({ onNavigate }: SchoolInfoProps) {
  const { notices } = useAppContext();

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

  return (
    <div className="pb-20 bg-[#0d1f0f] min-h-screen font-sans selection:bg-[#fbbf24] selection:text-[#0d1f0f]">
      
 {/* 1. HEADER - RECTANGULAR STYLE */}
      <header className="relative bg-[#1a2e1c] px-6 pt-12 pb-10 border-b border-[#059669]/20 overflow-hidden">
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
            
            <div>
              <h1 className="text-[10px] font-black text-[#059669] uppercase tracking-[0.4em] mb-0.5">Institutional Profile</h1>
              <div className="flex items-center gap-1.5 mt-1">
                <div className="w-1.5 h-1.5 rounded-full bg-[#059669] animate-pulse" />
                <p className="text-[9px] text-[#a0b5a3] uppercase font-bold tracking-widest opacity-60">About the School</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content follows naturally, no spacer needed anymore */}
      <main className="max-w-md mx-auto px-6 py-10 space-y-10">
        
        {/* 2. School Overview */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="w-3 h-3 text-[#fbbf24]" />
            <h2 className="text-[10px] font-black text-white/90 uppercase tracking-[0.3em]">Historical Overview</h2>
          </div>
          
          <div className="bg-gradient-to-br from-[#1a2e1c] to-[#112613] border border-white/5 rounded-[2rem] p-7 shadow-2xl relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#059669]/5 rounded-full blur-3xl" />
            <div className="flex items-center gap-5 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-[#0d1f0f] flex items-center justify-center border border-[#059669]/20 shadow-inner">
                <History className="w-7 h-7 text-[#fbbf24]" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-black text-[#e8f5e9] uppercase tracking-wide">{schoolInfo.name}</h3>
                <p className="text-[10px] text-[#a0b5a3] font-medium mt-0.5 tracking-wider italic">"{schoolInfo.motto}"</p>
              </div>
            </div>
            <p className="text-sm text-[#a0b5a3] leading-relaxed font-medium">{schoolInfo.about}</p>
          </div>
        </section>

        {/* 3. Mission & Vision */}
        <section className="grid grid-cols-1 gap-4">
          <div className="bg-[#1a2e1c] border border-white/5 rounded-[1.5rem] p-6 flex flex-col gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#0d1f0f] flex items-center justify-center border border-[#059669]/20">
              <Target className="w-5 h-5 text-[#fbbf24]" />
            </div>
            <div>
              <h3 className="text-[10px] font-black text-white uppercase tracking-[0.2em] mb-2">Our Mission</h3>
              <p className="text-xs text-[#a0b5a3] leading-relaxed font-medium">{schoolInfo.mission}</p>
            </div>
          </div>
          
          <div className="bg-[#1a2e1c] border border-white/5 rounded-[1.5rem] p-6 flex flex-col gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#0d1f0f] flex items-center justify-center border border-[#059669]/20">
              <Eye className="w-5 h-5 text-[#fbbf24]" />
            </div>
            <div>
              <h3 className="text-[10px] font-black text-white uppercase tracking-[0.2em] mb-2">Our Vision</h3>
              <p className="text-xs text-[#a0b5a3] leading-relaxed font-medium">{schoolInfo.vision}</p>
            </div>
          </div>
        </section>

        {/* 4. Core Values */}
        <section>
          <h2 className="text-[10px] font-black text-white/90 uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
            <Heart className="w-3 h-3 text-[#fbbf24]" />
            Core Philosophy
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {schoolInfo.values.map((value, index) => (
              <div key={index} className="bg-[#112613] border border-[#059669]/10 rounded-2xl p-4 flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#fbbf24]" />
                <span className="text-[11px] font-black text-[#e8f5e9] uppercase tracking-wide">{value}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Statistics */}
        <section>
          <div className="bg-[#1a2e1c] border border-white/5 rounded-[2rem] p-8">
            <div className="flex items-center gap-3 mb-8">
              <Award className="w-5 h-5 text-[#fbbf24]" />
              <h3 className="text-sm font-black text-white uppercase tracking-widest">Institutional Stats</h3>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-[#a0b5a3] uppercase font-black tracking-widest mb-1">Academic Scope</p>
                  <p className="text-sm font-black text-white uppercase">{schoolInfo.grades}</p>
                </div>
                <div className="h-8 w-[1px] bg-[#059669]/20" />
                <div className="text-right">
                  <p className="text-[10px] text-[#a0b5a3] uppercase font-black tracking-widest mb-1">Student Body</p>
                  <p className="text-sm font-black text-white uppercase">{schoolInfo.totalStudents}</p>
                </div>
              </div>
              
              <Separator className="bg-[#059669]/10" />
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-[#a0b5a3] uppercase font-black tracking-widest mb-1">Teacher Ratio</p>
                  <p className="text-sm font-black text-white uppercase">{schoolInfo.studentTeacherRatio}</p>
                </div>
                <div className="h-8 w-[1px] bg-[#059669]/20" />
                <div className="text-right flex-1 pl-6">
                  <p className="text-[10px] text-[#a0b5a3] uppercase font-black tracking-widest mb-1">Accreditation</p>
                  <p className="text-[10px] font-bold text-[#059669] leading-tight">{schoolInfo.accreditation}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Announcements */}
        <section className="pb-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[10px] font-black text-white/90 uppercase tracking-[0.3em] flex items-center gap-2">
              <Megaphone className="w-3 h-3 text-[#fbbf24]" />
              Campus Notices
            </h2>
            <Badge className="bg-[#059669]/20 text-[#059669] border-0 text-[9px] font-black uppercase tracking-widest px-2 py-1">{notices.length} Active</Badge>
          </div>
          
          <div className="space-y-4">
            {notices.map((announcement) => (
              <div 
                key={announcement.id} 
                className={`bg-[#1a2e1c] border-l-4 rounded-2xl p-6 shadow-xl transition-all ${getPriorityColor(announcement.priority)}`}
                style={{ borderLeftColor: announcement.priority === 'high' ? '#ef4444' : announcement.priority === 'medium' ? '#f59e0b' : '#059669' }}
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h4 className="font-black text-white text-xs uppercase tracking-wide flex-1 leading-tight">{announcement.title}</h4>
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