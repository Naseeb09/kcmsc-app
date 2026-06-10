import React, { useState, useMemo } from 'react';
import { 
  ChevronLeft, User, Star, Award, TrendingUp, BookOpen, 
  MessageSquare, FileText, History, Calendar, CheckCircle2, 
  AlertCircle, LayoutDashboard, BarChart3, MessageCircle, Activity,
  Lock, Search, ShieldCheck, ChevronRight, Sparkles, Users
} from 'lucide-react';
import { Card, CardContent } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { useTranslation } from '@/hooks/useTranslation';
import { toast } from 'sonner';

// --- Types ---

export interface Student {
  id: string;
  studentId: string;
  rollNo: string;
  name: string;
  gpa: string;
  rank: string;
  attendance: number; // Percentage
  avgScore: number;
  totalDays: number;
  presentDays: number;
  absentDays: number;
  performanceHealth: number; // 0-100
  subjects: {
    name: string;
    score: number;
    color: string;
  }[];
  insights: string[];
  badges: { name: string; icon: any; color: string }[];
  feedback: {
    teacher: string;
    subject: string;
    date: string;
    comment: string;
  }[];
  strengths: string[];
  improvements: string[];
  homework: {
    completed: number;
    pending: number;
    rate: number;
  };
  attendanceHistory: number[];
  performanceTrend: number[];
}

interface StudentPerformanceProps {
  onBack: () => void;
  student: Student;
  roomName: string;
  className: string;
}

// --- Component ---

