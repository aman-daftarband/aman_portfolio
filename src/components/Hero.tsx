import React from 'react';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 w-full">
        {/* Layout Grid: Centered & Aligned */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20">

          {/* Left Side: Circular Portrait Photo with Glowing Blue Border */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 80, delay: 0.1 }}
            className="relative flex-shrink-0"
          >
            {/* Holographic glowing orb background */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-brand-blue/20 via-brand-purple/20 to-brand-cyan/20 blur-[40px] animate-pulse-glow will-change-[transform,opacity] pointer-events-none transition-all duration-500" />

            {/* The circular photo container */}
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full p-[3px] bg-gradient-to-r from-brand-blue to-brand-cyan shadow-[0_0_50px_var(--glow-color,rgba(59,130,246,0.35))] overflow-hidden flex items-center justify-center bg-brand-bg transition-all duration-500">
              <img
                src="/aman_photo.jpg"
                alt="Aman Daftarband"
                className="w-full h-full object-cover object-top rounded-full"
              />
            </div>
          </motion.div>

          {/* Right Side: Info Text & Actions */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: 'spring', stiffness: 80, delay: 0.2 }}
            className="flex flex-col text-center lg:text-left items-center lg:items-start max-w-xl space-y-6"
          >
            {/* Heading Name */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight">
              Aman <span className="gradient-text-blue-cyan">Daftarband</span>
            </h1>

            {/* Subtitle */}
            <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-wide">
              AI & Python Developer
            </h2>

            {/* Description */}
            <p className="text-base sm:text-lg text-gray-400 leading-relaxed font-light">
              Specialized in building full-stack AI applications, automation workflows.
            </p>

            {/* Rounded Buttons */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-2">
              <a
                href="/Aman_Daftarband_Resume.pdf"
                download
                className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-white bg-gradient-to-r from-brand-blue to-brand-cyan hover:from-brand-blue/90 hover:to-brand-cyan/90 shadow-lg shadow-brand-blue/20 hover:shadow-brand-blue/35 transition-all duration-300"
              >
                <Download className="w-4.5 h-4.5" />
                <span>View Resume</span>
              </a>
              <a
                href="#contact"
                className="flex items-center justify-center px-6 py-3 rounded-full font-semibold text-brand-cyan bg-transparent border border-brand-cyan/30 hover:border-brand-cyan hover:bg-brand-cyan/10 transition-all duration-300"
              >
                <span>Get In Touch</span>
              </a>
            </div>

            {/* Inline Social Icons */}
            <div className="flex items-center gap-5 pt-4">
              {/* GitHub */}
              <a
                href="https://github.com/amanshaikh405"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white hover:scale-110 transition-all duration-200"
                aria-label="GitHub"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/aman-daftarband"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white hover:scale-110 transition-all duration-200"
                aria-label="LinkedIn"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
              </a>

              {/* Mail */}
              <a
                href="mailto:amandaftarband@gmail.com"
                className="text-gray-400 hover:text-white hover:scale-110 transition-all duration-200"
                aria-label="Email"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
              </a>
            </div>

          </motion.div>
        </div>
      </div>

      {/* Ambient glow backgrounds */}
      <div className="absolute top-[20%] left-[10%] -z-10 w-96 h-96 rounded-full bg-brand-blue/10 blur-[120px] pointer-events-none transition-colors duration-500" />

      {/* Fade overlay at bottom */}
      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-brand-bg to-transparent pointer-events-none transition-colors duration-500" />
    </section>
  );
};
export default Hero;
