import { ChevronLeft, Building, Users, ArrowUpDown, DoorOpen } from 'lucide-react';
import { Card, CardContent } from '@/app/components/ui/card';
import { useAppContext } from '@/context/AppContext';

interface FloorDetailProps {
  onNavigate: (view: string) => void;
  floorId: string;
}

export function FloorDetail({ onNavigate, floorId }: FloorDetailProps) {
  const { floors } = useAppContext();
  const floor = floors.find(f => f.id === floorId);

  if (!floor) {
    return null;
  }

  return (
    <div className="pb-20 bg-[#0d1f0f] min-h-screen">
      {/* Header */}
      <div className="bg-[#1a2e1c] px-6 py-4 border-b border-[#059669]/20">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={() => onNavigate('floors')}
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#1a3a1d] text-[#059669]"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-[#0d1f0f]"
              style={{ backgroundColor: floor.color }}
            >
              {floor.label}
            </div>
            <div className="flex-1">
              <h1 className="text-lg font-medium text-[#e8f5e9]">{floor.name}</h1>
              <p className="text-[10px] text-[#a0b5a3] uppercase tracking-wide">FLOOR DETAILS</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-6 max-w-2xl mx-auto">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Card className="bg-[#1a3a1d] border border-[#059669]/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#059669]/20 flex items-center justify-center">
                  <DoorOpen className="w-5 h-5 text-[#fbbf24]" />
                </div>
                <div>
                  <p className="text-xs text-[#a0b5a3]">Total Rooms</p>
                  <p className="text-2xl font-bold text-[#e8f5e9]">{floor.totalRooms}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#1a3a1d] border border-[#059669]/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#059669]/20 flex items-center justify-center">
                  <ArrowUpDown className="w-5 h-5 text-[#fbbf24]" />
                </div>
                <div>
                  <p className="text-xs text-[#a0b5a3]">Lifts</p>
                  <p className="text-2xl font-bold text-[#e8f5e9]">{floor.lifts.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Lift Access */}
        <div className="mb-6">
          <h2 className="text-sm font-medium text-[#e8f5e9] mb-3">Lift Access</h2>
          <Card className="bg-[#1a3a1d] border border-[#059669]/20">
            <CardContent className="p-4">
              <div className="flex flex-wrap gap-2">
                {floor.lifts.map((lift, index) => (
                  <div key={index} className="px-3 py-1.5 bg-[#059669]/20 rounded-lg">
                    <span className="text-xs font-medium text-[#059669]">{lift}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Facilities (if any) */}
        {floor.facilities.length > 0 && (
          <div className="mb-6">
            <h2 className="text-sm font-medium text-[#e8f5e9] mb-3">Facilities on This Floor</h2>
            <div className="space-y-2">
              {floor.facilities.map((facility, index) => (
                <Card key={index} className="bg-[#1a3a1d] border border-[#059669]/20">
                  <CardContent className="p-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#059669]" />
                      <span className="text-sm text-[#e8f5e9]">{facility}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Classes/Rooms */}
        {floor.classes.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Users className="w-5 h-5 text-[#059669]" />
              <h2 className="text-sm font-medium text-[#e8f5e9]">Classrooms & Teachers</h2>
            </div>
            <div className="space-y-3">
              {floor.classes.map((classInfo, index) => (
                <Card key={index} className="bg-[#1a3a1d] border border-[#059669]/20">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-[#e8f5e9] mb-1">{classInfo.name}</h3>
                        <div className="flex items-center gap-2 text-xs text-[#a0b5a3]">
                          <Users className="w-3 h-3" />
                          <span>{classInfo.teacher}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 bg-[#047857] text-white px-2.5 py-1 rounded-lg text-xs font-medium">
                        <Building className="w-3 h-3" />
                        {classInfo.room}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}