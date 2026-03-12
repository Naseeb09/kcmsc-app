import { useState, useEffect } from 'react';
import { ChevronLeft, Users, Star, Award, GraduationCap } from 'lucide-react';
import { Card, CardContent } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { useAppContext } from '@/context/AppContext';

interface StaffDirectoryProps {
  onNavigate: (view: string) => void;
}

export function StaffDirectory({ onNavigate }: StaffDirectoryProps) {
  const { staff } = useAppContext();
  const [activeSection, setActiveSection] = useState<'Junior' | 'Senior'>('Senior');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const admins = staff.filter(s => s.section === 'Admin');
  const filteredTeachers = staff.filter(s => s.section === activeSection);

  const getInitials = (name: string) => {
    const parts = name.split(' ').filter(part => part.length > 0);
    if (parts.length >= 2) {
      return parts[0][0] + parts[parts.length - 1][0];
    }
    return parts[0]?.slice(0, 2).toUpperCase() || '??';
  };

  return (
    <div className="pb-28 bg-[#0d1f0f] min-h-screen">
      {/* 1. HEADER - STANDOUT FEES STYLE */}
      <header className="relative bg-[#1a2e1c] px-6 pt-10 pb-8 border-b border-[#059669]/30 overflow-hidden sticky top-0 z-30">
        {/* Ambient Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#059669]/20 blur-[100px] rounded-full -mr-20 -mt-20 opacity-60" />
        
        <div className="max-w-md mx-auto relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Rectangular Back Button */}
              <button
                onClick={() => onNavigate('home')}
                className="w-11 h-11 rounded-xl bg-[#0d1f0f] flex items-center justify-center border border-[#059669]/40 text-[#059669] shadow-[0_0_15px_rgba(5,150,105,0.1)] active:scale-95 transition-all"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              
              <div>
                {/* Bolder Dual-Tone Title */}
                <h1 className="text-[11px] font-black text-white uppercase tracking-[0.4em] leading-none mb-1.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                  Staff <span className="text-[#059669]">Directory</span>
                </h1>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#fbbf24] animate-pulse" />
                  <p className="text-[9px] text-[#a0b5a3] uppercase font-bold tracking-[0.2em]">Our Faculty & Admin</p>
                </div>
              </div>
            </div>

            {/* Contextual Icon Container - Gold Users Icon */}
            <div className="w-12 h-12 rounded-2xl bg-[#fbbf24]/5 border border-[#fbbf24]/20 flex items-center justify-center shadow-2xl backdrop-blur-md">
                <Users className="w-5 h-5 text-[#fbbf24] drop-shadow-[0_0_8px_rgba(251,191,36,0.4)]" />
            </div>
          </div>
        </div>
      </header>

      <div className="px-6 py-8 max-w-2xl mx-auto space-y-8">
        
        {/* EXECUTIVE SUITE */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Star className="w-4 h-4 text-[#fbbf24] fill-[#fbbf24]" />
            <h2 className="text-[10px] font-black text-[#059669] uppercase tracking-[0.3em]">Executive Suite</h2>
          </div>
          
          <div className="space-y-4">
            {admins.map((admin) => (
              <Card key={admin.id} className="bg-gradient-to-br from-[#1a3a1d] to-[#0d1f0f] border border-[#fbbf24]/30 rounded-[2rem] overflow-hidden shadow-2xl relative group">
                <div className="absolute top-0 right-0 p-4">
                  <Award className="w-6 h-6 text-[#fbbf24]/20" />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-5">
                    <div className="w-16 h-16 rounded-2xl bg-[#0d1f0f] border-2 border-[#fbbf24]/40 flex items-center justify-center text-[#fbbf24] text-xl font-black shadow-inner">
                      {admin.image ? (
                        <img src={admin.image} alt={admin.name} className="w-full h-full object-cover rounded-2xl" />
                      ) : (
                        getInitials(admin.name)
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-white leading-tight">{admin.name}</h3>
                      <p className="text-[#fbbf24] text-xs font-bold uppercase tracking-widest mt-1">{admin.role}</p>
                      <p className="text-[#a0b5a3] text-[10px] mt-2 font-bold uppercase tracking-widest">
                        Phone Number: <span className="text-[#e8f5e9]">{admin.phone || 'N/A'}</span>
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* SEGMENTED CONTROL */}
        <div className="bg-[#1a2e1c] p-1.5 rounded-2xl flex gap-1.5 border border-[#059669]/20 shadow-2xl">
          <button
            onClick={() => setActiveSection('Junior')}
            className={`flex-1 py-3.5 rounded-xl text-[11px] font-black uppercase tracking-[0.15em] transition-all ${
              activeSection === 'Junior' 
              ? 'bg-[#059669] text-white shadow-lg' 
              : 'text-[#a0b5a3] hover:text-[#e8f5e9]'
            }`}
          >
            Junior Section
          </button>
          <button
            onClick={() => setActiveSection('Senior')}
            className={`flex-1 py-3.5 rounded-xl text-[11px] font-black uppercase tracking-[0.15em] transition-all ${
              activeSection === 'Senior' 
              ? 'bg-[#059669] text-white shadow-lg' 
              : 'text-[#a0b5a3] hover:text-[#e8f5e9]'
            }`}
          >
            Senior Section
          </button>
        </div>

        {/* TEACHER LIST */}
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-[#059669]" />
              <h2 className="text-[10px] font-black text-[#059669] uppercase tracking-[0.3em]">Faculty Members</h2>
            </div>
            <span className="text-[9px] font-black text-[#a0b5a3] bg-white/5 px-2 py-1 rounded-full">
              {filteredTeachers.length} Members
            </span>
          </div>

          <div className="grid gap-4">
            {filteredTeachers.map((teacher) => (
              <Card key={teacher.id} className="bg-[#1a3a1d]/40 border border-[#059669]/20 rounded-[1.5rem] hover:border-[#059669]/40 transition-all overflow-hidden">
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl bg-[#0d1f0f] border border-[#059669]/30 flex items-center justify-center text-[#059669] text-sm font-black flex-shrink-0">
                      {teacher.image ? (
                        <img src={teacher.image} alt={teacher.name} className="w-full h-full object-cover rounded-xl" />
                      ) : (
                        getInitials(teacher.name)
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-sm font-black text-white truncate uppercase tracking-tight">
                          {teacher.name}
                        </h3>
                      </div>
                      <p className="text-[10px] text-[#059669] font-bold uppercase tracking-wider mt-0.5">
                        {teacher.subject} • {teacher.role}
                      </p>
                      
                      {teacher.formTeacherOf && (
                        <Badge className="mt-2 bg-[#fbbf24]/10 text-[#fbbf24] text-[9px] font-black uppercase tracking-widest border border-[#fbbf24]/20 rounded-lg px-2 py-0.5">
                          Form Teacher of {teacher.formTeacherOf}
                        </Badge>
                      )}

                      <div className="mt-4 pt-4 border-t border-[#059669]/10">
                        <p className="text-[10px] text-[#a0b5a3] font-bold uppercase tracking-[0.1em]">
                          Phone Number: <span className="text-[#fbbf24]">{teacher.phone || 'N/A'}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
