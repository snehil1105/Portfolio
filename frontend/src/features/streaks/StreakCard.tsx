import { Streak } from './useStreaks';
import { StreakChart } from './StreakChart';
import { Flame } from 'lucide-react';

interface StreakCardProps {
  streak: Streak;
  isSidebarHovered?: boolean;
}

export function StreakCard({ streak, isSidebarHovered = false }: StreakCardProps) {
  const isLeetcode = streak.platform === 'LEETCODE';
  const hasStreak = streak.currentStreak > 0;

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
    <div className="relative rounded-2xl border bg-[#16181D] p-5 shadow-xl flex flex-col justify-between h-[210px] w-full border-white/5">
      
      {/* Dynamic Popout Tooltip for Today's Solved Questions (Slides out to the Left on desktop, overlays on mobile) */}
      <div 
        className={`absolute lg:right-full lg:top-0 lg:h-full lg:mr-4 lg:w-72 left-0 top-0 h-full w-full bg-[#F5F2EB] border border-slate-300 p-5 rounded-2xl shadow-2xl z-50 flex flex-col justify-between transition-all duration-300 ease-out lg:origin-right origin-center ${
          isSidebarHovered
            ? 'opacity-100 translate-y-0 lg:translate-x-0 scale-100 pointer-events-auto'
            : 'opacity-0 translate-y-4 lg:translate-y-0 lg:translate-x-4 scale-95 pointer-events-none'
        }`}
      >
        {/* Tooltip Header */}
        <div className="border-b border-slate-300/60 pb-2 mb-3">
          <h4 className="text-[10px] font-mono uppercase tracking-widest text-accent font-bold">
            {isLeetcode ? 'LeetCode' : 'Codeforces'} Solved Today
          </h4>
        </div>

        {/* Scrollable Questions List */}
        <div className="flex-1 overflow-y-auto no-scrollbar space-y-2.5 max-h-[125px]">
          {questions.length > 0 ? (
            questions.map((q, idx) => (
              <a 
                key={idx}
                href={q.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex gap-2 items-start text-xs text-slate-800 hover:text-accent font-medium leading-snug transition-colors"
              >
                <span className="text-[10px] font-mono text-accent font-bold mt-0.5">{idx + 1}.</span>
                <span className="underline decoration-slate-400 group-hover:decoration-accent/60 underline-offset-4">{q.name}</span>
              </a>
            ))
          ) : (
            <div className="h-full flex flex-col items-center justify-center py-6">
              <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider text-center block font-medium">
                No questions solved
              </span>
              <span className="text-[8px] font-mono text-accent uppercase tracking-widest text-center mt-1 font-bold animate-pulse">
                Keep grinding!
              </span>
            </div>
          )}
        </div>

        {/* Tooltip Footer */}
        <div className="border-t border-slate-300/60 pt-2 mt-2 flex justify-between items-center text-[8px] font-mono text-slate-500">
          <span className="font-semibold text-slate-400">Live Metrics Sync</span>
          <span className="text-accent font-semibold">Today</span>
        </div>
        
        {/* Dynamic pointer arrow matching background border */}
        <div className="hidden lg:block absolute top-1/2 -translate-y-1/2 left-full w-2.5 h-2.5 rotate-45 bg-[#F5F2EB] border-r border-t border-slate-300 -ml-1.5" />
      </div>

      {/* Top Header: Title (left) & Solved (right) */}
      <div className="flex items-center justify-between mb-3 relative z-10">
        <h3 className={`text-xs font-mono uppercase tracking-wider font-semibold ${
          isLeetcode ? 'text-accent' : 'text-slate-400'
        }`}>
          {isLeetcode ? 'Leetcode streak' : 'Codeforce streak'}
        </h3>
        <span className="text-[10px] font-mono font-semibold text-slate-100 bg-white/5 border border-white/5 px-2.5 py-0.5 rounded-md">
          {streak.totalSolved} Solved
        </span>
      </div>

      {/* Center Chart Triangles */}
      <div className="my-2 relative z-10">
        <StreakChart platform={streak.platform} streak={streak.currentStreak} />
      </div>

      {/* Bottom Footer: Active day text */}
      <div className="flex items-center justify-between mt-2 relative z-10">
        <span className={`flex items-center gap-1 text-[10px] font-mono font-semibold ${
          hasStreak ? 'text-accent' : 'text-slate-500'
        }`}>
          <Flame size={12} className={hasStreak ? 'fill-accent text-accent' : ''} />
          {streak.currentStreak} Days Consecutive
        </span>
        
        <span className="text-[9px] font-mono text-slate-500">
          Last Active Today
        </span>
      </div>

    </div>
  );
}
export default StreakCard;
