import React, { useState, useMemo } from 'react';
import { 
  Calendar, Search, Award, Users, 
  Sparkles, Sun, MessageSquare, AlertCircle
} from 'lucide-react';
import { academicTimelineEvents, TimelineEventItem } from '@/data/diaryAndTimeline';
import { Badge } from '@/app/components/ui/badge';

export function AcademicTimelineView() {
  const [filterType, setFilterType] = useState<'all' | 'upcoming' | 'today' | 'past'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Academic calendar reference date: October 8, 2026 (matching school year & current date)
  const TODAY_DATE = '2026-10-08';

  const getEventStatus = (dateStr: string): 'past' | 'today' | 'upcoming' => {
    if (dateStr === TODAY_DATE) return 'today';
    if (dateStr < TODAY_DATE) return 'past';
    return 'upcoming';
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'exam':
        return <Award size={14} className="text-[#fbbf24]" />;
      case 'vacation':
      case 'holiday':
        return <Sun size={14} className="text-amber-400" />;
      case 'meeting':
        return <Users size={14} className="text-cyan-400" />;
      case 'conference':
        return <MessageSquare size={14} className="text-emerald-400" />;
      default:
        return <Sparkles size={14} className="text-purple-400" />;
    }
  };

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'exam':
        return <Badge className="bg-[#fbbf24]/10 text-[#fbbf24] border border-[#fbbf24]/20 text-[8px] font-black uppercase">Exam</Badge>;
      case 'vacation':
        return <Badge className="bg-amber-500/10 text-amber-300 border border-amber-500/20 text-[8px] font-black uppercase">Vacation</Badge>;
      case 'holiday':
        return <Badge className="bg-rose-500/10 text-rose-300 border border-rose-500/20 text-[8px] font-black uppercase">Holiday</Badge>;
      case 'meeting':
        return <Badge className="bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 text-[8px] font-black uppercase">Meeting</Badge>;
      case 'conference':
        return <Badge className="bg-[#059669]/10 text-[#059669] border border-[#059669]/20 text-[8px] font-black uppercase">Conference</Badge>;
      default:
        return <Badge className="bg-purple-500/10 text-purple-300 border border-purple-500/20 text-[8px] font-black uppercase">Event</Badge>;
    }
  };

  const filteredEvents = useMemo(() => {
    return academicTimelineEvents.filter(event => {
      const status = getEventStatus(event.date);

      // Status Filter
      if (filterType === 'upcoming' && status !== 'upcoming') return false;
      if (filterType === 'today' && status !== 'today') return false;
      if (filterType === 'past' && status !== 'past') return false;

      // Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesDate = event.dayDisplay.toLowerCase().includes(query);
        const matchesEvents = event.events.some(e => e.toLowerCase().includes(query));
        const matchesCategory = event.category.toLowerCase().includes(query);
        if (!matchesDate && !matchesEvents && !matchesCategory) return false;
      }

      return true;
    });
  }, [filterType, searchQuery]);

  const counts = useMemo(() => {
    let upcoming = 0;
    let today = 0;
    let past = 0;
    academicTimelineEvents.forEach(e => {
      const s = getEventStatus(e.date);
      if (s === 'upcoming') upcoming++;
      else if (s === 'today') today++;
      else past++;
    });
    return { upcoming, today, past, total: academicTimelineEvents.length };
  }, []);

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
      {/* 1. Clean Header Banner */}
      <div className="bg-[#1a2e1c] rounded-2xl border border-white/5 p-4 sm:p-5 shadow-lg flex items-center justify-between gap-3">
        <div>
          <p className="text-[9px] font-black text-[#059669] uppercase tracking-[0.25em]">
            Academic Calendar 2026
          </p>
          <h2 className="text-base sm:text-lg font-black text-white uppercase tracking-tight mt-0.5">
            Campus Timeline
          </h2>
        </div>
        <div className="bg-[#0d1f0f] border border-white/5 px-3 py-1.5 rounded-xl text-right">
          <span className="text-[8px] font-black text-[#fbbf24] uppercase tracking-wider block">Today</span>
          <span className="text-[10px] font-bold text-white uppercase">8 Oct 2026</span>
        </div>
      </div>

      {/* 2. Unified Filter Strip & Search */}
      <div className="space-y-2.5">
        <div className="bg-[#1a2e1c] border border-white/5 p-1 rounded-2xl flex gap-1 shadow-md overflow-x-auto no-scrollbar">
          {[
            { id: 'all', label: `All (${counts.total})` },
            { id: 'today', label: `Today (${counts.today})` },
            { id: 'upcoming', label: `Upcoming (${counts.upcoming})` },
            { id: 'past', label: `Past (${counts.past})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterType(tab.id as any)}
              className={`flex-1 min-w-[70px] py-2 text-[9px] font-black uppercase tracking-wider rounded-xl transition-all whitespace-nowrap text-center ${
                filterType === tab.id 
                  ? 'bg-[#059669] text-white shadow-md' 
                  : 'text-[#a0b5a3] hover:text-[#e8f5e9]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Compact Search Input */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#059669]" />
          <input
            type="text"
            placeholder="Search events (e.g. Puja, Exam, Meeting)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#1a2e1c] border border-white/5 rounded-xl py-2.5 pl-9 pr-3.5 text-xs text-white placeholder:text-[#a0b5a3]/40 focus:outline-none focus:border-[#fbbf24] transition-all"
          />
        </div>
      </div>

      {/* 3. Streamlined Timeline Stream */}
      <div className="relative pl-5 sm:pl-6 space-y-3 before:absolute before:left-2 sm:before:left-2.5 before:top-2.5 before:bottom-2.5 before:w-0.5 before:bg-gradient-to-b before:from-[#059669] before:via-[#fbbf24] before:to-white/10">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((item) => {
            const status = getEventStatus(item.date);
            const isToday = status === 'today';
            const isUpcoming = status === 'upcoming';

            return (
              <div 
                key={item.id} 
                className="relative group animate-in fade-in slide-in-from-bottom-1 duration-200"
              >
                {/* Timeline Dot Node */}
                <div 
                  className={`absolute -left-5 sm:-left-6 top-3 -translate-x-1/2 w-3 h-3 rounded-full border-2 transition-all ${
                    isToday
                      ? 'bg-[#fbbf24] border-white ring-4 ring-[#fbbf24]/30 scale-125'
                      : isUpcoming
                      ? 'bg-[#059669] border-[#fbbf24]'
                      : 'bg-[#112613] border-white/20'
                  }`}
                />

                {/* Event Card */}
                <div 
                  className={`rounded-2xl border p-3.5 transition-all ${
                    isToday
                      ? 'bg-[#1a3a1d]/80 border-[#fbbf24]/50 shadow-lg ring-1 ring-[#fbbf24]/20'
                      : isUpcoming
                      ? 'bg-[#1a2e1c]/70 hover:bg-[#1a2e1c] border-white/5 hover:border-[#059669]/30'
                      : 'bg-[#142315]/40 border-white/5 opacity-75 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className={`text-xs font-black uppercase tracking-tight ${
                      isToday ? 'text-[#fbbf24]' : 'text-white'
                    }`}>
                      {item.dayDisplay}
                    </span>

                    <div className="flex items-center gap-1.5">
                      {isToday && (
                        <span className="bg-red-500 text-white text-[7px] font-black uppercase px-2 py-0.5 rounded-full animate-pulse">
                          TODAY
                        </span>
                      )}
                      {getCategoryBadge(item.category)}
                    </div>
                  </div>

                  {/* Event Titles */}
                  <div className="space-y-1">
                    {item.events.map((eventName, idx) => (
                      <div 
                        key={idx}
                        className="flex items-center gap-2 text-xs text-[#e8f5e9] font-bold"
                      >
                        <span className="shrink-0">{getCategoryIcon(item.category)}</span>
                        <span className={isToday ? 'text-[#fbbf24] font-black' : ''}>{eventName}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-10 bg-[#1a2e1c]/30 rounded-2xl border border-dashed border-white/10 p-4">
            <AlertCircle className="w-8 h-8 text-[#a0b5a3]/30 mx-auto mb-2" />
            <p className="text-xs font-bold uppercase tracking-wider text-[#a0b5a3]">
              No events found
            </p>
            <button
              onClick={() => { setFilterType('all'); setSearchQuery(''); }}
              className="mt-2 text-[9px] font-black text-[#059669] hover:text-[#fbbf24] uppercase tracking-widest transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
