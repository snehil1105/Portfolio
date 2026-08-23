import { Platform } from './useStreaks';

interface StreakChartProps {
  platform: Platform;
  streak: number;
}

interface SlotStyle {
  height: number; // Peak height out of 100
  widthMult: number; // Width multiplier relative to slot width
}

// Config matching LeetCode: wide middle mountain, tall thin right mountain
const LEETCODE_SLOTS: SlotStyle[] = [
  { height: 25, widthMult: 0.6 },
  { height: 40, widthMult: 0.9 },
  { height: 30, widthMult: 0.7 },
  { height: 75, widthMult: 1.8 }, // Wide middle mountain
  { height: 35, widthMult: 0.8 },
  { height: 45, widthMult: 0.9 },
  { height: 20, widthMult: 0.6 },
  { height: 95, widthMult: 0.4 }, // Tall thin right mountain
];

// Config matching Codeforces: tall thin left mountain, wide right mountain
const CODEFORCES_SLOTS: SlotStyle[] = [
  { height: 20, widthMult: 0.5 },
  { height: 95, widthMult: 0.4 }, // Tall thin left mountain
  { height: 35, widthMult: 0.7 },
  { height: 25, widthMult: 0.6 },
  { height: 45, widthMult: 0.8 },
  { height: 80, widthMult: 1.7 }, // Wide right mountain
  { height: 30, widthMult: 0.8 },
  { height: 25, widthMult: 0.6 },
];

export function StreakChart({ platform, streak }: StreakChartProps) {
  const isLeetcode = platform === 'LEETCODE';
  const config = isLeetcode ? LEETCODE_SLOTS : CODEFORCES_SLOTS;
  const numSlots = config.length;

  const width = 300;
  const height = 90;
  const baseline = 80; // Y baseline coordinate

  // Generate SVG polygon points for each slot
  const triangles = config.map((slot, i) => {
    const isActive = (numSlots - 1 - i) < streak && streak > 0;
    
    const slotWidth = width / numSlots;
    const xCenter = (i + 0.5) * slotWidth;
    const baseWidth = slotWidth * slot.widthMult;
    
    const xStart = xCenter - baseWidth / 2;
    const xEnd = xCenter + baseWidth / 2;
    const yPeak = baseline - (slot.height * (baseline / 100));

    const points = `${xStart.toFixed(1)},${baseline} ${xCenter.toFixed(1)},${yPeak.toFixed(1)} ${xEnd.toFixed(1)},${baseline}`;

    return {
      points,
      isActive,
      xCenter,
      yPeak
    };
  });

  const activeGradientId = `active-grad-light-${platform.toLowerCase()}`;
  const strokeColor = '#c2410c'; // Muted burnt orange for both to maintain unified accent

  return (
    <div className="w-full h-[100px] overflow-hidden">
      <svg 
        viewBox={`0 0 ${width} ${height}`} 
        className="w-full h-full overflow-visible"
        preserveAspectRatio="none"
      >
        <defs>
          {/* Subtle warm amber/orange gradient fill for active streaks */}
          <linearGradient id={activeGradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={strokeColor} stopOpacity={0.25} />
            <stop offset="100%" stopColor={strokeColor} stopOpacity={0.0} />
          </linearGradient>
        </defs>

        {/* Flat baseline */}
        <line 
          x1="0" 
          y1={baseline} 
          x2={width} 
          y2={baseline} 
          stroke="rgba(30,32,34,0.08)" 
          strokeWidth="1" 
        />

        {/* Render each day's triangle */}
        {triangles.map((tri, i) => (
          <polygon
            key={i}
            points={tri.points}
            fill={tri.isActive ? `url(#${activeGradientId})` : 'none'}
            stroke={tri.isActive ? strokeColor : 'rgba(30,32,34,0.06)'}
            strokeWidth={tri.isActive ? '1.5' : '0.75'}
            strokeDasharray={tri.isActive ? 'none' : '2,2'}
            className="transition-all duration-500"
          />
        ))}

        {/* Hover/Visual tags for peaks if active */}
        {triangles.map((tri, i) => {
          if (!tri.isActive) return null;
          return (
            <circle
              key={`dot-${i}`}
              cx={tri.xCenter}
              cy={tri.yPeak}
              r="2"
              fill={strokeColor}
            />
          );
        })}
      </svg>
    </div>
  );
}
