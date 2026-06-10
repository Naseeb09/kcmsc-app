import React, { useState, useEffect, useRef } from 'react';
import { Bot, Send, X, MessageSquare, ShieldAlert, Sparkles, User, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '@/context/AppContext';
import { useTranslation } from '@/hooks/useTranslation';
import { schoolInfo, contactInfo } from '@/data/announcements';

interface Message {
  role: 'user' | 'bot';
  content: string;
}

export function GlitchedAI({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { floors, teachers, language } = useAppContext();
  const { t, s } = useTranslation();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', content: language === 'bn' ? 'হ্যালো! আমি কেসিএমএসসি এআই। আমি আপনাকে কীভাবে সাহায্য করতে পারি?' : 'Hello! I am KCMSC AI. How can I help you today?' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const knowledgeBase = {
    school: schoolInfo,
    contact: contactInfo,
    floors: floors.map(f => ({
      name: f.name,
      label: f.label,
      purpose: f.purpose,
      rooms: f.classes.map(c => `${c.room} (${c.name || c.section})`)
    })),
    teachers: teachers.map(t => ({ name: t.name, role: t.role, subject: t.subject }))
  };

  const generateResponse = (query: string) => {
    const q = query.toLowerCase();
    
    // Safety check for "bad things"
    const redFlags = ['bad', 'stupid', 'hate', 'kill', 'abuse', 'hack', 'porn', 'sexy'];
    if (redFlags.some(flag => q.includes(flag))) {
      return language === 'bn' ? 'আমি এই ধরণের বার্তার উত্তর দিতে পারি না। অনুগ্রহ করে শালীন ভাষা ব্যবহার করুন।' : "I can't respond to this. Please maintain a respectful tone.";
    }

    // Dynamic Context Logic
    if (q.includes('what are you') || q.includes('who are you') || q.includes('doing')) {
      return language === 'bn' 
        ? 'আমি কেসিএমএসসি স্মার্ট অ্যাসিস্ট্যান্ট। আমি আপনাকে এই ক্যাম্পাস নেভিগেট করতে এবং স্কুল সম্পর্কে তথ্য দিতে সাহায্য করি।' 
        : 'I am the KCMSC Smart Assistant. I help you navigate the campus and provide real-time information about our school.';
    }

    if (q.includes('how many classes') || q.includes('total classes') || q.includes('classes')) {
      const totalClasses = floors.reduce((acc, f) => acc + (f.classes?.length || 0), 0);
      return language === 'bn' 
        ? `আমাদের স্কুলে বর্তমানে মোট ${totalClasses} টি ক্লাস বা রুম রেকর্ড করা আছে। আপনি এক্সপ্লোর সেকশনে সব তলার তথ্য পাবেন।` 
        : `We currently have ${totalClasses} recorded classes/rooms across the campus. You can view them floor-by-floor in the Explore section.`;
    }

    if (q.includes('teacher') || q.includes('faculty')) {
      const totalTeachers = teachers.length;
      return language === 'bn'
        ? `আমাদের বর্তমানে ${totalTeachers} জন অনুষদ সদস্য রয়েছেন। আপনি ডিরেক্টরি সেকশনে তাদের বিস্তারিত এবং ফোন নম্বর পেতে পারেন।`
        : `We have ${totalTeachers} faculty members listed. You can find their details and phone numbers in the Directory section.`;
    }

    // FAQ Logic
    if (q.includes('principal')) {
      const principal = teachers.find(t => t.role?.toLowerCase().includes('principal'));
      return language === 'bn' 
        ? `কেসি মডেল স্কুল এন্ড কলেজের অধ্যক্ষ হলেন ${principal?.name || 'প্রফেসর মো: আব্দুল বাতেন'}। তাঁর কক্ষটি ১ম তলায় (রুম ২০৬)।` 
        : `The Principal of KC Model School & College is ${principal?.name || 'Prof Md Abdul Baten'}. His office is on the 1st Floor (Room 206).`;
    }

    if (q.includes('vice principal')) {
      const vps = teachers.filter(t => t.role?.toLowerCase().includes('vice principal'));
      const vpNames = vps.map(v => v.name).join(', ');
      return language === 'bn'
        ? `আমাদের উপাধ্যক্ষরা হলেন: ${vpNames}।`
        : `Our Vice Principals are: ${vpNames}.`;
    }
    
    if (q.includes('fee') || q.includes('cost') || q.includes('admission')) {
      return language === 'bn' ? 'ভর্তি ফি এবং মাসিক বেতনের বিস্তারিত তথ্যের জন্য অনুগ্রহ করে আমাদের প্রধান ডেস্কে যোগাযোগ করুন অথবা মেনু থেকে "Fees" সেকশনটি দেখুন।' : 'For admission fees and tuition details, please contact our main desk or visit the "Fees" section in the menu.';
    }

    if (q.includes('location') || q.includes('address') || q.includes('where')) {
      return `${language === 'bn' ? 'আমাদের ক্যাম্পাসটি এখানে অবস্থিত:' : 'Our campus is located at:'} ${contactInfo.address}`;
    }

    if (q.includes('floor') || q.includes('map')) {
      return language === 'bn' ? `আমাদের ${floors.length}টি তলা রয়েছে। ১ম তলায় নার্সারি ও কেজি, এবং ৮ম তলায় কলেজ শাখা অবস্থিত।` : `We have ${floors.length} floors. Nursery & KG are on the 1st Floor, and the College section is on the 8th Floor.`;
    }

    if (q.includes('phone') || q.includes('contact') || q.includes('call')) {
      return `${language === 'bn' ? 'আপনি আমাদের এখানে ফোন করতে পারেন:' : 'You can call us at:'} ${contactInfo.phone}`;
    }

    if (q.includes('hello') || q.includes('hi')) {
      return language === 'bn' ? 'হ্যালো! আমি আপনাকে কীভাবে সাহায্য করতে পারি? আপনি স্কুল, ফ্লোর বা শিক্ষক সম্পর্কে জিজ্ঞাসা করতে পারেন।' : "Hello! How can I help you? You can ask about the school, floors, or teachers.";
    }

    return language === 'bn' ? 'দুঃখিত, আমি এই বিষয়ে জানি না। আপনি কি অন্য কিছু জিজ্ঞাসা করতে চান? যেমন কতটি তলা বা অধ্যক্ষের নাম?' : "I'm sorry, I don't have information on that specific topic yet. Try asking about the number of floors, total teachers, or the Principal!";
  };

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMsg = { role: 'user' as const, content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = generateResponse(userMsg.content);
      setMessages(prev => [...prev, { role: 'bot', content: botResponse }]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 100, scale: 0.9 }}
          className="fixed inset-0 z-[100] flex flex-col bg-[#0d1f0f] md:inset-auto md:bottom-24 md:right-6 md:w-[400px] md:h-[600px] md:rounded-[2.5rem] md:border md:border-[#059669]/30 md:shadow-[0_0_50px_rgba(5,150,105,0.2)] overflow-hidden"
        >
          {/* Header */}
          <div className="bg-[#1a2e1c] p-6 border-b border-[#059669]/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#059669] flex items-center justify-center shadow-[0_0_15px_rgba(5,150,105,0.4)]">
                <Bot className="text-white w-6 h-6" />
              </div>
              <div>
                <h2 className="text-sm font-black text-white uppercase tracking-widest leading-none mb-1">KCMSC <span className="text-[#fbbf24]">AI Bot</span></h2>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#fbbf24] animate-pulse" />
                  <p className="text-[10px] text-[#a0b5a3] font-bold uppercase tracking-widest">Always Online</p>
                </div>
              </div>
            </div>
            <button onClick={onClose} className="p-3 rounded-xl bg-[#0d1f0f] text-[#a0b5a3] hover:text-white transition-colors border border-white/5">
              <X size={20} />
            </button>
          </div>

          {/* Chat Area */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
            {messages.map((msg, i) => (
              <motion.div
                initial={{ opacity: 0, x: msg.role === 'bot' ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                key={i}
                className={`flex ${msg.role === 'bot' ? 'justify-start' : 'justify-end'}`}
              >
                <div className={`max-w-[85%] p-4 rounded-2xl relative ${
                  msg.role === 'bot' 
                  ? 'bg-[#1a2e1c] text-[#e8f5e9] rounded-tl-none border border-[#059669]/20' 
                  : 'bg-[#059669] text-white rounded-tr-none shadow-lg'
                }`}>
                  <p className="text-sm leading-relaxed font-medium">{msg.content}</p>
                </div>
              </motion.div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-[#1a2e1c] p-4 rounded-2xl rounded-tl-none border border-[#059669]/20 flex gap-1">
                  <div className="w-1.5 h-1.5 bg-[#059669] rounded-full animate-bounce" />
                  <div className="w-1.5 h-1.5 bg-[#059669] rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-1.5 h-1.5 bg-[#059669] rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-6 bg-[#1a2e1c] border-t border-[#059669]/30">
            <div className="relative flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder={language === 'bn' ? 'কিছু জিজ্ঞাসা করুন...' : 'Ask me anything...'}
                className="flex-1 bg-[#0d1f0f] border border-[#059669]/30 rounded-2xl py-4 pl-5 pr-14 text-sm text-white focus:outline-none focus:border-[#fbbf24] transition-all"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className="absolute right-2 p-2.5 rounded-xl bg-[#059669] text-white disabled:opacity-50 disabled:bg-gray-600 transition-all hover:bg-[#fbbf24] hover:text-[#0d1f0f]"
              >
                <Send size={20} />
              </button>
            </div>
            <p className="text-[9px] text-center text-[#a0b5a3] mt-4 font-bold uppercase tracking-widest opacity-50 flex items-center justify-center gap-2">
              <Sparkles size={10} className="text-[#fbbf24]" /> AI Powered Assistant
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
