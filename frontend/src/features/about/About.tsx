import { useState } from 'react';
import { Github, Linkedin } from 'lucide-react';
import { Threads } from './Threads';

export function About() {
  const [zoomStyle, setZoomStyle] = useState({
    transformOrigin: 'center',
    transform: 'scale(1)',
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: 'scale(1.4)',
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({
      transformOrigin: 'center',
      transform: 'scale(1)',
    });
  };

  return (
    <section id="about" className="w-full max-w-6xl mx-auto py-8 px-4 sm:px-6">
      {/* Crimson Red Gradient Card Container matching Hero design */}
      <div className="relative rounded-[36px] overflow-hidden border border-white/15 bg-gradient-to-br from-[#1C0807] via-[#A8281C] to-[#E63B2E] p-6 sm:p-12 shadow-[0_30px_90px_rgba(230,59,46,0.35)] text-white">
        
        {/* Background ambient lighting */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#E63B2E]/40 blur-3xl rounded-full pointer-events-none" />

        {/* Top Header Row */}
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/15 pb-6 mb-10">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-200 animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-amber-200 font-bold bg-black/40 border border-white/15 px-3.5 py-1 rounded-full">
              ABOUT ME
            </span>
          </div>
          <span className="text-xs font-mono text-amber-200/90">
            Snehil Tripathi // Web Developer
          </span>
        </div>

        {/* Large Statement Box */}
        <div className="relative z-10 overflow-hidden bg-black/30 border border-white/15 p-8 sm:p-12 rounded-[24px] shadow-lg mb-12 w-full flex items-center">
          <div className="absolute inset-0 pointer-events-none opacity-60">
            <Threads color={[1.0, 0.85, 0.4]} amplitude={0.65} distance={15} enableMouseInteraction={false} />
          </div>
          
          <h2 className="relative z-10 font-serif font-bold text-3xl sm:text-5xl lg:text-6xl leading-[1.1] tracking-tight text-white max-w-4xl drop-shadow">
            I build systems <br className="hidden sm:inline" />
            that do more than <span className="italic font-light text-amber-200">look good</span>.
          </h2>
        </div>

        {/* Biography & Technical Info Grid */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-10 sm:gap-14 items-start">
          
          {/* Left/Middle Column */}
          <div className="md:col-span-2 flex flex-col-reverse sm:flex-row gap-8 justify-between items-start w-full">
            
            <div className="space-y-6 flex-1 text-slate-100 leading-relaxed font-light text-sm sm:text-base">
              <div>
                <h3 className="font-serif text-3xl font-bold text-white mb-1">
                  Snehil Tripathi
                </h3>
                <p className="text-xs font-mono text-amber-200 uppercase tracking-widest mb-4 font-bold">
                  Web Developer
                </p>
                <p className="mb-4 text-slate-100">
                  I am a passionate web developer focused on building robust backends, clean API architectures, and modular client dashboards. I design applications with clean abstractions, strict database transaction safety, and high-performance interfaces.
                </p>
                <p className="text-slate-200 text-xs font-mono leading-relaxed bg-black/30 border border-white/10 p-4 rounded-xl">
                  My development philosophy centers on avoidant over-engineering: build database tables only when data is dynamic, write robust API integrations with caching to safeguard rate-limits, and prioritize atomic state updates to eliminate race conditions.
                </p>
              </div>

              {/* Email & Clickable Social Icons */}
              <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-white/15">
                <div>
                  <span className="block text-[9px] font-mono uppercase text-amber-200/90 tracking-wider">Email</span>
                  <a href="mailto:snehilpy@gmail.com" className="text-xs sm:text-sm font-mono text-white hover:text-amber-200 transition-colors font-medium">
                    snehilpy@gmail.com
                  </a>
                </div>
                
                <div className="flex items-center gap-3">
                  <span className="text-[9px] font-mono uppercase text-amber-200/90 tracking-wider">Profiles</span>
                  <a 
                    href="https://github.com/snehil1105" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="p-2.5 bg-black/40 hover:bg-black/70 border border-white/20 rounded-lg text-white hover:text-amber-200 transition-all duration-200"
                    aria-label="GitHub Profile"
                  >
                    <Github size={16} />
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/snehil-tripathi-38031131a/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="p-2.5 bg-black/40 hover:bg-black/70 border border-white/20 rounded-lg text-white hover:text-amber-200 transition-all duration-200"
                    aria-label="LinkedIn Profile"
                  >
                    <Linkedin size={16} />
                  </a>
                </div>
              </div>
            </div>

            {/* Profile Photo */}
            <div 
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="w-40 h-40 sm:w-48 sm:h-48 rounded-2xl border-2 border-white/30 overflow-hidden shadow-2xl flex-shrink-0 self-center sm:self-start bg-slate-900 cursor-zoom-in relative transition-all duration-300"
            >
              <img 
                src="/snehil.jpg" 
                alt="Snehil Tripathi" 
                className="w-full h-full object-cover transition-transform duration-200 ease-out"
                style={zoomStyle}
              />
            </div>
            
          </div>

          {/* Right Column: Technical Info */}
          <div className="border-t md:border-t-0 md:border-l border-white/15 pt-8 md:pt-0 md:pl-8 space-y-6">
            <div>
              <span className="block text-[10px] font-mono uppercase text-amber-200 tracking-widest mb-1.5 font-bold">
                Current Activity
              </span>
              <p className="text-sm font-semibold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Active Engineering
              </p>
            </div>

            <div>
              <span className="block text-[10px] font-mono uppercase text-amber-200 tracking-widest mb-1.5 font-bold">
                Core Competencies
              </span>
              <p className="text-sm font-light text-slate-100 leading-relaxed">
                REST API Design, Database Transactions, Asynchronous Delivery, Verification
              </p>
            </div>

            <div>
              <span className="block text-[10px] font-mono uppercase text-amber-200 tracking-widest mb-1.5 font-bold">
                Location
              </span>
              <p className="text-sm font-light text-slate-100">
                India (GMT +5:30)
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
export default About;
