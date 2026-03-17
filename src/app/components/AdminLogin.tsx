import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAppContext } from '@/context/AppContext';
import { Shield, Lock, User, ArrowLeft, Sparkles } from 'lucide-react';

interface AdminLoginProps {
  onNavigate: (view: string) => void;
}

export function AdminLogin({ onNavigate }: AdminLoginProps) {
  const { setIsAdmin } = useAppContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        setIsAdmin(true);
        onNavigate('admin-dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1f0f] flex flex-col p-6 font-sans relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[40%] bg-[#059669]/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[40%] bg-[#fbbf24]/5 blur-[120px] rounded-full" />

      <button 
        onClick={() => onNavigate('home')}
        className="relative z-10 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#a0b5a3] hover:text-white transition-colors mb-12"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>

      <div className="relative z-10 max-w-sm mx-auto w-full flex-1 flex flex-col justify-center">
        <div className="mb-12 text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-[#059669] to-[#047857] rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-[#059669]/20 border border-white/10">
            <Shield className="w-10 h-10 text-[#0d1f0f]" />
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight uppercase mb-2">Admin Portal</h1>
          <p className="text-[#a0b5a3] text-xs font-bold uppercase tracking-[0.2em]">Restricted Access Only</p>
        </div>

        <div className="bg-white/[0.03] backdrop-blur-2xl border border-[#059669]/20 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#fbbf24] to-transparent opacity-50" />
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-[#059669] uppercase tracking-widest ml-1">Identity (Email)</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a0b5a3] group-focus-within:text-[#fbbf24] transition-colors">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#0d1f0f] border border-[#059669]/30 rounded-2xl pl-12 pr-4 py-4 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-[#fbbf24] transition-all"
                  placeholder="admin@kcmsc.edu.bd"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-[#059669] uppercase tracking-widest ml-1">Access Key (Password)</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a0b5a3] group-focus-within:text-[#fbbf24] transition-colors">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#0d1f0f] border border-[#059669]/30 rounded-2xl pl-12 pr-4 py-4 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-[#fbbf24] transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-xs font-bold text-center">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] text-[#0d1f0f] py-5 rounded-2xl text-xs font-black uppercase tracking-[0.3em] shadow-xl shadow-[#fbbf24]/10 hover:shadow-[#fbbf24]/20 active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-[#0d1f0f]/20 border-t-[#0d1f0f] rounded-full animate-spin" />
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Initialize Session
                </>
              )}
            </button>
          </form>
        </div>

        <footer className="mt-12 text-center">
          <p className="text-[9px] font-black text-[#a0b5a3]/20 uppercase tracking-[0.4em]">
            Secured by <span className="text-[#059669]">Glitched Auth</span>
          </p>
        </footer>
      </div>
    </div>
  );
}
