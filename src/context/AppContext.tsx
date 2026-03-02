import { createContext, useContext, useState, ReactNode } from 'react';

interface Event {
  id: string;
  title: string;
  description: string;
  image: string;
  date?: string;
}

interface Notice {
  id: number;
  title: string;
  content: string;
  date: string;
  priority: 'high' | 'medium' | 'low';
}

interface ClassInfo {
  name: string;
  room: string;
  teacher: string;
}

interface FloorData {
  id: string;
  label: string;
  name: string;
  color: string;
  totalRooms: number;
  lifts: string[];
  facilities: string[];
  classes: ClassInfo[];
  purpose: string;
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
  addStaff: (staff: Omit<StaffMember, 'id'>) => void;
  updateStaff: (id: string, staff: Omit<StaffMember, 'id'>) => void;
  deleteStaff: (id: string) => void;
  addFacility: (facility: Omit<Facility, 'id'>) => void;
  updateFacility: (id: string, facility: Omit<Facility, 'id'>) => void;
  deleteFacility: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const defaultEvents: Event[] = [
  {
    id: '1',
    title: 'Holiday Notice: Eid',
    description: 'The school will remain closed from [Date] to [Date] for Eid-ul-Fitr celebrations. Classes will resume on [Date]. Wishing all our students and families a blessed Eid Mubarak!',
    image: 'https://images.unsplash.com/photo-1719056230215-27bed3f19095?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlaWQlMjBjZWxlYnJhdGlvbnxlbnwxfHx8fDE3NjkzMzE5NDl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    date: '2024-04-10'
  },
  {
    id: '2',
    title: 'Annual Sports',
    description: 'Join us for our Annual Sports Day on [Date] featuring track and field events, team sports, and award ceremonies. All students are encouraged to participate and showcase their athletic abilities.',
    image: 'https://images.unsplash.com/photo-1480180566821-a7d525cdfc5e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjBldmVudHxlbnwxfHx8fDE3NjkyMzA5MzV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    date: '2024-03-15'
  },
  {
    id: '3',
    title: 'Admission 2024',
    description: 'Admissions are now open for the 2024 academic year from KG to College level. Limited seats available. Visit our admissions office or call for more details. Application deadline: [Date].',
    image: 'https://images.unsplash.com/photo-1760917094679-d33f2ec13110?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2hvb2wlMjBhZG1pc3Npb258ZW58MXx8fHwxNzY5MzMxOTUwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    date: '2024-01-01'
  }
];

const defaultNotices: Notice[] = [
  {
    id: 1,
    title: 'Parent-Teacher Meeting',
    content: 'The quarterly parent-teacher meeting is scheduled for next week. Please check with your class teacher for the exact time slot.',
    date: '2024-02-20',
    priority: 'high'
  },
  {
    id: 2,
    title: 'Science Fair 2024',
    content: 'Students interested in participating in the Annual Science Fair should submit their project proposals by the end of this month.',
    date: '2024-02-15',
    priority: 'medium'
  },
  {
    id: 3,
    title: 'Library Hours Extended',
    content: 'The library will now remain open until 6 PM on weekdays to accommodate students preparing for examinations.',
    date: '2024-02-10',
    priority: 'low'
  }
];

const defaultFloors: FloorData[] = [
  {
    id: 'basement',
    label: 'B',
    name: 'Basement',
    color: '#fbbf24',
    purpose: 'Parking & Canteen',
    totalRooms: 2,
    lifts: ['Boys Lift', 'Girls Lift', 'Teachers Lift'],
    facilities: ['Canteen', 'Car Parking Slots'],
    classes: []
  },
  {
    id: 'ground',
    label: 'G',
    name: 'Ground Floor',
    color: '#059669',
    purpose: 'Reception & Play Area',
    totalRooms: 2,
    lifts: ['Boys Lift', 'Girls Lift', 'Teachers Lift'],
    facilities: ['Open Play Area for Kids', 'Seating Space for Guardians'],
    classes: []
  },
  {
    id: 'floor1',
    label: '1',
    name: '1st Floor',
    color: '#10b981',
    purpose: 'Primary Classes 1-4',
    totalRooms: 8,
    lifts: ['Boys Lift', 'Girls Lift', 'Teachers Lift'],
    facilities: [],
    classes: [
      { name: 'Class 1-A', room: '101', teacher: 'Ms. Sarah Williams' },
      { name: 'Class 1-B', room: '102', teacher: 'Ms. Jennifer Davis' },
      { name: 'Class 2-A', room: '103', teacher: 'Ms. Amanda Martinez' },
      { name: 'Class 2-B', room: '104', teacher: 'Mr. Christopher Lee' },
      { name: 'Class 3-A', room: '105', teacher: 'Ms. Jessica Taylor' },
      { name: 'Class 3-B', room: '106', teacher: 'Ms. Elizabeth Clark' },
      { name: 'Class 4-A', room: '107', teacher: 'Mr. James Rodriguez' },
      { name: 'Class 4-B', room: '108', teacher: 'Ms. Mary Lewis' }
    ]
  },
  {
    id: 'floor2',
    label: '2',
    name: '2nd Floor',
    color: '#10b981',
    purpose: 'Primary Classes 5-8',
    totalRooms: 8,
    lifts: ['Boys Lift', 'Girls Lift', 'Teachers Lift'],
    facilities: [],
    classes: [
      { name: 'Class 5-A', room: '201', teacher: 'Mr. William Walker' },
      { name: 'Class 5-B', room: '202', teacher: 'Ms. Lisa Anderson' },
      { name: 'Class 6-A', room: '203', teacher: 'Mr. David Wilson' },
      { name: 'Class 6-B', room: '204', teacher: 'Ms. Patricia Moore' },
      { name: 'Class 7-A', room: '205', teacher: 'Mr. Robert Taylor' },
      { name: 'Class 7-B', room: '206', teacher: 'Ms. Linda Jackson' },
      { name: 'Class 8-A', room: '207', teacher: 'Mr. Michael Brown' },
      { name: 'Class 8-B', room: '208', teacher: 'Ms. Barbara White' }
    ]
  },
  {
    id: 'floor3',
    label: '3',
    name: '3rd Floor',
    color: '#10b981',
    purpose: 'Secondary Classes 9-10',
    totalRooms: 8,
    lifts: ['Boys Lift', 'Girls Lift', 'Teachers Lift'],
    facilities: [],
    classes: [
      { name: 'Class 9-A', room: '301', teacher: 'Mr. Thomas Anderson' },
      { name: 'Class 9-B', room: '302', teacher: 'Ms. Nancy Martinez' },
      { name: 'Class 9-C', room: '303', teacher: 'Mr. Charles Garcia' },
      { name: 'Class 10-A', room: '304', teacher: 'Ms. Betty Rodriguez' },
      { name: 'Class 10-B', room: '305', teacher: 'Mr. Joseph Wilson' },
      { name: 'Class 10-C', room: '306', teacher: 'Ms. Dorothy Moore' },
      { name: 'Study Room A', room: '307', teacher: 'Available for self-study' },
      { name: 'Study Room B', room: '308', teacher: 'Available for self-study' }
    ]
  },
  {
    id: 'floor4',
    label: '4',
    name: '4th Floor',
    color: '#10b981',
    purpose: 'Higher Secondary 11-12',
    totalRooms: 8,
    lifts: ['Boys Lift', 'Girls Lift', 'Teachers Lift'],
    facilities: [],
    classes: [
      { name: 'Class 11 (Science)', room: '401', teacher: 'Dr. Margaret Young' },
      { name: 'Class 11 (Commerce)', room: '402', teacher: 'Mr. Robert Harris' },
      { name: 'Class 11 (Arts)', room: '403', teacher: 'Ms. Susan Clark' },
      { name: 'Class 12 (Science)', room: '404', teacher: 'Dr. Richard Foster' },
      { name: 'Class 12 (Commerce)', room: '405', teacher: 'Ms. Karen Miller' },
      { name: 'Class 12 (Arts)', room: '406', teacher: 'Mr. Steven Lee' },
      { name: 'Tutorial Room A', room: '407', teacher: 'Multi-purpose learning space' },
      { name: 'Tutorial Room B', room: '408', teacher: 'Multi-purpose learning space' }
    ]
  },
  {
    id: 'floor5',
    label: '5',
    name: '5th Floor',
    color: '#10b981',
    purpose: 'Special Purpose Rooms',
    totalRooms: 8,
    lifts: ['Boys Lift', 'Girls Lift', 'Teachers Lift'],
    facilities: [],
    classes: [
      { name: 'Additional Classroom 1', room: '501', teacher: 'Ms. Helen Davis' },
      { name: 'Additional Classroom 2', room: '502', teacher: 'Mr. George Thompson' },
      { name: 'Additional Classroom 3', room: '503', teacher: 'Ms. Carol Martinez' },
      { name: 'Additional Classroom 4', room: '504', teacher: 'Mr. Paul Anderson' },
      { name: 'Resource Room', room: '505', teacher: 'Learning resources center' },
      { name: 'Activity Room', room: '506', teacher: 'Multi-activity space' },
      { name: 'Music Room', room: '507', teacher: 'Mr. Daniel Harris' },
      { name: 'Art Room', room: '508', teacher: 'Ms. Sandra Wilson' }
    ]
  },
  {
    id: 'floor6',
    label: '6',
    name: '6th Floor',
    color: '#10b981',
    purpose: 'Study & Seminar Rooms',
    totalRooms: 8,
    lifts: ['Boys Lift', 'Girls Lift', 'Teachers Lift'],
    facilities: [],
    classes: [
      { name: 'Advanced Study Room 1', room: '601', teacher: 'Dr. James Mitchell' },
      { name: 'Advanced Study Room 2', room: '602', teacher: 'Dr. Emily Roberts' },
      { name: 'Advanced Study Room 3', room: '603', teacher: 'Dr. Matthew Turner' },
      { name: 'Advanced Study Room 4', room: '604', teacher: 'Dr. Laura Phillips' },
      { name: 'Seminar Room A', room: '605', teacher: 'Multi-purpose seminar hall' },
      { name: 'Seminar Room B', room: '606', teacher: 'Multi-purpose seminar hall' },
      { name: 'Conference Room', room: '607', teacher: 'Staff meetings & conferences' },
      { name: 'Meeting Room', room: '608', teacher: 'General purpose meetings' }
    ]
  },
  {
    id: 'floor7',
    label: '7',
    name: '7th Floor',
    color: '#fbbf24',
    purpose: 'Admin & Special Facilities',
    totalRooms: 8,
    lifts: ['Boys Lift', 'Girls Lift', 'Teachers Lift'],
    facilities: ['Library', 'Science Lab', 'Computer Lab', "Principal's Office"],
    classes: [
      { name: 'Library', room: '701', teacher: 'Ms. Margaret Peterson (Librarian)' },
      { name: 'Science Laboratory', room: '702', teacher: 'Dr. John Campbell (Lab Supervisor)' },
      { name: 'Computer Lab', room: '703', teacher: 'Mr. Kevin Brooks (IT Instructor)' },
      { name: "Principal's Office", room: '704', teacher: 'Dr. Richard Foster (Principal)' },
      { name: 'Vice Principal Office', room: '705', teacher: 'Ms. Sarah Williams (Vice Principal)' },
      { name: 'Staff Lounge', room: '706', teacher: 'Faculty common room' },
      { name: 'Admin Office', room: '707', teacher: 'Administrative staff' },
      { name: 'Server Room', room: '708', teacher: 'IT infrastructure' }
    ]
  }
];

const defaultStaff: StaffMember[] = [
  {
    id: '1',
    name: 'Dr. Richard Foster',
    role: 'Principal',
    department: 'Administration',
    phone: '+880-1712-345678',
    email: 'principal@kcschool.edu',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400'
  },
  {
    id: '2',
    name: 'Ms. Sarah Williams',
    role: 'Vice Principal',
    department: 'Academic Affairs',
    phone: '+880-1712-345679',
    email: 'sarah.w@kcschool.edu',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400'
  },
  {
    id: '3',
    name: 'Dr. John Campbell',
    role: 'Science Department Head',
    department: 'Science',
    phone: '+880-1712-345680',
    email: 'john.c@kcschool.edu',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400'
  },
  {
    id: '4',
    name: 'Ms. Jennifer Davis',
    role: 'Mathematics Teacher',
    department: 'Mathematics',
    phone: '+880-1712-345681',
    email: 'jennifer.d@kcschool.edu',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400'
  },
  {
    id: '5',
    name: 'Mr. Michael Brown',
    role: 'English Teacher',
    department: 'Languages',
    phone: '+880-1712-345682',
    email: 'michael.b@kcschool.edu',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400'
  }
];

const defaultFacilities: Facility[] = [
  {
    id: '1',
    name: 'Library',
    description: 'Modern library with over 10,000 books, digital resources, and quiet study areas.',
    floor: '7th Floor',
    capacity: '100 students',
    timings: '8:00 AM - 6:00 PM',
    icon: 'BookOpen'
  },
  {
    id: '2',
    name: 'Science Laboratory',
    description: 'Fully equipped science lab for Physics, Chemistry, and Biology experiments.',
    floor: '7th Floor',
    capacity: '30 students',
    timings: '8:00 AM - 4:00 PM',
    icon: 'FlaskConical'
  },
  {
    id: '3',
    name: 'Computer Lab',
    description: 'State-of-the-art computer lab with latest software and high-speed internet.',
    floor: '7th Floor',
    capacity: '40 students',
    timings: '8:00 AM - 5:00 PM',
    icon: 'MonitorCheck'
  },
  {
    id: '4',
    name: 'Sports Ground',
    description: 'Multi-purpose sports ground for cricket, football, and athletics.',
    floor: 'Ground Floor',
    capacity: '200 students',
    timings: '6:00 AM - 6:00 PM',
    icon: 'Trophy'
  },
  {
    id: '5',
    name: 'Auditorium',
    description: 'Large auditorium for school events, assemblies, and cultural programs.',
    floor: 'Ground Floor',
    capacity: '500 people',
    timings: 'By Appointment',
    icon: 'Presentation'
  }
];

export function AppProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<Event[]>(defaultEvents);
  const [notices, setNotices] = useState<Notice[]>(defaultNotices);
  const [floors, setFloors] = useState<FloorData[]>(defaultFloors);
  const [staff, setStaff] = useState<StaffMember[]>(defaultStaff);
  const [facilities, setFacilities] = useState<Facility[]>(defaultFacilities);

