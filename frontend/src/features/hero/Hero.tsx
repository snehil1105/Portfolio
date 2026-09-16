import { ArrowDown, Mail } from 'lucide-react';
import { QuoteRotator } from './QuoteRotator';

interface HeroProps {
  onNavigate?: (tab: string) => void;
}

export function Hero({ onNavigate }: HeroProps) {
  return (
    <section 
      id="hero" 
      className="w-full max-w-6xl mx-auto pt-2 pb-8 px-4 sm:px-6 relative text-white"
    >
      {/* Hero Card Container matching Dribbble Reference media_1789582802646.png */}
      <div className="relative rounded-[36px] overflow-hidden border border-white/15 bg-gradient-to-br from-[#1C0807] via-[#A8281C] to-[#E63B2E] p-6 sm:p-12 shadow-[0_30px_90px_rgba(230,59,46,0.35)]">
        
        {/* Background ambient lighting */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#E63B2E]/40 blur-3xl rounded-full pointer-events-none" />

        {/* Top Floating Badge */}
        <div className="relative z-10 flex items-center justify-between mb-8">
          <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.25em] text-amber-200/90 bg-black/40 backdrop-blur-md border border-white/15 px-4 py-1.5 rounded-full font-semibold">
            Snehil Tripathi // Web Developer
          </span>
        </div>

        {/* 2-Column Grid: Left Text/Headline & Right Crystal Clear Photo Card */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Big Headline & Intro */}
          <div className="lg:col-span-7 space-y-6">
            <h1 className="font-serif font-bold text-4xl sm:text-6xl lg:text-7xl tracking-tight leading-[1.05] text-white drop-shadow-md">
              Crafting Digital <br />
              <span className="italic font-light text-amber-200">Products.</span>
            </h1>

            <p className="text-slate-100 text-base sm:text-lg max-w-xl font-light leading-relaxed drop-shadow-sm">
              I create thoughtful designs and high-performance backend architectures focused on real user needs.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button 
                onClick={() => onNavigate?.('contact')}
                className="inline-flex items-center gap-2 bg-white text-slate-900 hover:bg-amber-100 text-xs font-mono font-bold uppercase tracking-widest px-6 py-3.5 rounded-full shadow-lg transition-all duration-200 active:scale-95 cursor-pointer"
              >
                <Mail size={14} className="text-[#C23223]" />
                <span>Contact Me</span>
              </button>

              <button 
                onClick={() => onNavigate?.('projects')}
                className="inline-flex items-center gap-2 bg-black/40 hover:bg-black/60 text-white border border-white/20 text-xs font-mono uppercase tracking-widest px-6 py-3.5 rounded-full backdrop-blur-md transition-all duration-200 cursor-pointer"
              >
                <span>Explore Projects</span>
                <ArrowDown size={14} />
              </button>
            </div>

            {/* Quote Rotator */}
            <div className="pt-4 border-t border-white/15 max-w-lg">
              <QuoteRotator />
            </div>
          </div>

          {/* Right Column: Prominent Portrait Photo Card (Crystal Clear Face Visibility) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm sm:max-w-md h-[380px] sm:h-[450px] rounded-3xl overflow-hidden border-2 border-white/20 shadow-2xl group bg-slate-900">
              <img 
                src="/snehil.jpg" 
                alt="Snehil Tripathi" 
                className="w-full h-full object-cover object-top filter contrast-105 brightness-100 group-hover:scale-105 transition-transform duration-500 ease-out"
              />
              
              {/* Subtle bottom gradient caption */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-6 text-center">
                <span className="font-serif font-bold text-lg text-white block">
                  Snehil Tripathi
                </span>
                <span className="text-[10px] font-mono text-amber-200 uppercase tracking-widest block font-semibold mt-0.5">
                  Full Stack &amp; Backend Engineer
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
export default Hero;
