import { Event, Notice } from '../context/AppContext';

export const defaultEvents: Event[] = [
  {
    id: '1',
    title: 'Science & Tech Expo',
    description: 'Showcasing student robotics and AI projects at the KC Multi-purpose Hall.',
    // A clean, high-tech robotics/lab shot
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=800&q=80', 
    date: '2026-05-12'
  },
  {
    id: '2',
    title: 'Annual Sports Meet',
    description: 'Final track and field events. Come support your house!',
    // Professional track and field/action shot
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80', 
    date: '2026-02-20'
  },
  {
    id: '3',
    title: 'Glitched Tech Bootcamp',
    description: 'Intensive React & Tailwind workshop for the 2026 batch.',
    // Dark code/tech aesthetic
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    date: '2026-04-05'
  }
];

export const defaultNotices: Notice[] = [
  {
    id: 1,
    title: 'SSC Batch Mock Exams',
    content: 'Class 10 mock exam routines are now available at the admin office.',
    date: '2026-03-10',
    priority: 'high'
  },
  {
    id: 2,
    title: 'ICT Olympiad Registration',
    content: 'Regional registration is open. Contact the IT Club for details.',
    date: '2026-03-08',
    priority: 'medium'
  }
];

export const schoolInfo = {
  name: "KC Model School & College",
  established: "2014",
  founder: "Al-Hajj Md. Khashru Chowdhury (CIP)",
  about: "Founded in 2014 by Al-Hajj Md. Khashru Chowdhury (CIP), KC Model School & College is a premier educational institution in Dakshinkhan, providing quality education under the NCTB curriculum.",
  motto: "Education, Discipline, Progress",
  mission: "To enable students to explore their full potential and produce 21st-century global citizens.",
  vision: "To produce future leaders equipped with modern skills and ethical values.",
  values: ["Academic Excellence", "Integrity", "Respect", "Innovation"],
  grades: "Nursery - Class 12",
  totalStudents: "2,500+",
  studentTeacherRatio: "25:1",
  accreditation: "Board of Intermediate and Secondary Education, Dhaka."
};

export const contactInfo = {
  address: "275, Prembagan, Dakshinkhan, Dhaka-1230",
  phone: "02 8999685, 01793 560 466",
  email: "kcmodelcollege@gmail.com",
  officeHours: "8:00 AM - 3:30 PM",
  emergencyContact: "01793 560 466",
  socials: {
    facebook: "https://facebook.com/kcmsc",
    youtube: "https://youtube.com/@kcmsc"
  }
  };

  export const verifiedFacilities = [
  { id: 'fac1', name: 'Physics Lab', description: 'Well-equipped laboratory for practical physics experiments.', floor: '7th Floor', icon: 'Microscope' },
  { id: 'fac2', name: 'Chemistry Lab', description: 'Advanced chemistry lab with modern safety equipment.', floor: '7th Floor', icon: 'FlaskConical' },
  { id: 'fac3', name: 'Biology Lab', description: 'Comprehensive biology lab for life sciences study.', floor: '7th Floor', icon: 'Dna' },
  { id: 'fac4', name: 'ICT Lab', description: 'Modern computer lab with high-speed internet.', floor: '7th Floor', icon: 'Monitor' },
  { id: 'fac5', name: 'Multi-media Classrooms', description: 'Digital classrooms with projection systems.', floor: 'Various', icon: 'Projector' },
  { id: 'fac6', name: 'Rich Library', description: 'Extensive collection of academic and reference books.', floor: '7th Floor', icon: 'Library' },
  { id: 'fac7', name: 'Wi-Fi Campus', description: 'High-speed internet connectivity across the campus.', floor: 'Global', icon: 'Wifi' }
  ];