export function StudentPerformance({ onBack, student, roomName, className }: StudentPerformanceProps) {
  const { t, s } = useTranslation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [studentIdInput, setStudentIdInput] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [showReportCard, setShowReportCard] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (studentIdInput.trim() === "1") {
      setIsAuthenticated(true);
      toast.success('Identity Verified');
    } else {
      toast.error('Invalid Password. Please use "1".');
    }
  };

  const handleMessageTeacher = () => {
    const message = `Hello, I am the guardian of ${student.name} (Roll: ${student.rollNo}, Class: ${className}). I would like to discuss...`;
    window.location.href = `sms:?body=${encodeURIComponent(message)}`;
  };

  const getGradeInfo = (score: number) => {
    if (score >= 80) return { label: 'A+', gpa: '5.00' };
    if (score >= 70) return { label: 'A', gpa: '4.00' };
    if (score >= 60) return { label: 'A-', gpa: '3.50' };
    if (score >= 50) return { label: 'B', gpa: '3.00' };
    if (score >= 40) return { label: 'C', gpa: '2.00' };
    if (score >= 33) return { label: 'D', gpa: '1.00' };
    return { label: 'F', gpa: '0.00' };
  };

  const handlePrint = () => {
    const originalTitle = document.title;
    document.title = `result-${student.name}`;
    window.print();
    document.title = originalTitle;
  };

  if (showReportCard) {
    return (
      <div className="min-h-screen bg-white text-black p-4 md:p-8 font-serif report-card-view">
        <style dangerouslySetInnerHTML={{ __html: `
          @media print {
            @page {
              size: portrait;
              margin: 10mm;
            }
            body { 
              background: white !important; 
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            .no-print, nav, .bottom-nav, button, .fixed, [role="navigation"] { 
              display: none !important; 
            }
            .report-card-view {
              padding: 0 !important;
              margin: 0 !important;
              background: white !important;
            }
            .report-card-container { 
              border: 2px solid black !important;
              box-shadow: none !important;
              margin: 0 !important;
              padding: 15mm !important;
              width: 100% !important;
              position: relative !important;
            }
          }
        `}} />
        <button 
          onClick={() => setShowReportCard(false)} 
          className="fixed top-4 left-4 p-3 bg-black text-white rounded-xl no-print z-50 flex items-center gap-2 font-bold uppercase text-[10px] tracking-widest active:scale-95 transition-all shadow-xl"
        >
          <ChevronLeft size={16} /> Back to Dashboard
        </button>
        
        <div className="max-w-2xl mx-auto border-2 border-black p-6 md:p-10 space-y-8 relative overflow-hidden report-card-container bg-white shadow-2xl my-10">
          {/* Logo Background Watermark */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
            <img src="/src/data/kcmsc-logo.png" alt="watermark" className="w-[400px]" />
          </div>

          <div className="text-center space-y-4 relative z-10">
            <img src="/src/data/kcmsc-logo.png" alt="KCMSC Logo" className="w-20 h-20 mx-auto mb-2" />
            <div className="space-y-1">
              <h1 className="text-2xl md:text-4xl font-black uppercase tracking-tight">KC Model School & College</h1>
              <p className="text-[10px] md:text-sm font-bold mt-2">Academic Transcript / Report Card • Term 1, 2026</p>
              <div className="w-full h-[2px] bg-black mt-4" />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-[10px] md:text-sm relative z-10 font-bold">
            <div className="space-y-1">
              <p>Student Name: <span className="font-normal">{student.name}</span></p>
              <p>Roll No: <span className="font-normal">{student.rollNo}</span></p>
              <p>Class: <span className="font-normal">{className}</span></p>
            </div>
            <div className="space-y-1 text-right">
              <p>Student ID: <span className="font-normal">{student.studentId}</span></p>
              <p>Room: <span className="font-normal">{roomName}</span></p>
              <p>Date: <span className="font-normal">June 10, 2026</span></p>
            </div>
          </div>

          <div className="w-full h-[2px] bg-black my-4" />

          <table className="w-full border-collapse border-2 border-black text-[11px] md:text-sm relative z-10">
            <thead>
              <tr className="bg-gray-50">
                <th className="border-2 border-black p-2 text-left uppercase">Subject</th>
                <th className="border-2 border-black p-2 text-center uppercase">Full Marks</th>
                <th className="border-2 border-black p-2 text-center uppercase">Marks Obtained</th>
                <th className="border-2 border-black p-2 text-center uppercase">Grade</th>
                <th className="border-2 border-black p-2 text-center uppercase">GPA</th>
              </tr>
            </thead>
            <tbody>
              {student.subjects.map((s, i) => {
                const info = getGradeInfo(s.score);
                return (
                  <tr key={i}>
                    <td className="border-2 border-black p-2 font-bold">{s.name}</td>
                    <td className="border-2 border-black p-2 text-center">100</td>
                    <td className="border-2 border-black p-2 text-center">{s.score}</td>
                    <td className="border-2 border-black p-2 text-center font-black">{info.label}</td>
                    <td className="border-2 border-black p-2 text-center">{info.gpa}</td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="font-black border-t-2 border-black">
                <td colSpan={2} className="border-2 border-black p-3 text-right uppercase">Average / Final GPA:</td>
                <td className="border-2 border-black p-3 text-center bg-gray-50">{student.avgScore}%</td>
                <td colSpan={2} className="border-2 border-black p-3 text-center text-xl md:text-2xl bg-gray-50">{student.gpa}</td>
              </tr>
            </tfoot>
          </table>

          {/* Teacher's Remarks */}
          <div className="border-2 border-black p-4 relative z-10">
            <p className="text-[10px] font-black uppercase mb-1">Teacher's Remarks:</p>
            <p className="text-xs md:text-sm italic leading-relaxed">"{student.feedback[0].comment} Overall performance is {parseFloat(student.gpa) >= 4.0 ? 'Exemplary' : 'Satisfactory'}."</p>
          </div>

          <div className="pt-20 flex justify-between items-end relative z-10 font-bold">
            <div className="text-center space-y-2">
              <div className="font-cursive text-xl md:text-2xl italic opacity-80" style={{ fontFamily: "'Dancing Script', cursive" }}>{student.feedback[0].teacher.split(' ')[0]}</div>
              <div className="border-t-2 border-black pt-1 w-32 md:w-44 uppercase text-[9px] md:text-[11px]">Class Teacher</div>
            </div>
            <div className="text-center space-y-0">
              <div className="flex justify-center -mb-4">
                <img src="https://upload.wikimedia.org/wikipedia/commons/3/3a/Jon_Kirsch%27s_Signature.png" alt="Principal Signature" className="w-24 md:w-32 grayscale" />
              </div>
              <div className="border-t-2 border-black pt-1 w-32 md:w-44 uppercase text-[9px] md:text-[11px]">Principal Signature</div>
            </div>
          </div>
        </div>

        <div className="text-center mt-8 no-print space-y-4">
          <button 
            onClick={handlePrint} 
            className="w-full max-w-xs bg-black text-white px-8 py-5 rounded-2xl font-black uppercase tracking-[0.2em] hover:bg-gray-800 transition-all active:scale-95 shadow-xl shadow-black/20 mx-auto block"
          >
            Print / Save as PDF
          </button>
        </div>
      </div>
    );
  }

  if (showHistory) {
    return (
      <div className="min-h-screen bg-[#0d1f0f] p-6 pb-32">
        <header className="flex items-center gap-4 mb-8">
          <button onClick={() => setShowHistory(false)} className="w-11 h-11 rounded-xl bg-[#1a2e1c] border border-[#059669]/30 flex items-center justify-center text-[#059669]">
            <ChevronLeft />
          </button>
          <h1 className="text-xl font-black text-white uppercase tracking-tight">Academic History</h1>
        </header>
        <div className="space-y-6">
          {[2025, 2024].map((year) => (
            <Card key={year} className="bg-[#1a2e1c] border border-white/5 rounded-[2rem] p-6 space-y-4">
              <div className="flex justify-between items-center border-b border-white/5 pb-4">
                <h3 className="text-lg font-black text-[#fbbf24]">{year} Academic Year</h3>
                <Badge className="bg-[#059669]/20 text-[#059669] border-[#059669]/30">Promoted</Badge>
              </div>
              <div className="grid grid-cols-2 gap-4 text-[10px] uppercase font-bold text-[#a0b5a3] tracking-widest">
                <div>
                  <p>Term 1 GPA: <span className="text-white">{(Math.random() * (4.0 - 3.5) + 3.5).toFixed(2)}</span></p>
                  <p>Term 2 GPA: <span className="text-white">{(Math.random() * (4.0 - 3.5) + 3.5).toFixed(2)}</span></p>
                </div>
                <div className="text-right">
                  <p>Final Rank: <span className="text-white">{Math.floor(Math.random() * 5) + 1}</span></p>
                  <p>Attendance: <span className="text-white">{Math.floor(Math.random() * 5) + 90}%</span></p>
                </div>
              </div>
            </Card>
          ))}
          <div className="text-center opacity-30 py-10">
            <p className="text-[10px] font-black uppercase tracking-widest">Earlier records archived</p>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0d1f0f] flex flex-col items-center justify-center p-6 pb-32">
        <button 
          onClick={onBack}
          className="absolute top-8 left-6 w-11 h-11 rounded-xl bg-[#1a2e1c] border border-[#059669]/30 flex items-center justify-center text-[#059669]"
        >
          <ChevronLeft />
        </button>

        <div className="w-full max-w-sm space-y-8 text-center">
          <div className="relative mx-auto w-24 h-24 rounded-[2rem] bg-[#1a2e1c] border-2 border-[#fbbf24]/30 flex items-center justify-center">
            <Lock className="w-10 h-10 text-[#fbbf24] animate-pulse" />
            <div className="absolute inset-0 bg-[#fbbf24]/5 blur-2xl rounded-full" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-black text-white uppercase tracking-tight">Guardian Portal</h1>
            <p className="text-sm text-[#a0b5a3] font-medium px-4">Enter the Access Password for <span className="text-[#fbbf24]">{student.name}</span> to view their academic performance.</p>
          </div>

          <form onSubmit={handleAuth} className="space-y-4">
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#fbbf24]" />
              <input 
                type="password"
                placeholder="Enter password '1'"
                value={studentIdInput}
                onChange={(e) => setStudentIdInput(e.target.value)}
                className="w-full bg-[#1a2e1c] border border-[#059669]/30 rounded-2xl py-5 pl-12 pr-4 text-white focus:outline-none focus:border-[#fbbf24] transition-all"
                autoFocus
              />
            </div>
            <button 
              type="submit"
              className="w-full py-5 bg-[#059669] text-[#0d1f0f] rounded-2xl font-black uppercase tracking-[0.2em] hover:bg-[#fbbf24] transition-all active:scale-95 shadow-xl shadow-[#059669]/20"
            >
              Verify & View Report
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-32 bg-[#0d1f0f] min-h-screen">
      {/* Header */}
      <header className="bg-[#1a2e1c] px-6 pt-10 pb-6 border-b border-[#059669]/20 sticky top-0 z-30 backdrop-blur-md bg-opacity-90">
        <div className="max-w-2xl mx-auto flex items-center gap-4">
          <button onClick={onBack} className="w-11 h-11 rounded-xl bg-[#0d1f0f] border border-[#059669]/30 flex items-center justify-center text-[#059669]">
            <ChevronLeft />
          </button>
          <div>
            <h1 className="text-base font-black text-white uppercase tracking-tight leading-none mb-1">Student Performance</h1>
            <p className="text-[10px] text-[#059669] font-black uppercase tracking-widest">Room {roomName} • {className}</p>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-8 space-y-8">
        {/* Profile Summary */}
        <Card className="bg-gradient-to-br from-[#1a3a1d] to-[#0d1f0f] border-2 border-[#fbbf24]/20 rounded-[2.5rem] overflow-hidden shadow-2xl">
          <CardContent className="p-6">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-[1.8rem] bg-[#0d1f0f] border-2 border-[#fbbf24]/40 flex items-center justify-center text-2xl font-black text-[#fbbf24] shadow-[0_0_20px_rgba(251,191,36,0.1)]">
                {student.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-xl font-black text-white leading-tight mb-1 uppercase">{student.name}</h2>
                <div className="flex gap-3 mb-1">
                  <p className="text-[10px] text-[#fbbf24] font-bold uppercase tracking-widest">Roll No: {student.rollNo}</p>
                  <p className="text-[10px] text-[#a0b5a3] font-bold uppercase tracking-widest">ID: {student.studentId}</p>
                </div>
                <div className="w-fit bg-[#fbbf24]/10 border border-[#fbbf24]/20 px-2 py-0.5 rounded-lg">
                  <p className="text-[9px] text-[#fbbf24] font-black uppercase tracking-widest">{student.rank} Rank in Class</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-3xl font-black text-white leading-none">{student.gpa}</p>
                <p className="text-[9px] text-[#a0b5a3] font-bold uppercase tracking-widest mt-1">GPA</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation Tabs - CUSTOM IMPLEMENTATION */}
        <div className="w-full bg-[#1a2e1c] border border-white/5 p-1.5 rounded-2xl mb-8 flex gap-1.5">
          {['overview', 'academics', 'feedback', 'activity'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${
                activeTab === tab 
                  ? 'bg-[#059669] text-white shadow-lg' 
                  : 'text-[#a0b5a3] hover:text-[#e8f5e9]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* OVERVIEW CONTENT */}
        {activeTab === 'overview' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            {/* Performance Health */}
            <div className="bg-[#1a2e1c] rounded-[2rem] border border-white/5 p-7 space-y-6 relative overflow-hidden">
               <div className="flex items-center gap-2 mb-2 relative z-10">
                  <Activity className="w-4 h-4 text-[#059669]" />
                  <h3 className="text-[10px] font-black text-[#059669] uppercase tracking-[0.3em]">Performance Health</h3>
               </div>

               <div className="flex items-center justify-between relative z-10">
                  <div className="space-y-1">
                    <p className="text-4xl font-black text-white">{student.performanceHealth}<span className="text-lg text-[#a0b5a3]/50">/100</span></p>
                    <p className="text-xs font-bold text-[#059669] uppercase tracking-wider">Excellent</p>
                  </div>
                  <div className="relative w-20 h-20">
                     <svg className="w-full h-full" viewBox="0 0 36 36">
                        <path className="text-white/5" stroke="currentColor" strokeWidth="3" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                        <path className="text-[#059669]" strokeDasharray={`${student.performanceHealth}, 100`} stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                        <text x="18" y="21" className="text-[7px] font-black fill-white text-center" textAnchor="middle">{student.performanceHealth}%</text>
                     </svg>
                  </div>
               </div>

               <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden relative z-10">
                  <div className="h-full bg-gradient-to-r from-[#059669] to-[#fbbf24]" style={{ width: `${student.performanceHealth}%` }} />
               </div>
            </div>

            {/* AI Learning Insights */}
            <div className="space-y-4">
               <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-[#fbbf24]" />
                  <h3 className="text-[10px] font-black text-[#a0b5a3] uppercase tracking-[0.3em]">AI Learning Insights</h3>
               </div>
               {student.insights.map((insight, idx) => (
                  <div key={insight} className="bg-[#1a2e1c]/40 border border-white/5 p-4 rounded-2xl flex items-center gap-4 group hover:border-[#fbbf24]/20 transition-all">
                    <div className="w-10 h-10 rounded-xl bg-[#0d1f0f] border border-white/5 flex items-center justify-center text-[#fbbf24]">
                      {idx === 0 ? <TrendingUp size={18} /> : idx === 1 ? <Calendar size={18} /> : idx === 2 ? <BookOpen size={18} /> : <Activity size={18} />}
                    </div>
                    <p className="text-sm font-medium text-[#e8f5e9]">{insight}</p>
                  </div>
               ))}
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#1a2e1c] p-6 rounded-[2rem] border border-white/5">
                <Calendar className="w-4 h-4 text-[#059669] mb-4" />
                <p className="text-2xl font-black text-white">{student.attendance}%</p>
                <p className="text-[9px] text-[#a0b5a3] font-bold uppercase tracking-widest mt-1">{student.presentDays}/{student.totalDays} Days</p>
                <p className="text-[9px] text-[#059669] font-black uppercase tracking-widest mt-3">Attendance</p>
              </div>
              <div className="bg-[#1a2e1c] p-6 rounded-[2rem] border border-white/5">
                <Star className="w-4 h-4 text-[#fbbf24] mb-4" />
                <p className="text-2xl font-black text-white">{student.avgScore}<span className="text-sm text-[#a0b5a3]/50">/100</span></p>
                <p className="text-[9px] text-[#a0b5a3] font-bold uppercase tracking-widest mt-1">GPA {student.gpa}</p>
                <p className="text-[9px] text-[#fbbf24] font-black uppercase tracking-widest mt-3">Avg Score</p>
              </div>
            </div>

            {/* Badges */}
            <div className="space-y-4">
               <div className="flex items-center gap-2 mb-2">
                  <Award className="w-4 h-4 text-[#fbbf24]" />
                  <h3 className="text-[10px] font-black text-[#a0b5a3] uppercase tracking-[0.3em]">Achievement Badges</h3>
               </div>
               <div className="grid grid-cols-2 gap-3">
                  {student.badges.map((badge, idx) => (
                    <div key={idx} className="bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5 p-4 rounded-2xl flex items-center gap-3">
                       <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${badge.color}20`, color: badge.color }}>
                          {badge.icon}
                       </div>
                       <span className="text-[10px] font-black text-white uppercase tracking-tight">{badge.name}</span>
                    </div>
                  ))}
               </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-[#1a2e1c] rounded-[2rem] border border-white/5 p-6 space-y-4">
              <div className="flex items-center gap-2 mb-2">
                  <Users className="w-4 h-4 text-[#059669]" />
                  <h3 className="text-[10px] font-black text-[#059669] uppercase tracking-[0.3em]">Parent Quick Actions</h3>
               </div>
               {[
                 { label: 'Message Teacher', sub: 'Send a note to class teacher', icon: MessageCircle, action: handleMessageTeacher },
                 { label: 'Download Report Card', sub: 'PDF • Latest term', icon: FileText, action: () => setShowReportCard(true) },
                 { label: 'View Full Academic History', sub: 'All terms & years', icon: History, action: () => setShowHistory(true) }
               ].map((action, i) => (
                 <button key={i} onClick={action.action} className="w-full flex items-center justify-between p-4 rounded-2xl bg-[#0d1f0f]/50 border border-white/5 active:scale-[0.98] transition-all group">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 rounded-xl bg-[#1a2e1c] flex items-center justify-center text-[#059669] group-hover:text-[#fbbf24]">
                          <action.icon size={20} />
                       </div>
                       <div className="text-left">
                          <p className="text-[13px] font-black text-white group-hover:text-[#fbbf24] transition-colors">{action.label}</p>
                          <p className="text-[10px] text-[#a0b5a3]">{action.sub}</p>
                       </div>
                    </div>
                    <ChevronRight size={16} className="text-[#a0b5a3]" />
                 </button>
               ))}
            </div>
          </div>
        )}

        {/* ACADEMICS CONTENT */}
        {activeTab === 'academics' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
             {/* Attendance Chart (Fixed Histogram) */}
             <div className="bg-[#1a2e1c] rounded-[2rem] border border-white/5 p-7">
               <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-[#059669]" />
                    <h3 className="text-[10px] font-black text-[#059669] uppercase tracking-[0.3em]">Attendance Details</h3>
                  </div>
                  <div className="flex gap-4">
                    <div className="text-center">
                       <p className="text-lg font-black text-white leading-none">{student.totalDays}</p>
                       <p className="text-[8px] text-[#a0b5a3] font-bold uppercase tracking-tighter">Total</p>
                    </div>
                    <div className="text-center">
                       <p className="text-lg font-black text-[#059669] leading-none">{student.presentDays}</p>
                       <p className="text-[8px] text-[#a0b5a3] font-bold uppercase tracking-tighter">Present</p>
                    </div>
                    <div className="text-center">
                       <p className="text-lg font-black text-red-500 leading-none">{student.absentDays}</p>
                       <p className="text-[8px] text-[#a0b5a3] font-bold uppercase tracking-tighter">Absent</p>
                    </div>
                  </div>
               </div>

               <div className="flex items-end justify-between gap-2 h-40 px-2 border-b border-white/5">
                 {(student.attendanceHistory || [70, 85, 90, 88, 95, 100]).map((h, i) => (
                   <div key={i} className="flex-1 flex flex-col items-center justify-end h-full">
                      <div className="w-full bg-[#0d1f0f] rounded-t-lg relative group overflow-hidden" style={{ height: `${h}%` }}>
                         <div className={`absolute inset-0 bg-[#059669] ${h < 60 ? 'bg-red-500' : i === 3 ? 'bg-[#fbbf24]' : ''}`} />
                         <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                         <div className="absolute top-1 left-0 right-0 text-[8px] text-center font-black text-white opacity-0 group-hover:opacity-100 transition-opacity">{h}%</div>
                      </div>
                      <span className="text-[8px] font-black text-[#a0b5a3] uppercase mt-3">{['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][i]}</span>
                   </div>
                 ))}
               </div>
             </div>

             {/* Subject Wise Marks */}
             <div className="bg-[#1a2e1c] rounded-[2rem] border border-white/5 p-7 space-y-6">
                <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="w-4 h-4 text-[#fbbf24]" />
                    <h3 className="text-[10px] font-black text-[#fbbf24] uppercase tracking-[0.3em]">Subject-Wise Marks</h3>
                </div>

                <div className="space-y-5">
                   {student.subjects.map((sub, i) => (
                     <div key={i} className="space-y-2">
                        <div className="flex justify-between items-end">
                           <p className="text-xs font-black text-white uppercase tracking-wider">{sub.name}</p>
                           <p className="text-xs font-black text-white">{sub.score}<span className="text-[10px] text-[#a0b5a3]/50">/100</span></p>
                        </div>
                        <div className="w-full h-1.5 bg-[#0d1f0f] rounded-full overflow-hidden">
                           <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${sub.score}%`, backgroundColor: sub.color }} />
                        </div>
                     </div>
                   ))}
                </div>

                <div className="pt-6 border-t border-white/5 flex justify-between items-center">
                   <p className="text-xs font-black text-[#a0b5a3] uppercase tracking-widest">Average Score</p>
                   <p className="text-lg font-black text-[#fbbf24]">{student.avgScore}/100</p>
                </div>
             </div>

             {/* Performance Trend */}
             <div className="bg-[#1a2e1c] rounded-[2rem] border border-white/5 p-7">
                <div className="flex items-center gap-2 mb-8">
                    <TrendingUp className="w-4 h-4 text-[#059669]" />
                    <h3 className="text-[10px] font-black text-[#059669] uppercase tracking-[0.3em]">Performance Trend</h3>
                </div>
                <div className="h-32 w-full relative flex items-center justify-center">
                   <div className="absolute inset-0 flex items-end justify-between px-2">
                      {(student.performanceTrend || [60, 65, 70, 68, 75, 87]).map((val, i) => (
                        <div key={i} className="relative group">
                          <div className="w-2 h-2 rounded-full bg-[#059669] relative z-10" style={{ bottom: `${val - 10}px` }}>
                             <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-white text-[#0d1f0f] text-[8px] font-black px-1.5 py-0.5 rounded shadow-xl">
                                {val}%
                             </div>
                          </div>
                        </div>
                      ))}
                   </div>
                   <svg className="w-full h-full absolute inset-0 overflow-visible" preserveAspectRatio="none">
                      <path d="M 0 100 Q 50 80 100 60 T 200 40 T 300 20" fill="none" stroke="#059669" strokeWidth="2" strokeOpacity="0.3" />
                   </svg>
                   <div className="absolute bottom-0 left-0 right-0 flex justify-between px-2 pt-4">
                      {['Feb', 'Mar', 'Apr', 'May', 'Jun'].map(m => <span key={m} className="text-[8px] font-black text-[#a0b5a3] uppercase">{m}</span>)}
                   </div>
                </div>
             </div>

             {/* Homework Status */}
             <div className="grid grid-cols-3 gap-4">
                {[
                  { label: 'Completed', val: student.homework.completed, color: 'text-[#059669]' },
                  { label: 'Pending', val: student.homework.pending, color: 'text-red-500' },
                  { label: 'Rate', val: `${student.homework.rate}%`, color: 'text-[#fbbf24]' }
                ].map((s, i) => (
                  <div key={i} className="bg-[#1a2e1c] p-5 rounded-2xl border border-white/5 text-center">
                    <p className={`text-xl font-black ${s.color}`}>{s.val}</p>
                    <p className="text-[8px] text-[#a0b5a3] font-bold uppercase tracking-widest mt-1">{s.label}</p>
                  </div>
                ))}
             </div>
          </div>
        )}

        {/* FEEDBACK CONTENT */}
        {activeTab === 'feedback' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
             <div className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                    <MessageSquare className="w-4 h-4 text-[#059669]" />
                    <h3 className="text-[10px] font-black text-[#059669] uppercase tracking-[0.3em]">Teacher Feedback</h3>
                </div>
                {student.feedback.map((f, i) => (
                  <div key={i} className="bg-[#1a2e1c] border border-white/5 rounded-3xl p-6 relative overflow-hidden group">
                     <div className="absolute top-0 right-0 w-24 h-24 bg-[#059669]/5 rounded-full blur-2xl -mr-12 -mt-12 transition-all group-hover:bg-[#fbbf24]/5" />
                     <div className="flex justify-between items-start mb-4 relative z-10">
                        <div className="space-y-0.5">
                           <h4 className="text-sm font-black text-[#059669] group-hover:text-[#fbbf24] transition-colors">{f.teacher}</h4>
                           <p className="text-[9px] font-bold text-[#a0b5a3] uppercase tracking-widest">{f.subject}</p>
                        </div>
                        <span className="text-[9px] font-black text-white/20 uppercase">{f.date}</span>
                     </div>
                     <p className="text-sm text-[#e8f5e9] leading-relaxed relative z-10 italic">"{f.comment}"</p>
                  </div>
                ))}
             </div>

             <div className="space-y-6">
                <div className="space-y-3">
                   <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#059669]" />
                      <h4 className="text-[10px] font-black text-[#a0b5a3] uppercase tracking-widest">Strengths</h4>
                   </div>
                   <div className="grid gap-2">
                      {student.strengths.map((s, i) => (
                        <div key={i} className="bg-white/5 p-4 rounded-2xl flex items-center gap-3">
                           <div className="w-1.5 h-1.5 rounded-full bg-[#059669]" />
                           <p className="text-sm text-[#e8f5e9]">{s}</p>
                        </div>
                      ))}
                   </div>
                </div>

                <div className="space-y-3">
                   <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-red-500" />
                      <h4 className="text-[10px] font-black text-[#a0b5a3] uppercase tracking-widest">Areas of Improvement</h4>
                   </div>
                   <div className="grid gap-2">
                      {student.improvements.map((s, i) => (
                        <div key={i} className="bg-white/5 p-4 rounded-2xl flex items-center gap-3">
                           <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                           <p className="text-sm text-[#e8f5e9]">{s}</p>
                        </div>
                      ))}
                   </div>
                </div>
             </div>
          </div>
        )}

        {/* ACTIVITY CONTENT */}
        {activeTab === 'activity' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
             <div className="text-center py-20 opacity-30">
                <LayoutDashboard size={48} className="mx-auto mb-4" />
                <p className="text-xs font-black uppercase tracking-widest">Activity Log Coming Soon</p>
             </div>
          </div>
        )}
      </main>
    </div>
  );
}
