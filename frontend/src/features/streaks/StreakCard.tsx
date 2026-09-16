import { Streak } from './useStreaks';
import { StreakChart } from './StreakChart';
import { Flame } from 'lucide-react';

interface StreakCardProps {
  streak: Streak;
  isSidebarHovered?: boolean;
}

export function StreakCard({ streak }: StreakCardProps) {
  const isLeetcode = streak.platform === 'LEETCODE';
  const hasStreak = streak.currentStreak > 0;
  const [showTooltip, setShowTooltip] = useState(false);

  // Parse today's solved questions: "Title||Url;;Title2||Url2"
  const questions = streak.solvedToday
    ? streak.solvedToday.split(';;').filter(Boolean).map((item) => {
        const parts = item.split('||');
        return {
          name: parts[0] || 'Unknown Problem',
          url: parts[1] || '#',
        };
      })
    : [];

  return (
    <div 
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      className="relative rounded-2xl border bg-[#16181D] p-5 shadow-xl flex flex-col justify-between h-[210px] w-full border-white/10 group cursor-pointer"
    >
      
      {/* Popout Overlay for Today's Solved Questions (Overlays cleanly inside card bounds) */}
      <div 
        className={`absolute inset-0 bg-[#F5F2EB] text-slate-900 border border-slate-300 p-5 rounded-2xl shadow-2xl z-20 flex flex-col justify-between transition-all duration-300 ease-out origin-center ${
          showTooltip
            ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
            : 'opacity-0 translate-y-2 scale-95 pointer-events-none'
        }`}
      >
        {/* Tooltip Header */}
        <div className="border-b border-slate-300/60 pb-2 mb-2 flex justify-between items-center">
          <h4 className="text-[11px] font-mono uppercase tracking-widest text-[#E63B2E] font-bold">
            {isLeetcode ? 'LeetCode' : 'Codeforces'} Solved Today
          </h4>
          <span className="text-[9px] font-mono text-slate-500 uppercase">Hover Details</span>
        </div>

        {/* Scrollable Questions List */}
        <div className="flex-1 overflow-y-auto no-scrollbar space-y-2 max-h-[110px]">
          {questions.length > 0 ? (
            questions.map((q, idx) => (
              <a 
                key={idx}
                href={q.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group/item flex gap-2 items-start text-xs text-slate-900 hover:text-[#E63B2E] font-medium leading-snug transition-colors"
              >
                <span className="text-[10px] font-mono text-[#E63B2E] font-bold mt-0.5">{idx + 1}.</span>
                <span className="underline decoration-slate-400 group-hover/item:decoration-[#E63B2E] underline-offset-4">{q.name}</span>
              </a>
            ))
          ) : (
            <div className="h-full flex flex-col items-center justify-center py-4">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider text-center block font-medium">
                No questions solved today
              </span>
              <span className="text-[9px] font-mono text-[#E63B2E] uppercase tracking-widest text-center mt-1 font-bold animate-pulse">
                Keep grinding!
              </span>
            </div>
          )}
        </div>

        {/* Tooltip Footer */}
        <div className="border-t border-slate-300/60 pt-2 mt-1 flex justify-between items-center text-[9px] font-mono text-slate-500">
          <span className="font-semibold text-slate-400">Live Stream Sync</span>
          <span className="text-[#E63B2E] font-bold">Today</span>
        </div>
      </div>

      {/* Top Header: Title (left) & Solved (right) */}
      <div className="flex items-center justify-between mb-3 relative z-10">
        <h3 className={`text-xs font-mono uppercase tracking-wider font-bold ${
          isLeetcode ? 'text-[#E63B2E]' : 'text-slate-300'
        }`}>
          {isLeetcode ? 'Leetcode streak' : 'Codeforces streak'}
        </h3>
        <span className="text-[10px] font-mono font-bold text-slate-100 bg-white/10 border border-white/10 px-2.5 py-0.5 rounded-md">
          {streak.totalSolved} Solved
        </span>
      </div>

      {/* Center Contribution Heatmap Table */}
      <div className="my-2 relative z-10">
        <StreakChart 
          platform={streak.platform} 
          streak={streak.currentStreak} 
          submissionCalendar={streak.submissionCalendar}
        />
      </div>

      {/* Bottom Footer: Active day text */}
      <div className="flex items-center justify-between mt-2 relative z-10">
        <span className={`flex items-center gap-1 text-[10px] font-mono font-bold ${
          hasStreak ? 'text-[#E63B2E]' : 'text-slate-400'
        }`}>
          <Flame size={12} className={hasStreak ? 'fill-[#E63B2E] text-[#E63B2E]' : ''} />
          {streak.currentStreak} Days Consecutive
        </span>
        
        <span className="text-[9px] font-mono text-slate-400 font-medium">
          Hover for today's log
        </span>
      </div>

    </div>
  );
}

import { useState } from 'react';
export default StreakCard;
