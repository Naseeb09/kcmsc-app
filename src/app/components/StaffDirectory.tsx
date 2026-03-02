import { ChevronLeft, Users, Mail, Phone } from 'lucide-react';
import { Card, CardContent } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { useAppContext } from '@/context/AppContext';

interface StaffDirectoryProps {
  onNavigate: (view: string) => void;
}

export function StaffDirectory({ onNavigate }: StaffDirectoryProps) {
  const { staff } = useAppContext();

  const getInitials = (name: string) => {
    const parts = name.split(' ').filter(part => part.length > 0);
    if (parts.length >= 2) {
      return parts[0][0] + parts[parts.length - 1][0];
    }
    return parts[0]?.slice(0, 2).toUpperCase() || '??';
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
              <h1 className="text-lg font-medium text-[#e8f5e9]">Staff Directory</h1>
              <p className="text-[10px] text-[#a0b5a3] uppercase tracking-wide">OUR FACULTY & ADMINISTRATION</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-[#059669]/20 flex items-center justify-center">
              <Users className="w-5 h-5 text-[#fbbf24]" />
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-6 max-w-2xl mx-auto">
        {/* Introduction */}
        <div className="bg-[#1a3a1d] border border-[#059669]/20 rounded-2xl p-4 mb-6">
          <h3 className="text-sm font-medium text-[#e8f5e9] mb-2">Meet Our Team</h3>
          <p className="text-xs text-[#a0b5a3] leading-relaxed">
            Our dedicated staff members are committed to providing quality education and fostering a supportive learning environment for all students from KG to College level.
          </p>
        </div>

        {/* Staff List */}
        <div className="space-y-3">
          {staff.map((member) => (
            <Card key={member.id} className="bg-[#1a3a1d] border border-[#059669]/20 hover:border-[#059669]/40 transition-all cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  {/* Avatar */}
                  <div className="w-14 h-14 rounded-xl overflow-hidden bg-[#059669]/20 border-2 border-[#059669]/30 flex items-center justify-center flex-shrink-0">
                    {member.image && member.image.startsWith('http') ? (
                      <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-[#059669] text-lg font-bold">{getInitials(member.name)}</span>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-sm font-medium text-[#e8f5e9] mb-1">{member.name}</h3>
                        <p className="text-xs text-[#a0b5a3]">{member.role}</p>
                        {member.department && (
                          <p className="text-xs text-[#a0b5a3]">{member.department}</p>
                        )}
                      </div>
                      {(member.role === 'Principal' || member.role === 'Vice Principal') && (
                        <Badge className="bg-[#fbbf24]/20 text-[#fbbf24] px-2 py-0.5 text-[10px] border-0">
                          ADMIN
                        </Badge>
                      )}
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs text-[#a0b5a3]">
                        <Mail className="w-3 h-3" />
                        <span>{member.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-[#a0b5a3]">
                        <Phone className="w-3 h-3" />
                        <span>{member.phone}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact Info */}
        <div className="mt-6 bg-[#1a3a1d] border border-[#059669]/20 rounded-2xl p-4">
          <h3 className="text-sm font-medium text-[#e8f5e9] mb-3">Contact Information</h3>
          <p className="text-xs text-[#a0b5a3] leading-relaxed mb-3">
            For inquiries regarding specific staff members or to schedule appointments, please contact our main office.
          </p>
          <button 
            onClick={() => onNavigate('contact')}
            className="w-full bg-[#059669] text-white rounded-xl py-2.5 px-4 text-xs font-medium hover:bg-[#047857] transition-colors"
          >
            Contact Main Office
          </button>
        </div>
      </div>
    </div>
  );
}
