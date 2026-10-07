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
        return <Badge className="bg-[#fbbf24]/15 text-[#fbbf24] border border-[#fbbf24]/30 text-[9px] font-black uppercase tracking-wider px-2 py-0.5">H.W</Badge>;
      case 'CT':
        return <Badge className="bg-red-500/15 text-red-400 border border-red-500/30 text-[9px] font-black uppercase tracking-wider px-2 py-0.5">Class Test</Badge>;
      case 'Learn':
        return <Badge className="bg-[#059669]/15 text-[#34d399] border border-[#059669]/30 text-[9px] font-black uppercase tracking-wider px-2 py-0.5">Reading</Badge>;
      case 'Proxy':
        return <Badge className="bg-purple-500/15 text-purple-300 border border-purple-500/30 text-[9px] font-black uppercase tracking-wider px-2 py-0.5">Proxy</Badge>;
      default:
        return <Badge className="bg-blue-500/15 text-blue-300 border border-blue-500/30 text-[9px] font-black uppercase tracking-wider px-2 py-0.5">Lecture</Badge>;
    }
  };

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
      {/* 1. Sleek Controls Bar: Date Tabs & View Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-2.5">
        {/* Date Selector Chips */}
        <div className="flex items-center bg-[#1a2e1c] p-1 rounded-2xl border border-white/5 shadow-md">
          {sampleDiaries.map((diary, index) => {
            const isSelected = selectedDiaryIndex === index;
            return (
              <button
                key={diary.id}
                onClick={() => setSelectedDiaryIndex(index)}
                className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-[#059669] text-white shadow-md'
                    : 'text-[#a0b5a3] hover:text-white'
                }`}
              >
                <Calendar size={12} className={isSelected ? 'text-[#fbbf24]' : 'text-[#a0b5a3]'} />
                <span>{diary.day.slice(0, 3)} • {diary.displayDate}</span>
              </button>
            );
          })}
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center bg-[#1a2e1c] p-1 rounded-2xl border border-white/5 shadow-md">
          <button
            onClick={() => setViewMode('digital')}
            className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all flex items-center gap-1.5 ${
              viewMode === 'digital'
                ? 'bg-[#059669] text-white shadow'
                : 'text-[#a0b5a3] hover:text-white'
            }`}
          >
            <FileText size={12} />
            <span>Digital</span>
          </button>
          <button
            onClick={() => setViewMode('scanned')}
            className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all flex items-center gap-1.5 ${
              viewMode === 'scanned'
                ? 'bg-[#fbbf24] text-[#0d1f0f] shadow'
                : 'text-[#a0b5a3] hover:text-white'
            }`}
          >
            <ImageIcon size={12} />
            <span>Scan Sheet</span>
          </button>
        </div>
      </div>

      {/* 2. De-congested Header Banner */}
      <div className="bg-[#1a2e1c] rounded-2xl border border-white/5 p-4 sm:p-5 shadow-lg space-y-3">
        <div className="flex items-center justify-between gap-2">
          <div>
            <p className="text-[9px] font-black text-[#fbbf24] uppercase tracking-[0.25em]">
              KC Model School & College
            </p>
            <h2 className="text-base sm:text-lg font-black text-white uppercase tracking-tight leading-tight mt-0.5">
              Class Diary & Daily Notes
            </h2>
          </div>
          <span className="text-[10px] font-bold text-[#e8f5e9] bg-[#0d1f0f] px-3 py-1 rounded-xl border border-white/5 shrink-0">
            {currentDiary.day}
          </span>
        </div>

        {/* Minimal inline verification badges */}
        <div className="flex flex-wrap items-center gap-2 pt-2.5 border-t border-white/5 text-[9px] font-bold">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#059669]/10 text-[#34d399] border border-[#059669]/20">
            <CheckCircle2 size={11} /> Teacher Signed
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#fbbf24]/10 text-[#fbbf24] border border-[#fbbf24]/20">
            <Award size={11} /> Guardian Signed
          </span>
          <span className="text-[#a0b5a3]/50 ml-auto hidden sm:inline text-[9px]">
            NCTB Curriculum • 2026
          </span>
        </div>
      </div>

      {/* 3. Main Content Area */}
      {viewMode === 'digital' ? (
        <div className="space-y-2.5">
          {currentDiary.entries.map((entry, idx) => (
            <div 
              key={idx}
              className="bg-[#1a2e1c]/60 hover:bg-[#1a2e1c] border border-white/5 hover:border-[#059669]/30 rounded-2xl p-3.5 transition-all shadow-sm"
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-lg bg-[#0d1f0f] border border-white/10 flex items-center justify-center text-[10px] font-black text-[#fbbf24] uppercase">
                    {entry.period}
                  </span>
                  <div>
                    <span className="text-xs sm:text-sm font-black text-white uppercase tracking-tight">
                      {entry.subject}
                    </span>
                    <span className="text-[10px] text-[#a0b5a3]/60 font-medium ml-1.5">
                      ({entry.subjectFullName})
                    </span>
                  </div>
                </div>
                <div>
                  {getTypeBadge(entry.type)}
                </div>
              </div>

              {/* Topic / Work Details */}
              <div className="bg-[#0d1f0f]/50 rounded-xl px-3 py-2 border border-white/5">
                <p className="text-xs text-[#e8f5e9] font-medium leading-relaxed font-sans">
                  {entry.topic}
                </p>
              </div>
            </div>
          ))}

          {/* Daily Notice Footer */}
          {currentDiary.notice && (
            <div className="bg-[#1a2e1c]/30 border border-white/5 rounded-2xl p-3.5 mt-3">
              <p className="text-[8px] font-black text-[#fbbf24] uppercase tracking-widest mb-0.5">
                Notice:
              </p>
              <p className="text-[11px] text-[#a0b5a3] italic">
                "{currentDiary.notice}"
              </p>
            </div>
          )}
        </div>
      ) : (
        /* Scanned Page View */
        <div className="space-y-3">
          <div className="bg-[#1a2e1c] rounded-2xl border border-white/5 p-4 text-center shadow-lg">
            <div className="flex items-center justify-between mb-3 px-1">
              <span className="text-[9px] font-black text-[#fbbf24] uppercase tracking-widest flex items-center gap-1.5">
                <ImageIcon size={13} /> Original Physical Diary Sheet
              </span>
              <button
                onClick={() => setIsLightboxOpen(true)}
                className="bg-[#059669]/20 hover:bg-[#059669] text-[#059669] hover:text-white px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider flex items-center gap-1 transition-all"
              >
                <ZoomIn size={11} /> Zoom
              </button>
            </div>

            <div 
              onClick={() => setIsLightboxOpen(true)}
              className="relative rounded-xl overflow-hidden border border-white/10 bg-white/5 cursor-pointer group shadow-xl"
            >
              <img 
                src={currentDiary.scannedImage} 
                alt={`Diary ${currentDiary.displayDate}`}
                className="w-full h-auto max-h-[500px] object-contain mx-auto transition-transform duration-300 group-hover:scale-[1.01]" 
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity backdrop-blur-[1px]">
                <div className="bg-[#0d1f0f] border border-[#fbbf24]/40 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase text-[#fbbf24] flex items-center gap-1.5 shadow-xl">
                  <ZoomIn size={14} /> Tap to Expand & View Signatures
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 backdrop-blur-md">
          <div className="relative max-w-2xl w-full max-h-[90vh] flex flex-col items-center">
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute -top-10 right-0 w-8 h-8 rounded-xl bg-[#1a2e1c] border border-white/20 text-white flex items-center justify-center hover:bg-red-500 transition-all z-10"
            >
              <X size={16} />
            </button>
            <div className="overflow-auto max-h-[85vh] w-full rounded-2xl border border-white/10 shadow-2xl bg-white p-2">
              <img 
                src={currentDiary.scannedImage} 
                alt={`Diary ${currentDiary.displayDate}`} 
                className="w-full h-auto object-contain mx-auto"
              />
            </div>
            <div className="mt-2 text-center">
              <p className="text-[10px] font-black uppercase tracking-widest text-[#fbbf24]">
                {currentDiary.day}, {currentDiary.displayDate}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
