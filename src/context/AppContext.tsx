import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { campusData, FloorData as CampusFloorData } from '../data/campusData';
import { defaultNotices } from '../data/announcements';
import { supabase } from '../lib/supabase';

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

export interface StaffMember {
  id: string;
  name: string;
  phone: string;
  section: 'Junior' | 'Senior' | 'Admin' | 'admin' | 'junior' | 'senior';
  subject?: string;
  floor?: string;
  isFormTeacher: boolean;
  formTeacherOf?: string;
  role?: string;
  department?: string;
  email?: string;
  imageUrl?: string;
}

export interface Facility {
  id: string;
  name: string;
  floor: string;
  capacity: string;
  icon: string;
  description?: string;
  timings?: string;
}

export interface ClassInfo {
  id: string;
  name: string;
  room: string;
  section: string;
  version: string;
  teacher: string;
  teacherNumber: string;
  floor_id?: string;
}

export interface Teacher extends StaffMember {}

interface AppContextType {
  events: Event[];
  notices: Notice[];
  floors: FloorData[];
  teachers: Teacher[];
  classes: ClassInfo[];
  facilities: Facility[];
  isAdmin: boolean;
  setIsAdmin: (isAdmin: boolean) => void;
  saveNotice: (notice: Partial<Notice>) => Promise<void>;
  deleteNotice: (id: number) => Promise<void>;
  saveEvent: (event: Partial<Event>) => Promise<void>;
  deleteEvent: (id: string) => Promise<void>;
  addFloor: (floor: Omit<FloorData, 'id'>) => void;
  updateFloor: (id: string, floor: Omit<FloorData, 'id'>) => void;
  deleteFloor: (id: string) => void;
  saveTeacher: (member: Partial<Teacher>) => Promise<void>;
  deleteTeacher: (id: string) => Promise<void>;
  saveClass: (classData: Partial<ClassInfo>) => Promise<void>;
  deleteClass: (id: string) => Promise<void>;
  saveFacility: (facility: Partial<Facility>) => Promise<void>;
  deleteFacility: (id: string) => Promise<void>;
  fetchInitialData: () => Promise<void>;
  addEvent: (event: Omit<Event, 'id'>) => void;
  updateEvent: (id: string, event: Omit<Event, 'id'>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<Event[]>([]);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [floors, setFloors] = useState<FloorData[]>(campusData);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [classes, setClasses] = useState<ClassInfo[]>([]);
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    fetchInitialData();
    const channels = setupSubscriptions();
    return () => {
      channels.forEach(channel => supabase.removeChannel(channel));
    };
  }, []);

  // Run migration if no data exists - DISABLED for Read-Only App
  /*
  useEffect(() => {
    const checkAndMigrate = async () => {
      const { count: classCount } = await supabase.from('classes').select('*', { count: 'exact', head: true });
      const { count: teacherCount } = await supabase.from('teachers').select('*', { count: 'exact', head: true });
      
      if (classCount === 0 || teacherCount === 0) {
        await runMigration();
      }
    };
    checkAndMigrate();
  }, []);
  */

  const runMigration = async () => {
    console.warn('Migration attempted but disabled in student-only build.');
    /*
    console.log('🚀 Running initial data migration from campusData...');
    ...
    */
  };

  const fetchInitialData = async () => {
    try {
      const { data: eData } = await supabase.from('events').select('*').order('created_at', { ascending: false });
      if (eData) setEvents(eData);

      const { data: nData } = await supabase.from('notices').select('*').order('created_at', { ascending: false });
      if (nData) setNotices(nData.map((n: any) => ({ ...n, date: n.created_at?.split('T')[0] || '' })));

      const { data: tData } = await supabase.from('teachers').select('*').order('name');
      if (tData) setTeachers(tData.map((t: any) => ({ 
        ...t, 
        isFormTeacher: t.is_form_teacher, 
        formTeacherOf: t.form_teacher_of,
        imageUrl: t.image_url 
      })));

      const { data: cData } = await supabase.from('classes').select('*').order('room');
      if (cData) setClasses(cData.map((c: any) => ({
        ...c,
        teacherNumber: c.teacher_number
      })));

      const { data: fData } = await supabase.from('facilities').select('*').order('name');
      if (fData) setFacilities(fData);
    } catch (error) {
      console.error('FETCH_INITIAL_DATA_ERROR:', error);
    }
  };

  const setupSubscriptions = () => {
    return ['notices', 'events', 'teachers', 'classes', 'facilities'].map(table => 
      supabase.channel(`${table}-changes`)
        .on('postgres_changes', { event: '*', table, schema: 'public' }, () => { fetchInitialData(); })
        .subscribe()
    );
  };

  const saveNotice = async (notice: Partial<Notice>) => {
    console.warn('Write operations are disabled in this build.');
  };

  const deleteNotice = async (id: number) => {
    console.warn('Write operations are disabled in this build.');
  };

  const saveEvent = async (event: Partial<Event>) => {
    console.warn('Write operations are disabled in this build.');
  };

  const deleteEvent = async (id: string) => {
    console.warn('Write operations are disabled in this build.');
  };

  const saveTeacher = async (member: Partial<Teacher>) => {
    console.warn('Write operations are disabled in this build.');
  };

  const deleteTeacher = async (id: string) => {
    console.warn('Write operations are disabled in this build.');
  };

  const saveClass = async (classData: Partial<ClassInfo>) => {
    console.warn('Write operations are disabled in this build.');
  };

  const deleteClass = async (id: string) => {
    console.warn('Write operations are disabled in this build.');
  };

  const saveFacility = async (facility: Partial<Facility>) => {
    console.warn('Write operations are disabled in this build.');
  };

  const deleteFacility = async (id: string) => {
    console.warn('Write operations are disabled in this build.');
  };

  const addEvent = (event: Omit<Event, 'id'>) => console.warn('Write operations are disabled in this build.');
  const updateEvent = (id: string, event: Omit<Event, 'id'>) => console.warn('Write operations are disabled in this build.');
  const addFloor = (floor: Omit<FloorData, 'id'>) => console.warn('Write operations are disabled in this build.');
  const updateFloor = (id: string, floor: Omit<FloorData, 'id'>) => console.warn('Write operations are disabled in this build.');
  const deleteFloor = (id: string) => console.warn('Write operations are disabled in this build.');

  return (
    <AppContext.Provider value={{ 
      events, notices, floors, teachers, classes, facilities, isAdmin, setIsAdmin,
      saveNotice, deleteNotice, saveEvent, deleteEvent,
      addFloor, updateFloor, deleteFloor,
      saveTeacher, deleteTeacher, 
      saveClass, deleteClass,
      saveFacility, deleteFacility, fetchInitialData,
      addEvent, updateEvent
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
