import React from 'react';
import { motion } from 'framer-motion';
import GlowingCard from './UI/GlowingCard';
import { Code2, Server, Database, BrainCircuit, Wrench } from 'lucide-react';

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  color: string; // rgba glow color
  textColor: string; // border/highlight color class
  skills: string[];
}

export const Skills: React.FC = () => {
  const categories: SkillCategory[] = [
    {
      title: 'Programming',
      icon: <Code2 className="w-5 h-5" />,
      color: 'rgba(59, 130, 246, 0.12)', // Blue
      textColor: 'text-blue-400 border-blue-500/20 bg-blue-500/5',
      skills: ['Python', 'SQL', 'JavaScript', 'HTML5', 'CSS3'],
    },
    {
      title: 'Backend',
      icon: <Server className="w-5 h-5" />,
      color: 'rgba(6, 182, 212, 0.12)', // Cyan
      textColor: 'text-cyan-400 border-cyan-500/20 bg-cyan-500/5',
      skills: ['FastAPI', 'Flask', 'REST APIs', 'API Integration'],
    },
    {
      title: 'AI & ML',
      icon: <BrainCircuit className="w-5 h-5" />,
      color: 'rgba(139, 92, 246, 0.15)', // Purple
      textColor: 'text-purple-400 border-purple-500/20 bg-purple-500/5',
      skills: ['Machine Learning', 'Generative AI', 'LLMs', 'LangChain', 'Prompt Engineering', 'FAISS', 'RAG'],
    },
    {
      title: 'Database',
      icon: <Database className="w-5 h-5" />,
      color: 'rgba(16, 185, 129, 0.12)', // Emerald
      textColor: 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5',
      skills: ['MySQL'],
    },
    {
      title: 'Tools',
      icon: <Wrench className="w-5 h-5" />,
      color: 'rgba(245, 158, 11, 0.12)', // Amber
      textColor: 'text-amber-400 border-amber-500/20 bg-amber-500/5',
      skills: ['Git', 'GitHub', 'VS Code'],
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring' as const, stiffness: 80, damping: 15 },
    },
  };

  return (
    <section id="skills" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-extrabold text-white"
          >
            Technical <span className="gradient-text-blue-purple-cyan">Expertise</span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: '80px' }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto mt-4 rounded-full"
          />
        </div>

        {/* Skill Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {categories.map((cat, index) => (
            <motion.div key={index} variants={cardVariants} className="h-full">
              <GlowingCard
                className="p-6 h-full flex flex-col justify-start"
                glowColor={cat.color}
              >
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-5 pb-4 border-b border-white/5">
                  <div className={`p-2 rounded-xl bg-white/5 ${cat.textColor.split(' ')[0]}`}>
                    {cat.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white tracking-wide">{cat.title}</h3>
                </div>

                {/* Skill Badges */}
                <div className="flex flex-wrap gap-2.5">
                  {cat.skills.map((skill, sIdx) => (
                    <motion.span
                      key={sIdx}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className={`px-3 py-1.5 rounded-xl border text-xs font-semibold tracking-wide transition-colors duration-200 ${cat.textColor}`}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </GlowingCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
export default Skills;
