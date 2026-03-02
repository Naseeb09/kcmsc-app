import { ChevronLeft, BookOpen, FlaskConical, MonitorCheck, Trophy, Presentation, MapPin, Clock, Users as UsersIcon, ArrowUpDown } from 'lucide-react';
import { Card, CardContent } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { useAppContext } from '@/context/AppContext';

interface FacilitiesProps {
  onNavigate: (view: string) => void;
}

const iconMap: Record<string, any> = {
  BookOpen,
  FlaskConical,
  MonitorCheck,
  Trophy,
  Presentation
};

export function Facilities({ onNavigate }: FacilitiesProps) {
  const { facilities } = useAppContext();

  const lifts = [
    { id: 1, name: 'Boys Lift', icon: '👦', description: 'For male students' },
    { id: 2, name: 'Girls Lift', icon: '👧', description: 'For female students' },
    { id: 3, name: 'Teachers Lift', icon: '👨‍🏫', description: 'For faculty & staff' }
  ];

  const getIcon = (iconName: string) => {
    const IconComponent = iconMap[iconName];
    return IconComponent || MapPin;
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
              <h1 className="text-lg font-medium text-[#e8f5e9]">Facilities</h1>
              <p className="text-[10px] text-[#a0b5a3] uppercase tracking-wide">CAMPUS AMENITIES</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-[#059669]/20 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-[#fbbf24]" />
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-6 max-w-2xl mx-auto">
        {/* Lift System Section */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <ArrowUpDown className="w-5 h-5 text-[#059669]" />
            <h2 className="text-sm font-medium text-[#e8f5e9]">Lift System</h2>
          </div>
          <p className="text-xs text-[#a0b5a3] mb-4 leading-relaxed">
            Our building features 3 separate lifts for convenient access to all floors.
          </p>
          
          <div className="grid grid-cols-3 gap-3">
            {lifts.map((lift) => (
              <Card key={lift.id} className="bg-[#1a3a1d] border border-[#059669]/20">
                <CardContent className="p-3">
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-[#059669]/20 flex items-center justify-center text-2xl">
                      {lift.icon}
                    </div>
                    <h3 className="text-xs font-medium text-[#e8f5e9] mb-1">{lift.name}</h3>
                    <p className="text-[10px] text-[#a0b5a3] leading-tight">{lift.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Main Facilities */}
        <div>
          <h2 className="text-sm font-medium text-[#e8f5e9] mb-4">Campus Facilities</h2>
          
          <div className="space-y-3">
            {facilities.map((facility) => {
              const IconComponent = getIcon(facility.icon);
              
              return (
                <Card key={facility.id} className="bg-[#1a3a1d] border border-[#059669]/20">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#059669]/20 flex items-center justify-center flex-shrink-0">
                        <IconComponent className="w-5 h-5 text-[#fbbf24]" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-[#e8f5e9] mb-1">{facility.name}</h3>
                        <p className="text-xs text-[#a0b5a3] mb-2 leading-relaxed">{facility.description}</p>
                        <div className="flex flex-wrap gap-2">
                          <Badge className="bg-[#059669]/20 text-[#059669] px-2 py-0.5 text-[10px] border-0">
                            <MapPin className="w-3 h-3 mr-1 inline" />
                            {facility.floor}
                          </Badge>
                          <Badge className="bg-[#059669]/20 text-[#059669] px-2 py-0.5 text-[10px] border-0">
                            <UsersIcon className="w-3 h-3 mr-1 inline" />
                            {facility.capacity}
                          </Badge>
                          <Badge className="bg-[#059669]/20 text-[#059669] px-2 py-0.5 text-[10px] border-0">
                            <Clock className="w-3 h-3 mr-1 inline" />
                            {facility.timings}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 bg-[#1a3a1d] border border-[#059669]/20 rounded-2xl p-4">
          <h3 className="text-sm font-medium text-[#e8f5e9] mb-2">Quality Standards</h3>
          <p className="text-xs text-[#a0b5a3] leading-relaxed">
            All our facilities are maintained to the highest standards, ensuring a safe, comfortable, and conducive learning environment for students from KG to College level.
          </p>
        </div>

        {/* Visit Information */}
        <div className="mt-4 bg-gradient-to-br from-[#047857] to-[#059669] rounded-2xl p-4">
          <h3 className="text-sm font-medium text-white mb-2">Schedule a Campus Tour</h3>
          <p className="text-xs text-white/80 mb-3 leading-relaxed">
            Experience our facilities firsthand. Contact us to arrange a guided tour.
          </p>
          <button 
            onClick={() => onNavigate('contact')}
            className="w-full bg-white text-[#059669] rounded-xl py-2.5 px-4 text-xs font-medium hover:bg-white/90 transition-colors"
          >
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
}
