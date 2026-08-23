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
      transform: 'scale(1.5)', // Gentle inner magnifier zoom
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({
      transformOrigin: 'center',
      transform: 'scale(1)',
    });
  };

  return (
    <section id="about" className="bg-bgLight text-charcoal pt-16 pb-24 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Consistent Bold Section Title */}
        <h2 className="font-serif font-bold text-3xl sm:text-4xl text-accent mb-8">
          About
        </h2>

        {/* Large Statement Information Box with Threads Background */}
        <div className="relative overflow-hidden bg-bgLightMed border border-slate-300/40 p-8 sm:p-12 rounded-[30px] shadow-sm mb-16 w-full min-h-[180px] flex items-center">
          {/* Threads Canvas Background Layer - soft, visible light orange background */}
          <div className="absolute inset-0 pointer-events-none opacity-90">
            <Threads color={[0.92, 0.52, 0.2]} amplitude={0.65} distance={15} enableMouseInteraction={false} />
          </div>
          
          {/* Headline Heading (Z-index 10 floats above the canvas threads) */}
          <h2 className="relative z-10 font-serif font-normal text-4xl sm:text-6xl lg:text-7xl leading-[1.1] tracking-tight text-slate-900 max-w-4xl">
            I build systems <br className="hidden sm:inline" />
            that do more than <span className="italic font-light text-accent">look good</span>.
          </h2>
        </div>

        {/* Biography & Metadata Grid (Cardless, Spacious) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 sm:gap-16 items-start">
          
          {/* Left/Middle Column: Biography details */}
          <div className="md:col-span-2 flex flex-col-reverse sm:flex-row gap-8 justify-between items-start w-full">
            
            {/* Bio text & links */}
            <div className="space-y-6 flex-1 text-slate-700 leading-relaxed font-light text-sm sm:text-base">
              <div>
                <h3 className="font-serif text-2xl font-normal text-slate-900 mb-1">
                  Snehil Tripathi
                </h3>
                <p className="text-xs font-mono text-accent uppercase tracking-widest mb-4 font-semibold">
                  Web Developer
                </p>
                <p className="mb-4">
                  I am a passionate web developer focused on building robust backends, clean API architectures, and modular client dashboards. I design applications with clean abstractions, strict database transaction safety, and high-performance interfaces.
                </p>
                <p className="text-slate-500 text-xs">
                  My development philosophy centers on avoidant over-engineering: build database tables only when data is dynamic, write robust API integrations with caching to safeguard rate-limits, and prioritize atomic state updates to eliminate race conditions.
                </p>
              </div>

              {/* Email & Clickable Social Icons */}
              <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-slate-300/40">
                <div>
                  <span className="block text-[9px] font-mono uppercase text-slate-400 tracking-wider">Email</span>
                  <a href="mailto:snehilpy@gmail.com" className="text-xs sm:text-sm font-mono text-slate-800 hover:text-accent transition-colors font-medium">
                    snehilpy@gmail.com
                  </a>
                </div>
                
                <div className="flex items-center gap-3">
                  <span className="text-[9px] font-mono uppercase text-slate-400 tracking-wider">Profiles</span>
                  <a 
                    href="https://github.com/snehil1105" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="p-2 bg-slate-200/50 hover:bg-accent/15 border border-slate-300/60 rounded-lg text-slate-600 hover:text-accent transition-all duration-200"
                    aria-label="GitHub Profile"
                  >
                    <Github size={16} />
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/snehil-tripathi-38031131a/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="p-2 bg-slate-200/50 hover:bg-accent/15 border border-slate-300/60 rounded-lg text-slate-600 hover:text-accent transition-all duration-200"
                    aria-label="LinkedIn Profile"
                  >
                    <Linkedin size={16} />
                  </a>
                </div>
              </div>
            </div>

            {/* Profile Photo - round with dynamic cursor zoom */}
            <div 
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="w-40 h-40 sm:w-48 sm:h-48 rounded-full border-2 border-accent/20 overflow-hidden shadow-md flex-shrink-0 self-center sm:self-start bg-slate-200 cursor-zoom-in relative transition-all duration-500 ease-out hover:scale-135 hover:z-30 hover:shadow-2xl"
            >
              <img 
                src="/snehil.jpg" 
                alt="Snehil Tripathi" 
                className="w-full h-full object-cover transition-transform duration-200 ease-out"
                style={zoomStyle}
              />
            </div>
            
          </div>

          {/* Right Column: Secondary Subtle Technical Info */}
          <div className="border-t md:border-t-0 md:border-l border-slate-300/60 pt-8 md:pt-0 md:pl-8 space-y-6">
            <div>
              <span className="block text-[10px] font-mono uppercase text-slate-500 tracking-widest mb-1.5">
                Current Activity
              </span>
              <p className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                Active Engineering
              </p>
            </div>

            <div>
              <span className="block text-[10px] font-mono uppercase text-slate-500 tracking-widest mb-1.5">
                Core Competencies
              </span>
              <p className="text-sm font-light text-slate-700 leading-relaxed">
                REST API Design, Database Transactions, Asynchronous Delivery, Verification
              </p>
            </div>

            <div>
              <span className="block text-[10px] font-mono uppercase text-slate-500 tracking-widest mb-1.5">
                Location
              </span>
              <p className="text-sm font-light text-slate-700">
                India (GMT +5:30)
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
