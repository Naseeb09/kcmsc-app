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
  addEvent: (event: Omit<Event, 'id'>) => void;
  saveNotice: (notice: Partial<Notice>) => Promise<void>;
  updateEvent: (id: string, event: Omit<Event, 'id'>) => void;
  deleteNotice: (id: number) => Promise<void>;
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

  // Run migration if no data exists
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

  const runMigration = async () => {
    console.log('🚀 Running initial data migration from campusData...');
    
    // Check existing counts
    const { count: classCount } = await supabase.from('classes').select('*', { count: 'exact', head: true });
    const { count: teacherCount } = await supabase.from('teachers').select('*', { count: 'exact', head: true });
    const { count: noticeCount } = await supabase.from('notices').select('*', { count: 'exact', head: true });
    const { count: facilityCount } = await supabase.from('facilities').select('*', { count: 'exact', head: true });

    // 1. Migrate Classes
    if (classCount === 0) {
      const classesToInsert: any[] = [];
      campusData.forEach(floor => {
        floor.classes.forEach(c => {
          classesToInsert.push({
            name: c.name,
            room: c.room,
            section: c.section,
            version: c.version,
            teacher: c.teacher,
            teacher_number: c.teacherNumber,
            floor_id: floor.id
          });
        });
      });

      if (classesToInsert.length > 0) {
        await supabase.from('classes').insert(classesToInsert);
      }
    }

    // 2. Migrate Teachers (from classes where teacher is not N/A)
    if (teacherCount === 0) {
      const teachersMap = new Map();
      
      // Default Admin/Executive Faculty
      const defaultAdmins = [
        { name: 'Dr. Md. Abdul Khalek', role: 'Chairman', section: 'Admin', phone: 'N/A', is_form_teacher: false },
        { name: 'Md. Abdul Quader', role: 'Principal', section: 'Admin', phone: 'N/A', is_form_teacher: false },
        { name: 'Vice Principal (Junior)', role: 'Vice Principal', section: 'Admin', phone: 'N/A', is_form_teacher: false },
        { name: 'Vice Principal (Senior)', role: 'Vice Principal', section: 'Admin', phone: 'N/A', is_form_teacher: false },
        { name: 'Senior Co-ordinator', role: 'Co-ordinator', section: 'Admin', phone: 'N/A', is_form_teacher: false },
      ];

      defaultAdmins.forEach(admin => {
        teachersMap.set(admin.name, admin);
      });

      campusData.forEach(floor => {
        const floorNum = parseInt(floor.label);
        const section = floorNum <= 3 ? 'Junior' : 'Senior';
        
        floor.classes.forEach(c => {
          if (c.teacher && c.teacher !== 'N/A' && !teachersMap.has(c.teacher)) {
            teachersMap.set(c.teacher, {
              name: c.teacher,
              section: section,
              is_form_teacher: true,
              form_teacher_of: `${c.name} (${c.section})`,
              phone: c.teacher_number || 'N/A',
              subject: 'General'
            });
          }
        });
      });

      if (teachersMap.size > 0) {
        await supabase.from('teachers').insert(Array.from(teachersMap.values()));
      }
    }

    // 3. Migrate Notices
    if (noticeCount === 0 && defaultNotices.length > 0) {
      await supabase.from('notices').insert(defaultNotices.map(n => ({
        title: n.title,
        content: n.content,
        priority: n.priority
      })));
    }

    // 4. Migrate Facilities
    if (facilityCount === 0) {
      const facilitiesToInsert: any[] = [];
      campusData.forEach(floor => {
        floor.facilities.forEach(f => {
          facilitiesToInsert.push({
            name: f,
            floor: floor.name,
            capacity: '50',
            icon: 'Building2'
          });
        });
      });

      if (facilitiesToInsert.length > 0) {
        await supabase.from('facilities').insert(facilitiesToInsert);
      }
    }

    await fetchInitialData();
    console.log('✅ Migration complete!');
  };

  const fetchInitialData = async () => {
    try {
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
    return ['notices', 'teachers', 'classes', 'facilities'].map(table => 
      supabase.channel(`${table}-changes`)
        .on('postgres_changes', { event: '*', table, schema: 'public' }, () => { fetchInitialData(); })
        .subscribe()
    );
  };

  const saveNotice = async (notice: Partial<Notice>) => {
    const { id, date, ...payload } = notice;
    const { error } = await supabase.from('notices').upsert([id ? { id, ...payload } : payload]);
    if (error) throw error;
    await fetchInitialData();
  };

  const deleteNotice = async (id: number) => {
    const { error } = await supabase.from('notices').delete().eq('id', id);
    if (error) throw error;
    setNotices(prev => prev.filter(item => item.id !== id));
  };

  const saveTeacher = async (member: Partial<Teacher>) => {
    const { id, isFormTeacher, formTeacherOf, imageUrl, ...rest } = member;
    const payload = { 
      ...rest, 
      is_form_teacher: isFormTeacher, 
      form_teacher_of: formTeacherOf,
      image_url: imageUrl 
    };
    const { error } = await supabase.from('teachers').upsert([id ? { id, ...payload } : payload]);
    if (error) throw error;
    await fetchInitialData();
  };

  const deleteTeacher = async (id: string) => {
    const { error } = await supabase.from('teachers').delete().eq('id', id);
    if (error) throw error;
    setTeachers(prev => prev.filter(item => item.id !== id));
  };

  const saveClass = async (classData: Partial<ClassInfo>) => {
    const { id, teacherNumber, ...rest } = classData;
    const payload = { ...rest, teacher_number: teacherNumber };
    const { error } = await supabase.from('classes').upsert([id ? { id, ...payload } : payload]);
    if (error) throw error;
    await fetchInitialData();
  };

  const deleteClass = async (id: string) => {
    const { error } = await supabase.from('classes').delete().eq('id', id);
    if (error) throw error;
    setClasses(prev => prev.filter(item => item.id !== id));
  };

  const saveFacility = async (facility: Partial<Facility>) => {
    const { id, ...payload } = facility;
    const { error } = await supabase.from('facilities').upsert([id ? { id, ...payload } : payload]);
    if (error) throw error;
    await fetchInitialData();
  };

  const deleteFacility = async (id: string) => {
    const { error } = await supabase.from('facilities').delete().eq('id', id);
    if (error) throw error;
    setFacilities(prev => prev.filter(item => item.id !== id));
  };

  const addEvent = (event: Omit<Event, 'id'>) => setEvents(prev => [...prev, { ...event, id: Date.now().toString() }]);
  const updateEvent = (id: string, event: Omit<Event, 'id'>) => setEvents(prev => prev.map(e => e.id === id ? { ...event, id } : e));
  const addFloor = (floor: Omit<FloorData, 'id'>) => setFloors(prev => [...prev, { ...floor, id: Date.now().toString() }]);
  const updateFloor = (id: string, floor: Omit<FloorData, 'id'>) => setFloors(prev => prev.map(f => f.id === id ? { ...floor, id } : f));
  const deleteFloor = (id: string) => setFloors(prev => prev.filter(f => f.id !== id));

  return (
    <AppContext.Provider value={{ 
      events, notices, floors, teachers, classes, facilities, isAdmin, setIsAdmin,
      addEvent, saveNotice, updateEvent, deleteNotice,
      addFloor, updateFloor, deleteFloor,
      saveTeacher, deleteTeacher, 
      saveClass, deleteClass,
      saveFacility, deleteFacility, fetchInitialData
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
