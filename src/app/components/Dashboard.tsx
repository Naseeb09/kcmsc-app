import { useState, useEffect } from 'react';
import { useAppContext, Teacher, ClassInfo, Notice, Facility } from '@/context/AppContext';
import { 
  Megaphone, Users, Building2, Plus, Trash2, Edit2, 
  ChevronRight, ArrowLeft, Eye, EyeOff, Save, X,
  LayoutDashboard, Star, GraduationCap, MapPin, Loader2, BookOpen, Search
} from 'lucide-react';
import { Card, CardContent } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { toast } from 'sonner';

interface DashboardProps {
  onNavigate: (view: string) => void;
}

type TabType = 'notices' | 'teachers' | 'classes' | 'facilities';

export function Dashboard({ onNavigate }: DashboardProps) {
  const { 
    notices, teachers, classes, facilities, floors,
    saveNotice, deleteNotice,
    saveTeacher, deleteTeacher,
    saveClass, deleteClass,
    saveFacility, deleteFacility,
    fetchInitialData
  } = useAppContext();

  const [activeTab, setActiveTab] = useState<TabType>('notices');
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [deletingId, setDeletingId] = useState<string | number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Form States
  const [noticeForm, setNoticeForm] = useState<Omit<Notice, 'id' | 'date'>>({ title: '', content: '', priority: 'medium' });
  const [staffForm, setStaffForm] = useState<any>({ 
    name: '', phone: '', section: 'Senior', subject: '', floor: '', isFormTeacher: false, formTeacherOf: '', imageUrl: '' 
  });
  const [classForm, setClassForm] = useState<Omit<ClassInfo, 'id'>>({ 
    name: '', room: '', section: '', version: '', teacher: '', teacherNumber: '', floor_id: ''
  });
  const [facilityForm, setFacilityForm] = useState<Omit<Facility, 'id'>>({ 
    name: '', floor: '', capacity: '', icon: 'BookOpen', description: '' 
  });

  useEffect(() => {
    if (editingItem) {
      if (activeTab === 'notices') setNoticeForm({ title: editingItem.title, content: editingItem.content, priority: editingItem.priority });
      if (activeTab === 'teachers') setStaffForm({ 
        name: editingItem.name, phone: editingItem.phone, section: editingItem.section, 
        subject: editingItem.subject || '', floor: editingItem.floor || '', 
        isFormTeacher: editingItem.isFormTeacher || false, formTeacherOf: editingItem.formTeacherOf || '',
        imageUrl: editingItem.imageUrl || ''
      });
      if (activeTab === 'classes') setClassForm({ 
        name: editingItem.name, room: editingItem.room, section: editingItem.section, 
        version: editingItem.version, teacher: editingItem.teacher, teacherNumber: editingItem.teacherNumber,
        floor_id: editingItem.floor_id || ''
      });
      if (activeTab === 'facilities') setFacilityForm({ 
        name: editingItem.name, floor: editingItem.floor, capacity: editingItem.capacity, 
        icon: editingItem.icon || 'BookOpen', description: editingItem.description || ''
      });
    } else {
      resetForms();
    }
  }, [editingItem, activeTab]);

  const resetForms = () => {
    setNoticeForm({ title: '', content: '', priority: 'medium' });
    setStaffForm({ name: '', phone: '', section: 'Senior', subject: '', floor: '', isFormTeacher: false, formTeacherOf: '', imageUrl: '' });
    setClassForm({ name: '', room: '', section: '', version: '', teacher: '', teacherNumber: '', floor_id: '' });
    setFacilityForm({ name: '', floor: '', capacity: '', icon: 'BookOpen', description: '' });
  };

  const handleSave = async () => {
    setIsProcessing(true);
    const label = activeTab === 'teachers' ? 'Teacher' : activeTab.slice(0, -1);
    try {
      if (activeTab === 'notices') {
        await saveNotice({ ...noticeForm, id: editingItem?.id });
      } else if (activeTab === 'teachers') {
        await saveTeacher({ ...staffForm, id: editingItem?.id });
      } else if (activeTab === 'classes') {
        await saveClass({ ...classForm, id: editingItem?.id });
      } else if (activeTab === 'facilities') {
        await saveFacility({ ...facilityForm, id: editingItem?.id });
      }
      toast.success(`${label} saved successfully!`);
      setEditingItem(null);
      setIsAdding(false);
      resetForms();
    } catch (error) {
      console.error('DATABASE_SAVE_ERROR:', error);
      toast.error(`Failed to save ${label}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDelete = async (id: any) => {
    if (!window.confirm('Are you sure you want to delete this item? This action cannot be undone.')) return;
    setDeletingId(id);
    const label = activeTab === 'teachers' ? 'Teacher' : activeTab.slice(0, -1);
    try {
      if (activeTab === 'notices') await deleteNotice(id);
      else if (activeTab === 'teachers') await deleteTeacher(id);
      else if (activeTab === 'classes') await deleteClass(id);
      else if (activeTab === 'facilities') await deleteFacility(id);
      toast.success(`${label} deleted successfully!`);
    } catch (error) {
      console.error('DATABASE_DELETE_ERROR:', error);
      toast.error(`Failed to delete ${label}`);
    } finally {
      setDeletingId(null);
    }
  };

  const getInitials = (name: string) => {
    const parts = name.split(' ').filter(part => part.length > 0);
    if (parts.length >= 2) return parts[0][0] + parts[parts.length - 1][0];
    return parts[0]?.slice(0, 2).toUpperCase() || '??';
  };

  // Filter Data
  const query = searchQuery.toLowerCase();
  const filteredNotices = notices.filter(n => n.title.toLowerCase().includes(query) || n.content.toLowerCase().includes(query));
  const filteredTeachers = teachers.filter(t => t.name.toLowerCase().includes(query) || (t.subject || '').toLowerCase().includes(query) || (t.section || '').toLowerCase().includes(query));
  const filteredClasses = classes.filter(c => c.name.toLowerCase().includes(query) || c.room.toLowerCase().includes(query) || c.section.toLowerCase().includes(query) || c.teacher?.toLowerCase().includes(query));
  const filteredFacilities = facilities.filter(f => f.name.toLowerCase().includes(query) || (f.description || '').toLowerCase().includes(query) || f.floor.toLowerCase().includes(query));

  // Preview Components
  const NoticePreview = ({ item }: { item: any }) => (
    <Card className="bg-[#1a3a1d] border border-[#059669]/20 w-full animate-in fade-in zoom-in-95">
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="text-sm font-medium text-[#e8f5e9] flex-1">{item.title || 'Notice Title'}</h3>
          <Badge className={`text-xs ${
            item.priority === 'high' ? 'bg-red-500/20 text-red-400' : 
            item.priority === 'medium' ? 'bg-amber-500/20 text-amber-400' : 'bg-blue-500/20 text-blue-400'
          } border-0`}>
            {item.priority}
          </Badge>
        </div>
        <p className="text-xs text-[#a0b5a3] mb-2">{new Date().toISOString().split('T')[0]}</p>
        <p className="text-xs text-[#a0b5a3] line-clamp-2">{item.content || 'Notice content will appear here...'}</p>
      </CardContent>
    </Card>
  );

  const StaffPreview = ({ item }: { item: any }) => (
    <Card className={`w-full ${item.section?.toLowerCase() === 'admin' ? 'bg-gradient-to-br from-[#1a3a1d] to-[#0d1f0f] border-[#fbbf24]/30' : 'bg-[#1a3a1d]/40 border-[#059669]/20'} border rounded-[1.5rem] overflow-hidden animate-in fade-in zoom-in-95`}>
      <CardContent className="p-5">
        <div className="flex items-start gap-4">
          <div className={`w-14 h-14 rounded-xl bg-[#0d1f0f] border flex items-center justify-center text-sm font-black flex-shrink-0 ${item.section?.toLowerCase() === 'admin' ? 'border-[#fbbf24]/40 text-[#fbbf24]' : 'border-[#059669]/30 text-[#059669]'}`}>
            {item.imageUrl ? (
              <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover rounded-xl" />
            ) : (
              getInitials(item.name || 'Staff Member')
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-black text-white truncate uppercase tracking-tight">{item.name || 'Staff Name'}</h3>
            <p className="text-[10px] text-[#059669] font-bold uppercase tracking-wider mt-0.5">
              {item.subject || 'Subject'} • {item.section}
            </p>
            {item.floor && (
              <p className="text-[9px] text-[#a0b5a3] font-medium mt-1 uppercase tracking-widest">
                Floor: <span className="text-white">{item.floor}</span>
              </p>
            )}
            {item.isFormTeacher && (
              <Badge className="mt-2 bg-[#fbbf24]/10 text-[#fbbf24] text-[9px] font-black uppercase tracking-widest border border-[#fbbf24]/20 rounded-lg px-2 py-0.5">
                Form Teacher of {item.formTeacherOf || 'Class'}
              </Badge>
            )}
            <div className="mt-4 pt-4 border-t border-[#059669]/10">
              <p className="text-[10px] text-[#a0b5a3] font-bold uppercase tracking-[0.1em]">
                Phone: <span className="text-[#fbbf24]">{item.phone || 'N/A'}</span>
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const ClassPreview = ({ item }: { item: any }) => (
    <Card className="bg-[#1a3a1d] border border-[#059669]/20 w-full animate-in fade-in zoom-in-95">
      <CardContent className="p-4">
        <div className="flex items-center justify-between gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#0d1f0f] border border-[#059669]/30 flex items-center justify-center">
            <GraduationCap className="w-6 h-6 text-[#fbbf24]" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-xs font-black text-white uppercase tracking-wider truncate">Class {item.name || 'Name'} - {item.section || 'Sec'}</h3>
            <p className="text-[10px] text-[#059669] font-bold mt-0.5 uppercase tracking-widest">Room {item.room || '000'} • {item.version || 'Version'}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const FacilityPreview = ({ item }: { item: any }) => (
    <Card className="bg-[#1a3a1d] border border-[#059669]/20 w-full animate-in fade-in zoom-in-95">
      <CardContent className="p-4 flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-[#fbbf24]/10 border border-[#fbbf24]/30 flex items-center justify-center text-[#fbbf24]">
          <Building2 className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xs font-black text-white uppercase tracking-widest">{item.name || 'Facility'}</h3>
          <p className="text-[10px] text-[#059669] font-bold uppercase tracking-widest mt-0.5">Floor {item.floor || 'N/A'} • {item.capacity || '0'} Capacity</p>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-[#0d1f0f] pb-12 font-sans">
      {/* Header */}
      <header className="bg-[#1a2e1c] px-6 pt-10 pb-6 border-b border-[#059669]/30 sticky top-0 z-40">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => onNavigate('home')} className="w-10 h-10 rounded-xl bg-[#0d1f0f] border border-[#059669]/40 flex items-center justify-center text-[#059669]">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-xs font-black text-white uppercase tracking-[0.3em]">Admin <span className="text-[#059669]">Suite</span></h1>
              <div className="flex items-center gap-1.5 mt-1">
                <div className="w-1.5 h-1.5 rounded-full bg-[#fbbf24] animate-pulse" />
                <p className="text-[9px] text-[#a0b5a3] uppercase font-bold tracking-widest">Management Control</p>
              </div>
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#fbbf24]/10 border border-[#fbbf24]/20 flex items-center justify-center">
            <LayoutDashboard className="w-5 h-5 text-[#fbbf24]" />
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-6 py-8">
        {/* Segmented Control */}
        <div className="bg-[#1a2e1c] p-1 rounded-2xl flex flex-wrap gap-1 border border-[#059669]/20 mb-6">
          {(['notices', 'teachers', 'classes', 'facilities'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => { setActiveTab(tab); setEditingItem(null); setIsAdding(false); setSearchQuery(''); }}
              className={`flex-1 min-w-[70px] py-2.5 rounded-xl text-[8px] font-black uppercase tracking-widest transition-all ${
                activeTab === tab ? 'bg-[#059669] text-white shadow-lg' : 'text-[#a0b5a3]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#059669]" />
          <input 
            type="text"
            placeholder={`Search ${activeTab}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#1a2e1c] border border-[#059669]/20 rounded-xl pl-11 pr-4 py-3 text-xs text-white focus:outline-none focus:border-[#fbbf24] transition-all"
          />
        </div>

        {/* Action Bar */}
        {!isAdding && !editingItem && (
          <button 
            onClick={() => setIsAdding(true)}
            className="w-full bg-[#059669]/10 border border-[#059669]/30 rounded-2xl p-5 flex items-center justify-center gap-3 group active:scale-95 transition-all mb-6"
          >
            <div className="w-8 h-8 rounded-lg bg-[#059669] flex items-center justify-center text-[#0d1f0f]">
              <Plus className="w-5 h-5" />
            </div>
            <span className="text-xs font-black text-[#059669] uppercase tracking-widest">Add New {activeTab.slice(0, -1)}</span>
          </button>
        )}

        {/* Editor / Form */}
        {(isAdding || editingItem) && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-[10px] font-black text-[#fbbf24] uppercase tracking-[0.3em]">
                {editingItem ? 'Edit Mode' : 'Creation Mode'}
              </h2>
              <button 
                onClick={() => setIsPreviewMode(!isPreviewMode)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${
                  isPreviewMode ? 'bg-[#fbbf24] text-[#0d1f0f]' : 'bg-white/5 text-[#a0b5a3]'
                }`}
              >
                {isPreviewMode ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                Live Preview: {isPreviewMode ? 'ON' : 'OFF'}
              </button>
            </div>

            {isPreviewMode && (
              <div className="p-4 bg-white/5 rounded-3xl border border-dashed border-white/10 mb-6">
                <p className="text-[8px] font-bold text-white/30 uppercase tracking-widest mb-3 text-center">Student View Preview</p>
                {activeTab === 'notices' && <NoticePreview item={noticeForm} />}
                {activeTab === 'teachers' && <StaffPreview item={staffForm} />}
                {activeTab === 'classes' && <ClassPreview item={classForm} />}
                {activeTab === 'facilities' && <FacilityPreview item={facilityForm} />}
              </div>
            )}

            <div className="bg-[#1a2e1c] border border-white/5 rounded-[2rem] p-6 space-y-4">
              {activeTab === 'notices' && (
                <>
                  <input 
                    placeholder="Title" 
                    value={noticeForm.title} 
                    onChange={e => setNoticeForm({...noticeForm, title: e.target.value})}
                    className="w-full bg-[#0d1f0f] border border-[#059669]/20 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-[#fbbf24]"
                    autoComplete="off"
                  />
                  <textarea 
                    placeholder="Content" 
                    value={noticeForm.content} 
                    onChange={e => setNoticeForm({...noticeForm, content: e.target.value})}
                    className="w-full bg-[#0d1f0f] border border-[#059669]/20 rounded-xl p-4 text-sm text-white h-32 focus:outline-none focus:border-[#fbbf24]"
                    autoComplete="off"
                  />
                  <select 
                    value={noticeForm.priority} 
                    onChange={e => setNoticeForm({...noticeForm, priority: e.target.value as any})}
                    className="w-full bg-[#0d1f0f] border border-[#059669]/20 rounded-xl p-4 text-sm text-[#a0b5a3] focus:outline-none focus:border-[#fbbf24]"
                  >
                    <option value="low">Low Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="high">High Priority</option>
                  </select>
                </>
              )}

              {activeTab === 'teachers' && (
                <>
                  <input 
                    placeholder="Full Name" 
                    value={staffForm.name} 
                    onChange={e => setStaffForm({...staffForm, name: e.target.value})}
                    className="w-full bg-[#0d1f0f] border border-[#059669]/20 rounded-xl p-4 text-sm text-white"
                    autoComplete="off"
                  />
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-[#059669] uppercase tracking-widest ml-1">Profile Image</label>
                    <input 
                      placeholder="Image URL (Link)" 
                      value={staffForm.imageUrl} 
                      onChange={e => setStaffForm({...staffForm, imageUrl: e.target.value})}
                      className="w-full bg-[#0d1f0f] border border-[#059669]/20 rounded-xl p-4 text-sm text-white"
                      autoComplete="off"
                    />
                    <div className="relative">
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            // In a real app, we would upload to Supabase Storage here.
                            // For now, we'll use a local URL as a placeholder.
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setStaffForm({...staffForm, imageUrl: reader.result as string});
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                        className="hidden" 
                        id="teacher-image-upload"
                      />
                      <label 
                        htmlFor="teacher-image-upload"
                        className="w-full bg-[#059669]/10 border border-dashed border-[#059669]/40 rounded-xl p-4 flex items-center justify-center gap-2 cursor-pointer hover:bg-[#059669]/20 transition-all"
                      >
                        <Plus className="w-4 h-4 text-[#059669]" />
                        <span className="text-[10px] font-black text-[#059669] uppercase tracking-widest">Upload from Device</span>
                      </label>
                    </div>
                  </div>
                  <input 
                    placeholder="Phone" 
                    inputMode="tel"
                    value={staffForm.phone} 
                    onChange={e => setStaffForm({...staffForm, phone: e.target.value})}
                    className="w-full bg-[#0d1f0f] border border-[#059669]/20 rounded-xl p-4 text-sm text-white"
                    autoComplete="off"
                  />
                  <select 
                    value={staffForm.section} 
                    onChange={e => setStaffForm({...staffForm, section: e.target.value as any})}
                    className="w-full bg-[#0d1f0f] border border-[#059669]/20 rounded-xl p-4 text-sm text-[#a0b5a3]"
                  >
                    <option value="Junior">Junior Section</option>
                    <option value="Senior">Senior Section</option>
                    <option value="Admin">Administration</option>
                  </select>
                  <input 
                    placeholder="Subject (e.g. Physics)" 
                    value={staffForm.subject} 
                    onChange={e => setStaffForm({...staffForm, subject: e.target.value})}
                    className="w-full bg-[#0d1f0f] border border-[#059669]/20 rounded-xl p-4 text-sm text-white"
                    autoComplete="off"
                  />
                  <input 
                    placeholder="Floor" 
                    value={staffForm.floor} 
                    onChange={e => setStaffForm({...staffForm, floor: e.target.value})}
                    className="w-full bg-[#0d1f0f] border border-[#059669]/20 rounded-xl p-4 text-sm text-white"
                    autoComplete="off"
                  />
                  <div className="flex items-center justify-between p-4 bg-[#0d1f0f] rounded-xl border border-[#059669]/10">
                    <span className="text-xs font-bold text-[#a0b5a3] uppercase tracking-widest">Form Teacher</span>
                    <input 
                      type="checkbox" 
                      checked={staffForm.isFormTeacher}
                      onChange={e => setStaffForm({...staffForm, isFormTeacher: e.target.checked})}
                      className="w-5 h-5 accent-[#059669]"
                    />
                  </div>
                  {staffForm.isFormTeacher && (
                    <input 
                      placeholder="Form Teacher Of (e.g. Ten EV)" 
                      value={staffForm.formTeacherOf} 
                      onChange={e => setStaffForm({...staffForm, formTeacherOf: e.target.value})}
                      className="w-full bg-[#0d1f0f] border border-[#059669]/20 rounded-xl p-4 text-sm text-white animate-in slide-in-from-top-2"
                      autoComplete="off"
                    />
                  )}
                </>
              )}

              {activeTab === 'classes' && (
                <>
                  <input 
                    placeholder="Class Name (e.g. Ten)" 
                    value={classForm.name} 
                    onChange={e => setClassForm({...classForm, name: e.target.value})}
                    className="w-full bg-[#0d1f0f] border border-[#059669]/20 rounded-xl p-4 text-sm text-white"
                    autoComplete="off"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input 
                      placeholder="Room Number" 
                      value={classForm.room} 
                      onChange={e => setClassForm({...classForm, room: e.target.value})}
                      className="w-full bg-[#0d1f0f] border border-[#059669]/20 rounded-xl p-4 text-sm text-white"
                      autoComplete="off"
                    />
                    <input 
                      placeholder="Section" 
                      value={classForm.section} 
                      onChange={e => setClassForm({...classForm, section: e.target.value})}
                      className="w-full bg-[#0d1f0f] border border-[#059669]/20 rounded-xl p-4 text-sm text-white"
                      autoComplete="off"
                    />
                  </div>
                  <input 
                    placeholder="Version (e.g. English)" 
                    value={classForm.version} 
                    onChange={e => setClassForm({...classForm, version: e.target.value})}
                    className="w-full bg-[#0d1f0f] border border-[#059669]/20 rounded-xl p-4 text-sm text-white"
                    autoComplete="off"
                  />
                  <input 
                    placeholder="Teacher Name" 
                    value={classForm.teacher} 
                    onChange={e => setClassForm({...classForm, teacher: e.target.value})}
                    className="w-full bg-[#0d1f0f] border border-[#059669]/20 rounded-xl p-4 text-sm text-white"
                    autoComplete="off"
                  />
                  <select 
                    value={classForm.floor_id} 
                    onChange={e => setClassForm({...classForm, floor_id: e.target.value})}
                    className="w-full bg-[#0d1f0f] border border-[#059669]/20 rounded-xl p-4 text-sm text-[#a0b5a3]"
                  >
                    <option value="">Select Floor Location</option>
                    {floors.map(f => (
                      <option key={f.id} value={f.id}>{f.name} ({f.purpose})</option>
                    ))}
                  </select>
                </>
              )}

              {activeTab === 'facilities' && (
                <>
                  <input 
                    placeholder="Facility Name" 
                    value={facilityForm.name} 
                    onChange={e => setFacilityForm({...facilityForm, name: e.target.value})}
                    className="w-full bg-[#0d1f0f] border border-[#059669]/20 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-[#fbbf24]"
                    autoComplete="off"
                  />
                  <textarea 
                    placeholder="Brief Description" 
                    value={facilityForm.description} 
                    onChange={e => setFacilityForm({...facilityForm, description: e.target.value})}
                    className="w-full bg-[#0d1f0f] border border-[#059669]/20 rounded-xl p-4 text-sm text-white h-24 focus:outline-none focus:border-[#fbbf24]"
                    autoComplete="off"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input 
                      placeholder="Floor" 
                      value={facilityForm.floor} 
                      onChange={e => setFacilityForm({...facilityForm, floor: e.target.value})}
                      className="w-full bg-[#0d1f0f] border border-[#059669]/20 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-[#fbbf24]"
                      autoComplete="off"
                    />
                    <input 
                      placeholder="Capacity" 
                      value={facilityForm.capacity} 
                      onChange={e => setFacilityForm({...facilityForm, capacity: e.target.value})}
                      className="w-full bg-[#0d1f0f] border border-[#059669]/20 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-[#fbbf24]"
                      autoComplete="off"
                    />
                  </div>
                  <select 
                    value={facilityForm.icon} 
                    onChange={e => setFacilityForm({...facilityForm, icon: e.target.value})}
                    className="w-full bg-[#0d1f0f] border border-[#059669]/20 rounded-xl p-4 text-sm text-[#a0b5a3] focus:outline-none focus:border-[#fbbf24]"
                  >
                    <option value="BookOpen">Book Icon</option>
                    <option value="FlaskConical">Lab Icon</option>
                    <option value="MonitorCheck">Computer Icon</option>
                    <option value="Trophy">Trophy Icon</option>
                    <option value="Presentation">Board Icon</option>
                    <option value="Building2">Building Icon</option>
                  </select>
                </>
              )}

              <div className="flex gap-3 pt-4">
                <button 
                  onClick={() => { setEditingItem(null); setIsAdding(false); resetForms(); }}
                  disabled={isProcessing}
                  className="flex-1 bg-white/5 text-[#a0b5a3] py-4 rounded-xl text-[10px] font-black uppercase tracking-widest disabled:opacity-50"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSave}
                  disabled={isProcessing}
                  className="flex-1 bg-[#fbbf24] text-[#0d1f0f] py-4 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isProcessing ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />}
                  {isProcessing ? 'Processing...' : 'Save Changes'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* List View */}
        {!isAdding && !editingItem && (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-[10px] font-black text-[#059669] uppercase tracking-[0.3em]">Existing Records</h2>
              <Badge className="bg-[#059669]/10 text-[#059669] border-0 text-[9px] font-black">
                {activeTab === 'notices' ? filteredNotices.length : 
                 activeTab === 'teachers' ? filteredTeachers.length :
                 activeTab === 'classes' ? filteredClasses.length : filteredFacilities.length} Items
              </Badge>
            </div>

            {activeTab === 'notices' && filteredNotices.map(notice => (
              <div key={notice.id} className="bg-[#1a2e1c] border border-white/5 rounded-2xl p-4 flex items-center justify-between group">
                <div className="flex-1 pr-4">
                  <h3 className="text-xs font-black text-white uppercase tracking-tight truncate">{notice.title}</h3>
                  <p className="text-[9px] text-[#a0b5a3] mt-1">{notice.date}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setEditingItem(notice)} disabled={!!deletingId} className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-[#a0b5a3] hover:text-[#fbbf24] transition-colors disabled:opacity-50"><Edit2 className="w-3.5 h-3.5" /></button>
                  <button onClick={() => handleDelete(notice.id)} disabled={!!deletingId} className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center text-red-400 hover:bg-red-500/20 transition-colors disabled:opacity-50">
                    {deletingId === notice.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            ))}

            {activeTab === 'teachers' && (
              <div className="space-y-8">
                {['Admin', 'Senior', 'Junior'].map(section => {
                  const sectionTeachers = filteredTeachers.filter(t => (t.section || 'Senior').toLowerCase() === section.toLowerCase());
                  if (sectionTeachers.length === 0) return null;
                  return (
                    <div key={section} className="space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="h-px flex-1 bg-[#059669]/20"></div>
                        <span className="text-[9px] font-black text-[#fbbf24] uppercase tracking-[0.2em] px-2">{section} Section</span>
                        <div className="h-px flex-1 bg-[#059669]/20"></div>
                      </div>
                      {sectionTeachers.map(member => (
                        <div key={member.id} className="bg-[#1a2e1c] border border-white/5 rounded-2xl p-4 flex items-center justify-between group">
                          <div className="flex items-center gap-3 flex-1 min-w-0 pr-4">
                            <div className="w-10 h-10 rounded-xl bg-[#0d1f0f] border border-[#059669]/20 flex items-center justify-center text-[#059669] text-xs font-black flex-shrink-0">
                              {member.imageUrl ? <img src={member.imageUrl} className="w-full h-full object-cover rounded-xl" /> : getInitials(member.name)}
                            </div>
                            <div className="min-w-0">
                              <h3 className="text-xs font-black text-white uppercase tracking-tight truncate">{member.name}</h3>
                              <p className="text-[9px] text-[#059669] font-bold uppercase tracking-widest mt-1">{member.subject || member.role}</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button onClick={() => setEditingItem(member)} disabled={!!deletingId} className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-[#a0b5a3] hover:text-[#fbbf24] transition-colors disabled:opacity-50"><Edit2 className="w-3.5 h-3.5" /></button>
                            <button onClick={() => handleDelete(member.id)} disabled={!!deletingId} className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center text-red-400 hover:bg-red-500/20 transition-colors disabled:opacity-50">
                              {deletingId === member.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            )}

            {activeTab === 'classes' && (
              <div className="space-y-8">
                {floors.map(floor => {
                  const floorClasses = filteredClasses.filter(c => c.floor_id === floor.id);
                  if (floorClasses.length === 0) return null;
                  return (
                    <div key={floor.id} className="space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="h-px flex-1 bg-[#059669]/20"></div>
                        <span className="text-[9px] font-black text-[#fbbf24] uppercase tracking-[0.2em] px-2">{floor.name}</span>
                        <div className="h-px flex-1 bg-[#059669]/20"></div>
                      </div>
                      {floorClasses.map(cls => (
                        <div key={cls.id} className="bg-[#1a2e1c] border border-white/5 rounded-2xl p-4 flex items-center justify-between group">
                          <div className="flex-1 pr-4 min-w-0">
                            <h3 className="text-xs font-black text-white uppercase tracking-tight truncate">Class {cls.name} - {cls.section}</h3>
                            <p className="text-[9px] text-[#059669] font-bold uppercase tracking-widest mt-1">Room {cls.room} • {cls.version}</p>
                          </div>
                          <div className="flex gap-2">
                            <button onClick={() => setEditingItem(cls)} disabled={!!deletingId} className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-[#a0b5a3] hover:text-[#fbbf24] transition-colors disabled:opacity-50"><Edit2 className="w-3.5 h-3.5" /></button>
                            <button onClick={() => handleDelete(cls.id)} disabled={!!deletingId} className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center text-red-400 hover:bg-red-500/20 transition-colors disabled:opacity-50">
                              {deletingId === cls.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            )}

            {activeTab === 'facilities' && filteredFacilities.map(fac => (
              <div key={fac.id} className="bg-[#1a2e1c] border border-white/5 rounded-2xl p-4 flex items-center justify-between group">
                <div className="flex-1 pr-4">
                  <h3 className="text-xs font-black text-white uppercase tracking-tight truncate">{fac.name}</h3>
                  <p className="text-[9px] text-[#fbbf24] font-bold uppercase tracking-widest mt-1">Floor {fac.floor}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setEditingItem(fac)} disabled={!!deletingId} className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-[#a0b5a3] hover:text-[#fbbf24] transition-colors disabled:opacity-50"><Edit2 className="w-3.5 h-3.5" /></button>
                  <button onClick={() => handleDelete(fac.id)} disabled={!!deletingId} className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center text-red-400 hover:bg-red-500/20 transition-colors disabled:opacity-50">
                    {deletingId === fac.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
