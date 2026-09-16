import { StreakCard } from './StreakCard';
import { useStreaks } from './useStreaks';
import { Loader2 } from 'lucide-react';

interface StreakSectionProps {
  isSidebarHovered?: boolean;
}

export function StreakSection({ isSidebarHovered = false }: StreakSectionProps) {
  const { streaks, loading } = useStreaks();

  return (
    <div className="w-full">
      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-12 gap-2 text-slate-400">
          <Loader2 size={16} className="animate-spin text-accent" />
          <span className="font-mono text-xs uppercase tracking-wider">Syncing logs...</span>
        </div>
      )}

      {/* Render Streaks in 2-Column Grid */}
      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
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
export default StreakSection;
