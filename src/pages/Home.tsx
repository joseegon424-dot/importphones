import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone, CheckCircle, Star, Shield, TrendingUp, Award, Wifi, Zap } from 'lucide-react';
import SplitType from 'split-type';
import { allTestimonials } from '../data/testimonials';
import { ParticleCanvas } from '../components/ui/ParticleCanvas';

gsap.registerPlugin(ScrollTrigger);

interface HomeProps {
  isLoaded: boolean;
}

const Home = ({ isLoaded }: HomeProps) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const partnersRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isLoaded) return;

    const ctx = gsap.context(() => {

      // ── Hero: word-by-word reveal with skew
      if (titleRef.current) {
        const words = titleRef.current.querySelectorAll('.hero-word-line');
        gsap.fromTo(words,
          { y: '110%', opacity: 0, skewY: 3 },
          { y: '0%', opacity: 1, skewY: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out', delay: 0.3 }
        );
      }
      gsap.fromTo('.hero-subtitle',
        { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.9 }
      );
      gsap.fromTo('.hero-cta',
        { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 1.1 }
      );
      gsap.fromTo('.hero-badge',
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, stagger: 0.15, ease: 'back.out(1.7)', delay: 1.3 }
      );

      // Hero SVG draw
      gsap.fromTo('.hero-signal-path',
        { strokeDashoffset: 900 },
        { strokeDashoffset: 0, duration: 2.5, ease: 'power2.out', stagger: 0.3, delay: 0.8 }
      );
      gsap.fromTo('.hero-signal-circle',
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(2)', stagger: 0.2, delay: 1.2 }
      );
      gsap.to('.hero-pulse-ring', {
        scale: 2.2, opacity: 0, duration: 2, repeat: -1, ease: 'power2.out',
        stagger: { each: 0.7, repeat: -1 }
      });

      // ── Services (WHITE) cards stagger
      gsap.fromTo('.service-card-light',
        { y: 80, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, stagger: 0.18, ease: 'power3.out',
          scrollTrigger: { trigger: servicesRef.current, start: 'top 72%' }
        }
      );
      const svcHeading = servicesRef.current?.querySelector<HTMLElement>('h2');
      if (svcHeading) {
        svcHeading.classList.add('split-target');
        const sp = new SplitType(svcHeading, { types: 'words,chars' });
        gsap.fromTo(sp.chars,
          { y: '110%', opacity: 0 },
          {
            y: '0%', opacity: 1, duration: 0.7, stagger: 0.02, ease: 'power3.out',
            scrollTrigger: { trigger: svcHeading, start: 'top 80%' }
          }
        );
      }

      // ── Stats CountUp
      const statNumbers = document.querySelectorAll('.stat-counter');
      statNumbers.forEach((stat) => {
        const target = parseInt(stat.getAttribute('data-target') || '0');
        gsap.fromTo(stat,
          { innerText: 0 },
          {
            innerText: target, duration: 2.2, ease: 'power2.out',
            snap: { innerText: 1 },
            scrollTrigger: { trigger: stat, start: 'top 85%' }
          }
        );
      });
      gsap.fromTo('.stat-item',
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: statsRef.current, start: 'top 75%' }
        }
      );

      // ── Value cards (WHITE) with hover-state animation prep
      gsap.fromTo('.value-card-light',
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: valuesRef.current, start: 'top 72%' }
        }
      );

      // ── Process steps
      gsap.fromTo('.process-step',
        { x: -40, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: processRef.current, start: 'top 70%' }
        }
      );
      ScrollTrigger.create({
        trigger: processRef.current,
        start: 'top 60%',
        end: 'bottom 40%',
        scrub: 1,
        onUpdate: (self) => {
          const fill = processRef.current?.querySelector<HTMLElement>('.process-svg-line-fill');
          if (fill) fill.style.height = `${Math.min(self.progress * 100, 100)}%`;
        },
      });

      // ── Testimonials
      gsap.fromTo('.testimonial-card-brutal',
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: testimonialsRef.current, start: 'top 72%' }
        }
      );

      // ── Partners floating effect
      gsap.fromTo('.partner-logo-item',
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power3.out',
          scrollTrigger: { trigger: partnersRef.current, start: 'top 80%' }
        }
      );
      gsap.to('.partner-logo-item', {
        y: -6, duration: 2.5, ease: 'sine.inOut', yoyo: true, repeat: -1,
        stagger: { each: 0.4, from: 'random' }
      });

      // ── CTA
      gsap.fromTo('.cta-content',
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: ctaRef.current, start: 'top 70%' }
        }
      );

    }, heroRef);

    return () => ctx.revert();
  }, [isLoaded]);

  const services = [
    {
      icon: Wifi,
      number: '01',
      title: 'Telecomunicaciones',
      description: 'Fibra, móvil y VoIP. Las mejores tarifas del mercado con los principales operadores.',
      features: ['Fibra hasta 1Gbps', 'Móvil ilimitado', 'VoIP empresarial'],
      link: '/servicios/telecomunicaciones',
    },
    {
      icon: Zap,
      number: '02',
      title: 'Energía',
      description: 'Optimiza tu factura eléctrica. Ahorra hasta un 40% con nuestro análisis gratuito.',
      features: ['Análisis de consumo', 'Cambio de compañía', 'Ahorro garantizado'],
      link: '/servicios/energia',
    },
  ];

  const stats = [
    { value: '10', suffix: '+', label: 'Años de experiencia' },
    { value: '5000', suffix: '+', label: 'Clientes satisfechos' },
    { value: '881', suffix: '', label: 'Reseñas en Google' },
    { value: '40', suffix: '%', label: 'Ahorro promedio' },
  ];

  const values = [
    {
      icon: Shield,
      title: 'Confianza',
      description: 'Transparencia total en cada gestión. Tu confianza es nuestro mayor activo.',
    },
    {
      icon: TrendingUp,
      title: 'Ahorro',
      description: 'Optimizamos tus costes en telecomunicaciones y energía. Nuestro objetivo es que pagues menos.',
    },
    {
      icon: Award,
      title: 'Profesionalidad',
      description: 'Equipo experto con años de experiencia. Nos mantenemos actualizados para ofrecerte lo mejor.',
    },
  ];

  const process = [
    { number: '01', title: 'Análisis', description: 'Estudiamos tu consumo actual y detectamos oportunidades de ahorro.' },
    { number: '02', title: 'Propuesta', description: 'Te presentamos las mejores opciones del mercado adaptadas a ti.' },
    { number: '03', title: 'Gestión', description: 'Nos encargamos de todos los trámites y cambios de compañía.' },
    { number: '04', title: 'Ahorro', description: 'Comienzas a disfrutar de mejores servicios pagando menos.' },
  ];

  const testimonials = allTestimonials.slice(0, 6);

  // Partner data with brand colors — only for logos
  const partners = [
    { name: 'Orange', logo: 'https://upload.wikimedia.org/wikipedia/commons/c/c8/Orange_logo.svg', color: '#FF6900' },
    { name: 'O2', logo: '/images/logo-o2-WJ0ZyWZ8.png', color: '#0050ff' },
    { name: 'Lowi', logo: '/images/lowi.png', color: '#7b2d8b' },
    { name: 'Repsol', logo: '/images/repsol-logo-DmRPVn3o.png', color: '#e8001c' },
    { name: 'Niba', logo: '/images/logo_niba_local.svg', color: '#1a7bbf' },
    { name: 'Naturgy', logo: '/images/logo_naturgy_local.svg', color: '#00a651' },
  ];

  // Colored marquee strip — branding only here
  const marqueeData = [
    { name: 'ORANGE', color: '#FF6900' },
    { name: 'O2', color: '#0050ff' },
    { name: 'LOWI', color: '#7b2d8b' },
    { name: 'REPSOL', color: '#e8001c' },
    { name: 'NIBA', color: '#1a7bbf' },
    { name: 'NATURGY', color: '#00a651' },
  ];

  return (
    <div ref={heroRef} className="overflow-hidden">

      {/* ── Section 1: Hero (dark) — BRUTAL title ── */}
      <section className="hero-awwards" style={{ position: 'relative', overflow: 'hidden', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        {/* Animated SVG background */}
        <div className="hero-svg-wrapper" aria-hidden="true">
          <svg viewBox="0 0 1200 800" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
            {[100, 200, 300, 400, 500, 600, 700].map((y, i) => (
              <line key={`hy${i}`} x1="0" y1={y} x2="1200" y2={y} stroke="rgba(229,57,53,0.04)" strokeWidth="1" />
            ))}
            {[150, 300, 450, 600, 750, 900, 1050].map((x, i) => (
              <line key={`vx${i}`} x1={x} y1="0" x2={x} y2="800" stroke="rgba(229,57,53,0.03)" strokeWidth="1" />
            ))}
            <circle className="hero-pulse-ring hero-signal-circle" cx="900" cy="400" r="40" stroke="#E53935" strokeWidth="1.5" fill="none" opacity="0.5" />
            <circle className="hero-pulse-ring hero-signal-circle" cx="900" cy="400" r="40" stroke="#E53935" strokeWidth="1" fill="none" opacity="0.2" />
            <circle className="hero-signal-path svg-draw" cx="900" cy="400" r="100" stroke="#E53935" strokeWidth="1" strokeDasharray="800" strokeDashoffset="800" />
            <circle className="hero-signal-path svg-draw" cx="900" cy="400" r="180" stroke="rgba(229,57,53,0.5)" strokeWidth="0.8" strokeDasharray="800" strokeDashoffset="800" />
            <circle className="hero-signal-path svg-draw" cx="900" cy="400" r="280" stroke="rgba(229,57,53,0.3)" strokeWidth="0.6" strokeDasharray="800" strokeDashoffset="800" />
            <circle className="hero-signal-path svg-draw" cx="900" cy="400" r="380" stroke="rgba(229,57,53,0.15)" strokeWidth="0.4" strokeDasharray="800" strokeDashoffset="800" />
            <circle className="hero-signal-circle" cx="900" cy="400" r="8" fill="#E53935" />
            <path className="hero-signal-path svg-draw" d="M900 400 L700 200" stroke="rgba(229,57,53,0.3)" strokeWidth="1" strokeDasharray="900" strokeDashoffset="900" />
            <path className="hero-signal-path svg-draw" d="M900 400 L1100 250" stroke="rgba(229,57,53,0.25)" strokeWidth="1" strokeDasharray="900" strokeDashoffset="900" />
            <path className="hero-signal-path svg-draw" d="M900 400 L1150 550" stroke="rgba(229,57,53,0.2)" strokeWidth="1" strokeDasharray="900" strokeDashoffset="900" />
          </svg>
        </div>

        <div className="max-w-[1800px] mx-auto px-6 lg:px-12 w-full hero-content-z">
          <div style={{ maxWidth: '900px' }}>
            <p className="hero-label" style={{ marginBottom: '1.5rem' }}>IMPORTPHONES.NET</p>

            {/* BRUTAL large title */}
            <h1 ref={titleRef} className="hero-title-brutal">
              {[
                { text: 'TU', red: false },
                { text: 'CONSULTORÍA', red: true },
                { text: 'DE', red: false },
                { text: 'CONFIANZA', red: true },
              ].map((word, i) => (
                <div key={i} style={{ overflow: 'hidden' }}>
                  <span className="hero-word-line" style={{
                    display: 'block',
                    color: word.red ? '#E53935' : '#fff',
                  }}>
                    {word.text}
                  </span>
                </div>
              ))}
            </h1>

            <p className="hero-subtitle" style={{ marginTop: '2rem', maxWidth: '540px' }}>
              Asesoramiento integral en telecomunicaciones y energía para empresas y particulares.
              Gestionamos altas, portabilidades y optimizamos tus facturas.
            </p>

            <div className="hero-cta" style={{ marginTop: '2.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link to="/contacto" className="btn-primary">
                <span>Contactar</span>
                <ArrowRight size={18} />
              </Link>
              <Link to="/servicios" className="btn-outline">
                <span>Servicios</span>
              </Link>
            </div>

            {/* Trust badges */}
            <div style={{ display: 'flex', gap: '2.5rem', marginTop: '3.5rem', flexWrap: 'wrap' }}>
              {[
                { label: '10+', sub: 'Años de experiencia' },
                { label: '5.000+', sub: 'Clientes satisfechos' },
                { label: '881', sub: 'Reseñas Google' },
              ].map((b, i) => (
                <div key={i} className="hero-badge" style={{
                  borderLeft: '2px solid rgba(229,57,53,0.6)',
                  paddingLeft: '1.25rem',
                }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 900, color: '#E53935', lineHeight: 1 }}>{b.label}</div>
                  <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', fontWeight: 500, marginTop: '0.25rem' }}>{b.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px', background: 'rgba(255,255,255,0.06)' }} />
      </section>

      {/* ── Section 2: Colored partner marquee strip (dark) ── */}
      <section className="marquee-section" style={{ padding: '1.2rem 0', overflow: 'hidden' }}>
        <div className="marquee-track-colored">
          {[...marqueeData, ...marqueeData, ...marqueeData].map((p, i) => (
            <span key={i} className="marquee-item-colored" style={{ color: p.color }}>
              {p.name}
              <span style={{ color: 'rgba(255,255,255,0.15)', margin: '0 1.5rem' }}>✦</span>
            </span>
          ))}
        </div>
      </section>

      {/* ── Section 3: Services (WHITE) — numbers in black ── */}
      <section ref={servicesRef} className="section-light" style={{ padding: 'clamp(5rem, 10vw, 9rem) 0' }}>
        <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
          <div className="section-header" style={{ marginBottom: '4rem' }}>
            <p className="section-label">SERVICIOS</p>
            <h2 className="section-title" style={{ color: 'var(--color-text-dark)' }}>
              Soluciones <span>integrales</span>
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2rem' }}>
            {services.map((service, index) => (
              <Link key={index} to={service.link} style={{ textDecoration: 'none' }}>
                <div className="service-card-light">
                  {/* Number visible in dark/black */}
                  <span className="service-number" style={{ color: 'var(--color-text-dark)', opacity: 1 }}>{service.number}</span>
                  <div className="service-icon">
                    <service.icon size={24} />
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <ul className="feature-list">
                    {service.features.map((f, i) => <li key={i}>{f}</li>)}
                  </ul>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-primary)', fontWeight: 600, fontSize: '0.9rem', marginTop: '2rem' }}>
                    <span>Ver más</span>
                    <ArrowRight size={16} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 4: Stats (dark) ── */}
      <section ref={statsRef} className="section-awwards stats-section">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <div>
                  <span className="stat-counter stat-number" data-target={stat.value}>0</span>
                  <span className="stat-suffix">{stat.suffix}</span>
                </div>
                <p className="stat-label">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 5: Values (WHITE) — interactive dark cards ── */}
      <section ref={valuesRef} className="section-light" style={{ padding: 'clamp(5rem, 10vw, 9rem) 0' }}>
        <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
          <div className="section-header" style={{ marginBottom: '4rem' }}>
            <p className="section-label">POR QUÉ ELEGIRNOS</p>
            <h2 className="section-title" style={{ color: 'var(--color-text-dark)' }}>
              Tu éxito es <span>nuestra prioridad</span>
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {values.map((value, index) => (
              <div key={index} className="value-card-light value-card-interactive">
                <div className="v-icon">
                  <value.icon size={22} />
                </div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 6: Process (lightly tinted white) ── */}
      <section ref={processRef} className="section-light" style={{
        padding: 'clamp(5rem, 10vw, 9rem) 0',
        background: 'var(--color-section-light-2)',
      }}>
        <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
          <div className="section-header" style={{ marginBottom: '4rem' }}>
            <p className="section-label">CÓMO TRABAJAMOS</p>
            <h2 className="section-title" style={{ color: 'var(--color-text-dark)' }}>
              Proceso <span>sencillo</span>
            </h2>
          </div>

          <div style={{ display: 'flex', gap: '4rem', alignItems: 'flex-start', position: 'relative' }}>
            <div className="process-svg-line" style={{ alignSelf: 'stretch' }}>
              <div className="process-svg-line-fill" />
            </div>
            <div style={{ flex: 1 }}>
              {process.map((step, index) => (
                <div key={index} className="process-step">
                  <div className="process-step-num">{step.number}</div>
                  <div className="process-step-content">
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 7: Testimonials (dark) with GSAP scroll ── */}
      <section ref={testimonialsRef} className="section-awwards testimonials-section">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
          <div className="section-header">
            <p className="section-label">Google Reviews</p>
            <h2 className="section-title">
              Información <span>real y transparente</span>
            </h2>
            <p style={{ color: '#888', marginTop: '1rem', maxWidth: '600px' }}>
              Más de 881 reseñas reales de clientes que ahorraron con nuestra ayuda.
            </p>
          </div>

          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card-brutal">
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
                  {[...Array(5)].map((_, i) => (<Star key={i} size={14} fill="#FBBC05" stroke="none" />))}
                </div>
                <div className="testimonial-quote-google">"</div>
                <p className="testimonial-text-google">{testimonial.text}</p>
                <div className="testimonial-author-google">
                  <div className="testimonial-avatar-google">{testimonial.name.charAt(0)}</div>
                  <div className="testimonial-info-google">
                    <span className="testimonial-name-google">{testimonial.name}</span>
                    <span className="testimonial-role-google">{testimonial.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 8: Partners (WHITE, 3x2 grid with brand colors on hover) ── */}
      <section ref={partnersRef} className="partners-light" style={{ padding: 'clamp(4rem, 8vw, 7rem) 0', overflow: 'hidden' }}>
        <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
          <div className="section-header" style={{ marginBottom: '3rem' }}>
            <p className="section-label">COLABORADORES</p>
            <h2 className="section-title" style={{ color: 'var(--color-text-dark)' }}>
              Nuestros <span>partners</span>
            </h2>
          </div>

          {/* 3x2 grid */}
          <div className="partners-grid-3x2">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="partner-logo-item"
                style={{ '--partner-color': partner.color } as React.CSSProperties}
              >
                <div className="partner-logo-inner partner-logo-light">
                  <img src={partner.logo} alt={partner.name} />
                </div>
                <span className="partner-name" style={{ color: partner.color }}>{partner.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 9: CTA (dark) with particle canvas ── */}
      <section ref={ctaRef} className="cta-section" style={{ position: 'relative', overflow: 'hidden' }}>
        <ParticleCanvas />
        <div className="cta-content" style={{ position: 'relative', zIndex: 2 }}>
          <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '1rem' }}>
            — Aprovecha y ahorra —
          </p>
          <h2 className="cta-title">¿Listo para ahorrar?</h2>
          <p className="cta-text">
            Contacta con nosotros y descubre cuánto puedes ahorrar en tus facturas de
            telecomunicaciones y energía.
          </p>
          <Link to="/contacto" className="cta-button">
            <Phone size={20} />
            <span>Contactar ahora</span>
          </Link>
        </div>
      </section>

      <span style={{ display: 'none' }}><CheckCircle size={0} /></span>
    </div>
  );
};

export default Home;
