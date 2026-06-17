import React, { useState } from 'react';
import { motion } from 'framer-motion';
import GlowingCard from './UI/GlowingCard';
import { Mail, Phone, MapPin, Send, Copy, Check } from 'lucide-react';

export const Contact: React.FC = () => {
  const [copiedType, setCopiedType] = useState<'email' | 'phone' | null>(null);
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const copyToClipboard = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) {
      alert('Please fill in all required fields.');
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "";

    // If key is not configured, fall back to simulation mode with a warning
    if (!accessKey || accessKey === "YOUR_ACCESS_KEY_HERE") {
      console.warn("Web3Forms Access Key is not configured in .env. Falling back to simulation mode.");
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitStatus('success');
        setFormState({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setSubmitStatus(null), 5000);
      }, 1500);
      return;
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: formState.name,
          email: formState.email,
          subject: formState.subject || "New Message from Portfolio Website",
          message: formState.message,
          from_name: "Aman's Portfolio"
        })
      });

      const data = await response.json();
      if (data.success) {
        setSubmitStatus('success');
        setFormState({ name: '', email: '', subject: '', message: '' });
      } else {
        console.error("Web3Forms submission failed:", data);
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error("Contact form network error:", error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  const socialLinks = [
    { 
      name: 'LinkedIn', 
      icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>, 
      url: 'https://www.linkedin.com/in/aman-daftarband', 
      color: 'hover:text-blue-500 hover:border-blue-500/30' 
    },
    { 
      name: 'GitHub', 
      icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>, 
      url: 'https://github.com/amanshaikh405', 
      color: 'hover:text-white hover:border-white/20' 
    },
    { 
      name: 'Twitter (X)', 
      icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></svg>, 
      url: 'https://x.com/aman_Shaikh_405', 
      color: 'hover:text-cyan-400 hover:border-cyan-400/30' 
    },
    { 
      name: 'Instagram', 
      icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>, 
      url: 'https://www.instagram.com/aman_shaikh_405', 
      color: 'hover:text-pink-500 hover:border-pink-500/30' 
    },
  ];

  return (
    <section id="contact" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-extrabold text-white"
          >
            Get In <span className="gradient-text-blue-purple-cyan">Touch</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-gray-400 text-sm md:text-base mt-3 max-w-xl mx-auto font-light"
          >
            Let's build something amazing together! Drop me a message below or contact me directly through email or social media.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: '80px' }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto mt-4 rounded-full"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
          
          {/* Info Details & Socials (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Title / CTA Banner */}
            <GlowingCard className="p-8" glowColor="rgba(59, 130, 246, 0.15)">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight mb-4">
                Let's Build Something <span className="gradient-text-blue-purple-cyan">Amazing</span> Together
              </h3>
              <p className="text-sm text-gray-450 leading-relaxed">
                Whether you have a specific AI integration project, a full-stack dashboard requirement, or simply want to chat about prompt engineering and LLMs, my inbox is open!
              </p>
            </GlowingCard>

            {/* Direct Contact Cards */}
            <div className="space-y-4">
              
              {/* Email Card */}
              <div className="flex items-center justify-between p-4 rounded-2xl border border-white/5 bg-[#0e1322]/40 backdrop-blur-xl hover:border-white/10 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block">Email</span>
                    <a href="mailto:amandaftarband@gmail.com" className="text-sm md:text-base font-bold text-white hover:text-blue-400 transition-colors">
                      amandaftarband@gmail.com
                    </a>
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard('amandaftarband@gmail.com', 'email')}
                  className="p-2.5 rounded-lg bg-white/5 border border-white/5 text-gray-400 hover:text-white hover:bg-white/10 hover:scale-105 transition-all"
                  title="Copy Email"
                >
                  {copiedType === 'email' ? <Check className="w-4.5 h-4.5 text-emerald-400" /> : <Copy className="w-4.5 h-4.5" />}
                </button>
              </div>

              {/* Phone Card */}
              <div className="flex items-center justify-between p-4 rounded-2xl border border-white/5 bg-[#0e1322]/40 backdrop-blur-xl hover:border-white/10 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block">Phone</span>
                    <a href="tel:+918788177013" className="text-sm md:text-base font-bold text-white hover:text-purple-400 transition-colors">
                      +91 8788177013
                    </a>
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard('+918788177013', 'phone')}
                  className="p-2.5 rounded-lg bg-white/5 border border-white/5 text-gray-400 hover:text-white hover:bg-white/10 hover:scale-105 transition-all"
                  title="Copy Phone"
                >
                  {copiedType === 'phone' ? <Check className="w-4.5 h-4.5 text-emerald-400" /> : <Copy className="w-4.5 h-4.5" />}
                </button>
              </div>

              {/* Location Card */}
              <div className="flex items-center gap-3 p-4 rounded-2xl border border-white/5 bg-[#0e1322]/40 backdrop-blur-xl">
                <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block">Location</span>
                  <span className="text-sm md:text-base font-bold text-white">
                    Akluj, Maharashtra, India
                  </span>
                </div>
              </div>

            </div>

            {/* Social Grid */}
            <div className="grid grid-cols-2 gap-3">
              {socialLinks.map((social, idx) => (
                <a
                  key={idx}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2.5 p-3.5 rounded-xl border border-white/5 bg-[#0e1322]/30 backdrop-blur-md text-gray-400 transition-all duration-300 ${social.color}`}
                >
                  {social.icon}
                  <span className="text-xs font-semibold uppercase tracking-wider">{social.name}</span>
                </a>
              ))}
            </div>

          </div>

          {/* Contact Form (7 Cols) */}
          <div className="lg:col-span-7">
            <GlowingCard className="p-8" glowColor="rgba(6, 182, 212, 0.12)">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Send className="w-5 h-5 text-cyan-400" />
                <span>Send a Message</span>
              </h3>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Name Input */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest" htmlFor="name">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formState.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl bg-[#0B0F19]/60 border border-white/5 focus:border-cyan-500/50 focus:bg-[#0B0F19]/90 focus:outline-none text-white text-sm transition-all"
                      placeholder="John Doe"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest" htmlFor="email">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formState.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl bg-[#0B0F19]/60 border border-white/5 focus:border-cyan-500/50 focus:bg-[#0B0F19]/90 focus:outline-none text-white text-sm transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                {/* Subject Input */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest" htmlFor="subject">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formState.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl bg-[#0B0F19]/60 border border-white/5 focus:border-cyan-500/50 focus:bg-[#0B0F19]/90 focus:outline-none text-white text-sm transition-all"
                    placeholder="Project Collaboration"
                  />
                </div>

                {/* Message Input */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest" htmlFor="message">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formState.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl bg-[#0B0F19]/60 border border-white/5 focus:border-cyan-500/50 focus:bg-[#0B0F19]/90 focus:outline-none text-white text-sm transition-all resize-none"
                    placeholder="Hi Aman, I'd like to talk to you about..."
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/25 disabled:opacity-50 transition-all duration-300 border border-cyan-400/20"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>

                {/* Form feedback status */}
                {submitStatus === 'success' && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm font-bold text-emerald-400 text-center"
                  >
                    Thank you! Your message has been sent successfully.
                  </motion.p>
                )}
                {submitStatus === 'error' && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm font-bold text-rose-400 text-center"
                  >
                    Oops! Something went wrong. Please try again or contact me directly.
                  </motion.p>
                )}
              </form>
            </GlowingCard>
          </div>

        </div>
      </div>
    </section>
  );
};
export default Contact;
