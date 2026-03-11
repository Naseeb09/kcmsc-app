import { ChevronLeft, BookOpen, FlaskConical, MonitorCheck, Trophy, Presentation, MapPin, Clock, Users as UsersIcon, ArrowUpDown, Sparkles, Building2, Wifi, ShieldCheck, Coffee, LibraryBig } from 'lucide-react';
import { Card, CardContent } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { useAppContext } from '@/context/AppContext';

interface FacilitiesProps {
  onNavigate: (view: string) => void;
}

const iconMap: Record<string, any> = {
  BookOpen,
  FlaskConical,
  MonitorCheck,
  Trophy,
  Presentation
};

export function Facilities({ onNavigate }: FacilitiesProps) {
  const { facilities } = useAppContext();

  const lifts = [
    { id: 1, name: 'Boys Lift', icon: '👦', description: 'Access L1-L12' },
    { id: 2, name: 'Girls Lift', icon: '👧', description: 'Access L1-L12' },
    { id: 3, name: 'Faculty Lift', icon: '👨‍🏫', description: 'VIP/Staff Only' }
  ];

  const getIcon = (iconName: string) => {
    const IconComponent = iconMap[iconName];
    return IconComponent || MapPin;
  };

  return (
    <div className="pb-24 bg-[#0d1f0f] min-h-screen font-sans selection:bg-[#fbbf24] selection:text-[#0d1f0f]">
      
      {/* 1. HEADER - COMPACT GLITCHED STYLE */}
      <header className="relative bg-[#1a2e1c] px-6 pt-10 pb-8 border-b border-[#059669]/20 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#059669]/10 via-transparent to-transparent opacity-50" />
        
        <div className="max-w-md mx-auto relative z-10">
          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate('home')}
              className="w-11 h-11 rounded-xl bg-[#0d1f0f] flex items-center justify-center border border-[#059669]/20 text-[#059669] hover:text-[#fbbf24] transition-all active:scale-95 shadow-lg"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <div className="flex-1">
              <h1 className="text-[10px] font-black text-[#059669] uppercase tracking-[0.3em] mb-0.5">Campus Infrastructure</h1>
              <div className="flex items-center gap-1.5 mt-1">
                <div className="w-1.5 h-1.5 rounded-full bg-[#fbbf24] animate-pulse" />
                <p className="text-[9px] text-[#a0b5a3] uppercase font-bold tracking-widest">Active Amenities 2026</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-6 py-8 space-y-10">
        
        {/* 2. DIGITAL INFRASTRUCTURE - NEW SECTION */}
        <section>
          <div className="flex items-center gap-2 mb-5 ml-2">
            <Wifi className="w-4 h-4 text-[#fbbf24]" />
            <h2 className="text-[10px] font-black text-[#059669] uppercase tracking-[0.2em]">Smart Tech Layer</h2>
          </div>
          <div className="bg-[#1a2e1c] border border-white/5 rounded-[2rem] p-6 space-y-4 shadow-xl">
             <div className="flex items-center justify-between">
                <span className="text-[10px] font-black text-white uppercase tracking-wider">Campus Wide Wi-Fi</span>
                <Badge className="bg-[#059669] text-[#0d1f0f] font-black text-[8px] uppercase">High Speed</Badge>
             </div>
             <div className="flex items-center justify-between">
                <span className="text-[10px] font-black text-white uppercase tracking-wider">Smart Board Classrooms</span>
                <Badge className="bg-[#059669] text-[#0d1f0f] font-black text-[8px] uppercase">All Floors</Badge>
             </div>
             <div className="flex items-center justify-between">
                <span className="text-[10px] font-black text-white uppercase tracking-wider">Online Library Portal</span>
                <Badge className="bg-[#fbbf24] text-[#0d1f0f] font-black text-[8px] uppercase">24/7 Access</Badge>
             </div>
          </div>
        </section>

        {/* 3. LIFT SYSTEM GRID */}
        <section>
          <div className="flex items-center gap-2 mb-4 ml-2">
            <ArrowUpDown className="w-4 h-4 text-[#fbbf24]" />
            <h2 className="text-[10px] font-black text-[#059669] uppercase tracking-[0.2em]">Vertical Transit</h2>
          </div>
          
          <div className="grid grid-cols-3 gap-3">
            {lifts.map((lift) => (
              <div key={lift.id} className="bg-[#1a2e1c] border border-white/5 rounded-2xl p-4 flex flex-col items-center text-center shadow-lg">
                <div className="w-12 h-12 mb-3 rounded-xl bg-[#0d1f0f] border border-[#059669]/20 flex items-center justify-center text-xl">
                  {lift.icon}
                </div>
                <h3 className="text-[9px] font-black text-white uppercase tracking-tighter mb-1">{lift.name}</h3>
                <p className="text-[8px] text-[#059669] font-black uppercase opacity-80 leading-none">{lift.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 4. MAIN FACILITIES LIST */}
        <section className="space-y-5">
          <div className="flex items-center gap-2 mb-4 ml-2">
            <Sparkles className="w-4 h-4 text-[#fbbf24]" />
            <h2 className="text-[10px] font-black text-[#059669] uppercase tracking-[0.2em]">Core Facilities</h2>
          </div>
          
          <div className="space-y-4">
            {facilities.map((facility) => {
              const IconComponent = getIcon(facility.icon);
              return (
                <Card key={facility.id} className="bg-[#1a2e1c] border border-[#059669]/20 rounded-[2rem] overflow-hidden group">
                  <CardContent className="p-0">
                    <div className="p-6 flex items-start gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-[#0d1f0f] border border-[#fbbf24]/20 flex items-center justify-center shrink-0">
                        <IconComponent className="w-6 h-6 text-[#fbbf24]" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-black text-white uppercase tracking-tight mb-1">{facility.name}</h3>
                        <p className="text-[11px] text-[#a0b5a3] font-bold uppercase tracking-tighter leading-relaxed mb-4">
                          {facility.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-2">
                          <Badge className="bg-[#0d1f0f] text-[#059669] px-2 py-1 text-[8px] font-black uppercase border border-[#059669]/10">
                            <MapPin className="w-3 h-3 mr-1" />
                            {facility.floor}
                          </Badge>
                          <Badge className="bg-[#0d1f0f] text-[#fbbf24] px-2 py-1 text-[8px] font-black uppercase border border-[#fbbf24]/10">
                            <UsersIcon className="w-3 h-3 mr-1" />
                            {facility.capacity} Students
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* 5. STUDENT SERVICES - NEW SECTION */}
        <section className="grid grid-cols-2 gap-4">
            <div className="bg-[#1a2e1c] border border-white/5 rounded-[2rem] p-5">
                <Coffee className="w-5 h-5 text-[#fbbf24] mb-3" />
                <h3 className="text-[10px] font-black text-white uppercase tracking-widest mb-1">Cafeteria</h3>
                <p className="text-[9px] text-[#a0b5a3] font-bold uppercase">Open: 8AM - 4PM</p>
            </div>
            <div className="bg-[#1a2e1c] border border-white/5 rounded-[2rem] p-5">
                <ShieldCheck className="w-5 h-5 text-[#059669] mb-3" />
                <h3 className="text-[10px] font-black text-white uppercase tracking-widest mb-1">Security</h3>
                <p className="text-[9px] text-[#a0b5a3] font-bold uppercase">24/7 CCTV Feed</p>
            </div>
        </section>

        {/* 6. ACTION CTA */}
        <div className="pt-4">
          <button 
            onClick={() => onNavigate('contact')}
            className="w-full bg-[#059669] text-[#0d1f0f] rounded-2xl py-6 flex flex-col items-center justify-center gap-1 shadow-xl shadow-[#059669]/10 active:scale-95 group"
          >
            <span className="text-xs font-black uppercase tracking-[0.4em]">Schedule Full Tour</span>
            <span className="text-[9px] font-bold uppercase opacity-60">Verified Institutional Access</span>
          </button>
        </div>

      </main>
    </div>
  );
}