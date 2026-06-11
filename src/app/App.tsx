import { useState, useEffect, useMemo } from 'react';
import { HomeScreen } from '@/app/components/HomeScreen';
import { ClassSearch } from '@/app/components/ClassSearch';
import { FloorMaps } from '@/app/components/FloorMaps';
import { FloorDetail } from '@/app/components/FloorDetail';
import { StaffDirectory } from '@/app/components/StaffDirectory';
import { Facilities } from '@/app/components/Facilities';
import { SchoolInfo } from '@/app/components/SchoolInfo';
import { Contact } from '@/app/components/Contact';
import { Fees } from '@/app/components/Fees';
import { Map } from '@/app/components/Map';
import { Profile } from '@/app/components/Profile';
import { MoreScreen } from '@/app/components/MoreScreen';
import { AdminLogin } from '@/app/components/AdminLogin';
import { Dashboard } from '@/app/components/Dashboard';
import { SmartComplaint } from '@/app/components/SmartComplaint';
import { LostAndFound } from '@/app/components/LostAndFound';
import { StudentPerformance, Student } from '@/app/components/StudentPerformance';
import { BottomNavigation } from '@/app/components/BottomNavigation';
import { LoadingScreen } from '@/app/components/LoadingScreen';
import { AppProvider, useAppContext } from '@/context/AppContext';
import { GlitchedAI } from '@/app/components/GlitchedAI';
import { Bot, Star, Activity, Search, ChevronLeft, Award, CheckCircle2, TrendingUp } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { Card, CardContent } from '@/app/components/ui/card';

import { Toaster } from '@/app/components/ui/sonner';
import { LanguageToggle } from '@/app/components/LanguageToggle';

