import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
}

export const AIChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'model',
      content: "Hi there! I'm Aman AI, a virtual assistant representing Aman. Ask me anything about Aman's projects, skills, experience, or education!"
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageIdCounter = useRef(0);

  const suggestionChips = [
    "Tell me about J.A.R.V.I.S",
    "What are Aman's core skills?",
    "Where did he intern?",
    "How can I contact him?"
  ];

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const getOfflineResponse = (userMessage: string): string => {
    const msg = userMessage.toLowerCase();
    
    if (msg.includes('hi') || msg.includes('hello') || msg.includes('hey') || msg.includes('greet')) {
      return "Hello! I'm Aman's virtual assistant. How can I help you today? Ask me about his projects, skills, education, or links.";
    }
    if (msg.includes('jarvis') || msg.includes('j.a.r.v.i.s')) {
      return "J.A.R.V.I.S is a local AI voice assistant built by Aman. It uses Python FastAPI, Groq (Llama 3 70B), Tavily Search API, and a FAISS vector database for contextual memory. Click on it in the Projects section to see details!";
    }
    if (msg.includes('property') || msg.includes('verification') || msg.includes('document') || msg.includes('fraud')) {
      return "The AI Property Document Verification System is a full-stack fraud detection system built using React, Flask, SQLAlchemy, Tesseract OCR, and Groq LLaMA 3 70B.";
    }
    if (msg.includes('project')) {
      return "Aman has built two core AI projects: 1. J.A.R.V.I.S (a desktop voice assistant with vector search memory) and 2. AI Property Document Verification System (automating property fraud detection). Feel free to click on them to explore!";
    }
    if (msg.includes('skill') || msg.includes('tech') || msg.includes('expert') || msg.includes('language')) {
      return "Aman's skills include Python, FastAPI, Flask, SQL, React, TypeScript, and Data Analytics, along with deep expertise in Prompt Engineering and building RAG workflows.";
    }
    if (msg.includes('contact') || msg.includes('hire') || msg.includes('email') || msg.includes('phone') || msg.includes('reach')) {
      return "You can reach Aman via email at amandaftarband@gmail.com, call him at +91 8788177013, or message him using the form in the Contact section.";
    }
    if (msg.includes('education') || msg.includes('college') || msg.includes('degree') || msg.includes('school') || msg.includes('percentage') || msg.includes('cgpa')) {
      return "Aman is pursuing a BCA degree from Basaveshwar Science College, Bagalkot (2023 - 2026) with 8.15 CGPA. He completed Class XII in 2023 (60%) and Class X in 2021 (63%).";
    }
    if (msg.includes('experience') || msg.includes('work') || msg.includes('intern') || msg.includes('arlig')) {
      return "Aman interned as a Python & AI Intern at Arlig Technologies, where he designed modular FastAPI systems and integrated LLM workflows to improve developer automation productivity by 30%.";
    }
    if (msg.includes('resume') || msg.includes('cv')) {
      return "You can download Aman's resume in PDF format directly from the button in the Hero section at the top of the page!";
    }
    return "I'm running in local simulation mode. To activate my full generative Gemini AI engine, add a VITE_GEMINI_API_KEY to the .env file! Ask me about projects, skills, or experience.";
  };

  const fetchGeminiResponse = async (userMessage: string, chatHistory: Message[]) => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey || apiKey === "YOUR_GEMINI_API_KEY_HERE" || apiKey.trim() === "") {
      throw new Error("Gemini API Key is not set");
    }

    const systemPrompt = `You are "Aman AI", the personal AI Agent representing Aman Daftarband. 
Answer questions on behalf of Aman in a professional, helpful, and concise developer tone (maximum 2-3 sentences per response).

Aman's Details:
- Name: Aman Daftarband
- Titles: AI Developer | Full Stack Developer | Prompt Engineer
- Location: Akluj, Maharashtra, India
- Email: amandaftarband@gmail.com
- Phone: +91 8788177013
- LinkedIn: https://www.linkedin.com/in/aman-daftarband
- GitHub: https://github.com/amanshaikh405
- Education: Bachelor of Computer Applications (BCA) at Basaveshwar Science College (2023-2026, CGPA: 8.15 / 10), Class XII (Shivshambho Arts and Science College, 2023, 60%), Class X (Sadashivrao Mane Vidyalaya, 2021, 63%).
- Experience: Python & AI Developer Intern at Arlig Technologies. Designed FastAPI systems, integrated AI models, improved efficiency by 30%.
- Certifications: Oracle Cloud Infrastructure 2025 AI Foundations Associate, NVIDIA Deep Learning Institute (Building LLM Applications with Prompt Engineering).
- Projects:
  1. J.A.R.V.I.S Smart Desktop Voice Assistant: Python, FastAPI, Groq AI, FAISS vector memory retrieval, Tavily API.
  2. AI Property Document Verification System: React, Flask, SQLAlchemy, Tesseract OCR, Groq LLaMA 3 70B, stateless JWT role access controls.

Rules:
- Be polite, helpful, and concise.
- Direct users to the navbar sections or contact form if they want to hire or get in touch.
- Only speak as Aman's virtual assistant. Do not make up facts.`;

    // Map history to Gemini contents structure
    const contents = [
      ...chatHistory.slice(-6).map(msg => ({
        role: msg.role === 'model' ? 'model' : 'user',
        parts: [{ text: msg.content }]
      })),
      {
        role: 'user',
        parts: [{ text: userMessage }]
      }
    ];

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: contents,
        systemInstruction: {
          parts: [{ text: systemPrompt }]
        },
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 250
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Gemini status ${response.status}`);
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (text) {
      return text.trim();
    }
    throw new Error("No text returned");
  };

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    messageIdCounter.current += 1;
    const userMsg: Message = {
      id: `msg-${messageIdCounter.current}`,
      role: 'user',
      content: textToSend
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      let botReply = "";
      try {
        botReply = await fetchGeminiResponse(textToSend, messages);
      } catch {
        // Fall back to offline simulation
        botReply = getOfflineResponse(textToSend);
      }

      messageIdCounter.current += 1;
      setMessages(prev => [
        ...prev,
        {
          id: `msg-${messageIdCounter.current}`,
          role: 'model',
          content: botReply
        }
      ]);
    } catch (error) {
      console.error("Chat error:", error);
      messageIdCounter.current += 1;
      setMessages(prev => [
        ...prev,
        {
          id: `msg-${messageIdCounter.current}`,
          role: 'model',
          content: "Sorry, I encountered an issue while generating a response. Please email Aman directly!"
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Floating Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 border border-cyan-400/20 text-white shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 cursor-pointer"
        aria-label="Toggle chat assistant"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-center"
            >
              {/* Custom Bot / Sparkle Icon */}
              <Sparkles className="w-6 h-6 animate-pulse" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: 'spring', duration: 0.35 }}
            className="absolute bottom-18 right-0 w-80 sm:w-96 h-[460px] rounded-2xl border border-white/10 bg-[#0e1322]/95 backdrop-blur-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="px-5 py-4 border-b border-white/5 bg-[#0b0f19]/80 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                    <span>Aman AI</span>
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  </h4>
                  <span className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider block">
                    Developer Assistant
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
              >
                <X className="w-4.5 h-4.5" />
              </button>
            </div>

            {/* Message Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed border ${
                      msg.role === 'user'
                        ? 'bg-blue-600 border-blue-500 text-white shadow-md shadow-blue-500/10'
                        : 'bg-white/5 border-white/5 text-gray-300'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="max-w-[85%] rounded-2xl px-4 py-3 bg-white/5 border border-white/5 flex gap-1 items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions list (displays only if chat is short) */}
            {messages.length <= 2 && (
              <div className="px-4 py-2 border-t border-white/5 bg-[#0b0f19]/30 flex flex-wrap gap-1.5">
                {suggestionChips.map((chip, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(chip)}
                    className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/5 text-[10px] text-gray-400 font-medium hover:text-white hover:bg-white/10 hover:border-white/10 transition-all cursor-pointer"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            )}

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(input);
              }}
              className="p-3 border-t border-white/5 bg-[#0b0f19]/60 flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me something..."
                className="flex-grow px-3.5 py-2 rounded-xl bg-[#0b0f19] border border-white/5 focus:border-cyan-500/50 focus:outline-none text-xs sm:text-sm text-white transition-colors placeholder-gray-500"
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="p-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 border border-cyan-400/20 text-white hover:from-blue-500 hover:to-cyan-500 disabled:opacity-40 hover:scale-102 transition-all cursor-pointer flex items-center justify-center"
              >
                <Send className="w-4.5 h-4.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default AIChatbot;
