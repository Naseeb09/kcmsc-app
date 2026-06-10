import React, { useState, useEffect, useRef } from 'react';
import { Bot, Send, X, MessageSquare, ShieldAlert, Sparkles, User, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '@/context/AppContext';
import { useTranslation } from '@/hooks/useTranslation';
import { schoolInfo, contactInfo, verifiedFacilities } from '@/data/announcements';

interface Message {
  role: 'user' | 'bot';
  content: string;
}

export function GlitchedAI({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { floors, teachers, notices, events, facilities, language } = useAppContext();
  const { t, s } = useTranslation();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', content: language === 'bn' ? 'হ্যালো! আমি ক্যাম্পাস এআই। আমি এই অ্যাপের যেকোনো তথ্য সম্পর্কে আপনাকে সাহায্য করতে পারি।' : 'Hello! I am Campus AI. I can help you with any information available on this app.' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const generateResponse = (query: string) => {
    const q = query.toLowerCase();
    
    // Safety check
    const redFlags = ['bad', 'stupid', 'hate', 'kill', 'abuse', 'hack', 'porn', 'sexy', 'fuck', 'shit', 'idiot'];
    if (redFlags.some(flag => q.includes(flag))) {
      return language === 'bn' ? 'আমি এই ধরণের বার্তার উত্তর দিতে পারি না। অনুগ্রহ করে শালীন ভাষা ব্যবহার করুন।' : "I can't respond to this. Please maintain a respectful tone.";
    }

    // 1. Identity & Developers
    if (q.includes('what are you') || q.includes('who are you') || q.includes('doing') || q.includes('what you can do')) {
      return language === 'bn' 
        ? 'আমি ক্যাম্পাস এআই, কেসিএমএসসি-র স্মার্ট অ্যাসিস্ট্যান্ট। আমি আপনাকে টিচারদের ফোন নম্বর, ক্লাস লোকেশন, নোটিশ এবং স্কুলের যেকোনো ফি বা সুবিধা সম্পর্কে জানাতে পারি।' 
        : 'I am Campus AI, the smart assistant for KCMSC. I can help you find teacher contact numbers, classroom locations, latest notices, school fees, and facilities.';
    }

    if (q.includes('built') || q.includes('developer') || q.includes('made') || q.includes('creator') || q.includes('who built')) {
      return language === 'bn'
        ? 'আমাকে তৈরি করেছে Glitched Technologies (গ্লিচড টেকনোলজিস)।'
        : 'I was built by Glitched Technologies.';
    }

    // 2. School Profile & History
    if (q.includes('about the school') || q.includes('tell me about') || q.includes('school info')) {
      return language === 'bn'
        ? `${schoolInfo.name} একটি শ্রেষ্ঠ বিদ্যাপীঠ। ${schoolInfo.about}`
        : `${schoolInfo.name} is a premier institution. ${schoolInfo.about}`;
    }

    if (q.includes('founded') || q.includes('established') || q.includes('history') || q.includes('start') || q.includes('who is the founder')) {
      return language === 'bn'
        ? `কেসি মডেল স্কুল এন্ড কলেজ ${schoolInfo.established} সালে আল-হাজ্ব মো: খসরু চৌধুরী (সিআইপি) দ্বারা প্রতিষ্ঠিত হয়েছিল।`
        : `KC Model School & College was founded in ${schoolInfo.established} by Al-Hajj Md. Khashru Chowdhury (CIP).`;
    }

    if (q.includes('motto') || q.includes('slogan')) {
      return language === 'bn' ? `আমাদের মূলমন্ত্র হল: শিক্ষা, শৃঙ্খলা, প্রগতি।` : `Our motto is: Education, Discipline, Progress.`;
    }

    if (q.includes('mission') || q.includes('vision') || q.includes('goal')) {
      return language === 'bn'
        ? `লক্ষ্য: ${schoolInfo.mission} ভিশন: ${schoolInfo.vision}`
        : `Mission: ${schoolInfo.mission} Vision: ${schoolInfo.vision}`;
    }

    // 3. Stats (Teachers & Students)
    if (q.includes('teacher') || q.includes('faculty') || q.includes('staff')) {
      const totalTeachers = teachers.length;
      const foundTeacher = teachers.find(teacher => q.includes(teacher.name.toLowerCase()));
      if (foundTeacher) {
        return language === 'bn'
          ? `${foundTeacher.name} একজন ${t(foundTeacher.role || 'Teacher')}। তাঁর বিভাগ: ${t(foundTeacher.subject || 'General')}। ${foundTeacher.phone ? 'ফোন: ' + foundTeacher.phone : ''}`
          : `${foundTeacher.name} is a ${foundTeacher.role || 'Teacher'} (${foundTeacher.subject || 'General'}). ${foundTeacher.phone ? 'Phone: ' + foundTeacher.phone : ''}`;
      }
      return language === 'bn'
        ? `আমাদের বর্তমানে ${totalTeachers} জন অনুষদ সদস্য রয়েছেন।`
        : `We have ${totalTeachers} faculty members listed in our directory.`;
    }

    if (q.includes('student') || q.includes('how many kids') || q.includes('population') || q.includes('ratio')) {
      return language === 'bn' 
        ? `আমাদের স্কুলে ${schoolInfo.totalStudents} এর বেশি শিক্ষার্থী রয়েছে। ছাত্র-শিক্ষক অনুপাত হল ${schoolInfo.studentTeacherRatio}।` 
        : `We have over ${schoolInfo.totalStudents} students with a student-teacher ratio of ${schoolInfo.studentTeacherRatio}.`;
    }

    // 4. Fees & Admission
    if (q.includes('fee') || q.includes('cost') || q.includes('admission') || q.includes('money') || q.includes('enroll') || q.includes('pay')) {
      return language === 'bn'
        ? `ভর্তি এবং মাসিক বেতনের তথ্যের জন্য অ্যাপের "Fees" সেকশনটি দেখুন। সাধারণত কেজি থেকে ১০ম শ্রেণী পর্যন্ত বিভিন্ন ফি কাঠামো রয়েছে। বিস্তারিত জানতে ০১৭৯৩ ৫৬০ ৪৬৬ নম্বরে কল করুন।`
        : `For admission and tuition fee details, please check the "Fees" section in the app. Fees vary from Nursery to College levels. For specific inquiries, call 01793 560 466.`;
    }

    // 5. Locations & Floors
    if (q.includes('where') || q.includes('location') || q.includes('address') || q.includes('map')) {
      return `${language === 'bn' ? 'ঠিকানা:' : 'Address:'} ${contactInfo.address}. ${language === 'bn' ? 'এটি দক্ষিণখানের প্রেমবাগানে অবস্থিত।' : 'Located in Prembagan, Dakshinkhan.'}`;
    }

    if (q.includes('floor') || q.includes('how many floors') || q.includes('levels')) {
      return language === 'bn' 
        ? `আমাদের ভবনে মোট ৮টি তলা (Floor) রয়েছে।` 
        : `The campus has 8 floors in total.`;
    }

    const roomMatch = q.match(/\d{3}/);
    if (roomMatch) {
      const roomNum = roomMatch[0];
      for (const floor of floors) {
        const found = floor.classes.find(c => c.room === roomNum);
        if (found) {
          return language === 'bn'
            ? `রুম ${roomNum} (${t(found.name)}) আমাদের ${t(floor.name)} এ অবস্থিত।`
            : `Room ${roomNum} (${found.name}) is located on the ${floor.name}.`;
        }
      }
    }

    // 6. Facilities & Labs
    if (q.includes('facility') || q.includes('lab') || q.includes('library') || q.includes('wifi') || q.includes('computer') || q.includes('science')) {
      const facNames = verifiedFacilities.map(f => f.name).join(', ');
      return language === 'bn'
        ? `আমাদের সুবিধাসমূহ: ${facNames}। বেশিরভাগ ল্যাব ৭ম তলায় অবস্থিত।`
        : `Facilities include: ${facNames}. Most labs are on the 7th Floor.`;
    }

    // 7. Principal & Leaders
    if (q.includes('principal') || q.includes('head')) {
      const principal = teachers.find(t => t.role?.toLowerCase().includes('principal') && !t.role?.toLowerCase().includes('acting'));
      return language === 'bn' 
        ? `আমাদের অধ্যক্ষ হলেন ${principal?.name || 'প্রফেসর মো: আব্দুল বাতেন'}। তাঁর অফিস রুম ২০৬ তে।` 
        : `Our Principal is ${principal?.name || 'Prof Md Abdul Baten'}. His office is in Room 206.`;
    }

    if (q.includes('advisor')) {
      return language === 'bn'
        ? `আমাদের প্রধান উপদেষ্টা হলেন ব্রিগেডিয়ার জেনারেল এএসএম মুশফিকুর রহমান।`
        : `Our Chief Advisor is Brigadier General ASM Musfiqur Rahman.`;
    }

    // 8. Notices & Events
    if (q.includes('notice') || q.includes('update') || q.includes('latest')) {
      if (notices.length > 0) {
        return language === 'bn'
          ? `সর্বশেষ নোটিশ: "${notices[0].title}" (${notices[0].date})। বিস্তারিত নোটিশ সেকশনে দেখুন।`
          : `Latest Notice: "${notices[0].title}" posted on ${notices[0].date}.`;
      }
    }

    if (q.includes('event')) {
      if (events.length > 0) {
        return language === 'bn'
          ? `আগামী ইভেন্ট: "${events[0].title}"। বিস্তারিত হোম স্ক্রিনে দেখুন।`
          : `Next Event: "${events[0].title}". Check the home screen slider for details.`;
      }
    }

    // 9. Contact Info
    if (q.includes('phone') || q.includes('number') || q.includes('call') || q.includes('contact') || q.includes('email')) {
      return language === 'bn'
        ? `আমাদের ফোন: ${contactInfo.phone}, ইমেইল: ${contactInfo.email}`
        : `Phone: ${contactInfo.phone}, Email: ${contactInfo.email}`;
    }

    // Greetings
    if (q.includes('hi') || q.includes('hello') || q.includes('hey')) {
      return language === 'bn' ? 'হ্যালো! আমি আপনাকে কীভাবে সাহায্য করতে পারি?' : "Hello! How can I help you today?";
    }

    return language === 'bn' 
      ? 'দুঃখিত, আমি এই বিষয়ে জানি না। আপনি টিচার, রুম, ফি বা স্কুলের ইতিহাস সম্পর্কে জিজ্ঞাসা করতে পারেন।' 
      : "I'm not sure about that. Try asking about teachers, room numbers, fees, or school history!";
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
                <h2 className="text-sm font-black text-white uppercase tracking-widest leading-none mb-1">Campus <span className="text-[#fbbf24]">AI</span></h2>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#fbbf24] animate-pulse" />
                  <p className="text-[10px] text-[#a0b5a3] font-bold uppercase tracking-widest">Knowledge Sync Active</p>
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
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
