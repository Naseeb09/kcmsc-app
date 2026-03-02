import { Building2, Info, Phone, Settings, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/app/components/ui/card';
import { schoolInfo } from '@/data/mockData';

interface MoreScreenProps {
  onNavigate: (view: string) => void;
}

export function MoreScreen({ onNavigate }: MoreScreenProps) {
  const moreItems = [
    { id: 'facilities', label: 'Facilities', icon: Building2, description: 'Explore our campus facilities', color: 'bg-orange-500' },
    { id: 'about', label: 'About School', icon: Info, description: 'History, mission & announcements', color: 'bg-teal-500' },
    { id: 'contact', label: 'Contact Us', icon: Phone, description: 'Get in touch with us', color: 'bg-rose-500' },
  ];

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 text-white px-6 py-6">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-xl font-semibold mb-2">More Information</h1>
          <p className="text-indigo-50 text-sm">
            Additional resources and information about {schoolInfo.name}
          </p>
        </div>
      </div>

      {/* Menu Items */}
      <div className="px-6 py-6 max-w-2xl mx-auto space-y-3">
        {moreItems.map((item) => {
          const Icon = item.icon;
          return (
            <Card
              key={item.id}
              className="cursor-pointer hover:shadow-md transition-all border-gray-200"
              onClick={() => onNavigate(item.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className={`${item.color} w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 mb-0.5">{item.label}</h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Info */}
      <div className="px-6 max-w-2xl mx-auto">
        <Card className="bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200">
          <CardContent className="p-5">
            <h3 className="font-semibold text-gray-900 mb-3">Quick Information</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Established</span>
                <span className="font-medium text-gray-900">{schoolInfo.established}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Students</span>
                <span className="font-medium text-gray-900">{schoolInfo.totalStudents}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Class Ratio</span>
                <span className="font-medium text-gray-900">{schoolInfo.studentTeacherRatio}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Grade Levels</span>
                <span className="font-medium text-gray-900">{schoolInfo.grades}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* App Info */}
      <div className="px-6 py-6 max-w-2xl mx-auto text-center">
        <p className="text-xs text-gray-500 mb-1">School Guide Tour App</p>
        <p className="text-xs text-gray-400">Version 1.0.0 • © 2026 {schoolInfo.name}</p>
      </div>
    </div>
  );
}
