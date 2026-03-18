import { Home, Search, Map, Info, User } from 'lucide-react';

interface BottomNavigationProps {
  currentView: string;
  onNavigate: (view: string) => void;
}

export function BottomNavigation({ currentView, onNavigate }: BottomNavigationProps) {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'search', label: 'Explore', icon: Search },
    { id: 'map', label: 'Map', icon: Map },
    { id: 'about', label: 'Notice', icon: Info },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#1a2e1c] border-t border-[#059669]/20 z-50 safe-area-bottom">
      <div className="max-w-2xl mx-auto px-2 py-2">
        <div className="grid grid-cols-4 gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg transition-all ${
                  isActive
                    ? 'text-[#059669]'
                    : 'text-[#a0b5a3] hover:text-[#059669]/70'
                }`}
              >
                <Icon className={`w-5 h-5 mb-1 ${isActive ? 'stroke-[2.5]' : 'stroke-[2]'}`} />
                <span className={`text-[10px] ${isActive ? 'font-semibold' : 'font-medium'}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}