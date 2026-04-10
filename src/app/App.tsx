import { useState, useEffect } from 'react';
import { HomeScreen } from '@/app/components/HomeScreen';
import { ClassSearch } from '@/app/components/ClassSearch';
import { FloorMaps } from '@/app/components/FloorMaps';
import { FloorDetail } from '@/app/components/FloorDetail';
import { StaffDirectory } from '@/app/components/StaffDirectory';
import { Facilities } from '@/app/components/Facilities';
import { SchoolInfo } from '@/app/components/SchoolInfo';
import { Contact } from '@/app/components/Contact';
import { Fees } from '@/app/components/Fees';
import { Map } from '@/app/components/Map';
import { Profile } from '@/app/components/Profile';
import { MoreScreen } from '@/app/components/MoreScreen';
import { BottomNavigation } from '@/app/components/BottomNavigation';
import { LoadingScreen } from '@/app/components/LoadingScreen';
import { AppProvider, useAppContext } from '@/context/AppContext';

import { Toaster } from '@/app/components/ui/sonner';

function AppContent() {
  const { isLoading } = useAppContext();
  const [currentView, setCurrentView] = useState('home');
  const [navigationData, setNavigationData] = useState<any>(null);

  const handleNavigate = (view: string, data?: any) => {
    setNavigationData(data || null);
    setCurrentView(view);
    // Scroll to top when navigating
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Automatically clear navigation data if we leave the search view
  useEffect(() => {
    if (currentView !== 'search' && navigationData) {
      setNavigationData(null);
    }
  }, [currentView, navigationData]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  const renderView = () => {
    // Check if it's a floor detail view
    if (currentView.startsWith('floor-detail-')) {
      const floorId = currentView.replace('floor-detail-', '');
      return <FloorDetail onNavigate={handleNavigate} floorId={floorId} />;
    }

    switch (currentView) {
      case 'home':
        return <HomeScreen onNavigate={handleNavigate} />;
      case 'search':
        return <ClassSearch onNavigate={handleNavigate} initialQuery={navigationData?.initialQuery} />;
      case 'floors':
        return <FloorMaps onNavigate={handleNavigate} />;
      case 'staff':
        return <StaffDirectory onNavigate={handleNavigate} />;
      case 'facilities':
        return <Facilities onNavigate={handleNavigate} />;
      case 'about':
        return <SchoolInfo onNavigate={handleNavigate} />;
      case 'contact':
        return <Contact onNavigate={handleNavigate} />;
      case 'fees':
        return <Fees onNavigate={handleNavigate} />;
      case 'map':
        return <Map onNavigate={handleNavigate} />;
      case 'profile':
        return <Profile onNavigate={handleNavigate} />;
      case 'more':
        return <MoreScreen onNavigate={handleNavigate} />;
      default:
        return <HomeScreen onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1f0f]">
      {/* Mobile Container */}
      <div className="max-w-md mx-auto bg-[#0d1f0f] min-h-screen relative flex flex-col">
        {/* Main Content Area */}
        <div className="flex-1 pb-32">
          {renderView()}
        </div>

        {/* Bottom Navigation */}
        <BottomNavigation currentView={currentView} onNavigate={handleNavigate} />

        <Toaster position="top-center" expand={false} richColors />
      </div>
    </div>
  );
}


export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
