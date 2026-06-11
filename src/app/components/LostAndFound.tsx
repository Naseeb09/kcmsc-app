import { useState, useEffect, useMemo } from 'react';
import { ChevronLeft, Plus, Search, MapPin, Calendar, Camera, Send, AlertCircle, Trash2, X, MessageCircle, Reply, User } from 'lucide-react';
import { Input } from '@/app/components/ui/input';
import { useTranslation } from '@/hooks/useTranslation';
import { supabase } from '@/lib/supabase';
import { Badge } from '@/app/components/ui/badge';
import { useAppContext } from '@/context/AppContext';
import { toast } from 'sonner';

interface LostAndFoundProps {
  onNavigate: (view: string) => void;
}

interface ItemPost {
  id: string;
  type: 'lost' | 'found';
  title: string;
  description: string;
  location: string;
  date: string;
  student_name: string;
  contact_info: string;
  media_urls: string[];
  status: 'active' | 'resolved';
  created_at: string;
}

interface Comment {
  id: string;
  post_id: string;
  parent_id: string | null;
  content: string;
  author_name: string;
  author_contact?: string;
  created_at: string;
}

export function LostAndFound({ onNavigate }: LostAndFoundProps) {
  const { t, s } = useTranslation();
  const { isAdmin, setIsFabElevated } = useAppContext();
  const [items, setItems] = useState<ItemPost[]>([]);
  const [isPosting, setIsPosting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [filter, setFilter] = useState<'all' | 'lost' | 'found'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  
  // Dedicated View State
  const [selectedPost, setSelectedPost] = useState<ItemPost | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isFetchingComments, setIsFetchingComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [replyTo, setReplyTo] = useState<Comment | null>(null);

  const [formData, setFormData] = useState({
    type: 'lost' as 'lost' | 'found',
    title: '',
    description: '',
    location: '',
    date: new Date().toISOString().split('T')[0],
    student_name: '',
    contact_info: '',
    media_urls: [] as string[]
  });

  useEffect(() => {
    fetchItems();
    
    // Subscribe to lost_and_found changes
    const itemsChannel = supabase
      .channel('lost_and_found_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'lost_and_found' }, (payload) => {
        if (payload.eventType === 'INSERT') {
          setItems(prev => prev.some(item => item.id === payload.new.id) ? prev : [payload.new as ItemPost, ...prev]);
        } else if (payload.eventType === 'UPDATE') {
          setItems(prev => prev.map(item => item.id === payload.new.id ? payload.new as ItemPost : item));
        } else if (payload.eventType === 'DELETE') {
          setItems(prev => prev.filter(item => item.id !== payload.old.id));
        }
      })
      .subscribe();

    // Subscribe to comments changes
    const commentsChannel = supabase
      .channel('lost_and_found_comments_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'lost_and_found_comments' }, (payload) => {
        if (payload.eventType === 'INSERT') {
          setComments(prev => [...prev, payload.new as Comment]);
        } else if (payload.eventType === 'DELETE') {
          setComments(prev => prev.filter(c => c.id !== payload.old.id));
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(itemsChannel);
      supabase.removeChannel(commentsChannel);
    };
  }, []);

  useEffect(() => {
    if (selectedPost) {
      fetchComments(selectedPost.id);
      setIsFabElevated(true);
    } else {
      setIsFabElevated(false);
    }

    return () => setIsFabElevated(false);
  }, [selectedPost?.id, setIsFabElevated]);

  const fetchComments = async (postId: string) => {
    try {
      setIsFetchingComments(true);
      const { data, error } = await supabase
        .from('lost_and_found_comments')
        .select('*')
        .eq('post_id', postId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setComments(data || []);
    } catch (err) {
      console.error('Error fetching comments:', err);
    } finally {
      setIsFetchingComments(false);
    }
  };

  const handlePostComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPost || !commentText.trim()) return;

    try {
      const newComment = {
        post_id: selectedPost.id,
        parent_id: replyTo?.id || null,
        content: commentText.trim(),
        author_name: isAdmin ? 'Admin' : 'Student', 
      };

      const { error } = await supabase
        .from('lost_and_found_comments')
        .insert([newComment]);

      if (error) throw error;
      
      setCommentText('');
      setReplyTo(null);
    } catch (err: any) {
      toast.error('Failed to post comment');
    }
  };

  const handleDeleteComment = async (id: string) => {
    if (!confirm('Delete this comment?')) return;
    try {
      const { error } = await supabase
        .from('lost_and_found_comments')
        .delete()
        .match({ id });
      if (error) throw error;
    } catch (err: any) {
      toast.error('Failed to delete comment');
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    const newMediaUrls = [...formData.media_urls];
    
    try {
      for (const file of Array.from(files)) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `lost-found/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('lost-and-found')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('lost-and-found')
          .getPublicUrl(filePath);

        newMediaUrls.push(publicUrl);
      }
      setFormData(prev => ({ ...prev, media_urls: newMediaUrls }));
    } catch (error: any) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image: ' + error.message);
    } finally {
      setIsUploading(false);
    }
  };

  const fetchItems = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('lost_and_found')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setItems(data || []);
    } catch (err) {
      console.error('Error fetching lost and found items:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isUploading || isSubmitting) return;

    try {
      setIsSubmitting(true);
      const { error } = await supabase
        .from('lost_and_found')
        .insert([formData]);

      if (error) throw error;
      
      toast.success('Item posted successfully!');
      setIsPosting(false);
      setFormData({
        type: 'lost',
        title: '',
        description: '',
        location: '',
        date: new Date().toISOString().split('T')[0],
        student_name: '',
        contact_info: '',
        media_urls: []
      });
    } catch (err: any) {
      console.error('Error posting item:', err);
      toast.error('Failed to post item: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!confirm('Are you sure you want to delete this post?')) return;
    
    try {
      const { error } = await supabase
        .from('lost_and_found')
        .delete()
        .match({ id });

      if (error) throw error;
      toast.success('Post deleted');
      setItems(prev => prev.filter(i => i.id !== id));
      if (selectedPost?.id === id) setSelectedPost(null);
    } catch (error: any) {
      toast.error('Failed to delete: ' + error.message);
    }
  };

  const filteredItems = items.filter(item => {
    const matchesFilter = filter === 'all' || item.type === filter;
    const matchesSearch = (item.title || '').toLowerCase().includes(searchQuery.toLowerCase()) || 
                         (item.description || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (item.location || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Recursive component for threaded comments
  const CommentItem = ({ comment, depth = 0 }: { comment: Comment, depth?: number }) => {
    const childComments = useMemo(() => comments.filter(c => c.parent_id === comment.id), [comments, comment.id]);
    const isReply = depth > 0;

    return (
      <div className={`space-y-3 ${isReply ? 'ml-4 pl-4 border-l-2 border-[#059669]/10' : ''}`}>
        <div className="bg-[#1a311c]/30 rounded-2xl p-4 border border-white/5 group">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-[#059669]/20 flex items-center justify-center text-[#fbbf24]">
                <User size={12} />
              </div>
              <span className="text-[10px] font-black text-[#a0b5a3] uppercase tracking-widest">{comment.author_name}</span>
              <span className="text-[8px] text-[#a0b5a3]/40">• {new Date(comment.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              {isAdmin && (
                <button onClick={() => handleDeleteComment(comment.id)} className="text-red-500/50 hover:text-red-500">
                  <Trash2 size={12} />
                </button>
              )}
              <button 
                onClick={() => {
                  setReplyTo(comment);
                  setCommentText(`@${comment.author_name} `);
                }} 
                className="text-[#fbbf24]/50 hover:text-[#fbbf24] flex items-center gap-1 text-[8px] font-black uppercase"
              >
                <Reply size={10} /> Reply
              </button>
            </div>
          </div>
          <p className="text-xs text-white/90 leading-relaxed whitespace-pre-wrap">
            {comment.content}
          </p>
        </div>
        {childComments.map(child => (
          <CommentItem key={child.id} comment={child} depth={depth + 1} />
        ))}
      </div>
    );
  };

  if (selectedPost) {
    const rootComments = comments.filter(c => !c.parent_id);
    
    return (
      <div className="pb-40 bg-[#0d1f0f] min-h-screen">
        <header className="bg-[#1a2e1c] px-6 py-6 border-b border-[#059669]/20 sticky top-0 z-40 backdrop-blur-md">
          <div className="max-w-2xl mx-auto flex items-center gap-4">
            <button
              onClick={() => setSelectedPost(null)}
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#0d1f0f] border border-[#059669]/20 text-[#059669]"
            >
              <ChevronLeft size={20} />
            </button>
            <h1 className="text-sm font-black text-white uppercase tracking-wider truncate flex-1">Post Details</h1>
            {isAdmin && (
              <button onClick={(e) => handleDelete(selectedPost.id, e)} className="text-red-500/50 hover:text-red-500">
                <Trash2 size={20} />
              </button>
            )}
          </div>
        </header>

        <main className="px-6 py-8 max-w-2xl mx-auto space-y-8">
          <div className="space-y-6">
             <div className="flex gap-2">
                <Badge className={`${selectedPost.type === 'lost' ? 'bg-red-500/20 text-red-400' : 'bg-[#fbbf24]/20 text-[#fbbf24]'} border-0 px-3 py-1 text-[9px] font-black uppercase tracking-widest rounded-lg`}>
                  {t(selectedPost.type)}
                </Badge>
                <span className="text-[10px] text-[#a0b5a3] font-black uppercase tracking-widest self-center opacity-60">
                  Posted {new Date(selectedPost.created_at).toLocaleDateString()}
                </span>
             </div>

             <h2 className="text-2xl font-black text-white uppercase tracking-tight leading-tight">
                {selectedPost.title}
             </h2>

             {selectedPost.media_urls && selectedPost.media_urls.length > 0 && (
                <div className="grid grid-cols-1 gap-4 rounded-[2.5rem] overflow-hidden border border-white/5">
                  {selectedPost.media_urls.map((url, i) => (
                    <img key={i} src={url} className="w-full h-auto object-cover" alt="Post media" />
                  ))}
                </div>
             )}

             <p className="text-base text-[#a0b5a3] leading-relaxed">
                {selectedPost.description}
             </p>

             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-white/5">
                <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#1a2e1c]/50 border border-white/5">
                   <MapPin className="text-[#fbbf24]" size={18} />
                   <div>
                      <p className="text-[8px] font-black text-[#059669] uppercase tracking-[0.2em]">Location</p>
                      <p className="text-xs font-bold text-white uppercase">{selectedPost.location}</p>
                   </div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#1a2e1c]/50 border border-white/5">
                   <Calendar className="text-[#fbbf24]" size={18} />
                   <div>
                      <p className="text-[8px] font-black text-[#059669] uppercase tracking-[0.2em]">Lost/Found On</p>
                      <p className="text-xs font-bold text-white uppercase">{selectedPost.date}</p>
                   </div>
                </div>
             </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-2">
               <MessageCircle className="w-5 h-5 text-[#fbbf24]" />
               <h3 className="text-xs font-black text-white uppercase tracking-[0.2em]">Forum Discussion</h3>
               <span className="ml-auto text-[10px] font-black text-[#059669] uppercase tracking-widest">{comments.length} Comments</span>
            </div>

            <div className="space-y-6 min-h-[100px]">
              {isFetchingComments ? (
                 <div className="flex justify-center py-10 opacity-30">
                    <div className="w-6 h-6 border-2 border-[#fbbf24] border-t-transparent rounded-full animate-spin" />
                 </div>
              ) : rootComments.length > 0 ? (
                rootComments.map(comment => (
                  <CommentItem key={comment.id} comment={comment} />
                ))
              ) : (
                <div className="text-center py-10 rounded-3xl bg-[#1a2e1c]/30 border border-dashed border-white/5">
                   <p className="text-[10px] font-black text-[#a0b5a3]/40 uppercase tracking-widest">No conversation yet. Be the first!</p>
                </div>
              )}
            </div>
          </div>
        </main>

        <div className="fixed bottom-32 left-0 right-0 px-6 z-50">
          <div className="max-w-2xl mx-auto">
             {replyTo && (
               <div className="bg-[#fbbf24] text-[#0d1f0f] px-4 py-1.5 rounded-t-xl text-[8px] font-black uppercase tracking-widest flex justify-between items-center">
                  <span>Replying to {replyTo.author_name}</span>
                  <button onClick={() => { setReplyTo(null); setCommentText(''); }}><X size={10} /></button>
               </div>
             )}
             <form onSubmit={handlePostComment} className={`bg-[#1a2e1c] border border-[#059669]/30 p-2 shadow-2xl flex items-center gap-2 ${replyTo ? 'rounded-b-2xl' : 'rounded-2xl'}`}>
                <input 
                  type="text"
                  placeholder={replyTo ? "Write a reply..." : "Add to discussion..."}
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="flex-1 bg-transparent border-none focus:ring-0 text-sm text-white px-3 py-2 placeholder:text-[#a0b5a3]/30"
                />
                <button 
                  type="submit" 
                  disabled={!commentText.trim()}
                  className="w-10 h-10 rounded-xl bg-[#059669] text-[#0d1f0f] flex items-center justify-center active:scale-90 transition-all disabled:opacity-30"
                >
                  <Send size={16} />
                </button>
             </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-40 bg-[#0d1f0f] min-h-screen">
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
            <h1 className={s("text-[14px] font-black text-white uppercase tracking-[0.2em]")}>{t('lost_and_found')}</h1>
            <p className={s("text-[10px] text-[#059669] font-bold uppercase tracking-widest mt-0.5")}>CAMPUS FORUM</p>
          </div>
          <button
            onClick={() => setIsPosting(true)}
            className="w-12 h-12 rounded-2xl bg-[#fbbf24] flex items-center justify-center border border-[#fbbf24]/20 text-[#0d1f0f] shadow-lg shadow-[#fbbf24]/20 active:scale-90 transition-all"
          >
            <Plus className="w-6 h-6" />
          </button>
        </div>
      </header>

      <main className="px-6 py-6 max-w-2xl mx-auto">
        <div className="flex flex-col gap-4 mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#059669]" />
            <Input
              type="text"
              placeholder="Search items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-[#112613] border-[#059669]/20 rounded-2xl pl-12 pr-4 py-6 text-[#e8f5e9] placeholder:text-[#a0b5a3]/20 focus:border-[#fbbf24]/30 focus:bg-[#1a311c] transition-all"
            />
          </div>

          <div className="flex gap-2">
            {(['all', 'lost', 'found'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={s(`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${
                  filter === f 
                    ? 'bg-[#059669] text-[#0d1f0f] border-[#059669]' 
                    : 'bg-[#1a2e1c] text-[#a0b5a3] border-white/5'
                }`)}
              >
                {t(f === 'all' ? 'all_items' : f)}
              </button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 opacity-50">
            <div className="w-8 h-8 border-2 border-[#059669] border-t-transparent rounded-full animate-spin mb-4" />
            <p className={s("text-[10px] font-black uppercase tracking-widest text-[#a0b5a3]")}>Loading Forum...</p>
          </div>
        ) : filteredItems.length > 0 ? (
          <div className="space-y-6">
            {filteredItems.map((item) => (
              <div 
                key={item.id} 
                onClick={() => setSelectedPost(item)}
                className="bg-[#1a2e1c] border border-white/5 rounded-[2rem] overflow-hidden shadow-xl group transition-all hover:border-[#059669]/30 relative cursor-pointer active:scale-[0.98]"
              >
                {isAdmin && (
                  <button 
                    onClick={(e) => handleDelete(item.id, e)}
                    className="absolute top-4 right-4 z-10 w-10 h-10 rounded-xl bg-red-500/10 text-red-500 flex items-center justify-center border border-red-500/20 active:scale-95 transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                )}
                
                {item.media_urls && item.media_urls.length > 0 && (
                  <div className="aspect-video w-full overflow-hidden border-b border-white/5">
                    <img src={item.media_urls[0]} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <Badge className={s(`${item.type === 'lost' ? 'bg-red-500/20 text-red-400' : 'bg-[#fbbf24]/20 text-[#fbbf24]'} border-0 px-3 py-1 text-[9px] font-black uppercase tracking-widest rounded-lg`)}>
                      {t(item.type)}
                    </Badge>
                    <span className="text-[10px] text-[#a0b5a3] font-medium opacity-60">
                      {new Date(item.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="text-lg font-black text-white mb-2 uppercase tracking-tight group-hover:text-[#fbbf24] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#a0b5a3] leading-relaxed mb-4 line-clamp-2">
                    {item.description}
                  </p>
                  
                  <div className="flex justify-between items-center mt-4 pt-4 border-t border-white/5">
                    <div className={s("flex items-center gap-2 text-[10px] text-[#059669] font-bold uppercase tracking-widest")}>
                      <MapPin className="w-3 h-3 text-[#fbbf24]" />
                      <span className="truncate max-w-[100px]">{item.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[9px] font-black text-[#fbbf24] uppercase tracking-widest">
                       <MessageCircle size={12} />
                       Join Discussion
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-[#1a2e1c]/50 rounded-[2rem] border border-dashed border-white/10">
            <AlertCircle className="w-12 h-12 text-[#a0b5a3]/20 mx-auto mb-4" />
            <p className="text-sm text-[#a0b5a3] font-medium">{t('no_items_posted')}</p>
            <button 
              onClick={() => setIsPosting(true)}
              className={s("mt-6 text-[10px] font-black text-[#059669] uppercase tracking-widest hover:text-[#fbbf24] transition-colors")}
            >
              + {t('post_now')}
            </button>
          </div>
        )}
      </main>

      {isPosting && (
        <div className="fixed inset-0 bg-[#0d1f0f]/98 z-50 flex items-center justify-center p-6 backdrop-blur-md overflow-y-auto">
          <div className="bg-[#1a2e1c] rounded-[2.5rem] max-w-md w-full border border-white/10 overflow-hidden shadow-2xl my-auto">
            <div className="p-8">
              <div className="flex justify-between items-center mb-8">
                <h2 className={s("text-2xl font-black text-white uppercase tracking-tight")}>{t('post_item')}</h2>
                <button onClick={() => setIsPosting(false)} className="text-[#a0b5a3] hover:text-white transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex gap-2">
                  {(['lost', 'found'] as const).map((t_type) => (
                    <button
                      key={t_type}
                      type="button"
                      onClick={() => setFormData({ ...formData, type: t_type })}
                      className={s(`flex-1 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${
                        formData.type === t_type 
                          ? (t_type === 'lost' ? 'bg-red-500 text-white border-red-500' : 'bg-[#fbbf24] text-[#0d1f0f] border-[#fbbf24]')
                          : 'bg-[#112613] text-[#a0b5a3] border-white/5'
                      }`)}
                    >
                      {t(t_type)}
                    </button>
                  ))}
                </div>

                <div className="space-y-2">
                  <label className={s("text-[10px] font-black text-[#059669] uppercase tracking-widest ml-1")}>{t('item_title')} *</label>
                  <Input
                    required
                    placeholder="e.g. Blue Water Bottle"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="bg-[#112613] border-[#059669]/20 rounded-2xl py-6 px-5 text-[#e8f5e9]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className={s("text-[10px] font-black text-[#059669] uppercase tracking-widest ml-1")}>{t('Location')} *</label>
                    <Input
                      required
                      placeholder="e.g. Canteen"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="bg-[#112613] border-[#059669]/20 rounded-2xl py-6 px-5 text-[#e8f5e9]"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className={s("text-[10px] font-black text-[#059669] uppercase tracking-widest ml-1")}>Date *</label>
                    <Input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="bg-[#112613] border-[#059669]/20 rounded-2xl py-6 px-5 text-[#e8f5e9]"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className={s("text-[10px] font-black text-[#059669] uppercase tracking-widest ml-1")}>Description *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Provide details about the item..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full bg-[#112613] border border-[#059669]/20 rounded-2xl px-5 py-4 text-sm text-[#e8f5e9] placeholder:text-[#a0b5a3]/20 focus:outline-none focus:border-[#fbbf24]/30 transition-all resize-none"
                  />
                </div>

                <div className="space-y-4">
                  <label className={s("text-[10px] font-black text-[#059669] uppercase tracking-widest ml-1")}>{t('add_media')}</label>
                  <div className="grid grid-cols-2 gap-4">
                    <label className="flex-1 aspect-video bg-[#112613] border border-dashed border-[#059669]/30 rounded-2xl flex flex-col items-center justify-center gap-2 group hover:border-[#fbbf24]/50 transition-all cursor-pointer">
                      <Camera className="w-6 h-6 text-[#a0b5a3] group-hover:text-[#fbbf24]" />
                      <span className="text-[8px] font-black uppercase text-[#a0b5a3]/50">{isUploading ? 'Uploading...' : 'Photo'}</span>
                      <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="hidden" />
                    </label>
                    {formData.media_urls.length > 0 && (
                      <div className="relative aspect-video rounded-2xl overflow-hidden border border-[#059669]/20">
                        <img src={formData.media_urls[0]} className="w-full h-full object-cover" />
                        {formData.media_urls.length > 1 && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-xs font-black">
                            +{formData.media_urls.length - 1} More
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isUploading || isSubmitting}
                  className={s("w-full bg-[#059669] text-[#0d1f0f] py-5 rounded-2xl text-[11px] font-black uppercase tracking-[0.3em] hover:bg-[#fbbf24] transition-all active:scale-95 shadow-lg shadow-[#059669]/20 flex items-center justify-center gap-3 mt-4 disabled:opacity-50")}
                >
                  <Send className="w-4 h-4" />
                  {isSubmitting ? 'Posting...' : t('post_now')}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
