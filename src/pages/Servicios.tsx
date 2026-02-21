import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Wifi, Zap, Phone, Shield,
  CheckCircle, TrendingUp, Clock, Headphones, Star
} from 'lucide-react';
import SplitType from 'split-type';
import { allTestimonials } from '../data/testimonials';

gsap.registerPlugin(ScrollTrigger);

interface ServiciosProps {
  isLoaded: boolean;
}

const Servicios = ({ isLoaded }: ServiciosProps) => {
  const pageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const featRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const benefRef = useRef<HTMLDivElement>(null);
  const compRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);
  const testiRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isLoaded) return;

    const ctx = gsap.context(() => {

      // ── Hero header
      const title = headerRef.current?.querySelector<HTMLElement>('.page-header-title');
      if (title) {
        const sp = new SplitType(title, { types: 'words,chars' });
        gsap.fromTo(sp.chars,
          { y: '110%', opacity: 0 },
          { y: '0%', opacity: 1, duration: 0.8, stagger: 0.02, ease: 'power3.out', delay: 0.4 }
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

      // ── FAQ
      gsap.fromTo('.faq-item',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: faqRef.current, start: 'top 72%' }
        }
      );

      // ── Testimonials
      gsap.fromTo('.testimonial-card-brutal',
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: testiRef.current, start: 'top 72%' }
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

    }, pageRef);

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
    },
    {
      icon: Zap,
      number: '02',
      title: 'Energía',
      description: 'Optimiza tu factura eléctrica. Ahorra hasta un 40% con nuestro análisis gratuito. Trabajamos con las principales comercializadoras.',
      features: ['Análisis gratuito de consumo', 'Cambio de compañía gestionado', 'Tarifas adaptadas a tu perfil', 'Ahorro garantizado'],
      link: '/servicios/energia',
      cta: 'Ver energía',
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
    { number: '01', title: 'Contacto', desc: 'Nos cuentas tu situación actual y revisamos tus facturas.' },
    { number: '02', title: 'Análisis', desc: 'Estudiamos en detalle tu consumo y detectamos el ahorro posible.' },
    { number: '03', title: 'Propuesta', desc: 'Te presentamos las mejores opciones adaptadas a tu perfil.' },
    { number: '04', title: 'Gestión', desc: 'Nos encargamos de todos los trámites. Tú solo firmas.' },
  ];

  const benefits = [
    'Asesoramiento 100% gratuito sin compromiso',
    'Sin costes ocultos ni comisiones',
    'Acceso a tarifas exclusivas del mercado',
    'Gestión integral de todos los trámites',
    'Acompañamiento personalizado durante el proceso',
    'Resolución de incidencias post-contratación',
  ];

  const faq = [
    {
      question: '¿Cuánto tarda el cambio de compañía?',
      answer: 'Una vez firmado el contrato puede durar entre 5 y 20 días el cambio de comercializadora.'
    },
    {
      question: '¿Tengo que pagar algo por el cambio?',
      answer: 'No, el cambio es un trámite gratuito. Si sube o baja potencia inscrita sí hay un coste regulado por LEY.'
    },
    {
      question: '¿Cuánto puedo ahorrar realmente?',
      answer: 'Depende de tu tarifa actual y del estudio presentado por nuestro asesor. Toda la información la recibirás cuando un asesor se contacte contigo.'
    },
    {
      question: '¿Cuánto tarda la portabilidad?',
      answer: 'La portabilidad móvil es de 2 días hábiles sin contar festivos ni fines de semana.'
    },
    {
      question: '¿Pierdo mi número de teléfono?',
      answer: 'No. La portabilidad mantiene tu número. El cambio se realiza de madrugada entre las 3 y las 6 AM.'
    },
    {
      question: '¿Hay permanencia?',
      answer: 'Depende de la compañía. Algunas como O2 no tienen permanencia.'
    },
  ];

  const testimonials = [allTestimonials[0], allTestimonials[4], allTestimonials[10]];

  const toggleFaq = (index: number) => {
    document.querySelectorAll('.faq-item').forEach((item, i) => {
      if (i === index) item.classList.toggle('active');
      else item.classList.remove('active');
    });
  };

  return (
    <div ref={pageRef} className="overflow-hidden">

      {/* ══════════════════════════════════════════════
          S1 — HERO HEADER  (dark)
      ══════════════════════════════════════════════ */}
      <section ref={headerRef} className="page-header" style={{ position: 'relative', overflow: 'hidden' }}>
        {/* Subtle SVG grid */}
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.04, pointerEvents: 'none' }}
          viewBox="0 0 1200 500" preserveAspectRatio="none">
          {[80, 160, 240, 320, 400].map((y, i) => <line key={i} x1="0" y1={y} x2="1200" y2={y} stroke="#E53935" strokeWidth="1" />)}
          {[200, 400, 600, 800, 1000].map((x, i) => <line key={i} x1={x} y1="0" x2={x} y2="500" stroke="#E53935" strokeWidth="1" />)}
        </svg>

        <div className="max-w-[1800px] mx-auto px-6 lg:px-12" style={{ position: 'relative', zIndex: 2 }}>
          <p className="page-header-label">Servicios</p>
          <h1 className="page-header-title">
            Nuestros <span style={{ color: '#E53935' }}>servicios</span>
          </h1>
          <p className="page-header-subtitle">
            Ofrecemos asesoramiento integral en telecomunicaciones y energía.
            Gestionamos todo el proceso para que tú solo disfrutes del ahorro.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          S2 — SERVICE CARDS  (WHITE)
      ══════════════════════════════════════════════ */}
      <section className="section-light" style={{ padding: 'clamp(5rem, 9vw, 8rem) 0' }}>
        <div ref={cardsRef} className="max-w-[1800px] mx-auto px-6 lg:px-12">
          <div className="section-header" style={{ marginBottom: '3.5rem' }}>
            <p className="section-label">ESPECIALIDADES</p>
            <h2 className="section-title" style={{ color: 'var(--color-text-dark)' }}>
              Servicios <span>principales</span>
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2rem' }}>
            {mainServices.map((svc, i) => (
              <div key={i} className="svc-light-card service-card-light">
                <span className="service-number">{svc.number}</span>
                <div className="service-icon">
                  <svc.icon size={24} />
                </div>
                <h3>{svc.title}</h3>
                <p>{svc.description}</p>
                <ul className="feature-list">
                  {svc.features.map((f, j) => <li key={j}>{f}</li>)}
                </ul>
                <Link to={svc.link} style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                  color: 'var(--color-primary)', fontWeight: 700, fontSize: '0.9rem',
                  marginTop: '2rem', textDecoration: 'none',
                  transition: 'gap 0.3s ease',
                }}>
                  <span>{svc.cta}</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          S3 — FEATURES/PILLS  (WHITE tinted)
      ══════════════════════════════════════════════ */}
      <section style={{ background: 'var(--color-section-light-2)', padding: 'clamp(4rem, 7vw, 6rem) 0' }}>
        <div ref={featRef} className="max-w-[1800px] mx-auto px-6 lg:px-12">
          <div className="section-header" style={{ marginBottom: '3rem' }}>
            <p className="section-label">CARACTERÍSTICAS</p>
            <h2 className="section-title" style={{ color: 'var(--color-text-dark)' }}>
              Por qué <span>funciona</span>
            </h2>
          </div>

          {/* Grid of pill cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
            {features.map((feat, i) => (
              <div key={i} className="svc-feature-pill" style={{
                background: '#fff',
                border: '1px solid rgba(0,0,0,0.07)',
                borderRadius: '18px',
                padding: '1.75rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
                cursor: 'default',
              }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 30px rgba(0,0,0,0.09)';
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(229,57,53,0.25)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.transform = '';
                  (e.currentTarget as HTMLElement).style.boxShadow = '';
                  (e.currentTarget as HTMLElement).style.borderColor = '';
                }}
              >
                <div style={{
                  width: '42px', height: '42px',
                  background: 'rgba(229,57,53,0.08)',
                  borderRadius: '12px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#E53935',
                }}>
                  <feat.icon size={20} />
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem', color: 'var(--color-text-dark)' }}>
                    {feat.label}
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--color-gray-mid)', marginTop: '0.25rem', lineHeight: 1.5 }}>
                    {feat.sub}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          S4 — PROCESS TIMELINE  (WHITE)
      ══════════════════════════════════════════════ */}
      <section className="section-light" style={{ padding: 'clamp(5rem, 9vw, 8rem) 0' }}>
        <div ref={processRef} className="max-w-[1800px] mx-auto px-6 lg:px-12">
          <div className="section-header" style={{ marginBottom: '4rem' }}>
            <p className="section-label">METODOLOGÍA</p>
            <h2 className="section-title" style={{ color: 'var(--color-text-dark)' }}>
              Cómo <span>trabajamos</span>
            </h2>
          </div>

          <div style={{ display: 'flex', gap: '4rem', alignItems: 'flex-start' }}>
            {/* Left: animated vertical red line */}
            <div className="process-svg-line" style={{ flexShrink: 0 }}>
              <div className="process-svg-line-fill" />
            </div>

            <div style={{ flex: 1 }}>
              {process.map((step, i) => (
                <div key={i} className="svc-process-step" style={{
                  display: 'flex',
                  gap: '2rem',
                  alignItems: 'flex-start',
                  marginBottom: i < process.length - 1 ? '3rem' : 0,
                  padding: '1.75rem 2rem',
                  background: '#fff',
                  border: '1px solid rgba(0,0,0,0.06)',
                  borderRadius: '20px',
                  transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(229,57,53,0.25)';
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 24px rgba(0,0,0,0.07)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = '';
                    (e.currentTarget as HTMLElement).style.boxShadow = '';
                  }}
                >
                  <div style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '2.5rem',
                    fontWeight: 900,
                    color: '#E53935',
                    lineHeight: 1,
                    flexShrink: 0,
                    minWidth: '3rem',
                  }}>{step.number}</div>
                  <div>
                    <h3 style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.2rem',
                      fontWeight: 700,
                      color: 'var(--color-text-dark)',
                      marginBottom: '0.5rem',
                    }}>{step.title}</h3>
                    <p style={{ color: 'var(--color-gray-mid)', lineHeight: 1.7, fontSize: '0.95rem' }}>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          S5 — BENEFITS + REAL PHOTO  (WHITE)
      ══════════════════════════════════════════════ */}
      <section style={{ background: 'var(--color-section-light-2)', padding: 'clamp(5rem, 9vw, 8rem) 0' }}>
        <div ref={benefRef} className="max-w-[1800px] mx-auto px-6 lg:px-12">
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '5rem',
            alignItems: 'center',
          }}>
            {/* Left: benefits list */}
            <div>
              <span style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', color: '#E53935', textTransform: 'uppercase', display: 'block', marginBottom: '1rem' }}>VENTAJAS</span>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 800,
                color: 'var(--color-text-dark)',
                lineHeight: 1.2,
                marginBottom: '2.5rem',
              }}>
                Beneficios de<br /><span style={{ color: '#E53935' }}>trabajar con nosotros</span>
              </h2>

              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {benefits.map((item, i) => (
                  <li key={i} className="svc-benefit-item" style={{
                    display: 'flex',
                    gap: '0.75rem',
                    alignItems: 'flex-start',
                    padding: '1rem 1.25rem',
                    background: '#fff',
                    borderRadius: '12px',
                    border: '1px solid rgba(0,0,0,0.05)',
                    color: 'var(--color-text-dark)',
                    fontWeight: 500,
                    fontSize: '0.95rem',
                  }}>
                    <CheckCircle size={18} style={{ color: '#E53935', flexShrink: 0, marginTop: '2px' }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: real photo with overlay stat */}
            <div style={{ position: 'relative' }}>
              <div style={{
                borderRadius: '24px',
                overflow: 'hidden',
                aspectRatio: '4/3',
                boxShadow: '0 30px 60px rgba(0,0,0,0.1)',
              }}>
                <img
                  src="/images/service-energy.jpg"
                  alt="Ahorra en energía y telecomunicaciones"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                {/* Overlay gradient */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(135deg, rgba(229,57,53,0.25) 0%, transparent 60%)',
                }} />
              </div>

              {/* Floating stat card: 40% */}
              <div style={{
                position: 'absolute',
                bottom: '-1.5rem',
                right: '-1.5rem',
                background: '#E53935',
                color: '#fff',
                borderRadius: '20px',
                padding: '1.75rem 2rem',
                boxShadow: '0 20px 40px rgba(229,57,53,0.3)',
                textAlign: 'center',
              }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 900, lineHeight: 1 }}>40%</div>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, opacity: 0.85, marginTop: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Ahorro promedio
                </div>
              </div>

              {/* Top-left floating card */}
              <div style={{
                position: 'absolute',
                top: '-1.5rem',
                left: '-1.5rem',
                background: '#fff',
                borderRadius: '16px',
                padding: '1.25rem 1.5rem',
                boxShadow: '0 12px 30px rgba(0,0,0,0.1)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
              }}>
                <div style={{ width: '36px', height: '36px', background: 'rgba(229,57,53,0.1)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#E53935' }}>
                  <CheckCircle size={18} />
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.9rem', color: 'var(--color-text-dark)' }}>Sin coste</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-gray-mid)' }}>Análisis gratuito</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          S6 — ANTES vs DESPUÉS — RUPTURA  (WHITE)
      ══════════════════════════════════════════════ */}
      <section className="section-light" style={{ padding: 'clamp(5rem, 9vw, 8rem) 0' }}>
        <div ref={compRef} className="max-w-[1800px] mx-auto px-6 lg:px-12">
          <div className="section-header" style={{ marginBottom: '4rem' }}>
            <p className="section-label">RESULTADOS REALES</p>
            <h2 className="section-title" style={{ color: 'var(--color-text-dark)' }}>
              Antes <span>vs</span> Después
            </h2>
          </div>

          {/* Split comparison */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto 1fr',
            gap: '0',
            maxWidth: '860px',
            margin: '0 auto',
            alignItems: 'stretch',
            borderRadius: '24px',
            overflow: 'hidden',
            boxShadow: '0 24px 60px rgba(0,0,0,0.1)',
          }}>
            {/* BEFORE */}
            <div className="comp-before" style={{
              background: '#f5f5f5',
              padding: '3rem 2.5rem',
              textAlign: 'center',
              borderRight: '1px solid rgba(0,0,0,0.06)',
            }}>
              <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#999', marginBottom: '1.5rem' }}>ANTES</p>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: '4rem',
                fontWeight: 900,
                color: '#ccc',
                textDecoration: 'line-through',
                lineHeight: 1,
              }}>120€</div>
              <p style={{ color: '#aaa', marginTop: '1rem', fontSize: '0.9rem' }}>Factura mensual promedio</p>
              <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {['Tarifa de mercado libre', 'Sin asesoramiento', 'Soporte limitado'].map((t, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#bbb', fontSize: '0.85rem', justifyContent: 'center' }}>
                    <span style={{ width: '18px', height: '18px', borderRadius: '50%', background: '#e5e5e5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem', color: '#999' }}>✗</span>
                    {t}
                  </div>
                ))}
              </div>
            </div>

            {/* Divider with VS badge */}
            <div style={{
              background: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0 1.5rem',
              position: 'relative',
              zIndex: 2,
            }}>
              <div style={{
                width: '52px',
                height: '52px',
                background: '#E53935',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-display)',
                fontWeight: 900,
                fontSize: '0.9rem',
                color: '#fff',
                boxShadow: '0 8px 24px rgba(229,57,53,0.4)',
              }}>VS</div>
            </div>

            {/* AFTER */}
            <div className="comp-after" style={{
              background: '#fff',
              padding: '3rem 2.5rem',
              textAlign: 'center',
              border: '2px solid #E53935',
              position: 'relative',
            }}>
              <div style={{
                position: 'absolute', top: '1rem', right: '1rem',
                background: '#E53935',
                color: '#fff',
                fontSize: '0.7rem',
                fontWeight: 700,
                padding: '0.3rem 0.75rem',
                borderRadius: '20px',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}>− 46%</div>
              <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#E53935', marginBottom: '1.5rem' }}>DESPUÉS</p>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: '4rem',
                fontWeight: 900,
                color: '#E53935',
                lineHeight: 1,
              }}>65€</div>
              <p style={{ color: 'var(--color-gray-mid)', marginTop: '1rem', fontSize: '0.9rem' }}>Factura mensual con nosotros</p>
              <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {['Tarifa exclusiva negociada', 'Asesor personal asignado', 'Soporte 6 días a la semana'].map((t, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-dark)', fontSize: '0.85rem', fontWeight: 500 }}>
                    <CheckCircle size={16} style={{ color: '#E53935', flexShrink: 0 }} />
                    {t}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          S7 — FAQ  (dark)
      ══════════════════════════════════════════════ */}
      <section ref={faqRef} className="section-awwards faq-section">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
          <div className="section-header">
            <p className="section-label">Preguntas frecuentes</p>
            <h2 className="section-title">Resolvemos tus <span>dudas</span></h2>
          </div>
          <div className="faq-list">
            {faq.map((item, i) => (
              <div key={i} className="faq-item">
                <button className="faq-question" onClick={() => toggleFaq(i)}>
                  <span>{item.question}</span>
                  <span className="faq-icon">+</span>
                </button>
                <div className="faq-answer"><p>{item.answer}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          S8 — TESTIMONIALS  (dark)
      ══════════════════════════════════════════════ */}
      <section ref={testiRef} className="section-awwards testimonials-section">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
          <div className="section-header">
            <p className="section-label">Google Reviews</p>
            <h2 className="section-title">Casos reales de <span>éxito</span></h2>
          </div>
          <div className="testimonials-grid">
            {testimonials.map((t, i) => (
              <div key={i} className="testimonial-card-brutal">
                <div className="google-review-badge">
                  <svg width="20" height="20" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  </svg>
                  <span style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Opinión Real</span>
                </div>
                <div className="google-review-stars">
                  {[...Array(5)].map((_, j) => <Star key={j} size={14} fill="#FBBC05" stroke="none" />)}
                </div>
                <div className="testimonial-quote-google">"</div>
                <p className="testimonial-text-google">{t.text}</p>
                <div className="testimonial-author-google">
                  <div className="testimonial-avatar-google">{t.name.charAt(0)}</div>
                  <div className="testimonial-info-google">
                    <span className="testimonial-name-google">{t.name}</span>
                    <span className="testimonial-role-google">{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          S9 — CTA  (dark)
      ══════════════════════════════════════════════ */}
      <section ref={ctaRef} className="cta-section">
        <div className="cta-service-content cta-content">
          <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '1rem' }}>
            — Empieza hoy, es gratis —
          </p>
          <h2 className="cta-title">¿Empezamos<br />a ahorrar?</h2>
          <p className="cta-text">
            Contacta con nosotros y descubre cuánto puedes ahorrar.
            El análisis es gratuito y sin compromiso.
          </p>
          <Link to="/contacto" className="cta-button">
            <Phone size={20} />
            <span>Solicitar análisis gratuito</span>
          </Link>
        </div>
      </section>

    </div>
  );
};

export default Servicios;
