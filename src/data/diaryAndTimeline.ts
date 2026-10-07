import diary1Img from './diaries/diary_2026_02_05.png';
import diary2Img from './diaries/diary_2026_03_31.png';

export interface DiaryEntry {
  period: string;
  subject: string;
  subjectFullName: string;
  topic: string;
  type: 'HW' | 'CW' | 'CT' | 'Learn' | 'Proxy' | 'Lecture';
  teacherSigned: boolean;
}

export interface StudentDiary {
  id: string;
  date: string;
  displayDate: string;
  day: string;
  title: string;
  scannedImage: string;
  notice?: string;
  formTeacherSigned: boolean;
  guardianSigned: boolean;
  entries: DiaryEntry[];
}

export const sampleDiaries: StudentDiary[] = [
  {
    id: 'diary-2026-02-05',
    date: '2026-02-05',
    displayDate: '05 / 02 / 2026',
    day: 'Thursday',
    title: 'Class Activities / Daily Notes',
    scannedImage: diary1Img,
    notice: 'Regular school timing tomorrow. All assignments must be signed by guardian.',
    formTeacherSigned: true,
    guardianSigned: true,
    entries: [
      {
        period: '1st',
        subject: 'Phy',
        subjectFullName: 'Physics',
        topic: 'Relation between α, β and γ (L)',
        type: 'Lecture',
        teacherSigned: true
      },
      {
        period: '2nd',
        subject: 'B.G.S',
        subjectFullName: 'Bangladesh & Global Studies',
        topic: 'C.T on next Monday Ch: 7 (CQ + 3 S/Q + 4 KBQ)',
        type: 'CT',
        teacherSigned: true
      },
      {
        period: '3rd',
        subject: 'B₂',
        subjectFullName: 'Bangla 2nd Paper',
        topic: 'অনুচ্ছেদ: রেলগাড়ি (পড়া)',
        type: 'Learn',
        teacherSigned: true
      },
      {
        period: '4th',
        subject: 'Che',
        subjectFullName: 'Chemistry',
        topic: 'Proxy Class (NAN)',
        type: 'Proxy',
        teacherSigned: true
      },
      {
        period: '5th',
        subject: 'G. Math',
        subjectFullName: 'General Mathematics',
        topic: 'Ex: 13.1 NO: (5-15) ➔ H.W',
        type: 'HW',
        teacherSigned: true
      },
      {
        period: '6th',
        subject: 'Bio',
        subjectFullName: 'Biology',
        topic: 'Male Gamete and Female Gamete Development (L)',
        type: 'Lecture',
        teacherSigned: true
      }
    ]
  },
  {
    id: 'diary-2026-03-31',
    date: '2026-03-31',
    displayDate: '31 / 03 / 2026',
    day: 'Tuesday',
    title: 'Class Activities / Daily Notes',
    scannedImage: diary2Img,
    notice: 'Prepare for upcoming revision tests. Ensure homework copies are submitted.',
    formTeacherSigned: true,
    guardianSigned: true,
    entries: [
      {
        period: '1st',
        subject: 'G. Math',
        subjectFullName: 'General Mathematics',
        topic: 'H.W: Ex: 8.5 ➔ NO: (9-16)',
        type: 'HW',
        teacherSigned: true
      },
      {
        period: '2nd',
        subject: 'R.S.T',
        subjectFullName: 'Religion & Moral Studies',
        topic: 'Chapter: 02 ➔ Lesson - 01, 02 Make 15 S/Q (H.W)',
        type: 'HW',
        teacherSigned: true
      },
      {
        period: '3rd',
        subject: 'E₁',
        subjectFullName: 'English 1st Paper',
        topic: 'Return of the Natives - Full M/Q (H.W)',
        type: 'HW',
        teacherSigned: true
      },
      {
        period: '4th',
        subject: 'Che',
        subjectFullName: 'Chemistry',
        topic: 'C.W (Learn) ➔ Ch-11',
        type: 'Learn',
        teacherSigned: true
      },
      {
        period: '5th',
        subject: 'B.G.S',
        subjectFullName: 'Bangladesh & Global Studies',
        topic: 'Page: 130 (Learn) (129)',
        type: 'Learn',
        teacherSigned: true
      },
      {
        period: '6th',
        subject: 'Phy',
        subjectFullName: 'Physics',
        topic: "Coulomb's Law (Learn)",
        type: 'Learn',
        teacherSigned: true
      }
    ]
  }
];

