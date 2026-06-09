import { Home, Search, Map, Info, Phone } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

interface BottomNavigationProps {
  currentView: string;
  onNavigate: (view: string) => void;
}

export function BottomNavigation({ currentView, onNavigate }: BottomNavigationProps) {
  const { t } = useTranslation();
  
  const navItems = [
    { id: 'home', label: t('nav_home'), icon: Home },
    { id: 'search', label: t('nav_explore'), icon: Search },
    { id: 'map', label: t('nav_map'), icon: Map },
    { id: 'about', label: t('nav_notice'), icon: Info },
    { id: 'contact', label: t('nav_contact'), icon: Phone },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#1a2e1c] border-t border-[#059669]/20 z-50 safe-area-bottom">
      <div className="max-w-2xl mx-auto px-2 py-2">
        <div className="grid grid-cols-5 gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg transition-all active:scale-90 ${
                  isActive
                    ? 'text-[#059669] drop-shadow-[0_0_8px_rgba(5,150,105,0.4)]'
                    : 'text-[#a0b5a3]'
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