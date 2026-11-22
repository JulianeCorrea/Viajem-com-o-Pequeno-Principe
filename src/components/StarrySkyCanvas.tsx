import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  radius: number;
  baseAlpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
  color: string;
  depth: number;
}

interface ShootingStar {
  x: number;
  y: number;
  vx: number;
  vy: number;
  length: number;
  alpha: number;
  active: boolean;
}

interface StarrySkyCanvasProps {
  warpDirection: 'forward' | 'backward' | null;
  accentColor?: string;
}

export function StarrySkyCanvas({ warpDirection, accentColor = '#E8C468' }: StarrySkyCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const warpRef = useRef<'forward' | 'backward' | null>(warpDirection);
  const accentRef = useRef<string>(accentColor);

  useEffect(() => {
    warpRef.current = warpDirection;
  }, [warpDirection]);

  useEffect(() => {
    accentRef.current = accentColor;
  }, [accentColor]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let animationFrameId = 0;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const starPalette = ['#FFF7DE', '#F5DC93', '#DCE8FF', '#FFE6D4', '#C4D7FF'];
    let stars: Star[] = [];

    const createStars = () => {
      const count = Math.min(260, Math.max(120, Math.floor((width * height) / 7200)));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.65 + 0.35,
        baseAlpha: Math.random() * 0.65 + 0.25,
        twinkleSpeed: Math.random() * 0.018 + 0.005,
        twinklePhase: Math.random() * Math.PI * 2,
        color: starPalette[Math.floor(Math.random() * starPalette.length)],
        depth: Math.random() * 0.8 + 0.2,
      }));
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      createStars();
    };

    resize();
    window.addEventListener('resize', resize);

    const shootingStar: ShootingStar = {
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      length: 90,
      alpha: 0,
      active: false,
    };

    let warpVelocity = 0;
    let time = 0;

    const render = () => {
      time += 1;

      // Deep watercolor indigo-navy sky wash
      const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
      bgGrad.addColorStop(0, '#050814');
      bgGrad.addColorStop(0.45, '#0B122B');
      bgGrad.addColorStop(0.85, '#111A3D');
      bgGrad.addColorStop(1, '#080D1F');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Soft watercolor nebula clouds
      const nebula1 = ctx.createRadialGradient(
        width * 0.24,
        height * 0.28,
        10,
        width * 0.24,
        height * 0.28,
        Math.max(width, height) * 0.42
      );
      nebula1.addColorStop(0, 'rgba(38, 57, 120, 0.24)');
      nebula1.addColorStop(0.55, 'rgba(24, 35, 82, 0.1)');
      nebula1.addColorStop(1, 'rgba(10, 15, 36, 0)');
      ctx.fillStyle = nebula1;
      ctx.fillRect(0, 0, width, height);

      const nebula2 = ctx.createRadialGradient(
        width * 0.78,
        height * 0.68,
        10,
        width * 0.78,
        height * 0.68,
        Math.max(width, height) * 0.4
      );
      nebula2.addColorStop(0, 'rgba(232, 196, 104, 0.06)');
      nebula2.addColorStop(0.5, 'rgba(54, 42, 92, 0.12)');
      nebula2.addColorStop(1, 'rgba(10, 15, 36, 0)');
      ctx.fillStyle = nebula2;
      ctx.fillRect(0, 0, width, height);

      // Smoothly ease warp velocity during planet transitions
      const targetVelocity =
        !prefersReducedMotion && warpRef.current === 'forward'
          ? -11
          : !prefersReducedMotion && warpRef.current === 'backward'
            ? 11
            : 0;
      warpVelocity += (targetVelocity - warpVelocity) * 0.12;

      // Draw stars
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        if (!prefersReducedMotion) {
          s.twinklePhase += s.twinkleSpeed;
          // Gentle ambient drift + warp movement
          s.x += (-0.08 + warpVelocity) * s.depth;
          if (s.x < -20) s.x = width + 20;
          if (s.x > width + 20) s.x = -20;
        }

        const twinkle = prefersReducedMotion ? 0 : Math.sin(s.twinklePhase) * 0.28;
        const alpha = Math.max(0.12, Math.min(1, s.baseAlpha + twinkle));

        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = s.color;

        if (Math.abs(warpVelocity) > 1.2) {
          // Draw soft star trail when traveling with migratory birds
          const trailLen = Math.abs(warpVelocity) * s.depth * 2.4;
          const dir = warpVelocity < 0 ? 1 : -1;
          ctx.strokeStyle = s.color;
          ctx.lineWidth = s.radius * 1.1;
          ctx.lineCap = 'round';
          ctx.beginPath();
          ctx.moveTo(s.x, s.y);
          ctx.lineTo(s.x + trailLen * dir, s.y);
          ctx.stroke();
        } else {
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
          ctx.fill();

          // Subtle cross glint on brightest stars
          if (s.radius > 1.55 && alpha > 0.72) {
            ctx.globalAlpha = alpha * 0.35;
            ctx.strokeStyle = s.color;
            ctx.lineWidth = 0.7;
            ctx.beginPath();
            ctx.moveTo(s.x - s.radius * 2.8, s.y);
            ctx.lineTo(s.x + s.radius * 2.8, s.y);
            ctx.moveTo(s.x, s.y - s.radius * 2.8);
            ctx.lineTo(s.x, s.y + s.radius * 2.8);
            ctx.stroke();
          }
        }
        ctx.restore();
      }

      // Occasional poetic shooting star
      if (!prefersReducedMotion) {
        if (!shootingStar.active && time % 320 === 180 && Math.random() < 0.75) {
          shootingStar.active = true;
          shootingStar.x = width * (0.2 + Math.random() * 0.6);
          shootingStar.y = height * (0.08 + Math.random() * 0.25);
          shootingStar.vx = 7 + Math.random() * 4;
          shootingStar.vy = 2.6 + Math.random() * 1.5;
          shootingStar.alpha = 0.85;
        }

        if (shootingStar.active) {
          ctx.save();
          const grad = ctx.createLinearGradient(
            shootingStar.x,
            shootingStar.y,
            shootingStar.x - shootingStar.vx * 11,
            shootingStar.y - shootingStar.vy * 11
          );
          grad.addColorStop(0, `rgba(255, 245, 214, ${shootingStar.alpha})`);
          grad.addColorStop(1, 'rgba(255, 245, 214, 0)');
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.6;
          ctx.lineCap = 'round';
          ctx.beginPath();
          ctx.moveTo(shootingStar.x, shootingStar.y);
          ctx.lineTo(shootingStar.x - shootingStar.vx * 11, shootingStar.y - shootingStar.vy * 11);
          ctx.stroke();
          ctx.restore();

          shootingStar.x += shootingStar.vx;
          shootingStar.y += shootingStar.vy;
          shootingStar.alpha -= 0.018;
          if (shootingStar.alpha <= 0) {
            shootingStar.active = false;
          }
        }
      }

      animationFrameId = window.requestAnimationFrame(render);
    };

    animationFrameId = window.requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resize);
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
    />
  );
}
