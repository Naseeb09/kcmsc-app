import { ClassInfo } from '../context/AppContext';

export interface FloorData {
  id: string;
  label: string;
  name: string;
  color: string;
  totalRooms: number;
  lifts: string[];
  facilities: string[];
  classes: ClassInfo[];
  purpose: string;
  highlights?: string[]; // New section for "Special" boxes
}

export const campusData: FloorData[] = [
  {
    id: 'floor1',
    label: '1',
    name: '1st Floor',
    color: '#10b981',
    purpose: 'Nursery, KG & Class 1',
    totalRooms: 13,
    lifts: ['Boys Lift', 'Girls Lift', 'Teachers Lift'],
    facilities: ["Principal's Room", "Dance Room", "Chairman's Room"],
    highlights: ["⭐ Room 206 — Principal's Room", "🏛️ Chairman’s & Vice-Chairman’s Room"],
    classes: [
      { room: "201", name: "One", section: "Ka", version: "English", teacher: "N/A", teacherNumber: "N/A" },
      { room: "202", name: "Nursery", section: "Peacock & Bulbul", version: "N/A", teacher: "N/A", teacherNumber: "N/A" },
      { room: "203", name: "Nursery", section: "Myna & Parrot", version: "N/A", teacher: "N/A", teacherNumber: "N/A" },
      { room: "204", name: "Nursery", section: "Dove & Magpie", version: "N/A", teacher: "N/A", teacherNumber: "N/A" },
      { room: "205", name: "Nursery", section: "Swan & Sparrow", version: "N/A", teacher: "N/A", teacherNumber: "N/A" },
      { room: "206", name: "Principal's Office", section: "Admin", version: "N/A", teacher: "N/A", teacherNumber: "N/A" },
      { room: "207", name: "KG", section: "Marigold", version: "N/A", teacher: "N/A", teacherNumber: "N/A" },
      { room: "209", name: "KG", section: "Carnation & Sunflower", version: "N/A", teacher: "N/A", teacherNumber: "N/A" },
      { room: "210", name: "KG", section: "Camillia & Bluebell", version: "N/A", teacher: "N/A", teacherNumber: "N/A" },
      { room: "211", name: "One", section: "Kha", version: "N/A", teacher: "N/A", teacherNumber: "N/A" },
      { room: "212", name: "Dance Room", section: "Special", version: "N/A", teacher: "N/A", teacherNumber: "N/A" }
    ]
  },
  {
    id: 'floor2',
    label: '2',
    name: '2nd Floor',
    color: '#059669',
    purpose: 'Class 1 (EV) & Class 2',
    totalRooms: 13,
    lifts: ['Boys Lift', 'Girls Lift'],
    facilities: ["Vice-Principal's Room", "Teachers Room", "EV Co-ordinator"],
    highlights: ["⭐ Room 309 — Vice Principal (Junior)", "⭐ Room 312 — Teacher's Room", "⭐ Room 313 — EV Co-ordinator (Junior)"],
    classes: [
      { room: "301", name: "One", section: "A", version: "English", teacher: "N/A", teacherNumber: "N/A" },
      { room: "302", name: "One", section: "B", version: "English", teacher: "N/A", teacherNumber: "N/A" },
      { room: "303", name: "One", section: "C", version: "English", teacher: "N/A", teacherNumber: "N/A" },
      { room: "304", name: "One", section: "D", version: "English", teacher: "N/A", teacherNumber: "N/A" },
      { room: "305", name: "Two", section: "Ka", version: "Bangla", teacher: "N/A", teacherNumber: "N/A" },
      { room: "306", name: "Two", section: "Kha", version: "Bangla", teacher: "N/A", teacherNumber: "N/A" },
      { room: "307", name: "Two", section: "Ga", version: "Bangla", teacher: "N/A", teacherNumber: "N/A" },
      { room: "308", name: "Two", section: "A", version: "English", teacher: "N/A", teacherNumber: "N/A" },
      { room: "310", name: "Two", section: "B", version: "English", teacher: "N/A", teacherNumber: "N/A" },
      { room: "311", name: "Two", section: "C", version: "English", teacher: "N/A", teacherNumber: "N/A" }
    ]
  },
  {
    id: 'floor3',
    label: '3',
    name: '3rd Floor',
    color: '#047857',
    purpose: 'Class 3 & Class 4',
    totalRooms: 13,
    lifts: ['Boys Lift', 'Girls Lift'],
    facilities: ["Teacher's Common Room"],
    highlights: ["⭐ Teacher's Common Room"],
    classes: [
      { room: "401", name: "Four", section: "Ka", version: "Bangla", teacher: "N/A", teacherNumber: "N/A" },
      { room: "402", name: "Four", section: "Kha", version: "Bangla", teacher: "N/A", teacherNumber: "N/A" },
      { room: "403", name: "Four", section: "Ga", version: "Bangla", teacher: "N/A", teacherNumber: "N/A" },
      { room: "404", name: "Four", section: "Gha", version: "Bangla", teacher: "N/A", teacherNumber: "N/A" },
      { room: "405", name: "Four", section: "A", version: "English", teacher: "N/A", teacherNumber: "N/A" },
      { room: "406", name: "Four", section: "B", version: "English", teacher: "N/A", teacherNumber: "N/A" },
      { room: "407", name: "Four", section: "C", version: "English", teacher: "N/A", teacherNumber: "N/A" },
      { room: "408", name: "Three", section: "Ka", version: "Bangla", teacher: "N/A", teacherNumber: "N/A" },
      { room: "409", name: "Three", section: "Kha", version: "Bangla", teacher: "N/A", teacherNumber: "N/A" },
      { room: "410", name: "Three", section: "Ga", version: "Bangla", teacher: "N/A", teacherNumber: "N/A" },
      { room: "411", name: "Three", section: "A", version: "English", teacher: "N/A", teacherNumber: "N/A" },
      { room: "412", name: "Three", section: "B", version: "English", teacher: "N/A", teacherNumber: "N/A" },
      { room: "413", name: "Three", section: "C", version: "English", teacher: "N/A", teacherNumber: "N/A" }
    ]
  },
  {
    id: 'floor4',
    label: '4',
    name: '4th Floor',
    color: '#3b82f6',
    purpose: 'English Version & Grade 5',
    totalRooms: 13,
    lifts: ['Boys Lift', 'Girls Lift', 'Teachers Lift'],
    facilities: ["Teacher's Common Room"],
    highlights: ["⭐ Teacher's Common Room"],
    classes: [
      { room: "501", name: "Six", section: "Ev", version: "English", teacher: "Afrin Nahar (AN)", teacherNumber: "N/A" },
      { room: "502", name: "Seven", section: "Ev", version: "English", teacher: "Tahmina Akter Shifa (TAS)", teacherNumber: "N/A" },
      { room: "503", name: "Eight", section: "Ev", version: "English", teacher: "Samiul Arefin (SA)", teacherNumber: "N/A" },
      { room: "504", name: "Nine", section: "Ev", version: "English", teacher: "Mohammad Mufakkir Alam (MMA)", teacherNumber: "N/A" },
      { room: "505", name: "Ten", section: "Ev", version: "English", teacher: "Masum Ahmed (MA)", teacherNumber: "N/A" },
      { room: "506", name: "Ten", section: "Ev (Extra Care)", version: "English", teacher: "MA & SA", teacherNumber: "N/A" },
      { room: "507", name: "Five", section: "Ka", version: "Bangla", teacher: "N/A", teacherNumber: "N/A" },
      { room: "508", name: "Five", section: "Kha", version: "Bangla", teacher: "N/A", teacherNumber: "N/A" },
      { room: "509", name: "Five", section: "Ga", version: "Bangla", teacher: "N/A", teacherNumber: "N/A" },
      { room: "510", name: "Five", section: "Gha", version: "Bangla", teacher: "N/A", teacherNumber: "N/A" },
      { room: "511", name: "Five", section: "Uwo", version: "Bangla", teacher: "N/A", teacherNumber: "N/A" },
      { room: "512", name: "Five", section: "A", version: "English", teacher: "N/A", teacherNumber: "N/A" },
      { room: "513", name: "Five", section: "B", version: "English", teacher: "Monika Asgar", teacherNumber: "N/A" }
    ]
  },
  {
    id: 'floor5',
    label: '5',
    name: '5th Floor',
    color: '#8b5cf6',
    purpose: 'Bangla Version Secondary',
    totalRooms: 13,
    lifts: ['Boys Lift', 'Girls Lift'],
    facilities: ["Teacher's Common Room", "Music/Religious Study Room"],
    highlights: ["⭐ Teacher's Common Room", "⭐ Room 613 — Music/Religious Room"],
    classes: [
      { room: "601", name: "Six", section: "B-1", version: "Bangla", teacher: "Tanjib Saifur Rahman (TSR)", teacherNumber: "N/A" },
      { room: "602", name: "Six", section: "B-2", version: "Bangla", teacher: "SM Kamal (SMK)", teacherNumber: "N/A" },
      { room: "603", name: "Seven", section: "B-1", version: "Bangla", teacher: "Farhana Faruk (FF)", teacherNumber: "N/A" },
      { room: "604", name: "Seven", section: "B-2", version: "Bangla", teacher: "Ashraful Islam (AI)", teacherNumber: "N/A" },
      { room: "605", name: "Eight", section: "B-1", version: "Bangla", teacher: "Mohidul Islam (MI)", teacherNumber: "N/A" },
      { room: "606", name: "Eight", section: "B-2", version: "Bangla", teacher: "Rezwana Binte Helal (RBH)", teacherNumber: "N/A" },
      { room: "607", name: "Six", section: "G-1", version: "Bangla", teacher: "Hoiponti Pal (HP)", teacherNumber: "N/A" },
      { room: "608", name: "Six", section: "G-2", version: "Bangla", teacher: "Morjina Akter (MAB)", teacherNumber: "N/A" },
      { room: "609", name: "Seven", section: "G-1", version: "Bangla", teacher: "Tamanna Sultana (TS)", teacherNumber: "N/A" },
      { room: "610", name: "Seven", section: "G-2", version: "Bangla", teacher: "Ismat Jahan (IJ)", teacherNumber: "N/A" },
      { room: "611", name: "Eight", section: "G-1", version: "Bangla", teacher: "Sharmin Sultana (SS)", teacherNumber: "N/A" },
      { room: "612", name: "Eight", section: "G-2", version: "Bangla", teacher: "Tania (TAT)", teacherNumber: "N/A" }
    ]
  },
  {
    id: 'floor6',
    label: '6',
    name: '6th Floor',
    color: '#f59e0b',
    purpose: 'Bangla Version (Secondary)',
    totalRooms: 13,
    lifts: ['Boys Lift', 'Girls Lift', 'Teachers Lift'],
    facilities: ["Control Room", "Teacher's Common Room"],
    highlights: ["⭐ Room 712 — Control Room", "⭐ Teacher's Common Room"],
    classes: [
      { room: "701", name: "Nine", section: "SB-1", version: "Bangla", teacher: "Shawon (AHS)", teacherNumber: "N/A" },
      { room: "702", name: "Nine", section: "SB-2", version: "Bangla", teacher: "Mahmudul Hasan (MMH)", teacherNumber: "N/A" },
      { room: "703", name: "Nine", section: "BB+Hum(B)", version: "Bangla", teacher: "Ali Akber (AA)", teacherNumber: "N/A" },
      { room: "704", name: "Ten", section: "SB", version: "Bangla", teacher: "Robiul Islam (RI)", teacherNumber: "N/A" },
      { room: "705", name: "Ten", section: "BB+Hum(B)", version: "Bangla", teacher: "Fatema (FTT)", teacherNumber: "N/A" },
      { room: "706", name: "Ten", section: "G (Special Care)", version: "Bangla", teacher: "N/A", teacherNumber: "N/A" },
      { room: "707", name: "Nine", section: "SG-1", version: "Bangla", teacher: "Lita (GAL)", teacherNumber: "N/A" },
      { room: "708", name: "Nine", section: "SG-2", version: "Bangla", teacher: "Nasima Begum (NB)", teacherNumber: "N/A" },
      { room: "709", name: "Nine", section: "BG+Hum(G)", version: "Bangla", teacher: "Sohela (STZ)", teacherNumber: "N/A" },
      { room: "710", name: "Ten", section: "SG-1", version: "Bangla", teacher: "Shaila Shirin (SSM)", teacherNumber: "N/A" },
      { room: "711", name: "Ten", section: "SG-2", version: "Bangla", teacher: "Nazmun Nahar (NN)", teacherNumber: "N/A" },
      { room: "713", name: "Ten", section: "BG+Hum(G)", version: "Bangla", teacher: "Sohela Parvin (SP)", teacherNumber: "N/A" }
    ]
  },
  {
    id: 'floor7',
    label: '7',
    name: '7th Floor',
    color: '#ef4444',
    purpose: 'Labs & Library',
    totalRooms: 10,
    lifts: ['Boys Lift', 'Girls Lift', 'Teachers Lift'],
    facilities: ["Labs", "Library", "Conference Room"],
    highlights: ["⭐ Room 801 — Senior Co-ordinator", "⭐ Vice Principal (Senior)"],
    classes: [
      { room: "802", name: "Biology Lab", section: "N/A", version: "N/A", teacher: "N/A", teacherNumber: "N/A" },
      { room: "803", name: "Chemistry Lab", section: "N/A", version: "N/A", teacher: "N/A", teacherNumber: "N/A" },
      { room: "804", name: "Physics Lab", section: "N/A", version: "N/A", teacher: "N/A", teacherNumber: "N/A" },
      { room: "805", name: "Computer Lab", section: "N/A", version: "N/A", teacher: "N/A", teacherNumber: "N/A" },
      { room: "806", name: "Library", section: "N/A", version: "N/A", teacher: "N/A", teacherNumber: "N/A" },
      { room: "807", name: "Digital Room 1", section: "N/A", version: "N/A", teacher: "N/A", teacherNumber: "N/A" },
      { room: "813", name: "Conference Room", section: "N/A", version: "N/A", teacher: "N/A", teacherNumber: "N/A" }
    ]
  },
  {
    id: 'floor8',
    label: '8',
    name: '8th Floor',
    color: '#f97316',
    purpose: 'College Section (11 & 12)',
    totalRooms: 13,
    lifts: ['Boys Lift', 'Girls Lift', 'Teachers Lift'],
    facilities: ["Exam Room", "Teacher's Room"],
    highlights: ["⭐ Room 913 — Teacher's Room", "⭐ Room 906 — Exam Room"],
    classes: [
      { room: "902", name: "Eleven", section: "Arts", version: "Bangla", teacher: "N/A", teacherNumber: "N/A" },
      { room: "903", name: "Eleven", section: "Commerce", version: "Bangla", teacher: "N/A", teacherNumber: "N/A" },
      { room: "904", name: "Eleven", section: "Science", version: "Bangla", teacher: "N/A", teacherNumber: "N/A" },
      { room: "905", name: "Eleven", section: "All", version: "English", teacher: "N/A", teacherNumber: "N/A" },
      { room: "907", name: "Twelve", section: "Science", version: "Bangla", teacher: "N/A", teacherNumber: "N/A" },
      { room: "908", name: "Twelve", section: "All", version: "English", teacher: "N/A", teacherNumber: "N/A" },
      { room: "909", name: "Twelve", section: "Commerce", version: "Bangla", teacher: "N/A", teacherNumber: "N/A" },
      { room: "910", name: "Twelve", section: "Arts", version: "Bangla", teacher: "N/A", teacherNumber: "N/A" }
    ]
  }
];