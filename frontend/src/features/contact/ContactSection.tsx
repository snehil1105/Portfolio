import { useState } from 'react';
import { ContactForm } from './ContactForm';
import { SocialLinks } from './SocialLinks';
import { LikeButton } from '../like-button/LikeButton';
import { Copy, Check, Mail } from 'lucide-react';

export function ContactSection() {
  const [copied, setCopied] = useState(false);
  const emailAddress = "snehilpy@gmail.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="w-full max-w-6xl mx-auto py-8 px-4 sm:px-6 mb-16">
      {/* Crimson Red Gradient Card Container matching Hero design */}
      <div className="relative rounded-[36px] overflow-hidden border border-white/15 bg-gradient-to-br from-[#1C0807] via-[#A8281C] to-[#E63B2E] p-6 sm:p-12 shadow-[0_30px_90px_rgba(230,59,46,0.35)] text-white">
        
        {/* Background ambient lighting */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#E63B2E]/40 blur-3xl rounded-full pointer-events-none" />

        {/* Category Tag Row */}
        <div className="relative z-10 flex items-center justify-between border-b border-white/15 pb-6 mb-10">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-200 animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-amber-200 font-bold bg-black/40 border border-white/15 px-3.5 py-1 rounded-full">
              CLIENTS &amp; CONTACT
            </span>
          </div>
        </div>

        {/* Layout Grid */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-start">
          
          {/* Left Column: Snehil Photo & Heading */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center gap-4">
              <img 
                src="/snehil.jpg" 
                alt="Snehil Tripathi" 
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-white/30 shadow-xl"
              />
              <div>
                <h4 className="font-serif text-xl font-bold text-white">
                  Snehil Tripathi
                </h4>
                <p className="text-xs font-mono text-amber-200 uppercase font-bold">
                  Web Developer
                </p>
              </div>
            </div>

            <h2 className="font-serif font-bold text-3xl sm:text-5xl text-white leading-tight drop-shadow">
              Let's Create <br />
              Together.
            </h2>

            <p className="text-slate-100 text-sm leading-relaxed font-light">
              Always open to freelance engagements, architectural consultations, or discussing backend engineering roles.
            </p>

            {/* Direct Email Clipboard Clicker */}
            <div className="border-t border-white/15 pt-6">
              <span className="block text-[10px] font-mono uppercase text-amber-200 tracking-widest mb-3 font-bold">
                Direct Contact
              </span>
              <button 
                onClick={handleCopy}
                className="w-full flex items-center justify-between gap-3 px-4 py-3 text-xs font-mono text-white hover:text-amber-200 bg-black/40 hover:bg-black/70 border border-white/20 rounded-xl transition-all group font-medium"
                aria-label="Copy email to clipboard"
              >
                <div className="flex items-center gap-2.5">
                  <Mail size={14} className="text-amber-200 group-hover:text-white" />
                  <span>{emailAddress}</span>
                </div>
                {copied ? (
                  <Check size={14} className="text-emerald-400" />
                ) : (
                  <Copy size={14} className="text-slate-300 group-hover:text-amber-200" />
                )}
              </button>
            </div>

            {/* Social Handles */}
            <div className="space-y-3">
              <span className="block text-[10px] font-mono uppercase text-amber-200 tracking-widest font-bold">
                Network Channels
              </span>
              <SocialLinks />
            </div>

            {/* Support Likes */}
            <div className="space-y-3 border-t border-white/15 pt-6">
              <span className="block text-[10px] font-mono uppercase text-amber-200 tracking-widest font-bold">
                Community Feedback
              </span>
              <LikeButton />
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-3 bg-black/30 border border-white/15 p-6 sm:p-10 rounded-[24px] shadow-lg">
            <h3 className="font-serif font-bold text-2xl text-white mb-6">
              Send a Direct Inquiry
            </h3>
            <ContactForm />
          </div>

        </div>

      </div>
    </section>
  );
}
export default ContactSection;
