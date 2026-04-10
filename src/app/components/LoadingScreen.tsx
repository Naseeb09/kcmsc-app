import React from 'react';
import schoolLogo from '@/data/kcmsc-logo.png';

export function LoadingScreen() {
  return (
    <div className="min-h-screen bg-[#0d1f0f] flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Subtle Ambient Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_#0596690a_0%,_transparent_70%)]" />
      
      <div className="relative z-10 flex flex-col items-center">
        {/* Institutional Logo Container */}
        <div className="relative mb-12 group">
          {/* External premium ring animation */}
          <div className="absolute inset-[-12px] rounded-full border-t-2 border-b-2 border-[#fbbf24] animate-spin duration-[3000ms] opacity-40" />
          <div className="absolute inset-[-6px] rounded-full border-l-2 border-r-2 border-[#059669] animate-spin-reverse duration-[2000ms] opacity-60" />
          
          <div className="w-24 h-24 rounded-full bg-[#1a2e1c] border border-[#059669]/20 flex items-center justify-center shadow-[0_0_40px_rgba(5,150,105,0.15)] relative z-10 p-4">
            <img 
              src={schoolLogo} 
              alt="KC Model School Logo" 
              className="w-full h-full object-contain drop-shadow-lg" 
            />
          </div>
        </div>
        
        {/* Refined Textual Indicator */}
        <div className="text-center space-y-4">
          <div className="flex flex-col items-center gap-1">
            <h1 className="text-[10px] font-black text-[#059669] uppercase tracking-[0.6em] opacity-90">
              KC Model School
            </h1>
            <h2 className="text-[12px] font-black text-white uppercase tracking-[0.4em]">
              Campus Navigator
            </h2>
          </div>
          
          {/* Smooth Progress Bar (Visual only, for premium feel) */}
          <div className="w-48 h-1 bg-[#1a2e1c] rounded-full overflow-hidden border border-white/5 mx-auto">
            <div className="h-full bg-gradient-to-r from-[#059669] via-[#fbbf24] to-[#059669] w-full animate-loading-bar" />
          </div>
          
          <p className="text-[9px] font-bold text-[#a0b5a3] uppercase tracking-[0.3em] opacity-40">
            Securely syncing resources...
          </p>
        </div>
      </div>

      {/* Footer Branding */}
      <div className="absolute bottom-10 left-0 right-0 text-center">
        <p className="text-[8px] font-black text-[#a0b5a3]/20 uppercase tracking-[0.4em]">
          Built by Glitched Technologies
        </p>
      </div>

      <style>{`
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        .animate-spin-reverse {
          animation: spin-reverse linear infinite;
        }
        @keyframes loading-bar {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(0); }
          100% { transform: translateX(100%); }
        }
        .animate-loading-bar {
          animation: loading-bar 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
