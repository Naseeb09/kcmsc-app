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
    { role: 'bot', content: 'SYSTEM READY. ENTER COMMAND OR QUERY.' }
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
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: currentInput }),
      });

      if (!response.ok) throw new Error('Backend unavailable');

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'bot', content: data.response }]);
      setLatency(data.latency_ms);
    } catch (error) {
      console.error('AI Backend Error:', error);
      setMessages(prev => [...prev, { role: 'bot', content: 'SYSTEM ERROR: CONNECTION_FAILED' }]);
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
                <p className="text-[10px] text-[#a0b5a3] font-bold uppercase tracking-widest">{isTyping ? 'PROCESSING...' : 'READY'}</p>
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
