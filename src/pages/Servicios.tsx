import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Wifi, Zap, Phone, Shield,
  CheckCircle, TrendingUp, Clock, Headphones
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ServiciosProps {
  isLoaded: boolean;
}

const Servicios = ({ isLoaded }: ServiciosProps) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const featRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const benefRef = useRef<HTMLDivElement>(null);
  const compRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isLoaded) return;

    const ctx = gsap.context(() => {

      // ── Hero header
      if (titleRef.current) {
        const words = titleRef.current.querySelectorAll('.hero-word-line');
        gsap.fromTo(words,
          { y: '110%', opacity: 0, skewY: 3 },
          { y: '0%', opacity: 1, skewY: 0, duration: 0.9, stagger: 0.1, ease: 'power3.out', delay: 0.4 }
        );
      }
      gsap.fromTo('.page-header-subtitle',
        { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.8 }
      );
      gsap.fromTo('.page-header-label',
        { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', delay: 0.2 }
      );

      // ── Service cards (white)
      gsap.fromTo('.svc-light-card',
        { y: 80, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, stagger: 0.2, ease: 'power3.out',
          scrollTrigger: { trigger: cardsRef.current, start: 'top 70%' }
        }
      );

      // ── Feature pills animation (white)
      gsap.fromTo('.svc-feature-pill',
        { scale: 0.8, opacity: 0 },
        {
          scale: 1, opacity: 1, duration: 0.5, stagger: 0.07, ease: 'back.out(1.5)',
          scrollTrigger: { trigger: featRef.current, start: 'top 75%' }
        }
      );

      // ── Process steps (white) — line grows on scroll
      gsap.fromTo('.svc-process-step',
        { x: -50, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: processRef.current, start: 'top 72%' }
        }
      );
      ScrollTrigger.create({
        trigger: processRef.current,
        start: 'top 65%',
        end: 'bottom 35%',
        scrub: 1,
        onUpdate: (self) => {
          const fill = processRef.current?.querySelector<HTMLElement>('.process-svg-line-fill');
          if (fill) fill.style.height = `${self.progress * 100}%`;
        },
      });

      // ── Benefits list (white)
      gsap.fromTo('.svc-benefit-item',
        { x: -40, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: benefRef.current, start: 'top 72%' }
        }
      );

      // ── Comparison "rupture" split reveal
      gsap.fromTo('.comp-before',
        { x: -60, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: compRef.current, start: 'top 70%' }
        }
      );
      gsap.fromTo('.comp-after',
        { x: 60, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: 0.1,
          scrollTrigger: { trigger: compRef.current, start: 'top 70%' }
        }
      );

      // ── CTA
      gsap.fromTo('.cta-service-content',
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
  const mainServices = [
    {
      icon: Wifi,
      number: '01',
      title: 'Telecomunicaciones',
      description: 'Fibra óptica, móvil y VoIP. Las mejores tarifas del mercado con los principales operadores: O2, Lowi, Orange, Vodafone y más.',
      features: ['Fibra hasta 1 Gbps simétricos', 'Móvil con datos ilimitados', 'VoIP empresarial', 'Tarifas combinadas'],
      link: '/servicios/telecomunicaciones',
      cta: 'Ver telecomunicaciones',
      bgImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80' // Tech/Network
    },
    {
      icon: Zap,
      number: '02',
      title: 'Energía',
      description: 'Optimiza tu factura eléctrica. Ahorra hasta un 40% con nuestro análisis gratuito. Trabajamos con las principales comercializadoras.',
      features: ['Análisis gratuito de consumo', 'Cambio de compañía gestionado', 'Tarifas adaptadas a tu perfil', 'Ahorro garantizado'],
      link: '/servicios/energia',
      cta: 'Ver energía',
      bgImage: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1200&q=80' // Power/Energy
    },
  ];

  const features = [
    { icon: Shield, label: 'Sin permanencia', sub: 'Cambias cuando quieras' },
    { icon: Clock, label: 'Gestión en 24-48h', sub: 'Rápido y sin complicaciones' },
    { icon: Headphones, label: 'Soporte continuo', sub: 'Disponibles 6 días a la semana' },
    { icon: TrendingUp, label: 'Hasta 40% ahorro', sub: 'Garantizado o te devolvemos' },
    { icon: CheckCircle, label: '100% gratuito', sub: 'Sin costes ocultos' },
    { icon: Shield, label: 'Acceso exclusivo', sub: 'Tarifas que no están en web' },
  ];

  const process = [
    { number: '01', title: 'Contacto', desc: 'Nos cuentas tu situación actual y revisamos tus facturas.', bgImg: 'https://images.unsplash.com/photo-1516387938699-a93567ec168e?auto=format&fit=crop&w=600&q=80' },
    { number: '02', title: 'Análisis', desc: 'Estudiamos en detalle tu consumo y detectamos el ahorro posible.', bgImg: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80' },
    { number: '03', title: 'Propuesta', desc: 'Te presentamos las mejores opciones adaptadas a tu perfil.', bgImg: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80' },
    { number: '04', title: 'Gestión', desc: 'Nos encargamos de todos los trámites. Tú solo firmas.', bgImg: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=600&q=80' },
  ];

  const benefits = [
    'Asesoramiento 100% gratuito sin compromiso',
    'Sin costes ocultos ni comisiones',
    'Acceso a tarifas exclusivas del mercado',
    'Gestión integral de todos los trámites',
    'Acompañamiento personalizado durante el proceso',
    'Resolución de incidencias post-contratación',
  ];

  return (
    <div ref={heroRef} className="overflow-hidden">

      {/* ══════════════════════════════════════════════
          S1 — HERO HEADER  (dark)
      ══════════════════════════════════════════════ */}
      <section className="page-header hero-awwards" style={{
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        background: 'var(--color-black)'
      }}>
        {/* Background Image with Overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url("/images/services-hero.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.35,
          filter: 'grayscale(0.4) contrast(1.1)',
        }} />

        {/* Animated Gradient Overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to right, var(--color-black) 0%, rgba(0,0,0,0.8) 40%, transparent 100%)',
          zIndex: 1
        }} />

        {/* Content Container */}
        <div className="max-w-[1800px] mx-auto px-6 lg:px-12 w-full" style={{ position: 'relative', zIndex: 2 }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Left Column: Title & Buttons (Aligned below title) */}
            <div style={{ zIndex: 2 }}>
              <p className="page-header-label mb-6 inline-block" style={{
                letterSpacing: '0.4em',
                fontSize: '0.8rem',
                color: 'var(--color-primary)',
                textTransform: 'uppercase',
                fontWeight: 800
              }}>
                — EXPERIENCIA Y EFICACIA —
              </p>
              <h1 ref={titleRef} className="hero-title-brutal mb-8" style={{ color: '#fff' }}>
                Soluciones de <br />
                <span style={{ color: '#E53935' }}>Ahorro</span> Real
              </h1>

              {/* Botones alineados debajo del título */}
              <div className="flex flex-wrap gap-6 mb-12">
                <Link to="/contacto" className="btn-primary" style={{ padding: '1.2rem 2.5rem' }}>
                  <span>Solicitar Estudio</span>
                  <ArrowRight size={18} />
                </Link>
                <a href="#principales" className="btn-outline" onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#principales')?.scrollIntoView({ behavior: 'smooth' });
                }}>
                  Explorar Servicios
                </a>
              </div>

              {/* Decorative accent squares for brutalist feel */}
              <div style={{ display: 'flex', gap: '8px', marginTop: '2rem' }}>
                <div style={{ width: '12px', height: '12px', background: '#E53935' }} />
                <div style={{ width: '12px', height: '12px', background: 'rgba(255,255,255,0.2)' }} />
                <div style={{ width: '12px', height: '12px', background: 'rgba(255,255,255,0.1)' }} />
              </div>
            </div>

            {/* Right Column: Centered Description & Info Squares below it */}
            <div style={{
              paddingLeft: 'clamp(0rem, 5vw, 4rem)',
              borderLeft: '1px solid rgba(255,255,255,0.1)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              marginTop: '4rem'
            }}>
              <p className="page-header-subtitle text-xl mb-12" style={{
                lineHeight: 1.7,
                maxWidth: '600px',
                fontWeight: 500,
                color: '#ffffff'
              }}>
                Transformamos tu consumo en eficiencia. Expertos en optimizar tus facturas
                de energía y telecomunicaciones con acceso a tarifas exclusivas que no verás en otro lugar.
              </p>

              {/* Info Squares (Cuadraditos) alineados debajo del texto */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', width: '100%', maxWidth: '500px' }}>
                {[
                  { icon: Zap, label: 'Energía', sub: 'Ahorro Real', img: 'https://images.unsplash.com/photo-1466611653911-95282fc3656b?auto=format&fit=crop&w=400&q=80' },
                  { icon: Wifi, label: 'Telecom', sub: 'Tarifas VIP', img: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=400&q=80' },
                ].map((item, i) => (
                  <div key={i} style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    padding: '1.5rem',
                    borderRadius: '2px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    position: 'relative',
                    overflow: 'hidden',
                    textAlign: 'left'
                  }}>
                    {/* Background decoration with mini gradient image */}
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundImage: `url("${item.img}")`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      opacity: 0.15,
                      zIndex: 0
                    }} />
                    {/* Image Gradient Technique (darker overlay) */}
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to right, rgba(0,0,0,0.8), transparent)',
                      zIndex: 1
                    }} />

                    <div style={{
                      width: '40px', height: '40px',
                      background: 'rgba(229,57,53,0.1)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#E53935',
                      position: 'relative',
                      zIndex: 2
                    }}>
                      <item.icon size={20} />
                    </div>
                    <div style={{ position: 'relative', zIndex: 2 }}>
                      <div style={{ color: '#fff', fontWeight: 700, fontSize: '0.9rem' }}>{item.label}</div>
                      <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', fontWeight: 600 }}>{item.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Global Bottom Divider */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px', background: 'rgba(255,255,255,0.06)' }} />
      </section>

      {/* ══════════════════════════════════════════════
          S2 — SERVICE CARDS  (WHITE)
      ══════════════════════════════════════════════ */}
      <section id="principales" className="section-light" style={{
        padding: 'clamp(5rem, 9vw, 10rem) 0',
        background: 'linear-gradient(to bottom, #fff, #f8f8f8)'
      }}>
        <div ref={cardsRef} className="max-w-[1800px] mx-auto px-6 lg:px-12">
          <div className="section-header" style={{ marginBottom: '5rem' }}>
            <p className="section-label" style={{ color: '#E53935', letterSpacing: '0.3em', fontWeight: 800 }}>NUESTRAS ESPECIALIDADES</p>
            <h2 className="section-title" style={{ color: 'var(--color-text-dark)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.1 }}>
              Servicios <span>Expertos</span>
            </h2>
            <div style={{ width: '80px', height: '4px', background: '#E53935', marginTop: '1.5rem' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '3rem' }}>
            {mainServices.map((svc, i) => (
              <div key={i} className="svc-light-card" style={{
                background: '#fff',
                padding: '4rem',
                border: '1px solid #E53935',
                position: 'relative',
                transition: 'all 0.5s var(--ease-expo)',
                cursor: 'pointer',
                overflow: 'hidden'
              }}
                onMouseEnter={(e) => {
                  const target = e.currentTarget as HTMLElement;
                  target.style.transform = 'translateY(-10px)';
                  target.style.boxShadow = '0 40px 80px rgba(0,0,0,0.3)';
                  target.style.borderColor = 'rgba(229,57,53,0.3)';
                  target.style.background = '#0a0a0a'; // NEGRO

                  const bgImg = target.querySelector('.card-bg-image') as HTMLElement;
                  if (bgImg) bgImg.style.opacity = '0.4';

                  const gradDiv = target.querySelector('.card-gradient') as HTMLElement;
                  if (gradDiv) gradDiv.style.background = 'linear-gradient(to bottom, rgba(10,10,10,0.5) 0%, rgba(10,10,10,0.95) 100%)';

                  const numSpan = target.querySelector('.card-number') as HTMLElement;
                  if (numSpan) numSpan.style.color = '#E53935';

                  const iconBox = target.querySelector('.card-icon-box') as HTMLElement;
                  if (iconBox) {
                    iconBox.style.background = '#E53935';
                    iconBox.style.color = '#ffffff';
                  }

                  const texts = target.querySelectorAll('.text-switch');
                  texts.forEach(t => { (t as HTMLElement).style.color = '#ffffff'; });

                  const descTexts = target.querySelectorAll('.text-desc-switch');
                  descTexts.forEach(t => { (t as HTMLElement).style.color = 'rgba(255,255,255,0.7)'; });

                  const ctaBtn = target.querySelector('.card-cta') as HTMLElement;
                  if (ctaBtn) ctaBtn.style.color = '#ffffff';

                  const accentBar = target.querySelector('.card-accent-bar') as HTMLElement;
                  if (accentBar) accentBar.style.width = '100%';
                }}
                onMouseLeave={(e) => {
                  const target = e.currentTarget as HTMLElement;
                  target.style.transform = 'translateY(0)';
                  target.style.boxShadow = '';
                  target.style.borderColor = '#E53935';
                  target.style.background = '#fff';

                  const bgImg = target.querySelector('.card-bg-image') as HTMLElement;
                  if (bgImg) bgImg.style.opacity = '0';

                  const gradDiv = target.querySelector('.card-gradient') as HTMLElement;
                  if (gradDiv) gradDiv.style.background = 'linear-gradient(to bottom, #fff 0%, rgba(255,255,255,0.95) 100%)';

                  const numSpan = target.querySelector('.card-number') as HTMLElement;
                  if (numSpan) numSpan.style.color = '#E53935';

                  const iconBox = target.querySelector('.card-icon-box') as HTMLElement;
                  if (iconBox) {
                    iconBox.style.background = 'rgba(229,57,53,0.1)';
                    iconBox.style.color = '#E53935';
                  }

                  const texts = target.querySelectorAll('.text-switch');
                  texts.forEach(t => { (t as HTMLElement).style.color = 'var(--color-text-dark)'; });

                  const descTexts = target.querySelectorAll('.text-desc-switch');
                  descTexts.forEach(t => { (t as HTMLElement).style.color = 'var(--color-gray-mid)'; });

                  const ctaBtn = target.querySelector('.card-cta') as HTMLElement;
                  if (ctaBtn) ctaBtn.style.color = '#E53935';

                  const accentBar = target.querySelector('.card-accent-bar') as HTMLElement;
                  if (accentBar) accentBar.style.width = '0%';
                }}
              >
                {/* Background Image that fades in on hover */}
                <div className="card-bg-image"
                  style={{
                    position: 'absolute', inset: 0,
                    backgroundImage: `url("${svc.bgImage}")`,
                    backgroundSize: 'cover', backgroundPosition: 'center',
                    opacity: 0, transition: 'opacity 0.7s ease', zIndex: 0
                  }} />

                {/* Gradient overlay - turns dark on hover */}
                <div className="card-gradient"
                  style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to bottom, #fff 0%, rgba(255,255,255,0.95) 100%)',
                    transition: 'all 0.5s ease', zIndex: 1
                  }} />

                {/* Number Accent */}
                <span className="card-number"
                  style={{
                    position: 'absolute', top: '-1rem', right: '1rem',
                    fontSize: '10rem', fontWeight: 900,
                    fontFamily: 'var(--font-display)', color: '#E53935',
                    transition: 'color 0.5s ease', pointerEvents: 'none', zIndex: 1
                  }}>
                  {svc.number}
                </span>

                {/* Icon Container */}
                <div className="card-icon-box"
                  style={{
                    width: '60px', height: '60px', borderRadius: '12px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'rgba(229,57,53,0.1)', color: '#E53935',
                    marginBottom: '2.5rem', position: 'relative',
                    transition: 'all 0.5s ease', zIndex: 2
                  }}>
                  <svc.icon size={28} />
                </div>

                {/* Title */}
                <h3 className="text-switch"
                  style={{
                    fontFamily: 'var(--font-display)', fontSize: '2.5rem',
                    fontWeight: 800, color: 'var(--color-text-dark)',
                    marginBottom: '1.5rem', position: 'relative',
                    transition: 'color 0.5s ease', zIndex: 2
                  }}>
                  {svc.title}
                </h3>

                {/* Description */}
                <p className="text-desc-switch"
                  style={{
                    color: 'var(--color-gray-mid)', fontSize: '1.1rem',
                    lineHeight: 1.7, marginBottom: '2.5rem', maxWidth: '90%',
                    position: 'relative', transition: 'color 0.5s ease', zIndex: 2
                  }}>
                  {svc.description}
                </p>

                {/* Features */}
                <div style={{ marginBottom: '3rem', position: 'relative', zIndex: 2 }}>
                  <p className="text-switch"
                    style={{
                      fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase',
                      color: 'var(--color-text-dark)', letterSpacing: '0.1em',
                      marginBottom: '1.25rem', transition: 'color 0.5s ease'
                    }}>
                    Incluye:
                  </p>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {svc.features.map((f, j) => (
                      <li key={j} className="text-desc-switch"
                        style={{
                          display: 'flex', alignItems: 'center', gap: '0.75rem',
                          fontSize: '0.95rem', color: 'var(--color-gray-mid)',
                          transition: 'color 0.5s ease'
                        }}>
                        <CheckCircle size={16} color="#E53935" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Link */}
                <Link to={svc.link} className="card-cta"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '1rem',
                    color: '#E53935', fontWeight: 800, fontSize: '0.9rem',
                    textDecoration: 'none', textTransform: 'uppercase',
                    letterSpacing: '0.1em', position: 'relative',
                    transition: 'color 0.5s ease', zIndex: 2
                  }}>
                  <span>{svc.cta}</span>
                  <ArrowRight size={18} />
                </Link>

                {/* Red Accent Bar */}
                <div className="card-accent-bar"
                  style={{
                    position: 'absolute', bottom: 0, left: 0, height: '4px',
                    width: '0%', background: '#E53935',
                    transition: 'width 0.5s var(--ease-expo)', zIndex: 10
                  }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          S3 — FEATURES/PILLS  (WHITE tinted)
      ══════════════════════════════════════════════ */}
      <section style={{
        background: 'var(--color-black)',
        padding: 'clamp(5rem, 8vw, 10rem) 0',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background Pattern */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundSize: '100px 100px',
          backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)',
          opacity: 0.5,
          zIndex: 0
        }} />

        <div ref={featRef} className="max-w-[1800px] mx-auto px-6 lg:px-12" style={{ position: 'relative', zIndex: 1 }}>
          <div className="section-header" style={{ marginBottom: '6rem', position: 'relative' }}>
            {/* Elemento decorativo brutalista */}
            <div style={{ position: 'absolute', left: '-2rem', top: '-1rem', fontSize: '10rem', fontWeight: 900, color: 'rgba(255,255,255,0.02)', fontFamily: 'var(--font-display)', pointerEvents: 'none', lineHeight: 0.8 }}>
              #VD
            </div>

            <p className="section-label" style={{ color: '#E53935', letterSpacing: '0.4em', fontWeight: 800 }}>VALOR DIFERENCIAL</p>
            <h2 className="section-title" style={{ color: '#fff', fontSize: 'clamp(3rem, 6vw, 4.5rem)', textTransform: 'uppercase', lineHeight: 1 }}>
              Por qué <br />
              <span style={{ color: '#E53935', display: 'inline-block', marginTop: '1rem' }}>Elegirnos</span>
            </h2>
            <div style={{ width: '80px', height: '6px', background: '#E53935', marginTop: '2.5rem' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '2rem' }}>
            {features.map((feat, i) => (
              <div key={i} className="svc-feature-pill group relative overflow-hidden" style={{
                background: 'rgba(15, 15, 15, 0.9)',
                border: '1px solid rgba(255,255,255,0.05)',
                padding: '4rem 3rem',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '2rem',
                transition: 'all 0.5s var(--ease-expo)',
                cursor: 'pointer',
              }}
                onMouseEnter={e => {
                  const target = e.currentTarget as HTMLElement;
                  target.style.background = '#111';
                  target.style.borderColor = '#E53935';
                  target.style.transform = 'translateY(-10px) scale(1.02)';
                  target.style.boxShadow = '0 20px 40px rgba(229,57,53,0.15)';

                  // Reveal corner accent
                  const corner = target.querySelector('.corner-accent') as HTMLElement;
                  if (corner) corner.style.opacity = '1';
                }}
                onMouseLeave={e => {
                  const target = e.currentTarget as HTMLElement;
                  target.style.background = 'rgba(15, 15, 15, 0.9)';
                  target.style.borderColor = 'rgba(255,255,255,0.05)';
                  target.style.transform = 'translateY(0) scale(1)';
                  target.style.boxShadow = 'none';

                  // Hide corner accent
                  const corner = target.querySelector('.corner-accent') as HTMLElement;
                  if (corner) corner.style.opacity = '0';
                }}>

                {/* Brutalist Corner Accent */}
                <div className="corner-accent" style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '60px',
                  height: '60px',
                  background: 'linear-gradient(135deg, transparent 50%, #E53935 50%)',
                  opacity: 0,
                  transition: 'opacity 0.4s var(--ease-expo)'
                }} />

                {/* Gran número de fondo decorativo */}
                <span style={{
                  position: 'absolute',
                  bottom: '-1rem',
                  right: '1rem',
                  fontSize: '8rem',
                  fontWeight: 900,
                  color: 'rgba(255,255,255,0.02)',
                  fontFamily: 'var(--font-display)',
                  pointerEvents: 'none'
                }}>
                  0{i + 1}
                </span>

                <div style={{
                  width: '70px', height: '70px',
                  background: '#E53935',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff',
                  flexShrink: 0,
                  position: 'relative',
                  zIndex: 2,
                  boxShadow: '4px 4px 0 rgba(255,255,255,1)'
                }}>
                  <feat.icon size={32} />
                </div>

                <div style={{ position: 'relative', zIndex: 2 }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.6rem', color: '#fff', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {feat.label}
                  </h3>
                  <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>
                    {feat.sub}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          S4 — PROCESS TIMELINE  (WHITE / Brutalist)
      ══════════════════════════════════════════════ */}
      <section className="section-light" style={{ padding: 'clamp(6rem, 10vw, 12rem) 0' }}>
        <div ref={processRef} className="max-w-[1800px] mx-auto px-6 lg:px-12">
          <div className="section-header" style={{ marginBottom: '6rem' }}>
            <p className="section-label" style={{ color: '#E53935', letterSpacing: '0.3em' }}>NUESTRO MÉTODO</p>
            <h2 className="section-title" style={{ color: 'var(--color-text-dark)', fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
              Proceso de <span>Optimización</span>
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1px', background: 'rgba(0,0,0,0.05)', border: '1px solid rgba(0,0,0,0.05)' }}>
            {process.map((step, i) => (
              <div key={i} className="svc-process-step group" style={{
                padding: '4rem 3rem',
                background: '#fff',
                transition: 'all 0.4s var(--ease-expo)',
                position: 'relative',
                overflow: 'hidden'
              }}
                onMouseEnter={e => {
                  const target = e.currentTarget as HTMLElement;
                  target.style.background = '#fafafa';
                  const img = target.querySelector('.step-bg-img') as HTMLElement;
                  if (img) img.style.opacity = '1';
                  if (img) img.style.filter = 'grayscale(0%)';

                  const num = target.querySelector('.step-num') as HTMLElement;
                  if (num) num.style.color = '#fff';

                  const title = target.querySelector('.step-title') as HTMLElement;
                  if (title) title.style.color = '#fff';

                  const desc = target.querySelector('.step-desc') as HTMLElement;
                  if (desc) desc.style.color = 'rgba(255,255,255,0.9)';
                }}
                onMouseLeave={e => {
                  const target = e.currentTarget as HTMLElement;
                  target.style.background = '#fff';
                  const img = target.querySelector('.step-bg-img') as HTMLElement;
                  if (img) img.style.opacity = '0';
                  if (img) img.style.filter = 'grayscale(100%)';

                  const num = target.querySelector('.step-num') as HTMLElement;
                  if (num) num.style.color = '#E53935';

                  const title = target.querySelector('.step-title') as HTMLElement;
                  if (title) title.style.color = 'var(--color-text-dark)';

                  const desc = target.querySelector('.step-desc') as HTMLElement;
                  if (desc) desc.style.color = 'var(--color-gray-mid)';
                }}>

                {/* Imagen de fondo revelada al hover */}
                <div className="step-bg-img" style={{
                  position: 'absolute', inset: 0,
                  backgroundImage: `linear-gradient(rgba(229,57,53,0.8), rgba(10,10,10,0.9)), url("${step.bgImg}")`,
                  backgroundSize: 'cover', backgroundPosition: 'center',
                  opacity: 0,
                  transition: 'all 0.5s ease',
                  zIndex: 0
                }} />

                <div className="step-num" style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '8rem',
                  fontWeight: 900,
                  color: '#E53935', // ROJO PERMANENTE POR DEFECTO
                  lineHeight: 0.8,
                  position: 'absolute',
                  top: '-1rem',
                  right: '1rem',
                  transition: 'all 0.4s ease',
                  pointerEvents: 'none',
                  zIndex: 1
                }}>{step.number}</div>

                <div style={{ position: 'relative', zIndex: 2, marginTop: '5rem' }}>
                  <img src={step.bgImg} alt={step.title} style={{ width: '100%', height: '180px', objectFit: 'cover', marginBottom: '2rem', filter: 'grayscale(100%) brightness(0.9)', boxShadow: '10px 10px 0 rgba(0,0,0,0.05)' }} />

                  <h3 className="step-title" style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.8rem',
                    fontWeight: 900,
                    textTransform: 'uppercase',
                    color: 'var(--color-text-dark)',
                    marginBottom: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    transition: 'all 0.4s ease'
                  }}>
                    {step.title}
                  </h3>
                  <p className="step-desc" style={{ color: 'var(--color-gray-mid)', lineHeight: 1.7, fontSize: '1rem', transition: 'all 0.4s ease' }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          S5 — BENEFITS + REAL PHOTO  (WHITE)
      ══════════════════════════════════════════════ */}
      <section style={{
        background: 'var(--color-black)', // FONDO NEGRO EXTREMO
        padding: 'clamp(6rem, 10vw, 12rem) 0',
        overflow: 'hidden',
        color: '#fff' // COLOR TEXTO BASE BLANCO
      }}>
        <div ref={benefRef} className="max-w-[1800px] mx-auto px-6 lg:px-12">
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 1fr',
            gap: '6rem',
            alignItems: 'center',
          }}>
            {/* Left: benefits list */}
            <div>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, letterSpacing: '0.4em', color: '#E53935', textTransform: 'uppercase', display: 'block', marginBottom: '1.5rem' }}>POR QUÉ NOSOTROS</span>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(3rem, 6vw, 4.5rem)',
                fontWeight: 900,
                color: '#fff', // TITULO PRINCIPAL MODO OSCURO
                lineHeight: 1,
                marginBottom: '3.5rem',
                letterSpacing: '-0.02em'
              }}>
                El impacto de un <br />
                <span style={{ color: '#E53935' }}>Asesoramiento Real</span>
              </h2>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                {benefits.map((item, i) => (
                  <div key={i} className="svc-benefit-item" style={{
                    padding: '2rem',
                    background: 'rgba(255,255,255,0.03)', // LIGERA TRANSPARENCIA OSCURA
                    border: '1px solid rgba(255,255,255,0.05)',
                    borderLeft: '4px solid #E53935',
                    transition: 'all 0.3s ease'
                  }}
                    onMouseEnter={e => {
                      const target = e.currentTarget as HTMLElement;
                      target.style.background = 'rgba(229,57,53,0.1)';
                    }}
                    onMouseLeave={e => {
                      const target = e.currentTarget as HTMLElement;
                      target.style.background = 'rgba(255,255,255,0.03)';
                    }}
                  >
                    <CheckCircle size={20} style={{ color: '#E53935', marginBottom: '1rem' }} />
                    <p style={{
                      color: 'rgba(255,255,255,0.85)',
                      fontWeight: 700,
                      fontSize: '1rem',
                      lineHeight: 1.4
                    }}>{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: real photo with creative framing */}
            <div style={{ position: 'relative' }}>
              <div style={{
                position: 'relative',
                zIndex: 2,
                borderRadius: '4px',
                overflow: 'hidden',
                aspectRatio: '1',
                boxShadow: '40px 40px 0px rgba(229,57,53,0.05)',
              }}>
                <img
                  src="/images/service-energy.jpg"
                  alt="Ahorra en energía y telecomunicaciones"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              {/* Floating large text background - NOW BLACK */}
              <div style={{
                position: 'absolute',
                top: '-2rem',
                right: '-2rem',
                fontSize: '12rem',
                fontWeight: 900,
                color: 'rgba(0,0,0,0.1)', // COLOR NEGRO VISIBLE
                fontFamily: 'var(--font-display)',
                lineHeight: 1,
                zIndex: 1,
                pointerEvents: 'none'
              }}>40%</div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          S6 — ANTES vs DESPUÉS
      ══════════════════════════════════════════════ */}
      <section className="section-light" style={{
        padding: 'clamp(6rem, 10vw, 12rem) 0',
        background: '#f8f8f8'
      }}>
        <div ref={compRef} className="max-w-[1800px] mx-auto px-6 lg:px-12">
          <div className="section-header" style={{ marginBottom: '6rem', textAlign: 'center' }}>
            <p className="section-label" style={{ color: '#E53935', letterSpacing: '0.4em' }}>DEMOSTRACIÓN</p>
            <h2 className="section-title" style={{ color: 'var(--color-text-dark)', fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
              Resultados <span>Tangibles</span>
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            maxWidth: '1200px',
            margin: '0 auto',
            alignItems: 'stretch',
          }}>
            <div className="comp-before" style={{
              background: '#fff',
              padding: '5rem 3rem',
              border: '1px solid rgba(0,0,0,0.05)',
              position: 'relative'
            }}>
              <div style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', color: '#E53935', fontWeight: 900, fontSize: '0.8rem', letterSpacing: '0.2em' }}>BEFORE</div>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '5rem',
                  fontWeight: 900,
                  color: '#111', // NUMERO NEGRO SOLIDO
                  textDecoration: 'line-through',
                  textDecorationColor: '#E53935',
                  textDecorationThickness: '4px',
                  lineHeight: 1,
                  marginBottom: '1rem'
                }}>120€</div>
                <p style={{ color: '#111', fontSize: '1rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Gasto Mensual</p>
              </div>

              <div style={{ marginTop: '4rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {['Tarifas desactualizadas', 'Sin soporte experto', 'Consumo ineficiente'].map((t, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: '#111' }}> {/* TEXTO NEGRO 100% VISIBLE */}
                    <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#ffeded', border: '1px solid #E53935', color: '#E53935', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 900 }}>✕</div>
                    <span style={{ fontSize: '1rem', fontWeight: 600 }}>{t}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="comp-after" style={{
              background: 'var(--color-black)',
              padding: '5rem 3rem',
              border: '1px solid var(--color-primary)',
              position: 'relative',
              boxShadow: '0 30px 60px rgba(229,57,53,0.15)'
            }}>
              <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', color: '#E53935', fontWeight: 900, fontSize: '0.8rem', letterSpacing: '0.2em' }}>AFTER</div>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '6rem',
                  fontWeight: 900,
                  color: '#E53935',
                  lineHeight: 1,
                  marginBottom: '1rem'
                }}>65€</div>
                <p style={{ color: '#fff', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Ahorro Máximo</p>
              </div>

              <div style={{ marginTop: '4rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {['Auditoría completa', 'Tarifas exclusivas', 'Soporte prioritario'].map((t, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: '#fff' }}>
                    <CheckCircle size={20} style={{ color: '#E53935' }} />
                    <span style={{ fontSize: '0.95rem', fontWeight: 600 }}>{t}</span>
                  </div>
                ))}
              </div>

              <div style={{
                marginTop: '4rem',
                padding: '1.5rem',
                background: 'rgba(229,57,53,0.1)',
                border: '1px dashed rgba(229,57,53,0.3)',
                textAlign: 'center'
              }}>
                <span style={{ color: '#E53935', fontSize: '1.5rem', fontWeight: 900 }}>− 46%</span>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.7rem', textTransform: 'uppercase', marginTop: '0.25rem' }}>Reducción de coste</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          S7 — BRUTALIST CTA
      ══════════════════════════════════════════════ */}
      <section ref={ctaRef} style={{
        background: '#E53935',
        position: 'relative',
        padding: 'clamp(8rem, 15vw, 15rem) 0',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: '-20%',
          right: '-5%',
          fontSize: '40vw',
          fontWeight: 900,
          color: 'rgba(0,0,0,0.06)',
          fontFamily: 'var(--font-display)',
          lineHeight: 0.8,
          pointerEvents: 'none',
          zIndex: 0
        }}>?</div>

        <div className="max-w-[1800px] mx-auto px-6 lg:px-12 position-relative" style={{ zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '4rem', alignItems: 'center' }}>
            <div>
              <p style={{ fontSize: '0.9rem', fontWeight: 900, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#111', marginBottom: '2rem' }}>
                — EMPIEZA HOY, ES GRATIS
              </p>
              <h2 className="cta-service-content" style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                fontWeight: 900,
                color: '#fff',
                lineHeight: 1.1,
                textTransform: 'uppercase',
                marginBottom: '2rem'
              }}>
                ¿EMPEZAMOS<br />
                <span style={{ color: '#111' }}>A AHORRAR?</span>
              </h2>
            </div>

            <div className="cta-service-content" style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
              <p style={{
                fontSize: '1.35rem',
                color: 'rgba(255,255,255,0.95)',
                lineHeight: 1.6,
                maxWidth: '600px',
                fontWeight: 500
              }}>
                Contacta con nosotros y descubre cuánto puedes ahorrar. El análisis es gratuito y sin compromiso.
              </p>
              <Link to="/contacto" className="group" style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: '#111',
                color: '#fff',
                padding: '1.5rem 3rem',
                fontSize: '1.1rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                textDecoration: 'none',
                width: 'fit-content',
                transition: 'all 0.4s var(--ease-expo)',
                boxShadow: '15px 15px 0 rgba(255,255,255,1)'
              }}
                onMouseEnter={e => {
                  const target = e.currentTarget as HTMLElement;
                  target.style.transform = 'translate(5px, 5px)';
                  target.style.boxShadow = '10px 10px 0 rgba(255,255,255,1)';
                }}
                onMouseLeave={e => {
                  const target = e.currentTarget as HTMLElement;
                  target.style.transform = 'translate(0, 0)';
                  target.style.boxShadow = '15px 15px 0 rgba(255,255,255,1)';
                }}>
                <span>Solicitar análisis</span>
                <Phone size={24} style={{ marginLeft: '2rem', color: '#E53935' }} />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Servicios;
