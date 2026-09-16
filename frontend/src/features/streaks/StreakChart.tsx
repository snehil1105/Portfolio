import { Platform } from './useStreaks';

interface StreakChartProps {
  platform: Platform;
  streak: number;
  submissionCalendar?: string;
}

// Standard LeetCode/GitHub contribution color scale
const COLOR_LEVELS = [
  'bg-[#21262D] border border-white/5', // Level 0: None
  'bg-[#0E4429]',                       // Level 1: Low (1 submission)
  'bg-[#006D32]',                       // Level 2: Medium (2 submissions)
  'bg-[#26A641]',                       // Level 3: High (3-4 submissions)
  'bg-[#39D353]'                        // Level 4: Ultra (5+ submissions)
];

export function StreakChart({ platform: _platform, streak, submissionCalendar }: StreakChartProps) {
  const NUM_COLS = 21;
  const NUM_ROWS = 7;

  // Parse submission calendar map (epoch/dateStr -> count)
  const calendarCounts = new Map<string, number>();
  if (submissionCalendar) {
    try {
      const parsed = JSON.parse(submissionCalendar);
      Object.entries(parsed).forEach(([key, val]) => {
        const count = typeof val === 'number' ? val : parseInt(String(val), 10);
        if (!isNaN(count)) {
          if (/^\d+$/.test(key)) {
            // Epoch seconds
            const d = new Date(parseInt(key, 10) * 1000);
            const dateStr = d.toISOString().split('T')[0];
            calendarCounts.set(dateStr, (calendarCounts.get(dateStr) || 0) + count);
          } else {
            // YYYY-MM-DD
            calendarCounts.set(key, (calendarCounts.get(key) || 0) + count);
          }
        }
      });
    } catch (e) {
      console.warn("Failed to parse submissionCalendar:", e);
    }
  }

  // Calculate grid dates ending at today
  const today = new Date();
  const dayOfWeek = (today.getDay() + 6) % 7; // Mon = 0, ..., Sun = 6
  
  // Create 21 columns x 7 rows grid
  const gridCells = Array.from({ length: NUM_COLS }, (_, colIdx) => {
    return Array.from({ length: NUM_ROWS }, (_, rowIdx) => {
      const daysFromToday = (NUM_COLS - 1 - colIdx) * 7 + (dayOfWeek - rowIdx);
      
      const date = new Date(today);
      date.setDate(today.getDate() - daysFromToday);
      const dateStr = date.toISOString().split('T')[0];
      const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

      const realCount = calendarCounts.get(dateStr) || 0;

      let level = 0;
      if (realCount >= 5) level = 4;
      else if (realCount >= 3) level = 3;
      else if (realCount === 2) level = 2;
      else if (realCount === 1) level = 1;
      else if (daysFromToday >= 0 && daysFromToday < streak && streak > 0) {
        level = 2; // Active streak fallback
      }

      return {
        dateStr,
        formattedDate,
        count: realCount,
        level,
        daysFromToday,
        isCurrentActive: daysFromToday >= 0 && daysFromToday < streak && streak > 0
      };
    });
  });

  const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];
  const dayLabels = ['', 'M', '', 'W', '', 'F', ''];

  return (
    <div className="w-full flex flex-col justify-center items-center py-1">
      {/* Month Header / Legend Header */}
      <div className="w-full flex justify-between items-center mb-1.5 px-0.5">
        <div className="flex gap-4 text-[9px] font-mono text-slate-400">
          {monthLabels.map((m, idx) => (
            <span key={idx} className="tracking-tighter">{m}</span>
          ))}
        </div>
        <div className="flex items-center gap-1 text-[9px] font-mono text-slate-400">
          <span>Less</span>
          {COLOR_LEVELS.map((color, i) => (
            <div key={i} className={`w-2 h-2 rounded-[1.5px] ${color}`} />
          ))}
          <span>More</span>
        </div>
      </div>

      {/* Contribution Grid Container */}
      <div className="flex gap-1 items-center justify-center w-full">
        {/* Day of Week Labels */}
        <div className="grid grid-rows-7 gap-[2px] text-[8px] font-mono text-slate-400 leading-none mr-1 select-none">
          {dayLabels.map((d, i) => (
            <span key={i} className="h-2.5 flex items-center justify-center w-2 text-center">
              {d}
            </span>
          ))}
        </div>

        {/* 7 x 21 Heatmap Grid Columns */}
        <div className="flex gap-[2.5px] overflow-x-auto no-scrollbar py-0.5">
          {gridCells.map((col, colIdx) => (
            <div key={colIdx} className="flex flex-col gap-[2.5px]">
              {col.map((cell, rowIdx) => (
                <div
                  key={rowIdx}
                  title={`${cell.formattedDate}: ${
                    cell.count > 0 
                      ? `${cell.count} submission${cell.count > 1 ? 's' : ''}` 
                      : cell.isCurrentActive 
                        ? 'Active streak day' 
                        : 'No submissions'
                  }`}
                  className={`w-2.5 h-2.5 rounded-[1.5px] transition-all duration-300 ${
                    COLOR_LEVELS[cell.level]
                  } ${
                    cell.isCurrentActive 
                      ? 'ring-1 ring-[#39D353]/50 shadow-[0_0_4px_rgba(57,211,83,0.4)]' 
                      : 'hover:opacity-80'
                  }`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
