import React from 'react';
import { motion } from 'framer-motion';
import GlowingCard from './UI/GlowingCard';
import { Award, ExternalLink, ShieldCheck } from 'lucide-react';

interface Certification {
  id: number;
  title: string;
  issuer: string;
  year: string;
  verificationUrl: string;
  themeColor: string; // rgba glow color
  borderColor: string; // gradient classes
  credentialId?: string;
}

export const Certifications: React.FC = () => {
  const certifications: Certification[] = [
    {
      id: 1,
      title: 'Oracle Cloud Infrastructure 2025 AI Foundations Associate',
      issuer: 'Oracle Cloud Infrastructure (OCI)',
      year: '2025',
      verificationUrl: 'https://brm-certification.oracle.com/apex/f?p=1111:6:101864399077150',
      themeColor: 'rgba(242, 47, 47, 0.12)', // Oracle Red/Orange
      borderColor: 'from-orange-500 to-red-600',
      credentialId: 'OCI-AI-2025-FOUNDATIONS'
    },
    {
      id: 2,
      title: 'Building LLM Applications with Prompt Engineering',
      issuer: 'NVIDIA Deep Learning Institute',
      year: '2025',
      verificationUrl: 'https://learn.nvidia.com/certificates?id=ByQ0yZkQS8WZ8oCiF9MjRQ',
      themeColor: 'rgba(118, 185, 0, 0.12)', // NVIDIA Green
      borderColor: 'from-green-400 to-emerald-600',
      credentialId: 'DLI-LLM-PROMPT-ENG'
    }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring' as const, stiffness: 80, damping: 15 }
    }
  };

  return (
    <section id="certifications" className="py-20 relative">
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
            Licenses & <span className="gradient-text-blue-purple-cyan">Certifications</span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: '80px' }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-4 rounded-full"
          />
        </div>

        {/* Certifications Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
        >
          {certifications.map((cert) => (
            <motion.div key={cert.id} variants={cardVariants} className="h-full">
              <GlowingCard
                className="p-6 md:p-8 h-full flex flex-col justify-between"
                glowColor={cert.themeColor}
              >
                {/* Header & Issuer */}
                <div>
                  <div className="flex justify-between items-start gap-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-tr ${cert.borderColor} text-white shadow-lg`}>
                      <Award className="w-6 h-6" />
                    </div>
                    
                    <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Verified</span>
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mt-5 leading-snug">
                    {cert.title}
                  </h3>
                  
                  <p className="text-sm font-semibold text-gray-400 mt-2">
                    {cert.issuer}
                  </p>
                  
                  {cert.credentialId && (
                    <p className="text-xs font-mono text-gray-500 mt-4 bg-white/5 border border-white/5 px-2.5 py-1 rounded-lg inline-block">
                      ID: {cert.credentialId}
                    </p>
                  )}
                </div>

                {/* Footer with verification link */}
                <div className="pt-6 border-t border-white/5 mt-8 flex items-center justify-between">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
                    Issued: {cert.year}
                  </span>
                  
                  <a
                    href={cert.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm font-bold text-blue-400 hover:text-blue-300 transition-colors group"
                  >
                    <span>Verify Credential</span>
                    <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </GlowingCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
export default Certifications;
