// Mock data for School Guide Tour App

export interface Classroom {
  id: string;
  name: string;
  floor: number;
  roomNumber: string;
  capacity: number;
  type: 'classroom' | 'lab' | 'special';
  subject?: string;
  teacher?: string;
}

export interface StaffMember {
  id: string;
  name: string;
  role: string;
  department?: string;
  email: string;
  phone: string;
  bio: string;
  image: string;
  qualifications: string[];
  experience: string;
}

export interface Facility {
  id: string;
  name: string;
  floor: number;
  description: string;
  icon: string;
  image: string;
}

export interface Announcement {
  id: string;
  title: string;
  date: string;
  content: string;
  priority: 'high' | 'medium' | 'low';
}

export const classrooms: Classroom[] = [
  // Ground Floor
  { id: 'c1', name: 'Kindergarten A', floor: 0, roomNumber: 'G-101', capacity: 25, type: 'classroom', subject: 'Early Learning', teacher: 'Ms. Emily Johnson' },
  { id: 'c2', name: 'Kindergarten B', floor: 0, roomNumber: 'G-102', capacity: 25, type: 'classroom', subject: 'Early Learning', teacher: 'Ms. Sarah Williams' },
  { id: 'c3', name: 'Reception', floor: 0, roomNumber: 'G-001', capacity: 0, type: 'special', teacher: 'Ms. Patricia Brown' },
  { id: 'c4', name: 'Cafeteria', floor: 0, roomNumber: 'G-201', capacity: 200, type: 'special' },
  { id: 'c5', name: 'Gymnasium', floor: 0, roomNumber: 'G-301', capacity: 150, type: 'special', subject: 'Physical Education' },

  // First Floor
  { id: 'c6', name: 'Grade 1A', floor: 1, roomNumber: '1-101', capacity: 30, type: 'classroom', teacher: 'Ms. Jennifer Davis' },
  { id: 'c7', name: 'Grade 1B', floor: 1, roomNumber: '1-102', capacity: 30, type: 'classroom', teacher: 'Mr. Michael Thompson' },
  { id: 'c8', name: 'Grade 2A', floor: 1, roomNumber: '1-103', capacity: 30, type: 'classroom', teacher: 'Ms. Amanda Martinez' },
  { id: 'c9', name: 'Grade 2B', floor: 1, roomNumber: '1-104', capacity: 30, type: 'classroom', teacher: 'Ms. Rebecca White' },
  { id: 'c10', name: 'Music Room', floor: 1, roomNumber: '1-201', capacity: 35, type: 'special', subject: 'Music', teacher: 'Mr. David Anderson' },
  { id: 'c11', name: 'Art Studio', floor: 1, roomNumber: '1-202', capacity: 30, type: 'special', subject: 'Art', teacher: 'Ms. Laura Wilson' },

  // Second Floor
  { id: 'c12', name: 'Grade 3A', floor: 2, roomNumber: '2-101', capacity: 32, type: 'classroom', teacher: 'Mr. Christopher Lee' },
  { id: 'c13', name: 'Grade 3B', floor: 2, roomNumber: '2-102', capacity: 32, type: 'classroom', teacher: 'Ms. Michelle Garcia' },
  { id: 'c14', name: 'Grade 4A', floor: 2, roomNumber: '2-103', capacity: 32, type: 'classroom', teacher: 'Ms. Jessica Taylor' },
  { id: 'c15', name: 'Grade 4B', floor: 2, roomNumber: '2-104', capacity: 32, type: 'classroom', teacher: 'Mr. Daniel Moore' },
  { id: 'c16', name: 'Computer Lab', floor: 2, roomNumber: '2-201', capacity: 35, type: 'lab', subject: 'Computer Science', teacher: 'Mr. Robert Harris' },
  { id: 'c17', name: 'Library', floor: 2, roomNumber: '2-301', capacity: 60, type: 'special', teacher: 'Ms. Karen Miller' },

  // Third Floor
  { id: 'c18', name: 'Grade 5A', floor: 3, roomNumber: '3-101', capacity: 35, type: 'classroom', teacher: 'Ms. Elizabeth Clark' },
  { id: 'c19', name: 'Grade 5B', floor: 3, roomNumber: '3-102', capacity: 35, type: 'classroom', teacher: 'Mr. James Rodriguez' },
  { id: 'c20', name: 'Grade 6A', floor: 3, roomNumber: '3-103', capacity: 35, type: 'classroom', teacher: 'Ms. Mary Lewis' },
  { id: 'c21', name: 'Grade 6B', floor: 3, roomNumber: '3-104', capacity: 35, type: 'classroom', teacher: 'Mr. William Walker' },
  { id: 'c22', name: 'Science Lab', floor: 3, roomNumber: '3-201', capacity: 30, type: 'lab', subject: 'Science', teacher: 'Dr. Margaret Young' },
  { id: 'c23', name: 'Principal Office', floor: 3, roomNumber: '3-301', capacity: 0, type: 'special', teacher: 'Dr. Richard Foster' },
  { id: 'c24', name: 'Staff Room', floor: 3, roomNumber: '3-302', capacity: 0, type: 'special' }
];

