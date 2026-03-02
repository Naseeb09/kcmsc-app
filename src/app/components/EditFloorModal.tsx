import { useState } from 'react';
import { X, Save, Plus, Trash2 } from 'lucide-react';
import { Input } from '@/app/components/ui/input';
import { useAppContext } from '@/context/AppContext';

interface FloorData {
  id: string;
  label: string;
  name: string;
  color: string;
  totalRooms: number;
  lifts: string[];
  facilities: string[];
  classes: Array<{
    name: string;
    room: string;
    teacher: string;
  }>;
  purpose: string;
}

interface EditFloorModalProps {
  floor: FloorData;
  onClose: () => void;
}

export function EditFloorModal({ floor, onClose }: EditFloorModalProps) {
  const { updateFloor } = useAppContext();
  const [label, setLabel] = useState(floor.label);
  const [name, setName] = useState(floor.name);
  const [color, setColor] = useState(floor.color);
  const [purpose, setPurpose] = useState(floor.purpose);
  const [totalRooms, setTotalRooms] = useState(floor.totalRooms.toString());
  const [lifts, setLifts] = useState(floor.lifts);
  const [facilities, setFacilities] = useState(floor.facilities);
  const [classes, setClasses] = useState(floor.classes);
  
  const [newLift, setNewLift] = useState('');
  const [newFacility, setNewFacility] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    updateFloor(floor.id, {
      label,
      name,
      color,
      purpose,
      totalRooms: parseInt(totalRooms),
      lifts,
      facilities,
      classes
    });

    onClose();
  };

  const addLift = () => {
    if (newLift.trim()) {
      setLifts([...lifts, newLift.trim()]);
      setNewLift('');
    }
  };

  const removeLift = (index: number) => {
    setLifts(lifts.filter((_, i) => i !== index));
  };

  const addFacility = () => {
    if (newFacility.trim()) {
      setFacilities([...facilities, newFacility.trim()]);
      setNewFacility('');
    }
  };

  const removeFacility = (index: number) => {
    setFacilities(facilities.filter((_, i) => i !== index));
  };

  const addClass = () => {
    setClasses([...classes, { name: '', room: '', teacher: '' }]);
  };

  const removeClass = (index: number) => {
    setClasses(classes.filter((_, i) => i !== index));
  };

  const updateClass = (index: number, field: string, value: string) => {
    const newClasses = [...classes];
    newClasses[index] = { ...newClasses[index], [field]: value };
    setClasses(newClasses);
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-6 overflow-y-auto">
      <div className="bg-[#0d1f0f] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-[#059669]/30">
        <div className="sticky top-0 bg-[#1a2e1c] px-6 py-4 border-b border-[#059669]/20 flex items-center justify-between">
          <h2 className="text-lg font-medium text-[#e8f5e9]">Edit Floor</h2>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#1a3a1d] text-[#a0b5a3]">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#e8f5e9] mb-2">Floor Label *</label>
              <Input
                type="text"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                className="bg-[#1a3a1d] border-[#059669]/30 text-[#e8f5e9]"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#e8f5e9] mb-2">Floor Name *</label>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-[#1a3a1d] border-[#059669]/30 text-[#e8f5e9]"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#e8f5e9] mb-2">Color *</label>
              <Input
                type="text"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                placeholder="#059669"
                className="bg-[#1a3a1d] border-[#059669]/30 text-[#e8f5e9]"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#e8f5e9] mb-2">Total Rooms *</label>
              <Input
                type="number"
                value={totalRooms}
                onChange={(e) => setTotalRooms(e.target.value)}
                className="bg-[#1a3a1d] border-[#059669]/30 text-[#e8f5e9]"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#e8f5e9] mb-2">Purpose *</label>
            <Input
              type="text"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              className="bg-[#1a3a1d] border-[#059669]/30 text-[#e8f5e9]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#e8f5e9] mb-2">Lifts</label>
            <div className="flex gap-2 mb-2">
              <Input
                type="text"
                value={newLift}
                onChange={(e) => setNewLift(e.target.value)}
                placeholder="Add lift (e.g., Boys Lift)"
                className="bg-[#1a3a1d] border-[#059669]/30 text-[#e8f5e9]"
              />
              <button type="button" onClick={addLift} className="px-4 py-2 bg-[#059669] text-white rounded-lg">
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-1">
              {lifts.map((lift, index) => (
                <div key={index} className="flex items-center justify-between bg-[#1a3a1d] px-3 py-2 rounded-lg">
                  <span className="text-sm text-[#e8f5e9]">{lift}</span>
                  <button type="button" onClick={() => removeLift(index)} className="text-red-400">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#e8f5e9] mb-2">Facilities</label>
            <div className="flex gap-2 mb-2">
              <Input
                type="text"
                value={newFacility}
                onChange={(e) => setNewFacility(e.target.value)}
                placeholder="Add facility"
                className="bg-[#1a3a1d] border-[#059669]/30 text-[#e8f5e9]"
              />
              <button type="button" onClick={addFacility} className="px-4 py-2 bg-[#059669] text-white rounded-lg">
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-1">
              {facilities.map((facility, index) => (
                <div key={index} className="flex items-center justify-between bg-[#1a3a1d] px-3 py-2 rounded-lg">
                  <span className="text-sm text-[#e8f5e9]">{facility}</span>
                  <button type="button" onClick={() => removeFacility(index)} className="text-red-400">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-[#e8f5e9]">Classes</label>
              <button type="button" onClick={addClass} className="text-xs text-[#059669] flex items-center gap-1">
                <Plus className="w-3 h-3" /> Add Class
              </button>
            </div>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {classes.map((cls, index) => (
                <div key={index} className="bg-[#1a3a1d] p-3 rounded-lg space-y-2">
                  <div className="flex justify-between items-start gap-2">
                    <Input
                      type="text"
                      value={cls.name}
                      onChange={(e) => updateClass(index, 'name', e.target.value)}
                      placeholder="Class name"
                      className="bg-[#0d1f0f] border-[#059669]/30 text-[#e8f5e9] text-xs"
                    />
                    <button type="button" onClick={() => removeClass(index)} className="text-red-400 mt-2">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      type="text"
                      value={cls.room}
                      onChange={(e) => updateClass(index, 'room', e.target.value)}
                      placeholder="Room #"
                      className="bg-[#0d1f0f] border-[#059669]/30 text-[#e8f5e9] text-xs"
                    />
                    <Input
                      type="text"
                      value={cls.teacher}
                      onChange={(e) => updateClass(index, 'teacher', e.target.value)}
                      placeholder="Teacher"
                      className="bg-[#0d1f0f] border-[#059669]/30 text-[#e8f5e9] text-xs"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#059669] text-white rounded-xl py-3 px-4 text-sm font-medium hover:bg-[#047857] transition-colors flex items-center justify-center gap-2"
          >
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
