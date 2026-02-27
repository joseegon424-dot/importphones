import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { ArrowRight, Wifi, Phone, Globe, Shield, CheckCircle, TrendingUp, Zap, MessageCircle } from 'lucide-react';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

interface ServiciosTelecomProps { isLoaded: boolean; }

const ServiciosTelecom = ({ isLoaded }: ServiciosTelecomProps) => {
  const pageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
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
      const heroTitle = pageRef.current?.querySelector<HTMLElement>('.page-header-title');
      if (heroTitle) {
        heroTitle.classList.add('split-target');
        const sp = new SplitType(heroTitle, { types: 'words,chars' });
        gsap.fromTo(sp.chars,
          { y: '110%', opacity: 0 },
          { y: '0%', opacity: 1, duration: 0.8, stagger: 0.025, ease: 'power3.out', delay: 0.4 }
        );
      }
      gsap.fromTo('.page-header-subtitle', { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.8 });
      gsap.fromTo('.page-header-label', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', delay: 0.2 });

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

    }, pageRef);
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
    { name: 'Lowi', logo: 'data:image/png;base64,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', color: '#6B21A8' },
    { name: 'Niba', logo: '/images/logo_niba_local.svg', color: '#E53935' },
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
    <div ref={pageRef} className="overflow-hidden">

      {/* ══════════════════════════════════════════════
          S1 — HERO (Standardized)
      ══════════════════════════════════════════════ */}
      <section ref={headerRef} className="hero-awwards" style={{ position: 'relative', overflow: 'hidden', minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
        {/* Background Image & Overlay */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <img
            src="/images/telecom_hero_bg.png"
            alt="Servicios Telecom"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'brightness(0.6)' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 50%)' }} />
        </div>

        <div className="max-w-[1800px] mx-auto px-6 lg:px-12 w-full hero-content-z">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">

            {/* Left side: Content */}
            <div style={{ zIndex: 2, position: 'relative' }}>
              <p className="hero-label" style={{ marginBottom: '1.5rem' }}>TELECOM</p>

              <h1 className="hero-title-brutal" style={{ marginBottom: '2rem', color: '#fff' }}>
                <div style={{ overflow: 'hidden' }}>
                  <span className="hero-word-line" style={{ display: 'block' }}>CONEXIÓN</span>
                </div>
                <div style={{ overflow: 'hidden' }}>
                  <span className="hero-word-line" style={{ display: 'block' }}>
                    SIN <span style={{ color: '#E53935' }}>LÍMITES</span>
                  </span>
                </div>
              </h1>

              <p className="hero-subtitle visible" style={{ color: 'rgba(255,255,255,0.7)', opacity: 1, transform: 'none', marginBottom: '3rem', maxWidth: '600px' }}>
                Internet de alta velocidad y tarifas móviles a medida.
                Gestionamos tu portabilidad de forma rápida y gratuita.
              </p>

              <div className="hero-cta visible" style={{ opacity: 1, transform: 'none' }}>
                <Link to="/contacto" className="btn-primary">
                  <span>Solicitar estudio gratuito</span>
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>

            {/* Right side: Stats/Info Cards */}
            <div style={{ zIndex: 2, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              {[
                { icon: Wifi, label: 'Fibra', sub: 'Hasta 1Gbps' },
                { icon: Phone, label: 'Móvil', sub: 'Datos ilimitados' },
                { icon: Globe, label: 'Cobertura', sub: 'Nacional' },
                { icon: Shield, label: 'Seguridad', sub: 'Sin permanencia' },
              ].map((item, i) => (
                <div key={i} className="trust-card-brutal" style={{
                  background: 'rgba(255,255,255,0.05)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '16px', padding: '2rem 1.5rem', textAlign: 'center',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
                }}>
                  <div style={{ color: '#E53935', marginBottom: '0.75rem' }}>
                    <item.icon size={32} strokeWidth={1.5} />
                  </div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#fff', lineHeight: 1, marginBottom: '0.25rem' }}>{item.label}</div>
                  <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', fontWeight: 600, textTransform: 'uppercase' }}>{item.sub}</div>
                </div>
              ))}
            </div>
          </div>
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
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
                {operators.map((op, i) => (
                  <div key={i} className="tc-operator-item" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{
                      width: '100%', background: 'var(--color-black)',
                      border: '1px solid #E53935', borderRadius: '20px',
                      padding: '2.5rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      aspectRatio: '2/1', overflow: 'hidden',
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
                      <img src={op.logo} alt={op.name} style={{ maxHeight: '55px', maxWidth: '80%', objectFit: 'contain', transition: 'all 0.4s ease' }}
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
            fontSize: 'clamp(3.5rem, 7vw, 6rem)',
            fontWeight: 900,
            color: '#fff',
            lineHeight: 1,
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