export const staff: StaffMember[] = [
  {
    id: 's1',
    name: 'mmmmmmmmmm',
    role: 'Principal',
    email: 'r.kcmcs.edu',
    phone: '(555) 123-4567',
    bio: 'Dr. mmmmmmm over 25 years of experience in education leadership, with a passion for creating inclusive learning environments that nurture every student\'s potential.',
    image: 'school principal',
    qualifications: ['Ph.D. in Educational Leadership', 'M.Ed. in Curriculum Development', 'B.A. in Education'],
    experience: '25+ years in education, 10 years as Principal'
  },
  {
    id: 's2',
    name: 'its me ',
    role: 'Vice Principal',
    email: 'ohyes@gmail.com',
    phone: '(555) 123-4568',
    bio: 'its me daily operations and student services, ensuring a safe and supportive environment for all students and families.',
    image: 'school administrator',
    qualifications: ['M.Ed. in Educational Administration', 'B.A. in Elementary Education'],
    experience: '18 years in education, 5 years as Vice Principal'
  },
  {
    id: 's3',
    name: 'Johnson',
    role: 'Teacher',
    department: 'Kindergarten',
    email: 'e.oil@school.edu',
    phone: '(555) 123-4570',
    bio: 'Specializing in early childhood education, Ms. Johnson creates engaging learning experiences that spark curiosity and foster a love for learning.',
    image: 'kindergarten teacher',
    qualifications: ['M.Ed. in Early Childhood Education', 'B.A. in Child Development'],
    experience: '12 years teaching kindergarten'
  },
  {
    id: 's4',
    name: 'mmmmmmmmm',
    role: 'Teacher',
    department: 'Grade 1',
    email: 'm.kcmsc@school.edu',
    phone: '(555) 123-4571',
    bio: 'Mr. abbafocuses on building strong foundational skills in literacy and numeracy while promoting creativity and critical thinking.',
    image: 'elementary teacher',
    qualifications: ['M.A. in Elementary Education', 'B.A. in Education'],
    experience: '10 years teaching primary grades'
  },
  {
    id: 's5',
    name: 'Dr. mmmmmm',
    role: 'Teacher',
    department: 'Science',
    email: 'm.kcmsc@school.edu',
    phone: '(555) 123-4572',
    bio: 'Dr. Young brings scientific expertise to the classroom, inspiring students through hands-on experiments and real-world applications.',
    image: 'science teacher',
    qualifications: ['Ph.D. in Biology', 'M.Sc. in Environmental Science', 'B.Sc. in Biology'],
    experience: '15 years teaching science'
  },
  {
    id: 's6',
    name: 'Mr. David putra',
    role: 'Teacher',
    department: 'Music',
    email: 'd.mmmmm@school.edu',
    phone: '(555) 123-4573',
    bio: 'Mr. putra cultivates musical talent and appreciation through diverse programs including choir, band, and music theory.',
    image: 'music teacher',
    qualifications: ['M.Mus. in Music Education', 'B.Mus. in Performance'],
    experience: '14 years teaching music'
  }
];

