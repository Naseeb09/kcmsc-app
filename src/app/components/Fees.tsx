import { DollarSign, ChevronLeft } from 'lucide-react';
import { Card, CardContent } from '@/app/components/ui/card';

interface FeesProps {
  onNavigate: (view: string) => void;
}

export function Fees({ onNavigate }: FeesProps) {
  const feeStructure = [
    {
      level: 'Kindergarten (KG)',
      fees: [
        { category: 'Admission Fee', amount: '0000' },
        { category: 'Monthly Fee', amount: '0000' },
        { category: 'Facility Fee', amount: '0000' },
      ]
    },
    {
      level: 'Primary (Class 1-5)',
      fees: [
        { category: 'Admission Fee', amount: '0000' },
        { category: 'Monthly Fee', amount: '0000' },
        { category: 'Facility Fee', amount: '0000' },
      ]
    },
    {
      level: 'Secondary (Class 6-10)',
      fees: [
        { category: 'Admission Fee', amount: '0000' },
        { category: 'Monthly Fee', amount: '0000' },
        { category: 'Facility Fee', amount: '0000' },
      ]
    },
    {
      level: 'College (Class 11-12)',
      fees: [
        { category: 'Admission Fee', amount: '0000' },
        { category: 'Monthly Fee', amount: '0000' },
        { category: 'Facility Fee', amount: '0000' },
      ]
    }
  ];

  return (
    <div className="pb-20 bg-[#0d1f0f] min-h-screen">
      {/* Header */}
      <div className="bg-[#1a2e1c] px-6 py-4 border-b border-[#059669]/20">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={() => onNavigate('home')}
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#1a3a1d] text-[#059669]"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex-1">
              <h1 className="text-lg font-medium text-[#e8f5e9]">Fees & Costs</h1>
              <p className="text-[10px] text-[#a0b5a3] uppercase tracking-wide">TUITION STRUCTURE</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-[#059669]/20 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-[#fbbf24]" />
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-6 max-w-2xl mx-auto">
        {/* Important Note */}
        <div className="bg-[#1a3a1d] border border-[#fbbf24]/30 rounded-2xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#fbbf24]/20 flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-[#fbbf24] text-lg">ℹ️</span>
            </div>
            <div>
              <h3 className="text-sm font-medium text-[#e8f5e9] mb-1">Important Information</h3>
              <p className="text-xs text-[#a0b5a3] leading-relaxed">
                Please contact the admissions office for the most current fee structure and available payment plans. Fees are subject to change annually.
              </p>
            </div>
          </div>
        </div>

        {/* Fee Structure Cards */}
        <div className="space-y-4">
          {feeStructure.map((structure, index) => (
            <Card key={index} className="bg-[#1a3a1d] border border-[#059669]/20">
              <CardContent className="p-0">
                {/* Header */}
                <div className="bg-[#059669]/10 border-b border-[#059669]/20 px-4 py-3">
                  <h3 className="text-sm font-medium text-[#e8f5e9]">{structure.level}</h3>
                </div>

                {/* Fee Items */}
                <div className="p-4 space-y-3">
                  {structure.fees.map((fee, feeIndex) => (
                    <div key={feeIndex} className="flex items-center justify-between">
                      <span className="text-sm text-[#a0b5a3]">{fee.category}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-[#059669]">৳</span>
                        <span className="text-lg font-bold text-[#e8f5e9] font-mono">{fee.amount}</span>
                      </div>
                    </div>
                  ))}
                  
                  {/* Separator */}
                  <div className="border-t border-[#059669]/20 pt-3 mt-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-[#e8f5e9]">Total (Annual)</span>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-[#fbbf24]">৳</span>
                        <span className="text-lg font-bold text-[#fbbf24] font-mono">0000</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Information */}
        <div className="mt-6 bg-[#1a3a1d] border border-[#059669]/20 rounded-2xl p-4">
          <h3 className="text-sm font-medium text-[#e8f5e9] mb-3">Payment Information</h3>
          <ul className="space-y-2">
            <li className="flex items-start gap-2 text-xs text-[#a0b5a3]">
              <span className="text-[#059669] mt-0.5">•</span>
              <span>Fees can be paid monthly, quarterly, or annually</span>
            </li>
            <li className="flex items-start gap-2 text-xs text-[#a0b5a3]">
              <span className="text-[#059669] mt-0.5">•</span>
              <span>Sibling discounts available upon request</span>
            </li>
            <li className="flex items-start gap-2 text-xs text-[#a0b5a3]">
              <span className="text-[#059669] mt-0.5">•</span>
              <span>Late payment charges may apply after due date</span>
            </li>
            <li className="flex items-start gap-2 text-xs text-[#a0b5a3]">
              <span className="text-[#059669] mt-0.5">•</span>
              <span>Financial aid programs available for eligible students</span>
            </li>
          </ul>
        </div>

        {/* Contact Button */}
        <div className="mt-6">
          <button 
            onClick={() => onNavigate('contact')}
            className="w-full bg-[#059669] text-white rounded-xl py-3 px-4 text-sm font-medium hover:bg-[#047857] transition-colors"
          >
            Contact Admissions Office
          </button>
        </div>
      </div>
    </div>
  );
}
