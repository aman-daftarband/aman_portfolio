import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, ArrowRight, CornerDownLeft } from 'lucide-react';
import GlowingCard from './UI/GlowingCard';

interface LogLine {
  text: string;
  type: 'input' | 'output' | 'error' | 'success';
}

export const DeveloperTerminal: React.FC = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [logs, setLogs] = useState<LogLine[]>([
    { text: '==================================================', type: 'output' },
    { text: '   AMAN DAFATARBAND - INTERACTIVE TERMINAL v1.0.0', type: 'success' },
    { text: '   Type "help" to list all available commands.', type: 'output' },
    { text: '==================================================', type: 'output' },
  ]);

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom of terminal screen
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  // Keep input focused on window click
  const focusTerminalInput = () => {
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length === 0) return;
      
      const nextIndex = historyIndex + 1;
      if (nextIndex < history.length) {
        setHistoryIndex(nextIndex);
        setInput(history[history.length - 1 - nextIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = historyIndex - 1;
      if (nextIndex >= 0) {
        setHistoryIndex(nextIndex);
        setInput(history[history.length - 1 - nextIndex]);
      } else {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  const executeCommand = () => {
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    // Add to command history
    setHistory(prev => [...prev, trimmedInput]);
    setHistoryIndex(-1);

    // Echo input to logs
    const newLogs: LogLine[] = [...logs, { text: `guest@aman-portfolio:~$ ${trimmedInput}`, type: 'input' }];

    const parts = trimmedInput.split(' ');
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    switch (cmd) {
      case 'help':
        newLogs.push(
          { text: 'Available commands:', type: 'success' },
          { text: '  help              - Display this list', type: 'output' },
          { text: '  about             - Print Aman\'s biography', type: 'output' },
          { text: '  skills            - List technical skills & tools', type: 'output' },
          { text: '  projects          - List featured software projects', type: 'output' },
          { text: '  experience        - Print internship/employment history', type: 'output' },
          { text: '  theme [theme]     - Change visual theme (space, cyberpunk, emerald, sunset)', type: 'output' },
          { text: '  resume            - Download resume PDF', type: 'output' },
          { text: '  goto [section]    - Scroll to page section (home, about, skills, projects, contact)', type: 'output' },
          { text: '  socials           - Print social links (GitHub, LinkedIn, Email)', type: 'output' },
          { text: '  clear             - Clear terminal logs', type: 'output' }
        );
        break;

      case 'about':
        newLogs.push(
          { text: 'Aman Daftarband - Computer Applications (BCA) Student & AI Developer.', type: 'output' },
          { text: 'Passionate about Data Analytics, Software Engineering, and building agentic generative AI pipelines.', type: 'output' },
          { text: 'Highly motivated to solve workflow automation problems and customize state-of-the-art LLMs.', type: 'output' }
        );
        break;

      case 'skills':
        newLogs.push(
          { text: 'Languages:   Python, TypeScript, SQL, JavaScript, HTML, CSS', type: 'output' },
          { text: 'Backend:     FastAPI, Flask, MySQL, PostgreSQL, JWT Authentication', type: 'output' },
          { text: 'Frontend:    React 19, Vite, Tailwind CSS, Framer Motion', type: 'output' },
          { text: 'AI / Data:   Gemini API, Groq Cloud (Llama 3), FAISS, Vector Search, Pandas, Numpy', type: 'output' }
        );
        break;

      case 'projects':
        newLogs.push(
          { text: 'Featured Projects:', type: 'success' },
          { text: '1. J.A.R.V.I.S Desktop Voice Assistant', type: 'output' },
          { text: '   - Python voice automation utilizing Groq AI, FAISS vector embeddings, and Eel.', type: 'output' },
          { text: '2. Resume AI (ATS Resume Optimizer Scanners)', type: 'output' },
          { text: '   - Flask/React system evaluating Cosine Similarity matching against job profiles.', type: 'output' }
        );
        break;

      case 'experience':
        newLogs.push(
          { text: 'Arlig Technologies (Python & AI Developer Intern)', type: 'success' },
          { text: '  - Developed FastAPI schemas and integrated Large Language Model agents.', type: 'output' },
          { text: '  - Increased internal developer script automation efficiency by 30%.', type: 'output' }
        );
        break;

      case 'theme':
        if (!args[0]) {
          newLogs.push({ text: 'Error: Must specify a theme. Usage: theme [space|cyberpunk|emerald|sunset]', type: 'error' });
        } else {
          const themeId = args[0].toLowerCase();
          if (['space', 'cyberpunk', 'emerald', 'sunset'].includes(themeId)) {
            // Apply the theme
            if (themeId === 'space') {
              document.documentElement.removeAttribute('data-theme');
            } else {
              document.documentElement.setAttribute('data-theme', themeId);
            }
            localStorage.setItem('portfolio-theme', themeId);
            window.dispatchEvent(new CustomEvent('theme-changed', { detail: themeId }));
            newLogs.push({ text: `Theme successfully updated to "${themeId}".`, type: 'success' });
          } else {
            newLogs.push({ text: `Error: Theme "${themeId}" not recognized. Choose from: space, cyberpunk, emerald, sunset`, type: 'error' });
          }
        }
        break;

      case 'resume':
        newLogs.push({ text: 'Starting download for Aman_Daftarband_Resume.pdf...', type: 'success' });
        const link = document.createElement('a');
        link.href = '/Aman_Daftarband_Resume.pdf';
        link.download = 'Aman_Daftarband_Resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        break;

      case 'goto':
        if (!args[0]) {
          newLogs.push({ text: 'Error: Must specify a section. Usage: goto [home|about|skills|projects|contact]', type: 'error' });
        } else {
          const sectionId = args[0].toLowerCase();
          const targetEl = document.getElementById(sectionId);
          if (targetEl) {
            newLogs.push({ text: `Scrolling to #${sectionId}...`, type: 'success' });
            setTimeout(() => {
              targetEl.scrollIntoView({ behavior: 'smooth' });
            }, 100);
          } else {
            newLogs.push({ text: `Error: Section "#${sectionId}" not found.`, type: 'error' });
          }
        }
        break;

      case 'socials':
        newLogs.push(
          { text: 'Profiles & Contact info:', type: 'success' },
          { text: '  GitHub:   https://github.com/amanshaikh405', type: 'output' },
          { text: '  LinkedIn: https://www.linkedin.com/in/aman-daftarband', type: 'output' },
          { text: '  Email:    amandaftarband@gmail.com', type: 'output' },
          { text: '  Phone:    +91 8788177013', type: 'output' }
        );
        break;

      case 'clear':
        setLogs([]);
        setInput('');
        return;

      default:
        newLogs.push({ text: `Command not found: "${cmd}". Type "help" for a list of available actions.`, type: 'error' });
        break;
    }

    setLogs(newLogs);
    setInput('');
  };

  return (
    <section id="sandbox" className="py-20 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-extrabold text-white"
          >
            Developer <span className="gradient-text-blue-purple-cyan">Playground</span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: '80px' }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto mt-4 rounded-full"
          />
          <p className="text-gray-400 text-sm mt-3.5 max-w-md mx-auto">
            Interact directly with the system using commands. Type instructions or navigate the site using keyboard controls.
          </p>
        </div>

        {/* Interactive Terminal Window */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 80, damping: 15 }}
          className="w-full relative"
        >
          <GlowingCard
            className="flex flex-col border border-white/10 bg-[#0B0F19]/90 text-gray-200 overflow-hidden shadow-2xl rounded-2xl h-[450px]"
            glowColor="rgba(59, 130, 246, 0.1)"
          >
            {/* Terminal Window Header (Mac/Linux style tab bar) */}
            <div className="flex items-center justify-between px-5 py-3.5 bg-white/3 border-b border-white/5 select-none shrink-0">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              </div>
              <div className="flex items-center gap-2.5 text-xs text-gray-400 font-mono">
                <Terminal className="w-3.5 h-3.5 text-gray-500" />
                <span>guest@aman-portfolio:~</span>
              </div>
              <div className="w-12" /> {/* spacer to balance controls */}
            </div>

            {/* Terminal Screen Console */}
            <div
              onClick={focusTerminalInput}
              className="flex-grow p-6 overflow-y-auto font-mono text-sm leading-relaxed space-y-2 select-text custom-scrollbar cursor-text relative"
            >
              {/* Scanline Overlay (Retro glow effect) */}
              <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,24,38,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] opacity-15" />

              {/* Console Logs */}
              {logs.map((log, index) => {
                let colorClass = 'text-gray-300';
                if (log.type === 'input') colorClass = 'text-blue-400 font-semibold';
                else if (log.type === 'success') colorClass = 'text-emerald-400';
                else if (log.type === 'error') colorClass = 'text-rose-400';

                return (
                  <div key={index} className={`whitespace-pre-wrap ${colorClass}`}>
                    {log.text}
                  </div>
                );
              })}

              {/* Blinking Caret Input Row */}
              <div className="flex items-center gap-2 pt-1">
                <span className="text-blue-400 font-semibold shrink-0">guest@aman-portfolio:~$</span>
                <div className="flex-grow relative flex items-center">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full bg-transparent text-gray-100 outline-none border-none p-0 font-mono text-sm focus:ring-0 focus:outline-none"
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck="false"
                  />
                  <CornerDownLeft className="w-3.5 h-3.5 text-gray-600 absolute right-0 shrink-0 pointer-events-none" />
                </div>
              </div>

              {/* Ref to track scroll bottom */}
              <div ref={terminalEndRef} />
            </div>
          </GlowingCard>
        </motion.div>
      </div>
    </section>
  );
};

export default DeveloperTerminal;
