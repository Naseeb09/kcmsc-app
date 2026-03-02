import { ChevronLeft, Building, Info, Search, Building2 } from 'lucide-react';
import { useState } from 'react';
import { Input } from '@/app/components/ui/input';
import { useAppContext } from '@/context/AppContext';

interface FloorMapsProps {
  onNavigate: (view: string) => void;
}

export function FloorMaps({ onNavigate }: FloorMapsProps) {
  const { floors } = useAppContext();
  const [selectedFloor, setSelectedFloor] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const FloorSection = ({ floor }: { floor: typeof floors[0] }) => {
    const isExpanded = selectedFloor === floor.id;
    
    return (
      <div
        className={`bg-[#1a3a1d] border rounded-2xl transition-all cursor-pointer ${
          isExpanded
            ? 'border-[#059669] bg-[#1e4620]'
            : 'border-[#059669]/20 hover:border-[#059669]/40'
        }`}
        onClick={() => onNavigate(`floor-detail-${floor.id}`)}
      >
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-[#0d1f0f]"
                style={{ backgroundColor: floor.color }}
              >
                {floor.label}
              </div>
              <div>
                <h3 className="text-sm font-medium text-[#e8f5e9]">{floor.name}</h3>
                <p className="text-[10px] text-[#a0b5a3]">{floor.purpose}</p>
              </div>
            </div>
            <div className="text-[#059669]">→</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="pb-20 bg-[#0d1f0f] min-h-screen">
      {/* Header */}
      <div className="bg-[#1a2e1c] px-6 py-4 border-b border-[#059669]/20">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={() => onNavigate('home')}
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#1a3a1d] text-[#059669]"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex-1">
              <h1 className="text-lg font-medium text-[#e8f5e9]">Floor Navigation</h1>
              <p className="text-[10px] text-[#a0b5a3] uppercase tracking-wide">BUILDING DIRECTORY</p>
            </div>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#1a3a1d] text-[#059669]">
              <Info className="w-5 h-5" />
            </button>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#059669]" />
            <Input
              type="text"
              placeholder="Search rooms or facilities"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-[#1a3a1d] border-[#059669]/30 text-[#e8f5e9] placeholder:text-[#a0b5a3]/60 rounded-xl focus:border-[#059669]"
            />
          </div>
        </div>
      </div>

      <div className="px-6 py-4 max-w-2xl mx-auto">
        {/* Building Overview */}
        <div className="bg-[#1a3a1d] border border-[#059669]/20 rounded-2xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#059669]/20 flex items-center justify-center flex-shrink-0">
              <Building2 className="w-5 h-5 text-[#059669]" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-[#e8f5e9] mb-1">Building Overview</h3>
              <p className="text-xs text-[#a0b5a3] leading-relaxed">
                Our school building spans from Basement to 7th Floor, designed to accommodate KG to College level students with dedicated facilities on each floor.
              </p>
            </div>
          </div>
        </div>

        {/* Floor Details Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-medium text-[#e8f5e9]">All Floors</h2>
            <p className="text-xs text-[#a0b5a3]">Tap to view details</p>
          </div>

          <div className="space-y-3">
            {floors.map((floor) => (
              <FloorSection key={floor.id} floor={floor} />
            ))}
          </div>
        </div>

        {/* Help Section */}
        <div className="bg-[#1a3a1d] border border-[#059669]/20 rounded-2xl p-4">
          <h3 className="text-sm font-medium text-[#e8f5e9] mb-2">Need Help Finding a Room?</h3>
          <p className="text-xs text-[#a0b5a3] leading-relaxed mb-3">
            Use the search feature to quickly find any classroom and see its exact location.
          </p>
          <button
            onClick={() => onNavigate('search')}
            className="text-xs text-[#059669] font-medium hover:text-[#047857]"
          >
            Go to Search →
          </button>
        </div>
      </div>
    </div>
  );
}