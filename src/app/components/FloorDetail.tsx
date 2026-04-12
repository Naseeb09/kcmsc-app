import { useState, useMemo } from 'react';
import { ChevronLeft, Users, ArrowUpDown, DoorOpen, Phone, Layers, Search, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/app/components/ui/card';
import { useAppContext } from '@/context/AppContext';

interface FloorDetailProps {
  onNavigate: (view: string, data?: any) => void;
  floorId: string;
}

export function FloorDetail({ onNavigate, floorId }: FloorDetailProps) {
  const { floors, classes: dbClasses } = useAppContext();
  const [searchQuery, setSearchQuery] = useState('');
  const floor = floors.find(f => f.id === floorId);

  // Merge static and DB classes
  const allFloorClasses = useMemo(() => {
    if (!floor) return [];
    
    // Start with local classes
    const classesMap = new Map();
    floor.classes.forEach(c => classesMap.set(c.room, c));

    // Override or add from DB if they belong to this floor
    dbClasses.forEach(c => {
      if (c.floor_id === floorId || c.room.startsWith(floor.label)) {
        classesMap.set(c.room, c);
      }
    });

    // Sort by room number (ascending)
    return Array.from(classesMap.values()).sort((a, b) => a.room.localeCompare(b.room));
  }, [floor, dbClasses, floorId]);

  // OMNI-FILTER: Search Section, Teacher, Class Name, and Room No
  const filteredClasses = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return allFloorClasses.filter(c => 
      (c.name && c.name.toLowerCase().includes(query)) || 
      (c.room && c.room.toLowerCase().includes(query)) ||
      (c.teacher && c.teacher.toLowerCase().includes(query)) ||
      (c.section && c.section.toLowerCase().includes(query))
    );
  }, [allFloorClasses, searchQuery]);

  if (!floor) return null;

  return (
    <div className="pb-20 bg-[#0d1f0f] min-h-screen">
      <div className="bg-[#1a2e1c] px-6 pt-6 pb-4 border-b border-[#059669]/20 sticky top-0 z-20">
        <div className="max-w-2xl mx-auto space-y-4">
          <div className="flex items-center gap-3">
            <button onClick={() => onNavigate('floors')} className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#0d1f0f] text-[#059669] border border-[#059669]/20">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center font-black text-[#0d1f0f] text-lg" style={{ backgroundColor: floor.color }}>
              {floor.label}
            </div>
            <div className="flex-1">
              <h1 className="text-lg font-black text-[#e8f5e9] tracking-tight uppercase leading-tight">{floor.name}</h1>
              <p className="text-[10px] text-[#059669] font-black uppercase tracking-widest">{floor.purpose}</p>
            </div>
          </div>

          <div className="relative pb-2">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#059669]" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search section, teacher, or room..."
              className="w-full bg-[#0d1f0f] border border-[#059669]/30 rounded-2xl py-4 pl-11 pr-4 text-sm text-white focus:outline-none focus:border-[#fbbf24]/50 transition-all shadow-2xl"
            />
          </div>
        </div>
      </div>

      <div className="px-6 py-8 max-w-2xl mx-auto">
        <div className="space-y-6">
          {filteredClasses.map((classInfo, index) => (
            <Card key={index} className="group bg-gradient-to-br from-[#1a2e1c] to-[#0d1f0f] border border-white/5 hover:border-[#fbbf24]/30 rounded-[2rem] overflow-hidden transition-all duration-300">
              <CardContent className="p-0">
                <div className="p-6 bg-white/5">
                  <div className="flex justify-between items-start mb-3">
                    <div className="space-y-2.5">
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-black text-[#fbbf24] bg-[#fbbf24]/10 border border-[#fbbf24]/20 px-3 py-1 rounded-full uppercase tracking-widest">
                          Room {classInfo.room}
                        </span>
                        {classInfo.version && classInfo.version !== 'N/A' && (
                          <span className="text-[9px] font-black text-[#059669] bg-[#059669]/10 border border-[#059669]/20 px-3 py-1 rounded-full uppercase tracking-widest">
                            {classInfo.version}
                          </span>
                        )}
                      </div>
                      <h3 className="text-xl font-black text-white group-hover:text-[#fbbf24] transition-colors">
                        {classInfo.name !== 'N/A' ? `Class ${classInfo.name}` : classInfo.section}
                      </h3>
                    </div>
                    <div className="p-2.5 bg-[#0d1f0f] rounded-2xl border border-white/5">
                      <MapPin className="w-4 h-4 text-[#059669]" />
                    </div>
                  </div>
                </div>

                <div className="px-6 py-5 grid grid-cols-2 gap-4 border-t border-white/5 relative">
                  <div className="absolute left-1/2 top-5 bottom-5 w-[1px] bg-white/5" />
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-[#059669]">
                      <Users className="w-4 h-4" />
                      <span className="text-[9px] font-black uppercase tracking-widest">Teachers</span>
                    </div>
                    <p className="text-sm font-bold text-[#e8f5e9] truncate">{classInfo.teacher}</p>
                  </div>
                  <div className="space-y-1.5 pl-4">
                    <div className="flex items-center gap-2 text-[#059669]">
                      <Layers className="w-4 h-4" />
                      <span className="text-[9px] font-black uppercase tracking-widest">Section</span>
                    </div>
                    <p className="text-sm font-bold text-[#e8f5e9]">{classInfo.section}</p>
                  </div>
                </div>

                {classInfo.teacherNumber && classInfo.teacherNumber !== 'N/A' && (
                  <div className="p-4 bg-white/[0.02] border-t border-white/5">
                    <a href={`tel:${classInfo.teacherNumber}`} className="w-full flex items-center justify-center gap-2 bg-[#059669] text-[#0d1f0f] rounded-2xl py-4 text-[11px] font-black uppercase tracking-[0.2em] hover:bg-[#fbbf24] transition-all">
                      <Phone size={14} /> Call Representative
                    </a>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