  const addEvent = (event: Omit<Event, 'id'>) => {
    const newEvent = { ...event, id: Date.now().toString() };
    setEvents(prev => [...prev, newEvent]);
  };

  const addNotice = (notice: Omit<Notice, 'id'>) => {
    const newNotice = { ...notice, id: Date.now() };
    setNotices(prev => [...prev, newNotice]);
  };

  const updateEvent = (id: string, event: Omit<Event, 'id'>) => {
    setEvents(prev => prev.map(e => e.id === id ? { ...event, id } : e));
  };

  const updateNotice = (id: number, notice: Omit<Notice, 'id'>) => {
    setNotices(prev => prev.map(n => n.id === id ? { ...notice, id } : n));
  };

  const deleteEvent = (id: string) => {
    setEvents(prev => prev.filter(e => e.id !== id));
  };

  const deleteNotice = (id: number) => {
    setNotices(prev => prev.filter(n => n.id !== id));
  };

  // Floor management
  const addFloor = (floor: Omit<FloorData, 'id'>) => {
    const newFloor = { ...floor, id: Date.now().toString() };
    setFloors(prev => [...prev, newFloor]);
  };

  const updateFloor = (id: string, floor: Omit<FloorData, 'id'>) => {
    setFloors(prev => prev.map(f => f.id === id ? { ...floor, id } : f));
  };

