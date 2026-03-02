import { ChevronLeft, Building, Edit, Trash2 } from 'lucide-react';
import { Card, CardContent } from '@/app/components/ui/card';
import { useAppContext } from '@/context/AppContext';
import { useState } from 'react';
import { EditFloorModal } from './EditFloorModal';

interface ManageFloorsProps {
  onNavigate: (view: string) => void;
}

export function ManageFloors({ onNavigate }: ManageFloorsProps) {
  const { floors, deleteFloor } = useAppContext();
  const [editingFloor, setEditingFloor] = useState<string | null>(null);

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete "${name}"?`)) {
      deleteFloor(id);
    }
  };

  const floor = editingFloor ? floors.find(f => f.id === editingFloor) : null;

  return (
    <div className="pb-20 bg-[#0d1f0f] min-h-screen">
      {/* Header */}
      <div className="bg-[#1a2e1c] px-6 py-4 border-b border-[#059669]/20">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('profile')}
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#1a3a1d] text-[#059669]"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex-1">
              <h1 className="text-lg font-medium text-[#e8f5e9]">Manage Floors</h1>
              <p className="text-[10px] text-[#a0b5a3] uppercase tracking-wide">EDIT OR DELETE FLOORS</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-[#059669]/20 flex items-center justify-center">
              <Building className="w-5 h-5 text-[#fbbf24]" />
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-6 max-w-2xl mx-auto">
        {floors.length === 0 ? (
          <div className="text-center py-12">
            <Building className="w-12 h-12 text-[#a0b5a3] mx-auto mb-3" />
            <p className="text-sm text-[#a0b5a3]">No floors created yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {floors.map((floor) => (
              <Card key={floor.id} className="bg-[#1a3a1d] border border-[#059669]/20">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-[#0d1f0f] flex-shrink-0"
                      style={{ backgroundColor: floor.color }}
                    >
                      {floor.label}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-[#e8f5e9] mb-1">{floor.name}</h3>
                      <p className="text-xs text-[#a0b5a3] mb-1">{floor.purpose}</p>
                      <div className="flex gap-2 text-xs text-[#a0b5a3]">
                        <span>Rooms: {floor.totalRooms}</span>
                        <span>•</span>
                        <span>Classes: {floor.classes.length}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 pt-3 border-t border-[#059669]/20">
                    <button
                      onClick={() => setEditingFloor(floor.id)}
                      className="flex-1 bg-[#059669]/10 border border-[#059669]/30 text-[#059669] rounded-lg py-2 px-4 text-xs font-medium hover:bg-[#059669]/20 transition-colors flex items-center justify-center gap-2"
                    >
                      <Edit className="w-3 h-3" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(floor.id, floor.name)}
                      className="flex-1 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg py-2 px-4 text-xs font-medium hover:bg-red-500/20 transition-colors flex items-center justify-center gap-2"
                    >
                      <Trash2 className="w-3 h-3" />
                      Delete
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {editingFloor && floor && (
        <EditFloorModal
          floor={floor}
          onClose={() => setEditingFloor(null)}
        />
      )}
    </div>
  );
}
