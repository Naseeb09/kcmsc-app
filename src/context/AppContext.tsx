import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { campusData, FloorData as CampusFloorData } from '../data/campusData';
import { defaultNotices, verifiedFacilities, defaultEvents } from '../data/announcements';
import { supabase } from '../lib/supabase';

// Import admin photos
import chiefAdvisorImg from '../photos/cheif_advisor.png';
import principalImg from '../photos/principal.png';
import actingViceImg from '../photos/acting_vice.png';
import salmaImg from '../photos/salma.png';

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
  isLoading: boolean;
  isFabElevated: boolean;
  setIsFabElevated: (val: boolean) => void;
  language: 'en' | 'bn';
  setLanguage: (lang: 'en' | 'bn') => void;
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

const DEFAULT_ADMINS: Teacher[] = [
  {
    id: 'admin-0',
    name: 'Brigadier General ASM Musfiqur Rahman, spp, psc (retd)',
    role: 'Chief Advisor',
    section: 'admin',
    phone: '',
    imageUrl: chiefAdvisorImg,
    isFormTeacher: false,
    subject: 'Administration'
  },
  {
    id: 'admin-1',
    name: 'Prof Md Abdul Baten',
    role: 'Principal',
    section: 'admin',
    phone: '',
    imageUrl: principalImg,
    isFormTeacher: false,
    subject: 'Administration'
  },
  {
    id: 'admin-2',
    name: 'AKM Mahbub Hasan',
    role: 'Acting Vice Principal',
    section: 'admin',
    phone: '',
    imageUrl: actingViceImg,
    isFormTeacher: false,
    subject: 'Administration'
  },
  {
    id: 'admin-3',
    name: 'Salma Fouzia Noor',
    role: 'Vice Principal, Junior Section',
    section: 'admin',
    phone: '',
    imageUrl: salmaImg,
    isFormTeacher: false,
    subject: 'Administration'
  }
];

export function AppProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<Event[]>(defaultEvents);
  const [notices, setNotices] = useState<Notice[]>(defaultNotices);
  const [floors, setFloors] = useState<FloorData[]>(campusData);
  const [teachers, setTeachers] = useState<Teacher[]>(DEFAULT_ADMINS);
  const [classes, setClasses] = useState<ClassInfo[]>([]);
  const [facilities, setFacilities] = useState<Facility[]>(verifiedFacilities as any);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isFabElevated, setIsFabElevated] = useState(false);
  const [language, setLanguage] = useState<'en' | 'bn'>('en');

  useEffect(() => {
    // Load saved language from localStorage if available
    const savedLang = localStorage.getItem('app-language') as 'en' | 'bn';
    if (savedLang && (savedLang === 'en' || savedLang === 'bn')) {
      setLanguage(savedLang);
    }
  }, []);

  const handleSetLanguage = (lang: 'en' | 'bn') => {
    setLanguage(lang);
    localStorage.setItem('app-language', lang);
  };

  useEffect(() => {
    const init = async () => {
      setIsLoading(true);
      try {
        await fetchInitialData();
      } catch (error) {
        console.error('INIT_ERROR:', error);
        setIsLoading(false);
      }
    };
    init();
    
    // Safety check for setupSubscriptions
    let channels: any[] = [];
    try {
      channels = setupSubscriptions();
    } catch (error) {
      console.warn('SUBSCRIPTION_SETUP_FAILED:', error);
    }

    return () => {
      try {
        channels.forEach(channel => {
          if (channel) supabase.removeChannel(channel);
        });
      } catch (error) {
        console.error('SUBSCRIPTION_CLEANUP_FAILED:', error);
      }
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
      console.log('📡 Fetching initial data from Supabase...');
      
      const { data: eData, error: eError } = await supabase.from('events').select('*').order('created_at', { ascending: false });
      if (eError) console.error('Error fetching events:', eError);
      if (eData && eData.length > 0) {
        console.log(`✅ Loaded ${eData.length} events`);
        setEvents(eData);
      }

      const { data: nData, error: nError } = await supabase.from('notices').select('*').order('created_at', { ascending: false });
      if (nError) console.error('Error fetching notices:', nError);
      if (nData && nData.length > 0) {
        console.log(`✅ Loaded ${nData.length} notices`);
        setNotices(nData.map((n: any) => ({ ...n, date: n.created_at?.split('T')[0] || '' })));
      }

      const { data: tData, error: tError } = await supabase.from('teachers').select('*').order('name');
      if (tError) console.error('Error fetching teachers:', tError);
      
      let finalTeachers = [...DEFAULT_ADMINS];
      if (tData && tData.length > 0) {
        console.log(`✅ Loaded ${tData.length} teachers`);
        const fetchedTeachers = tData.map((t: any) => ({ 
          ...t, 
          isFormTeacher: t.is_form_teacher || false, 
          formTeacherOf: t.form_teacher_of || '',
          imageUrl: t.image_url || ''
        }));
        
        // Filter out any default admins that might already be in the database (by name or role)
        const fetchedNames = fetchedTeachers.map(t => t.name.toLowerCase());
        const uniqueDefaults = DEFAULT_ADMINS.filter(d => !fetchedNames.includes(d.name.toLowerCase()));
        
        finalTeachers = [...uniqueDefaults, ...fetchedTeachers];
      }
      setTeachers(finalTeachers);

      const { data: cData, error: cError } = await supabase.from('classes').select('*').order('room');
      if (cError) console.error('Error fetching classes:', cError);
      if (cData && cData.length > 0) {
        console.log(`✅ Loaded ${cData.length} classes`);
        setClasses(cData.map((c: any) => ({
          ...c,
          teacher: c.teacher || 'N/A',
          section: c.section || 'N/A',
          version: c.version || 'N/A',
          teacherNumber: c.teacher_number || 'N/A'
        })));
      }

      const { data: fData, error: fError } = await supabase.from('facilities').select('*').order('name');
      if (fError) console.error('Error fetching facilities:', fError);
      if (fData && fData.length > 0) {
        console.log(`✅ Loaded ${fData.length} facilities`);
        setFacilities(fData);
      }
    } catch (error) {
      console.error('FETCH_INITIAL_DATA_ERROR:', error);
    } finally {
      setIsLoading(false);
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
    events, notices, floors, teachers, classes, facilities, isAdmin, isLoading, setIsAdmin,
    isFabElevated, setIsFabElevated,
    language, setLanguage: handleSetLanguage,
    saveNotice, deleteNotice, saveEvent, deleteEvent,
...
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
