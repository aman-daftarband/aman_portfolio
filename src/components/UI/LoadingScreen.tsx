import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

const logs = [
  'system: initializing portfolio environment...',
  'modules: loading AI chatbot agent...',
  'modules: connecting Web3Forms endpoint...',
  'status: environment online.'
];

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [logIndex, setLogIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  // Cycle through logs
  useEffect(() => {
    if (logIndex >= logs.length - 1) return;

    const timer = setTimeout(() => {
      setLogIndex(prev => prev + 1);
    }, 550);

    return () => clearTimeout(timer);
  }, [logIndex]);

  // Handle smooth progress bar filling
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2.5; // Fills up to 100% in 2 seconds
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // Completion trigger
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2200);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ y: 0 }}
      exit={{ 
        y: '-100%',
        transition: { duration: 0.6, ease: [0.85, 0, 0.15, 1] }
      }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0B0F19] w-full h-full font-mono select-none"
    >
      {/* Glow Backdrop */}
      <div className="absolute w-[300px] h-[300px] rounded-full bg-blue-500/10 blur-[80px]" />

      <div className="relative flex flex-col items-center z-10 space-y-8 max-w-sm px-6">
        
        {/* Pulsing Monogram Logo */}
        <div className="relative flex items-center justify-center">
          {/* Animated concentric pulse rings */}
          <motion.div
            animate={{ scale: [0.9, 1.3, 0.9], opacity: [0.3, 0.05, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute w-28 h-28 rounded-full border border-blue-500/30"
          />
          <motion.div
            animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0, 0.2] }}
            transition={{ duration: 2, delay: 0.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute w-28 h-28 rounded-full border border-purple-500/20"
          />
          
          {/* Glass Circle base */}
          <div className="relative w-20 h-20 rounded-full flex items-center justify-center bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl">
            <span className="text-3xl font-black tracking-tighter bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
              AD
            </span>
          </div>
        </div>

        {/* Loading Progress & Terminal logs */}
        <div className="w-full space-y-3.5 text-center min-h-[60px]">
          {/* Active Log line */}
          <motion.div
            key={logIndex}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="text-xs text-cyan-400/80 font-mono tracking-wide"
          >
            {logs[logIndex]}
          </motion.div>

          {/* Progress Percent Text */}
          <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
            {Math.floor(progress)}% loaded
          </div>

          {/* Slim Premium Progress Bar (Vercel style) */}
          <div className="w-48 h-[1px] bg-white/5 rounded-full overflow-hidden mx-auto relative border border-white/5">
            <motion.div 
              className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
export default LoadingScreen;
