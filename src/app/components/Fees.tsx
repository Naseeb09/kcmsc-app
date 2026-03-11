import { DollarSign, ChevronLeft, Info, Receipt, CreditCard, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';

interface FeesProps {
  onNavigate: (view: string) => void;
}

export function Fees({ onNavigate }: FeesProps) {
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
      
      {/* 1. HEADER - COMPACT GLITCHED STYLE */}
      <header className="relative bg-[#1a2e1c] px-6 pt-10 pb-8 border-b border-[#059669]/20 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#059669]/10 via-transparent to-transparent opacity-50" />
        
        <div className="max-w-md mx-auto relative z-10">
          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate('home')}
              className="w-11 h-11 rounded-xl bg-[#0d1f0f] flex items-center justify-center border border-[#059669]/20 text-[#059669] hover:text-[#fbbf24] transition-all active:scale-95 shadow-lg"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <div className="flex-1">
              <h1 className="text-[10px] font-black text-[#059669] uppercase tracking-[0.3em] mb-0.5">Tuition Structure</h1>
              <div className="flex items-center gap-1.5 mt-1">
                <div className="w-1.5 h-1.5 rounded-full bg-[#fbbf24] animate-pulse" />
                <p className="text-[9px] text-[#a0b5a3] uppercase font-bold tracking-widest">Fees & Costs 2024-25</p>
              </div>
            </div>

            <div className="w-11 h-11 rounded-xl bg-[#fbbf24]/10 border border-[#fbbf24]/20 flex items-center justify-center shadow-lg">
              <DollarSign className="w-5 h-5 text-[#fbbf24]" />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-6 py-8 space-y-6">
        
        {/* 2. IMPORTANT NOTICE */}
        <section className="bg-[#fbbf24]/5 border border-[#fbbf24]/20 rounded-[2rem] p-5 shadow-inner">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#fbbf24]/10 flex items-center justify-center shrink-0 border border-[#fbbf24]/20">
              <Info className="text-[#fbbf24] w-5 h-5" />
            </div>
            <div>
              <h3 className="text-[10px] font-black text-[#fbbf24] uppercase tracking-widest mb-1">Financial Advisory</h3>
              <p className="text-[11px] text-white font-bold uppercase leading-relaxed opacity-80">
                Fees are subject to annual review. Contact the <span className="text-[#059669]">Accounts Desk</span> for personalized payment installments.
              </p>
            </div>
          </div>
        </section>

        {/* 3. FEE CARDS */}
        <div className="space-y-4">
          {feeStructure.map((item, index) => (
            <Card key={index} className="bg-[#1a2e1c] border border-[#059669]/20 rounded-[2.5rem] overflow-hidden shadow-xl">
              <CardContent className="p-0">
                <div className="bg-[#112613] px-6 py-4 border-b border-[#059669]/10 flex justify-between items-center">
                  <h3 className="text-xs font-black text-white uppercase tracking-tight">{item.level}</h3>
                  <Badge className="bg-[#059669]/20 text-[#059669] border-0 text-[8px] font-black uppercase">Standard Rate</Badge>
                </div>

                <div className="p-6 space-y-4">
                  {item.fees.map((fee, fIdx) => (
                    <div key={fIdx} className="flex justify-between items-center">
                      <span className="text-[10px] font-black text-[#a0b5a3] uppercase tracking-wider">{fee.category}</span>
                      <div className="flex items-center gap-1">
                        <span className="text-[10px] font-black text-[#059669]">৳</span>
                        <span className="text-sm font-black text-white tracking-tighter">{fee.amount}</span>
                      </div>
                    </div>
                  ))}
                  
                  <div className="pt-4 border-t border-[#059669]/10 flex justify-between items-center">
                    <span className="text-[10px] font-black text-[#fbbf24] uppercase tracking-[0.2em]">Est. Annual Total</span>
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-black text-[#fbbf24]">৳</span>
                      <span className="text-lg font-black text-[#fbbf24] tracking-tighter">{item.total}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 4. PAYMENT TERMS */}
        <section className="bg-[#112613] border border-white/5 rounded-[2rem] p-6">
          <div className="flex items-center gap-3 mb-4">
            <Receipt className="w-5 h-5 text-[#059669]" />
            <h3 className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Payment Terms</h3>
          </div>
          <ul className="space-y-3">
            {[
              'Flexible Monthly/Quarterly installments',
              'Sibling discount (15%) on tuition only',
              'Late fee of ৳500 applies after 10th of month',
              'Online payments via bKash/Nagad supported'
            ].map((text, i) => (
              <li key={i} className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#059669]" />
                <span className="text-[10px] text-[#a0b5a3] font-bold uppercase tracking-tighter">{text}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* 5. ACTION BUTTON */}
        <button 
          onClick={() => onNavigate('contact')}
          className="w-full bg-[#059669] text-[#0d1f0f] rounded-[1.5rem] py-5 flex items-center justify-center gap-3 shadow-xl shadow-[#059669]/10 hover:bg-[#fbbf24] transition-all active:scale-95 group"
        >
          <CreditCard className="w-5 h-5" />
          <span className="text-[11px] font-black uppercase tracking-[0.3em]">Contact Admissions</span>
        </button>

      </main>
    </div>
  );
}