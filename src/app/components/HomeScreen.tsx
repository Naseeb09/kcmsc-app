import { School, MapPin, Users, Building2, BookOpen, Phone, Search, DollarSign, X } from 'lucide-react';
import { Badge } from '@/app/components/ui/badge';
import { schoolInfo } from '@/data/mockData';
import Slider from 'react-slick';
import { useState } from 'react';
import { useAppContext } from '@/context/AppContext';

interface HomeScreenProps {
  onNavigate: (view: string) => void;
}

interface EventDetail {
  title: string;
  description: string;
  image: string;
}

export function HomeScreen({ onNavigate }: HomeScreenProps) {
  const { events } = useAppContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<EventDetail | null>(null);

  const menuItems = [
    { id: 'floors', label: 'Floor Navigation', icon: MapPin, description: 'Browse by levels' },
    { id: 'staff', label: 'Staff Directory', icon: Users, description: 'Meet our faculty' },
    { id: 'facilities', label: 'Facilities', icon: Building2, description: 'Campus amenities' },
    { id: 'about', label: 'About School', icon: BookOpen, description: 'History & Mission' },
    { id: 'fees', label: 'Fees & Costs', icon: DollarSign, description: 'Tuition details' },
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2.2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    responsive: [
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2.2,
        }
      }
    ]
  };

  return (
    <div className="pb-24 bg-[#0d1f0f] min-h-screen">
      {/* 1. Header */}
      <div className="bg-[#1a2e1c] px-6 py-4 border-b border-[#059669]/20">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#059669]/20 rounded-full flex items-center justify-center border border-[#059669]/30">
              <School className="w-5 h-5 text-[#059669]" />
            </div>
            <div>
              <h1 className="text-sm font-medium text-[#e8f5e9]">KC MODEL SCHOOL &</h1>
              <h1 className="text-sm font-medium text-[#e8f5e9]">COLLEGE</h1>
              <p className="text-[10px] text-[#a0b5a3] uppercase tracking-wide">Dhaka, Bangladesh</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-[#fbbf24] text-[#0d1f0f] text-xs px-2 py-1 border-0 font-bold">EST. 2014</Badge>
          </div>
        </div>
      </div>

      {/* 2. Events Section - Targeted pb-2 for tight dot alignment */}
      <div className="px-6 pt-4 pb-2"> 
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs text-[#a0b5a3] font-medium">Events</p>
            <button className="text-xs text-[#059669] font-medium">See All</button>
          </div>
          
          <div className="carousel-container -mx-2">
            <Slider {...sliderSettings}>
              {events.map((event, index) => (
                <div key={index} className="px-2">
                  <div 
                    onClick={() => setSelectedEvent(event)}
                    className="relative h-32 rounded-2xl overflow-hidden bg-[#1a3a1d] cursor-pointer"
                  >
                    <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 pr-2">
                      <p className="text-white text-[10px] font-semibold leading-tight">{event.title}</p>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>

      {/* 3. Search Bar - pt-4 now works perfectly with relative dots */}
      <div className="px-6 pt-4 pb-4"> 
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#059669]" />
            <input
              type="text"
              placeholder="Search for rooms, staff, or info..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => onNavigate('search')}
              className="w-full bg-[#112613] border border-[#059669]/30 rounded-2xl pl-11 pr-4 py-4 text-sm text-[#e8f5e9] placeholder:text-[#a0b5a3]/30 focus:outline-none focus:border-[#059669] transition-all"
            />
          </div>
        </div>
      </div>

      {/* 4. Explore Section */}
      <div className="px-6 py-4">
        <div className="max-w-2xl mx-auto">
          <div className="mb-4">
            <h2 className="text-lg font-bold text-[#e8f5e9]">Explore Our School</h2>
            <p className="text-xs text-[#a0b5a3]">Everything you need to navigate our campus</p>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className="bg-[#1a3a1d] border border-[#059669]/10 rounded-2xl p-4 flex items-center gap-4 active:scale-[0.98] transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#0d1f0f] flex items-center justify-center border border-[#059669]/20">
                    <Icon className="w-6 h-6 text-[#fbbf24]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-[#e8f5e9]">{item.label}</h3>
                    <p className="text-[10px] text-[#a0b5a3]">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 5. Help Desk Section */}
      <div className="px-6 py-3">
        <div className="max-w-2xl mx-auto">
          <div className="bg-[#047857] rounded-2xl p-4 flex items-center justify-between shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <Phone className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Help Desk & Contact</h3>
                <p className="text-[10px] text-white/80">Reach us via Phone, Email or In-person</p>
              </div>
            </div>
            <div className="text-xl font-black text-white">505</div>
          </div>
        </div>
      </div>

      {/* 6. Quick Stats */}
      <div className="px-6 py-3">
        <div className="max-w-2xl mx-auto">
          <div className="bg-[#1a3a1d] border border-[#059669]/20 rounded-2xl p-5 shadow-md">
            <h3 className="text-sm font-bold text-[#e8f5e9] mb-4">Quick Facts</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-black text-[#059669]">{schoolInfo.totalStudents}</div>
                <div className="text-[10px] font-bold text-[#a0b5a3] uppercase tracking-tighter">Students</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-black text-[#059669]">{schoolInfo.studentTeacherRatio}</div>
                <div className="text-[10px] font-bold text-[#a0b5a3] uppercase tracking-tighter">Ratio</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-black text-[#059669]">7</div>
                <div className="text-[10px] font-bold text-[#a0b5a3] uppercase tracking-tighter">Floors</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 7. Accreditation Badge */}
      <div className="px-6 py-3 pb-12">
        <div className="max-w-2xl mx-auto">
          <div className="bg-[#1a3a1d] border border-[#059669]/20 rounded-2xl p-4 flex items-center gap-3">
            <Badge className="bg-[#059669]/20 text-[#059669] px-3 py-1 border-0 font-bold">Accredited</Badge>
            <p className="text-[10px] text-[#a0b5a3] flex-1 leading-tight">{schoolInfo.accreditation}</p>
          </div>
        </div>
      </div>

      {/* Modal logic */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-6 backdrop-blur-sm" onClick={() => setSelectedEvent(null)}>
          <div className="bg-[#1a2e1c] rounded-3xl max-w-md w-full border border-[#059669]/30 overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <img src={selectedEvent.image} className="w-full h-56 object-cover" />
            <div className="p-6">
              <h3 className="text-xl font-black text-white mb-2">{selectedEvent.title}</h3>
              <p className="text-sm text-[#a0b5a3] leading-relaxed">{selectedEvent.description}</p>
            </div>
          </div>
        </div>
      )}

      {/* THE PHANTOM GAP KILLER CSS */}
      <style>{`
        /* Kill the internal padding react-slick adds below the track for dots */
        .carousel-container .slick-slider,
        .carousel-container .slick-list,
        .carousel-container .slick-track {
          padding-bottom: 0 !important;
          margin-bottom: 0 !important;
        }

        /* Pin dots flush underneath the images, no extra space */
        .carousel-container .slick-dots {
          position: relative;  /* <-- KEY: take it out of absolute flow */
          bottom: auto;
          margin-top: 8px;
          margin-bottom: 0;
          line-height: 0;
        }

        .carousel-container .slick-dots li {
          margin: 0;
          height: 8px;
        }

        .carousel-container .slick-dots li button {
          height: 8px;
          padding: 0;
        }

        .carousel-container .slick-dots li button:before {
          color: #059669;
          font-size: 6px;
          opacity: 0.2;
          line-height: 8px;
        }

        .carousel-container .slick-dots li.slick-active button:before {
          color: #00ff88;
          opacity: 1;
        }
      `}</style>
    </div>
  );
}