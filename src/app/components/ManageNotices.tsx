import { ChevronLeft, Megaphone, Trash2 } from 'lucide-react';
import { Card, CardContent } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { useAppContext } from '@/context/AppContext';

interface ManageNoticesProps {
  onNavigate: (view: string) => void;
}

export function ManageNotices({ onNavigate }: ManageNoticesProps) {
  const { notices, deleteNotice } = useAppContext();

  const handleDelete = (id: number, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      deleteNotice(id);
    }
  };

  const getPriorityBadgeColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500/20 text-red-400 border-0';
      case 'medium':
        return 'bg-amber-500/20 text-amber-400 border-0';
      default:
        return 'bg-blue-500/20 text-blue-400 border-0';
    }
  };

  return (
    <div className="pb-20 bg-[#0d1f0f] min-h-screen">
      {/* Header */}
      <div className="bg-[#1a2e1c] px-6 py-4 border-b border-[#059669]/20">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('profile')}
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#1a3a1d] text-[#059669]"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex-1">
              <h1 className="text-lg font-medium text-[#e8f5e9]">Manage Notices</h1>
              <p className="text-[10px] text-[#a0b5a3] uppercase tracking-wide">EDIT OR DELETE NOTICES</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-[#059669]/20 flex items-center justify-center">
              <Megaphone className="w-5 h-5 text-[#fbbf24]" />
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-6 max-w-2xl mx-auto">
        {notices.length === 0 ? (
          <div className="text-center py-12">
            <Megaphone className="w-12 h-12 text-[#a0b5a3] mx-auto mb-3" />
            <p className="text-sm text-[#a0b5a3]">No notices created yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {notices.map((notice) => (
              <Card key={notice.id} className="bg-[#1a3a1d] border border-[#059669]/20">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="text-sm font-medium text-[#e8f5e9] flex-1">{notice.title}</h3>
                    <Badge className={`text-xs ${getPriorityBadgeColor(notice.priority)}`}>
                      {notice.priority}
                    </Badge>
                  </div>
                  <p className="text-xs text-[#a0b5a3] mb-2">{notice.date}</p>
                  <p className="text-xs text-[#a0b5a3] line-clamp-2 mb-3">{notice.content}</p>
                  
                  <div className="flex gap-2 pt-3 border-t border-[#059669]/20">
                    <button
                      onClick={() => handleDelete(notice.id, notice.title)}
                      className="flex-1 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg py-2 px-4 text-xs font-medium hover:bg-red-500/20 transition-colors flex items-center justify-center gap-2"
                    >
                      <Trash2 className="w-3 h-3" />
                      Delete
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
