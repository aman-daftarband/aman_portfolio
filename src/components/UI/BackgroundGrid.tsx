import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const BackgroundGrid: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleToggle = () => {
      setIsVisible(prev => !prev);
    };
    window.addEventListener('toggle-bg-grid', handleToggle);
    return () => window.removeEventListener('toggle-bg-grid', handleToggle);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden bg-brand-bg w-full h-full pointer-events-none transition-colors duration-500">
      {/* Ambient Radial Glows */}
      <div className="absolute top-0 left-0 w-full h-full">
        {/* Top-Left Blue Glow */}
        <motion.div
          animate={{
            x: [0, 40, -30, 0],
            y: [0, -50, 30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -top-40 -left-40 w-96 h-96 md:w-[600px] md:h-[600px] rounded-full bg-brand-blue/10 blur-[80px] md:blur-[120px] will-change-transform transition-colors duration-500"
        />

        {/* Center-Right Purple Glow */}
        <motion.div
          animate={{
            x: [0, -60, 40, 0],
            y: [0, 40, -60, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-[25%] -right-20 w-80 h-80 md:w-[500px] md:h-[500px] rounded-full bg-brand-purple/10 blur-[80px] md:blur-[120px] will-change-transform transition-colors duration-500"
        />

        {/* Bottom-Left Cyan Glow */}
        <motion.div
          animate={{
            x: [0, 30, -40, 0],
            y: [0, 30, -30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-[-10%] left-[10%] w-96 h-96 md:w-[550px] md:h-[550px] rounded-full bg-brand-cyan/8 blur-[80px] md:blur-[120px] will-change-transform transition-colors duration-500"
        />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 grid-bg opacity-65 pointer-events-none" />

      {/* Mask to smooth out the edges of the grid (Stripe/Linear style) */}
      <div 
        className="absolute inset-0 pointer-events-none transition-all duration-500" 
        style={{
          background: 'radial-gradient(circle at 50% 50%, transparent 20%, var(--color-brand-bg) 85%)'
        }}
      />
    </div>
  );
};
export default BackgroundGrid;
