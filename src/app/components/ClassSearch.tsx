import { useState, useMemo } from 'react';
import { Search, MapPin, ChevronLeft, Building, Users, Info, X } from 'lucide-react';
import { Card, CardContent } from '@/app/components/ui/card';
import { useAppContext } from '@/context/AppContext';

interface ClassSearchProps {
  onNavigate: (view: string, data?: any) => void;
  initialQuery?: string;
}

export function ClassSearch({ onNavigate, initialQuery }: ClassSearchProps) {
  const { floors, classes: dbClasses } = useAppContext();
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  
  // Initialize with the query passed from HomeScreen if available
  const [searchQuery, setSearchQuery] = useState(initialQuery || '');

  // 1. Data Normalization for Levels
  const levels = [
    { id: 'kg', name: 'Kindergarten (KG)', labelMatch: 'G' },
    { id: 'primary', name: 'Primary (Class 1-5)', labelMatch: ['1', '2'] },
    { id: 'secondary', name: 'Secondary (Class 6-10)', labelMatch: ['3', '4', '5'] },
    { id: 'college', name: 'College (Class 11-12)', labelMatch: ['6', '7'] },
  ];

  // 2. Flatten all rooms for global search
  const allRooms = useMemo(() => {
    // Start with local data
    const roomsMap = new Map();

    floors.forEach(f => {
      f.classes.forEach(c => {
        roomsMap.set(c.room, {
          ...c,
          floorName: f.name,
          floorId: f.id,
          floorLabel: f.label,
          searchSlug: `${c.name} ${c.room} ${c.teacher} ${c.section} ${c.version} ${f.name}`.toLowerCase()
        });
      });
    });

    // Override with DB data
    dbClasses.forEach(c => {
      // Try to find the floor by floor_id or room prefix
      const floor = floors.find(f => f.id === c.floor_id) || 
                   floors.find(f => c.room.startsWith(f.label));
      
      roomsMap.set(c.room, {
        ...c,
        floorName: floor?.name || 'Unknown Floor',
        floorId: floor?.id || 'unknown',
        floorLabel: floor?.label || '?',
        searchSlug: `${c.name} ${c.room} ${c.teacher} ${c.section} ${c.version} ${floor?.name || ''}`.toLowerCase()
      });
    });

    return Array.from(roomsMap.values());
  }, [floors, dbClasses]);

  // 3. Search & Filter Logic
  const filteredResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    return allRooms.filter(room => {
      if (room.searchSlug.includes(query)) return true;
      if (!isNaN(Number(query)) && room.name.includes(query)) return true;
      return false;
    }).slice(0, 10);
  }, [searchQuery, allRooms]);

  const getLevelClasses = (levelId: string) => {
    const level = levels.find(l => l.id === levelId);
    if (!level) return [];
    
    return allRooms.filter(r => 
      Array.isArray(level.labelMatch) 
        ? level.labelMatch.includes(r.floorLabel) 
        : r.floorLabel === level.labelMatch
    );
  };

  return (
    <div className="pb-20 bg-[#0d1f0f] min-h-screen">
      {/* CLEAN STICKY HEADER */}
      <div className="bg-[#1a2e1c] px-6 pt-4 pb-2 border-b border-[#059669]/20 sticky top-0 z-20">
        <div className="max-w-2xl mx-auto space-y-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                if (searchQuery) setSearchQuery('');
                else if (selectedLevel) setSelectedLevel(null);
                else onNavigate('home');
              }}
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#0d1f0f] text-[#059669] border border-[#059669]/20"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="flex-1">
              <h1 className="text-[10px] font-black text-[#059669] uppercase tracking-[0.3em]">
                {searchQuery ? 'Search' : selectedLevel ? 'Room Directory' : 'Campus Navigator'}
              </h1>
              <h2 className="text-sm font-bold text-[#e8f5e9]">
                {selectedLevel ? levels.find(l => l.id === selectedLevel)?.name : 'KC Model School'}
              </h2>
            </div>
          </div>

          <div className="relative pb-2">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#059669]" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 'ten ev', '301', etc..."
              className="w-full bg-[#0d1f0f] border border-[#059669]/30 rounded-2xl py-4 pl-11 pr-4 text-sm text-white focus:outline-none focus:border-[#fbbf24]/50 transition-all shadow-2xl"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2">
                <X className="w-4 h-4 text-[#fbbf24]" />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="px-6 py-6 max-w-2xl mx-auto">
        {/* CASE 1: SEARCH RESULTS */}
        {searchQuery ? (
          <div className="space-y-6">
            {filteredResults.length > 0 ? (
              filteredResults.map((room, idx) => (
                <RoomCard key={idx} room={room} onNavigate={onNavigate} />
              ))
            ) : (
              <div className="text-center py-20 bg-[#1a3a1d]/20 rounded-[2rem] border border-dashed border-[#059669]/20">
                <Search className="w-10 h-10 text-[#059669]/40 mx-auto mb-4" />
                <p className="text-[#a0b5a3] text-sm">No matches found</p>
              </div>
            )}
          </div>
        ) : !selectedLevel ? (
          /* CASE 2: LEVEL SELECTION */
          <div className="space-y-4">
            <div className="mb-2">
              <h2 className="text-[10px] font-black text-[#059669] uppercase tracking-[0.4em] mb-1">Floor Levels</h2>
              <p className="text-xs text-[#a0b5a3]">Select a category to browse rooms</p>
            </div>

            {levels.map((level) => (
              <Card
                key={level.id}
                onClick={() => setSelectedLevel(level.id)}
                className="bg-gradient-to-r from-[#1a3a1d] to-[#0d1f0f] border border-white/5 hover:border-[#fbbf24]/30 cursor-pointer transition-all rounded-[1.5rem] group"
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-[#0d1f0f] flex items-center justify-center border border-[#059669]/20 group-hover:border-[#fbbf24]/40">
                      <Building className="w-7 h-7 text-[#fbbf24]" />
                    </div>
                    <div>
                      <h3 className="text-sm font-black text-[#e8f5e9] uppercase tracking-wider">{level.name}</h3>
                      <p className="text-[10px] text-[#059669] font-black uppercase tracking-widest">Explore Directory</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          /* CASE 3: LEVEL DIRECTORY */
          <div className="space-y-6 animate-in slide-in-from-bottom-5">
            {getLevelClasses(selectedLevel).map((room, index) => (
              <RoomCard key={index} room={room} onNavigate={onNavigate} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// SHARED PRO ROOM CARD
function RoomCard({ room, onNavigate }: { room: any, onNavigate: (v: string, d?: any) => void }) {
  return (
    <Card className="group bg-gradient-to-br from-[#1a2e1c] to-[#0d1f0f] border border-white/5 hover:border-[#fbbf24]/30 rounded-[2rem] overflow-hidden shadow-2xl transition-all duration-300">
      <CardContent className="p-0">
        <div className="p-5 flex justify-between items-start bg-gradient-to-b from-white/5 to-transparent">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 text-[9px] font-black text-[#fbbf24] bg-[#fbbf24]/10 border border-[#fbbf24]/20 px-2.5 py-1 rounded-full uppercase tracking-widest">
                <div className="w-1.5 h-1.5 rounded-full bg-[#fbbf24] animate-pulse" />
                Room {room.room}
              </span>
              {room.version && room.version !== 'N/A' && (
                <span className="text-[9px] font-black text-[#059669] bg-[#059669]/10 border border-[#059669]/20 px-2.5 py-1 rounded-full uppercase tracking-widest">
                  {room.version}
                </span>
              )}
            </div>
            <h3 className="text-xl font-black text-white tracking-tight group-hover:text-[#fbbf24] transition-colors">
              {room.name !== 'N/A' ? `Class ${room.name}` : room.section}
            </h3>
          </div>
          <div className="text-right">
            <div className="p-2 bg-[#0d1f0f] rounded-xl border border-white/5 inline-block">
               <MapPin className="w-4 h-4 text-[#059669]" />
            </div>
            <p className="mt-2 text-[10px] text-[#a0b5a3] font-bold uppercase italic tracking-tighter">
              {room.floorName}
            </p>
          </div>
        </div>

        <div className="px-5 py-4 grid grid-cols-2 gap-3 relative">
          <div className="absolute left-1/2 top-4 bottom-4 w-[1px] bg-white/5" />
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[#059669]">
              <Users className="w-3.5 h-3.5" />
              <span className="text-[9px] font-black uppercase tracking-[0.1em]">Teachers</span>
            </div>
            <p className="text-[13px] font-bold text-[#e8f5e9] leading-tight truncate">{room.teacher}</p>
          </div>
          <div className="space-y-1 pl-4">
            <div className="flex items-center gap-2 text-[#059669]">
              <Info className="w-3.5 h-3.5" />
              <span className="text-[9px] font-black uppercase tracking-[0.1em]">Section</span>
            </div>
            <p className="text-[13px] font-bold text-[#e8f5e9] leading-tight truncate">{room.section}</p>
          </div>
        </div>

        <div className="p-4 bg-white/[0.02] border-t border-white/5">
          <button
            onClick={() => onNavigate(`floor-detail-${room.floorId}`)}
            className="w-full bg-[#059669] text-[#0d1f0f] rounded-2xl py-3.5 text-[11px] font-black uppercase tracking-[0.2em] hover:bg-[#fbbf24] transition-all shadow-lg"
          >
            Locate Room
          </button>
        </div>
      </CardContent>
    </Card>
  );
}