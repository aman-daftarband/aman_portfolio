import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CommandItem {
  id: string;
  name: string;
  keywords?: string[];
  shortcut?: string;
  category: 'Navigation' | 'Actions' | 'Contact' | 'Themes';
  icon: React.ReactNode;
  action: () => void;
}

const THEMES = ['space', 'cyberpunk', 'emerald', 'sunset'];

const applyTheme = (themeId: string) => {
  if (themeId === 'space') {
    document.documentElement.removeAttribute('data-theme');
  } else {
    document.documentElement.setAttribute('data-theme', themeId);
  }
  localStorage.setItem('portfolio-theme', themeId);
  window.dispatchEvent(new CustomEvent('theme-changed', { detail: themeId }));
};

export const CommandPalette: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Load saved theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('portfolio-theme') || 'space';
    applyTheme(savedTheme);
  }, []);

  // Toggle command palette
  useEffect(() => {
    const handleToggle = () => {
      setIsOpen(prev => {
        const next = !prev;
        if (next) {
          setQuery('');
          setSelectedIndex(0);
        }
        return next;
      });
    };
    window.addEventListener('toggle-command-palette', handleToggle);
    return () => window.removeEventListener('toggle-command-palette', handleToggle);
  }, []);

  // Listen to keyboard shortcut (Ctrl+K or Cmd+K to open, Alt+T to cycle theme)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen(prev => {
          const next = !prev;
          if (next) {
            setQuery('');
            setSelectedIndex(0);
          }
          return next;
        });
      }

      if (e.altKey && e.key.toLowerCase() === 't') {
        e.preventDefault();
        const currentTheme = localStorage.getItem('portfolio-theme') || 'space';
        const currentIndex = THEMES.indexOf(currentTheme);
        const nextIndex = (currentIndex + 1) % THEMES.length;
        applyTheme(THEMES[nextIndex]);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Lock body scroll when palette is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Wait for animation to start to focus input
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const commands: CommandItem[] = [
    // Navigation
    {
      id: 'nav-home',
      name: 'Go to Home',
      keywords: ['/home', '/index', 'go to home', 'start', 'hero'],
      category: 'Navigation',
      icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>,
      action: () => {
        const el = document.getElementById('home');
        el?.scrollIntoView({ behavior: 'smooth' });
      }
    },
    {
      id: 'nav-about',
      name: 'Go to About Me',
      keywords: ['/about', 'about me', 'education', 'background', 'cv'],
      category: 'Navigation',
      icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>,
      action: () => {
        const el = document.getElementById('about');
        el?.scrollIntoView({ behavior: 'smooth' });
      }
    },
    {
      id: 'nav-skills',
      name: 'Go to Skills',
      keywords: ['/skills', 'tech stack', 'expert', 'skills', 'technologies'],
      category: 'Navigation',
      icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="9" /><rect x="14" y="3" width="7" height="5" /><rect x="14" y="12" width="7" height="9" /><rect x="3" y="16" width="7" height="5" /></svg>,
      action: () => {
        const el = document.getElementById('skills');
        el?.scrollIntoView({ behavior: 'smooth' });
      }
    },
    {
      id: 'nav-experience',
      name: 'Go to Experience',
      keywords: ['/experience', 'work', 'internship', 'experience', 'jobs'],
      category: 'Navigation',
      icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>,
      action: () => {
        const el = document.getElementById('experience');
        el?.scrollIntoView({ behavior: 'smooth' });
      }
    },
    {
      id: 'nav-projects',
      name: 'Go to Projects',
      keywords: ['/projects', 'projects', 'portfolio', 'work', 'github'],
      category: 'Navigation',
      icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></svg>,
      action: () => {
        const el = document.getElementById('projects');
        el?.scrollIntoView({ behavior: 'smooth' });
      }
    },
    {
      id: 'nav-sandbox',
      name: 'Go to Developer Sandbox',
      keywords: ['/sandbox', '/terminal', 'developer playground', 'interactive terminal', 'cli'],
      category: 'Navigation',
      icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="2" y1="10" x2="22" y2="10" /><path d="M7 14l2 1-2 1" /><line x1="11" y1="16" x2="13" y2="16" /></svg>,
      action: () => {
        const el = document.getElementById('sandbox');
        el?.scrollIntoView({ behavior: 'smooth' });
      }
    },
    {
      id: 'nav-certifications',
      name: 'Go to Certifications',
      keywords: ['/certifications', 'awards', 'credentials', 'certifications', 'badges'],
      category: 'Navigation',
      icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7" /><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" /></svg>,
      action: () => {
        const el = document.getElementById('certifications');
        el?.scrollIntoView({ behavior: 'smooth' });
      }
    },
    {
      id: 'nav-contact',
      name: 'Go to Contact Form',
      keywords: ['/contact', 'contact', 'email', 'hire', 'send message'],
      category: 'Navigation',
      icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>,
      action: () => {
        const el = document.getElementById('contact');
        el?.scrollIntoView({ behavior: 'smooth' });
      }
    },
    // Actions
    {
      id: 'act-resume',
      name: 'Download Resume (PDF)',
      shortcut: '⌘D',
      keywords: ['/resume', 'download resume', 'pdf cv'],
      category: 'Actions',
      icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="12" y1="18" x2="12" y2="12" /><polyline points="9 15 12 12 15 15" /></svg>,
      action: () => {
        const link = document.createElement('a');
        link.href = '/Aman_Daftarband_Resume.pdf';
        link.download = 'Aman_Daftarband_Resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    },
    {
      id: 'act-chatbot',
      name: 'Open Chatbot Assistant',
      shortcut: '⌘C',
      keywords: ['/chat', '/chatbot', 'ai chatbot', 'ask aman', 'help'],
      category: 'Actions',
      icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>,
      action: () => {
        const chatButton = document.querySelector('button[aria-label="Toggle chat assistant"]') as HTMLButtonElement | null;
        if (chatButton) {
          chatButton.click();
        }
      }
    },
    {
      id: 'act-grid',
      name: 'Toggle Ambient Grid',
      shortcut: '⌘G',
      keywords: ['/grid', 'toggle background grid', 'hide grid', 'show grid'],
      category: 'Actions',
      icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="9" y1="3" x2="9" y2="21" /><line x1="15" y1="3" x2="15" y2="21" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="3" y1="15" x2="21" y2="15" /></svg>,
      action: () => {
        window.dispatchEvent(new CustomEvent('toggle-bg-grid'));
      }
    },
    // Themes
    {
      id: 'theme-cycle',
      name: 'Cycle Color Theme',
      shortcut: 'Alt+T',
      keywords: ['/theme', 'change colors', 'cycle theme', 'toggle themes'],
      category: 'Themes',
      icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
      action: () => {
        const currentTheme = localStorage.getItem('portfolio-theme') || 'space';
        const currentIndex = THEMES.indexOf(currentTheme);
        const nextIndex = (currentIndex + 1) % THEMES.length;
        applyTheme(THEMES[nextIndex]);
      }
    },
    {
      id: 'theme-space',
      name: 'Theme: Space Blue (Classic)',
      keywords: ['/theme space', 'blue theme', 'default theme', 'classic theme'],
      category: 'Themes',
      icon: <span className="w-3 h-3 rounded-full bg-blue-500 border border-white/20 inline-block" />,
      action: () => applyTheme('space')
    },
    {
      id: 'theme-cyberpunk',
      name: 'Theme: Cyberpunk Neon',
      keywords: ['/theme cyberpunk', 'pink theme', 'neon theme', 'cyberpunk theme'],
      category: 'Themes',
      icon: <span className="w-3 h-3 rounded-full bg-[#ff007f] border border-white/20 inline-block" />,
      action: () => applyTheme('cyberpunk')
    },
    {
      id: 'theme-emerald',
      name: 'Theme: Emerald Matrix',
      keywords: ['/theme emerald', 'green theme', 'matrix theme', 'emerald theme'],
      category: 'Themes',
      icon: <span className="w-3 h-3 rounded-full bg-[#10b981] border border-white/20 inline-block" />,
      action: () => applyTheme('emerald')
    },
    {
      id: 'theme-sunset',
      name: 'Theme: Sunset Glow',
      keywords: ['/theme sunset', 'orange theme', 'sunset theme', 'warm theme'],
      category: 'Themes',
      icon: <span className="w-3 h-3 rounded-full bg-[#f97316] border border-white/20 inline-block" />,
      action: () => applyTheme('sunset')
    },
    // Contact Info
    {
      id: 'con-email',
      name: 'Copy Email Address (amandaftarband@gmail.com)',
      keywords: ['copy email', 'email address', 'contact mail'],
      category: 'Contact',
      icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>,
      action: () => {
        navigator.clipboard.writeText('amandaftarband@gmail.com');
        alert('Email copied to clipboard!');
      }
    },
    {
      id: 'con-phone',
      name: 'Copy Phone Number (+91 8788177013)',
      keywords: ['copy phone', 'phone number', 'contact mobile'],
      category: 'Contact',
      icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>,
      action: () => {
        navigator.clipboard.writeText('+918788177013');
        alert('Phone number copied to clipboard!');
      }
    }
  ];

  const filtered = commands.filter(cmd =>
    cmd.name.toLowerCase().includes(query.toLowerCase()) ||
    cmd.category.toLowerCase().includes(query.toLowerCase()) ||
    (cmd.keywords && cmd.keywords.some(k => k.toLowerCase().includes(query.toLowerCase())))
  );

  // Handle key listeners in modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (filtered.length > 0 ? (prev + 1) % filtered.length : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (filtered.length > 0 ? (prev - 1 + filtered.length) % filtered.length : 0));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filtered[selectedIndex]) {
          filtered[selectedIndex].action();
          setIsOpen(false);
        }
      } else if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filtered, selectedIndex]);

  // Keep selected index within bounds when query changes
  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setSelectedIndex(0);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4 font-sans">
          {/* Backdrop blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-md"
          />

          {/* Dialog Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            ref={containerRef}
            className="relative w-full max-w-lg rounded-2xl border border-white/10 bg-[#0e1322]/95 backdrop-blur-2xl shadow-2xl overflow-hidden flex flex-col max-h-[50vh]"
          >
            {/* Search Input Area */}
            <div className="flex items-center px-4 border-b border-white/5 bg-[#0b0f19]/30">
              <svg className="w-4 h-4 text-gray-500 mr-3 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={handleQueryChange}
                placeholder="Type a command or search..."
                className="w-full py-4 bg-transparent outline-none border-none text-white text-sm sm:text-base placeholder-gray-500"
              />
              <kbd className="text-[10px] bg-white/5 border border-white/10 px-2 py-0.5 rounded text-gray-500 font-semibold font-mono">ESC</kbd>
            </div>

            {/* Commands List Area */}
            <div className="flex-grow overflow-y-auto p-2 space-y-2 no-scrollbar">
              {filtered.length > 0 ? (
                // Grouping commands by category
                ['Navigation', 'Actions', 'Themes', 'Contact'].map((cat) => {
                  const itemsInCat = filtered.filter(c => c.category === cat);
                  if (itemsInCat.length === 0) return null;

                  return (
                    <div key={cat} className="space-y-1">
                      {/* Category Label Header */}
                      <span className="block px-3 py-1.5 text-[9px] font-bold text-gray-500 uppercase tracking-widest">
                        {cat}
                      </span>
                      {itemsInCat.map((cmd) => {
                        // Find original index in filtered array
                        const originalIndex = filtered.findIndex(f => f.id === cmd.id);
                        const isSelected = originalIndex === selectedIndex;

                        return (
                          <button
                            key={cmd.id}
                            onClick={() => {
                              cmd.action();
                              setIsOpen(false);
                            }}
                            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all cursor-pointer text-left ${
                              isSelected
                                ? 'bg-blue-600/90 text-white shadow-md shadow-blue-500/10'
                                : 'text-gray-300 hover:bg-white/5 hover:text-white'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <span className={`${isSelected ? 'text-white' : 'text-gray-400'}`}>
                                {cmd.icon}
                              </span>
                              <span className="text-xs sm:text-sm font-medium">{cmd.name}</span>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              {cmd.shortcut && (
                                <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                                  isSelected ? 'bg-white/20 text-white' : 'bg-white/5 text-gray-500'
                                }`}>
                                  {cmd.shortcut}
                                </span>
                              )}
                              {isSelected && (
                                <svg className="w-3.5 h-3.5 text-white opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 10 4 15 9 20" /><path d="M20 4v7a4 4 0 0 1-4 4H4" /></svg>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  );
                })
              ) : (
                <div className="py-8 text-center text-xs sm:text-sm text-gray-500">
                  No commands found matching "{query}"
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
export default CommandPalette;