  const deleteFloor = (id: string) => {
    setFloors(prev => prev.filter(f => f.id !== id));
  };

  // Staff management
  const addStaff = (staffMember: Omit<StaffMember, 'id'>) => {
    const newStaff = { ...staffMember, id: Date.now().toString() };
    setStaff(prev => [...prev, newStaff]);
  };

  const updateStaff = (id: string, staffMember: Omit<StaffMember, 'id'>) => {
    setStaff(prev => prev.map(s => s.id === id ? { ...staffMember, id } : s));
  };

  const deleteStaff = (id: string) => {
    setStaff(prev => prev.filter(s => s.id !== id));
  };

  // Facility management
  const addFacility = (facility: Omit<Facility, 'id'>) => {
    const newFacility = { ...facility, id: Date.now().toString() };
    setFacilities(prev => [...prev, newFacility]);
  };

  const updateFacility = (id: string, facility: Omit<Facility, 'id'>) => {
    setFacilities(prev => prev.map(f => f.id === id ? { ...facility, id } : f));
  };

  const deleteFacility = (id: string) => {
    setFacilities(prev => prev.filter(f => f.id !== id));
  };

  return (
    <AppContext.Provider value={{ 
      events, 
      notices, 
      floors,
      staff,
      facilities,
      addEvent, 
      addNotice, 
      updateEvent, 
      updateNotice,
      deleteEvent,
      deleteNotice,
      addFloor,
      updateFloor,
      deleteFloor,
      addStaff,
      updateStaff,
      deleteStaff,
      addFacility,
      updateFacility,
      deleteFacility
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
