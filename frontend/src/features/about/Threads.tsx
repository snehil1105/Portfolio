import { useEffect, useRef } from 'react';

interface ThreadsProps {
  color: [number, number, number]; // [R, G, B] normalized from 0 to 1
  amplitude?: number;
  distance?: number;
  enableMouseInteraction?: boolean;
}

export function Threads({ 
  color, 
  amplitude = 0.6, 
  distance = 0, 
  enableMouseInteraction = false // Disabled by default for standard self-animation
}: ThreadsProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Convert normalized RGB [0-1] to standard [0-255]
  const r = Math.round(color[0] * 255);
  const g = Math.round(color[1] * 255);
  const b = Math.round(color[2] * 255);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    // Wave parameters
    const waveCount = 6;
    const waves = Array.from({ length: waveCount }, (_, idx) => {
      const step = idx / waveCount;
      return {
        points: Array.from({ length: 45 }, () => ({ x: 0, y: 0 })),
        phase: Math.random() * Math.PI * 2,
        speed: 0.004 + step * 0.002, // Tranquil fluid speeds
        freq: 0.003 + step * 0.001,
        amp: 28 * amplitude * (1 - step * 0.25),
        offsetY: height * 0.3 + step * height * 0.4,
        opacity: 0.25 + (1 - step) * 0.35, // Softer light visibility (0.25 to 0.6)
        lineWidth: 1.0 + (1 - step) * 1.5 // Balanced line width (1.0 to 2.5)
      };
    });

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      waves.forEach((wave) => {
        wave.phase += wave.speed;
        const ptCount = wave.points.length;

        // Calculate wave points mathematically
        for (let i = 0; i < ptCount; i++) {
          const pt = wave.points[i];
          const targetX = (i / (ptCount - 1)) * width;
          const baseAngle = targetX * wave.freq + wave.phase;
          
          pt.x = targetX;
          pt.y = wave.offsetY + Math.sin(baseAngle) * wave.amp + Math.cos(baseAngle * 1.3) * (wave.amp * 0.3);
        }

        // Draw spline lines
        ctx.beginPath();
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${wave.opacity})`;
        ctx.lineWidth = wave.lineWidth;
        
        ctx.moveTo(wave.points[0].x, wave.points[0].y);
        for (let i = 0; i < ptCount - 1; i++) {
          const xc = (wave.points[i].x + wave.points[i + 1].x) / 2;
          const yc = (wave.points[i].y + wave.points[i + 1].y) / 2;
          ctx.quadraticCurveTo(wave.points[i].x, wave.points[i].y, xc, yc);
        }
        ctx.lineTo(wave.points[ptCount - 1].x, wave.points[ptCount - 1].y);
        ctx.stroke();
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, [color, amplitude, distance, enableMouseInteraction]);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
      <canvas 
        ref={canvasRef} 
        className="w-full h-full block bg-transparent"
      />
    </div>
  );
}
