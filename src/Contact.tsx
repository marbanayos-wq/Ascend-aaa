import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Phone, Mail, Instagram, Facebook, Send, CheckCircle2 } from 'lucide-react';
import { CONTACT_PHONE } from './constants';

export const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="bg-soft-white min-h-screen">
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h1 className="text-6xl font-black italic tracking-tighter uppercase mb-4">Get in Touch</h1>
          <p className="text-primary/60 uppercase tracking-widest text-xs">We're here to help you rise above</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          {/* Contact Info */}
          <div className="space-y-12">
            <div>
              <h2 className="text-3xl font-black italic tracking-tighter uppercase mb-8">Contact Information</h2>
              <div className="space-y-8">
                <div className="flex items-center gap-6 group">
                  <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:bg-accent group-hover:text-primary transition-all">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-primary/40">Phone</p>
                    <p className="text-lg font-bold">{CONTACT_PHONE}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 group">
                  <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:bg-accent group-hover:text-primary transition-all">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-primary/40">Email</p>
                    <p className="text-lg font-bold">info@ascendsportswear.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-black italic tracking-tighter uppercase mb-8">Follow Our Journey</h2>
              <div className="flex gap-4">
                {[
                  { icon: <Instagram size={24} />, label: 'Instagram' },
                  { icon: <Facebook size={24} />, label: 'Facebook' },
                  { icon: <span className="font-bold text-xs">TikTok</span>, label: 'TikTok' }
                ].map((social, i) => (
                  <a
                    key={i}
                    href="#"
                    className="flex-1 bg-white p-6 rounded-2xl flex flex-col items-center gap-4 shadow-sm hover:bg-accent hover:text-primary transition-all group"
                  >
                    <div className="text-primary group-hover:text-primary transition-colors">
                      {social.icon}
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest">{social.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-12 rounded-3xl shadow-2xl border border-gray-100 relative overflow-hidden">
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="inline-flex p-6 bg-green-50 text-green-500 rounded-full mb-8">
                  <CheckCircle2 size={64} />
                </div>
                <h3 className="text-3xl font-black italic tracking-tighter uppercase mb-4">Message Sent!</h3>
                <p className="text-primary/60 mb-10 text-lg leading-relaxed">
                  Thank you for reaching out. Our team will get back to you within 24-48 hours.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-10 py-5 bg-primary text-white font-bold uppercase tracking-widest hover:bg-accent hover:text-primary transition-all shadow-xl"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-primary/40">Full Name</label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-6 py-4 bg-soft-white border-none focus:ring-2 focus:ring-accent outline-none font-medium"
                    placeholder="Marius Polo Banayos"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-primary/40">Email Address</label>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-6 py-4 bg-soft-white border-none focus:ring-2 focus:ring-accent outline-none font-medium"
                    placeholder="marius@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-primary/40">Your Message</label>
                  <textarea
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-6 py-4 bg-soft-white border-none focus:ring-2 focus:ring-accent outline-none font-medium h-48 resize-none"
                    placeholder="How can we help you rise above?"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-5 bg-primary text-white font-bold uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-accent hover:text-primary transition-all shadow-xl transform hover:-translate-y-1"
                >
                  Send Message
                  <Send size={20} />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
