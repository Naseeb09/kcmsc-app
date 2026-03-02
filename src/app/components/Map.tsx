import { MapPin, ChevronLeft, ZoomIn, ZoomOut } from 'lucide-react';

interface MapProps {
  onNavigate: (view: string) => void;
}

export function Map({ onNavigate }: MapProps) {
  return (
    <div className="pb-20 bg-[#0d1f0f] min-h-screen">
      {/* Header */}
      <div className="bg-[#1a2e1c] px-6 py-4 border-b border-[#059669]/20">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('home')}
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#1a3a1d] text-[#059669]"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex-1">
              <h1 className="text-lg font-medium text-[#e8f5e9]">Campus Map</h1>
              <p className="text-[10px] text-[#a0b5a3] uppercase tracking-wide">INTERACTIVE VIEW</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-[#059669]/20 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-[#fbbf24]" />
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-6 max-w-2xl mx-auto">
        {/* Map Container */}
        <div className="bg-[#1a3a1d] border border-[#059669]/20 rounded-2xl overflow-hidden mb-6">
          <div className="relative aspect-[4/3]">
            {/* Static Map Image Placeholder */}
            <img 
              src="https://images.unsplash.com/photo-1520425785126-a1fe4bfaf006?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidWlsZGluZyUyMG1hcHxlbnwxfHx8fDE3NjkzMzIxODd8MA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Campus Map"
              className="w-full h-full object-cover"
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
            
            {/* Map Label */}
            <div className="absolute bottom-4 left-4 right-4">
              <div className="bg-black/70 backdrop-blur-sm rounded-xl p-3">
                <h3 className="text-sm font-medium text-white mb-1">KC Model School & College</h3>
                <p className="text-xs text-white/80">Dakshinkhan, Dhaka, Prembagan 1230</p>
              </div>
            </div>

            {/* Zoom Controls */}
            <div className="absolute top-4 right-4 flex flex-col gap-2">
              <button className="w-10 h-10 bg-black/50 backdrop-blur-sm rounded-lg flex items-center justify-center text-white hover:bg-black/70 transition-colors">
                <ZoomIn className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 bg-black/50 backdrop-blur-sm rounded-lg flex items-center justify-center text-white hover:bg-black/70 transition-colors">
                <ZoomOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Location Information */}
        <div className="bg-[#1a3a1d] border border-[#059669]/20 rounded-2xl p-4 mb-4">
          <h3 className="text-sm font-medium text-[#e8f5e9] mb-3">Location Details</h3>
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#059669] mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs text-[#a0b5a3]">Address</p>
                <p className="text-sm text-[#e8f5e9]">Dakshinkhan, Dhaka, Prembagan 1230, Bangladesh</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <button 
            onClick={() => onNavigate('floors')}
            className="bg-[#1a3a1d] border border-[#059669]/20 rounded-xl p-4 hover:border-[#059669]/40 transition-all"
          >
            <div className="text-center">
              <div className="w-10 h-10 bg-[#059669]/20 rounded-xl flex items-center justify-center mx-auto mb-2">
                <span className="text-lg">🏢</span>
              </div>
              <p className="text-xs font-medium text-[#e8f5e9]">Floor Navigation</p>
            </div>
          </button>

          <button 
            onClick={() => onNavigate('contact')}
            className="bg-[#1a3a1d] border border-[#059669]/20 rounded-xl p-4 hover:border-[#059669]/40 transition-all"
          >
            <div className="text-center">
              <div className="w-10 h-10 bg-[#059669]/20 rounded-xl flex items-center justify-center mx-auto mb-2">
                <span className="text-lg">📞</span>
              </div>
              <p className="text-xs font-medium text-[#e8f5e9]">Get Directions</p>
            </div>
          </button>
        </div>

        {/* Note */}
        <div className="mt-4 bg-[#fbbf24]/10 border border-[#fbbf24]/30 rounded-2xl p-4">
          <p className="text-xs text-[#a0b5a3] leading-relaxed">
            <span className="text-[#fbbf24] font-medium">Note:</span> For detailed floor-by-floor navigation, please use the Floor Navigation feature from the home screen.
          </p>
        </div>
      </div>
    </div>
  );
}
