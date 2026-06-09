import { useState } from 'react';
import { ChevronLeft, ShieldAlert, Send, CheckCircle2 } from 'lucide-react';
import { Input } from '@/app/components/ui/input';
import { useTranslation } from '@/hooks/useTranslation';

interface SmartComplaintProps {
  onNavigate: (view: string) => void;
}

export function SmartComplaint({ onNavigate }: SmartComplaintProps) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    rollNo: '',
    section: '',
    className: '',
    location: '',
    description: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    console.log('Complaint submitted:', formData);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[#0d1f0f] flex items-center justify-center p-6">
        <div className="bg-[#1a2e1c] rounded-[2.5rem] p-8 border border-[#059669]/20 w-full max-w-md text-center shadow-2xl">
          <div className="w-20 h-20 rounded-3xl bg-[#059669]/10 flex items-center justify-center mx-auto mb-6 border border-[#059669]/30">
            <CheckCircle2 className="w-10 h-10 text-[#fbbf24]" />
          </div>
          <h2 className="text-2xl font-black text-white mb-4 uppercase tracking-tight">{t('complaint_submitted')}</h2>
          <p className="text-sm text-[#a0b5a3] leading-relaxed mb-8">
            {t('complaint_privacy_notice')}
          </p>
          <button
            onClick={() => onNavigate('home')}
            className="w-full py-5 bg-[#059669] text-[#0d1f0f] text-[11px] font-black uppercase tracking-[0.3em] rounded-2xl hover:bg-[#fbbf24] transition-all active:scale-95 shadow-lg shadow-[#059669]/10"
          >
            {t('return_to_campus')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-40 bg-[#0d1f0f] min-h-screen">
      {/* Header */}
      <header className="bg-[#1a2e1c] px-6 py-8 border-b border-[#059669]/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#fbbf24]/5 rounded-full blur-3xl -mr-16 -mt-16" />
        <div className="max-w-2xl mx-auto flex items-center gap-4 relative z-10">
          <button
            onClick={() => onNavigate('home')}
            className="w-12 h-12 flex items-center justify-center rounded-2xl bg-[#0d1f0f] border border-[#059669]/20 text-[#059669] active:scale-90 transition-all"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="flex-1">
            <h1 className="text-[14px] font-black text-white uppercase tracking-[0.2em]">{t('smart_complaint')}</h1>
            <p className="text-[10px] text-[#059669] font-bold uppercase tracking-widest mt-0.5">{t('file_complaint')}</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-[#fbbf24]/10 flex items-center justify-center border border-[#fbbf24]/20">
            <ShieldAlert className="w-6 h-6 text-[#fbbf24]" />
          </div>
        </div>
      </header>

      <main className="px-6 py-8 max-w-2xl mx-auto">
        <div className="mb-8">
          <p className="text-xs text-[#a0b5a3] leading-relaxed font-medium">
            {t('complaint_description')}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-[#059669] uppercase tracking-widest ml-1">
                {t('student_name')} *
              </label>
              <Input
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-[#112613] border-[#059669]/20 rounded-2xl py-6 px-5 text-[#e8f5e9] placeholder:text-[#a0b5a3]/20 focus:border-[#fbbf24]/30 focus:bg-[#1a311c] transition-all"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-[#059669] uppercase tracking-widest ml-1">
                  {t('roll_no')} *
                </label>
                <Input
                  type="text"
                  placeholder="e.g. 12"
                  value={formData.rollNo}
                  onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })}
                  className="bg-[#112613] border-[#059669]/20 rounded-2xl py-6 px-5 text-[#e8f5e9] placeholder:text-[#a0b5a3]/20 focus:border-[#fbbf24]/30 focus:bg-[#1a311c] transition-all"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-[#059669] uppercase tracking-widest ml-1">
                  {t('section_label')} *
                </label>
                <Input
                  type="text"
                  placeholder="e.g. EV"
                  value={formData.section}
                  onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                  className="bg-[#112613] border-[#059669]/20 rounded-2xl py-6 px-5 text-[#e8f5e9] placeholder:text-[#a0b5a3]/20 focus:border-[#fbbf24]/30 focus:bg-[#1a311c] transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-[#059669] uppercase tracking-widest ml-1">
                {t('class')} *
              </label>
              <Input
                type="text"
                placeholder="e.g. Class 10"
                value={formData.className}
                onChange={(e) => setFormData({ ...formData, className: e.target.value })}
                className="bg-[#112613] border-[#059669]/20 rounded-2xl py-6 px-5 text-[#e8f5e9] placeholder:text-[#a0b5a3]/20 focus:border-[#fbbf24]/30 focus:bg-[#1a311c] transition-all"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-[#059669] uppercase tracking-widest ml-1">
                {t('incident_location')} *
              </label>
              <Input
                type="text"
                placeholder="e.g. 3rd Floor, Room 302"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="bg-[#112613] border-[#059669]/20 rounded-2xl py-6 px-5 text-[#e8f5e9] placeholder:text-[#a0b5a3]/20 focus:border-[#fbbf24]/30 focus:bg-[#1a311c] transition-all"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-[#059669] uppercase tracking-widest ml-1">
                Description *
              </label>
              <textarea
                placeholder={t('description_placeholder')}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={6}
                className="w-full bg-[#112613] border border-[#059669]/20 rounded-[2rem] px-5 py-5 text-sm text-[#e8f5e9] placeholder:text-[#a0b5a3]/20 focus:outline-none focus:border-[#fbbf24]/30 focus:bg-[#1a311c] transition-all resize-none"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#059669] text-[#0d1f0f] py-5 rounded-2xl text-[11px] font-black uppercase tracking-[0.3em] hover:bg-[#fbbf24] transition-all active:scale-95 shadow-lg shadow-[#059669]/20 flex items-center justify-center gap-3 mt-4"
          >
            <Send className="w-4 h-4" />
            {t('submit_complaint')}
          </button>
        </form>

        <div className="mt-12 bg-gradient-to-br from-[#1a2e1c] to-[#0d1f0f] border border-[#fbbf24]/10 rounded-[2rem] p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#fbbf24]/5 rounded-full blur-2xl -mr-8 -mt-8" />
          <h3 className="text-[10px] font-black text-[#fbbf24] mb-3 uppercase tracking-widest flex items-center gap-2">
            <ShieldAlert className="w-3 h-3" />
            Privacy Note
          </h3>
          <p className="text-[11px] text-[#a0b5a3] leading-relaxed font-medium relative z-10">
            All complaints are strictly confidential. Only school administrators have access to this information to ensure student safety and discipline.
          </p>
        </div>
      </main>
    </div>
  );
}
