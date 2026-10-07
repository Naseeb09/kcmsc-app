import React, { useState, useMemo } from 'react';
import { 
  Calendar, Search, Clock, Award, Users, 
  Sparkles, Sun, MessageSquare, AlertCircle, CheckCircle2,
  ChevronRight, BookmarkCheck, ArrowUpRight
} from 'lucide-react';
import { academicTimelineEvents, TimelineEventItem } from '@/data/diaryAndTimeline';
import { Badge } from '@/app/components/ui/badge';

export function AcademicTimelineView() {
  const [filterType, setFilterType] = useState<'all' | 'upcoming' | 'today' | 'past'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
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
        return <Award size={15} className="text-[#fbbf24]" />;
      case 'vacation':
      case 'holiday':
        return <Sun size={15} className="text-amber-400" />;
      case 'meeting':
        return <Users size={15} className="text-cyan-400" />;
      case 'conference':
        return <MessageSquare size={15} className="text-emerald-400" />;
      default:
        return <Sparkles size={15} className="text-purple-400" />;
    }
  };

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'exam':
        return <Badge className="bg-[#fbbf24]/10 text-[#fbbf24] border border-[#fbbf24]/30 text-[8px] font-black uppercase">Exam / Assessment</Badge>;
      case 'vacation':
        return <Badge className="bg-amber-500/10 text-amber-300 border border-amber-500/30 text-[8px] font-black uppercase">Vacation</Badge>;
      case 'holiday':
        return <Badge className="bg-rose-500/10 text-rose-300 border border-rose-500/30 text-[8px] font-black uppercase">Religious Holiday</Badge>;
      case 'meeting':
        return <Badge className="bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 text-[8px] font-black uppercase">Parents Meeting</Badge>;
      case 'conference':
        return <Badge className="bg-[#059669]/10 text-[#059669] border border-[#059669]/30 text-[8px] font-black uppercase">Staff Conference</Badge>;
      default:
        return <Badge className="bg-purple-500/10 text-purple-300 border border-purple-500/30 text-[8px] font-black uppercase">School Event</Badge>;
    }
  };

  const filteredEvents = useMemo(() => {
    return academicTimelineEvents.filter(event => {
      const status = getEventStatus(event.date);

      // Status Filter
      if (filterType === 'upcoming' && status !== 'upcoming') return false;
      if (filterType === 'today' && status !== 'today') return false;
      if (filterType === 'past' && status !== 'past') return false;

      // Category Filter
      if (selectedCategory !== 'all' && event.category !== selectedCategory) return false;

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
  }, [filterType, selectedCategory, searchQuery]);

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
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      {/* Header Banner */}
      <div className="bg-[#1a2e1c] rounded-[2rem] border border-white/5 p-6 shadow-2xl relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#059669] animate-pulse" />
            <p className="text-[10px] font-black text-[#059669] uppercase tracking-[0.3em]">
              Academic Calendar & Routine
            </p>
          </div>
          <h2 className="text-xl font-black text-white uppercase tracking-tight">
            Campus Timeline
          </h2>
          <p className="text-xs text-[#a0b5a3] font-medium mt-1">
            Schedule of upcoming exams, parent conferences, vacations & past milestones.
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-2.5 mt-5">
            <button
              onClick={() => { setFilterType('today'); setSelectedCategory('all'); }}
              className={`p-3 rounded-2xl border text-center transition-all ${
                filterType === 'today'
                  ? 'bg-[#059669] text-white border-[#059669] shadow-lg shadow-[#059669]/20'
                  : 'bg-[#112613] text-[#a0b5a3] border-white/5 hover:border-[#059669]/30'
              }`}
            >
              <p className="text-xl font-black text-[#fbbf24]">{counts.today}</p>
              <p className="text-[8px] font-black uppercase tracking-wider text-white mt-0.5">Today</p>
            </button>
            <button
              onClick={() => { setFilterType('upcoming'); setSelectedCategory('all'); }}
              className={`p-3 rounded-2xl border text-center transition-all ${
                filterType === 'upcoming'
                  ? 'bg-[#059669] text-white border-[#059669] shadow-lg shadow-[#059669]/20'
                  : 'bg-[#112613] text-[#a0b5a3] border-white/5 hover:border-[#059669]/30'
              }`}
            >
              <p className="text-xl font-black text-white">{counts.upcoming}</p>
              <p className="text-[8px] font-black uppercase tracking-wider text-[#a0b5a3] mt-0.5">Upcoming</p>
            </button>
            <button
              onClick={() => { setFilterType('past'); setSelectedCategory('all'); }}
              className={`p-3 rounded-2xl border text-center transition-all ${
                filterType === 'past'
                  ? 'bg-[#059669] text-white border-[#059669] shadow-lg shadow-[#059669]/20'
                  : 'bg-[#112613] text-[#a0b5a3] border-white/5 hover:border-[#059669]/30'
              }`}
            >
              <p className="text-xl font-black text-[#a0b5a3]">{counts.past}</p>
              <p className="text-[8px] font-black uppercase tracking-wider text-[#a0b5a3] mt-0.5">Past</p>
            </button>
          </div>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="space-y-3">
        {/* Status Filter Tabs */}
        <div className="bg-[#1a2e1c] border border-white/5 p-1 rounded-2xl flex gap-1 shadow-lg">
          {(['all', 'upcoming', 'today', 'past'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`flex-1 py-2.5 text-[9px] font-black uppercase tracking-wider rounded-xl transition-all ${
                filterType === type 
                  ? 'bg-[#059669] text-white shadow' 
                  : 'text-[#a0b5a3] hover:text-[#e8f5e9]'
              }`}
            >
              {type === 'all' ? 'All (28)' : type === 'upcoming' ? 'Tomorrow & Next' : type === 'today' ? 'Today' : 'Past Events'}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#059669]" />
          <input
            type="text"
            placeholder="Search events (e.g. Puja, Exam, Meeting)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#1a2e1c] border border-white/5 rounded-2xl py-3.5 pl-11 pr-4 text-xs text-white placeholder:text-[#a0b5a3]/40 focus:outline-none focus:border-[#fbbf24] transition-all shadow-inner"
          />
        </div>
      </div>

      {/* Timeline Stream */}
      <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 sm:before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-gradient-to-b before:from-[#059669] before:via-[#fbbf24] before:to-white/10">
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
                {/* Timeline Node Dot */}
                <div 
                  className={`absolute -left-6 sm:-left-8 top-4 -translate-x-1/2 w-4 h-4 rounded-full border-2 transition-all ${
                    isToday
                      ? 'bg-[#fbbf24] border-white ring-4 ring-[#fbbf24]/30 scale-125'
                      : isUpcoming
                      ? 'bg-[#059669] border-[#fbbf24] ring-2 ring-[#059669]/20'
                      : 'bg-[#112613] border-white/20'
                  }`}
                />

                {/* Event Card */}
                <div 
                  className={`rounded-2xl border p-4 sm:p-5 transition-all ${
                    isToday
                      ? 'bg-gradient-to-r from-[#1a3a1d] to-[#1a2e1c] border-[#fbbf24]/50 shadow-xl shadow-[#fbbf24]/10 ring-1 ring-[#fbbf24]/20'
                      : isUpcoming
                      ? 'bg-[#1a2e1c]/80 hover:bg-[#1a2e1c] border-white/10 hover:border-[#059669]/40 shadow-lg'
                      : 'bg-[#142315]/50 border-white/5 opacity-80 hover:opacity-100'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                    {/* Date Pill */}
                    <div className="flex items-center gap-2">
                      <span className={`text-xs sm:text-sm font-black uppercase tracking-tight ${
                        isToday ? 'text-[#fbbf24]' : 'text-white'
                      }`}>
                        {item.dayDisplay}
                      </span>
                    </div>

                    {/* Status & Category */}
                    <div className="flex items-center gap-1.5">
                      {isToday && (
                        <span className="bg-red-500 text-white text-[8px] font-black uppercase px-2 py-0.5 rounded-full animate-pulse shadow">
                          TODAY
                        </span>
                      )}
                      {isUpcoming && (
                        <span className="bg-[#fbbf24]/20 text-[#fbbf24] border border-[#fbbf24]/30 text-[8px] font-black uppercase px-2 py-0.5 rounded-full">
                          Upcoming
                        </span>
                      )}
                      {status === 'past' && (
                        <span className="bg-white/5 text-[#a0b5a3] text-[8px] font-black uppercase px-2 py-0.5 rounded-full">
                          Completed
                        </span>
                      )}
                      {getCategoryBadge(item.category)}
                    </div>
                  </div>

                  {/* Event Titles */}
                  <div className="space-y-1.5 mt-2">
                    {item.events.map((eventName, idx) => (
                      <div 
                        key={idx}
                        className={`flex items-start gap-2.5 p-2 rounded-xl border ${
                          isToday
                            ? 'bg-[#0d1f0f]/80 border-[#fbbf24]/20'
                            : 'bg-[#0d1f0f]/40 border-white/5'
                        }`}
                      >
                        <div className="mt-0.5 shrink-0">
                          {getCategoryIcon(item.category)}
                        </div>
                        <p className={`text-xs sm:text-sm font-black uppercase tracking-tight leading-snug ${
                          isToday ? 'text-[#fbbf24]' : 'text-[#e8f5e9]'
                        }`}>
                          {eventName}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-16 bg-[#1a2e1c]/40 rounded-3xl border border-dashed border-white/10 p-6">
            <AlertCircle className="w-10 h-10 text-[#a0b5a3]/30 mx-auto mb-3" />
            <p className="text-xs font-black uppercase tracking-widest text-[#a0b5a3]">
              No events found
            </p>
            <p className="text-[10px] text-[#a0b5a3]/50 mt-1">
              Try adjusting your filter or search query
            </p>
            <button
              onClick={() => { setFilterType('all'); setSearchQuery(''); setSelectedCategory('all'); }}
              className="mt-4 text-[9px] font-black text-[#059669] hover:text-[#fbbf24] uppercase tracking-widest transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
