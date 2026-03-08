import { School, MapPin, Users, Building2, BookOpen, Phone, Search, DollarSign, ChevronRight, Sparkles } from 'lucide-react';
import { Badge } from '@/app/components/ui/badge';
import { useState, useEffect, useRef } from 'react';
import { useAppContext } from '@/context/AppContext';

interface HomeScreenProps {
  onNavigate: (view: string, data?: any) => void; // Updated to accept data
}

export function HomeScreen({ onNavigate }: HomeScreenProps) {
  const { events } = useAppContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const displayEvents = events.length >= 6 ? events.slice(0, 6) : [...events, ...events].slice(0, 6);

  const menuItems = [
    { id: 'floors', label: 'Floor Navigation', icon: MapPin, description: 'Browse by levels' },
    { id: 'staff', label: 'Staff Directory', icon: Users, description: 'Meet our faculty' },
    { id: 'facilities', label: 'Facilities', icon: Building2, description: 'Campus amenities' },
    { id: 'about', label: 'About School', icon: BookOpen, description: 'History & Mission' },
    { id: 'fees', label: 'Fees & Costs', icon: DollarSign, description: 'Tuition details' },
  ];

  // Logic to handle search submission from Home
  const handleSearchSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (searchQuery.trim()) {
      // Navigates to search and passes the query state
      onNavigate('search', { initialQuery: searchQuery });
    } else {
      onNavigate('search');
    }
  };

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
    <div className="pb-20 bg-[#0d1f0f] min-h-screen font-sans selection:bg-[#fbbf24] selection:text-[#0d1f0f]">
      {/* 1. Header with Glow Effect */}
      <header className="relative bg-[#1a2e1c] px-6 py-8 border-b border-[#059669]/20 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#059669]/10 via-transparent to-transparent opacity-50" />
        
        <div className="max-w-2xl mx-auto flex items-center justify-between relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#0d1f0f] rounded-2xl flex items-center justify-center border border-[#059669]/30 shadow-lg">
              <School className="w-7 h-7 text-[#059669]" />
            </div>
            <div>
              <h1 className="text-[11px] font-black text-[#059669] uppercase tracking-[0.3em] mb-0.5">KC Model School & College</h1>
              <div className="flex items-center gap-1.5 mt-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-[#059669] animate-pulse" />
                <p className="text-[9px] text-[#a0b5a3] uppercase font-bold tracking-widest">Dhaka, Bangladesh</p>
              </div>
            </div>
          </div>
          <Badge className="bg-[#fbbf24] text-[#0d1f0f] border-0 px-3 py-1.5 rounded-xl text-[10px] font-black shadow-lg shadow-[#fbbf24]/10">EST. 2014</Badge>
        </div>
      </header>

      <main className="max-w-2xl mx-auto">
        {/* 2. Events Slider */}
        <section className="pt-10 pb-6 overflow-hidden">
          <div className="flex items-center justify-between mb-6 px-6">
            <h2 className="text-[10px] font-black text-white/90 uppercase tracking-[0.3em] flex items-center gap-2">
              <Sparkles className="w-3 h-3 text-[#fbbf24]" />
              Latest Events
            </h2>
            <button onClick={() => onNavigate('events')} className="text-[10px] text-[#059669] font-black uppercase tracking-widest hover:text-[#fbbf24] transition-colors">See All</button>
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
                  className={`snap-center shrink-0 w-[280px] aspect-[16/10] rounded-[2rem] overflow-hidden relative border transition-all duration-500 cursor-pointer ${
                    index === activeIndex ? 'border-[#059669] scale-100 shadow-2xl shadow-black/40' : 'border-white/5 scale-90 opacity-40 grayscale'
                  } bg-[#1a2e1c]`}
                >
                  <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d1f0f] via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-white text-xs font-black uppercase tracking-wider leading-tight line-clamp-1">{event.title}</h3>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center gap-2.5 mt-2">
              {displayEvents.map((_, i) => (
                <div 
                  key={i} 
                  className={`h-1 rounded-full transition-all duration-300 ${i === activeIndex ? 'w-8 bg-[#fbbf24]' : 'w-2 bg-white/10'}`} 
                />
              ))}
            </div>
          </div>
        </section>

        {/* 3. Search Bar - NOW FUNCTIONAL */}
        <section className="px-6 py-6"> 
          <form onSubmit={handleSearchSubmit} className="relative group">
            <div className="absolute left-5 top-1/2 -translate-y-1/2 flex items-center gap-2">
              <Search className="w-4 h-4 text-[#059669] group-focus-within:text-[#fbbf24] transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Search rooms, staff, or info..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit()}
              className="w-full bg-[#112613] border border-[#059669]/20 rounded-[1.5rem] pl-12 pr-5 py-5 text-sm text-[#e8f5e9] placeholder:text-[#a0b5a3]/20 focus:outline-none focus:border-[#fbbf24]/30 focus:bg-[#1a311c] transition-all shadow-2xl"
            />
            <button 
              type="button"
              onClick={handleSearchSubmit}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#059669] text-[#0d1f0f] px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#fbbf24] transition-all active:scale-95"
            >
              Search
            </button>
          </form>
        </section>

        {/* 4. Explore Section */}
        <section className="px-6 py-6">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <h2 className="text-xl font-black text-white tracking-tight">Explore Campus</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className="group bg-gradient-to-r from-[#1a2e1c] to-[#112613] border border-white/5 rounded-[1.5rem] p-5 flex items-center gap-5 active:scale-[0.98] transition-all hover:border-[#fbbf24]/20"
                >
                  <div className="w-14 h-14 rounded-2xl bg-[#0d1f0f] flex items-center justify-center border border-[#059669]/20 group-hover:border-[#fbbf24]/40 transition-all shadow-inner">
                    <Icon className="w-7 h-7 text-[#fbbf24]" />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="text-sm font-black text-[#e8f5e9] uppercase tracking-wide group-hover:text-[#fbbf24] transition-colors">{item.label}</h3>
                    <p className="text-[10px] text-[#a0b5a3] font-medium mt-0.5">{item.description}</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#fbbf24] transition-all">
                    <ChevronRight className="w-4 h-4 text-[#a0b5a3] group-hover:text-[#0d1f0f]" />
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* 5. Help Desk */}
        <section className="px-6 py-6">
          <div className="bg-gradient-to-br from-[#059669] to-[#047857] rounded-[2rem] p-7 flex items-center justify-between shadow-2xl shadow-[#059669]/20 border border-white/10">
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-xl border border-white/20">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-black text-white uppercase tracking-widest">Campus Hotline</h3>
                <p className="text-[10px] text-white/60 font-medium">Available during school hours</p>
              </div>
            </div>
            <div className="text-3xl font-black text-[#0d1f0f] bg-white/90 px-4 py-1 rounded-2xl">505</div>
          </div>
        </section>

        {/* 6. Footer Signature */}
        <footer className="py-12 flex flex-col items-center gap-3">
          <div className="w-12 h-[2px] bg-gradient-to-r from-transparent via-[#059669]/40 to-transparent"></div>
          <p className="text-[9px] font-black text-[#a0b5a3]/30 uppercase tracking-[0.5em]">
            System by <span className="text-[#059669]">Glitched Technologies</span>
          </p>
        </footer>
      </main>

      {/* Modal - Optimized for Pro look */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-[#0d1f0f]/98 z-50 flex items-center justify-center p-6 backdrop-blur-md" onClick={() => setSelectedEvent(null)}>
          <div className="bg-[#1a2e1c] rounded-[2.5rem] max-w-md w-full border border-white/10 overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="relative h-64">
              <img src={selectedEvent.image} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a2e1c] to-transparent" />
            </div>
            <div className="p-8">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-[#fbbf24] animate-ping" />
                <span className="text-[10px] font-black text-[#059669] uppercase tracking-widest">Active Event</span>
              </div>
              <h3 className="text-2xl font-black text-white mb-4 tracking-tight uppercase leading-tight">{selectedEvent.title}</h3>
              <p className="text-sm text-[#a0b5a3] leading-relaxed font-medium">{selectedEvent.description}</p>
              <button 
                onClick={() => setSelectedEvent(null)}
                className="w-full mt-8 py-5 bg-[#059669] text-[#0d1f0f] text-[11px] font-black uppercase tracking-[0.3em] rounded-2xl hover:bg-[#fbbf24] transition-all active:scale-95 shadow-lg shadow-[#059669]/10"
              >
                Return to Campus
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