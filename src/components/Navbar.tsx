import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Palette, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Sandbox', href: '#sandbox' },
  { name: 'Resume', href: '/Aman_Daftarband_Resume.pdf', external: true },
  { name: 'Contact', href: '#contact' },
];

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [currentTheme, setCurrentTheme] = useState('space');
  const [isThemeDropdownOpen, setIsThemeDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const themes = [
    { id: 'space', name: 'Space Blue', color: '#3B82F6' },
    { id: 'cyberpunk', name: 'Cyberpunk', color: '#ff007f' },
    { id: 'emerald', name: 'Emerald', color: '#10b981' },
    { id: 'sunset', name: 'Sunset', color: '#f97316' }
  ];

  useEffect(() => {
    // Load saved theme on mount
    const savedTheme = localStorage.getItem('portfolio-theme') || 'space';
    setCurrentTheme(savedTheme);

    const handleThemeChange = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      setCurrentTheme(customEvent.detail || 'space');
    };

    window.addEventListener('theme-changed', handleThemeChange);
    return () => {
      window.removeEventListener('theme-changed', handleThemeChange);
    };
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsThemeDropdownOpen(false);
      }
    };
    if (isThemeDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isThemeDropdownOpen]);

  const handleThemeSelect = (themeId: string) => {
    if (themeId === 'space') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', themeId);
    }
    localStorage.setItem('portfolio-theme', themeId);
    setCurrentTheme(themeId);
    window.dispatchEvent(new CustomEvent('theme-changed', { detail: themeId }));
    setIsThemeDropdownOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      // Background scroll effect
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Active section detection
      const sections = navItems
        .filter(item => !item.external)
        .map(item => item.href.substring(1));
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'py-3 bg-[#0B0F19]/80 backdrop-blur-md border-b border-white/5 shadow-lg shadow-black/10'
          : 'py-5 bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="#home" className="flex items-center gap-2 group">
              <span className="text-2xl font-black tracking-tighter bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent group-hover:opacity-85 transition-opacity">
                AD
              </span>
              <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse"></span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            {/* Command Palette Trigger Pill */}
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('toggle-command-palette'))}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/5 text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/10 text-xs transition-all cursor-pointer font-medium"
            >
              <svg className="w-3.5 h-3.5 animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              <span>Search...</span>
              <kbd className="text-[9px] bg-white/10 border border-white/10 px-1.5 py-0.5 rounded font-mono font-bold tracking-widest text-gray-400">Ctrl K</kbd>
            </button>

            {/* Visual Theme Switcher */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsThemeDropdownOpen(!isThemeDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/5 text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/10 text-xs transition-all cursor-pointer font-medium"
                aria-label="Select Theme"
              >
                <Palette className="w-3.5 h-3.5" style={{ color: themes.find(t => t.id === currentTheme)?.color }} />
                <span className="capitalize">{currentTheme === 'space' ? 'Classic' : currentTheme}</span>
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isThemeDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isThemeDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-44 rounded-2xl border border-white/10 bg-[#0e1322]/95 backdrop-blur-xl p-2 shadow-2xl z-50 space-y-1"
                  >
                    <div className="px-2 py-1 text-[9px] font-bold text-gray-500 uppercase tracking-widest border-b border-white/5 mb-1">
                      Choose Theme
                    </div>
                    {themes.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => handleThemeSelect(t.id)}
                        className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs transition-all text-left ${
                          currentTheme === t.id
                            ? 'bg-white/10 text-white font-semibold'
                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className="w-2 h-2 rounded-full border border-white/20 inline-block shadow-sm"
                            style={{ backgroundColor: t.color }}
                          />
                          <span>{t.name}</span>
                        </div>
                        {currentTheme === t.id && (
                          <span className="h-1 w-1 rounded-full bg-cyan-400" />
                        )}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="flex items-center space-x-1">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    activeSection === item.href.substring(1) && !item.external
                      ? 'text-white bg-white/5 shadow-[0_0_15px_rgba(255,255,255,0.05)] border border-white/10'
                      : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
                  }`}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>



          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 border border-white/5 focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`md:hidden fixed inset-x-0 top-[60px] glass-dark border-b border-white/10 shadow-2xl transition-all duration-300 ease-in-out ${
          isOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-4 invisible pointer-events-none'
        }`}
      >
        <div className="px-4 pt-2 pb-6 space-y-1">
          {/* Search Trigger for Mobile */}
          <button
            onClick={() => {
              setIsOpen(false);
              window.dispatchEvent(new CustomEvent('toggle-command-palette'));
            }}
            className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 border border-dashed border-white/10 mb-3 cursor-pointer text-left"
          >
            <div className="flex items-center gap-2.5">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              <span>Search Commands...</span>
            </div>
            <kbd className="text-[10px] bg-white/10 border border-white/10 px-1.5 py-0.5 rounded font-mono font-bold text-gray-400">Ctrl+K</kbd>
          </button>

          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noopener noreferrer" : undefined}
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                activeSection === item.href.substring(1) && !item.external
                  ? 'text-white bg-white/5 border border-white/10'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {item.name}
            </a>
          ))}

          {/* Theme Selector for Mobile */}
          <div className="pt-3 pb-2 px-4 border-t border-white/5 mt-3">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-2.5">Select Theme</span>
            <div className="grid grid-cols-4 gap-2">
              {themes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => handleThemeSelect(t.id)}
                  className={`flex flex-col items-center justify-center p-2 rounded-xl border text-[10px] font-medium transition-all ${
                    currentTheme === t.id
                      ? 'bg-white/10 border-white/10 text-white font-semibold'
                      : 'bg-white/5 border-white/5 text-gray-400 hover:text-white'
                  }`}
                >
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-white/20 mb-1"
                    style={{ backgroundColor: t.color }}
                  />
                  <span className="capitalize">{t.id === 'space' ? 'Classic' : t.id}</span>
                </button>
              ))}
            </div>
          </div>
          
          <div className="pt-4 border-t border-white/5 flex items-center justify-around">
            <a
              href="https://github.com/amanshaikh405"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white p-2 rounded-xl hover:bg-white/5 transition-all"
              aria-label="GitHub"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
            </a>
            <a
              href="https://www.linkedin.com/in/aman-daftarband"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white p-2 rounded-xl hover:bg-white/5 transition-all"
              aria-label="LinkedIn"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
            </a>
            <a
              href="https://x.com/aman_Shaikh_405"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white p-2 rounded-xl hover:bg-white/5 transition-all"
              aria-label="Twitter (X)"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></svg>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
