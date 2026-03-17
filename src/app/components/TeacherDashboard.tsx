import { User, LogOut, Plus, Edit, Calendar, Megaphone, Building, Users as UsersIcon, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';

interface TeacherDashboardProps {
  onNavigate: (view: string) => void;
  onLogout: () => void;
  teacherName: string;
}

export function TeacherDashboard({ onNavigate, onLogout, teacherName }: TeacherDashboardProps) {
  return (
    <div className="pb-20 bg-[#0d1f0f] min-h-screen">
      {/* Header */}
      <div className="bg-[#1a2e1c] px-6 py-6 border-b border-[#059669]/20">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-[#059669]/20 rounded-full flex items-center justify-center border-2 border-[#059669]/30">
                <User className="w-7 h-7 text-[#059669]" />
              </div>
              <div>
                <h1 className="text-lg font-medium text-[#e8f5e9]">{teacherName}</h1>
                <p className="text-xs text-[#a0b5a3]">Admin Dashboard</p>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="w-10 h-10 rounded-lg bg-[#1a3a1d] flex items-center justify-center text-[#a0b5a3] hover:text-[#059669]"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
          
          <Badge className="bg-[#059669]/20 text-[#059669] px-3 py-1 border-0">
            Full Admin Access
          </Badge>
        </div>
      </div>

      <div className="px-6 py-6 max-w-2xl mx-auto">
        {/* Welcome Message */}
        <div className="bg-gradient-to-br from-[#047857] to-[#059669] rounded-2xl p-4 mb-6">
          <h3 className="text-sm font-medium text-white mb-1">Welcome Back, Admin!</h3>
          <p className="text-xs text-white/80">
            You have full control to manage all school content, floors, classes, staff, and facilities.
          </p>
        </div>

        {/* Content Management */}
        <div className="mb-6">
          <h2 className="text-sm font-medium text-[#e8f5e9] mb-3 flex items-center gap-2">
            <Megaphone className="w-4 h-4" />
            Events & Notices
          </h2>
          <div className="space-y-2">
            <button 
              onClick={() => onNavigate('add-event')}
              className="w-full bg-[#1a3a1d] border border-[#059669]/20 rounded-xl p-3 flex items-center justify-between hover:border-[#059669]/40 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#059669]/20 flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-[#fbbf24]" />
                </div>
                <span className="text-sm font-medium text-[#e8f5e9]">Add New Event</span>
              </div>
              <Plus className="w-4 h-4 text-[#059669]" />
            </button>

            <button 
              onClick={() => onNavigate('add-notice')}
              className="w-full bg-[#1a3a1d] border border-[#059669]/20 rounded-xl p-3 flex items-center justify-between hover:border-[#059669]/40 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#059669]/20 flex items-center justify-center">
                  <Megaphone className="w-4 h-4 text-[#fbbf24]" />
                </div>
                <span className="text-sm font-medium text-[#e8f5e9]">Add New Notice</span>
              </div>
              <Plus className="w-4 h-4 text-[#059669]" />
            </button>

            <button 
              onClick={() => onNavigate('manage-events')}
              className="w-full bg-[#1a3a1d] border border-[#059669]/20 rounded-xl p-3 flex items-center justify-between hover:border-[#059669]/40 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#059669]/20 flex items-center justify-center">
                  <Edit className="w-4 h-4 text-[#fbbf24]" />
                </div>
                <span className="text-sm font-medium text-[#e8f5e9]">Manage Events</span>
              </div>
              <span className="text-[#059669]">→</span>
            </button>

            <button 
              onClick={() => onNavigate('manage-notices')}
              className="w-full bg-[#1a3a1d] border border-[#059669]/20 rounded-xl p-3 flex items-center justify-between hover:border-[#059669]/40 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#059669]/20 flex items-center justify-center">
                  <Edit className="w-4 h-4 text-[#fbbf24]" />
                </div>
                <span className="text-sm font-medium text-[#e8f5e9]">Manage Notices</span>
              </div>
              <span className="text-[#059669]">→</span>
            </button>
          </div>
        </div>

        {/* Floor & Class Management */}
        <div className="mb-6">
          <h2 className="text-sm font-medium text-[#e8f5e9] mb-3 flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Floors & Classes
          </h2>
          <div className="space-y-2">
            <button 
              onClick={() => onNavigate('add-floor')}
              className="w-full bg-[#1a3a1d] border border-[#059669]/20 rounded-xl p-3 flex items-center justify-between hover:border-[#059669]/40 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#059669]/20 flex items-center justify-center">
                  <Building className="w-4 h-4 text-[#fbbf24]" />
                </div>
                <span className="text-sm font-medium text-[#e8f5e9]">Add New Floor</span>
              </div>
              <Plus className="w-4 h-4 text-[#059669]" />
            </button>

            <button 
              onClick={() => onNavigate('manage-floors')}
              className="w-full bg-[#1a3a1d] border border-[#059669]/20 rounded-xl p-3 flex items-center justify-between hover:border-[#059669]/40 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#059669]/20 flex items-center justify-center">
                  <Edit className="w-4 h-4 text-[#fbbf24]" />
                </div>
                <span className="text-sm font-medium text-[#e8f5e9]">Manage Floors</span>
              </div>
              <span className="text-[#059669]">→</span>
            </button>
          </div>
        </div>

        {/* Faculty Management */}
        <div className="mb-6">
          <h2 className="text-sm font-medium text-[#e8f5e9] mb-3 flex items-center gap-2">
            <UsersIcon className="w-4 h-4" />
            Faculty Directory
          </h2>
          <div className="space-y-2">
            <button
              onClick={() => onNavigate('add-staff')}
              className="w-full bg-[#1a3a1d] border border-[#059669]/20 rounded-xl p-3 flex items-center justify-between hover:border-[#059669]/40 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#059669]/20 flex items-center justify-center">
                  <UsersIcon className="w-4 h-4 text-[#fbbf24]" />
                </div>
                <span className="text-sm font-medium text-[#e8f5e9]">Add Faculty Member</span>
              </div>
              <Plus className="w-4 h-4 text-[#059669]" />
            </button>

            <button
              onClick={() => onNavigate('manage-staff')}
              className="w-full bg-[#1a3a1d] border border-[#059669]/20 rounded-xl p-3 flex items-center justify-between hover:border-[#059669]/40 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#059669]/20 flex items-center justify-center">
                  <Edit className="w-4 h-4 text-[#fbbf24]" />
                </div>
                <span className="text-sm font-medium text-[#e8f5e9]">Manage Faculty</span>
              </div>
              <span className="text-[#059669]">→</span>
            </button>
          </div>
        </div>
        {/* Facility Management */}
        <div className="mb-6">
          <h2 className="text-sm font-medium text-[#e8f5e9] mb-3 flex items-center gap-2">
            <Building className="w-4 h-4" />
            Facilities
          </h2>
          <div className="space-y-2">
            <button 
              onClick={() => onNavigate('add-facility')}
              className="w-full bg-[#1a3a1d] border border-[#059669]/20 rounded-xl p-3 flex items-center justify-between hover:border-[#059669]/40 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#059669]/20 flex items-center justify-center">
                  <Building className="w-4 h-4 text-[#fbbf24]" />
                </div>
                <span className="text-sm font-medium text-[#e8f5e9]">Add Facility</span>
              </div>
              <Plus className="w-4 h-4 text-[#059669]" />
            </button>

            <button 
              onClick={() => onNavigate('manage-facilities')}
              className="w-full bg-[#1a3a1d] border border-[#059669]/20 rounded-xl p-3 flex items-center justify-between hover:border-[#059669]/40 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#059669]/20 flex items-center justify-center">
                  <Edit className="w-4 h-4 text-[#fbbf24]" />
                </div>
                <span className="text-sm font-medium text-[#e8f5e9]">Manage Facilities</span>
              </div>
              <span className="text-[#059669]">→</span>
            </button>
          </div>
        </div>

        {/* Info Card */}
        <div className="bg-[#1a3a1d] border border-[#059669]/20 rounded-2xl p-4">
          <h3 className="text-sm font-medium text-[#e8f5e9] mb-2">Admin Privileges</h3>
          <p className="text-xs text-[#a0b5a3] leading-relaxed">
            All changes you make will be immediately visible throughout the app. You can add, edit, or remove floors, classes, staff members, facilities, events, and notices.
          </p>
        </div>
      </div>
    </div>
  );
}
