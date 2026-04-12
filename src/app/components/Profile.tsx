import { useState } from 'react';
import { User } from 'lucide-react';
import { Input } from '@/app/components/ui/input';
import { TeacherDashboard } from '@/app/components/TeacherDashboard';

interface ProfileProps {
  onNavigate: (view: string) => void;
}

export function Profile({ onNavigate }: ProfileProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [teacherId, setTeacherId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [teacherName, setTeacherName] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Simple teacher authentication (in production, this would be server-side)
    // Demo credentials: teacher123 / password123
    if (teacherId === 'teacher123' && password === 'password123') {
      setIsLoggedIn(true);
      setTeacherName('Dr. Richard Foster');
    } else {
      setError('Invalid credentials. Only teachers can log in.');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setTeacherId('');
    setPassword('');
    setTeacherName('');
    setError('');
  };

  // If logged in, show teacher dashboard
  if (isLoggedIn) {
    return <TeacherDashboard onNavigate={onNavigate} onLogout={handleLogout} teacherName={teacherName} />;
  }

  // Login Screen for Teachers Only
  return (
    <div className="pb-20 bg-[#0d1f0f] min-h-screen flex items-center justify-center px-6">
      <div className="max-w-md w-full">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#059669]/20 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-[#059669]/30">
            <User className="w-8 h-8 text-[#059669]" />
          </div>
          <h1 className="text-xl font-medium text-[#e8f5e9] mb-2">Teacher Login</h1>
          <p className="text-xs text-[#a0b5a3]">KC Model School & College</p>
        </div>

        {/* Important Notice */}
        <div className="bg-[#1a3a1d] border border-[#fbbf24]/30 rounded-2xl p-4 mb-6">
          <div className="flex items-start gap-2">
            <span className="text-[#fbbf24] text-lg">ℹ️</span>
            <div>
              <h3 className="text-sm font-medium text-[#e8f5e9] mb-1">Teacher Access Only</h3>
              <p className="text-xs text-[#a0b5a3] leading-relaxed">
                This portal is exclusively for teachers with administrative privileges. Students and guardians can view school information without logging in.
              </p>
            </div>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3">
              <p className="text-xs text-red-400">{error}</p>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-[#e8f5e9] mb-2">
              Teacher ID
            </label>
            <Input
              type="text"
              placeholder="Enter your teacher ID"
              value={teacherId}
              onChange={(e) => setTeacherId(e.target.value)}
              className="bg-[#1a3a1d] border-[#059669]/30 text-[#e8f5e9] placeholder:text-[#a0b5a3]/60 focus:border-[#059669]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#e8f5e9] mb-2">
              Password
            </label>
            <Input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-[#1a3a1d] border-[#059669]/30 text-[#e8f5e9] placeholder:text-[#a0b5a3]/60 focus:border-[#059669]"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#059669] text-white rounded-xl py-3 px-4 text-sm font-medium hover:bg-[#047857] transition-colors mt-6"
          >
            Login as Teacher
          </button>
        </form>

        {/* Demo Credentials Info */}
        <div className="mt-6 bg-[#1a3a1d] border border-[#059669]/20 rounded-xl p-3">
          <p className="text-xs text-[#a0b5a3] mb-2">
            <span className="text-[#e8f5e9] font-medium">Demo Credentials:</span>
          </p>
          <p className="text-xs text-[#a0b5a3]">
            Teacher ID: <span className="text-[#059669] font-mono">teacher123</span>
          </p>
          <p className="text-xs text-[#a0b5a3]">
            Password: <span className="text-[#059669] font-mono">password123</span>
          </p>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-[#a0b5a3]">
            Forgot your password?{' '}
            <button 
              onClick={() => onNavigate('contact')}
              className="text-[#059669] hover:underline"
            >
              Contact Admin Office
            </button>
          </p>
        </div>
        <div className="mt-8 pt-8 border-t border-white/5 text-center">
          <button 
            onClick={() => onNavigate('admin-login')}
            className="text-[10px] font-black text-[#a0b5a3]/20 uppercase tracking-[0.4em] hover:text-[#059669] transition-colors"
          >
            Admin Portal
          </button>
        </div>
      </div>
    </div>
  );
}