export interface TimelineEventItem {
  id: string;
  date: string; // ISO format: YYYY-MM-DD
  dayDisplay: string; // "9 Sep, Wed"
  dayName: string; // "Wed"
  dayNumber: number; // 9
  monthName: string; // "Sep"
  events: string[];
  category: 'conference' | 'meeting' | 'exam' | 'event' | 'holiday' | 'vacation';
  highlight?: boolean;
}

export const academicTimelineEvents: TimelineEventItem[] = [
  {
    id: 'tl-1',
    date: '2026-09-09',
    dayDisplay: '9 Sep, Wed',
    dayName: 'Wed',
    dayNumber: 9,
    monthName: 'Sep',
    events: ['Coordination Conference'],
    category: 'conference'
  },
  {
    id: 'tl-2',
    date: '2026-09-10',
    dayDisplay: '10 Sep, Thu',
    dayName: 'Thu',
    dayNumber: 10,
    monthName: 'Sep',
    events: ['Parents Meeting-Play Group'],
    category: 'meeting'
  },
  {
    id: 'tl-3',
    date: '2026-09-14',
    dayDisplay: '14 Sep, Mon',
    dayName: 'Mon',
    dayNumber: 14,
    monthName: 'Sep',
    events: [
      'Mid Term-2 Class VI-IX Starts',
      'Mid Term-2 I-V Starts'
    ],
    category: 'exam'
  },
  {
    id: 'tl-4',
    date: '2026-09-15',
    dayDisplay: '15 Sep, Tue',
    dayName: 'Tue',
    dayNumber: 15,
    monthName: 'Sep',
    events: ['Parents Meeting Class X'],
    category: 'meeting'
  },
  {
    id: 'tl-5',
    date: '2026-09-16',
    dayDisplay: '16 Sep, Wed',
    dayName: 'Wed',
    dayNumber: 16,
    monthName: 'Sep',
    events: ['Coordination Conference'],
    category: 'conference'
  },
  {
    id: 'tl-6',
    date: '2026-09-17',
    dayDisplay: '17 Sep, Thu',
    dayName: 'Thu',
    dayNumber: 17,
    monthName: 'Sep',
    events: ['Science Fair & Club Display'],
    category: 'event',
    highlight: true
  },
  {
    id: 'tl-7',
    date: '2026-09-19',
    dayDisplay: '19 Sep, Sat',
    dayName: 'Sat',
    dayNumber: 19,
    monthName: 'Sep',
    events: ['Teachers Training (Sr & Jr Wing Combined)'],
    category: 'conference'
  },
  {
    id: 'tl-8',
    date: '2026-09-21',
    dayDisplay: '21 Sep, Mon',
    dayName: 'Mon',
    dayNumber: 21,
    monthName: 'Sep',
    events: ['Mid Term-2 Class VI-IX Ends'],
    category: 'exam'
  },
  {
    id: 'tl-9',
    date: '2026-09-23',
    dayDisplay: '23 Sep, Wed',
    dayName: 'Wed',
    dayNumber: 23,
    monthName: 'Sep',
    events: ['Coordination Conference'],
    category: 'conference'
  },
  {
    id: 'tl-10',
    date: '2026-09-24',
    dayDisplay: '24 Sep, Thu',
    dayName: 'Thu',
    dayNumber: 24,
    monthName: 'Sep',
    events: ['Fateha-E-Yeajdaham'],
    category: 'holiday'
  },
  {
    id: 'tl-11',
    date: '2026-09-27',
    dayDisplay: '27 Sep, Sun',
    dayName: 'Sun',
    dayNumber: 27,
    monthName: 'Sep',
    events: [
      'Class Assessment-3 Play-KG Starts',
      'Mid Term-2 I-V Ends'
    ],
    category: 'exam'
  },
  {
    id: 'tl-12',
    date: '2026-09-30',
    dayDisplay: '30 Sep, Wed',
    dayName: 'Wed',
    dayNumber: 30,
    monthName: 'Sep',
    events: ['Coordination Conference'],
    category: 'conference'
  },
  {
    id: 'tl-13',
    date: '2026-10-07',
    dayDisplay: '7 Oct, Wed',
    dayName: 'Wed',
    dayNumber: 7,
    monthName: 'Oct',
    events: ['Coordination Conference'],
    category: 'conference'
  },
  {
    id: 'tl-14',
    date: '2026-10-08',
    dayDisplay: '8 Oct, Thu',
    dayName: 'Thu',
    dayNumber: 8,
    monthName: 'Oct',
    events: ['Result Mid Term-2 VI-IX'],
    category: 'exam',
    highlight: true
  },
  {
    id: 'tl-15',
    date: '2026-10-11',
    dayDisplay: '11 Oct, Sun',
    dayName: 'Sun',
    dayNumber: 11,
    monthName: 'Oct',
    events: ['Parents Meeting XI New'],
    category: 'meeting'
  },
  {
    id: 'tl-16',
    date: '2026-10-14',
    dayDisplay: '14 Oct, Wed',
    dayName: 'Wed',
    dayNumber: 14,
    monthName: 'Oct',
    events: ['Coordination Conference'],
    category: 'conference'
  },
  {
    id: 'tl-17',
    date: '2026-10-18',
    dayDisplay: '18 Oct, Sun',
    dayName: 'Sun',
    dayNumber: 18,
    monthName: 'Oct',
    events: ['Durga Puja Vacation Starts'],
    category: 'vacation',
    highlight: true
  },
  {
    id: 'tl-18',
    date: '2026-10-19',
    dayDisplay: '19 Oct, Mon',
    dayName: 'Mon',
    dayNumber: 19,
    monthName: 'Oct',
    events: ['Durga Puja Vacation'],
    category: 'vacation'
  },
  {
    id: 'tl-19',
    date: '2026-10-20',
    dayDisplay: '20 Oct, Tue',
    dayName: 'Tue',
    dayNumber: 20,
    monthName: 'Oct',
    events: ['Durga Puja Vacation'],
    category: 'vacation'
  },
  {
    id: 'tl-20',
    date: '2026-10-21',
    dayDisplay: '21 Oct, Wed',
    dayName: 'Wed',
    dayNumber: 21,
    monthName: 'Oct',
    events: [
      'Durga Puja Vacation',
      'Bijoy Dashami'
    ],
    category: 'vacation'
  },
  {
    id: 'tl-21',
    date: '2026-10-22',
    dayDisplay: '22 Oct, Thu',
    dayName: 'Thu',
    dayNumber: 22,
    monthName: 'Oct',
    events: ['Durga Puja Vacation'],
    category: 'vacation'
  },
  {
    id: 'tl-22',
    date: '2026-10-23',
    dayDisplay: '23 Oct, Fri',
    dayName: 'Fri',
    dayNumber: 23,
    monthName: 'Oct',
    events: ['Durga Puja Vacation'],
    category: 'vacation'
  },
  {
    id: 'tl-23',
    date: '2026-10-24',
    dayDisplay: '24 Oct, Sat',
    dayName: 'Sat',
    dayNumber: 24,
    monthName: 'Oct',
    events: ['Durga Puja Vacation'],
    category: 'vacation'
  },
  {
    id: 'tl-24',
    date: '2026-10-25',
    dayDisplay: '25 Oct, Sun',
    dayName: 'Sun',
    dayNumber: 25,
    monthName: 'Oct',
    events: [
      'Durga Puja Vacation Ends',
      'Laxmi Puja'
    ],
    category: 'vacation'
  },
  {
    id: 'tl-25',
    date: '2026-10-26',
    dayDisplay: '26 Oct, Mon',
    dayName: 'Mon',
    dayNumber: 26,
    monthName: 'Oct',
    events: ['Re-opens after Puja Vacation'],
    category: 'event',
    highlight: true
  },
  {
    id: 'tl-26',
    date: '2026-10-28',
    dayDisplay: '28 Oct, Wed',
    dayName: 'Wed',
    dayNumber: 28,
    monthName: 'Oct',
    events: [
      'Coordination Conference',
      'Mid Term-1 XI Starts',
      'Test X Starts'
    ],
    category: 'exam'
  },
  {
    id: 'tl-27',
    date: '2026-10-29',
    dayDisplay: '29 Oct, Thu',
    dayName: 'Thu',
    dayNumber: 29,
    monthName: 'Oct',
    events: [
      'CT-4 VI-IX Starts',
      'Pre Test XII Starts'
    ],
    category: 'exam'
  },
  {
    id: 'tl-28',
    date: '2026-10-31',
    dayDisplay: '31 Oct, Sat',
    dayName: 'Sat',
    dayNumber: 31,
    monthName: 'Oct',
    events: ["Teacher's Day Celebration"],
    category: 'event',
    highlight: true
  }
];
