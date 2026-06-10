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
      { id: '1-201', room: "201", name: "One", section: "Ka", version: "English", teacher: "Farhana Akter", teacherNumber: "01711-223344" },
      { id: '1-202', room: "202", name: "Nursery", section: "Peacock & Bulbul", version: "N/A", teacher: "Nazmun Nahar", teacherNumber: "01711-556677" },
      { id: '1-203', room: "203", name: "Nursery", section: "Myna & Parrot", version: "N/A", teacher: "Tania Sultana", teacherNumber: "01711-889900" },
      { id: '1-204', room: "204", name: "Nursery", section: "Dove & Magpie", version: "N/A", teacher: "Mst. Rokeya Begum", teacherNumber: "01822-112233" },
      { id: '1-205', room: "205", name: "Nursery", section: "Swan & Sparrow", version: "N/A", teacher: "Shamima Nasrin", teacherNumber: "01822-445566" },
      { id: '1-206', room: "206", name: "Principal's Office", section: "Admin", version: "N/A", teacher: "Prof Md Abdul Baten", teacherNumber: "02-8999685" },
      { id: '1-207', room: "207", name: "KG", section: "Marigold", version: "N/A", teacher: "Lutfun Nahar", teacherNumber: "01822-778899" },
      { id: '1-209', room: "209", name: "KG", section: "Carnation & Sunflower", version: "N/A", teacher: "Fatema Tuz Zohra", teacherNumber: "01933-112233" },
      { id: '1-210', room: "210", name: "KG", section: "Camillia & Bluebell", version: "N/A", teacher: "Suraiya Begum", teacherNumber: "01933-445566" },
      { id: '1-211', room: "211", name: "One", section: "Kha", version: "N/A", teacher: "Jannatul Ferdous", teacherNumber: "01933-778899" },
      { id: '1-212', room: "212", name: "Dance Room", section: "Special", version: "N/A", teacher: "Anika Tabassum", teacherNumber: "01644-112233" }
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
      { id: '2-301', room: "301", name: "One", section: "A", version: "English", teacher: "Mahmuda Khatun", teacherNumber: "01644-445566" },
      { id: '2-302', room: "302", name: "One", section: "B", version: "English", teacher: "Sultana Razia", teacherNumber: "01644-778899" },
      { id: '2-303', room: "303", name: "One", section: "C", version: "English", teacher: "Nasrin Sultana", teacherNumber: "01555-112233" },
      { id: '2-304', room: "304", name: "One", section: "D", version: "English", teacher: "Afroza Akter", teacherNumber: "01555-445566" },
      { id: '2-305', room: "305", name: "Two", section: "Ka", version: "Bangla", teacher: "Rasheda Begum", teacherNumber: "01555-778899" },
      { id: '2-306', room: "306", name: "Two", section: "Kha", version: "Bangla", teacher: "Sabina Yasmin", teacherNumber: "01766-112233" },
      { id: '2-307', room: "307", name: "Two", section: "Ga", version: "Bangla", teacher: "Kohinoor Akter", teacherNumber: "01766-445566" },
      { id: '2-308', room: "308", name: "Two", section: "A", version: "English", teacher: "Tahmina Begum", teacherNumber: "01766-778899" },
      { id: '2-310', room: "310", name: "Two", section: "B", version: "English", teacher: "Sharmin Akter", teacherNumber: "01877-112233" },
      { id: '2-311', room: "311", name: "Two", section: "C", version: "English", teacher: "Lutfunnessa", teacherNumber: "01877-445566" }
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
      { id: '3-401', room: "401", name: "Four", section: "Ka", version: "Bangla", teacher: "Shahina Akter", teacherNumber: "01877-778899" },
      { id: '3-402', room: "402", name: "Four", section: "Kha", version: "Bangla", teacher: "Begum Khaleda", teacherNumber: "01988-112233" },
      { id: '3-403', room: "403", name: "Four", section: "Ga", version: "Bangla", teacher: "Hosne Ara", teacherNumber: "01988-445566" },
      { id: '3-404', room: "404", name: "Four", section: "Gha", version: "Bangla", teacher: "Rowshan Ara", teacherNumber: "01988-778899" },
      { id: '3-405', room: "405", name: "Four", section: "A", version: "English", teacher: "Nurjahan Begum", teacherNumber: "01699-112233" },
      { id: '3-406', room: "406", name: "Four", section: "B", version: "English", teacher: "Hamida Begum", teacherNumber: "01699-445566" },
      { id: '3-407', room: "407", name: "Four", section: "C", version: "English", teacher: "Meherunnessa", teacherNumber: "01699-778899" },
      { id: '3-408', room: "408", name: "Three", section: "Ka", version: "Bangla", teacher: "Zohra Khatun", teacherNumber: "01722-113355" },
      { id: '3-409', room: "409", name: "Three", section: "Kha", version: "Bangla", teacher: "Amena Begum", teacherNumber: "01722-224466" },
      { id: '3-410', room: "410", name: "Three", section: "Ga", version: "Bangla", teacher: "Khurshida Begum", teacherNumber: "01722-335577" },
      { id: '3-411', room: "411", name: "Three", section: "A", version: "English", teacher: "Ayesha Siddiqua", teacherNumber: "01722-446688" },
      { id: '3-412', room: "412", name: "Three", section: "B", version: "English", teacher: "Fatema Khatun", teacherNumber: "01722-557799" },
      { id: '3-413', room: "413", name: "Three", section: "C", version: "English", teacher: "Rabeya Basri", teacherNumber: "01833-114477" }
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
      { id: '4-501', room: "501", name: "Six", section: "Ev", version: "English", teacher: "Afrin Nahar (AN)", teacherNumber: "01833-225588" },
      { id: '4-502', room: "502", name: "Seven", section: "Ev", version: "English", teacher: "Tahmina Akter Shifa (TAS)", teacherNumber: "01833-336699" },
      { id: '4-503', room: "503", name: "Eight", section: "Ev", version: "English", teacher: "Samiul Arefin (SA)", teacherNumber: "01944-115599" },
      { id: '4-504', room: "504", name: "Nine", section: "Ev", version: "English", teacher: "Mohammad Mufakkir Alam (MMA)", teacherNumber: "01944-226600" },
      { id: '4-505', room: "505", name: "Ten", section: "Ev", version: "English", teacher: "Masum Ahmed (MA)", teacherNumber: "01944-337711" },
      { id: '4-506', room: "506", name: "Ten", section: "Ev (Extra Care)", version: "English", teacher: "Masum Ahmed & Samiul Arefin", teacherNumber: "01944-448822" },
      { id: '4-507', room: "507", name: "Five", section: "Ka", version: "Bangla", teacher: "Dilruba Akter", teacherNumber: "01944-559933" },
      { id: '4-508', room: "508", name: "Five", section: "Kha", version: "Bangla", teacher: "Razia Sultana", teacherNumber: "01655-116622" },
      { id: '4-509', room: "509", name: "Five", section: "Ga", version: "Bangla", teacher: "Nargis Akter", teacherNumber: "01655-227733" },
      { id: '4-510', room: "510", name: "Five", section: "Gha", version: "Bangla", teacher: "Parvin Akter", teacherNumber: "01655-338844" },
      { id: '4-511', room: "511", name: "Five", section: "Uwo", version: "Bangla", teacher: "Rina Begum", teacherNumber: "01655-449955" },
      { id: '4-512', room: "512", name: "Five", section: "A", version: "English", teacher: "Sumi Akter", teacherNumber: "01566-117733" },
      { id: '4-513', room: "513", name: "Five", section: "B", version: "English", teacher: "Monika Asgar", teacherNumber: "01566-228844" }
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
      { id: '5-601', room: "601", name: "Six", section: "B-1", version: "Bangla", teacher: "Tanjib Saifur Rahman (TSR)", teacherNumber: "01566-339955" },
      { id: '5-602', room: "602", name: "Six", section: "B-2", version: "Bangla", teacher: "SM Kamal (SMK)", teacherNumber: "01777-118844" },
      { id: '5-603', room: "603", name: "Seven", section: "B-1", version: "Bangla", teacher: "Farhana Faruk (FF)", teacherNumber: "01777-229955" },
      { id: '5-604', room: "604", name: "Seven", section: "B-2", version: "Bangla", teacher: "Ashraful Islam (AI)", teacherNumber: "01777-330066" },
      { id: '5-605', room: "605", name: "Eight", section: "B-1", version: "Bangla", teacher: "Mohidul Islam (MI)", teacherNumber: "01888-119955" },
      { id: '5-606', room: "606", name: "Eight", section: "B-2", version: "Bangla", teacher: "Rezwana Binte Helal (RBH)", teacherNumber: "01888-220066" },
      { id: '5-607', room: "607", name: "Six", section: "G-1", version: "Bangla", teacher: "Hoiponti Pal (HP)", teacherNumber: "01888-331177" },
      { id: '5-608', room: "608", name: "Six", section: "G-2", version: "Bangla", teacher: "Morjina Akter (MAB)", teacherNumber: "01999-112288" },
      { id: '5-609', room: "609", name: "Seven", section: "G-1", version: "Bangla", teacher: "Tamanna Sultana (TS)", teacherNumber: "01999-223399" },
      { id: '5-610', room: "610", name: "Seven", section: "G-2", version: "Bangla", teacher: "Ismat Jahan (IJ)", teacherNumber: "01999-334400" },
      { id: '5-611', room: "611", name: "Eight", section: "G-1", version: "Bangla", teacher: "Sharmin Sultana (SS)", teacherNumber: "01622-113399" },
      { id: '5-612', room: "612", name: "Eight", section: "G-2", version: "Bangla", teacher: "Tania (TAT)", teacherNumber: "01622-224400" }
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
      { id: '6-701', room: "701", name: "Nine", section: "SB-1", version: "Bangla", teacher: "Shawon (AHS)", teacherNumber: "01622-335511" },
      { id: '6-702', room: "702", name: "Nine", section: "SB-2", version: "Bangla", teacher: "Mahmudul Hasan (MMH)", teacherNumber: "01733-114422" },
      { id: '6-703', room: "703", name: "Nine", section: "BB+Hum(B)", version: "Bangla", teacher: "Ali Akber (AA)", teacherNumber: "01733-225533" },
      { id: '6-704', room: "704", name: "Ten", section: "SB", version: "Bangla", teacher: "Robiul Islam (RI)", teacherNumber: "01733-336644" },
      { id: '6-705', room: "705", name: "Ten", section: "BB+Hum(B)", version: "Bangla", teacher: "Fatema (FTT)", teacherNumber: "01844-115533" },
      { id: '6-706', room: "706", name: "Ten", section: "G (Special Care)", version: "Bangla", teacher: "Mufakkir Alam", teacherNumber: "01844-226644" },
      { id: '6-707', room: "707", name: "Nine", section: "SG-1", version: "Bangla", teacher: "Lita (GAL)", teacherNumber: "01844-337755" },
      { id: '6-708', room: "708", name: "Nine", section: "SG-2", version: "Bangla", teacher: "Nasima Begum (NB)", teacherNumber: "01955-116633" },
      { id: '6-709', room: "709", name: "Nine", section: "BG+Hum(G)", version: "Bangla", teacher: "Sohela (STZ)", teacherNumber: "01955-227744" },
      { id: '6-710', room: "710", name: "Ten", section: "SG-1", version: "Bangla", teacher: "Shaila Shirin (SSM)", teacherNumber: "01955-338855" },
      { id: '6-711', room: "711", name: "Ten", section: "SG-2", version: "Bangla", teacher: "Nazmun Nahar (NN)", teacherNumber: "01577-118833" },
      { id: '6-713', room: "713", name: "Ten", section: "BG+Hum(G)", version: "Bangla", teacher: "Sohela Parvin (SP)", teacherNumber: "01577-229944" }
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
      { id: '7-802', room: "802", name: "Biology Lab", section: "Lab", version: "N/A", teacher: "Md. Harun Or Rashid", teacherNumber: "01577-330055" },
      { id: '7-803', room: "803", name: "Chemistry Lab", section: "Lab", version: "N/A", teacher: "Md. Mostofa Kamal", teacherNumber: "01788-119944" },
      { id: '7-804', room: "804", name: "Physics Lab", section: "Lab", version: "N/A", teacher: "Md. Abul Kashem", teacherNumber: "01788-220055" },
      { id: '7-805', room: "805", name: "Computer Lab", section: "Lab", version: "N/A", teacher: "Md. Sahidul Islam", teacherNumber: "01788-331166" },
      { id: '7-806', room: "806", name: "Library", section: "Library", version: "N/A", teacher: "Md. Abdul Latif", teacherNumber: "01899-112255" },
      { id: '7-807', room: "807", name: "Digital Room 1", section: "Special", version: "N/A", teacher: "Md. Jahangir Alam", teacherNumber: "01899-223366" },
      { id: '7-813', room: "813", name: "Conference Room", section: "Meeting", version: "N/A", teacher: "Md. Ruhul Amin", teacherNumber: "01899-334477" }
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
      { id: '8-902', room: "902", name: "Eleven", section: "Arts", version: "Bangla", teacher: "Md. Shahjalal", teacherNumber: "01911-112266" },
      { id: '8-903', room: "903", name: "Eleven", section: "Commerce", version: "Bangla", teacher: "Md. Mizanur Rahman", teacherNumber: "01911-223377" },
      { id: '8-904', room: "904", name: "Eleven", section: "Science", version: "Bangla", teacher: "Md. Abu Bakar Siddique", teacherNumber: "01911-334488" },
      { id: '8-905', room: "905", name: "Eleven", section: "All", version: "English", teacher: "Md. Habibur Rahman", teacherNumber: "01633-114466" },
      { id: '8-907', room: "907", name: "Twelve", section: "Science", version: "Bangla", teacher: "Md. Ismail Hossain", teacherNumber: "01633-225577" },
      { id: '8-908', room: "908", name: "Twelve", section: "All", version: "English", teacher: "Md. Aminul Islam", teacherNumber: "01633-336688" },
      { id: '8-909', room: "909", name: "Twelve", section: "Commerce", version: "Bangla", teacher: "Md. Shafiqul Islam", teacherNumber: "01744-115577" },
      { id: '8-910', room: "910", name: "Twelve", section: "Arts", version: "Bangla", teacher: "Md. Saiful Islam", teacherNumber: "01744-226688" }
    ]
  }
];