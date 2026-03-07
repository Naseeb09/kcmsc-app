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
  established: "2007", // Corrected established date
  about: "KC Model School & College is a premier educational institution in Dakshinkhan, providing quality education under the NCTB curriculum for both Primary and Secondary levels.",
  motto: "Education, Discipline, Progress",
  mission: "To provide a nurturing environment that fosters intellectual growth and character development.",
  vision: "To produce future leaders equipped with modern skills and ethical values.",
  values: ["Academic Excellence", "Integrity", "Respect", "Innovation"],
  grades: "Nursery - Class 12",
  totalStudents: "2,500+",
  studentTeacherRatio: "25:1",
  accreditation: "Board of Intermediate and Secondary Education, Dhaka."
};

export const contactInfo = {
  address: "Dakshinkhan Dhaka Prembagan 1230", // Matches the address in your screenshot
  phone: "(555) 555555", // Matches the number in your screenshot
  email: "kcmsc@gmail.com", // Matches the email in your screenshot
  officeHours: "8:00 AM - 3:30 PM", // Matches your screenshot
  emergencyContact: "(555) 676767", // Matches your screenshot
  socials: {
    facebook: "https://facebook.com/kcmsc",
    youtube: "https://youtube.com/@kcmsc"
  }
};