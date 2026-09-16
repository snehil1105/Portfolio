import React, { useState } from 'react';
import { Send } from 'lucide-react';

export function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !message) {
      alert("Please fill in both your email and message.");
      return;
    }

    const subject = `Portfolio Inquiry from ${name || 'Visitor'}`;
    const body = `${message}\n\n---\nSender Email: ${email}\nSender Name: ${name || 'Not provided'}`;
    
    const mailtoUrl = `mailto:snehilpy@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;

    // Reset Form
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        
        <div>
          <label htmlFor="contact-name" className="block text-[10px] font-mono uppercase text-amber-200 tracking-wider mb-2 font-bold">Name (Optional)</label>
          <input 
            id="contact-name"
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Name"
            className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-amber-200/60 transition-colors font-sans"
          />
        </div>

        <div>
          <label htmlFor="contact-email" className="block text-[10px] font-mono uppercase text-amber-200 tracking-wider mb-2 font-bold">Email (Required)</label>
          <input 
            id="contact-email"
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="your.email@example.com"
            className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-amber-200/60 transition-colors font-sans"
          />
        </div>

      </div>

      <div>
        <label htmlFor="contact-message" className="block text-[10px] font-mono uppercase text-amber-200 tracking-wider mb-2 font-bold">Message (Required)</label>
        <textarea 
          id="contact-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          rows={5}
          placeholder="Describe your inquiry..."
          className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-amber-200/60 transition-colors resize-none font-sans"
        />
      </div>

      <button 
        type="submit"
        className="w-full flex items-center justify-center gap-2 bg-white text-slate-900 hover:bg-amber-200 text-xs font-mono uppercase tracking-widest font-bold py-4 rounded-xl shadow-lg transition-all duration-200 active:scale-[0.98]"
      >
        <Send size={14} className="text-[#C23223]" />
        <span>Send Inquiry</span>
      </button>
    </form>
  );
}
export default ContactForm;