function AppContent() {
  const { isLoading, isAdmin } = useAppContext();
  const [currentView, setCurrentView] = useState('home');
  const [navigationData, setNavigationData] = useState<{
    student?: Student;
    roomName?: string;
    className?: string;
    floorId?: string;
    classInfo?: any;
    initialQuery?: string;
  } | null>(null);
  const [isBotOpen, setIsBotOpen] = useState(false);

  const handleNavigate = (view: string, data?: any) => {
    if (view === 'bot') {
      setIsBotOpen(true);
      return;
    }
    setNavigationData(data || null);
    setCurrentView(view);
    // Scroll to top when navigating
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  const renderView = () => {
    // Check if it's a floor detail view
    if (currentView.startsWith('floor-detail-')) {
      const floorId = currentView.replace('floor-detail-', '');
      return <FloorDetail onNavigate={handleNavigate} floorId={floorId} />;
    }

    // Check if it's the student performance view
    if (currentView === 'student-performance') {
      if (!navigationData?.student) return <HomeScreen onNavigate={handleNavigate} />;
      return (
        <StudentPerformance 
          onBack={() => handleNavigate('student-directory', { classInfo: navigationData.classInfo, floorId: navigationData.floorId })}
          student={navigationData.student}
          roomName={navigationData.roomName || ''}
          className={navigationData.className || ''}
          teacherNumber={navigationData.classInfo?.teacherNumber || 'N/A'}
        />
      );
    }

    switch (currentView) {
      case 'home':
        return <HomeScreen onNavigate={handleNavigate} />;
      case 'search':
        return <ClassSearch onNavigate={handleNavigate} initialQuery={navigationData?.initialQuery} />;
      case 'floors':
        return <FloorMaps onNavigate={handleNavigate} />;
      case 'staff':
        return <StaffDirectory onNavigate={handleNavigate} />;
      case 'facilities':
        return <Facilities onNavigate={handleNavigate} />;
      case 'about':
        return <SchoolInfo onNavigate={handleNavigate} />;
      case 'contact':
        return <Contact onNavigate={handleNavigate} />;
      case 'fees':
        return <Fees onNavigate={handleNavigate} />;
      case 'map':
        return <Map onNavigate={handleNavigate} />;
      case 'profile':
        return <Profile onNavigate={handleNavigate} />;
      case 'more':
        return <MoreScreen onNavigate={handleNavigate} />;
      case 'smart-complaint':
        return <SmartComplaint onNavigate={handleNavigate} />;
      case 'lost-found':
        return <LostAndFound onNavigate={handleNavigate} />;
      case 'student-directory':
        if (!navigationData?.classInfo) return <HomeScreen onNavigate={handleNavigate} />;
        return (
          <StudentDirectory 
            onBack={() => handleNavigate('floor-detail-' + (navigationData?.floorId || ''))}
            onNavigate={handleNavigate}
            classInfo={navigationData.classInfo}
            floorId={navigationData?.floorId || ''}
          />
        );
      case 'admin-login':
        return <AdminLogin onNavigate={handleNavigate} />;
      case 'admin-dashboard':
        return isAdmin ? <Dashboard onNavigate={handleNavigate} /> : <AdminLogin onNavigate={handleNavigate} />;
      default:
        return <HomeScreen onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1f0f]">
      {/* Mobile Container */}
      <div className="max-w-md mx-auto bg-[#0d1f0f] min-h-screen relative flex flex-col">
        {/* Main Content Area */}
        <div className="flex-1 pb-32">
          {renderView()}
        </div>

        {/* Floating AI Bot Button */}
        {!isBotOpen && (
          <div className="fixed bottom-28 right-6 z-[60]">
            <button 
              onClick={() => setIsBotOpen(true)}
              className="w-14 h-14 rounded-2xl bg-[#059669] text-white flex items-center justify-center shadow-[0_0_20px_rgba(5,150,105,0.4)] border border-[#fbbf24]/30 active:scale-90 transition-all group"
            >
              <Bot className="w-7 h-7 group-hover:animate-bounce" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#fbbf24] rounded-full border-2 border-[#0d1f0f] animate-pulse" />
            </button>
          </div>
        )}

        <GlitchedAI isOpen={isBotOpen} onClose={() => setIsBotOpen(false)} />

        {/* Bottom Navigation */}
        <BottomNavigation currentView={currentView} onNavigate={handleNavigate} />

        <Toaster position="top-center" expand={false} richColors />
      </div>
    </div>
  );
}


// --- SUB-COMPONENT: StudentDirectory ---
function StudentDirectory({ onBack, onNavigate, classInfo, floorId }: { onBack: () => void, onNavigate: any, classInfo: any, floorId: string }) {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');

  // Generate realistic Bengali demo students with grade-specific subjects
  const students = useMemo<Student[]>(() => {
    const firstNames = ['Arif', 'Tahmid', 'Nusrat', 'Sadia', 'Mashrafe', 'Tamim', 'Sakib', 'Fariha', 'Anika', 'Zubayer', 'Mahmud', 'Raisa', 'Sumaiya'];
    const lastNames = ['Hasan', 'Ahmed', 'Islam', 'Rahman', 'Jahan', 'Akter', 'Khan', 'Sultana', 'Chowdhury', 'Hossain'];
    
    const getGrade = (score: number, fullMarks: number = 100) => {
      const percentage = (score / fullMarks) * 100;
      if (percentage >= 80) return { gpa: 5.00, label: 'A+' };
      if (percentage >= 70) return { gpa: 4.00, label: 'A' };
      if (percentage >= 60) return { gpa: 3.50, label: 'A-' };
      if (percentage >= 50) return { gpa: 3.00, label: 'B' };
      if (percentage >= 40) return { gpa: 2.00, label: 'C' };
      if (percentage >= 33) return { gpa: 1.00, label: 'D' };
      return { gpa: 0.00, label: 'F' };
    };

    // Determine subjects based on class/grade
    const getSubjectsForClass = (className: string) => {
      const basic = [
        { name: 'Bangla', score: 0, color: '#10b981' },
        { name: 'English', score: 0, color: '#3b82f6' },
        { name: 'Maths', score: 0, color: '#fbbf24' }
      ];

      const gradeStr = className.toLowerCase();

      if (gradeStr.includes('9') || gradeStr.includes('10')) {
        return [
          ...basic,
          { name: 'Physics', score: 0, color: '#8b5cf6' },
          { name: 'Chemistry', score: 0, color: '#ec4899' },
          { name: 'Biology', score: 0, color: '#06b6d4' },
          { name: 'Higher Math', score: 0, color: '#f97316' }
        ];
      } else if (gradeStr.includes('6') || gradeStr.includes('7') || gradeStr.includes('8')) {
        return [
          ...basic,
          { name: 'Science', score: 0, color: '#06b6d4' },
          { name: 'History', score: 0, color: '#8b5cf6' },
          { name: 'Geography', score: 0, color: '#f97316' },
          { name: 'ICT', score: 0, color: '#ec4899' }
        ];
      } else if (gradeStr.includes('1') || gradeStr.includes('2') || gradeStr.includes('nursery') || gradeStr.includes('kg')) {
        return [
          ...basic,
          { name: 'Arts', score: 0, color: '#ec4899' },
          { name: 'GK', score: 0, color: '#8b5cf6' }
        ];
      } else {
        return [
          ...basic,
          { name: 'Science', score: 0, color: '#06b6d4' },
          { name: 'Religion', score: 0, color: '#8b5cf6' },
          { name: 'Arts', score: 0, color: '#ec4899' }
        ];
      }
    };

    const count = 12; // Fixed count for consistency
    const strengthsPool = ['Analytical Thinking', 'Punctuality', 'Creative Writing', 'Problem Solving', 'Public Speaking', 'Peer Support', 'Quick Learner', 'Active Participation', 'Neat Handwriting', 'Logical Reasoning'];
    const improvementsPool = ['Note-taking speed', 'Peer collaboration', 'Time management', 'Focus during lectures', 'Spelling accuracy', 'Calculative speed', 'Classroom engagement', 'Homework consistency', 'Vocabulary range', 'Critical thinking'];

    const tempStudents = Array.from({ length: count }, (_, i) => {
      const name = `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
      const attendance = Math.floor(Math.random() * (98 - 45) + 45); // Much wider range for variety

      // Generate unique subject scores with more variance
      const subjects = getSubjectsForClass(classInfo.name).map(sub => {
        const isArt = sub.name.toLowerCase().includes('art');
        const fullMarks = isArt ? 50 : 100;
        return {
          ...sub,
          score: isArt 
            ? Math.floor(Math.random() * 25 + 25) // 25-50 range
            : Math.floor(Math.random() * 65 + 35) // 35-100 range
        };
      });

      const totalFullMarks = subjects.reduce((acc, s) => acc + (s.name.toLowerCase().includes('art') ? 50 : 100), 0);
      const totalObtained = subjects.reduce((acc, s) => acc + s.score, 0);
      const avgScore = Math.floor((totalObtained / totalFullMarks) * 100);

      const totalGPA = subjects.reduce((acc, s) => {
        const isArt = s.name.toLowerCase().includes('art');
        return acc + getGrade(s.score, isArt ? 50 : 100).gpa;
      }, 0) / subjects.length;

      const gpa = totalGPA.toFixed(2);      // Performance Health is a mix of GPA, attendance, and homework
      const hwRate = 60 + Math.floor(Math.random() * 40);
      const performanceHealth = Math.floor((totalGPA / 5 * 40) + (attendance / 100 * 40) + (hwRate / 100 * 20));

      // Dynamic Badges based on performance
      const badges = [];
      if (parseFloat(gpa) >= 4.8) badges.push({ name: 'Academic Elite', icon: <Star size={14} />, color: '#fbbf24' });
      else if (parseFloat(gpa) >= 4.0) badges.push({ name: 'Top Performer', icon: <Award size={14} />, color: '#fbbf24' });
      
      if (attendance >= 96) badges.push({ name: 'Perfect Attendance', icon: <Activity size={14} />, color: '#059669' });
      else if (attendance >= 90) badges.push({ name: 'Highly Regular', icon: <Activity size={14} />, color: '#059669' });

      if (hwRate >= 95) badges.push({ name: 'Homework Hero', icon: <CheckCircle2 size={14} />, color: '#3b82f6' });

      // Default badges if none - make them more appropriate
      if (badges.length === 0) {
        if (performanceHealth > 70) badges.push({ name: 'Rising Star', icon: <TrendingUp size={14} />, color: '#8b5cf6' });
        else if (attendance > 80) badges.push({ name: 'Diligent Learner', icon: <BookOpen size={14} />, color: '#06b6d4' });
        else badges.push({ name: 'Potential Talent', icon: <Activity size={14} />, color: '#a0b5a3' });
      }

      // Randomize strengths and improvements
      const studentStrengths = [...strengthsPool].sort(() => 0.5 - Math.random()).slice(0, 3);
      const studentImprovements = [...improvementsPool].sort(() => 0.5 - Math.random()).slice(0, 2);

      // Generate random attendance history (6 months)
      const attendanceHistory = Array.from({ length: 6 }, () => Math.floor(Math.random() * (100 - 50) + 50));
      // Generate random performance trend (6 months)
      const performanceTrend = Array.from({ length: 6 }, () => Math.floor(Math.random() * (100 - 40) + 40));

      return {
        id: `stu-${classInfo.room}-${i}`,
        studentId: "1", // Simplified login ID as requested
        rollNo: (i + 1).toString(),
        name,
        gpa,
        rank: "0", // Placeholder
        attendance,
        avgScore,
        totalDays: 124,
        presentDays: Math.floor(124 * (attendance / 100)),
        absentDays: 124 - Math.floor(124 * (attendance / 100)),
        performanceHealth,
        subjects,
        insights: [
          `Excels remarkably in ${subjects.sort((a,b) => b.score - a.score)[0].name}.`,
          performanceHealth > 85 ? 'Shows exceptional mental agility and focus.' : performanceHealth > 70 ? 'Steadily improving across core modules.' : 'Needs focused attention on revision schedules.',
          attendance > 90 ? 'Consistently present and engaged in class.' : 'Occasional absences affecting cumulative progress.'
        ],
        badges,
        feedback: [
          { 
            teacher: classInfo.teacher, 
            subject: 'Class Teacher', 
            date: 'Jun 5, 2026', 
            comment: performanceHealth > 85 ? `${name} is a model student. Keep up the momentum.` : performanceHealth > 65 ? `${name} has potential but needs to stay more focused during lectures.` : `${name} requires additional support in core subjects to improve scores.`
          }
        ],
        strengths: studentStrengths,
        improvements: studentImprovements,
        homework: {
          completed: Math.floor(40 * (hwRate / 100)),
          pending: Math.floor(40 * (1 - hwRate / 100)),
          rate: hwRate
        },
        attendanceHistory,
        performanceTrend
      };
    });

    // --- FIX RANKING BUG ---
    // Sort students by average score descending to determine correct ranks
    const sortedStudents = [...tempStudents].sort((a, b) => b.avgScore - a.avgScore);
    
    // Map back with correct ranks
    return tempStudents.map(student => {
      const actualRank = sortedStudents.findIndex(s => s.id === student.id) + 1;
      return {
        ...student,
        rank: actualRank.toString()
      };
    });
  }, [classInfo]);

  const filteredStudents = students.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="min-h-screen bg-[#0d1f0f] pb-32">
      <header className="bg-[#1a2e1c] px-6 pt-10 pb-6 border-b border-[#059669]/20 sticky top-0 z-30">
        <div className="max-w-2xl mx-auto flex items-center gap-4">
          <button onClick={onBack} className="w-11 h-11 rounded-xl bg-[#0d1f0f] border border-[#059669]/30 flex items-center justify-center text-[#059669]">
            <ChevronLeft />
          </button>
          <div>
            <h1 className="text-base font-black text-white uppercase tracking-tight leading-none mb-1">Class Members</h1>
            <p className="text-[10px] text-[#059669] font-black uppercase tracking-widest">Room {classInfo.room} • {classInfo.name}</p>
          </div>
        </div>
        <div className="max-w-2xl mx-auto mt-6 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#059669]" />
          <input 
            type="text"
            placeholder="Search student name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0d1f0f] border border-[#059669]/30 rounded-2xl py-4 pl-11 pr-4 text-sm text-white focus:outline-none focus:border-[#fbbf24] transition-all shadow-inner"
          />
        </div>
      </header>

      <div className="px-6 py-8 max-w-2xl mx-auto grid gap-4">
        {filteredStudents.map((student) => (
          <Card key={student.id} className="bg-[#1a3a1d]/40 border border-[#059669]/20 rounded-[1.5rem] overflow-hidden">
            <CardContent className="p-5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#0d1f0f] border border-[#fbbf24]/20 flex items-center justify-center text-[#fbbf24] font-black uppercase shadow-lg">
                  {student.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
                <div>
                  <h3 className="text-sm font-black text-white uppercase tracking-tight">{student.name}</h3>
                  <p className="text-[10px] text-[#a0b5a3] font-bold uppercase tracking-widest">Roll No: {student.rollNo}</p>
                </div>
              </div>
              <button 
                onClick={() => onNavigate('student-performance', { student, roomName: classInfo.room, className: classInfo.name, floorId, classInfo })}
                className="bg-[#059669]/10 text-[#059669] border border-[#059669]/30 px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-[#fbbf24] hover:text-[#0d1f0f] hover:border-[#fbbf24] transition-all active:scale-95"
              >
                View Details
              </button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}


export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
