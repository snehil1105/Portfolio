import { useState, useEffect } from 'react';
import { useLikeCounter } from './useLikeCounter';
import { Heart, ArrowRight } from 'lucide-react';

interface LikeButtonProps {
  showPrompt?: boolean; // Prop to specify if the support prompt popup loop should run
}

export function LikeButton({ showPrompt = false }: LikeButtonProps) {
  const { likes, liked, like } = useLikeCounter();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (!showPrompt) {
      setShowPopup(false);
      return;
    }

    // Show immediately on mount
    setShowPopup(true);

    // Initial hide timer (hides the initial popup after 10 seconds)
    const initialHide = setTimeout(() => {
      setShowPopup(false);
    }, 10000);

    // Recurring loop: 20s total cycle (10s visible, 10s hidden)
    const interval = setInterval(() => {
      setShowPopup(true);
      
      const hideTimer = setTimeout(() => {
        setShowPopup(false);
      }, 10000); // Hide after 10 seconds

      return () => clearTimeout(hideTimer);
    }, 20000); // Trigger every 20 seconds

    return () => {
      clearTimeout(initialHide);
      clearInterval(interval);
    };
  }, [showPrompt]);

  return (
    <div className="relative flex flex-col items-center">
      
      {/* Counter Button Row */}
      <div className="flex items-center gap-3 bg-[#16181D] border border-white/5 px-4 py-2 rounded-2xl shadow-xl relative z-10">
        
        {/* Heart Click Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            like();
          }}
          className={`p-2 rounded-full transition-all duration-300 focus:outline-none cursor-pointer ${
            liked 
              ? 'bg-rose-500/20 text-rose-500 ring-2 ring-rose-500/40 scale-105' 
              : 'bg-white/10 hover:bg-rose-500/20 text-slate-300 hover:text-rose-400 active:scale-90 border border-white/10'
          }`}
          aria-label="Like this profile"
        >
          <Heart 
            size={20} 
            className={`transition-all duration-300 ${
              liked 
                ? 'fill-rose-500 text-rose-500 scale-110' 
                : 'hover:scale-110 text-slate-300 group-hover:text-rose-400'
            }`} 
          />
        </button>

        {/* Direction Arrow */}
        <ArrowRight size={14} className="text-slate-600" />

        {/* Counter Number Box */}
        <div 
          className="bg-slate-950 border border-white/10 px-3.5 py-1.5 rounded-xl min-w-[55px] text-center font-mono text-xs font-semibold text-slate-200 shadow-inner"
        >
          {likes}
        </div>

      </div>

      {/* Small support prompt popup below the button (rendered only for main header button) */}
      {showPrompt && showPopup && (
        <div className="absolute top-full mt-4.5 z-50 bg-[#16181D] border border-accent/35 px-5 py-2.5 rounded-2xl shadow-2xl text-xs sm:text-sm font-sans text-slate-200 font-normal tracking-wide whitespace-normal sm:whitespace-nowrap max-w-[280px] sm:max-w-none text-center transition-all duration-300 ease-in-out">
          
          {/* Top pointer arrow */}
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 w-2.5 h-2.5 rotate-45 bg-[#16181D] border-l border-t border-accent/35" />
          
          If you like my portfolio, please like it!
        </div>
      )}

    </div>
  );
}
export default LikeButton;
