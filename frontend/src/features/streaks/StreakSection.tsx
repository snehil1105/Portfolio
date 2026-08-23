import { StreakCard } from './StreakCard';
import { useStreaks } from './useStreaks';
import { Loader2 } from 'lucide-react';

interface StreakSectionProps {
  isSidebarHovered?: boolean;
}

export function StreakSection({ isSidebarHovered = false }: StreakSectionProps) {
  const { streaks, loading, error } = useStreaks();

  return (
    <div className="flex flex-col gap-5 w-full">
      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-12 gap-2 text-slate-400">
          <Loader2 size={16} className="animate-spin text-accent" />
          <span className="font-mono text-[10px] uppercase tracking-wider">Syncing logs...</span>
        </div>
      )}

      {/* Error */}
      {error && !loading && (
        <div className="flex flex-col gap-5 w-full">
          {['LEETCODE', 'CODEFORCES'].map((platform) => {
            const isLC = platform === 'LEETCODE';
            return (
              <div key={platform} className="rounded-2xl border border-white/5 bg-[#16181D] p-5 flex flex-col justify-between h-[210px] w-full">
                <div className="flex justify-between items-center">
                  <span className={`text-xs font-mono uppercase tracking-wider font-semibold ${
                    isLC ? 'text-accent' : 'text-slate-500'
                  }`}>
                    {isLC ? 'Leetcode streak' : 'Codeforce streak'}
                  </span>
                  <span className="text-[9px] font-mono text-red-500 bg-red-500/5 border border-red-500/10 px-2 py-0.5 rounded">
                    Offline
                  </span>
                </div>
                <div className="w-full h-[90px] border border-dashed border-white/5 rounded-xl flex items-center justify-center">
                  <Loader2 size={14} className="animate-spin text-slate-700" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-slate-600">—</span>
                  <span className="text-[9px] font-mono text-slate-600">Waiting for connection...</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Render Streaks */}
      {!loading && !error && (
        <div className="flex flex-col gap-5 w-full">
          {streaks.map((streak) => (
            <StreakCard 
              key={streak.platform} 
              streak={streak} 
              isSidebarHovered={isSidebarHovered} 
            />
          ))}
        </div>
      )}
    </div>
  );
}
