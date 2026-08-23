import { ArrowDown } from 'lucide-react';
import { QuoteRotator } from './QuoteRotator';

export function Hero() {
  return (
    <section 
      id="hero" 
      className="dark-section min-h-screen bg-bgDark flex flex-col justify-between pt-32 pb-16 px-6 text-slate-100 relative overflow-hidden"
    >
      {/* Background visual texture */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(194,65,12,0.07),rgba(255,255,255,0))]" />

      <div className="max-w-5xl mx-auto w-full flex-1 flex flex-col justify-center items-center text-center relative z-10 my-auto">
        {/* Monospace header label */}
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent mb-6 block">
          Portfolio &amp; Selected Works
        </span>

        {/* Big Editorial Title */}
        <h1 className="font-serif font-normal text-5xl sm:text-7xl lg:text-8xl tracking-tight leading-[1.05] text-slate-100 mb-8 max-w-4xl">
          Engineering systems <br className="hidden sm:inline" />
          with <span className="italic font-light text-accent">intentional</span> design.
        </h1>

        {/* Minimal Description */}
        <p className="text-slate-400 text-base sm:text-lg max-w-xl mb-12 font-light leading-relaxed">
          I'm Snehil, a software engineer designing high-performance backends and clean user interfaces. I build systems where maintainability matches aesthetics.
        </p>

        {/* Central Quote */}
        <QuoteRotator />
      </div>

      {/* Footer link anchor for journey */}
      <div className="flex flex-col items-center justify-center gap-2 text-slate-500 hover:text-slate-300 transition-colors duration-200 mt-auto relative z-10">
        <a href="#about" aria-label="Scroll down to About section" className="flex flex-col items-center gap-1.5 group">
          <span className="text-[10px] font-mono uppercase tracking-[0.2em]">Explore Journey</span>
          <ArrowDown size={14} className="animate-bounce text-accent group-hover:translate-y-0.5 transition-transform" />
        </a>
      </div>
    </section>
  );
}
