import React from 'react';
import { motion } from 'framer-motion';
import GlowingCard from './UI/GlowingCard';
import { Calendar, Cpu, Zap, Search, ShieldCheck } from 'lucide-react';

export const Experience: React.FC = () => {
  const achievements = [
    {
      icon: <Cpu className="w-5 h-5 text-blue-400" />,
      text: 'Developed Python-based AI applications to automate workflows and improve software functionality.',
    },
    {
      icon: <Zap className="w-5 h-5 text-purple-400" />,
      text: 'Designed and tested backend modules while implementing REST API integration.',
    },
    {
      icon: <Search className="w-5 h-5 text-cyan-400" />,
      text: 'Applied SQL, debugging, testing, and software engineering best practices to internship assignments.',
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
      text: 'Collaborated on AI development tasks while consistently delivering assignments within project timelines.',
    },
  ];

  return (
    <section id="experience" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-extrabold text-white"
          >
            Professional <span className="gradient-text-blue-purple-cyan">Experience</span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: '80px' }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto mt-4 rounded-full"
          />
        </div>

        {/* Timeline Layout */}
        <div className="max-w-3xl mx-auto relative border-l border-white/10 pl-6 md:pl-10 ml-4 md:ml-auto md:mr-auto">
          {/* Timeline Node */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring' as const, stiffness: 80 }}
            className="relative"
          >
            {/* Pulsing Core Circle */}
            <span className="absolute -left-[35px] md:-left-[51px] top-6 flex h-6 w-6 items-center justify-center rounded-full bg-[#0B0F19] border-2 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.6)]">
              <span className="h-2 w-2 rounded-full bg-blue-400 animate-ping"></span>
            </span>

            {/* Experience Card */}
            <GlowingCard className="p-6 md:p-8" glowColor="rgba(59, 130, 246, 0.12)">
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-white/5 pb-5">
                <div>
                  <span className="text-xs font-bold font-mono tracking-widest text-blue-400 uppercase bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
                    Internship
                  </span>
                  <h3 className="text-2xl font-bold text-white mt-3">Python & Artificial Intelligence Intern</h3>
                  <a 
                    href="https://arligtech.com" // placeholder link or text representation
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-lg font-medium text-gray-300 hover:text-blue-400 transition-colors"
                  >
                    Arlig Technologies
                  </a>
                </div>
                
                <div className="flex items-center gap-2 text-gray-400 text-sm font-semibold">
                  <Calendar className="w-4 h-4 text-blue-400" />
                  <span>Jan 2026 - Feb 2026</span>
                </div>
              </div>

              {/* Achievements Checklist */}
              <div className="space-y-4">
                <h4 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-2">Key Achievements</h4>
                
                <div className="grid grid-cols-1 gap-4">
                  {achievements.map((item, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="p-2 rounded-xl bg-white/5 border border-white/5 mt-0.5 flex-shrink-0">
                        {item.icon}
                      </div>
                      <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats Highlights */}
              <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-white/5">
                <div className="p-4 rounded-xl bg-[#0B0F19]/55 border border-white/5 text-center">
                  <span className="block text-3xl font-extrabold text-blue-400">15+</span>
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest mt-1 block">
                    AI Projects
                  </span>
                </div>
                <div className="p-4 rounded-xl bg-[#0B0F19]/55 border border-white/5 text-center">
                  <span className="block text-3xl font-extrabold text-cyan-400">+30%</span>
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest mt-1 block">
                    Efficiency
                  </span>
                </div>
              </div>
            </GlowingCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
export default Experience;
