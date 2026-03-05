import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { ArrowRight, Wifi, Phone, Globe, Shield, CheckCircle, TrendingUp, Zap, MessageCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ServiciosTelecomProps { isLoaded: boolean; }

const ServiciosTelecom = ({ isLoaded }: ServiciosTelecomProps) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const operatorsRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const compRef = useRef<HTMLDivElement>(null);
  const entertainRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isLoaded) return;
    const ctx = gsap.context(() => {

      // ── Hero title
      if (titleRef.current) {
        const words = titleRef.current.querySelectorAll('.hero-word-line');
        gsap.fromTo(words,
          { y: '110%', opacity: 0, skewY: 3 },
          { y: '0%', opacity: 1, skewY: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out', delay: 0.3 }
        );
      }
      gsap.fromTo('.hero-subtitle', { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.8 });

      // Antenna SVG draw
      gsap.fromTo('.tc-antenna-path',
        { strokeDashoffset: 1500 },
        { strokeDashoffset: 0, duration: 2.5, ease: 'power2.out', stagger: 0.08, delay: 0.3 }
      );
      gsap.fromTo('.tc-signal-arc',
        { scale: 0, opacity: 0, transformOrigin: '50% 100%' },
        { scale: 1, opacity: 1, duration: 0.6, stagger: 0.2, ease: 'back.out(1.7)', delay: 1.8 }
      );

      // Hero image float
      gsap.to('.hero-img-float', {
        y: -10, duration: 3, ease: 'sine.inOut', yoyo: true, repeat: -1, stagger: { each: 0.5, from: 'random' }
      });

      // ── Services cards (white)
      gsap.fromTo('.tc-service-card',
        { y: 80, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.18, ease: 'power3.out',
          scrollTrigger: { trigger: servicesRef.current, start: 'top 70%' }
        }
      );
      // Service section image reveal
      gsap.fromTo('.tc-services-img',
        { x: 60, opacity: 0, scale: 0.95 },
        {
          x: 0, opacity: 1, scale: 1, duration: 1.1, ease: 'power3.out',
          scrollTrigger: { trigger: servicesRef.current, start: 'top 65%' }
        }
      );

      // ── Operators
      gsap.fromTo('.tc-operator-item',
        { scale: 0.8, opacity: 0 },
        {
          scale: 1, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'back.out(1.5)',
          scrollTrigger: { trigger: operatorsRef.current, start: 'top 72%' }
        }
      );

      // ── Benefits
      gsap.fromTo('.tc-benefit-card',
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: benefitsRef.current, start: 'top 72%' }
        }
      );
      gsap.fromTo('.tc-benefit-img',
        { x: -60, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1.1, ease: 'power3.out',
          scrollTrigger: { trigger: benefitsRef.current, start: 'top 65%' }
        }
      );

      // ── Process
      gsap.fromTo('.tc-process-step',
        { x: -40, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.7, stagger: 0.14, ease: 'power3.out',
          scrollTrigger: { trigger: processRef.current, start: 'top 72%' }
        }
      );
      ScrollTrigger.create({
        trigger: processRef.current, start: 'top 65%', end: 'bottom 35%', scrub: 1,
        onUpdate: (self) => {
          const fill = processRef.current?.querySelector<HTMLElement>('.process-svg-line-fill');
          if (fill) fill.style.height = `${self.progress * 100}%`;
        },
      });

      // ── Comparison
      gsap.fromTo('.tc-comp-before',
        { x: -60, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: compRef.current, start: 'top 70%' }
        }
      );
      gsap.fromTo('.tc-comp-after',
        { x: 60, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: 0.1,
          scrollTrigger: { trigger: compRef.current, start: 'top 70%' }
        }
      );

      // ── Entertainment streaming logos
      gsap.fromTo('.tc-stream-logo',
        { scale: 0.7, opacity: 0, rotate: -5 },
        {
          scale: 1, opacity: 1, rotate: 0, duration: 0.6, stagger: 0.1, ease: 'back.out(1.7)',
          scrollTrigger: { trigger: entertainRef.current, start: 'top 72%' }
        }
      );

      // ── FAQ
      gsap.fromTo('.faq-item',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, stagger: 0.09, ease: 'power3.out',
          scrollTrigger: { trigger: faqRef.current, start: 'top 72%' }
        }
      );

      // ── CTA
      gsap.fromTo('.cta-telecom-content',
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: ctaRef.current, start: 'top 72%' }
        }
      );

    }, heroRef);
    return () => ctx.revert();
  }, [isLoaded]);

  /* ─── Data ─── */
  const services = [
    {
      icon: Wifi, number: '01',
      title: 'Fibra Óptica',
      description: 'Internet de alta velocidad hasta 1Gbps simétricos. Navega, descarga y streaming sin interrupciones.',
      features: ['Hasta 1Gbps simétricos', 'Instalación gratuita', 'Sin permanencia'],
    },
    {
      icon: Phone, number: '02',
      title: 'Móvil',
      description: 'pack de Gb segun compañia , la opcion gb ilimiitados esta solamente para Orange Empresas',
      features: ['Datos ilimitados', 'Llamadas ilimitadas', 'Roaming incluido'],
    },
    {
      icon: Globe, number: '03',
      title: 'VoIP Empresarial',
      description: 'Sistemas de telefonía IP para empresas. Reduce costes y mejora la comunicación.',
      features: ['Centralita virtual', 'Números 902/901', 'Facturación detallada'],
    },
  ];

  const operators = [
    { name: 'Orange', logo: 'https://upload.wikimedia.org/wikipedia/commons/c/c8/Orange_logo.svg', color: '#FF6600' },
    { name: 'O2', logo: '/images/logo-o2-WJ0ZyWZ8.png', color: '#003087' },
    { name: 'Lowi', logo: '/images/lowi.png', color: '#6B21A8' },
  ];

  const benefits = [
    { icon: TrendingUp, title: 'Ahorro', desc: 'Hasta 40% menos en tu factura' },
    { icon: Shield, title: 'Sin permanencia', desc: 'Cambias cuando quieras' },
    { icon: Zap, title: 'Rápido', desc: 'Portabilidad en 48h hábiles' },
    { icon: MessageCircle, title: 'Soporte', desc: 'Atención personalizada' },
  ];

  const process = [
    { number: '01', title: 'Análisis', desc: 'Estudiamos tu factura actual', bgImg: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=600&q=80' },
    { number: '02', title: 'Comparación', desc: 'Buscamos la mejor tarifa', bgImg: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80' },
    { number: '03', title: 'Cambio', desc: 'Gestionamos la portabilidad', bgImg: 'https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?auto=format&fit=crop&w=600&q=80' },
    { number: '04', title: 'Ahorro', desc: 'Disfruta de tu nueva tarifa', bgImg: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80' },
  ];

  const faq = [
    { question: '¿Cuánto tarda la portabilidad?', answer: 'La portabilidad móvil es de 2 días hábiles sin contar festivos ni fines de semana, una vez lanzada la ventana de cambio.' },
    { question: '¿Pierdo mi número de teléfono?', answer: 'La portabilidad móvil mantiene su mismo número de siempre y no se queda sin línea; el cambio siempre se realiza de madrugada entre las 3 y las 6 AM.' },
    { question: '¿Hay permanencia?', answer: 'Depende de la compañía de telecomunicaciones elegida; algunas operadoras no exigen permanencia, como por ejemplo O2.' },
    { question: '¿Cuánto puedo ahorrar realmente?', answer: 'Nuestros clientes logran reducir hasta un 40% su factura de fibra y móvil al contratar en bloque o cambiando a las tarifas ocultas de operadoras asociadas.' },
  ];

  const toggleFaq = (index: number) => {
    document.querySelectorAll('.faq-item').forEach((item, i) => {
      if (i === index) item.classList.toggle('active');
      else item.classList.remove('active');
    });
  };

  return (
    <div ref={heroRef} className="overflow-hidden">

      {/* ══════════════════════════════════════════════
          S1 — HERO  (dark + antenna SVG)
      ══════════════════════════════════════════════ */}
      {/* ── S1: HERO */}
      <section className="hero-awwards">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/telecom_hero_bg.png"
            alt="Telecomunicaciones"
            className="w-full h-full object-cover filter brightness-[0.25] saturate-[1.2]"
          />
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3BaseFilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/baseFilter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-transparent" />
        </div>

        {/* Antenna SVG */}
        <div className="hero-subpage-svg" aria-hidden="true" style={{ zIndex: 0, opacity: 0.6 }}>
          <svg viewBox="0 0 700 500" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path className="tc-antenna-path" d="M350 440 L350 220" stroke="#E53935" strokeWidth="2" strokeDasharray="1500" strokeDashoffset="1500" />
            <path className="tc-antenna-path" d="M310 260 L350 220 L390 260" stroke="#E53935" strokeWidth="2" strokeDasharray="1500" strokeDashoffset="1500" />
            <path className="tc-signal-arc" d="M230 350 Q350 180 470 350" stroke="rgba(229,57,53,0.25)" strokeWidth="1.5" fill="none" />
            <path className="tc-signal-arc" d="M265 370 Q350 230 435 370" stroke="rgba(229,57,53,0.45)" strokeWidth="1.5" fill="none" />
            <path className="tc-signal-arc" d="M299 392 Q350 278 401 392" stroke="rgba(229,57,53,0.7)" strokeWidth="2" fill="none" />
            <circle cx="350" cy="220" r="4" fill="#E53935" />
          </svg>
        </div>

        <div className="max-w-[1800px] mx-auto px-6 lg:px-12 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <p className="hero-label">SERVICIOS</p>
              <h1 ref={titleRef} className="hero-title-brutal">
                {[
                  { text: 'CONECTIVIDAD', red: false },
                  { text: 'SIN LÍMITES', red: true },
                ].map((word, i) => (
                  <div key={i} style={{ overflow: 'hidden' }}>
                    <span className="hero-word-line" style={{
                      display: 'block',
                      color: word.red ? '#E53935' : '#ffffff',
                    }}>
                      {word.text}
                    </span>
                  </div>
                ))}
              </h1>
              <p className="hero-subtitle mb-8">
                Fibra óptica de alta velocidad, planes móviles con datos ilimitados y las mejores plataformas de streaming integradas. Todo lo que necesitas para estar conectado.
              </p>

              <div className="grid grid-cols-2 gap-4 mt-8 max-w-[420px]">
                {[
                  { src: '/images/logo_disney.png', alt: 'Disney+' },
                  { src: '/images/netflix.png', alt: 'Netflix' },
                  { src: '/images/movistar.png', alt: 'Movistar' },
                  { src: '/images/prime_video.png', alt: 'Prime Video' },
                ].map((logo, idx) => (
                  <div key={idx} className="group" style={{ position: 'relative' }}>
                    <div className="tc-hero-logo-card" style={{
                      width: '100%', background: '#111',
                      border: '1px solid #333',
                      padding: '2rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      aspectRatio: '1/1', overflow: 'hidden',
                      transition: 'all 0.35s ease',
                      boxShadow: '10px 10px 0 #E53935'
                    }}
                      onMouseEnter={e => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.background = '#fff';
                        el.style.borderColor = '#fff';
                        el.style.transform = 'translate(10px, 10px)';
                        el.style.boxShadow = 'none';
                        const img = el.querySelector('img') as HTMLImageElement;
                        if (img) img.style.filter = 'none';
                      }}
                      onMouseLeave={e => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.background = '#111';
                        el.style.borderColor = '#333';
                        el.style.transform = '';
                        el.style.boxShadow = '10px 10px 0 #E53935';
                        const img = el.querySelector('img') as HTMLImageElement;
                        if (img) img.style.filter = 'grayscale(1) brightness(2)';
                      }}
                    >
                      <img
                        src={logo.src}
                        alt={logo.alt}
                        className="tc-hero-logo-img"
                        style={{
                          height: '75px',
                          objectFit: 'contain',
                          filter: 'grayscale(1) brightness(2)',
                          transition: 'all 0.35s ease'
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="relative">
                <div className="aspect-[4/5] border-[1px] border-white/10 rounded-[2rem] overflow-hidden translate-x-6 translate-y-6">
                  <img src="/images/telecom_hero_photo.png" alt="Telecom" className="w-full h-full object-cover" />
                </div>
                <div className="absolute inset-0 border-[2px] border-[#E53935] rounded-[2rem] -translate-x-4 -translate-y-4 z-[-1]"></div>

                {/* Floating stats */}
                <div className="absolute top-10 -right-10 bg-black/80 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-2xl">
                  <div className="text-2xl font-black text-[#E53935]">1Gbps</div>
                  <div className="text-[9px] uppercase tracking-tighter text-white/40">Fibra Simétrica</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Minimal Scroll Indicator */}
        <div className="absolute bottom-8 left-12 flex flex-col items-center gap-3">
          <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent opacity-20"></div>
          <span className="text-[9px] text-white/20 uppercase tracking-[0.4em] font-bold [writing-mode:vertical-lr]">Scroll</span>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          S2 — SERVICE CARDS  (WHITE) + side image
      ══════════════════════════════════════════════ */}
      <section className="section-light" style={{ padding: 'clamp(5rem,9vw,8rem) 0' }}>
        <div ref={servicesRef} className="max-w-[1800px] mx-auto px-6 lg:px-12">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 420px', gap: '5rem', alignItems: 'flex-start' }}>
            <div>
              <div style={{ marginBottom: '3rem' }}>
                <p className="section-label">SERVICIOS</p>
                <h2 className="section-title" style={{ color: 'var(--color-text-dark)' }}>
                  Nuestras <span>especialidades</span>
                </h2>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {services.map((svc, i) => (
                  <div key={i} className="tc-service-card group" style={{
                    background: 'var(--color-black)', border: '1px solid #111',
                    borderRadius: '20px', padding: '2rem 2.5rem',
                    display: 'flex', gap: '1.75rem', alignItems: 'flex-start',
                    transition: 'all 0.4s ease',
                    position: 'relative', overflow: 'hidden',
                    boxShadow: '15px 15px 0 #E53935'
                  }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.transform = 'translate(15px, 15px)';
                      el.style.boxShadow = 'none';
                      el.style.background = '#fff';
                      el.style.borderColor = 'rgba(0,0,0,0.06)';
                      const num = el.querySelector('.tc-sc-num') as HTMLElement;
                      if (num) { num.style.color = 'rgba(0,0,0,0.04)'; }
                      const title = el.querySelector('.tc-sc-title') as HTMLElement;
                      if (title) title.style.color = 'var(--color-text-dark)';
                      const desc = el.querySelector('.tc-sc-desc') as HTMLElement;
                      if (desc) desc.style.color = 'var(--color-gray-mid)';
                      el.querySelectorAll('.tc-sc-feat').forEach(f => (f as HTMLElement).style.color = 'var(--color-text-dark)');
                      const iconBx = el.querySelector('.tc-sc-icon') as HTMLElement;
                      if (iconBx) { iconBx.style.background = 'rgba(229,57,53,0.08)'; iconBx.style.color = '#E53935'; }
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.transform = '';
                      el.style.boxShadow = '15px 15px 0 #E53935';
                      el.style.background = 'var(--color-black)';
                      el.style.borderColor = '#111';
                      const num = el.querySelector('.tc-sc-num') as HTMLElement;
                      if (num) { num.style.color = '#E53935'; }
                      const title = el.querySelector('.tc-sc-title') as HTMLElement;
                      if (title) title.style.color = '#fff';
                      const desc = el.querySelector('.tc-sc-desc') as HTMLElement;
                      if (desc) desc.style.color = 'rgba(255,255,255,0.7)';
                      el.querySelectorAll('.tc-sc-feat').forEach(f => (f as HTMLElement).style.color = '#fff');
                      const iconBx = el.querySelector('.tc-sc-icon') as HTMLElement;
                      if (iconBx) { iconBx.style.background = '#E53935'; iconBx.style.color = '#fff'; }
                    }}
                  >
                    {/* Big ghosted number */}
                    <span className="tc-sc-num" style={{ position: 'absolute', top: '0.5rem', right: '1.5rem', fontFamily: 'var(--font-display)', fontSize: '4.5rem', fontWeight: 900, color: '#E53935', lineHeight: 1, transition: 'color 0.4s ease' }}>{svc.number}</span>

                    <div className="tc-sc-icon" style={{ width: '48px', height: '48px', background: '#E53935', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', flexShrink: 0, marginTop: '0.2rem', transition: 'all 0.4s ease' }}>
                      <svc.icon size={22} />
                    </div>
                    <div style={{ flex: 1, position: 'relative', zIndex: 2 }}>
                      <h3 className="tc-sc-title" style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 700, color: '#fff', marginBottom: '0.5rem', transition: 'color 0.4s ease' }}>{svc.title}</h3>
                      <p className="tc-sc-desc" style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, fontSize: '0.93rem', marginBottom: '1rem', transition: 'color 0.4s ease' }}>{svc.description}</p>
                      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                        {svc.features.map((f, j) => (
                          <li key={j} className="tc-sc-feat" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', fontWeight: 600, color: '#fff', transition: 'color 0.4s ease' }}>
                            <CheckCircle size={14} style={{ color: '#E53935', flexShrink: 0 }} /> {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: stacked images */}
            <div className="tc-services-img" style={{ position: 'relative', paddingTop: '2rem' }}>
              <div style={{ borderRadius: '24px', overflow: 'hidden', aspectRatio: '3/4', boxShadow: '0 30px 60px rgba(0,0,0,0.12)' }}>
                <img src="/images/telecom_specialties_img.png" alt="Especialidades telecomunicaciones" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg, rgba(229,57,53,0.15) 0%, transparent 50%)' }} />
              </div>
              {/* Floating badge 1 */}
              <div style={{ position: 'absolute', top: '1.5rem', left: '-1.5rem', background: '#E53935', color: '#fff', borderRadius: '14px', padding: '1rem 1.25rem', boxShadow: '0 12px 30px rgba(229,57,53,0.35)', minWidth: '130px' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 900, lineHeight: 1 }}>1Gbps</div>
                <div style={{ fontSize: '0.7rem', opacity: 0.85, marginTop: '0.2rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Fibra óptica</div>
              </div>
              {/* Floating badge 2 */}
              <div style={{ position: 'absolute', bottom: '2rem', right: '-1.5rem', background: '#fff', borderRadius: '14px', padding: '1rem 1.25rem', boxShadow: '0 12px 30px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: '36px', height: '36px', background: 'rgba(229,57,53,0.1)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#E53935' }}>
                  <Wifi size={18} />
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.9rem', color: 'var(--color-text-dark)' }}>Sin cortes</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--color-gray-mid)' }}>Conexión estable</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          S3 — OPERATORS GRID  (WHITE)
      ══════════════════════════════════════════════ */}
      <section style={{ background: 'var(--color-section-light-2)', padding: 'clamp(4rem,7vw,6rem) 0' }}>
        <div ref={operatorsRef} className="max-w-[1800px] mx-auto px-6 lg:px-12">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '5rem', alignItems: 'center' }}>
            <div style={{ borderRadius: '0', border: '5px solid #111', overflow: 'hidden', aspectRatio: '4/3', boxShadow: '-15px 15px 0 #E53935' }}>
              <img src="/images/telecom_operators_photo.png" alt="Servidores Telecomunicaciones" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div>
              <div className="section-header" style={{ marginBottom: '3rem', textAlign: 'left' }}>
                <p className="section-label">OPERADORES</p>
                <h2 className="section-title" style={{ color: 'var(--color-text-dark)' }}>
                  Trabajamos con los <span>mejores</span>
                </h2>
              </div>
              <div className="tc-operators-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
                {operators.map((op, i) => (
                  <div key={i} className="tc-operator-item" style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.75rem'
                  }}>
                    <div style={{
                      width: '100%', background: 'var(--color-black)',
                      border: '1px solid #E53935', borderRadius: '20px',
                      padding: op.name === 'Orange' ? '3rem 2rem' : '2.5rem 2rem',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      aspectRatio: op.name === 'Orange' ? '4/1' : '2/1',
                      overflow: 'hidden',
                      transition: 'all 0.4s var(--ease-expo)',
                      boxShadow: '15px 15px 0 #E53935'
                    }}
                      onMouseEnter={e => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.background = '#fff';
                        el.style.borderColor = 'rgba(0,0,0,0.07)';
                        el.style.transform = 'translate(15px, 15px)';
                        el.style.boxShadow = 'none';
                      }}
                      onMouseLeave={e => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.background = 'var(--color-black)';
                        el.style.borderColor = '#E53935';
                        el.style.transform = '';
                        el.style.boxShadow = '15px 15px 0 #E53935';
                      }}
                    >
                      <img src={op.logo} alt={op.name} style={{
                        maxHeight: op.name === 'Orange' ? '80px' : '55px',
                        maxWidth: '80%',
                        objectFit: 'contain',
                        transition: 'all 0.4s ease'
                      }}
                      />
                    </div>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-gray-mid)' }}>{op.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          S4 — BENEFITS  (DARK BRUTALIST)
      ══════════════════════════════════════════════ */}
      <section style={{ background: 'var(--color-black)', padding: 'clamp(5rem,9vw,8rem) 0' }}>
        <div ref={benefitsRef} className="max-w-[1800px] mx-auto px-6 lg:px-12">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>
            {/* Left: image with decorations */}
            <div className="tc-benefit-img" style={{ position: 'relative' }}>
              <div style={{ borderRadius: '0', border: '5px solid #111', overflow: 'hidden', aspectRatio: '4/3', boxShadow: '-15px 15px 0 #E53935' }}>
                <img src="/images/telecom_benefits_img.png" alt="Beneficios telecomunicaciones" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              {/* Stat card */}
              <div style={{ position: 'absolute', bottom: '-2rem', left: '-2rem', background: '#E53935', color: '#fff', padding: '1.25rem 2rem', border: '2px solid #fff', boxShadow: '10px 10px 0 #fff' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', fontWeight: 900, lineHeight: 1 }}>40%</div>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, opacity: 0.9, marginTop: '0.2rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Ahorro medio</div>
              </div>
            </div>

            {/* Right: benefit cards 2x2 */}
            <div>
              <p className="section-label" style={{ color: '#E53935' }}>VENTAJAS</p>
              <h2 className="section-title" style={{ color: '#fff', marginBottom: '2.5rem' }}>
                Beneficios de <span>nuestro servicio</span>
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                {benefits.map((b, i) => (
                  <div key={i} className="tc-benefit-card" style={{
                    background: '#E53935',
                    border: '1px solid #E53935',
                    padding: '2rem 1.75rem',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    boxShadow: '10px 10px 0 rgba(255,255,255,0.15)'
                  }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.background = '#111';
                      el.style.borderColor = 'rgba(255,255,255,0.05)';
                      el.style.transform = 'translate(10px, 10px)';
                      el.style.boxShadow = 'none';
                      const p = el.querySelector('.tc-ben-desc') as HTMLElement;
                      if (p) p.style.color = 'rgba(255,255,255,0.5)';
                      const iBx = el.querySelector('.tc-ben-icon') as HTMLElement;
                      if (iBx) { iBx.style.background = 'rgba(255,255,255,0.04)'; iBx.style.color = '#fff'; }
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.background = '#E53935';
                      el.style.borderColor = '#E53935';
                      el.style.transform = '';
                      el.style.boxShadow = '10px 10px 0 rgba(255,255,255,0.15)';
                      const p = el.querySelector('.tc-ben-desc') as HTMLElement;
                      if (p) p.style.color = 'rgba(255,255,255,0.9)';
                      const iBx = el.querySelector('.tc-ben-icon') as HTMLElement;
                      if (iBx) { iBx.style.background = '#111'; iBx.style.color = '#fff'; }
                    }}
                  >
                    <div className="tc-ben-icon" style={{ width: '45px', height: '45px', background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', marginBottom: '1.25rem', transition: 'all 0.3s ease' }}>
                      <b.icon size={20} />
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '0.35rem', textTransform: 'uppercase' }}>{b.title}</h3>
                    <p className="tc-ben-desc" style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.9)', lineHeight: 1.6, transition: 'all 0.3s ease' }}>{b.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          S5 — PROCESS TIMELINE  (light-2)
      ══════════════════════════════════════════════ */}
      <section style={{ background: 'var(--color-section-light-2)', padding: 'clamp(5rem,9vw,8rem) 0' }}>
        <div ref={processRef} className="max-w-[1800px] mx-auto px-6 lg:px-12">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'flex-start' }}>
            {/* Left: steps */}
            <div>
              <p className="section-label">PROCESO</p>
              <h2 className="section-title" style={{ color: 'var(--color-text-dark)', marginBottom: '3rem' }}>
                Cómo <span>funciona</span>
              </h2>
              <div style={{ display: 'flex', gap: '3rem', alignItems: 'flex-start' }}>
                <div className="process-svg-line" style={{ flexShrink: 0 }}>
                  <div className="process-svg-line-fill" />
                </div>
                <div style={{ flex: 1 }}>
                  {process.map((step, i) => (
                    <div key={i} className="tc-process-step group" style={{ position: 'relative', overflow: 'hidden', display: 'flex', gap: '1.5rem', alignItems: 'flex-start', marginBottom: i < process.length - 1 ? '1.5rem' : 0, padding: '2rem', background: '#111', border: '1px solid #E53935', transition: 'all 0.3s ease', boxShadow: '-12px 12px 0 #E53935' }}
                      onMouseEnter={e => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.transform = 'translate(-12px, 12px)';
                        el.style.boxShadow = 'none';
                        el.style.background = '#fff';
                        el.style.borderColor = '#111';
                        const bg = el.querySelector('.step-bg-img') as HTMLElement;
                        if (bg) { bg.style.opacity = '0'; }
                        const num = el.querySelector('.step-num') as HTMLElement;
                        if (num) num.style.color = '#E53935';
                        const title = el.querySelector('.step-title') as HTMLElement;
                        if (title) title.style.color = 'var(--color-text-dark)';
                        const desc = el.querySelector('.step-desc') as HTMLElement;
                        if (desc) desc.style.color = 'var(--color-gray-mid)';
                      }}
                      onMouseLeave={e => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.transform = '';
                        el.style.boxShadow = '-12px 12px 0 #E53935';
                        el.style.background = '#111';
                        el.style.borderColor = '#E53935';
                        const bg = el.querySelector('.step-bg-img') as HTMLElement;
                        if (bg) { bg.style.opacity = '0.9'; }
                        const num = el.querySelector('.step-num') as HTMLElement;
                        if (num) num.style.color = '#fff';
                        const title = el.querySelector('.step-title') as HTMLElement;
                        if (title) title.style.color = '#fff';
                        const desc = el.querySelector('.step-desc') as HTMLElement;
                        if (desc) desc.style.color = '#fff';
                      }}
                    >
                      <img className="step-bg-img" src={step.bgImg} alt={step.title} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.9, filter: 'grayscale(0.6) contrast(1.2) brightness(0.4)', transition: 'all 0.4s ease', zIndex: 0 }} />
                      <div className="step-num" style={{ position: 'relative', zIndex: 1, fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 900, color: '#fff', lineHeight: 1, flexShrink: 0, transition: 'color 0.4s ease' }}>{step.number}</div>
                      <div style={{ position: 'relative', zIndex: 1 }}>
                        <h3 className="step-title" style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 900, textTransform: 'uppercase', color: '#fff', marginBottom: '0.3rem', transition: 'color 0.4s ease' }}>{step.title}</h3>
                        <p className="step-desc" style={{ color: '#ccc', lineHeight: 1.6, fontSize: '0.95rem', fontWeight: 500, transition: 'color 0.4s ease' }}>{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: phone mockup image */}
            <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
              <div style={{ borderRadius: '0', border: '5px solid #111', overflow: 'hidden', width: '320px', aspectRatio: '9/16', boxShadow: '-15px 15px 0 #E53935', position: 'relative' }}>
                <img src="/images/telecom_process_mockup.png" alt="Proceso telecomunicaciones" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          S6 — COMPARISON  (WHITE)
      ══════════════════════════════════════════════ */}
      <section className="section-light" style={{ padding: 'clamp(5rem,9vw,8rem) 0' }}>
        <div ref={compRef} className="max-w-[1800px] mx-auto px-6 lg:px-12">
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '5rem', alignItems: 'center' }}>
            <div>
              <div style={{ textAlign: 'left', marginBottom: '4rem' }}>
                <p className="section-label">RESULTADOS</p>
                <h2 className="section-title" style={{ color: 'var(--color-text-dark)' }}>
                  Ahorro <span>real</span>
                </h2>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr auto 1fr', gap: '0', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 24px 60px rgba(0,0,0,0.1)', alignItems: 'stretch' }}>
                {/* Before */}
                <div className="tc-comp-before" style={{ background: '#f5f5f5', padding: '3rem 2rem', textAlign: 'center' }}>
                  <p style={{ fontSize: '0.85rem', fontWeight: 900, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#111', marginBottom: '1rem' }}>ANTES</p>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '3.5rem', fontWeight: 900, color: '#111', textDecoration: 'line-through', textDecorationColor: '#E53935', textDecorationThickness: '4px', lineHeight: 1 }}>85€</div>
                  <p style={{ color: '#111', marginTop: '0.75rem', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase' }}>Factura mensual</p>
                </div>
                <div style={{ background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 1rem' }}>
                  <div style={{ width: '44px', height: '44px', background: '#E53935', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '0.8rem', color: '#fff', boxShadow: '0 6px 18px rgba(229,57,53,0.35)' }}>VS</div>
                </div>
                {/* After */}
                <div className="tc-comp-after" style={{ background: '#fff', padding: '3rem 2rem', textAlign: 'center', border: '2px solid #E53935', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: '#E53935', color: '#fff', fontSize: '0.65rem', fontWeight: 700, padding: '0.25rem 0.6rem', borderRadius: '20px', textTransform: 'uppercase' }}>−47%</div>
                  <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#E53935', marginBottom: '1rem' }}>CON NOSOTROS</p>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '3.5rem', fontWeight: 900, color: '#E53935', lineHeight: 1 }}>45€</div>
                  <p style={{ color: 'var(--color-gray-mid)', marginTop: '0.75rem', fontSize: '0.85rem' }}>Factura mensual</p>
                </div>
                <div style={{ background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 1rem' }}>
                  <ArrowRight size={20} style={{ color: '#E53935' }} />
                </div>
                {/* Savings */}
                <div style={{ background: '#E53935', padding: '3rem 2rem', textAlign: 'center' }}>
                  <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', marginBottom: '1rem' }}>AHORRO</p>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '3.5rem', fontWeight: 900, color: '#fff', lineHeight: 1 }}>480€</div>
                  <p style={{ color: 'rgba(255,255,255,0.8)', marginTop: '0.75rem', fontSize: '0.85rem' }}>Al año</p>
                </div>
              </div>
            </div>
            {/* Right Photo */}
            <div style={{ borderRadius: '0', border: '5px solid #111', overflow: 'hidden', aspectRatio: '3/4', boxShadow: '15px 15px 0 #E53935' }}>
              <img src="/images/telecom_savings_photo.png" alt="Ahorro real telecomunicaciones" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>
        </div>
      </section>



      {/* ══════════════════════════════════════════════
          S8 — FAQ  (dark)
      ══════════════════════════════════════════════ */}
      <section ref={faqRef} className="section-awwards faq-section" >
        <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'flex-start' }}>
            <div style={{ borderRadius: '0', border: '5px solid #111', overflow: 'hidden', aspectRatio: '4/3', boxShadow: '-15px 15px 0 #E53935' }}>
              <img src="/images/telecom_faq_photo.png" alt="Dudas frecuentes" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div>
              <div className="section-header">
                <p className="section-label">Preguntas</p>
                <h2 className="section-title">Dudas <span>frecuentes</span></h2>
              </div>
              <div className="faq-list">
                {faq.map((item, i) => (
                  <div key={i} className="faq-telecom-item faq-item">
                    <button className="faq-question" onClick={() => toggleFaq(i)}>
                      <span>{item.question}</span>
                      <span className="faq-icon">+</span>
                    </button>
                    <div className="faq-answer"><p>{item.answer}</p></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          S9 — BRUTALIST CTA TELECOM
      ══════════════════════════════════════════════ */}
      <section ref={ctaRef} style={{
        background: 'radial-gradient(circle at 50% 120%, rgba(229,57,53,0.25) 0%, rgba(229,57,53,0.05) 40%, #0a0a0a 100%)',
        backgroundColor: '#0a0a0a',
        padding: 'clamp(6rem, 12vw, 10rem) 0',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid rgba(255,255,255,0.05)'
      }}>
        {/* HUGE BACKGROUND TEXT */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '28vw',
          fontWeight: 900,
          color: 'transparent',
          WebkitTextStroke: '2px rgba(229,57,53,0.06)',
          fontFamily: 'var(--font-display)',
          lineHeight: 1,
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          zIndex: 0
        }}>
          AHORRO
        </div>

        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 position-relative" style={{ zIndex: 1, textAlign: 'center' }}>

          <div style={{ display: 'inline-block', background: '#E53935', color: '#fff', padding: '0.5rem 1.5rem', fontWeight: 900, letterSpacing: '0.2em', textTransform: 'uppercase', fontSize: '0.85rem', marginBottom: '2.5rem', boxShadow: '5px 5px 0 rgba(255,255,255,1)' }}>
            EMPIEZA HOY, ES GRATIS
          </div>

          <h2 className="cta-telecom-content" style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            fontWeight: 900,
            color: '#fff',
            lineHeight: 1.1,
            textTransform: 'uppercase',
            marginBottom: '2rem'
          }}>
            ¿EMPEZAMOS A <br />
            <span style={{ color: '#E53935', textDecoration: 'underline', textDecorationThickness: '10px', textUnderlineOffset: '10px' }}>AHORRAR?</span>
          </h2>

          <p className="cta-telecom-content" style={{
            fontSize: '1.25rem',
            color: 'rgba(255,255,255,0.6)',
            lineHeight: 1.6,
            maxWidth: '700px',
            margin: '0 auto 4rem auto',
            fontWeight: 500
          }}>
            Contacta con nosotros y descubre cuánto puedes bajar tu factura en telecomunicaciones. El análisis es totalmente gratuito y sin compromiso.
          </p>

          <Link to="/contacto" className="cta-telecom-content group inline-flex" style={{
            alignItems: 'center',
            gap: '1.5rem',
            background: '#fff',
            color: '#0a0a0a',
            padding: '1.5rem 3rem',
            fontSize: '1.2rem',
            fontWeight: 900,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            textDecoration: 'none',
            transition: 'all 0.3s ease',
            border: '4px solid #fff'
          }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = 'transparent';
              el.style.color = '#fff';
              el.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = '#fff';
              el.style.color = '#0a0a0a';
              el.style.transform = 'scale(1)';
            }}>
            <span>Solicitar análisis gratuito</span>
            <div style={{ width: '40px', height: '40px', background: '#E53935', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%' }}>
              <ArrowRight size={20} color="#fff" />
            </div>
          </Link>

        </div>
      </section>

    </div>
  );
};

export default ServiciosTelecom;
