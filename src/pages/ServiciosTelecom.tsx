import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { ArrowRight, Wifi, Phone, Globe, Shield, CheckCircle, TrendingUp, Zap, MessageCircle, Star } from 'lucide-react';
import SplitType from 'split-type';
import { allTestimonials } from '../data/testimonials';

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
    { name: 'Lowi', logo: '/images/logo_lowi_local.svg', color: '#6B21A8' },
    { name: 'Repsol', logo: '/images/repsol-logo-DmRPVn3o.png', color: '#006C35' },
    { name: 'Niba', logo: '/images/logo_niba_local.svg', color: '#E53935' },
    { name: 'Naturgy', logo: '/images/logo_naturgy_local.svg', color: '#00A859' },
  ];

  const benefits = [
    { icon: TrendingUp, title: 'Ahorro', desc: 'Hasta 40% menos en tu factura' },
    { icon: Shield, title: 'Sin permanencia', desc: 'Cambias cuando quieras' },
    { icon: Zap, title: 'Rápido', desc: 'Portabilidad en 48h hábiles' },
    { icon: MessageCircle, title: 'Soporte', desc: 'Atención personalizada' },
  ];

  const process = [
    { number: '01', title: 'Análisis', desc: 'Estudiamos tu factura actual' },
    { number: '02', title: 'Comparación', desc: 'Buscamos la mejor tarifa' },
    { number: '03', title: 'Cambio', desc: 'Gestionamos la portabilidad' },
    { number: '04', title: 'Ahorro', desc: 'Disfruta de tu nueva tarifa' },
  ];

  const testimonials = [allTestimonials[3], allTestimonials[6], allTestimonials[7]];

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
          S1 — HERO  (dark + antenna SVG)
      ══════════════════════════════════════════════ */}
      <section ref={headerRef} className="page-header" style={{ position: 'relative', overflow: 'hidden', paddingBottom: '5rem' }}>
        {/* Antenna SVG */}
        <div className="hero-subpage-svg" aria-hidden="true">
          <svg viewBox="0 0 700 500" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path className="tc-antenna-path" d="M350 440 L350 220" stroke="#E53935" strokeWidth="2" strokeDasharray="1500" strokeDashoffset="1500" />
            <path className="tc-antenna-path" d="M310 260 L350 220 L390 260" stroke="#E53935" strokeWidth="2" strokeDasharray="1500" strokeDashoffset="1500" />
            <path className="tc-antenna-path" d="M290 440 L410 440" stroke="rgba(229,57,53,0.4)" strokeWidth="1.5" strokeDasharray="1500" strokeDashoffset="1500" />
            <path className="tc-signal-arc" d="M230 350 Q350 180 470 350" stroke="rgba(229,57,53,0.25)" strokeWidth="1.5" fill="none" />
            <path className="tc-signal-arc" d="M265 370 Q350 230 435 370" stroke="rgba(229,57,53,0.45)" strokeWidth="1.5" fill="none" />
            <path className="tc-signal-arc" d="M299 392 Q350 278 401 392" stroke="rgba(229,57,53,0.7)" strokeWidth="2" fill="none" />
            <circle cx="350" cy="220" r="4" fill="#E53935" opacity="0.9" />
            <path className="tc-antenna-path" d="M290 440 L260 480 M410 440 L440 480" stroke="rgba(229,57,53,0.3)" strokeWidth="1" strokeDasharray="1500" strokeDashoffset="1500" />
          </svg>
        </div>

        <div className="max-w-[1800px] mx-auto px-6 lg:px-12" style={{ position: 'relative', zIndex: 2 }}>
          <p className="page-header-label">Servicios</p>
          <h1 className="page-header-title">
            Telecomu<span style={{ color: '#E53935' }}>nicaciones</span>
          </h1>

          {/* Hero two-column: streaming logos + text */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '4rem', marginTop: '3rem', alignItems: 'flex-start' }}>
            <div ref={entertainRef}>
              <p className="section-label" style={{ color: '#fff', opacity: 0.8, marginBottom: '0.75rem' }}>Ahorros significativos</p>
              <h3 className="section-title" style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>
                incluimos en alguna <span>operadora:</span>
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginTop: '1.5rem' }}>
                {[
                  { src: '/images/logo_disney.png', alt: 'Disney+', height: '65px' },
                  { src: '/images/netflix.png', alt: 'Netflix', height: '50px' },
                  { src: '/images/movistar.png', alt: 'Movistar', height: '85px' },
                  { src: '/images/prime_video.png', alt: 'Prime Video', height: '50px' },
                ].map((logo, idx) => (
                  <div key={idx} className="tc-stream-logo hero-img-float" style={{
                    background: '#fff', height: '120px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    padding: '1.5rem', borderRadius: '16px',
                    border: '2px solid transparent', boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                    transition: 'border-color 0.3s ease, transform 0.3s ease',
                    animationDelay: `${idx * 0.15}s`,
                  }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#E53935'; (e.currentTarget as HTMLElement).style.transform = 'scale(1.05)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'transparent'; (e.currentTarget as HTMLElement).style.transform = ''; }}
                  >
                    <img src={logo.src} alt={logo.alt} style={{ height: logo.height, width: 'auto', objectFit: 'contain' }} />
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', paddingTop: '1rem' }}>
              <p style={{ color: '#888', lineHeight: '1.7', fontSize: '1rem' }}>
                <strong style={{ color: '#fff', fontWeight: 700 }}>Netflix:</strong> Puedes vincular tu cuenta existente o activar una nueva con el plan "Estándar con anuncios" asociado a la tarifa.
              </p>
              <p style={{ color: '#888', lineHeight: '1.7', fontSize: '1rem' }}>
                <strong style={{ color: '#fff', fontWeight: 700 }}>Disney+:</strong> Acceso ilimitado a películas, series y contenido exclusivo de Disney, Pixar, Marvel y más.
              </p>
              <p style={{ color: '#888', lineHeight: '1.7', fontSize: '1rem' }}>
                <strong style={{ color: '#fff', fontWeight: 700 }}>Amazon Prime:</strong> Entrega rápida sin coste adicional, Prime Video, Amazon Music, Prime Gaming y más.
              </p>
              {/* Stats row */}
              <div style={{ display: 'flex', gap: '2rem', marginTop: '0.5rem' }}>
                {[{ n: '1Gbps', l: 'Velocidad máx.' }, { n: '48h', l: 'Portabilidad' }, { n: '40%', l: 'Ahorro est.' }].map((s, i) => (
                  <div key={i} style={{ textAlign: 'center' }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 900, color: '#E53935' }}>{s.n}</div>
                    <div style={{ fontSize: '0.72rem', color: '#666', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '0.1rem' }}>{s.l}</div>
                  </div>
                ))}
              </div>
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
                  <div key={i} className="tc-service-card" style={{
                    background: '#fff', border: '1px solid rgba(0,0,0,0.06)',
                    borderRadius: '20px', padding: '2rem 2.5rem',
                    display: 'flex', gap: '1.75rem', alignItems: 'flex-start',
                    transition: 'transform 0.35s ease, box-shadow 0.35s ease, border-color 0.3s ease',
                    position: 'relative', overflow: 'hidden',
                  }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 16px 40px rgba(0,0,0,0.09)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(229,57,53,0.2)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ''; (e.currentTarget as HTMLElement).style.boxShadow = ''; (e.currentTarget as HTMLElement).style.borderColor = ''; }}
                  >
                    {/* Big ghosted number */}
                    <span style={{ position: 'absolute', top: '0.5rem', right: '1.5rem', fontFamily: 'var(--font-display)', fontSize: '4.5rem', fontWeight: 900, color: 'rgba(0,0,0,0.04)', lineHeight: 1 }}>{svc.number}</span>

                    <div style={{ width: '48px', height: '48px', background: 'rgba(229,57,53,0.08)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#E53935', flexShrink: 0, marginTop: '0.2rem' }}>
                      <svc.icon size={22} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-text-dark)', marginBottom: '0.5rem' }}>{svc.title}</h3>
                      <p style={{ color: 'var(--color-gray-mid)', lineHeight: 1.7, fontSize: '0.93rem', marginBottom: '1rem' }}>{svc.description}</p>
                      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                        {svc.features.map((f, j) => (
                          <li key={j} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-dark)' }}>
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
                <img src="/images/service-telecom.jpg" alt="Servicios telecomunicaciones" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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
          <div className="section-header" style={{ marginBottom: '3rem' }}>
            <p className="section-label">OPERADORES</p>
            <h2 className="section-title" style={{ color: 'var(--color-text-dark)' }}>
              Trabajamos con los <span>mejores</span>
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
            {operators.map((op, i) => (
              <div key={i} className="tc-operator-item" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{
                  width: '100%', background: '#fff',
                  border: '1px solid rgba(0,0,0,0.07)', borderRadius: '20px',
                  padding: '2.5rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  aspectRatio: '2/1', overflow: 'hidden',
                  transition: 'background 0.35s ease, transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease',
                }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = op.color + '12';
                    el.style.borderColor = op.color + '66';
                    el.style.transform = 'translateY(-4px)';
                    el.style.boxShadow = '0 12px 30px rgba(0,0,0,0.08)';
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = '';
                    el.style.borderColor = '';
                    el.style.transform = '';
                    el.style.boxShadow = '';
                  }}
                >
                  <img src={op.logo} alt={op.name} style={{ maxHeight: '48px', maxWidth: '80%', objectFit: 'contain', filter: 'grayscale(1) brightness(0.6)', transition: 'filter 0.35s ease' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.filter = 'none'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.filter = 'grayscale(1) brightness(0.6)'; }}
                  />
                </div>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-gray-mid)' }}>{op.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          S4 — BENEFITS  (WHITE) + image left
      ══════════════════════════════════════════════ */}
      <section className="section-light" style={{ padding: 'clamp(5rem,9vw,8rem) 0' }}>
        <div ref={benefitsRef} className="max-w-[1800px] mx-auto px-6 lg:px-12">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>
            {/* Left: image with decorations */}
            <div className="tc-benefit-img" style={{ position: 'relative' }}>
              <div style={{ borderRadius: '24px', overflow: 'hidden', aspectRatio: '4/3', boxShadow: '0 30px 60px rgba(0,0,0,0.1)' }}>
                <img src="/images/service-mobile.jpg" alt="Beneficios telecomunicaciones" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              {/* Decorative corner accent */}
              <div style={{ position: 'absolute', top: '-12px', left: '-12px', width: '80px', height: '80px', border: '3px solid #E53935', borderRadius: '20px', opacity: 0.4 }} />
              <div style={{ position: 'absolute', bottom: '-12px', right: '-12px', width: '60px', height: '60px', background: '#E53935', borderRadius: '16px', opacity: 0.15 }} />
              {/* Stat card */}
              <div style={{ position: 'absolute', bottom: '1.5rem', left: '-2rem', background: '#E53935', color: '#fff', borderRadius: '16px', padding: '1.25rem 1.5rem', boxShadow: '0 16px 40px rgba(229,57,53,0.3)' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 900, lineHeight: 1 }}>40%</div>
                <div style={{ fontSize: '0.7rem', opacity: 0.85, marginTop: '0.2rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Ahorro medio</div>
              </div>
              {/* Top right mini card */}
              <div style={{ position: 'absolute', top: '1.5rem', right: '-2rem', background: '#fff', borderRadius: '14px', padding: '1rem 1.25rem', boxShadow: '0 10px 24px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <CheckCircle size={16} style={{ color: '#E53935' }} />
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text-dark)' }}>Sin permanencia</span>
              </div>
            </div>

            {/* Right: benefit cards 2x2 */}
            <div>
              <p className="section-label">VENTAJAS</p>
              <h2 className="section-title" style={{ color: 'var(--color-text-dark)', marginBottom: '2.5rem' }}>
                Beneficios de <span>nuestro servicio</span>
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                {benefits.map((b, i) => (
                  <div key={i} className="tc-benefit-card" style={{
                    background: i % 2 === 0 ? '#fff' : 'rgba(229,57,53,0.04)',
                    border: '1px solid rgba(0,0,0,0.06)',
                    borderRadius: '18px', padding: '1.75rem',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 30px rgba(0,0,0,0.08)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ''; (e.currentTarget as HTMLElement).style.boxShadow = ''; }}
                  >
                    <div style={{ width: '40px', height: '40px', background: 'rgba(229,57,53,0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#E53935', marginBottom: '1rem' }}>
                      <b.icon size={18} />
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, color: 'var(--color-text-dark)', marginBottom: '0.35rem' }}>{b.title}</h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--color-gray-mid)', lineHeight: 1.6 }}>{b.desc}</p>
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
                    <div key={i} className="tc-process-step" style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', marginBottom: i < process.length - 1 ? '2rem' : 0, padding: '1.5rem 1.75rem', background: '#fff', border: '1px solid rgba(0,0,0,0.06)', borderRadius: '18px', transition: 'border-color 0.3s, box-shadow 0.3s' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(229,57,53,0.25)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 24px rgba(0,0,0,0.07)'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = ''; (e.currentTarget as HTMLElement).style.boxShadow = ''; }}
                    >
                      <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 900, color: '#E53935', lineHeight: 1, flexShrink: 0 }}>{step.number}</div>
                      <div>
                        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-text-dark)', marginBottom: '0.3rem' }}>{step.title}</h3>
                        <p style={{ color: 'var(--color-gray-mid)', lineHeight: 1.6, fontSize: '0.9rem' }}>{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: phone mockup image */}
            <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
              <div style={{ borderRadius: '24px', overflow: 'hidden', width: '320px', aspectRatio: '9/16', boxShadow: '0 40px 80px rgba(0,0,0,0.15)', position: 'relative' }}>
                <img src="/images/service-telecom-2.jpg" alt="Proceso telecomunicaciones" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.5))' }} />
              </div>
              {/* Decorative dots grid */}
              <div style={{ position: 'absolute', top: '-20px', left: '-20px', opacity: 0.12 }}>
                {[...Array(25)].map((_, i) => (
                  <div key={i} style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#E53935', display: 'inline-block', margin: '5px' }} />
                ))}
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
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <p className="section-label">RESULTADOS</p>
            <h2 className="section-title" style={{ color: 'var(--color-text-dark)' }}>
              Ahorro <span>real</span>
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr auto 1fr', gap: '0', maxWidth: '900px', margin: '0 auto', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 24px 60px rgba(0,0,0,0.1)', alignItems: 'stretch' }}>
            {/* Before */}
            <div className="tc-comp-before" style={{ background: '#f5f5f5', padding: '3rem 2rem', textAlign: 'center' }}>
              <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#999', marginBottom: '1rem' }}>ANTES</p>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '3.5rem', fontWeight: 900, color: '#ccc', textDecoration: 'line-through', lineHeight: 1 }}>85€</div>
              <p style={{ color: '#aaa', marginTop: '0.75rem', fontSize: '0.85rem' }}>Factura mensual</p>
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
      </section>

      {/* ══════════════════════════════════════════════
          S7 — TESTIMONIALS  (dark)
      ══════════════════════════════════════════════ */}
      <section ref={testiRef} className="section-awwards testimonials-section">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
          <div className="section-header">
            <p className="section-label">Google Reviews</p>
            <h2 className="section-title">Nuestros clientes <span>opinan</span></h2>
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
                  <span style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Reseña de Google</span>
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
      </section>

      {/* ══════════════════════════════════════════════
          S9 — CTA  (dark)
      ══════════════════════════════════════════════ */}
      <section ref={ctaRef} className="cta-section">
        <div className="cta-telecom-content cta-content">
          <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '1rem' }}>— Empieza hoy, es gratis —</p>
          <h2 className="cta-title">¿Listo para ahorrar<br />en tu factura?</h2>
          <p className="cta-text">Contacta con nosotros y descubre cuánto puedes ahorrar en telecomunicaciones. El análisis es gratuito y sin compromiso.</p>
          <Link to="/contacto" className="cta-button">
            <ArrowRight size={20} />
            <span>Solicitar análisis</span>
          </Link>
        </div>
      </section>

    </div>
  );
};

export default ServiciosTelecom;
