import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import DeveloperTerminal from './components/DeveloperTerminal';
import { BackgroundGrid } from './components/UI/BackgroundGrid';
import { AIChatbot } from './components/AIChatbot';
import { CommandPalette } from './components/CommandPalette';
import { LoadingScreen } from './components/UI/LoadingScreen';
import { CursorSpotlight } from './components/UI/CursorSpotlight';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Prevent background scrolling while loading
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isLoading]);

  return (
    <div className="relative min-h-screen text-gray-100 bg-[#0B0F19] overflow-hidden">
      {/* Sleek Intro Loading Screen */}
      <AnimatePresence>
        {isLoading && (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {/* Main Content Reveal Wrapper */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.5, delay: 0.15 }}
      >
        {/* Scroll Progress Bar at the top (Linear style) */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 z-50 origin-left"
          style={{ scaleX }}
        />

        {/* Floating Animated Grid Canvas */}
        <BackgroundGrid />

        {/* Cursor Spotlight lighting trail */}
        <CursorSpotlight />

        {/* Navigation */}
        <Navbar />

        {/* Page Sections */}
        <div className="relative z-10">
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Certifications />
          <DeveloperTerminal />
          <Contact />
        </div>

        {/* Footer */}
        <Footer />

        {/* Floating AI Agent Chatbot */}
        <AIChatbot />

        {/* Keyboard-accessible Command Center */}
        <CommandPalette />
      </motion.div>
    </div>
  );
};

export default App;
