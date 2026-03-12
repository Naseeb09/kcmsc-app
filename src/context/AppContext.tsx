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
  section: 'Junior' | 'Senior' | 'Admin';
  subject?: string;
  formTeacherOf?: string;
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

const initialStaff: StaffMember[] = [
  // Executive Suite
  {
    id: 's1',
    name: 'Brig Gen (Retd) Md. Anwar Hossain',
    role: 'Principal',
    department: 'Administration',
    phone: '01711122233',
    email: 'principal@kcmsc.edu.bd',
    image: '',
    section: 'Admin'
  },
  {
    id: 's2',
    name: 'Prof. Dr. M. A. Rashid',
    role: 'Chief Advisor',
    department: 'Administration',
    phone: '01711122244',
    email: 'advisor@kcmsc.edu.bd',
    image: '',
    section: 'Admin'
  },
  {
    id: 's3',
    name: 'Mrs. Ferdousi Begum',
    role: 'Vice Principal',
    department: 'Administration',
    phone: '01711122255',
    email: 'vp@kcmsc.edu.bd',
    image: '',
    section: 'Admin'
  },
  // Senior Section (Class 6-12)
  {
    id: 's4',
    name: 'Masum Ahmed (MA)',
    role: 'Senior Teacher',
    department: 'Science',
    phone: '01811122201',
    email: 'masum@kcmsc.edu.bd',
    image: '',
    section: 'Senior',
    subject: 'Physics',
    formTeacherOf: 'Ten (EV)'
  },
  {
    id: 's5',
    name: 'Afrin Nahar (AN)',
    role: 'Assistant Teacher',
    department: 'English',
    phone: '01811122202',
    email: 'afrin@kcmsc.edu.bd',
    image: '',
    section: 'Senior',
    subject: 'English',
    formTeacherOf: 'Six (EV)'
  },
  {
    id: 's6',
    name: 'Samiul Arefin (SA)',
    role: 'Assistant Teacher',
    department: 'Mathematics',
    phone: '01811122203',
    email: 'samiul@kcmsc.edu.bd',
    image: '',
    section: 'Senior',
    subject: 'Math',
    formTeacherOf: 'Eight (EV)'
  },
  {
    id: 's9',
    name: 'Tahmina Akter Shifa (TAS)',
    role: 'Assistant Teacher',
    department: 'General',
    phone: '01811122204',
    email: 'tahmina@kcmsc.edu.bd',
    image: '',
    section: 'Senior',
    subject: 'General Science',
    formTeacherOf: 'Seven (EV)'
  },
  {
    id: 's10',
    name: 'Mohammad Mufakkir Alam (MMA)',
    role: 'Senior Teacher',
    department: 'General',
    phone: '01811122205',
    email: 'mufakkir@kcmsc.edu.bd',
    image: '',
    section: 'Senior',
    subject: 'Humanities',
    formTeacherOf: 'Nine (EV)'
  },
  {
    id: 's11',
    name: 'Tanjib Saifur Rahman (TSR)',
    role: 'Assistant Teacher',
    department: 'Bangla',
    phone: '01811122206',
    email: 'tanjib@kcmsc.edu.bd',
    image: '',
    section: 'Senior',
    subject: 'Bangla',
    formTeacherOf: 'Six (B-1)'
  },
  {
    id: 's12',
    name: 'SM Kamal (SMK)',
    role: 'Assistant Teacher',
    department: 'General',
    phone: '01811122207',
    email: 'kamal@kcmsc.edu.bd',
    image: '',
    section: 'Senior',
    subject: 'Mathematics',
    formTeacherOf: 'Six (B-2)'
  },
  {
    id: 's13',
    name: 'Farhana Faruk (FF)',
    role: 'Assistant Teacher',
    department: 'General',
    phone: '01811122208',
    email: 'farhana@kcmsc.edu.bd',
    image: '',
    section: 'Senior',
    subject: 'Social Science',
    formTeacherOf: 'Seven (B-1)'
  },
  {
    id: 's14',
    name: 'Ashraful Islam (AI)',
    role: 'Assistant Teacher',
    department: 'General',
    phone: '01811122209',
    email: 'ashraful@kcmsc.edu.bd',
    image: '',
    section: 'Senior',
    subject: 'Religion',
    formTeacherOf: 'Seven (B-2)'
  },
  {
    id: 's15',
    name: 'Mohidul Islam (MI)',
    role: 'Assistant Teacher',
    department: 'General',
    phone: '01811122210',
    email: 'mohidul@kcmsc.edu.bd',
    image: '',
    section: 'Senior',
    subject: 'Science',
    formTeacherOf: 'Eight (B-1)'
  },
  {
    id: 's16',
    name: 'Rezwana Binte Helal (RBH)',
    role: 'Assistant Teacher',
    department: 'General',
    phone: '01811122211',
    email: 'rezwana@kcmsc.edu.bd',
    image: '',
    section: 'Senior',
    subject: 'ICT',
    formTeacherOf: 'Eight (B-2)'
  },
  {
    id: 's17',
    name: 'Shawon (AHS)',
    role: 'Senior Teacher',
    department: 'Science',
    phone: '01811122212',
    email: 'shawon@kcmsc.edu.bd',
    image: '',
    section: 'Senior',
    subject: 'Physics',
    formTeacherOf: 'Nine (SB-1)'
  },
  {
    id: 's18',
    name: 'Robiul Islam (RI)',
    role: 'Senior Teacher',
    department: 'Science',
    phone: '01811122213',
    email: 'robiul@kcmsc.edu.bd',
    image: '',
    section: 'Senior',
    subject: 'Chemistry',
    formTeacherOf: 'Ten (SB)'
  },
  // Junior Section (Nursery-Class 5)
  {
    id: 's7',
    name: 'Monika Asgar',
    role: 'Junior Teacher',
    department: 'General',
    phone: '01911122201',
    email: 'monika@kcmsc.edu.bd',
    image: '',
    section: 'Junior',
    subject: 'Bangla',
    formTeacherOf: 'Five (B)'
  },
  {
    id: 's8',
    name: 'Tania Akter',
    role: 'Junior Teacher',
    department: 'General',
    phone: '01911122202',
    email: 'tania@kcmsc.edu.bd',
    image: '',
    section: 'Junior',
    subject: 'Mathematics',
    formTeacherOf: 'Four (A)'
  },
  {
    id: 's19',
    name: 'Nasrin Sultana',
    role: 'Junior Teacher',
    department: 'General',
    phone: '01911122203',
    email: 'nasrin@kcmsc.edu.bd',
    image: '',
    section: 'Junior',
    subject: 'English',
    formTeacherOf: 'KG (Marigold)'
  }
];

export function AppProvider({ children }: { children: ReactNode }) {
  // Initializing state with imported data
  const [events, setEvents] = useState<Event[]>(defaultEvents);
  const [notices, setNotices] = useState<Notice[]>(defaultNotices);
  const [floors, setFloors] = useState<FloorData[]>(campusData);
  const [staff] = useState<StaffMember[]>(initialStaff);
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