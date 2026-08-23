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
          <label htmlFor="contact-name" className="block text-[10px] font-mono uppercase text-slate-500 tracking-wider mb-2">Name (Optional)</label>
          <input 
            id="contact-name"
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Name"
            className="w-full bg-[#F5F2EB] border border-slate-300 rounded-lg px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-accent/40 transition-colors"
          />
        </div>

        <div>
          <label htmlFor="contact-email" className="block text-[10px] font-mono uppercase text-slate-500 tracking-wider mb-2">Email (Required)</label>
          <input 
            id="contact-email"
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="your.email@example.com"
            className="w-full bg-[#F5F2EB] border border-slate-300 rounded-lg px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-accent/40 transition-colors"
          />
        </div>

      </div>

      <div>
        <label htmlFor="contact-message" className="block text-[10px] font-mono uppercase text-slate-500 tracking-wider mb-2">Message (Required)</label>
        <textarea 
          id="contact-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          rows={5}
          placeholder="Describe your inquiry..."
          className="w-full bg-[#F5F2EB] border border-slate-300 rounded-lg px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-accent/40 transition-colors resize-none"
        />
      </div>

      <button 
        type="submit"
        className="w-full flex items-center justify-center gap-2 bg-accent hover:bg-accent-dark text-white text-xs font-mono uppercase tracking-widest py-4 rounded-lg transition-all duration-200 active:scale-[0.98]"
      >
        <Send size={12} />
        <span>Send Inquiry</span>
      </button>
    </form>
  );
}
export default ContactForm;
