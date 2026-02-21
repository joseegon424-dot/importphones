import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Shield, Clock, TrendingUp, CheckCircle, Headphones, Star, Leaf } from 'lucide-react';
import SplitType from 'split-type';
import { allTestimonials } from '../data/testimonials';

gsap.registerPlugin(ScrollTrigger);

interface ServiciosEnergiaProps { isLoaded: boolean; }

const ServiciosEnergia = ({ isLoaded }: ServiciosEnergiaProps) => {
  const pageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const providersRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const savingsRef = useRef<HTMLDivElement>(null);
  const testiRef = useRef<HTMLDivElement>(null);
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

      // Lightning bolt SVG
      gsap.fromTo('.en-bolt-path',
        { strokeDashoffset: 1500 },
        { strokeDashoffset: 0, duration: 2.2, ease: 'power2.out', stagger: 0.1, delay: 0.3 }
      );
      gsap.fromTo('.en-glow',
        { opacity: 0 },
        { opacity: 0.6, duration: 1.2, yoyo: true, repeat: -1, ease: 'sine.inOut', delay: 2 }
      );

      // Hero stat numbers count-up
      const statEls = pageRef.current?.querySelectorAll<HTMLElement>('.en-hero-stat');
      statEls?.forEach((el) => {
        const target = parseFloat(el.dataset.target || '0');
        const suffix = el.dataset.suffix || '';
        const counter = { val: 0 };
        gsap.to(counter, {
          val: target, duration: 2, ease: 'power2.out', delay: 1.2,
          onUpdate: () => { el.textContent = Math.round(counter.val) + suffix; },
        });
      });

      // ── Services
      gsap.fromTo('.en-service-card',
        { y: 80, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.85, stagger: 0.2, ease: 'power3.out',
          scrollTrigger: { trigger: servicesRef.current, start: 'top 70%' }
        }
      );
      gsap.fromTo('.en-services-img',
        { x: 60, opacity: 0, scale: 0.95 },
        {
          x: 0, opacity: 1, scale: 1, duration: 1.1, ease: 'power3.out',
          scrollTrigger: { trigger: servicesRef.current, start: 'top 65%' }
        }
      );

      // ── Providers
      gsap.fromTo('.en-provider-item',
        { scale: 0.8, opacity: 0 },
        {
          scale: 1, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'back.out(1.5)',
          scrollTrigger: { trigger: providersRef.current, start: 'top 72%' }
        }
      );

      // ── Benefits
      gsap.fromTo('.en-benefit-card',
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: benefitsRef.current, start: 'top 72%' }
        }
      );
      gsap.fromTo('.en-benefit-img',
        { x: 60, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1.1, ease: 'power3.out',
          scrollTrigger: { trigger: benefitsRef.current, start: 'top 65%' }
        }
      );

      // ── Process
      gsap.fromTo('.en-process-step',
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

      // ── Savings section: count-up on numbers
      const savingNums = savingsRef.current?.querySelectorAll<HTMLElement>('.en-saving-num');
      savingNums?.forEach((el) => {
        const target = parseFloat(el.dataset.target || '0');
        const suffix = el.dataset.suffix || '';
        const counter = { val: 0 };
        gsap.to(counter, {
          val: target, duration: 2, ease: 'power2.out',
          scrollTrigger: { trigger: savingsRef.current, start: 'top 70%', once: true },
          onUpdate: () => { el.textContent = Math.round(counter.val) + suffix; },
        });
      });
      gsap.fromTo('.en-savings-card',
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: savingsRef.current, start: 'top 70%' }
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

      // ── FAQ
      gsap.fromTo('.faq-item',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, stagger: 0.09, ease: 'power3.out',
          scrollTrigger: { trigger: faqRef.current, start: 'top 72%' }
        }
      );

      // ── CTA
      gsap.fromTo('.cta-energy-content',
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
      icon: Zap, number: '01',
      title: 'Análisis de Consumo',
      description: 'Estudiamos tu histórico de consumo y te mostramos oportunidades de ahorro reales.',
      features: ['Estudio gratuito', 'Sin compromiso', 'estudios real y detallado por nuestro asesor en menos de 24h'],
    },
    {
      icon: TrendingUp, number: '02',
      title: 'Cambio de Compañía',
      description: 'Gestionamos el cambio a la comercializadora que mejor se adapte a tu perfil de consumo.',
      features: ['Trámites incluidos', 'Sin cortes de suministro', 'Acompañamiento total'],
    },
    {
      icon: Headphones, number: '03',
      title: 'Optimización Continua',
      description: 'Revision semestral , si el mercado nos ofrece alguna opcion mejor se contactara nuestro asesor para ofrecer la mejora y usted con el decidiran hacer el cambio de comercializadora',
      features: [],
    },
  ];

  const providers = [
    { name: 'Orange', logo: 'https://upload.wikimedia.org/wikipedia/commons/c/c8/Orange_logo.svg', color: '#FF6600' },
    { name: 'O2', logo: '/images/logo-o2-WJ0ZyWZ8.png', color: '#003087' },
    { name: 'Lowi', logo: '/images/logo_lowi_local.svg', color: '#6B21A8' },
    { name: 'Repsol', logo: '/images/repsol-logo-DmRPVn3o.png', color: '#006C35' },
    { name: 'Niba', logo: '/images/logo_niba_local.svg', color: '#E53935' },
    { name: 'Naturgy', logo: '/images/logo_naturgy_local.svg', color: '#00A859' },
  ];

  const benefits = [
    { icon: Star, title: 'Ahorro garantizado', desc: 'Hasta 40% menos en tu factura' },
    { icon: Shield, title: 'Sin sorpresas', desc: 'Tarifas transparentes siempre' },
    { icon: Clock, title: 'Rápido', desc: 'Cambio en 5-15 días' },
    { icon: Leaf, title: 'Opciones verdes', desc: 'Energía 100% renovable' },
  ];

  const process = [
    { number: '01', title: 'Análisis', desc: 'Estudiamos tu factura actual' },
    { number: '02', title: 'Propuesta', desc: 'Te presentamos opciones' },
    { number: '03', title: 'Cambio', desc: 'Gestionamos el trámite' },
    { number: '04', title: 'Ahorro', desc: 'Empiezas a pagar menos' },
  ];

  const testimonials = [allTestimonials[11], allTestimonials[12], allTestimonials[8]];

  const faq = [
    { question: '¿Cuánto tarda el cambio de compañía?', answer: 'Una vez firmado el contrato puede durar entre 5 y 20 días el cambio de comercializadora.' },
    { question: '¿Tengo que pagar algo por el cambio?', answer: 'No, el cambio es un trámite gratuito. Si sube o baja potencia inscrita sí hay un coste regulado por LEY.' },
    { question: '¿Cuánto puedo ahorrar realmente?', answer: 'Depende de su tarifa actual y del estudio presentado por nuestro asesor, pero toda esta información la tendrá cuando un asesor se contacte con usted.' },
    { question: '¿Cuánto tarda la portabilidad?', answer: 'La portabilidad móvil es de 2 días hábiles sin contar festivos ni fines de semana, una vez lanzada la ventana de cambio.' },
    { question: '¿Pierdo mi número de teléfono?', answer: 'La portabilidad móvil mantiene su mismo número de siempre y no se queda sin línea; el cambio siempre se realiza de madrugada entre las 3 y las 6 AM.' },
    { question: '¿Hay permanencia?', answer: 'Depende de la compañía; algunas no tienen permanencia, como por ejemplo O2.' },
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
          S1 — HERO  (dark + lightning SVG + hero stats)
      ══════════════════════════════════════════════ */}
      <section ref={headerRef} className="page-header" style={{ position: 'relative', overflow: 'hidden', paddingBottom: '5rem' }}>
        {/* Lightning bolt SVG */}
        <div className="hero-subpage-svg" aria-hidden="true">
          <svg viewBox="0 0 700 500" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path className="en-bolt-path" d="M390 60 L310 250 L370 250 L280 460 L450 220 L380 220 L460 60 Z" stroke="#E53935" strokeWidth="2" strokeDasharray="1500" strokeDashoffset="1500" fill="none" />
            <path className="en-glow en-bolt-path" d="M390 60 L310 250 L370 250 L280 460 L450 220 L380 220 L460 60 Z" fill="rgba(229,57,53,0.08)" strokeDasharray="1500" strokeDashoffset="1500" />
            <path className="en-bolt-path" d="M180 180 Q220 280 200 380" stroke="rgba(229,57,53,0.3)" strokeWidth="1.5" strokeDasharray="1500" strokeDashoffset="1500" />
            <path className="en-bolt-path" d="M520 180 Q480 280 500 380" stroke="rgba(229,57,53,0.3)" strokeWidth="1.5" strokeDasharray="1500" strokeDashoffset="1500" />
            <line className="en-bolt-path" x1="250" y1="300" x2="232" y2="316" stroke="rgba(229,57,53,0.5)" strokeWidth="1.5" strokeDasharray="1500" strokeDashoffset="1500" />
            <line className="en-bolt-path" x1="460" y1="320" x2="480" y2="306" stroke="rgba(229,57,53,0.5)" strokeWidth="1.5" strokeDasharray="1500" strokeDashoffset="1500" />
            <circle cx="350" cy="440" r="6" fill="rgba(229,57,53,0.3)" />
          </svg>
        </div>

        <div className="max-w-[1800px] mx-auto px-6 lg:px-12" style={{ position: 'relative', zIndex: 2 }}>
          <p className="page-header-label">Servicios</p>
          <h1 className="page-header-title">
            <span style={{ color: '#E53935' }}>Energía</span>
          </h1>
          <p className="page-header-subtitle">
            Optimiza tu factura eléctrica y ahorra hasta un 40%.
            Gestionamos el cambio de compañía sin cortes de suministro.
          </p>

          {/* Hero 3-stat bar */}
          <div style={{ display: 'flex', gap: '3rem', marginTop: '3rem', flexWrap: 'wrap' }}>
            {[
              { target: 40, suffix: '%', label: 'Ahorro medio' },
              { target: 5000, suffix: '+', label: 'Clientes activos' },
              { target: 15, suffix: ' días', label: 'Cambio máximo' },
            ].map((s, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <div className="en-hero-stat" data-target={s.target} data-suffix={s.suffix}
                  style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 900, color: '#E53935', lineHeight: 1 }}>
                  {s.target}{s.suffix}
                </div>
                <div style={{ fontSize: '0.72rem', color: '#666', textTransform: 'uppercase', letterSpacing: '0.12em' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          S2 — SERVICES  (WHITE) + image right
      ══════════════════════════════════════════════ */}
      <section className="section-light" style={{ padding: 'clamp(5rem,9vw,8rem) 0' }}>
        <div ref={servicesRef} className="max-w-[1800px] mx-auto px-6 lg:px-12">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '5rem', alignItems: 'flex-start' }}>
            <div>
              <p className="section-label">QUÉ OFRECEMOS</p>
              <h2 className="section-title" style={{ color: 'var(--color-text-dark)', marginBottom: '3rem' }}>
                Qué <span>ofrecemos</span>
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {services.map((svc, i) => (
                  <div key={i} className="en-service-card" style={{
                    background: '#fff', border: '1px solid rgba(0,0,0,0.06)',
                    borderRadius: '20px', padding: '2rem 2.5rem',
                    display: 'flex', gap: '1.75rem', alignItems: 'flex-start',
                    position: 'relative', overflow: 'hidden',
                    transition: 'transform 0.35s ease, box-shadow 0.35s ease, border-color 0.3s ease',
                  }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 16px 40px rgba(0,0,0,0.09)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(229,57,53,0.2)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ''; (e.currentTarget as HTMLElement).style.boxShadow = ''; (e.currentTarget as HTMLElement).style.borderColor = ''; }}
                  >
                    <span style={{ position: 'absolute', top: '0.5rem', right: '1.5rem', fontFamily: 'var(--font-display)', fontSize: '4.5rem', fontWeight: 900, color: 'rgba(0,0,0,0.04)', lineHeight: 1 }}>{svc.number}</span>
                    <div style={{ width: '48px', height: '48px', background: 'rgba(229,57,53,0.08)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#E53935', flexShrink: 0 }}>
                      <svc.icon size={22} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-text-dark)', marginBottom: '0.5rem' }}>{svc.title}</h3>
                      <p style={{ color: 'var(--color-gray-mid)', lineHeight: 1.7, fontSize: '0.93rem', marginBottom: svc.features.length ? '1rem' : 0 }}>{svc.description}</p>
                      {svc.features.length > 0 && (
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                          {svc.features.map((f, j) => (
                            <li key={j} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-dark)' }}>
                              <CheckCircle size={14} style={{ color: '#E53935', flexShrink: 0 }} /> {f}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: stacked energy image */}
            <div className="en-services-img" style={{ position: 'relative', paddingTop: '2rem' }}>
              <div style={{ borderRadius: '24px', overflow: 'hidden', aspectRatio: '3/4', boxShadow: '0 30px 60px rgba(0,0,0,0.12)' }}>
                <img src="/images/service-energy.jpg" alt="Servicios energía" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg, rgba(229,57,53,0.15) 0%, transparent 50%)' }} />
              </div>
              {/* Floating badge top */}
              <div style={{ position: 'absolute', top: '2rem', left: '-1.5rem', background: '#E53935', color: '#fff', borderRadius: '14px', padding: '1rem 1.25rem', boxShadow: '0 12px 30px rgba(229,57,53,0.35)' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 900, lineHeight: 1 }}>40%</div>
                <div style={{ fontSize: '0.7rem', opacity: 0.85, marginTop: '0.2rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Ahorro</div>
              </div>
              {/* Floating badge bottom */}
              <div style={{ position: 'absolute', bottom: '2rem', right: '-1.5rem', background: '#fff', borderRadius: '14px', padding: '1rem 1.25rem', boxShadow: '0 12px 30px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Leaf size={16} style={{ color: '#00A859' }} />
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.85rem', color: 'var(--color-text-dark)' }}>100% Verde</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--color-gray-mid)' }}>Energía renovable</div>
                </div>
              </div>
              {/* Dot grid decoration */}
              <div style={{ position: 'absolute', bottom: '-16px', left: '-16px', opacity: 0.1, display: 'flex', flexWrap: 'wrap', width: '80px', gap: '6px' }}>
                {[...Array(16)].map((_, i) => <div key={i} style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#E53935' }} />)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          S3 — PROVIDERS  (light-2)
      ══════════════════════════════════════════════ */}
      <section style={{ background: 'var(--color-section-light-2)', padding: 'clamp(4rem,7vw,6rem) 0' }}>
        <div ref={providersRef} className="max-w-[1800px] mx-auto px-6 lg:px-12">
          <div className="section-header" style={{ marginBottom: '3rem' }}>
            <p className="section-label">COMERCIALIZADORAS</p>
            <h2 className="section-title" style={{ color: 'var(--color-text-dark)' }}>
              Trabajamos con las <span>principales</span>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
            {providers.map((pv, i) => (
              <div key={i} className="en-provider-item" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{
                  width: '100%', background: '#fff',
                  border: '1px solid rgba(0,0,0,0.07)', borderRadius: '20px',
                  padding: '2.5rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  aspectRatio: '2/1', overflow: 'hidden',
                  transition: 'background 0.35s ease, transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease',
                }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = pv.color + '12';
                    el.style.borderColor = pv.color + '66';
                    el.style.transform = 'translateY(-4px)';
                    el.style.boxShadow = '0 12px 30px rgba(0,0,0,0.08)';
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = ''; el.style.borderColor = '';
                    el.style.transform = ''; el.style.boxShadow = '';
                  }}
                >
                  <img src={pv.logo} alt={pv.name} style={{ maxHeight: '48px', maxWidth: '80%', objectFit: 'contain', filter: 'grayscale(1) brightness(0.6)', transition: 'filter 0.35s ease' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.filter = 'none'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.filter = 'grayscale(1) brightness(0.6)'; }}
                  />
                </div>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-gray-mid)' }}>{pv.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          S4 — BENEFITS  (WHITE) + image right
      ══════════════════════════════════════════════ */}
      <section className="section-light" style={{ padding: 'clamp(5rem,9vw,8rem) 0' }}>
        <div ref={benefitsRef} className="max-w-[1800px] mx-auto px-6 lg:px-12">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>
            {/* Left: benefit cards */}
            <div>
              <p className="section-label">VENTAJAS</p>
              <h2 className="section-title" style={{ color: 'var(--color-text-dark)', marginBottom: '2.5rem' }}>
                Por qué optimizar tu <span>factura</span>
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                {benefits.map((b, i) => (
                  <div key={i} className="en-benefit-card" style={{
                    background: i % 2 === 0 ? '#fff' : 'rgba(229,57,53,0.03)',
                    border: '1px solid rgba(0,0,0,0.06)',
                    borderRadius: '18px', padding: '1.75rem',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 30px rgba(0,0,0,0.08)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ''; (e.currentTarget as HTMLElement).style.boxShadow = ''; }}
                  >
                    <div style={{ width: '40px', height: '40px', background: 'rgba(229,57,53,0.08)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#E53935', marginBottom: '1rem' }}>
                      <b.icon size={18} />
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, color: 'var(--color-text-dark)', marginBottom: '0.35rem' }}>{b.title}</h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--color-gray-mid)', lineHeight: 1.6 }}>{b.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: energy photo */}
            <div className="en-benefit-img" style={{ position: 'relative' }}>
              <div style={{ borderRadius: '24px', overflow: 'hidden', aspectRatio: '4/3', boxShadow: '0 30px 60px rgba(0,0,0,0.1)' }}>
                <img src="/images/service-energy-2.jpg" alt="Beneficios ahorro energía" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(229,57,53,0.15) 0%, transparent 60%)' }} />
              </div>
              {/* Corner decoration frame */}
              <div style={{ position: 'absolute', top: '-12px', right: '-12px', width: '80px', height: '80px', border: '3px solid #E53935', borderRadius: '20px', opacity: 0.35 }} />
              <div style={{ position: 'absolute', bottom: '-10px', left: '-10px', width: '55px', height: '55px', background: '#E53935', borderRadius: '14px', opacity: 0.12 }} />
              {/* Stat card */}
              <div style={{ position: 'absolute', top: '1.5rem', left: '-2rem', background: '#fff', borderRadius: '16px', padding: '1.25rem 1.5rem', boxShadow: '0 12px 30px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: '36px', height: '36px', background: 'rgba(0,168,89,0.1)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#00A859' }}>
                  <Leaf size={16} />
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.9rem', color: 'var(--color-text-dark)' }}>Energía verde</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--color-gray-mid)' }}>100% renovable</div>
                </div>
              </div>
              {/* Bottom stat */}
              <div style={{ position: 'absolute', bottom: '1.5rem', right: '-2rem', background: '#E53935', color: '#fff', borderRadius: '16px', padding: '1.25rem 1.5rem', boxShadow: '0 12px 30px rgba(229,57,53,0.3)' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 900, lineHeight: 1 }}>480€</div>
                <div style={{ fontSize: '0.68rem', opacity: 0.85, marginTop: '0.2rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Ahorro/año</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          S5 — PROCESS  (light-2) + image
      ══════════════════════════════════════════════ */}
      <section style={{ background: 'var(--color-section-light-2)', padding: 'clamp(5rem,9vw,8rem) 0' }}>
        <div ref={processRef} className="max-w-[1800px] mx-auto px-6 lg:px-12">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'flex-start' }}>
            {/* Left: process */}
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
                    <div key={i} className="en-process-step" style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', marginBottom: i < process.length - 1 ? '2rem' : 0, padding: '1.5rem 1.75rem', background: '#fff', border: '1px solid rgba(0,0,0,0.06)', borderRadius: '18px', transition: 'border-color 0.3s, box-shadow 0.3s' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(229,57,53,0.25)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 24px rgba(0,0,0,0.07)'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = ''; (e.currentTarget as HTMLElement).style.boxShadow = ''; }}
                    >
                      <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 900, color: '#E53935', lineHeight: 1, flexShrink: 0 }}>{step.number}</div>
                      <div>
                        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-text-dark)', marginBottom: '0.3rem' }}>{step.title}</h3>
                        <p style={{ color: 'var(--color-gray-mid)', fontSize: '0.9rem', lineHeight: 1.6 }}>{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: energy infrastructure image */}
            <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '1rem' }}>
              <div style={{ borderRadius: '24px', overflow: 'hidden', width: '100%', maxWidth: '400px', aspectRatio: '3/4', boxShadow: '0 30px 60px rgba(0,0,0,0.12)' }}>
                <img src="/images/service-energy-3.jpg" alt="Proceso cambio energía" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.4))' }} />
              </div>
              {/* Checklist overlay card */}
              <div style={{ position: 'absolute', bottom: '2rem', left: '0', background: '#fff', borderRadius: '16px', padding: '1.25rem 1.5rem', boxShadow: '0 16px 40px rgba(0,0,0,0.12)', minWidth: '200px' }}>
                {['Sin cortes', 'Sin papeleos', 'Gratis'].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-dark)', fontWeight: 600, fontSize: '0.88rem', marginBottom: i < 2 ? '0.6rem' : 0 }}>
                    <CheckCircle size={15} style={{ color: '#E53935', flexShrink: 0 }} /> {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          S6 — SAVINGS EXAMPLE  (WHITE)
      ══════════════════════════════════════════════ */}
      <section className="section-light" style={{ padding: 'clamp(5rem,9vw,8rem) 0' }}>
        <div ref={savingsRef} className="max-w-[1800px] mx-auto px-6 lg:px-12">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <p className="section-label">RESULTADOS REALES</p>
            <h2 className="section-title" style={{ color: 'var(--color-text-dark)' }}>
              Ejemplo de <span>ahorro real</span>
            </h2>
          </div>

          {/* Three cards: before / after / savings */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', maxWidth: '900px', margin: '0 auto' }}>
            {/* Before */}
            <div className="en-savings-card" style={{ background: '#f5f5f5', borderRadius: '24px', padding: '3rem 2rem', textAlign: 'center', border: '1px solid rgba(0,0,0,0.06)' }}>
              <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#999', marginBottom: '1.5rem' }}>FACTURA ACTUAL</p>
              <div className="en-saving-num" data-target="95" data-suffix="€" style={{ fontFamily: 'var(--font-display)', fontSize: '3.5rem', fontWeight: 900, color: '#ccc', textDecoration: 'line-through', lineHeight: 1 }}>95€</div>
              <p style={{ color: '#aaa', marginTop: '0.75rem', fontSize: '0.85rem' }}>Mensual</p>
            </div>

            {/* After */}
            <div className="en-savings-card" style={{ background: '#fff', borderRadius: '24px', padding: '3rem 2rem', textAlign: 'center', border: '2px solid #E53935', position: 'relative', boxShadow: '0 20px 50px rgba(229,57,53,0.1)' }}>
              <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: '#E53935', color: '#fff', fontSize: '0.65rem', fontWeight: 700, padding: '0.3rem 1rem', borderRadius: '20px', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>−42% ahorro</div>
              <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#E53935', marginBottom: '1.5rem' }}>CON NOSOTROS</p>
              <div className="en-saving-num" data-target="55" data-suffix="€" style={{ fontFamily: 'var(--font-display)', fontSize: '3.5rem', fontWeight: 900, color: '#E53935', lineHeight: 1 }}>55€</div>
              <p style={{ color: 'var(--color-gray-mid)', marginTop: '0.75rem', fontSize: '0.85rem' }}>Mensual</p>
            </div>

            {/* Savings */}
            <div className="en-savings-card" style={{ background: '#E53935', borderRadius: '24px', padding: '3rem 2rem', textAlign: 'center' }}>
              <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', marginBottom: '1.5rem' }}>AHORRO ANUAL</p>
              <div className="en-saving-num" data-target="480" data-suffix="€" style={{ fontFamily: 'var(--font-display)', fontSize: '3.5rem', fontWeight: 900, color: '#fff', lineHeight: 1 }}>480€</div>
              <p style={{ color: 'rgba(255,255,255,0.8)', marginTop: '0.75rem', fontSize: '0.85rem' }}>Por año</p>
            </div>
          </div>

          {/* Sub-note */}
          <p style={{ textAlign: 'center', marginTop: '2rem', color: 'var(--color-gray-mid)', fontSize: '0.82rem', opacity: 0.7 }}>
            * Ejemplo real basado en perfil residencial estándar. Los resultados dependen de tu consumo y tarifa actual.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          S7 — TESTIMONIALS  (dark)
      ══════════════════════════════════════════════ */}
      <section ref={testiRef} className="section-awwards testimonials-section">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
          <div className="section-header">
            <p className="section-label">Google Reviews</p>
            <h2 className="section-title">Nuestras reseñas en <span>Google Maps</span></h2>
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
                  <span style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Opinión Verificada</span>
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
          S8 — FAQ  (dark)
      ══════════════════════════════════════════════ */}
      <section ref={faqRef} className="section-awwards faq-section">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
          <div className="section-header">
            <p className="section-label">Preguntas</p>
            <h2 className="section-title">Dudas <span>frecuentes</span></h2>
          </div>
          <div className="faq-list">
            {faq.map((item, i) => (
              <div key={i} className="faq-energy-item faq-item">
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
          S9 — CTA  (dark)
      ══════════════════════════════════════════════ */}
      <section ref={ctaRef} className="cta-section">
        <div className="cta-energy-content cta-content">
          <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '1rem' }}>— Sin coste, sin compromiso —</p>
          <h2 className="cta-title">¿Empezamos<br />a ahorrar?</h2>
          <p className="cta-text">Solicita tu análisis gratuito y descubre cuánto puedes ahorrar en tu factura de luz. Sin compromiso, solo beneficios.</p>
          <Link to="/contacto" className="cta-button">
            <ArrowRight size={20} />
            <span>Análisis gratuito</span>
          </Link>
        </div>
      </section>

    </div>
  );
};

export default ServiciosEnergia;
