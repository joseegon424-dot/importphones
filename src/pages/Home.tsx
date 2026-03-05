import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone, CheckCircle, Star, Award, TrendingDown, Smartphone, Zap } from 'lucide-react';
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
  const trustRef = useRef<HTMLDivElement>(null);

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
        const words = svcHeading.querySelectorAll('.hero-word-line');
        gsap.fromTo(words,
          { y: '110%', opacity: 0, skewY: 3 },
          {
            y: '0%', opacity: 1, skewY: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out',
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
          if (fill) fill.style.height = `${Math.min(self.progress * 100, 100)}% `;
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

      // ── Trust Cards
      gsap.fromTo('.trust-card-brutal',
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: trustRef.current, start: 'top 75%' }
        }
      );

    }, heroRef);

    return () => ctx.revert();
  }, [isLoaded]);

  // services list removed

  const stats = [
    { value: '10', suffix: '+', label: 'Años de experiencia' },
    { value: '5000', suffix: '+', label: 'Clientes satisfechos' },
    { value: '881', suffix: '', label: 'Reseñas en Google' },
    { value: '40', suffix: '%', label: 'Ahorro promedio' },
  ];

  // values list removed

  // process list removed

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

  // Colored marquee strip — VIP styling
  const marqueeData = [
    { name: 'ORANGE', color: '#FF7900' },
    { name: 'O2', color: '#0050ff' },
    { name: 'LOWI', color: '#00a8e1' },
    { name: 'REPSOL', color: '#FF8A00' },
    { name: 'NIBA', color: '#1a7bbf' },
    { name: 'NATURGY', color: '#0033A0' },
  ];

  return (
    <div ref={heroRef} className="overflow-hidden">

      {/* ── Section 1: Hero (dark) — BRUTAL title ── */}
      <section className="hero-awwards" style={{ position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
        {/* Professional Background Image & Overlay */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <img
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt="Importphones Consultoría equipo"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'brightness(0.8)' }}
          />
          {/* Subtle gradient overlay to ensure text readability but keep the image vibrant */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 50%)' }} />
        </div>

        <div className="max-w-[1800px] mx-auto px-6 lg:px-12 w-full hero-content-z">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">

            {/* Left side: Label & Title */}
            <div style={{ zIndex: 2, position: 'relative' }}>
              <p className="hero-label" style={{ marginBottom: '1.5rem', color: '#ffffff', textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>IMPORTPHONES.NET</p>

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
                      color: word.red ? '#E53935' : '#ffffff',
                      textShadow: word.red ? '0 4px 20px rgba(0,0,0,0.6)' : '0 4px 20px rgba(0,0,0,0.8)',
                    }}>
                      {word.text}
                    </span>
                  </div>
                ))}
              </h1>
            </div>

            {/* Right side: Subtitle, CTAs, Badges */}
            <div className="lg:pl-12 lg:border-l border-white/10" style={{ alignSelf: 'center', zIndex: 2, position: 'relative' }}>
              <p className="hero-subtitle" style={{ marginTop: '0', maxWidth: '540px', color: '#ffffff', fontWeight: 500, textShadow: '0 2px 15px rgba(0,0,0,0.9)' }}>
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
                ].map((b, i) => (
                  <div key={i} style={{
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
        </div>

        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px', background: 'rgba(255,255,255,0.06)' }} />
      </section>

      {/* ── Section 2: Colored partner marquee strip (VIP) ── */}
      <section className="marquee-section-vip" style={{ padding: '2rem 0', overflow: 'hidden', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
        <div className="marquee-track-vip">
          {[...marqueeData, ...marqueeData, ...marqueeData].map((p, i) => (
            <span
              key={i}
              className="marquee-item-vip"
              style={{ '--brand-color': p.color } as React.CSSProperties}
            >
              <span className="marquee-text-vip">{p.name}</span>
              <span className="marquee-separator-vip">✦</span>
            </span>
          ))}
        </div>
      </section>

      {/* ── Section 3: About / Consulting (WHITE) ── */}
      <section ref={servicesRef} className="section-light" style={{ padding: 'clamp(5rem, 10vw, 9rem) 0' }}>
        <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">

            {/* Text Copy Column */}
            <div style={{ maxWidth: '650px' }}>
              <p className="section-label" style={{ marginBottom: '1.5rem', color: '#E53935', fontWeight: 700 }}>SOBRE NOSOTROS</p>
              <h2 className="section-title" style={{ color: 'var(--color-text-dark)', marginBottom: '2rem', fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.1 }}>
                Consultoría Energética y de Telecomunicaciones: <br />
                <span style={{ color: '#E53935' }}>Ahorra en tu Factura de Luz y Fibra</span>
              </h2>

              <p style={{ color: '#333', fontSize: '1.25rem', lineHeight: '1.8', marginBottom: '1.5rem', fontWeight: 500 }}>
                En ImportPhones, llevamos 10 años en el sector ayudando a hogares y negocios a reducir sus gastos fijos. Nuestra trayectoria nos avala como expertos en encontrar la tarifa de luz más barata y las mejores soluciones de conectividad.
              </p>

              <div style={{ background: 'rgba(229,57,53,0.05)', borderLeft: '4px solid #E53935', padding: '1.5rem', borderRadius: '0 12px 12px 0' }}>
                <p style={{ color: '#555', fontSize: '1.1rem', lineHeight: '1.6', margin: 0 }}>
                  Con más de <strong style={{ color: '#E53935' }}>881 reseñas positivas</strong>, nuestro compromiso es ofrecerte un asesoramiento honesto y personalizado.
                </p>
              </div>

              <div style={{ marginTop: '3rem' }}>
                <Link to="/contacto" className="btn-primary" style={{ display: 'inline-flex', padding: '1.2rem 2.5rem', background: '#E53935', color: '#fff', borderRadius: '50px', fontWeight: 'bold' }}>
                  <span>Solicitar Asesoría Gratuita</span>
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>

            {/* Custom Photography Column with Experience Badge */}
            <div style={{ position: 'relative', width: '100%', aspectRatio: '4/3', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

              <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 30px 60px rgba(0,0,0,0.1)' }}>
                <img
                  src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Equipo de consultoría energética y telecomunicaciones"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent)' }} />
              </div>

              {/* Floating Badge overlay for extra trust */}
              <div style={{ position: 'absolute', bottom: '-20px', right: '-20px', background: '#fff', padding: '1.5rem', borderRadius: '16px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', gap: '1rem', border: '1px solid rgba(0,0,0,0.05)' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'rgba(229,57,53,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#E53935' }}>
                  <Award size={28} />
                </div>
                <div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#111', lineHeight: 1 }}>10+ Años</div>
                  <div style={{ fontSize: '0.9rem', color: '#666', fontWeight: 500, marginTop: '2px' }}>Experiencia en ahorro</div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ── Section 4: Stats (dark) ── */}
      <section ref={statsRef} className="section-awwards stats-section" style={{ background: '#0a0a0a', padding: '6rem 0' }}>
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

      {/* ── Section 5: Value Proposition (WHITE) ── */}
      <section ref={valuesRef} className="section-light" style={{ padding: 'clamp(5rem, 10vw, 9rem) 0' }}>
        <div className="max-w-[1800px] mx-auto px-6 lg:px-12 text-center">
          <div className="section-header" style={{ marginBottom: '2.5rem' }}>
            <h2 className="section-title" style={{ color: 'var(--color-text-dark)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', maxWidth: '1000px', margin: '0 auto', lineHeight: 1.1 }}>
              {[
                { text: 'Tu', red: false },
                { text: 'Comparador', red: false },
                { text: 'de', red: false },
                { text: 'Tarifas', red: false },
                { text: 'de', red: false },
                { text: 'Luz', red: false },
                { text: 'y', red: false },
                { text: 'Fibra', red: false },
                { text: 'de', red: false },
                { text: 'Confianza', red: true }
              ].map((word, i) => (
                <div key={i} style={{ overflow: 'hidden', display: 'inline-block', margin: '0 0.15em' }}>
                  <span className="hero-word-line" style={{ display: 'block', color: word.red ? '#E53935' : 'inherit' }}>
                    {word.text}
                  </span>
                </div>
              ))}
            </h2>
          </div>

          <p style={{ color: '#555', fontSize: '1.25rem', lineHeight: '1.8', maxWidth: '850px', margin: '0 auto 4rem auto', fontWeight: 500 }}>
            No todas las facturas son iguales. Como comparador de tarifas de luz líder, analizamos tu consumo para ofrecerte un ahorro real.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', textAlign: 'left' }}>
            <div className="comparador-card-brutal">
              <div className="card-icon-container">
                <TrendingDown size={32} />
              </div>
              <h3 className="card-title">Ahorro Real</h3>
              <p className="card-description">
                Estudiamos cada detalle de tu consumo histórico para detectar sobrecostes y ofrecerte la tarifa más barata del mercado.
              </p>
            </div>

            <div className="comparador-card-brutal">
              <div className="card-icon-container">
                <Smartphone size={32} />
              </div>
              <h3 className="card-title">Tarifas Móviles</h3>
              <p className="card-description">
                Ya sea que busques tarifas móviles baratas o fibra de alta velocidad, nuestro equipo gestiona la portabilidad sin que tú te preocupes.
              </p>
            </div>

            <div className="comparador-card-brutal">
              <div className="card-icon-container">
                <Zap size={32} />
              </div>
              <h3 className="card-title">Discriminación Horaria</h3>
              <p className="card-description">
                Te ayudamos a elegir una tarifa con discriminación horaria para concentrar tu gasto en las horas más económicas y reducir el total.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats section removed from here (returned to original position) */}

      {/* ── Section 6: Soluciones de Eficiencia (DARK PREMIUM) ── */}
      <section ref={processRef} className="section-dark" style={{
        padding: 'clamp(5rem, 10vw, 9rem) 0',
        background: '#111', // Dark contrast
      }}>
        <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
          <div className="section-header" style={{ marginBottom: '4rem' }}>
            <h2 className="section-title" style={{ color: '#ffffff', fontSize: 'clamp(2rem, 3.5vw, 3rem)', lineHeight: 1.2 }}>
              {[
                { text: '¿Estás', red: false },
                { text: 'pagando', red: false },
                { text: 'de', red: false },
                { text: 'más', red: true },
                { text: 'en', red: false },
                { text: 'tu', red: false },
                { text: 'factura', red: false },
                { text: 'eléctrica', red: false },
                { text: 'sin', red: false },
                { text: 'saberlo?', red: false },
                { text: '⚡', red: false }
              ].map((word, i) => (
                <div key={i} style={{ overflow: 'hidden', display: 'inline-block', margin: '0 0.15em' }}>
                  <span className="hero-word-line" style={{ display: 'block', color: word.red ? '#E53935' : 'inherit' }}>
                    {word.text}
                  </span>
                </div>
              ))}
            </h2>
          </div>

          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.25rem', lineHeight: '1.8', maxWidth: '850px', marginBottom: '3rem', fontWeight: 500 }}>
            “En más del 40% de los contratos eléctricos la potencia contratada es superior a la necesaria. Analizamos tu curva de consumo y optimizamos tus kW para que solo pagues por la energía que realmente utilizas.”
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
            {/* Card 01 */}
            <div className="eficiencia-card-brutal">
              <div className="eficiencia-img-wrapper" style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                <img
                  src="https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Paneles solares residenciales"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div className="eficiencia-overlay" style={{ position: 'absolute', inset: 0, background: 'rgba(229,57,53,0.85)', opacity: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'opacity 0.4s ease' }}>
                  <TrendingDown size={48} color="#fff" />
                </div>
              </div>
              <div className="eficiencia-content" style={{ padding: '2rem' }}>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ color: '#E53935' }}>01.</span> Autoconsumo
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: '1.6' }}>
                  Proyectamos un estudio y propuesta completa llaves en mano de Instalación de paneles solares para casa para que generes tu propia energía limpia.
                </p>
              </div>
            </div>

            {/* Card 02 - Optimización de Potencia */}
            <div className="eficiencia-card-brutal" style={{ display: 'flex', flexDirection: 'column' }}>
              <div className="eficiencia-img-wrapper" style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                <img
                  src="/images/factura_potencia.png"
                  alt="Estudio de potencia eléctrica factura grafica"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div className="eficiencia-overlay" style={{ position: 'absolute', inset: 0, background: 'rgba(229,57,53,0.85)', opacity: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'opacity 0.4s ease' }}>
                  <Zap size={48} color="#fff" />
                </div>
              </div>
              <div className="eficiencia-content" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ color: '#E53935' }}>02.</span> Potencia Contratada
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: '1.6', fontSize: '1rem', marginBottom: '1.5rem', flex: 1 }}>
                  “Más del 40% de los hogares pagan de más en su factura eléctrica por tener una potencia contratada superior a la necesaria. Analizamos tu curva de consumo y optimizamos tu potencia para que pagues solo por lo que realmente utilizas.” ⚡
                </p>
              </div>
            </div>

            {/* Card 03 */}
            <div className="eficiencia-card-brutal">
              <div className="eficiencia-img-wrapper" style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                <img
                  src="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Optimización de suministros"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div className="eficiencia-overlay" style={{ position: 'absolute', inset: 0, background: 'rgba(229,57,53,0.85)', opacity: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'opacity 0.4s ease' }}>
                  <Smartphone size={48} color="#fff" />
                </div>
              </div>
              <div className="eficiencia-content" style={{ padding: '2rem' }}>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ color: '#E53935' }}>03.</span> Suministros
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: '1.6' }}>
                  Te ayudamos a optimizar la potencia contratada para que no pagues ni un euro de más por energía que no utilizas.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Below Cards */}
          <div style={{ marginTop: '5rem', textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <Link to="/contacto" className="hero-cta-button group" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '1rem',
              background: '#E53935',
              color: 'white',
              padding: '1.25rem 2.5rem',
              fontSize: '1rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              transition: 'all 0.3s ease',
              boxShadow: '8px 8px 0 rgba(255,255,255,0.1)'
            }}
              
              >
              “Solicita ahora tu análisis energético gratuito y empieza a ahorrar.” 📊
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Micro-banner: Experience Strip (DARK) ── */}
      <section className="bg-[#0D0D0D] py-12 border-y border-white/5">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-12 flex flex-wrap justify-between items-center gap-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-red-600/10 flex items-center justify-center text-red-600">
              <CheckCircle size={24} />
            </div>
            <div>
              <p className="text-white font-bold leading-tight">Garantía de Ahorro</p>
              <p className="text-white/40 text-sm">Consultoría 100% personalizada</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-red-600/10 flex items-center justify-center text-red-600">
              <Smartphone size={24} />
            </div>
            <div>
              <p className="text-white font-bold leading-tight">Multicanal</p>
              <p className="text-white/40 text-sm">Atención inmediata vía WhatsApp</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-red-600/10 flex items-center justify-center text-red-600">
              <Award size={24} />
            </div>
            <div>
              <p className="text-white font-bold leading-tight">Certificados</p>
              <p className="text-white/40 text-sm">Expertos en eficiencia energética</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 8b: Energía y Ahorro Empresarial ── */}
      <section className="section-light" style={{ padding: 'clamp(5rem, 10vw, 9rem) 0' }}>
        <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
          {/* Header row: text LEFT + animated SVG RIGHT */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '4rem', marginBottom: '4rem', flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 400px' }}>
              <h2 className="section-title" style={{ color: 'var(--color-text-dark)', fontSize: 'clamp(2rem, 4vw, 3.5rem)', textAlign: 'left' }}>
                {[
                  { text: 'Energía', red: false },
                  { text: 'y', red: false },
                  { text: 'Ahorro', red: false },
                  { text: 'Energético', red: false },
                  { text: 'en', red: false },
                  { text: 'Empresas', red: true }
                ].map((word, i) => (
                  <div key={i} style={{ overflow: 'hidden', display: 'inline-block', margin: '0 0.25em 0 0' }}>
                    <span className="hero-word-line" style={{ display: 'block', color: word.red ? '#E53935' : 'inherit' }}>
                      {word.text}
                    </span>
                  </div>
                ))}
              </h2>
              <p style={{ color: '#333', fontSize: '1.25rem', lineHeight: '1.8', marginTop: '1.5rem', fontWeight: 500 }}>
                Entendemos que la competitividad de tu negocio depende de sus costes operativos. Por ello, ofrecemos servicios especializados para el sector profesional:
              </p>
            </div>
            {/* Animated SVG - Industrial Solar Energy */}
            <div className="energia-header-svg">
              <svg width="260" height="260" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Outer orbit ring */}
                <circle cx="50" cy="50" r="44" stroke="#E53935" strokeWidth="0.5" strokeDasharray="4 3" className="animate-rotate" style={{ transformOrigin: '50px 50px' }} />
                {/* Inner ring */}
                <circle cx="50" cy="50" r="32" stroke="#E53935" strokeWidth="0.4" strokeDasharray="2 4" opacity="0.4" style={{ animation: 'rotate-slow 7s linear infinite reverse', transformOrigin: '50px 50px' }} />
                {/* Solar Panel Grid */}
                <rect x="20" y="55" width="60" height="28" rx="3" stroke="#E53935" strokeWidth="1.2" className="animate-dash" />
                <line x1="20" y1="65" x2="80" y2="65" stroke="#E53935" strokeWidth="0.5" opacity="0.6" />
                <line x1="20" y1="75" x2="80" y2="75" stroke="#E53935" strokeWidth="0.5" opacity="0.6" />
                <line x1="40" y1="55" x2="40" y2="83" stroke="#E53935" strokeWidth="0.5" opacity="0.6" />
                <line x1="60" y1="55" x2="60" y2="83" stroke="#E53935" strokeWidth="0.5" opacity="0.6" />
                {/* Sun */}
                <circle cx="50" cy="32" r="10" fill="#E53935" className="animate-glow" opacity="0.9" />
                <circle cx="50" cy="32" r="6" fill="#fff" opacity="0.9" />
                {/* Sun rays rotating */}
                <g className="animate-rotate" style={{ transformOrigin: '50px 32px' }}>
                  <line x1="50" y1="17" x2="50" y2="20" stroke="#E53935" strokeWidth="2" strokeLinecap="round" />
                  <line x1="50" y1="44" x2="50" y2="47" stroke="#E53935" strokeWidth="2" strokeLinecap="round" />
                  <line x1="35" y1="32" x2="38" y2="32" stroke="#E53935" strokeWidth="2" strokeLinecap="round" />
                  <line x1="62" y1="32" x2="65" y2="32" stroke="#E53935" strokeWidth="2" strokeLinecap="round" />
                  <line x1="39.4" y1="21.4" x2="41.5" y2="23.5" stroke="#E53935" strokeWidth="2" strokeLinecap="round" />
                  <line x1="58.5" y1="40.5" x2="60.6" y2="42.6" stroke="#E53935" strokeWidth="2" strokeLinecap="round" />
                  <line x1="39.4" y1="42.6" x2="41.5" y2="40.5" stroke="#E53935" strokeWidth="2" strokeLinecap="round" />
                  <line x1="58.5" y1="23.5" x2="60.6" y2="21.4" stroke="#E53935" strokeWidth="2" strokeLinecap="round" />
                </g>
                {/* Energy bolt down to panel */}
                <path d="M50 42 L47 50 L50 50 L46 58" stroke="#E53935" strokeWidth="1.5" strokeLinecap="round" className="animate-dash" opacity="0.8" />
              </svg>
            </div>
          </div>

          {/* Timeline Structure for Enterprises */}
          <div className="timeline-container">
            <div className="timeline-line"></div>

            {/* Item 01 - Energía Solar Industrial (card LEFT, SVG RIGHT) */}
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content-card">
                <div className="empresa-card-brutal">
                  <div className="empresa-img-wrapper">
                    <img
                      src="https://www.enlight.mx/hs-fs/hubfs/bombilla-luz-mano-fondo-panel-solar.jpg?height=550&name=bombilla-luz-mano-fondo-panel-solar.jpg"
                      alt="Energía solar para empresas"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <div className="empresa-inner-content">
                    <h3 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#111', marginBottom: '1rem' }}>
                      ⚡ Energía solar para empresas
                    </h3>
                    <p style={{ color: '#555', lineHeight: '1.7', fontSize: '1.05rem' }}>
                      Implementamos proyectos de autoconsumo fotovoltaico a escala industrial, diseñados para maximizar la rentabilidad de tu negocio desde el primer mes.
                    </p>
                  </div>
                </div>
              </div>
              {/* SVG RIGHT - Energy Flow / Circuit */}
              <div className="timeline-content-card timeline-svg-card">
                <svg width="220" height="220" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Factory building */}
                  <rect x="15" y="55" width="70" height="35" rx="2" stroke="#E53935" strokeWidth="1.2" />
                  <rect x="30" y="65" width="12" height="12" stroke="#E53935" strokeWidth="0.8" />
                  <rect x="58" y="65" width="12" height="12" stroke="#E53935" strokeWidth="0.8" />
                  <rect x="44" y="70" width="12" height="20" fill="rgba(229,57,53,0.1)" stroke="#E53935" strokeWidth="0.8" />
                  {/* Smokestacks with flowing energy */}
                  <rect x="28" y="40" width="6" height="18" stroke="#E53935" strokeWidth="0.8" />
                  <rect x="50" y="35" width="6" height="22" stroke="#E53935" strokeWidth="0.8" />
                  <rect x="68" y="42" width="6" height="15" stroke="#E53935" strokeWidth="0.8" />
                  {/* Animated energy waves rising */}
                  <path d="M31 38 Q34 33 31 28 Q28 23 31 18" stroke="#E53935" strokeWidth="1" strokeLinecap="round" className="animate-dash" opacity="0.7" fill="none" />
                  <path d="M53 33 Q56 28 53 23 Q50 18 53 13" stroke="#E53935" strokeWidth="1" strokeLinecap="round" className="animate-dash" opacity="0.5" fill="none" />
                  <path d="M71 40 Q74 35 71 30 Q68 25 71 20" stroke="#E53935" strokeWidth="1" strokeLinecap="round" className="animate-dash" opacity="0.7" fill="none" />
                  {/* Rotating power ring */}
                  <circle cx="50" cy="50" r="46" stroke="#E53935" strokeWidth="0.4" strokeDasharray="3 5" opacity="0.3" className="animate-rotate" style={{ transformOrigin: '50px 50px' }} />
                  {/* Power bolt top */}
                  <path d="M47 8 L44 14 L47 14 L44 20" stroke="#E53935" strokeWidth="1.5" strokeLinecap="round" className="animate-glow" />
                </svg>
              </div>
            </div>

            {/* Item 02 - Auditorías (card LEFT, SVG RIGHT) */}
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content-card">
                <div className="empresa-card-brutal">
                  <div className="empresa-img-wrapper">
                    <img
                      src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                      alt="Auditorías de ahorro energético"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <div className="empresa-inner-content">
                    <h3 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#111', marginBottom: '1rem' }}>
                      📊 Auditorías de ahorro
                    </h3>
                    <p style={{ color: '#555', lineHeight: '1.7', fontSize: '1.05rem' }}>
                      Realizamos estudios de eficiencia energética detallados para detectar ineficiencias y fugas de capital en tus procesos operativos actuales.
                    </p>
                  </div>
                </div>
              </div>
              {/* SVG RIGHT - Animated Bar Chart / Data Analysis */}
              <div className="timeline-content-card timeline-svg-card">
                <svg width="220" height="220" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Axes */}
                  <line x1="15" y1="80" x2="88" y2="80" stroke="#E53935" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="15" y1="10" x2="15" y2="80" stroke="#E53935" strokeWidth="1.5" strokeLinecap="round" />
                  {/* Bar 1 - grows */}
                  <rect x="22" y="55" width="12" height="25" fill="rgba(229,57,53,0.15)" stroke="#E53935" strokeWidth="1" rx="1">
                    <animate attributeName="height" values="0;25;25" dur="3s" repeatCount="indefinite" />
                    <animate attributeName="y" values="80;55;55" dur="3s" repeatCount="indefinite" />
                  </rect>
                  {/* Bar 2 */}
                  <rect x="38" y="38" width="12" height="42" fill="rgba(229,57,53,0.25)" stroke="#E53935" strokeWidth="1" rx="1">
                    <animate attributeName="height" values="0;42;42" dur="3s" begin="0.3s" repeatCount="indefinite" />
                    <animate attributeName="y" values="80;38;38" dur="3s" begin="0.3s" repeatCount="indefinite" />
                  </rect>
                  {/* Bar 3 - tallest */}
                  <rect x="54" y="22" width="12" height="58" fill="rgba(229,57,53,0.4)" stroke="#E53935" strokeWidth="1" rx="1">
                    <animate attributeName="height" values="0;58;58" dur="3s" begin="0.6s" repeatCount="indefinite" />
                    <animate attributeName="y" values="80;22;22" dur="3s" begin="0.6s" repeatCount="indefinite" />
                  </rect>
                  {/* Bar 4 */}
                  <rect x="70" y="45" width="12" height="35" fill="rgba(229,57,53,0.3)" stroke="#E53935" strokeWidth="1" rx="1">
                    <animate attributeName="height" values="0;35;35" dur="3s" begin="0.9s" repeatCount="indefinite" />
                    <animate attributeName="y" values="80;45;45" dur="3s" begin="0.9s" repeatCount="indefinite" />
                  </rect>
                  {/* Trend line */}
                  <path d="M28 58 L44 40 L60 24 L76 47" stroke="#E53935" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="animate-dash" fill="none" />
                  {/* Data points */}
                  <circle cx="28" cy="58" r="2.5" fill="#E53935" className="animate-glow" />
                  <circle cx="44" cy="40" r="2.5" fill="#E53935" className="animate-glow" />
                  <circle cx="60" cy="24" r="2.5" fill="#E53935" className="animate-glow" />
                  <circle cx="76" cy="47" r="2.5" fill="#E53935" className="animate-glow" />
                </svg>
              </div>
            </div>

            {/* Item 03 - Iluminación (card LEFT, SVG RIGHT) */}
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content-card">
                <div className="empresa-card-brutal">
                  <div className="empresa-img-wrapper">
                    <img
                      src="/images/energy-storage-system.png"
                      alt="Sistema de almacenaje de energía Industrial ImportPhones"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <div className="empresa-inner-content">
                    <h3 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#111', marginBottom: '1rem' }}>
                      💡 Sistema de almacenaje de energía
                    </h3>
                    <p style={{ color: '#555', lineHeight: '1.7', fontSize: '1.05rem' }}>
                      Con nuestro sistema de baterías y HBS tratamos de aislar la empresa para no depender de la distribuidora y ser 100% autoconsumo, haciendo que en muchos casos la factura sea casi 0€.
                    </p>
                  </div>
                </div>
              </div>
              {/* SVG RIGHT - Energy Storage / Battery */}
              <div className="timeline-content-card timeline-svg-card">
                <svg width="220" height="220" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Battery Body */}
                  <rect x="30" y="25" width="40" height="60" rx="4" stroke="#E53935" strokeWidth="2" />
                  <path d="M40 25 V20 H60 V25" stroke="#E53935" strokeWidth="2" />

                  {/* Energy levels (animated) */}
                  <rect x="35" y="73" width="30" height="8" rx="1" fill="#E53935" className="animate-pulse" />
                  <rect x="35" y="61" width="30" height="8" rx="1" fill="#E53935" className="animate-pulse" style={{ animationDelay: '0.2s' }} />
                  <rect x="35" y="49" width="30" height="8" rx="1" fill="#E53935" className="animate-pulse" style={{ animationDelay: '0.4s' }} />
                  <rect x="35" y="37" width="30" height="8" rx="1" fill="#E53935" className="animate-pulse" style={{ animationDelay: '0.6s' }} />

                  {/* Lightning Icon in center */}
                  <path d="M50 40 L45 52 H50 L45 65" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />

                  {/* 100% Autoconsumo badge */}
                  <g className="animate-bounce-slow" style={{ transformOrigin: '50px 50px' }}>
                    <circle cx="78" cy="25" r="18" fill="#E53935" fillOpacity="0.1" />
                    <circle cx="78" cy="25" r="14" stroke="#E53935" strokeWidth="1.5" strokeDasharray="2 1" />
                    <text x="78" y="24" fill="#E53935" fontSize="8" fontWeight="900" textAnchor="middle" fontFamily="var(--font-display)">100%</text>
                    <text x="78" y="30" fill="#E53935" fontSize="3" fontWeight="800" textAnchor="middle" style={{ textTransform: 'uppercase' }} letterSpacing="0.05em">AUTOCONSUMO</text>
                  </g>

                  {/* Connecting lines */}
                  <path d="M15 50 H30" stroke="#E53935" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
                  <path d="M70 50 H85" stroke="#E53935" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 8c: ¿Por qué elegir a ImportPhones? (SOFT GRAY BACKGROUND) ── */}
      <section ref={trustRef} className="section-light" style={{ padding: '0 0 clamp(5rem, 10vw, 9rem) 0', background: 'var(--color-section-light-2)' }}>
        <div className="max-w-[1800px] mx-auto px-6 lg:px-12 text-center">
          <div className="section-header" style={{ marginBottom: '3.5rem' }}>
            <h2 className="section-title" style={{ color: 'var(--color-text-dark)', fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
              {[
                { text: '¿Por', red: false },
                { text: 'qué', red: false },
                { text: 'elegir', red: false },
                { text: 'a', red: false },
                { text: 'ImportPhones?', red: true }
              ].map((word, i) => (
                <div key={i} style={{ overflow: 'hidden', display: 'inline-block', margin: '0 0.15em' }}>
                  <span className="hero-word-line" style={{ display: 'block', color: word.red ? '#E53935' : 'inherit' }}>
                    {word.text}
                  </span>
                </div>
              ))}
            </h2>
          </div>

          <div className="trust-cards-grid">
            <div className="trust-card-brutal">
              <div className="trust-icon-container">
                <Award size={32} />
              </div>
              <h3 className="trust-card-title">
                10 Años de Experiencia
              </h3>
              <p className="trust-card-text">
                Conocemos el mercado de la energía y las telecomunicaciones a fondo.
              </p>
              <div className="trust-card-border-line"></div>
            </div>

            <div className="trust-card-brutal">
              <div className="trust-icon-container">
                <Star size={32} />
              </div>
              <h3 className="trust-card-title">
                Opiniones Reales
              </h3>
              <p className="trust-card-text">
                Nuestras 881 reseñas reflejan la satisfacción de quienes ya han conseguido la tarifa de luz más barata con nosotros.
              </p>
              <div className="trust-card-border-line"></div>
            </div>

            <div className="trust-card-brutal">
              <div className="trust-icon-container">
                <TrendingDown size={32} />
              </div>
              <h3 className="trust-card-title">
                Gestión Integral
              </h3>
              <p className="trust-card-text">
                Desde la fibra y tarifas móviles baratas hasta la eficiencia energética en el hogar.
              </p>
              <div className="trust-card-border-line"></div>
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
              {[
                { text: 'Información', red: false },
                { text: 'real', red: true },
                { text: 'y', red: false },
                { text: 'transparente', red: true }
              ].map((word, i) => (
                <div key={i} style={{ overflow: 'hidden', display: 'inline-block', margin: '0 0.25em' }}>
                  <span className="hero-word-line" style={{ display: 'block', color: word.red ? '#E53935' : 'inherit' }}>
                    {word.text}
                  </span>
                </div>
              ))}
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
          <h2 className="cta-title">¡Empieza a ahorrar hoy mismo!</h2>
          <p className="cta-text">
            Contacta con nuestros consultores.
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
