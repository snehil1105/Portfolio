import { useEffect, useRef } from 'react';

interface SideRaysProps {
  rayColor1?: string;
  rayColor2?: string;
  origin?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  speed?: number;
  intensity?: number;
  spread?: number;
  tilt?: number;
  opacity?: number;
}

export function SideRays({
  rayColor1 = '#EAB308',
  rayColor2 = '#96c8ff',
  origin = 'top-right',
  speed = 2.5,
  intensity = 2,
  spread = 2,
  tilt = 0,
  opacity = 1,
}: SideRaysProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

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

    // Emitter coordinates based on origin prop
    let originX = width;
    let originY = 0;
    let baseAngle = Math.PI * 0.75; // Direction angle towards center from top-right

    const updateOrigin = () => {
      if (origin === 'top-right') {
        originX = width;
        originY = 0;
        baseAngle = Math.PI * 0.75;
      } else if (origin === 'top-left') {
        originX = 0;
        originY = 0;
        baseAngle = Math.PI * 0.25;
      } else if (origin === 'bottom-right') {
        originX = width;
        originY = height;
        baseAngle = Math.PI * 1.25;
      } else if (origin === 'bottom-left') {
        originX = 0;
        originY = height;
        baseAngle = Math.PI * 1.75;
      }
    };

    updateOrigin();

    // Define individual volumetric light rays (increased count and parameters)
    const rayCount = 14;

  const rays = Array.from({ length: rayCount }, () => {
    return {
      angleOffset: (Math.random() - 0.5) * 0.75 * spread,
      width: 0.04 + Math.random() * 0.08 * spread,
      phase: Math.random() * Math.PI * 2,
      rotSpeed: (0.003 + Math.random() * 0.005) * speed,
      pulseSpeed: (0.015 + Math.random() * 0.025) * speed,
      color: Math.random() > 0.45 ? rayColor1 : rayColor2,
      length: Math.max(width, height) * 1.6,
      maxOpacity: (0.15 + Math.random() * 0.2) * intensity * opacity
    };
  });

    let time = 0;

    const render = () => {
      time += 0.01; // Restored original slower, gentler animation flow rate
      updateOrigin();
      
      ctx.clearRect(0, 0, width, height);

      // Reduced blur to 16px to make rays distinct, using screen composite
      ctx.filter = 'blur(16px)';
      ctx.globalCompositeOperation = 'screen';

      rays.forEach((ray) => {
        // Smoky swaying angle: wider range and multi-wave sin offset
        const currentAngle = 
          baseAngle + 
          tilt * (Math.PI / 180) + 
          ray.angleOffset + 
          Math.sin(time * ray.pulseSpeed + ray.phase) * 0.28 + // Wider sway
          Math.cos(time * 0.5 * ray.pulseSpeed) * 0.06;

        // Oscillate ray width dynamically to simulate smoke drift density changes
        const currentWidth = 
          ray.width * (0.7 + Math.sin(time * ray.pulseSpeed * 1.2 + ray.phase) * 0.3);
        
        const x1 = originX + Math.cos(currentAngle - currentWidth) * ray.length;
        const y1 = originY + Math.sin(currentAngle - currentWidth) * ray.length;
        const x2 = originX + Math.cos(currentAngle + currentWidth) * ray.length;
        const y2 = originY + Math.sin(currentAngle + currentWidth) * ray.length;

        // Radial fadeout gradient starting from the origin
        const grad = ctx.createRadialGradient(originX, originY, 0, originX, originY, ray.length * 0.85);
        grad.addColorStop(0, ray.color);
        grad.addColorStop(0.3, ray.color);
        grad.addColorStop(1, 'transparent');

        ctx.beginPath();
        ctx.fillStyle = grad;
        // Opacity shifts over time to mimic smoke density
        ctx.globalAlpha = ray.maxOpacity * (0.5 + Math.sin(time * 2 * ray.pulseSpeed) * 0.4);
        
        ctx.moveTo(originX, originY);
        ctx.lineTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.closePath();
        ctx.fill();
      });

      // Reset context parameters
      ctx.globalAlpha = 1.0;
      ctx.globalCompositeOperation = 'source-over';
      ctx.filter = 'none';

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, [rayColor1, rayColor2, origin, speed, intensity, spread, tilt, opacity]);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
      <canvas 
        ref={canvasRef} 
        className="w-full h-full block bg-transparent"
      />
    </div>
  );
}
