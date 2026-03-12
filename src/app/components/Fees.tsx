import React, { useEffect } from 'react';
import { DollarSign, ChevronLeft, Info, Receipt, CreditCard, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';

interface FeesProps {
  onNavigate: (view: string) => void;
}

export function Fees({ onNavigate }: FeesProps) {
  // FIX: Force scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const feeStructure = [
    {
      level: 'Kindergarten (KG)',
      total: '45,000',
      fees: [
        { category: 'Admission Fee', amount: '15,000' },
        { category: 'Monthly Tuition', amount: '2,500' },
        { category: 'Session Fee', amount: '5,000' },
      ]
    },
    {
      level: 'Primary (Class 1-5)',
      total: '55,000',
      fees: [
        { category: 'Admission Fee', amount: '18,000' },
        { category: 'Monthly Tuition', amount: '3,500' },
        { category: 'Lab & Library', amount: '3,000' },
      ]
    },
    {
      level: 'Secondary (Class 6-10)',
      total: '72,000',
      fees: [
        { category: 'Admission Fee', amount: '20,000' },
        { category: 'Monthly Tuition', amount: '5,000' },
        { category: 'Exam & Tech Fee', amount: '6,000' },
      ]
    },
    {
      level: 'College (Class 11-12)',
      total: '85,000',
      fees: [
        { category: 'Admission Fee', amount: '25,000' },
        { category: 'Monthly Tuition', amount: '6,500' },
        { category: 'Development Fee', amount: '8,000' },
      ]
    }
  ];

  return (
    <div className="pb-24 bg-[#0d1f0f] min-h-screen font-sans selection:bg-[#fbbf24] selection:text-[#0d1f0f]">
      
      {/* 1. HEADER - STANDOUT FEES STYLE */}
      <header className="relative bg-[#1a2e1c] px-6 pt-10 pb-8 border-b border-[#059669]/30 overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#059669]/20 blur-[100px] rounded-full -mr-20 -mt-20 opacity-60" />
        
        <div className="max-w-md mx-auto relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Rectangular Back Button */}
              <button
                onClick={() => onNavigate('home')}
                className="w-11 h-11 rounded-xl bg-[#0d1f0f] flex items-center justify-center border border-[#059669]/40 text-[#059669] shadow-[0_0_15px_rgba(5,150,105,0.1)] active:scale-95 transition-all"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              
              <div>
                {/* Bolder Dual-Tone Title */}
                <h1 className="text-[11px] font-black text-white uppercase tracking-[0.4em] leading-none mb-1.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                  Tuition <span className="text-[#059669]">Structure</span>
                </h1>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#fbbf24] animate-pulse" />
                  <p className="text-[9px] text-[#a0b5a3] uppercase font-bold tracking-[0.2em]">Fees & Costs 2024-25</p>
                </div>
              </div>
            </div>

            {/* Contextual Icon Container - Gold Dollar Sign */}
            <div className="w-12 h-12 rounded-2xl bg-[#fbbf24]/5 border border-[#fbbf24]/20 flex items-center justify-center shadow-2xl backdrop-blur-md">
                <DollarSign className="w-5 h-5 text-[#fbbf24] drop-shadow-[0_0_8px_rgba(251,191,36,0.4)]" />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-6 py-8 space-y-8">
        
        {/* 2. IMPORTANT ADVISORY */}
        <section className="bg-[#fbbf24]/5 border border-[#fbbf24]/20 rounded-[2.5rem] p-6 shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#fbbf24]/5 blur-2xl -mr-10 -mt-10" />
          <div className="flex items-start gap-4 relative z-10">
            <div className="w-10 h-10 rounded-xl bg-[#fbbf24]/10 flex items-center justify-center shrink-0 border border-[#fbbf24]/20">
              <Info className="text-[#fbbf24] w-5 h-5" />
            </div>
            <div>
              <h3 className="text-[10px] font-black text-[#fbbf24] uppercase tracking-[0.2em] mb-1">Financial Advisory</h3>
              <p className="text-[11px] text-white/80 font-bold uppercase leading-relaxed tracking-tight">
                Fees are subject to annual review. Contact the <span className="text-[#059669] font-black underline decoration-[#059669]/30">Accounts Desk</span> for personalized payment installments.
              </p>
            </div>
          </div>
        </section>

        {/* 3. FEE CARDS */}
        <div className="space-y-5">
          {feeStructure.map((item, index) => (
            <Card key={index} className="bg-[#1a2e1c] border border-[#059669]/20 rounded-[2.5rem] overflow-hidden shadow-2xl transition-all hover:border-[#059669]/40">
              <CardContent className="p-0">
                <div className="bg-[#112613] px-6 py-5 border-b border-[#059669]/10 flex justify-between items-center">
                  <h3 className="text-xs font-black text-white uppercase tracking-widest">{item.level}</h3>
                  <Badge className="bg-[#059669]/10 text-[#059669] border border-[#059669]/20 text-[8px] font-black uppercase tracking-tighter">Verified Rate</Badge>
                </div>

                <div className="p-7 space-y-4">
                  {item.fees.map((fee, fIdx) => (
                    <div key={fIdx} className="flex justify-between items-center group">
                      <span className="text-[10px] font-bold text-[#a0b5a3] uppercase tracking-widest group-hover:text-white transition-colors">{fee.category}</span>
                      <div className="flex items-center gap-1">
                        <span className="text-[10px] font-black text-[#059669]">৳</span>
                        <span className="text-sm font-black text-white tracking-tighter">{fee.amount}</span>
                      </div>
                    </div>
                  ))}
                  
                  <div className="pt-6 mt-2 border-t border-[#059669]/10 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <Sparkles className="w-3 h-3 text-[#fbbf24]" />
                        <span className="text-[10px] font-black text-[#fbbf24] uppercase tracking-[0.2em]">Est. Annual Total</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-black text-[#fbbf24]">৳</span>
                      <span className="text-xl font-black text-[#fbbf24] tracking-tighter drop-shadow-[0_0_10px_rgba(251,191,36,0.2)]">{item.total}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 4. PAYMENT TERMS */}
        <section className="bg-[#112613] border border-[#059669]/10 rounded-[2.5rem] p-8 shadow-inner">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-[#059669]/10 rounded-lg">
                <Receipt className="w-5 h-5 text-[#059669]" />
            </div>
            <h3 className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Payment Terms</h3>
          </div>
          <ul className="space-y-4">
            {[
              'Flexible Monthly/Quarterly installments',
              'Sibling discount (15%) on tuition only',
              'Late fee of ৳500 applies after 10th of month',
              'Online payments via bKash/Nagad supported'
            ].map((text, i) => (
              <li key={i} className="flex items-center gap-4 group">
                <div className="w-1.5 h-1.5 rounded-full bg-[#059669] group-hover:scale-150 transition-transform" />
                <span className="text-[10px] text-[#a0b5a3] font-bold uppercase tracking-tight group-hover:text-white transition-colors">{text}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* 5. ACTION BUTTON */}
        <div className="pt-4">
            <button 
            onClick={() => onNavigate('contact')}
            className="w-full bg-[#059669] text-[#0d1f0f] rounded-[2rem] py-6 flex items-center justify-center gap-3 shadow-xl shadow-[#059669]/10 hover:bg-[#fbbf24] transition-all active:scale-95 group"
            >
            <CreditCard className="w-5 h-5 transition-transform group-hover:-rotate-12" />
            <span className="text-[12px] font-black uppercase tracking-[0.4em]">Contact Admissions</span>
            </button>
        </div>

      </main>
    </div>
  );
}