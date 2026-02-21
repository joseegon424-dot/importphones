import { useRef, useEffect } from 'react';

interface ParticleCanvasProps {
  className?: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  life: number;
}

export function ParticleCanvas({ className = '' }: ParticleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      // Spawn particles on mouse move
      for (let i = 0; i < 3; i++) {
        particlesRef.current.push({
          x: mouseRef.current.x + (Math.random() - 0.5) * 20,
          y: mouseRef.current.y + (Math.random() - 0.5) * 20,
          vx: (Math.random() - 0.5) * 2,
          vy: -Math.random() * 2 - 0.5,
          size: Math.random() * 4 + 1,
          opacity: 1,
          life: 100,
        });
      }
    };

    canvas.addEventListener('mousemove', onMouseMove);

    // Spawn ambient particles
    const spawnAmbient = setInterval(() => {
      if (!canvas) return;
      particlesRef.current.push({
        x: Math.random() * canvas.width,
        y: canvas.height + 10,
        vx: (Math.random() - 0.5) * 1,
        vy: -Math.random() * 1.5 - 0.5,
        size: Math.random() * 2 + 0.5,
        opacity: 0.6,
        life: 100,
      });
    }, 80);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particlesRef.current = particlesRef.current.filter(p => p.life > 0);
      
      particlesRef.current.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 1.5;
        p.opacity = (p.life / 100) * 0.8;
        p.size *= 0.99;
        
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2);
        gradient.addColorStop(0, `rgba(229, 57, 53, ${p.opacity})`);
        gradient.addColorStop(1, `rgba(229, 57, 53, 0)`);
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', onMouseMove);
      clearInterval(spawnAmbient);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`cta-particle-canvas ${className}`}
    />
  );
}

export default ParticleCanvas;
