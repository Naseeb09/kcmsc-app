import { useState } from 'react';
import { Search, MapPin, ChevronLeft, Building } from 'lucide-react';
import { Card, CardContent } from '@/app/components/ui/card';

interface ClassSearchProps {
  onNavigate: (view: string) => void;
}

export function ClassSearch({ onNavigate }: ClassSearchProps) {
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);

  const levels = [
    { id: 'kg', name: 'Kindergarten (KG)', floor: 'Ground Floor', rooms: 'G-101, G-102' },
    { id: 'primary', name: 'Primary (Class 1-5)', floor: '1st - 2nd Floor', rooms: 'Rooms 101-208' },
    { id: 'secondary', name: 'Secondary (Class 6-10)', floor: '3rd - 5th Floor', rooms: 'Rooms 301-508' },
    { id: 'college', name: 'College (Class 11-12)', floor: '6th - 7th Floor', rooms: 'Rooms 601-708' },
  ];

  const classDetails = {
    kg: [
      { name: 'KG Section A', room: 'G-101', floor: 'Ground Floor', teacher: 'Ms. Emily Johnson' },
      { name: 'KG Section B', room: 'G-102', floor: 'Ground Floor', teacher: 'Ms. Sarah Williams' },
    ],
    primary: [
      { name: 'Class 1-A', room: '101', floor: '1st Floor', teacher: 'Mr. Michael Thompson' },
      { name: 'Class 1-B', room: '102', floor: '1st Floor', teacher: 'Ms. Jennifer Davis' },
      { name: 'Class 2-A', room: '103', floor: '1st Floor', teacher: 'Ms. Amanda Martinez' },
      { name: 'Class 3-A', room: '201', floor: '2nd Floor', teacher: 'Mr. Christopher Lee' },
      { name: 'Class 4-A', room: '202', floor: '2nd Floor', teacher: 'Ms. Jessica Taylor' },
      { name: 'Class 5-A', room: '203', floor: '2nd Floor', teacher: 'Ms. Elizabeth Clark' },
    ],
    secondary: [
      { name: 'Class 6-A', room: '301', floor: '3rd Floor', teacher: 'Mr. James Rodriguez' },
      { name: 'Class 7-A', room: '302', floor: '3rd Floor', teacher: 'Ms. Mary Lewis' },
      { name: 'Class 8-A', room: '401', floor: '4th Floor', teacher: 'Mr. William Walker' },
      { name: 'Class 9-A', room: '402', floor: '4th Floor', teacher: 'Ms. Lisa Anderson' },
      { name: 'Class 10-A', room: '501', floor: '5th Floor', teacher: 'Mr. David Wilson' },
    ],
    college: [
      { name: 'Class 11 (Science)', room: '601', floor: '6th Floor', teacher: 'Dr. Margaret Young' },
      { name: 'Class 11 (Commerce)', room: '602', floor: '6th Floor', teacher: 'Mr. Robert Harris' },
      { name: 'Class 12 (Science)', room: '701', floor: '7th Floor', teacher: 'Dr. Richard Foster' },
      { name: 'Class 12 (Arts)', room: '702', floor: '7th Floor', teacher: 'Ms. Karen Miller' },
    ],
  };

  return (
    <div className="pb-20 bg-[#0d1f0f] min-h-screen">
      {/* Header */}
      <div className="bg-[#1a2e1c] px-6 py-4 border-b border-[#059669]/20">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={() => selectedLevel ? setSelectedLevel(null) : onNavigate('home')}
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#1a3a1d] text-[#059669]"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex-1">
              <h1 className="text-lg font-medium text-[#e8f5e9]">
                {selectedLevel ? 'Class Details' : 'Search Classes'}
              </h1>
              <p className="text-[10px] text-[#a0b5a3] uppercase tracking-wide">
                {selectedLevel ? levels.find(l => l.id === selectedLevel)?.name : 'SELECT YOUR LEVEL'}
              </p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-[#059669]/20 flex items-center justify-center">
              <Search className="w-5 h-5 text-[#fbbf24]" />
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-6 max-w-2xl mx-auto">
        {!selectedLevel ? (
          /* Level Selection */
          <>
            <div className="mb-6">
              <h2 className="text-sm font-medium text-[#e8f5e9] mb-2">Select Class Level</h2>
              <p className="text-xs text-[#a0b5a3] leading-relaxed">
                Choose your level to view assigned floor numbers and room details.
              </p>
            </div>

            <div className="space-y-3">
              {levels.map((level) => (
                <Card
                  key={level.id}
                  onClick={() => setSelectedLevel(level.id)}
                  className="bg-[#1a3a1d] border border-[#059669]/20 hover:border-[#059669]/40 cursor-pointer transition-all"
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-[#059669]/20 flex items-center justify-center">
                          <Building className="w-6 h-6 text-[#fbbf24]" />
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-[#e8f5e9] mb-1">{level.name}</h3>
                          <p className="text-xs text-[#a0b5a3]">{level.floor}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="px-3 py-1 bg-[#059669]/20 rounded-lg mb-1">
                          <span className="text-xs font-medium text-[#059669]">{level.rooms}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        ) : (
          /* Class Details */
          <div className="space-y-3">
            {classDetails[selectedLevel as keyof typeof classDetails]?.map((classInfo, index) => (
              <Card key={index} className="bg-[#1a3a1d] border border-[#059669]/20">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-sm font-medium text-[#e8f5e9] mb-1">{classInfo.name}</h3>
                      <p className="text-xs text-[#a0b5a3]">Teacher: {classInfo.teacher}</p>
                    </div>
                    <div className="text-right">
                      <div className="inline-flex items-center gap-1 bg-[#047857] text-white px-2.5 py-1 rounded-lg text-xs font-medium mb-1">
                        <MapPin className="w-3 h-3" />
                        {classInfo.room}
                      </div>
                      <p className="text-[10px] text-[#a0b5a3]">{classInfo.floor}</p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#059669]/20">
                    <button
                      onClick={() => onNavigate('floors')}
                      className="w-full bg-[#059669] text-white rounded-lg py-2 px-4 text-xs font-medium hover:bg-[#047857] transition-colors"
                    >
                      View on Floor Map
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
