import { useState } from 'react';
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
import { AddEvent } from '@/app/components/AddEvent';
import { AddNotice } from '@/app/components/AddNotice';
import { ManageEvents } from '@/app/components/ManageEvents';
import { ManageNotices } from '@/app/components/ManageNotices';
import { ManageFloors } from '@/app/components/ManageFloors';
import { MoreScreen } from '@/app/components/MoreScreen';
import { BottomNavigation } from '@/app/components/BottomNavigation';
import { AppProvider } from '@/context/AppContext';

function AppContent() {
  const [currentView, setCurrentView] = useState('home');

  const handleNavigate = (view: string) => {
    setCurrentView(view);
    // Scroll to top when navigating
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
        return <ClassSearch onNavigate={handleNavigate} />;
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
      case 'add-event':
        return <AddEvent onNavigate={handleNavigate} />;
      case 'add-notice':
        return <AddNotice onNavigate={handleNavigate} />;
      case 'manage-events':
        return <ManageEvents onNavigate={handleNavigate} />;
      case 'manage-notices':
        return <ManageNotices onNavigate={handleNavigate} />;
      case 'manage-floors':
        return <ManageFloors onNavigate={handleNavigate} />;
      case 'add-floor':
      case 'add-staff':
      case 'manage-staff':
      case 'add-facility':
      case 'manage-facilities':
        // These will show a "Coming Soon" message for now
        return (
          <div className="pb-20 bg-[#0d1f0f] min-h-screen flex items-center justify-center">
            <div className="text-center px-6">
              <div className="w-16 h-16 rounded-full bg-[#059669]/20 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚧</span>
              </div>
              <h2 className="text-lg font-medium text-[#e8f5e9] mb-2">Feature Available</h2>
              <p className="text-sm text-[#a0b5a3] mb-4">
                This feature is ready to use via the Manage sections
              </p>
              <button
                onClick={() => handleNavigate('profile')}
                className="px-6 py-2 bg-[#059669] text-white rounded-lg text-sm font-medium"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        );
      case 'more':
        return <MoreScreen onNavigate={handleNavigate} />;
      default:
        return <HomeScreen onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1f0f]">
      {/* Mobile Container */}
      <div className="max-w-md mx-auto bg-[#0d1f0f] min-h-screen">
        {/* Main Content */}
        <div className="relative">
          {renderView()}
        </div>

        {/* Bottom Navigation */}
        <BottomNavigation currentView={currentView} onNavigate={handleNavigate} />
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
