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
    facilities: ["Principal's Room", "Chairman's Room", "Dance Room"],
    classes: [
      { room: "201", name: "One", section: "Ka", version: "English", teacher: "N/A", teacherNumber: "N/A" },
      { room: "202", name: "Nursery", section: "Peacock & Bulbul", version: "N/A", teacher: "N/A", teacherNumber: "N/A" },
      { room: "206", name: "Principal's Office", section: "Admin", version: "N/A", teacher: "N/A", teacherNumber: "N/A" },
      { room: "211", name: "One", section: "Kha", version: "Bangla", teacher: "N/A", teacherNumber: "N/A" }
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
    classes: [
      { room: "501", name: "Six", section: "Ev", version: "English", teacher: "Afrin Nahar (AN)", teacherNumber: "N/A" },
      { room: "502", name: "Seven", section: "Ev", version: "English", teacher: "Tahmina Akter Shifa (TAS)", teacherNumber: "N/A" },
      { room: "503", name: "Eight", section: "Ev", version: "English", teacher: "Samiul Arefin (SA)", teacherNumber: "N/A" },
      { room: "504", name: "Nine", section: "Ev", version: "English", teacher: "Mohammad Mufakkir Alam (MMA)", teacherNumber: "N/A" },
      { room: "505", name: "Ten", section: "Ev", version: "English", teacher: "Masum Ahmed (MA)", teacherNumber: "N/A" },
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
    classes: [
      { room: "601", name: "Six", section: "B-1", version: "Bangla", teacher: "Tanjib Saifur Rahman (TSR)", teacherNumber: "N/A" },
      { room: "602", name: "Six", section: "B-2", version: "Bangla", teacher: "SM Kamal (SMK)", teacherNumber: "N/A" },
      { room: "603", name: "Seven", section: "B-1", version: "Bangla", teacher: "Farhana Faruk (FF)", teacherNumber: "N/A" },
      { room: "607", name: "Six", section: "G-1", version: "Bangla", teacher: "Hoiponti Pal (HP)", teacherNumber: "N/A" }
    ]
  },
  {
    id: 'floor6',
    label: '6',
    name: '6th Floor',
    color: '#f59e0b',
    purpose: 'Bangla Version (Boys & Girls)',
    totalRooms: 13,
    lifts: ['Boys Lift', 'Girls Lift', 'Teachers Lift'],
    facilities: ["Control Room", "Teacher's Common Room"],
    classes: [
      { room: "701", name: "Nine", section: "SB-1", version: "Bangla", teacher: "Shawon (AHS)", teacherNumber: "N/A" },
      { room: "702", name: "Nine", section: "SB-2", version: "Bangla", teacher: "Mahmudul Hasan (MMH)", teacherNumber: "N/A" },
      { room: "704", name: "Ten", section: "SB", version: "Bangla", teacher: "Robiul Islam (RI)", teacherNumber: "N/A" },
      { room: "710", name: "Ten", section: "SG-1", version: "Bangla", teacher: "Shaila Shirin (SSM)", teacherNumber: "N/A" },
      { room: "713", name: "Ten", section: "BG+Hum(G)", version: "Bangla", teacher: "Sohela Parvin (SP)", teacherNumber: "N/A" }
    ]
  }
];