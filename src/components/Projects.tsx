import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlowingCard from './UI/GlowingCard';
import { ExternalLink, Sparkles, ArrowUpRight, CheckCircle2, X } from 'lucide-react';

interface Project {
  id: number;
  name: string;
  description: string;
  longDescription: string;
  architecture: string;
  metrics: { label: string; value: string }[];
  technologies: string[];
  features: string[];
  image: string;
  categories: ('AI/ML' | 'Full Stack' | 'Automation')[];
  github?: string;
  live?: string;
  featured?: boolean;
}

export const Projects: React.FC = () => {
  const [filter, setFilter] = useState<'All' | 'AI/ML' | 'Full Stack' | 'Automation'>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Lock body scroll when modal is active
  React.useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedProject]);

  // Handle keyboard Escape close
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const projects: Project[] = [
    {
      id: 1,
      name: 'J.A.R.V.I.S Smart Desktop Voice Assistant',
      description: 'Advanced AI desktop assistant with voice interaction, web search, image generation, memory management, and workflow automation.',
      longDescription: 'J.A.R.V.I.S is a highly responsive desktop voice assistant designed to bridge local hardware automation and cutting-edge Large Language Models. Built on an asynchronous Python FastAPI backend with an Eel-powered HTML/CSS/JS frontend, it provides an ultra-low latency conversational experience. The assistant uses Groq API (Llama 3 70B) for prompt intelligence, Tavily API for real-time web searches, and Pyttsx3 for quick TTS synthesis. Most importantly, it features an autonomous memory system powered by FAISS Vector Database, which embeds previous conversation fragments and allows semantic recall in subsequent chats.',
      architecture: 'The user speaks into the microphone -> Speech-to-Text translation is performed -> The prompt is checked against local commands -> A query is sent to the FAISS Vector Database to retrieve relevant conversation context -> A contextualized query is dispatched to Groq AI (Llama 3 70B) -> The text response is streamed to the Eel frontend and simultaneously synthesized via Text-to-Speech (TTS) for the user.',
      metrics: [
        { label: 'AI Engine', value: 'Groq Llama 3 70B' },
        { label: 'Response Latency', value: '~230ms avg' },
        { label: 'Vector Store', value: 'FAISS (Local Index)' },
        { label: 'TTS Engine', value: 'Pyttsx3 (SAPI5/NSSpeech)' },
        { label: 'Search Provider', value: 'Tavily Search API' },
        { label: 'Memory Embedding', value: 'Sentence-Transformers' }
      ],
      technologies: ['Python', 'FastAPI', 'JavaScript', 'Eel', 'Groq AI', 'Tavily API', 'FAISS'],
      features: [
        'Voice Recognition & Synthesized TTS Speech',
        'AI Chatbot Conversational Interface',
        'System Automation & Custom Script Launching',
        'FAISS Vector Memory Integration',
        'Live Web Search via Tavily API',
        'DALL-E & Stable Diffusion Image Generation'
      ],
      image: '/jarvis_mockup.png',
      categories: ['AI/ML', 'Automation', 'Full Stack'],
      github: 'https://github.com/amanshaikh405',
      featured: true
    },
    {
      id: 2,
      name: 'Resume AI',
      description: 'AI-powered Resume Builder and Career Management Platform featuring ATS keyword scanning, resume scores, and customizable PDF templates.',
      longDescription: 'Resume AI is a comprehensive full-stack platform designed to automate and optimize the job application workflow. The platform features an ATS (Applicant Tracking System) scanner that compares a candidate\'s resume against specific job descriptions using TF-IDF tokenization and Cosine Similarity. The backend is built using Flask API and MySQL, which handles secure JWT session management and candidate profiles. Using Llama 3 (via Groq API), the platform parses resumes, calculates a match score, highlights missing critical keywords, and generates instant, context-aware rewrite suggestions to bypass recruiters\' automated scanners. Completed resumes can be custom-compiled and exported as print-ready PDF files.',
      architecture: 'User uploads resume data and targets a job description -> The Flask backend processes the resume text -> The ATS parser extracts key tokens and performs TF-IDF matching -> Groq Llama 3 analyzes the resume alignment and lists missing keywords or improvements -> The match score is saved in MySQL -> Results are rendered on the React dashboard -> The user can export a formatted PDF using custom templates.',
      metrics: [
        { label: 'Core AI Model', value: 'Llama 3 8B (Groq)' },
        { label: 'Scan Time', value: '< 1.5 seconds' },
        { label: 'ATS Match Metric', value: 'Cosine Similarity / TF-IDF' },
        { label: 'Database', value: 'MySQL (Relational)' },
        { label: 'Auth Method', value: 'JWT Stateless Session' },
        { label: 'Export Engine', value: 'ReportLab / PDF Compiler' }
      ],
      technologies: ['React', 'Flask', 'MySQL', 'Groq Llama 3', 'Tailwind CSS'],
      features: [
        'ATS Resume Keyword Optimization Scanners',
        'Dynamic Resume Score Analysis & Insights',
        'Instant PDF Generation and Exporting',
        'User Analytics & Activity Dashboards',
        'Secure Authentication via JWT & MySQL'
      ],
      image: '/resume_ai_mockup.png',
      categories: ['AI/ML', 'Full Stack'],
      github: 'https://github.com/amanshaikh405',
      featured: true
    }
  ];

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.categories.includes(filter as 'AI/ML' | 'Full Stack' | 'Automation'));

  const filterTabs: ('All' | 'AI/ML' | 'Full Stack' | 'Automation')[] = ['All', 'AI/ML', 'Full Stack', 'Automation'];

  return (
    <section id="projects" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-extrabold text-white"
          >
            Featured <span className="gradient-text-blue-purple-cyan">Projects</span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: '80px' }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto mt-4 rounded-full"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center items-center flex-wrap gap-2.5 mb-12">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 border ${
                filter === tab
                  ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/20'
                  : 'bg-white/5 border-white/5 text-gray-400 hover:text-white hover:border-white/10 hover:bg-white/10'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 80, damping: 15, delay: index * 0.15 }}
                className="flex flex-col h-full cursor-pointer group/card"
                onClick={() => setSelectedProject(project)}
              >
                <GlowingCard 
                  className="flex flex-col h-full" 
                  glowColor={project.id === 1 ? 'rgba(59, 130, 246, 0.15)' : 'rgba(139, 92, 246, 0.15)'}
                >
                  {/* Image Container */}
                  <div className="relative aspect-video w-full overflow-hidden border-b border-white/5 group">
                    <img 
                      src={project.image} 
                      alt={project.name}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105" 
                      loading="lazy"
                    />
                    
                    {/* Featured Overlay */}
                    {project.featured && (
                      <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-600/90 border border-blue-400/30 text-white text-xs font-bold shadow-md">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>FEATURED</span>
                      </div>
                    )}

                    {/* Links overlay on hover */}
                    <div className="absolute inset-0 bg-[#0B0F19]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                      {project.github && (
                        <a 
                          href={project.github} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="p-3 rounded-xl bg-white/10 text-white border border-white/20 hover:bg-white/20 transition-all hover:scale-110"
                          title="View Code"
                        >
                          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
                        </a>
                      )}
                      {project.live && (
                        <a 
                          href={project.live} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="p-3 rounded-xl bg-blue-600 text-white border border-blue-400/20 hover:bg-blue-500 transition-all hover:scale-110"
                          title="Live Demo"
                        >
                          <ExternalLink className="w-6 h-6" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 md:p-8 flex flex-col justify-between flex-grow">
                    <div>
                      {/* Categories / Badges */}
                      <div className="flex gap-2 mb-3">
                        {project.categories.map((cat, index) => (
                          <span key={index} className="text-[10px] font-bold tracking-widest uppercase text-cyan-400 bg-cyan-400/5 px-2.5 py-0.5 rounded-full border border-cyan-400/10">
                            {cat}
                          </span>
                        ))}
                      </div>

                      {/* Title */}
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-3 hover:text-blue-400 transition-colors flex items-center gap-2 group-hover/card:text-blue-400">
                        <span>{project.name}</span>
                        <ArrowUpRight className="w-5 h-5 text-gray-500 group-hover/card:text-blue-400 group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5 transition-all flex-shrink-0" />
                      </h3>

                      {/* Description */}
                      <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-6">
                        {project.description}
                      </p>

                      {/* Features Bullet List */}
                      <div className="space-y-2 mb-6">
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-2.5">Key Capabilities</span>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {project.features.slice(0, 6).map((feat, index) => (
                            <div key={index} className="flex items-start gap-2">
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                              <span className="text-xs md:text-sm text-gray-300 leading-snug">{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Technologies Tags Footer */}
                    <div className="pt-6 border-t border-white/5 mt-auto">
                      <div className="flex flex-wrap gap-1.5">
                        {project.technologies.map((tech, index) => (
                          <span 
                            key={index}
                            className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/5 text-[11px] font-semibold text-gray-400"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </GlowingCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Modal Overlay */}
        <AnimatePresence>
          {selectedProject && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProject(null)}
                className="absolute inset-0 bg-black/80 backdrop-blur-xl"
              />

              {/* Modal Body */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: 'spring', duration: 0.4 }}
                className="relative w-full max-w-5xl max-h-[85vh] overflow-y-auto rounded-3xl border border-white/10 bg-[#0e1322]/95 text-gray-100 shadow-2xl flex flex-col no-scrollbar cursor-default"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-5 right-5 p-2.5 rounded-xl bg-white/5 border border-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all z-10"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Banner Image */}
                <div className="relative w-full aspect-video md:aspect-[2.2/1] overflow-hidden border-b border-white/5">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.name}
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e1322] via-[#0e1322]/40 to-transparent" />
                  <div className="absolute bottom-6 left-6 md:left-8 right-6 md:right-8">
                    {/* Categories */}
                    <div className="flex gap-2 mb-3">
                      {selectedProject.categories.map((cat, index) => (
                        <span key={index} className="text-[10px] font-bold tracking-widest uppercase text-cyan-400 bg-cyan-400/10 px-2.5 py-0.5 rounded-full border border-cyan-400/20">
                          {cat}
                        </span>
                      ))}
                    </div>
                    {/* Title */}
                    <h3 className="text-2xl md:text-3xl font-extrabold text-white">
                      {selectedProject.name}
                    </h3>
                  </div>
                </div>

                {/* Main Content Grid */}
                <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Left Column - Detailed Description & Architecture (7 Cols) */}
                  <div className="lg:col-span-7 space-y-6">
                    {/* Long Description */}
                    <div>
                      <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2.5">
                        Overview
                      </h4>
                      <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                        {selectedProject.longDescription}
                      </p>
                    </div>

                    {/* Architecture */}
                    <div>
                      <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2.5">
                        System Architecture & Workflow
                      </h4>
                      <p className="text-gray-400 text-xs md:text-sm leading-relaxed bg-white/5 border border-white/5 p-4 rounded-2xl font-light">
                        {selectedProject.architecture}
                      </p>
                    </div>

                    {/* Capabilities List */}
                    <div>
                      <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">
                        Key Capabilities & Deliverables
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {selectedProject.features.map((feat, index) => (
                          <div key={index} className="flex items-start gap-2.5">
                            <CheckCircle2 className="w-4.5 h-4.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                            <span className="text-xs md:text-sm text-gray-300 leading-snug">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Tech Stats, Links, Stack (5 Cols) */}
                  <div className="lg:col-span-5 space-y-6 lg:border-l lg:border-white/5 lg:pl-8">
                    {/* Links / Action CTA Buttons */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">
                        Links
                      </h4>
                      <div className="flex flex-col sm:flex-row gap-3">
                        {selectedProject.github && (
                          <a
                            href={selectedProject.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-medium text-sm transition-all"
                          >
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
                            <span>Repository</span>
                          </a>
                        )}
                        {selectedProject.live && (
                          <a
                            href={selectedProject.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-medium text-sm transition-all shadow-md shadow-blue-500/10"
                          >
                            <ExternalLink className="w-4 h-4" />
                            <span>Live Site</span>
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Specifications / Metrics Table */}
                    <div>
                      <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">
                        Performance & Tech Specs
                      </h4>
                      <div className="rounded-2xl border border-white/5 overflow-hidden text-xs bg-[#0b0f19]/45">
                        {selectedProject.metrics.map((metric, index) => (
                          <div
                            key={index}
                            className="flex justify-between items-center p-3 border-b border-white/5 last:border-0 hover:bg-white/2"
                          >
                            <span className="text-gray-400 font-light">{metric.label}</span>
                            <span className="text-white font-semibold">{metric.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Tech Stack List */}
                    <div>
                      <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">
                        Technologies Used
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.technologies.map((tech, index) => (
                          <span
                            key={index}
                            className="px-3 py-1.5 rounded-xl bg-[#0b0f19] border border-white/5 text-xs text-gray-300 font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
export default Projects;
