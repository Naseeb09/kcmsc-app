import { Info, History, Target, Eye, Heart, Award, Megaphone, ChevronLeft } from 'lucide-react';
import { Card, CardContent } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Separator } from '@/app/components/ui/separator';
import { schoolInfo } from '@/data/announcements';
import { useAppContext } from '@/context/AppContext';

interface SchoolInfoProps {
  onNavigate: (view: string) => void;
}

export function SchoolInfo({ onNavigate }: SchoolInfoProps) {
  const { notices } = useAppContext();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-red-500/30 bg-red-500/10';
      case 'medium':
        return 'border-amber-500/30 bg-amber-500/10';
      default:
        return 'border-blue-500/30 bg-blue-500/10';
    }
  };

  const getPriorityBadgeColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500/20 text-red-400';
      case 'medium':
        return 'bg-amber-500/20 text-amber-400';
      default:
        return 'bg-blue-500/20 text-blue-400';
    }
  };

  return (
    <div className="pb-20 bg-[#0d1f0f] min-h-screen">
      {/* Header */}
      <div className="bg-[#1a2e1c] px-6 py-4 border-b border-[#059669]/20">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={() => onNavigate('home')}
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#1a3a1d] text-[#059669]"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex-1">
              <h1 className="text-lg font-medium text-[#e8f5e9]">About Our School</h1>
              <p className="text-[10px] text-[#a0b5a3] uppercase tracking-wide">HISTORY, MISSION & VALUES</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-[#059669]/20 flex items-center justify-center">
              <Info className="w-5 h-5 text-[#fbbf24]" />
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-6 max-w-2xl mx-auto space-y-4">
        {/* School Overview */}
        <Card className="bg-[#1a3a1d] border border-[#059669]/20">
          <CardContent className="p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-[#059669]/20 rounded-xl flex items-center justify-center">
                <History className="w-6 h-6 text-[#fbbf24]" />
              </div>
              <div>
                <h2 className="font-semibold text-white">{schoolInfo.name}</h2>
                <p className="text-sm text-[#a0b5a3]">Established <span className="text-[#e8f5e9] font-medium">{schoolInfo.established}</span></p>
              </div>
            </div>
            <p className="text-sm text-[#a0b5a3] leading-relaxed mb-3">{schoolInfo.about}</p>
            <div className="pt-3 border-t border-[#059669]/20">
              <p className="text-sm text-[#059669] italic font-medium">"{schoolInfo.motto}"</p>
            </div>
          </CardContent>
        </Card>

        {/* Mission */}
        <Card className="bg-[#1a3a1d] border border-[#059669]/20">
          <CardContent className="p-5">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-[#059669]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Target className="w-5 h-5 text-[#fbbf24]" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-white mb-2">Our Mission</h3>
                <p className="text-sm text-[#a0b5a3] leading-relaxed">{schoolInfo.mission}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Vision */}
        <Card className="bg-[#1a3a1d] border border-[#059669]/20">
          <CardContent className="p-5">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-[#059669]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Eye className="w-5 h-5 text-[#fbbf24]" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-white mb-2">Our Vision</h3>
                <p className="text-sm text-[#a0b5a3] leading-relaxed">{schoolInfo.vision}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Core Values */}
        <Card className="bg-[#1a3a1d] border border-[#059669]/20">
          <CardContent className="p-5">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 bg-[#059669]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Heart className="w-5 h-5 text-[#fbbf24]" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-white">Core Values</h3>
              </div>
            </div>
            <ul className="space-y-2">
              {schoolInfo.values.map((value, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <span className="text-[#059669] mt-0.5">•</span>
                  <span className="text-[#a0b5a3]">{value}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Key Information */}
        <Card className="bg-[#1a3a1d] border border-[#059669]/20">
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <Award className="w-5 h-5 text-[#fbbf24]" />
              <h3 className="font-semibold text-white">Key Information</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-[#a0b5a3]">Grade Levels</span>
                <Badge className="bg-[#059669]/20 text-[#e8f5e9] border-0 font-medium">
                  {schoolInfo.grades}
                </Badge>
              </div>
              <Separator className="bg-[#059669]/20" />
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-[#a0b5a3]">Total Students</span>
                <Badge className="bg-[#059669]/20 text-[#e8f5e9] border-0 font-medium">
                  {schoolInfo.totalStudents}
                </Badge>
              </div>
              <Separator className="bg-[#059669]/20" />
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-[#a0b5a3]">Student-Teacher Ratio</span>
                <Badge className="bg-[#059669]/20 text-[#e8f5e9] border-0 font-medium">
                  {schoolInfo.studentTeacherRatio}
                </Badge>
              </div>
              <Separator className="bg-[#059669]/20" />
              <div className="py-2">
                <span className="text-sm text-white font-medium block mb-2">Accreditation</span>
                <p className="text-sm text-[#a0b5a3]">{schoolInfo.accreditation}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Announcements Section */}
        <div className="pt-2">
          <div className="flex items-center gap-2 mb-3 px-1">
            <Megaphone className="w-5 h-5 text-[#fbbf24]" />
            <h2 className="font-semibold text-white">Announcements</h2>
          </div>
          
          <div className="space-y-3">
            {notices.map((announcement) => (
              <Card key={announcement.id} className={`bg-[#1a3a1d] border ${getPriorityColor(announcement.priority)}`}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h4 className="font-semibold text-white text-sm flex-1">{announcement.title}</h4>
                    <Badge
                      className={`text-xs border-0 ${getPriorityBadgeColor(announcement.priority)}`}
                    >
                      {announcement.priority}
                    </Badge>
                  </div>
                  <p className="text-xs text-[#a0b5a3] mb-2">{formatDate(announcement.date)}</p>
                  <p className="text-sm text-[#a0b5a3] leading-relaxed">{announcement.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}