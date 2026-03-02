import { useState } from 'react';
import { ChevronLeft, Megaphone, Save } from 'lucide-react';
import { Input } from '@/app/components/ui/input';
import { useAppContext } from '@/context/AppContext';

interface AddNoticeProps {
  onNavigate: (view: string) => void;
}

export function AddNotice({ onNavigate }: AddNoticeProps) {
  const { addNotice } = useAppContext();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [priority, setPriority] = useState<'high' | 'medium' | 'low'>('medium');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    addNotice({
      title,
      content,
      date,
      priority
    });

    // Reset form
    setTitle('');
    setContent('');
    setDate(new Date().toISOString().split('T')[0]);
    setPriority('medium');

    // Navigate back to dashboard
    onNavigate('profile');
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
              <h1 className="text-lg font-medium text-[#e8f5e9]">Add New Notice</h1>
              <p className="text-[10px] text-[#a0b5a3] uppercase tracking-wide">CREATE ANNOUNCEMENT</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-[#059669]/20 flex items-center justify-center">
              <Megaphone className="w-5 h-5 text-[#fbbf24]" />
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-6 max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#e8f5e9] mb-2">
              Notice Title *
            </label>
            <Input
              type="text"
              placeholder="e.g., Parent-Teacher Meeting"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-[#1a3a1d] border-[#059669]/30 text-[#e8f5e9] placeholder:text-[#a0b5a3]/60 focus:border-[#059669]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#e8f5e9] mb-2">
              Date
            </label>
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="bg-[#1a3a1d] border-[#059669]/30 text-[#e8f5e9] placeholder:text-[#a0b5a3]/60 focus:border-[#059669]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#e8f5e9] mb-2">
              Priority Level *
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setPriority('low')}
                className={`py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                  priority === 'low'
                    ? 'bg-blue-500/20 text-blue-400 border-2 border-blue-500/50'
                    : 'bg-[#1a3a1d] text-[#a0b5a3] border border-[#059669]/20'
                }`}
              >
                Low
              </button>
              <button
                type="button"
                onClick={() => setPriority('medium')}
                className={`py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                  priority === 'medium'
                    ? 'bg-amber-500/20 text-amber-400 border-2 border-amber-500/50'
                    : 'bg-[#1a3a1d] text-[#a0b5a3] border border-[#059669]/20'
                }`}
              >
                Medium
              </button>
              <button
                type="button"
                onClick={() => setPriority('high')}
                className={`py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                  priority === 'high'
                    ? 'bg-red-500/20 text-red-400 border-2 border-red-500/50'
                    : 'bg-[#1a3a1d] text-[#a0b5a3] border border-[#059669]/20'
                }`}
              >
                High
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#e8f5e9] mb-2">
              Notice Content *
            </label>
            <textarea
              placeholder="Provide details about the notice..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={6}
              className="w-full bg-[#1a3a1d] border border-[#059669]/30 rounded-xl px-4 py-3 text-sm text-[#e8f5e9] placeholder:text-[#a0b5a3]/60 focus:outline-none focus:border-[#059669] transition-colors resize-none"
              required
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-[#059669] text-white rounded-xl py-3 px-4 text-sm font-medium hover:bg-[#047857] transition-colors flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              Publish Notice
            </button>
          </div>
        </form>

        <div className="mt-6 bg-[#1a3a1d] border border-[#059669]/20 rounded-2xl p-4">
          <h3 className="text-sm font-medium text-[#e8f5e9] mb-2">Note</h3>
          <p className="text-xs text-[#a0b5a3] leading-relaxed">
            This notice will be immediately visible in the About School section for all users. High priority notices will be highlighted.
          </p>
        </div>
      </div>
    </div>
  );
}
