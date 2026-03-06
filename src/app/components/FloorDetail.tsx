import { ChevronLeft, Building, Users, ArrowUpDown, DoorOpen, Phone, Layers, Info } from 'lucide-react';
import { Card, CardContent } from '@/app/components/ui/card';
import { useAppContext } from '@/context/AppContext';

interface FloorDetailProps {
  onNavigate: (view: string) => void;
  floorId: string;
}

export function FloorDetail({ onNavigate, floorId }: FloorDetailProps) {
  const { floors } = useAppContext();
  const floor = floors.find(f => f.id === floorId);

  if (!floor) return null;

  return (
    <div className="pb-20 bg-[#0d1f0f] min-h-screen">
      {/* Header */}
      <div className="bg-[#1a2e1c] px-6 py-4 border-b border-[#059669]/20 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('floors')}
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#1a3a1d] text-[#059669] hover:bg-[#059669]/10 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-[#0d1f0f]"
              style={{ backgroundColor: floor.color || '#059669' }}
            >
              {floor.label}
            </div>
            <div className="flex-1">
              <h1 className="text-lg font-medium text-[#e8f5e9]">{floor.name}</h1>
              <p className="text-[10px] text-[#059669] font-bold uppercase tracking-wider">{floor.purpose}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-6 max-w-2xl mx-auto">
        {/* Floor Quick Stats */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Card className="bg-[#1a3a1d] border border-[#059669]/20">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#059669]/20 flex items-center justify-center">
                <DoorOpen className="w-5 h-5 text-[#fbbf24]" />
              </div>
              <div>
                <p className="text-[10px] text-[#a0b5a3] uppercase">Rooms</p>
                <p className="text-xl font-bold text-[#e8f5e9]">{floor.totalRooms}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-[#1a3a1d] border border-[#059669]/20">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#059669]/20 flex items-center justify-center">
                <ArrowUpDown className="w-5 h-5 text-[#fbbf24]" />
              </div>
              <div>
                <p className="text-[10px] text-[#a0b5a3] uppercase">Lifts</p>
                <p className="text-xl font-bold text-[#e8f5e9]">{floor.lifts.length}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Classroom List */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Building className="w-4 h-4 text-[#fbbf24]" />
            <h2 className="text-xs font-bold text-[#a0b5a3] uppercase tracking-widest">Room Directory</h2>
          </div>
          
          {floor.classes.map((classInfo, index) => (
            <Card key={index} className="bg-[#1a3a1d] border border-[#059669]/20 overflow-hidden">
              <CardContent className="p-0">
                {/* Room Header */}
                <div className="bg-[#059669]/10 p-3 flex justify-between items-center border-b border-[#059669]/10">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-black text-[#059669]">{classInfo.room}</span>
                    <div className="h-4 w-[1px] bg-[#059669]/30" />
                    <span className="text-sm font-bold text-white uppercase tracking-tight">
                       {classInfo.name !== 'N/A' ? `Class ${classInfo.name}` : classInfo.section}
                    </span>
                  </div>
                  {classInfo.version !== 'N/A' && (
                    <span className="text-[9px] font-bold bg-[#fbbf24] text-[#0d1f0f] px-2 py-0.5 rounded uppercase">
                      {classInfo.version}
                    </span>
                  )}
                </div>

                {/* Info Grid */}
                <div className="p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 text-[#a0b5a3]">
                      <Layers className="w-3.5 h-3.5" />
                      <span className="text-xs">Section</span>
                    </div>
                    <span className="text-xs font-medium text-[#e8f5e9]">{classInfo.section}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 text-[#a0b5a3]">
                      <Users className="w-3.5 h-3.5" />
                      <span className="text-xs">Form Teacher</span>
                    </div>
                    <span className="text-xs font-medium text-[#e8f5e9]">{classInfo.teacher}</span>
                  </div>

                  {classInfo.teacherNumber !== 'N/A' && (
                    <div className="flex justify-between items-center pt-2 border-t border-[#059669]/10">
                      <div className="flex items-center gap-2 text-[#a0b5a3]">
                        <Phone className="w-3.5 h-3.5" />
                        <span className="text-xs">Contact</span>
                      </div>
                      <span className="text-xs font-bold text-[#fbbf24]">{classInfo.teacherNumber}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}