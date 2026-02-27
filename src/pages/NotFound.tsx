import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { Home, Phone, ArrowRight, Zap } from 'lucide-react';

const NotFound = () => {
    const pageRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animRef = useRef<number | undefined>(undefined);

    useEffect(() => {
        window.scrollTo(0, 0);

        const ctx = gsap.context(() => {
            // Elegant staggered reveal
            gsap.fromTo('.nf-label', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', delay: 0.3 });
            gsap.fromTo('.nf-number', { scale: 0.5, opacity: 0 }, { scale: 1, opacity: 1, duration: 1, ease: 'elastic.out(1, 0.6)', delay: 0.5 });
            gsap.fromTo('.nf-line', { scaleX: 0 }, { scaleX: 1, duration: 0.8, ease: 'power3.inOut', delay: 1.0 });
            gsap.fromTo('.nf-title', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', delay: 1.2 });
            gsap.fromTo('.nf-desc', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', delay: 1.5 });
            gsap.fromTo('.nf-btn', { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.12, ease: 'back.out(1.4)', delay: 1.7 });
            gsap.fromTo('.nf-nav', { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power3.out', delay: 2.1 });
        }, pageRef);

        // Elegant floating grid canvas
        const canvas = canvasRef.current;
        if (!canvas) return () => ctx.revert();
        const ctxCanvas = canvas.getContext('2d');
        if (!ctxCanvas) return () => ctx.revert();

        const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
        resize();
        window.addEventListener('resize', resize);

        let t = 0;
        const draw = () => {
            const w = canvas.width;
            const h = canvas.height;
            ctxCanvas.clearRect(0, 0, w, h);

            // Subtle flowing grid
            const cols = 16;
            const rows = 10;
            ctxCanvas.strokeStyle = 'rgba(229,57,53,0.03)';
            ctxCanvas.lineWidth = 1;
            for (let i = 0; i <= cols; i++) {
                const x = (i / cols) * w;
                ctxCanvas.beginPath();
                for (let j = 0; j <= rows; j++) {
                    const y = (j / rows) * h;
                    const wave = Math.sin(j * 0.6 + t * 0.5 + i * 0.3) * 8;
                    if (j === 0) ctxCanvas.moveTo(x + wave, y); else ctxCanvas.lineTo(x + wave, y);
                }
                ctxCanvas.stroke();
            }
            for (let j = 0; j <= rows; j++) {
                const y = (j / rows) * h;
                ctxCanvas.beginPath();
                for (let i = 0; i <= cols; i++) {
                    const x = (i / cols) * w;
                    const wave = Math.sin(i * 0.4 + t * 0.4 + j * 0.3) * 6;
                    if (i === 0) ctxCanvas.moveTo(x, y + wave); else ctxCanvas.lineTo(x, y + wave);
                }
                ctxCanvas.stroke();
            }

            // Soft glowing dots at intersections
            for (let i = 0; i <= cols; i++) {
                for (let j = 0; j <= rows; j++) {
                    const x = (i / cols) * w + Math.sin(j * 0.6 + t * 0.5 + i * 0.3) * 8;
                    const y = (j / rows) * h + Math.sin(i * 0.4 + t * 0.4 + j * 0.3) * 6;
                    const alpha = 0.04 + Math.sin(t + i + j) * 0.02;
                    ctxCanvas.beginPath();
                    ctxCanvas.arc(x, y, 1.5, 0, Math.PI * 2);
                    ctxCanvas.fillStyle = `rgba(229,57,53,${alpha})`;
                    ctxCanvas.fill();
                }
            }

            t += 0.012;
            animRef.current = requestAnimationFrame(draw);
        };
        draw();

        return () => {
            ctx.revert();
            window.removeEventListener('resize', resize);
            if (animRef.current !== undefined) cancelAnimationFrame(animRef.current);
        };
    }, []);

    return (
        <div ref={pageRef} style={{
            minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'linear-gradient(170deg, #0a0a0a 0%, #111 50%, #1a0808 100%)',
            position: 'relative', overflow: 'hidden',
        }}>
            {/* Animated canvas background */}
            <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }} />

            {/* Subtle glow effects */}
            <div style={{ position: 'absolute', top: '-15%', right: '-10%', width: '50%', height: '50%', background: 'radial-gradient(circle, rgba(229,57,53,0.05) 0%, transparent 60%)', pointerEvents: 'none', zIndex: 0 }} />
            <div style={{ position: 'absolute', bottom: '-10%', left: '-5%', width: '35%', height: '40%', background: 'radial-gradient(circle, rgba(229,57,53,0.04) 0%, transparent 55%)', pointerEvents: 'none', zIndex: 0 }} />

            {/* Giant watermark */}
            <div style={{
                position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                fontSize: 'clamp(18rem, 35vw, 45rem)', fontWeight: 900, color: 'transparent',
                WebkitTextStroke: '1px rgba(229,57,53,0.04)', fontFamily: "'Space Grotesk', sans-serif",
                lineHeight: 1, pointerEvents: 'none', zIndex: 0, userSelect: 'none',
            }}>404</div>

            {/* Content */}
            <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: '680px', padding: '2rem' }}>
                {/* Label */}
                <div className="nf-label" style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                    background: '#E53935', padding: '0.4rem 1.2rem', marginBottom: '2rem',
                    fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.7rem',
                    fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#fff',
                    border: '2px solid #fff',
                }}>
                    <Zap size={12} /> Error
                </div>

                {/* 404 Number */}
                <div className="nf-number" style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: 'clamp(6rem, 16vw, 13rem)',
                    fontWeight: 900, lineHeight: 0.85, marginBottom: '1rem',
                    background: 'linear-gradient(135deg, #E53935, #ff7961, #E53935)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                    filter: 'drop-shadow(0 0 40px rgba(229,57,53,0.15))',
                }}>
                    404
                </div>

                {/* Decorative line */}
                <div className="nf-line" style={{
                    width: '80px', height: '4px', background: '#E53935',
                    margin: '0 auto 2rem auto', transformOrigin: 'center',
                }} />

                {/* Title */}
                <h1 className="nf-title" style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: 'clamp(1.3rem, 3vw, 2.2rem)',
                    fontWeight: 800, color: '#fff', marginBottom: '1rem',
                    textTransform: 'uppercase', letterSpacing: '0.08em',
                }}>
                    Página no encontrada
                </h1>

                {/* Description */}
                <p className="nf-desc" style={{
                    fontSize: '1.05rem', color: 'rgba(255,255,255,0.45)',
                    lineHeight: 1.7, maxWidth: '480px', margin: '0 auto 3rem auto',
                    fontWeight: 500,
                }}>
                    Lo sentimos, la dirección que buscas no existe o ha sido movida.
                    Te ayudamos a encontrar lo que necesitas.
                </p>

                {/* Action buttons */}
                <div style={{ display: 'flex', gap: '1.25rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Link to="/" className="nf-btn" style={{
                        display: 'inline-flex', alignItems: 'center', gap: '0.75rem',
                        background: '#E53935', color: '#fff', padding: '1.1rem 2.5rem',
                        fontWeight: 800, fontSize: '0.95rem', textTransform: 'uppercase',
                        letterSpacing: '0.06em', border: '3px solid #E53935', textDecoration: 'none',
                        transition: 'all 0.3s ease', fontFamily: "'Space Grotesk', sans-serif",
                        boxShadow: '8px 8px 0 rgba(229,57,53,0.2)',
                    }}
                        onMouseEnter={e => {
                            const el = e.currentTarget;
                            el.style.transform = 'translate(8px, 8px)';
                            el.style.boxShadow = '0 0 0 transparent';
                        }}
                        onMouseLeave={e => {
                            const el = e.currentTarget;
                            el.style.transform = '';
                            el.style.boxShadow = '8px 8px 0 rgba(229,57,53,0.2)';
                        }}
                    >
                        <Home size={18} /> Ir al inicio
                    </Link>

                    <Link to="/contacto" className="nf-btn" style={{
                        display: 'inline-flex', alignItems: 'center', gap: '0.75rem',
                        background: 'transparent', color: '#fff', padding: '1.1rem 2.5rem',
                        fontWeight: 800, fontSize: '0.95rem', textTransform: 'uppercase',
                        letterSpacing: '0.06em', border: '3px solid rgba(255,255,255,0.15)', textDecoration: 'none',
                        transition: 'all 0.3s ease', fontFamily: "'Space Grotesk', sans-serif",
                    }}
                        onMouseEnter={e => {
                            const el = e.currentTarget;
                            el.style.borderColor = '#E53935';
                            el.style.color = '#E53935';
                        }}
                        onMouseLeave={e => {
                            const el = e.currentTarget;
                            el.style.borderColor = 'rgba(255,255,255,0.15)';
                            el.style.color = '#fff';
                        }}
                    >
                        <Phone size={18} /> Contactar
                    </Link>
                </div>

                {/* Quick navigation */}
                <div style={{ marginTop: '3.5rem', display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    {[
                        { to: '/servicios/telecomunicaciones', label: 'Telecomunicaciones' },
                        { to: '/servicios/energia', label: 'Energía' },
                        { to: '/quienes-somos', label: 'Nosotros' },
                        { to: '/trabaja-con-nosotros', label: 'Trabaja con nosotros' },
                    ].map((link, i) => (
                        <Link key={i} to={link.to} className="nf-nav" style={{
                            display: 'flex', alignItems: 'center', gap: '0.4rem',
                            color: 'rgba(255,255,255,0.25)', fontSize: '0.78rem', fontWeight: 700,
                            textDecoration: 'none', transition: 'color 0.3s ease',
                            textTransform: 'uppercase', letterSpacing: '0.1em',
                            fontFamily: "'Space Grotesk', sans-serif",
                        }}
                            onMouseEnter={e => { (e.currentTarget).style.color = '#E53935'; }}
                            onMouseLeave={e => { (e.currentTarget).style.color = 'rgba(255,255,255,0.25)'; }}
                        >
                            <ArrowRight size={12} /> {link.label}
                        </Link>
                    ))}
                </div>

                {/* Brand footer */}
                <p className="nf-nav" style={{
                    marginTop: '3rem', fontSize: '0.65rem', color: 'rgba(255,255,255,0.12)',
                    letterSpacing: '0.2em', textTransform: 'uppercase',
                    fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
                }}>
                    IMPORTPHONES.NET — Consultoría en Telecomunicaciones y Energía
                </p>
            </div>
        </div>
    );
};

export default NotFound;
