import { createContext, useContext, useState, ReactNode } from 'react';
import { campusData, FloorData as CampusFloorData } from '../data/campusData';
import { defaultEvents, defaultNotices } from '../data/announcements';

// Re-exporting for use in other files
export type FloorData = CampusFloorData;

export interface Event {
  id: string;
  title: string;
  description: string;
  image: string;
  date?: string;
}

export interface Notice {
  id: number;
  title: string;
  content: string;
  date: string;
  priority: 'high' | 'medium' | 'low';
}

export interface ClassInfo {
  name: string;
  room: string;
  section: string;
  version: string;
  teacher: string;
  teacherNumber: string;
}

interface StaffMember {
  id: string;
  name: string;
  role: string;
  department: string;
  phone: string;
  email: string;
  image: string;
}

interface Facility {
  id: string;
  name: string;
  description: string;
  floor: string;
  capacity: string;
  timings: string;
  icon: string;
}

interface AppContextType {
  events: Event[];
  notices: Notice[];
  floors: FloorData[];
  staff: StaffMember[];
  facilities: Facility[];
  addEvent: (event: Omit<Event, 'id'>) => void;
  addNotice: (notice: Omit<Notice, 'id'>) => void;
  updateEvent: (id: string, event: Omit<Event, 'id'>) => void;
  updateNotice: (id: number, notice: Omit<Notice, 'id'>) => void;
  deleteEvent: (id: string) => void;
  deleteNotice: (id: number) => void;
  addFloor: (floor: Omit<FloorData, 'id'>) => void;
  updateFloor: (id: string, floor: Omit<FloorData, 'id'>) => void;
  deleteFloor: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  // Initializing state with imported data
  const [events, setEvents] = useState<Event[]>(defaultEvents);
  const [notices, setNotices] = useState<Notice[]>(defaultNotices);
  const [floors, setFloors] = useState<FloorData[]>(campusData);
  const [staff] = useState<StaffMember[]>([]);
  const [facilities] = useState<Facility[]>([]);

  // Handlers
  const addEvent = (event: Omit<Event, 'id'>) => setEvents(prev => [...prev, { ...event, id: Date.now().toString() }]);
  const addNotice = (notice: Omit<Notice, 'id'>) => setNotices(prev => [...prev, { ...notice, id: Date.now() }]);
  const updateEvent = (id: string, event: Omit<Event, 'id'>) => setEvents(prev => prev.map(e => e.id === id ? { ...event, id } : e));
  const updateNotice = (id: number, notice: Omit<Notice, 'id'>) => setNotices(prev => prev.map(n => n.id === id ? { ...notice, id } : n));
  const deleteEvent = (id: string) => setEvents(prev => prev.filter(e => e.id !== id));
  const deleteNotice = (id: number) => setNotices(prev => prev.filter(n => n.id !== id));
  const addFloor = (floor: Omit<FloorData, 'id'>) => setFloors(prev => [...prev, { ...floor, id: Date.now().toString() }]);
  const updateFloor = (id: string, floor: Omit<FloorData, 'id'>) => setFloors(prev => prev.map(f => f.id === id ? { ...floor, id } : f));
  const deleteFloor = (id: string) => setFloors(prev => prev.filter(f => f.id !== id));

  return (
    <AppContext.Provider value={{ 
      events, notices, floors, staff, facilities,
      addEvent, addNotice, updateEvent, updateNotice, deleteEvent, deleteNotice,
      addFloor, updateFloor, deleteFloor
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) throw new Error('useAppContext must be used within an AppProvider');
  return context;
}