export const facilities: Facility[] = [
  {
    id: 'f1',
    name: 'Modern Library',
    floor: 2,
    description: 'A comprehensive collection of over 15,000 books, digital resources, and quiet study spaces for students.',
    icon: 'BookOpen',
    image: 'modern school library'
  },
  {
    id: 'f2',
    name: 'Science Laboratory',
    floor: 3,
    description: 'State-of-the-art science lab equipped with modern equipment for biology, chemistry, and physics experiments.',
    icon: 'FlaskConical',
    image: 'school science lab'
  },
  {
    id: 'f3',
    name: 'Computer Lab',
    floor: 2,
    description: '35 modern computers with high-speed internet, supporting coding classes and digital literacy programs.',
    icon: 'Monitor',
    image: 'school computer lab'
  },
  {
    id: 'f4',
    name: 'Gymnasium',
    floor: 0,
    description: 'Full-sized indoor gymnasium with basketball courts, sports equipment, and space for physical education classes.',
    icon: 'Dumbbell',
    image: 'school gymnasium'
  },
  {
    id: 'f5',
    name: 'Cafeteria',
    floor: 0,
    description: 'Spacious dining area serving nutritious meals prepared by our culinary team. Accommodates 200 students.',
    icon: 'UtensilsCrossed',
    image: 'school cafeteria'
  },
  {
    id: 'f6',
    name: 'Art Studio',
    floor: 1,
    description: 'Creative space with art supplies, easels, and project areas for painting, drawing, and sculpture.',
    icon: 'Palette',
    image: 'school art studio'
  },
  {
    id: 'f7',
    name: 'Music Room',
    floor: 1,
    description: 'Acoustically designed space with instruments including piano, guitars, drums, and recording equipment.',
    icon: 'Music',
    image: 'school music room'
  },
  {
    id: 'f8',
    name: 'Playground',
    floor: 0,
    description: 'Safe outdoor play area with modern equipment, green spaces, and sports facilities for recreation.',
    icon: 'TreePine',
    image: 'school playground'
  }
];

export const announcements: Announcement[] = [
  {
    id: 'a1',
    title: 'Parent-Teacher Conference Week',
    date: '2026-01-28',
    content: 'Parent-teacher conferences will be held from January 28–31. Please schedule your appointment through the school portal or contact your child\'s teacher directly.',
    priority: 'high'
  },
  {
    id: 'a2',
    title: 'Winter Break Schedule',
    date: '2026-02-15',
    content: 'School will be closed for winter break from February 15–22. Classes resume on February 23, 2026.',
    priority: 'high'
  },
  {
    id: 'a3',
    title: 'Science Fair Registration Open',
    date: '2026-01-15',
    content: 'The annual Science Fair will be held on March 15. Registration is now open for students in grades 3–6. Projects due March 1.',
    priority: 'medium'
  },
  {
    id: 'a4',
    title: 'New After-School Programs',
    date: '2026-01-20',
    content: 'Exciting new after-school programs launching this semester: Robotics Club, Chess Club, and Creative Writing Workshop. Limited spots available.',
    priority: 'medium'
  },
  {
    id: 'a5',
    title: 'Library Extended Hours',
    date: '2026-01-22',
    content: 'The library will now be open until 5:00 PM on weekdays to provide additional study time for students.',
    priority: 'low'
  }
];

export const schoolInfo = {
  name: 'KC Model School and College',
  established: '2014',
  motto: 'Nurturing Minds, Building Futures',
  about: 'KC Model School and College has been a cornerstone of educational excellence for over 12 years. We are committed to providing a nurturing, inclusive environment where every student can thrive academically, socially, and emotionally. Our dedicated faculty, modern facilities, and comprehensive curriculum prepare students for success in an ever-changing world.',
  mission: 'To foster a love of learning, encourage critical thinking, and develop well-rounded individuals who contribute positively to society.',
  vision: 'To be a leading educational institution recognized for innovation, excellence, and the holistic development of every student.',
  values: [
    'Excellence in education',
    'Respect and integrity',
    'Innovation and creativity',
    'Community and collaboration',
    'Diversity and inclusion'
  ],
  accreditation: 'Accredited by the National Association of Independent Schools (NAIS)',
  studentTeacherRatio: '20:1',
  totalStudents: 2500,
  grades: 'Kindergarten through college'
};

export const contactInfo = {
  address: 'Dakshinkhan Dhaka Prembagan 1230',
  phone: '(555) 555555',
  fax: '(555) 555555',
  email: 'kcmsc@gmail.com',
  website: 'www.kcmsc.edu',
  hours: {
    weekdays: '7:30 AM - 4:00 PM',
    office: '8:00 AM - 3:30 PM'
  },
  emergencyContact: '(555) 676767'
};

export const floorInfo = [
  {
    floor: 0,
    name: 'Ground Floor',
    description: 'Main entrance, reception, cafeteria, playground, canteen',
    rooms: classrooms.filter(c => c.floor === 0).length
  },
  {
    floor: 1,
    name: 'First Floor',
    description: 'Primary grades (1–2)',
    rooms: classrooms.filter(c => c.floor === 1).length
  },
  {
    floor: 2,
    name: 'Second Floor',
    description: 'Elementary grades (3–4)',
    rooms: classrooms.filter(c => c.floor === 2).length
  },
  {
    floor: 3,
    name: 'Third Floor',
    description: 'Upper elementary grades (5–6)',
    rooms: classrooms.filter(c => c.floor === 3).length
  }
];
