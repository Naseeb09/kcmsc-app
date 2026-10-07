import React, { useState } from 'react';
import { 
  Calendar, CheckCircle2, BookOpen, FileText, 
  Image as ImageIcon, ZoomIn, X, Clock, Award, Check
} from 'lucide-react';
import { sampleDiaries, StudentDiary } from '@/data/diaryAndTimeline';
import { Badge } from '@/app/components/ui/badge';

interface StudentDiaryViewProps {
  studentName?: string;
}

export function StudentDiaryView({ studentName }: StudentDiaryViewProps) {
  const [selectedDiaryIndex, setSelectedDiaryIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'digital' | 'scanned'>('digital');
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const currentDiary: StudentDiary = sampleDiaries[selectedDiaryIndex];

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'HW':
        return <Badge className="bg-[#fbbf24]/20 text-[#fbbf24] border border-[#fbbf24]/30 text-[9px] font-black uppercase tracking-wider px-2 py-0.5">H.W</Badge>;
      case 'CT':
        return <Badge className="bg-red-500/20 text-red-400 border border-red-500/30 text-[9px] font-black uppercase tracking-wider px-2 py-0.5">Class Test</Badge>;
      case 'Learn':
        return <Badge className="bg-[#059669]/20 text-[#34d399] border border-[#059669]/30 text-[9px] font-black uppercase tracking-wider px-2 py-0.5">Learn / Reading</Badge>;
      case 'Proxy':
        return <Badge className="bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[9px] font-black uppercase tracking-wider px-2 py-0.5">Proxy Class</Badge>;
      default:
        return <Badge className="bg-blue-500/20 text-blue-300 border border-blue-500/30 text-[9px] font-black uppercase tracking-wider px-2 py-0.5">Lecture</Badge>;
    }
  };

  const getSubjectColor = (subject: string) => {
    const s = subject.toLowerCase();
    if (s.includes('phy')) return 'from-blue-600/20 to-blue-900/10 border-blue-500/30 text-blue-300';
    if (s.includes('math')) return 'from-emerald-600/20 to-emerald-900/10 border-emerald-500/30 text-emerald-300';
    if (s.includes('che')) return 'from-amber-600/20 to-amber-900/10 border-amber-500/30 text-amber-300';
    if (s.includes('bio')) return 'from-teal-600/20 to-teal-900/10 border-teal-500/30 text-teal-300';
    if (s.includes('b.g.s')) return 'from-yellow-600/20 to-yellow-900/10 border-yellow-500/30 text-yellow-300';
    if (s.includes('b₂') || s.includes('bangla')) return 'from-rose-600/20 to-rose-900/10 border-rose-500/30 text-rose-300';
    if (s.includes('e₁') || s.includes('english')) return 'from-cyan-600/20 to-cyan-900/10 border-cyan-500/30 text-cyan-300';
    if (s.includes('r.s.t')) return 'from-indigo-600/20 to-indigo-900/10 border-indigo-500/30 text-indigo-300';
    return 'from-[#059669]/20 to-[#0d1f0f] border-[#059669]/30 text-white';
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      {/* Date Switcher */}
      <div className="bg-[#1a2e1c] border border-white/5 p-2 rounded-[2rem] flex items-center justify-between gap-2 shadow-xl">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full">
          {sampleDiaries.map((diary, index) => {
            const isSelected = selectedDiaryIndex === index;
            return (
              <button
                key={diary.id}
                onClick={() => setSelectedDiaryIndex(index)}
                className={`flex-1 min-w-[140px] py-3 px-4 rounded-2xl transition-all flex flex-col items-center justify-center text-center border ${
                  isSelected
                    ? 'bg-[#059669] text-white border-[#059669] shadow-lg shadow-[#059669]/20 scale-[1.01]'
                    : 'bg-[#112613] text-[#a0b5a3] border-white/5 hover:border-[#059669]/30'
                }`}
              >
                <div className="flex items-center gap-1.5 mb-0.5">
                  <Calendar size={13} className={isSelected ? 'text-[#fbbf24]' : 'text-[#059669]'} />
                  <span className="text-[11px] font-black uppercase tracking-wider">{diary.day}</span>
                </div>
                <span className={`text-[10px] font-bold ${isSelected ? 'text-white' : 'text-[#a0b5a3]'}`}>
                  {diary.displayDate}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Diary Card Header */}
      <div className="bg-[#1a2e1c] rounded-[2rem] border border-white/5 p-6 relative overflow-hidden shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#fbbf24] animate-ping" />
              <p className="text-[10px] font-black text-[#fbbf24] uppercase tracking-[0.3em]">
                KC Model School & College
              </p>
            </div>
            <h2 className="text-lg md:text-xl font-black text-white uppercase tracking-tight">
              Class Activities & Daily Notes
            </h2>
            <p className="text-xs text-[#a0b5a3] font-medium mt-0.5">
              {currentDiary.day} • {currentDiary.displayDate}
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center bg-[#0d1f0f] border border-[#059669]/20 p-1 rounded-xl self-start sm:self-center">
            <button
              onClick={() => setViewMode('digital')}
              className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider flex items-center gap-1.5 transition-all ${
                viewMode === 'digital'
                  ? 'bg-[#059669] text-white shadow'
                  : 'text-[#a0b5a3] hover:text-white'
              }`}
            >
              <FileText size={12} />
              Digital
            </button>
            <button
              onClick={() => setViewMode('scanned')}
              className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider flex items-center gap-1.5 transition-all ${
                viewMode === 'scanned'
                  ? 'bg-[#fbbf24] text-[#0d1f0f] shadow'
                  : 'text-[#a0b5a3] hover:text-white'
              }`}
            >
              <ImageIcon size={12} />
              Original Scan
            </button>
          </div>
        </div>

        {/* Verification Status Banner */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          <div className="bg-[#112613] border border-[#059669]/20 rounded-xl p-3 flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#059669]/20 flex items-center justify-center text-[#059669]">
              <CheckCircle2 size={16} />
            </div>
            <div>
              <p className="text-[8px] font-black text-[#059669] uppercase tracking-widest">Form Teacher</p>
              <p className="text-[10px] font-bold text-white uppercase flex items-center gap-1">
                Verified Sign <Check size={11} className="text-[#059669]" />
              </p>
            </div>
          </div>
          <div className="bg-[#112613] border border-[#fbbf24]/20 rounded-xl p-3 flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#fbbf24]/20 flex items-center justify-center text-[#fbbf24]">
              <Award size={16} />
            </div>
            <div>
              <p className="text-[8px] font-black text-[#fbbf24] uppercase tracking-widest">Guardian</p>
              <p className="text-[10px] font-bold text-white uppercase flex items-center gap-1">
                Acknowledged <Check size={11} className="text-[#fbbf24]" />
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      {viewMode === 'digital' ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2">
              <BookOpen size={14} className="text-[#059669]" />
              <h3 className="text-[10px] font-black text-[#a0b5a3] uppercase tracking-[0.25em]">
                Period Wise Daily Log ({currentDiary.entries.length} Periods)
              </h3>
            </div>
            <span className="text-[9px] font-bold text-[#fbbf24] uppercase tracking-widest">
              NCTB Curriculum
            </span>
          </div>

          <div className="grid gap-3">
            {currentDiary.entries.map((entry, idx) => (
              <div 
                key={idx}
                className="bg-[#1a2e1c]/70 hover:bg-[#1a2e1c] border border-white/5 hover:border-[#059669]/30 rounded-2xl p-4 transition-all group shadow-md"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2.5">
                    <span className="w-9 h-9 rounded-xl bg-[#0d1f0f] border border-white/10 flex items-center justify-center text-xs font-black text-[#fbbf24] uppercase shadow-inner">
                      {entry.period}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-black text-white uppercase tracking-tight">
                          {entry.subject}
                        </span>
                        <span className="text-[10px] text-[#a0b5a3]/70 font-medium">
                          ({entry.subjectFullName})
                        </span>
                      </div>
                      <p className="text-[9px] text-[#059669] font-bold uppercase tracking-wider flex items-center gap-1">
                        <Clock size={10} /> Class Routine
                      </p>
                    </div>
                  </div>
                  <div>
                    {getTypeBadge(entry.type)}
                  </div>
                </div>

                {/* Topic / Work Details */}
                <div className="bg-[#0d1f0f]/60 rounded-xl p-3 border border-white/5 mt-2">
                  <p className="text-xs md:text-sm text-[#e8f5e9] font-medium leading-relaxed font-sans">
                    {entry.topic}
                  </p>
                </div>

                <div className="flex justify-between items-center mt-3 pt-2.5 border-t border-white/5 text-[9px]">
                  <span className="text-[#a0b5a3]/50 font-bold uppercase tracking-wider">
                    Sign: Certified by Teacher
                  </span>
                  <span className="text-[#059669] font-black uppercase tracking-widest flex items-center gap-1">
                    <CheckCircle2 size={12} /> Verified
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Daily Notice Footer */}
          {currentDiary.notice && (
            <div className="bg-[#1a2e1c]/40 border border-white/5 rounded-2xl p-4 mt-4">
              <p className="text-[9px] font-black text-[#fbbf24] uppercase tracking-widest mb-1">
                Notice / Special Note:
              </p>
              <p className="text-xs text-[#a0b5a3] italic">
                "{currentDiary.notice}"
              </p>
            </div>
          )}
        </div>
      ) : (
        /* Scanned Page View */
        <div className="space-y-4">
          <div className="bg-[#1a2e1c] rounded-[2rem] border border-white/5 p-4 text-center">
            <div className="flex items-center justify-between mb-3 px-2">
              <span className="text-[10px] font-black text-[#fbbf24] uppercase tracking-widest flex items-center gap-1.5">
                <ImageIcon size={14} /> Official Scanned Diary Document
              </span>
              <button
                onClick={() => setIsLightboxOpen(true)}
                className="bg-[#059669]/20 hover:bg-[#059669] text-[#059669] hover:text-white px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest flex items-center gap-1 transition-all"
              >
                <ZoomIn size={12} /> Full Screen
              </button>
            </div>

            <div 
              onClick={() => setIsLightboxOpen(true)}
              className="relative rounded-2xl overflow-hidden border border-white/10 bg-white/5 cursor-pointer group shadow-2xl"
            >
              <img 
                src={currentDiary.scannedImage} 
                alt={`Diary ${currentDiary.displayDate}`}
                className="w-full h-auto max-h-[600px] object-contain mx-auto transition-transform duration-300 group-hover:scale-[1.02]" 
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity backdrop-blur-[2px]">
                <div className="bg-[#0d1f0f] border border-[#fbbf24]/50 px-4 py-2 rounded-xl text-xs font-black uppercase text-[#fbbf24] flex items-center gap-2 shadow-2xl">
                  <ZoomIn size={16} /> Tap to Expand & Inspect Signature
                </div>
              </div>
            </div>
            <p className="text-[9px] text-[#a0b5a3]/50 font-bold uppercase tracking-widest mt-3">
              Official Physical Diary Sheet of KC Model School & College
            </p>
          </div>
        </div>
      )}

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 backdrop-blur-md">
          <div className="relative max-w-3xl w-full max-h-[90vh] flex flex-col items-center">
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute -top-12 right-0 w-10 h-10 rounded-xl bg-[#1a2e1c] border border-white/20 text-white flex items-center justify-center hover:bg-red-500 transition-all z-10"
            >
              <X size={20} />
            </button>
            <div className="overflow-auto max-h-[85vh] w-full rounded-2xl border border-white/10 shadow-2xl bg-white p-2">
              <img 
                src={currentDiary.scannedImage} 
                alt={`Diary ${currentDiary.displayDate}`} 
                className="w-full h-auto object-contain mx-auto"
              />
            </div>
            <div className="mt-3 text-center">
              <p className="text-xs font-black uppercase tracking-widest text-[#fbbf24]">
                {currentDiary.title} • {currentDiary.day}, {currentDiary.displayDate}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
