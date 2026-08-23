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
    <section id="contact" className="pt-16 pb-24 px-6 relative text-slate-800 bg-bgLightDark">
      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Consistent Bold Section Title */}
        <h2 className="font-serif font-bold text-3xl sm:text-4xl text-accent mb-12">
          Contact
        </h2>

        {/* Core Layout - Borderless Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Info, Clipboard Copy, Social links, Likes */}
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-4">
              <h3 className="font-serif text-2xl font-normal text-slate-800">
                Snehil Tripathi
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed font-light">
                Always open to freelance engagements, architectural consultations, or discussing backend engineering roles.
              </p>
            </div>

            {/* Direct Email Clipboard Clicker */}
            <div className="border-t border-slate-300 pt-6">
              <span className="block text-[10px] font-mono uppercase text-slate-500 tracking-widest mb-3">
                Direct Contact
              </span>
              <button 
                onClick={handleCopy}
                className="w-full flex items-center justify-between gap-3 px-4 py-3 text-xs font-mono text-slate-700 hover:text-accent bg-[#F5F2EB] border border-slate-300 rounded-lg transition-colors group"
                aria-label="Copy email to clipboard"
              >
                <div className="flex items-center gap-2.5">
                  <Mail size={14} className="text-slate-500 group-hover:text-accent/80" />
                  <span>{emailAddress}</span>
                </div>
                {copied ? (
                  <Check size={14} className="text-emerald-600" />
                ) : (
                  <Copy size={14} className="text-slate-500 group-hover:text-accent" />
                )}
              </button>
            </div>

            {/* Social Handles */}
            <div className="space-y-3">
              <span className="block text-[10px] font-mono uppercase text-slate-500 tracking-widest">
                Network Channels
              </span>
              <SocialLinks />
            </div>

            {/* support likes centered at the bottom of the column */}
            <div className="space-y-3 border-t border-slate-300 pt-6">
              <span className="block text-[10px] font-mono uppercase text-slate-500 tracking-widest">
                Community Feedback
              </span>
              <LikeButton />
            </div>
          </div>

          {/* Right Column: Message form */}
          <div className="lg:col-span-3">
            <ContactForm />
          </div>

        </div>
      </div>
    </section>
  );
}
export default ContactSection;
