import React from 'react';
import { motion } from 'framer-motion';
import GlowingCard from './UI/GlowingCard';
import { GraduationCap, Compass, Briefcase, Award } from 'lucide-react';

export const About: React.FC = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 80, damping: 15 } }
  };

  return (
    <section id="about" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Title */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-extrabold text-white"
          >
            About <span className="gradient-text-blue-purple-cyan">Me</span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: '80px' }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-4 rounded-full"
          />
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

          {/* Professional Summary - Left Side (8 Cols) */}
          <div className="lg:col-span-8 space-y-6 flex flex-col justify-between">
            <motion.div
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <GlowingCard className="p-8 h-full flex flex-col justify-between" glowColor="rgba(59, 130, 246, 0.1)">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
                      <Briefcase className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white">Professional Summary</h3>
                  </div>

                  <p className="text-gray-300 leading-relaxed text-base sm:text-lg mb-6">
                    Computer Applications graduate skilled in Python, SQL, FastAPI, Flask, AI Integrations, Prompt Engineering, and Data Analytics.
                  </p>
                  <p className="text-gray-450 leading-relaxed text-sm sm:text-base">
                    I specialize in building production-ready web platforms powered by artificial intelligence. From designing responsive, high-performance user interfaces in React to setting up robust backend APIs and RAG workflows, I enjoy bringing complex ideas to life through high-quality code.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-white/5 text-center">
                  <div>
                    <span className="block text-2xl font-bold text-white">15+</span>
                    <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">AI Projects</span>
                  </div>
                  <div>
                    <span className="block text-2xl font-bold text-white">8.15</span>
                    <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">BCA CGPA</span>
                  </div>
                  <div>
                    <span className="block text-2xl font-bold text-white">30%</span>
                    <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Efficiency Gain</span>
                  </div>
                  <div>
                    <span className="block text-2xl font-bold text-white">2+</span>
                    <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Credentials</span>
                  </div>
                </div>
              </GlowingCard>
            </motion.div>

            {/* Career Goals */}
            <motion.div
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <GlowingCard className="p-8" glowColor="rgba(139, 92, 246, 0.1)">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
                    <Compass className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">Career Goals</h3>
                </div>
                <p className="text-gray-300 leading-relaxed text-base">
                  Passionate about building intelligent systems that solve real-world problems through automation and AI. My goal is to work alongside cutting-edge startups and industry leaders to design, test, and deploy production-grade Large Language Model integrations, custom RAG vector-search networks, and autonomous agents that transform raw data into action.
                </p>
              </GlowingCard>
            </motion.div>
          </div>

          {/* Education & Info - Right Side (4 Cols) */}
          <div className="lg:col-span-4">
            <motion.div
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="h-full"
            >
              <GlowingCard className="p-8 h-full flex flex-col justify-between" glowColor="rgba(6, 182, 212, 0.1)">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                      <GraduationCap className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white">Education</h3>
                  </div>

                  <div className="relative border-l border-white/10 pl-5 ml-2.5 space-y-6">
                    {/* Education Item */}
                    <div className="relative">
                      {/* Timeline dot */}
                      <span className="absolute -left-[27px] top-1.5 h-3.5 w-3.5 rounded-full bg-cyan-500 border-2 border-[#0e1322] shadow-[0_0_8px_rgba(6,182,212,0.5)]"></span>

                      <span className="text-xs font-mono font-bold text-cyan-400">2023 - 2026</span>
                      <h4 className="text-lg font-bold text-white mt-1">Bachelor of Computer Applications</h4>
                      <p className="text-sm text-gray-400">Basaveshwar Science College</p>
                      <p className="text-xs text-gray-500">Bagalkot, Karnataka</p>

                      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold mt-3">
                        <Award className="w-3.5 h-3.5" />
                        <span>CGPA: 8.15 / 10</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/5 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Location:</span>
                    <span className="text-gray-300 font-medium text-right">Akluj, Maharashtra, India</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Status:</span>
                    <span className="text-emerald-400 font-medium">Open for Opportunities</span>
                  </div>
                </div>
              </GlowingCard>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
export default About;
