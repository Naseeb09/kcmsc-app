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
    { role: 'bot', content: 'HELLO! I AM CAMPUS AI. HOW CAN I HELP YOU NAVIGATE KC MODEL SCHOOL & COLLEGE TODAY?' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [latency, setLatency] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;
    
    const userMsg = { role: 'user' as const, content: input };
    setMessages(prev => [...prev, userMsg]);
    const currentInput = input;
    setInput('');
    setIsTyping(true);

    try {
      let botResponse = '';
      let botLatency = 0;

      // 1. Try local or serverless /api/chat endpoint
      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt: currentInput }),
        });
        if (response.ok) {
          const data = await response.json();
          if (data.response && !data.response.includes('SYSTEM ERROR:')) {
            botResponse = data.response;
            botLatency = data.latency_ms || 300;
          }
        }
      } catch (e) {
        // Backend not reachable on localhost / emulator
      }

      // 2. Call OpenRouter directly using client API key
      if (!botResponse) {
        const openrouterKey = import.meta.env.VITE_OPENROUTER_API_KEY;
        if (openrouterKey) {
          const startTime = Date.now();
          const orResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${openrouterKey}`,
              'Content-Type': 'application/json',
              'HTTP-Referer': 'https://kcmsc.edu.bd',
              'X-Title': 'KC Model School Campus AI'
            },
            body: JSON.stringify({
              model: 'openrouter/auto',
              messages: [
                {
                  role: 'system',
                  content: 'You are CAMPUS AI, digital assistant for KC Model School & College (Prembagan, Dakshinkhan, Dhaka). Give concise, direct, helpful plain text answers. Never use asterisks or markdown bolding.'
                },
                { role: 'user', content: currentInput }
              ],
              temperature: 0.3
            })
          });

          if (orResponse.ok) {
            const orData = await orResponse.json();
            const text = orData.choices?.[0]?.message?.content?.trim();
            if (text) {
              botResponse = text;
              botLatency = Date.now() - startTime;
            }
          }
        }
      }

      // 3. Offline campus knowledge base fallback
      if (!botResponse) {
        botResponse = getCampusAssistantResponse(currentInput, floors);
        botLatency = 50;
      }

      const cleanResponse = botResponse.replace(/\*\*|\*/g, '').replace(/_/g, '');
      setMessages(prev => [...prev, { role: 'bot', content: cleanResponse }]);
      setLatency(botLatency);
    } catch (error) {
      console.warn('AI error, responding from campus knowledge base:', error);
      const fallbackResponse = getCampusAssistantResponse(currentInput, floors);
      setMessages(prev => [...prev, { role: 'bot', content: fallbackResponse }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 100, scale: 0.9 }}
          className="fixed inset-0 z-[100] flex flex-col bg-[#0d1f0f] md:inset-auto md:bottom-24 md:right-6 md:w-[450px] md:h-[650px] md:rounded-[2.5rem] md:border md:border-[#059669]/30 md:shadow-[0_0_50px_rgba(5,150,105,0.3)] overflow-hidden"
        >
          {/* Header */}
          <div className="bg-[#1a2e1c] p-6 border-b border-[#059669]/30 flex items-center justify-between relative overflow-hidden">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#059669] flex items-center justify-center shadow-[0_0_15px_rgba(5,150,105,0.4)]">
                <Bot className="text-white w-6 h-6" />
              </div>
              <div>
                <h2 className="text-sm font-black text-white uppercase tracking-widest leading-none mb-1">CAMPUS <span className="text-[#fbbf24]">AI</span></h2>
                <p className="text-[10px] text-[#a0b5a3] font-bold uppercase tracking-widest">{isTyping ? 'ANALYZING...' : 'ONLINE'}</p>
              </div>
            </div>
            <button onClick={onClose} className="p-3 rounded-xl bg-[#0d1f0f] text-[#a0b5a3] hover:text-white transition-colors border border-white/5">
              <X size={20} />
            </button>
          </div>

          {/* Chat Area */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar bg-[radial-gradient(circle_at_top_right,#1a2e1c,transparent_40%)]">
            {messages.map((msg, i) => (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                key={i}
                className={`flex ${msg.role === 'bot' ? 'justify-start' : 'justify-end'}`}
              >
                <div className={`max-w-[85%] p-4 rounded-2xl ${
                  msg.role === 'bot' 
                  ? 'bg-[#1a2e1c] text-[#e8f5e9] border border-[#059669]/20' 
                  : 'bg-[#059669] text-white'
                }`}>
                  <p className="text-sm leading-relaxed font-mono whitespace-pre-line">{msg.content}</p>
                </div>
              </motion.div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-[#1a2e1c] p-4 rounded-2xl border border-[#059669]/20">
                    <p className="text-[10px] text-[#059669] font-mono animate-pulse">PROCESSING_QUERY...</p>
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
                placeholder="ENTER QUERY..."
                className="flex-1 bg-[#0d1f0f] border border-[#059669]/30 rounded-2xl py-4 pl-5 pr-14 text-sm text-white focus:outline-none focus:border-[#fbbf24] transition-all placeholder:text-[#a0b5a3]/30 font-mono"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="absolute right-2 p-2.5 rounded-xl bg-[#059669] text-white disabled:opacity-50 transition-all hover:bg-[#fbbf24]"
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

function getCampusAssistantResponse(prompt: string, campusFloors: any[]): string {
  const query = prompt.toLowerCase().trim();

  // 1. Room lookup (e.g. "room 206", "501", "room 309")
  const roomMatch = query.match(/\b([1-9][0-9]{2})\b/);
  if (roomMatch) {
    const roomNum = roomMatch[1];
    for (const floor of campusFloors) {
      const foundClass = floor.classes?.find((c: any) => c.room === roomNum);
      if (foundClass) {
        let text = `Room ${roomNum} is located on the ${floor.name}.\n`;
        text += `- Class: ${foundClass.name}${foundClass.section ? ` (Section: ${foundClass.section})` : ''}\n`;
        if (foundClass.version && foundClass.version !== 'N/A') text += `- Version: ${foundClass.version}\n`;
        if (foundClass.teacher) text += `- Teacher: ${foundClass.teacher}\n`;
        if (foundClass.teacherNumber && foundClass.teacherNumber !== 'N/A') text += `- Contact: ${foundClass.teacherNumber}\n`;
        return text.trim();
      }
    }
  }

  // 2. Class locations
  if (query.includes('class 10') || query.includes('ten')) {
    return "Class 10 is located on:\n- 4th Floor (English Version: Rooms 505, 506)\n- 6th Floor (Bangla Version: Rooms 704, 705, 706, 710, 711, 713)";
  }
  if (query.includes('class 9') || query.includes('nine')) {
    return "Class 9 is located on:\n- 4th Floor (English Version: Room 504)\n- 6th Floor (Bangla Version: Rooms 701, 702, 703, 707, 708, 709)";
  }
  if (query.includes('class 8') || query.includes('eight')) {
    return "Class 8 is located on:\n- 4th Floor (English Version: Room 503)\n- 5th Floor (Bangla Version: Rooms 605, 606, 611, 612)";
  }
  if (query.includes('class 7') || query.includes('seven')) {
    return "Class 7 is located on:\n- 4th Floor (English Version: Room 502)\n- 5th Floor (Bangla Version: Rooms 603, 604, 609, 610)";
  }
  if (query.includes('class 6') || query.includes('six')) {
    return "Class 6 is located on:\n- 4th Floor (English Version: Room 501)\n- 5th Floor (Bangla Version: Rooms 601, 602, 607, 608)";
  }
  if (query.includes('class 11') || query.includes('class 12') || query.includes('college')) {
    return "College Section (Class 11 & Class 12) is located on the 8th Floor.";
  }
  if (query.includes('nursery') || query.includes('kg') || query.includes('kindergarten')) {
    return "Nursery & KG classrooms are located on the 1st Floor (Rooms 202 to 210).";
  }
  if (query.includes('class 1') || query.includes('class one')) {
    return "Class 1 is located on:\n- 1st Floor (Bangla Version: Rooms 201, 211)\n- 2nd Floor (English Version: Rooms 301, 302, 303, 304)";
  }
  if (query.includes('class 2') || query.includes('class two')) {
    return "Class 2 is located on the 2nd Floor (Rooms 305 to 310).";
  }
  if (query.includes('class 3') || query.includes('class 4') || query.includes('class 5')) {
    return "Classes 3, 4, and 5 are located across the 3rd and 4th Floors.";
  }

  // 3. Leadership & Administration
  if (query.includes('principal') && !query.includes('vice')) {
    return "Principal: Prof Md Abdul Baten (Office: Room 206, 1st Floor).";
  }
  if (query.includes('vice principal') || query.includes('acting vice') || query.includes('salma') || query.includes('mahbub')) {
    return "Vice Principals:\n- AKM Mahbub Hasan (Acting Vice Principal, Room 801, 7th Floor)\n- Salma Fouzia Noor (Vice Principal, Junior Section, Room 309, 2nd Floor)";
  }
  if (query.includes('chief advisor') || query.includes('musfiqur') || query.includes('advisor')) {
    return "Chief Advisor: Brigadier General ASM Musfiqur Rahman, spp, psc (retd).";
  }
  if (query.includes('founder') || query.includes('chairman') || query.includes('khashru')) {
    return "Founder & Chairman: Al-Hajj Md. Khashru Chowdhury (CIP). Chairman's office is on the 1st Floor.";
  }

  // 4. Facilities & Amenities
  if (query.includes('lab') || query.includes('physics') || query.includes('chemistry') || query.includes('biology') || query.includes('ict') || query.includes('library')) {
    return "Science Labs (Physics, Chemistry, Biology), ICT Lab, and Central Library are located on the 7th Floor.";
  }
  if (query.includes('canteen') || query.includes('cafeteria') || query.includes('food')) {
    return "The Campus Canteen is located on the Ground Level / Campus Courtyard.";
  }
  if (query.includes('dance') || query.includes('cultural')) {
    return "The Dance & Cultural Room is located in Room 212 on the 1st Floor.";
  }
  if (query.includes('lift') || query.includes('elevator')) {
    return "The campus features Boys Lift, Girls Lift, and Teachers Lift accessing all levels.";
  }

  // 5. Lost & Found
  if (query.includes('lost') || query.includes('found') || query.includes('missing') || query.includes('item')) {
    return "You can view reported missing items or post a new listing in the Lost & Found section from the navigation menu.";
  }

  // 6. Smart Complaint / Support
  if (query.includes('complaint') || query.includes('harass') || query.includes('bully') || query.includes('report')) {
    return "You can submit private and confidential reports through the Smart Complaint portal in the app.";
  }

  // 7. Contact / Details
  if (query.includes('contact') || query.includes('phone') || query.includes('number') || query.includes('call')) {
    return "Official Contact Info:\n- Phone: 02-8999685 / 01793-560466\n- Email: info@kcmsc.edu.bd\n- Address: 275, Prembagan, Dakshinkhan, Dhaka-1230";
  }
  if (query.includes('fee') || query.includes('cost') || query.includes('admission') || query.includes('tuition')) {
    return "Comprehensive tuition and admission fee schedules can be checked under the Fees tab in the navigation menu.";
  }

  // General help
  return "Hello! I am KC Campus AI. I can help you with:\n- Locating any room or class (e.g. 'Where is Room 501?' or 'Class 10')\n- School administration & teachers directory\n- Campus facilities (Labs, Library, Lifts)\n- Lost & Found and Smart Complaint services\n\nWhat would you like to find?";
}
