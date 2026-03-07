import { School, MapPin, Users, Building2, BookOpen, Phone, Search, DollarSign, ChevronRight } from 'lucide-react';
import { Badge } from '@/app/components/ui/badge';
import { schoolInfo } from "@/data/announcements";
import { useState, useEffect, useRef } from 'react';
import { useAppContext } from '@/context/AppContext';

interface HomeScreenProps {
  onNavigate: (view: string) => void;
}

export function HomeScreen({ onNavigate }: HomeScreenProps) {
  const { events } = useAppContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Ensuring exactly 6 events for perfect centering and loop logic
  const displayEvents = events.length >= 6 ? events.slice(0, 6) : [...events, ...events].slice(0, 6);

  const menuItems = [
    { id: 'floors', label: 'Floor Navigation', icon: MapPin, description: 'Browse by levels' },
    { id: 'staff', label: 'Staff Directory', icon: Users, description: 'Meet our faculty' },
    { id: 'facilities', label: 'Facilities', icon: Building2, description: 'Campus amenities' },
    { id: 'about', label: 'About School', icon: BookOpen, description: 'History & Mission' },
    { id: 'fees', label: 'Fees & Costs', icon: DollarSign, description: 'Tuition details' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      if (!scrollRef.current) return;
      const nextIndex = (activeIndex + 1) % displayEvents.length;
      const cardWidth = 280 + 20; 
      scrollRef.current.scrollTo({
        left: nextIndex * cardWidth,
        behavior: 'smooth'
      });
      setActiveIndex(nextIndex);
    }, 5000);
    return () => clearInterval(timer);
  }, [activeIndex, displayEvents.length]);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const scrollPosition = scrollRef.current.scrollLeft;
    const cardWidth = 280 + 20;
    const newIndex = Math.round(scrollPosition / cardWidth);
    if (newIndex !== activeIndex) setActiveIndex(newIndex);
  };

  return (
    <div className="pb-20 bg-[#0d1f0f] min-h-screen font-sans">
      {/* 1. Header */}
      <header className="bg-[#1a2e1c] px-6 py-6 border-b border-[#059669]/10">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 bg-[#059669]/20 rounded-xl flex items-center justify-center border border-[#059669]/30">
              <School className="w-6 h-6 text-[#059669]" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-[#e8f5e9] leading-tight">KC MODEL SCHOOL &</h1>
              <h1 className="text-sm font-bold text-[#e8f5e9] leading-tight">COLLEGE</h1>
              <p className="text-[10px] text-[#a0b5a3] uppercase tracking-widest mt-0.5">Dhaka, Bangladesh</p>
            </div>
          </div>
          <Badge className="bg-[#fbbf24] text-[#0d1f0f] border-0 px-3 py-1 rounded-lg text-[10px] font-black">EST. 2014</Badge>
        </div>
      </header>

      <main className="max-w-2xl mx-auto">
        {/* 2. Events Slider - Centered & Shadow-Free */}
        <section className="pt-10 pb-6 overflow-hidden">
          <div className="flex items-center justify-between mb-6 px-6">
            <h2 className="text-xs font-black text-white/90 uppercase tracking-[0.2em] flex items-center gap-2">
              <span className="w-1.5 h-4 bg-[#fbbf24] rounded-full"></span>
              Latest Events
            </h2>
            <button onClick={() => onNavigate('events')} className="text-[10px] text-[#059669] font-black uppercase tracking-widest">See All</button>
          </div>
          
          <div className="relative">
            <div 
              ref={scrollRef}
              onScroll={handleScroll}
              className="flex gap-5 overflow-x-auto snap-x snap-mandatory no-scrollbar px-[calc(50%-140px)] pb-6"
            >
              {displayEvents.map((event, index) => (
                <div 
                  key={index}
                  onClick={() => setSelectedEvent(event)}
                  // Removed shadow-2xl and shadow-[#059669]/20 for a flat design
                  className={`snap-center shrink-0 w-[280px] aspect-[16/10] rounded-3xl overflow-hidden relative border transition-all duration-500 ${
                    index === activeIndex ? 'border-[#059669] scale-100' : 'border-white/5 scale-90 opacity-30'
                  } bg-[#1a2e1c]`}
                >
                  <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d1f0f] via-transparent to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5">
                    <h3 className="text-white text-xs font-bold leading-tight line-clamp-1">{event.title}</h3>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center gap-2 mt-2">
              {displayEvents.map((_, i) => (
                <div 
                  key={i} 
                  className={`h-1.5 rounded-full transition-all duration-300 ${i === activeIndex ? 'w-5 bg-[#059669]' : 'w-1.5 bg-white/10'}`} 
                />
              ))}
            </div>
          </div>
        </section>

        {/* 3. Search Bar */}
        <section className="px-6 py-8"> 
          <div className="relative group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#059669]" />
            <input
              type="text"
              placeholder="Search for rooms, staff, or info..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => onNavigate('search')}
              className="w-full bg-[#112613] border border-[#059669]/20 rounded-2xl pl-12 pr-5 py-4 text-sm text-[#e8f5e9] placeholder:text-[#a0b5a3]/30 focus:outline-none focus:border-[#059669]/50 transition-all shadow-inner"
            />
          </div>
        </section>

        {/* 4. Explore Section */}
        <section className="px-6 py-6">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-white tracking-tight">Explore Our School</h2>
            <p className="text-xs text-[#a0b5a3] mt-1">Everything you need to navigate our campus</p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className="group bg-[#1a2e1c] border border-white/5 rounded-2xl p-5 flex items-center gap-5 active:scale-[0.98] transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#0d1f0f] flex items-center justify-center border border-[#059669]/20 group-hover:border-[#fbbf24]/50 transition-all">
                    <Icon className="w-6 h-6 text-[#fbbf24]" />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="text-sm font-bold text-[#e8f5e9] group-hover:text-[#fbbf24] transition-colors">{item.label}</h3>
                    <p className="text-[10px] text-[#a0b5a3] mt-0.5">{item.description}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-white/10" />
                </button>
              );
            })}
          </div>
        </section>

        {/* 5. Help Desk */}
        <section className="px-6 py-6">
          <div className="bg-[#059669] rounded-3xl p-6 flex items-center justify-between shadow-xl shadow-[#059669]/10">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md">
                <Phone className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Help Desk & Contact</h3>
                <p className="text-[10px] text-white/70">Immediate assistance available</p>
              </div>
            </div>
            <div className="text-2xl font-black text-white">505</div>
          </div>
        </section>

        {/* 6. Footer Signature - Glitched Technologies Branding */}
        <footer className="py-12 flex flex-col items-center gap-3">
          <div className="w-8 h-[1px] bg-[#059669]/30"></div>
          <p className="text-[10px] font-black text-[#a0b5a3]/40 uppercase tracking-[0.3em]">
            Built by <span className="text-[#059669]/60">Glitched Tech</span>
          </p>
        </footer>
      </main>

      {/* Modal - Polished */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-[#0d1f0f]/95 z-50 flex items-center justify-center p-6 backdrop-blur-sm" onClick={() => setSelectedEvent(null)}>
          <div className="bg-[#1a2e1c] rounded-[2rem] max-w-md w-full border border-white/5 overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <img src={selectedEvent.image} className="w-full h-56 object-cover" />
            <div className="p-8">
              <h3 className="text-xl font-bold text-white mb-4">{selectedEvent.title}</h3>
              <p className="text-sm text-[#a0b5a3] leading-relaxed">{selectedEvent.description}</p>
              <button 
                onClick={() => setSelectedEvent(null)}
                className="w-full mt-8 py-4 bg-[#059669] text-white text-xs font-bold rounded-2xl"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}