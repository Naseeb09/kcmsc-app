import { useState } from 'react';
import { ChevronLeft, Calendar, Save } from 'lucide-react';
import { Input } from '@/app/components/ui/input';
import { useAppContext } from '@/context/AppContext';

interface AddEventProps {
  onNavigate: (view: string) => void;
}

export function AddEvent({ onNavigate }: AddEventProps) {
  const { addEvent } = useAppContext();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    addEvent({
      title,
      description,
      image: imageUrl || 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=1080',
      date
    });

    // Reset form
    setTitle('');
    setDescription('');
    setDate('');
    setImageUrl('');

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
              <h1 className="text-lg font-medium text-[#e8f5e9]">Add New Event</h1>
              <p className="text-[10px] text-[#a0b5a3] uppercase tracking-wide">CREATE EVENT</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-[#059669]/20 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-[#fbbf24]" />
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-6 max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#e8f5e9] mb-2">
              Event Title *
            </label>
            <Input
              type="text"
              placeholder="e.g., Annual Sports Day"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-[#1a3a1d] border-[#059669]/30 text-[#e8f5e9] placeholder:text-[#a0b5a3]/60 focus:border-[#059669]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#e8f5e9] mb-2">
              Event Date
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
              Description *
            </label>
            <textarea
              placeholder="Provide details about the event..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              className="w-full bg-[#1a3a1d] border border-[#059669]/30 rounded-xl px-4 py-3 text-sm text-[#e8f5e9] placeholder:text-[#a0b5a3]/60 focus:outline-none focus:border-[#059669] transition-colors resize-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#e8f5e9] mb-2">
              Image URL (Optional)
            </label>
            <Input
              type="url"
              placeholder="https://example.com/image.jpg"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="bg-[#1a3a1d] border-[#059669]/30 text-[#e8f5e9] placeholder:text-[#a0b5a3]/60 focus:border-[#059669]"
            />
            <p className="text-xs text-[#a0b5a3] mt-1">
              Leave blank to use default image
            </p>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-[#059669] text-white rounded-xl py-3 px-4 text-sm font-medium hover:bg-[#047857] transition-colors flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              Create Event
            </button>
          </div>
        </form>

        <div className="mt-6 bg-[#1a3a1d] border border-[#059669]/20 rounded-2xl p-4">
          <h3 className="text-sm font-medium text-[#e8f5e9] mb-2">Note</h3>
          <p className="text-xs text-[#a0b5a3] leading-relaxed">
            This event will be immediately visible on the home screen Events carousel for all users.
          </p>
        </div>
      </div>
    </div>
  );
}
