import { useState } from 'react';
import { StreakSection } from './StreakSection';
import { ChevronDown, ChevronUp, Flame, X } from 'lucide-react';

export function StreakCurtain() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      {/* Top Hanging Curtain Handle / Pull Tab (Centered at top) */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 z-[100] flex flex-col items-center pointer-events-none">
        
        {/* Hanger Button / Pull Tab */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`pointer-events-auto group flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-b-2xl shadow-2xl transition-all duration-300 border-x border-b ${
            isOpen
              ? 'bg-[#16181D] text-[#E63B2E] border-[#E63B2E]/50 shadow-[#E63B2E]/20 translate-y-0'
              : 'bg-[#16181D] hover:bg-[#1C1F26] text-slate-100 border-[#E63B2E]/40 hover:border-[#E63B2E] animate-pulse hover:animate-none'
          }`}
          aria-label="Toggle Coding Activity Curtain"
        >
          {/* Flame Icon */}
          <Flame size={16} className={`transition-colors ${isOpen ? 'fill-[#E63B2E] text-[#E63B2E]' : 'text-[#E63B2E] group-hover:scale-110'}`} />
          
          {/* Label */}
          <span className="font-mono text-xs uppercase tracking-widest font-bold text-slate-100 group-hover:text-[#E63B2E] transition-colors">
            Coding Activity
          </span>

          <span className="text-[10px] font-mono text-[#E63B2E] bg-[#E63B2E]/10 border border-[#E63B2E]/30 px-2 py-0.5 rounded-full font-bold">
            Live
          </span>

          {/* Chevron */}
          {isOpen ? (
            <ChevronUp size={16} className="text-[#E63B2E] ml-1" />
          ) : (
            <ChevronDown size={16} className="text-slate-400 group-hover:text-[#E63B2E] transition-transform group-hover:translate-y-0.5 ml-1" />
          )}
        </button>

        {/* Tiny pull hint text floating underneath tab when closed */}
        {!isOpen && (
          <span className="pointer-events-auto text-[9px] font-mono text-amber-200 uppercase tracking-widest mt-1 bg-[#16181D] px-3 py-1 rounded-full border border-[#E63B2E]/40 shadow-lg animate-bounce">
            ↓ Pull down for live stats
          </span>
        )}
      </div>

      {/* Backdrop overlay when open */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-[80] transition-opacity duration-300"
        />
      )}

      {/* Sliding Down Curtain Drawer Panel (High Z-Index above all page content) */}
      <div 
        className={`fixed top-0 inset-x-0 z-[90] bg-[#111318] border-b border-[#E63B2E]/40 shadow-[0_25px_60px_rgba(0,0,0,0.95)] transition-all duration-500 ease-in-out max-h-[90vh] overflow-y-auto no-scrollbar ${
          isOpen ? 'translate-y-0 opacity-100 pointer-events-auto' : '-translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <div className="max-w-6xl mx-auto pt-16 pb-12 px-6 relative">
          
          {/* Top Panel Bar */}
          <div className="flex items-center justify-between border-b border-white/15 pb-4 mb-8">
            <div>
              <h3 className="font-serif text-2xl sm:text-3xl text-slate-100 font-bold flex items-center gap-3">
                <span>Competitive Coding Activity</span>
                <span className="text-xs font-mono text-[#E63B2E] uppercase tracking-widest bg-[#E63B2E]/10 border border-[#E63B2E]/30 px-3 py-1 rounded-full font-bold">
                  Real-Time Sync
                </span>
              </h3>
              <p className="text-xs font-mono text-slate-400 mt-1">
                Live statistics &amp; streak heatmaps powered by Redis &amp; SSE
              </p>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors border border-white/15"
              aria-label="Close curtain"
            >
              <X size={18} />
            </button>
          </div>

          {/* Render Streak Cards Grid */}
          <div className="w-full">
            <StreakSection isSidebarHovered={isHovered || isOpen} />
          </div>

          {/* Bottom Push Up Button */}
          <div className="mt-8 pt-4 border-t border-white/15 flex justify-center">
            <button
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 text-xs font-mono text-slate-300 hover:text-[#E63B2E] transition-colors py-1.5 px-5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 font-bold"
            >
              <ChevronUp size={14} />
              <span>Push Curtain Up</span>
            </button>
          </div>

        </div>
      </div>
    </>
  );
}
export default StreakCurtain;
