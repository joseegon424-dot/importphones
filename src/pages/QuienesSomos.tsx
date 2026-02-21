import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { ArrowRight, Target, Eye, Heart, Users, Award, TrendingUp, CheckCircle, Star } from 'lucide-react';
import SplitType from 'split-type';
import { allTestimonials } from '../data/testimonials';

gsap.registerPlugin(ScrollTrigger);

interface QuienesSomosProps {
  isLoaded: boolean;
}

const QuienesSomos = ({ isLoaded }: QuienesSomosProps) => {
  const pageRef = useRef<HTMLDivElement>(null);
  const historyRef = useRef<HTMLDivElement>(null);
  const missionRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isLoaded) return;

    const ctx = gsap.context(() => {
      // Page title reveal
      const heroTitle = pageRef.current?.querySelector<HTMLElement>('.page-header-title');
      if (heroTitle) {
        heroTitle.classList.add('split-target');
        const split = new SplitType(heroTitle, { types: 'words,chars' });
        gsap.fromTo(split.chars,
          { y: '110%', opacity: 0 },
          { y: '0%', opacity: 1, duration: 0.8, stagger: 0.025, ease: 'power3.out', delay: 0.4 }
        );
      }
      gsap.fromTo('.page-header-subtitle',
        { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.8 }
      );
      gsap.fromTo('.qs-skyline-path',
        { strokeDashoffset: 2000 },
        { strokeDashoffset: 0, duration: 2.8, ease: 'power2.out', stagger: 0.1, delay: 0.3 }
      );

      // History section
      gsap.fromTo('.history-content',
        { x: -60, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: historyRef.current, start: 'top 70%' } }
      );
      gsap.fromTo('.history-image-col',
        { x: 60, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: historyRef.current, start: 'top 70%' } }
      );

      // Mission/Vision — split reveal
      gsap.fromTo('.mission-panel',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.2, ease: 'power3.out', scrollTrigger: { trigger: missionRef.current, start: 'top 70%' } }
      );

      // Values timeline: each card from alternate sides
      const valueCards = document.querySelectorAll('.qs-value-card');
      valueCards.forEach((card, i) => {
        gsap.fromTo(card,
          { x: i % 2 === 0 ? -60 : 60, opacity: 0 },
          {
            x: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 80%' }
          }
        );
      });
      // Timeline line grow
      gsap.fromTo('.qs-timeline-line',
        { scaleY: 0, transformOrigin: 'top center' },
        {
          scaleY: 1, duration: 2, ease: 'power2.out',
          scrollTrigger: { trigger: valuesRef.current, start: 'top 70%', end: 'bottom 30%', scrub: 1 }
        }
      );

      // Testimonials
      gsap.fromTo('.testimonial-card-brutal',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: testimonialsRef.current, start: 'top 72%' } }
      );

      // CTA
      gsap.fromTo('.cta-about-content',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: ctaRef.current, start: 'top 70%' } }
      );
    }, pageRef);

    return () => ctx.revert();
  }, [isLoaded]);

  const missionVision = [
    {
      icon: Target,
      title: 'Misión',
      accent: '#E53935',
      description: 'Ayudar a empresas y particulares a optimizar sus gastos en telecomunicaciones y energía, ofreciendo asesoramiento experto y gestión integral de todos los trámites.',
      stat: '+5.000 clientes',
      statSub: 'que ya ahorran',
    },
    {
      icon: Eye,
      title: 'Visión',
      accent: '#4361ee',
      description: 'Ser la consultora de referencia en España para servicios de telecomunicaciones y energía, reconocida por nuestra transparencia, profesionalidad y resultados tangibles.',
      stat: '#1 en confianza',
      statSub: 'Barcelona & alrededores',
    },
  ];

  const values = [
    { icon: Heart, title: 'Pasión', description: 'Nos apasiona ayudar a nuestros clientes a ahorrar dinero. Cada caso es único y lo tratamos con dedicación.', color: '#E53935', year: '01' },
    { icon: Award, title: 'Excelencia', description: 'Buscamos la excelencia en cada gestión. Nos mantenemos actualizados para ofrecer siempre lo mejor.', color: '#f0a500', year: '02' },
    { icon: Users, title: 'Cercanía', description: 'Trato personalizado y cercano. Estamos disponibles para resolver cualquier duda o incidencia.', color: '#4361ee', year: '03' },
    { icon: TrendingUp, title: 'Mejora continua', description: 'Analizamos constantemente el mercado para ofrecer las mejores opciones a nuestros clientes.', color: '#00a651', year: '04' },
  ];

  const whyUs = [
    'Asesoramiento 100% gratuito y sin compromiso',
    'Gestionamos todos los trámites por ti',
    'Acceso a tarifas exclusivas',
    'Atención personalizada durante todo el proceso',
    'Ahorro garantizado o te devolvemos el dinero',
    'Disponibles 6 días a la semana',
  ];

  const testimonials = allTestimonials.slice(3, 9);

  const faq = [
    { question: '¿Cuánto tarda el cambio de compañía?', answer: 'Una vez firmado el contrato puede durar entre 5 y 20 días el cambio de comercializadora.' },
    { question: '¿Tengo que pagar algo por el cambio?', answer: 'No, el cambio es un trámite gratuito. Si sube o baja potencia inscrita sí hay un coste regulado por LEY.' },
    { question: '¿Cuánto puedo ahorrar realmente?', answer: 'Depende de su tarifa actual y del estudio presentado por nuestro asesor; toda esta información la tendrá cuando un asesor se contacte con usted.' },
    { question: '¿Cuánto tarda la portabilidad?', answer: 'La portabilidad móvil es de 2 días hábiles sin contar festivos ni fines de semana, una vez lanzada la ventana de cambio.' },
    { question: '¿Pierdo mi número de teléfono?', answer: 'La portabilidad móvil mantiene su mismo número de siempre; el cambio siempre se realiza de madrugada entre las 3 y las 6 AM.' },
    { question: '¿Hay permanencia?', answer: 'Depende de la compañía; algunas no tienen permanencia, como por ejemplo O2.' },
  ];

  const toggleFaq = (index: number) => {
    const items = document.querySelectorAll('.faq-item');
    items.forEach((item, i) => {
      if (i === index) item.classList.toggle('active');
      else item.classList.remove('active');
    });
  };

  return (
    <div ref={pageRef} className="overflow-hidden">

      {/* ── Hero header ── */}
      <section className="page-header" style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="hero-subpage-svg" aria-hidden="true">
          <svg viewBox="0 0 700 500" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path className="qs-skyline-path" d="M80 400 L80 200 L130 200 L130 400" stroke="#E53935" strokeWidth="1.5" strokeDasharray="2000" strokeDashoffset="2000" />
            <path className="qs-skyline-path" d="M90 200 L90 160 L120 160 L120 200" stroke="#E53935" strokeWidth="1" strokeDasharray="2000" strokeDashoffset="2000" />
            <path className="qs-skyline-path" d="M140 400 L140 150 L200 150 L200 400" stroke="rgba(229,57,53,0.7)" strokeWidth="1.5" strokeDasharray="2000" strokeDashoffset="2000" />
            <path className="qs-skyline-path" d="M165 150 L165 100 L175 100 L175 150" stroke="rgba(229,57,53,0.7)" strokeWidth="1" strokeDasharray="2000" strokeDashoffset="2000" />
            <path className="qs-skyline-path" d="M210 400 L210 80 L290 80 L290 400" stroke="rgba(229,57,53,0.9)" strokeWidth="2" strokeDasharray="2000" strokeDashoffset="2000" />
            <path className="qs-skyline-path" d="M245 80 L245 40 L255 40 L255 80" stroke="rgba(229,57,53,0.9)" strokeWidth="1.5" strokeDasharray="2000" strokeDashoffset="2000" />
            <path className="qs-skyline-path" d="M300 400 L300 180 L370 180 L370 400" stroke="rgba(229,57,53,0.6)" strokeWidth="1.5" strokeDasharray="2000" strokeDashoffset="2000" />
            <path className="qs-skyline-path" d="M380 400 L380 250 L440 250 L440 400" stroke="rgba(229,57,53,0.5)" strokeWidth="1" strokeDasharray="2000" strokeDashoffset="2000" />
            <path className="qs-skyline-path" d="M450 400 L450 120 L530 120 L530 400" stroke="rgba(229,57,53,0.7)" strokeWidth="1.5" strokeDasharray="2000" strokeDashoffset="2000" />
            <path className="qs-skyline-path" d="M60 400 L620 400" stroke="rgba(229,57,53,0.3)" strokeWidth="1" strokeDasharray="2000" strokeDashoffset="2000" />
          </svg>
        </div>
        <div className="max-w-[1800px] mx-auto px-6 lg:px-12" style={{ position: 'relative', zIndex: 2 }}>
          <p className="page-header-label">Sobre nosotros</p>
          <h1 className="page-header-title">Quiénes <span style={{ color: '#E53935' }}>somos</span></h1>
          <p className="page-header-subtitle">
            Somos un equipo de profesionales apasionados por ayudar a empresas y particulares
            a optimizar sus gastos en telecomunicaciones y energía.
          </p>
        </div>
      </section>

      {/* ── Historia: two-column with real image ── */}
      <section ref={historyRef} className="section-light" style={{ padding: 'clamp(5rem, 9vw, 8rem) 0' }}>
        <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
          <div className="alt-layout" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>
            <div className="history-content">
              <span style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', color: '#E53935', textTransform: 'uppercase', display: 'block', marginBottom: '1rem' }}>NUESTRA HISTORIA</span>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, lineHeight: 1.2, marginBottom: '1.5rem', color: 'var(--color-text-dark)' }}>
                Más de <span style={{ color: '#E53935' }}>10 años</span> ayudando a ahorrar
              </h2>
              <p style={{ color: 'var(--color-gray-mid)', lineHeight: 1.8, marginBottom: '1.25rem' }}>
                Importphones.net nació en 2015 con una misión clara: ayudar a las personas y empresas
                a pagar menos por sus servicios de telecomunicaciones y energía.
              </p>
              <p style={{ color: 'var(--color-gray-mid)', lineHeight: 1.8, marginBottom: '1.25rem' }}>
                Lo que comenzó como un pequeño proyecto familiar se ha convertido en una empresa
                reconocida con más de 5,000 clientes satisfechos y 881 reseñas positivas en Google.
              </p>
              <p style={{ color: 'var(--color-gray-mid)', lineHeight: 1.8 }}>
                Asignamos un profesional para su atención personalizada en todo el proceso,
                tanto en telecomunicaciones, como en energía.
              </p>
              <div style={{ display: 'flex', gap: '2rem', marginTop: '2.5rem', flexWrap: 'wrap' }}>
                {[{ n: '10+', l: 'Años' }, { n: '5.000+', l: 'Clientes' }, { n: '881', l: 'Reseñas' }].map((s, i) => (
                  <div key={i} style={{ borderLeft: '2px solid #E53935', paddingLeft: '1rem' }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 900, color: '#E53935' }}>{s.n}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--color-gray-mid)', fontWeight: 500 }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: real photo — service-telecom image */}
            <div className="history-image-col" style={{ position: 'relative' }}>
              <div style={{
                borderRadius: '24px',
                overflow: 'hidden',
                aspectRatio: '4/3',
                boxShadow: '0 40px 80px rgba(0,0,0,0.12)',
                position: 'relative',
              }}>
                <img
                  src="/images/service-telecom.jpg"
                  alt="Equipo Importphones trabajando"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                {/* Overlay badge */}
                <div style={{
                  position: 'absolute',
                  bottom: '1.5rem',
                  left: '1.5rem',
                  background: 'rgba(229,57,53,0.95)',
                  color: '#fff',
                  borderRadius: '12px',
                  padding: '1rem 1.5rem',
                  backdropFilter: 'blur(10px)',
                }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 900, lineHeight: 1 }}>2015</div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 600, opacity: 0.8, marginTop: '0.25rem' }}>Fundación</div>
                </div>
              </div>
              {/* Floating experience card */}
              <div style={{
                position: 'absolute',
                top: '-1.5rem',
                right: '-1.5rem',
                background: '#111',
                color: '#fff',
                borderRadius: '16px',
                padding: '1.5rem',
                boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
              }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 900, color: '#E53935', lineHeight: 1 }}>+10</div>
                <div style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginTop: '0.25rem' }}>Años experiencia</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Misión & Visión: Split 2-panel ── */}
      <section ref={missionRef} style={{ background: '#080808', padding: 'clamp(5rem, 9vw, 8rem) 0' }}>
        <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
          <div className="section-header" style={{ marginBottom: '4rem' }}>
            <p className="section-label">FILOSOFÍA</p>
            <h2 className="section-title">Nuestra <span>esencia</span></h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px', borderRadius: '24px', overflow: 'hidden' }}>
            {missionVision.map((item, i) => (
              <div key={i} className="mission-panel" style={{
                background: i === 0 ? '#111' : '#0a0a0a',
                padding: 'clamp(3rem, 5vw, 5rem)',
                position: 'relative',
                overflow: 'hidden',
              }}>
                {/* Big decorative number */}
                <div style={{
                  position: 'absolute',
                  bottom: '-1rem',
                  right: '2rem',
                  fontFamily: 'var(--font-display)',
                  fontSize: '8rem',
                  fontWeight: 900,
                  color: 'rgba(255,255,255,0.03)',
                  lineHeight: 1,
                  letterSpacing: '-0.05em',
                  userSelect: 'none',
                }}>0{i + 1}</div>

                <div style={{
                  width: '60px', height: '60px',
                  background: `${item.accent}18`,
                  border: `1px solid ${item.accent}40`,
                  borderRadius: '18px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: item.accent,
                  marginBottom: '2rem',
                }}>
                  <item.icon size={28} />
                </div>

                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '2rem',
                  fontWeight: 900,
                  color: '#fff',
                  marginBottom: '1.25rem',
                  letterSpacing: '-0.02em',
                }}>{item.title}</h3>

                <p style={{
                  color: 'rgba(255,255,255,0.5)',
                  lineHeight: 1.8,
                  fontSize: '1rem',
                  marginBottom: '2.5rem',
                }}>{item.description}</p>

                {/* Bottom accent stat */}
                <div style={{
                  borderTop: `1px solid ${item.accent}25`,
                  paddingTop: '1.5rem',
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '0.75rem',
                }}>
                  <span style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.3rem',
                    fontWeight: 900,
                    color: item.accent,
                  }}>{item.stat}</span>
                  <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.35)' }}>{item.statSub}</span>
                </div>

                {/* Corner accent line */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '3px',
                  height: '100%',
                  background: `linear-gradient(to bottom, ${item.accent}, transparent)`,
                }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Values: Vertical Timeline ── */}
      <section ref={valuesRef} style={{ background: '#f8f8f8', padding: 'clamp(5rem, 9vw, 8rem) 0' }}>
        <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
          <div className="section-header" style={{ marginBottom: '4rem', textAlign: 'center' }}>
            <p className="section-label">NUESTROS VALORES</p>
            <h2 className="section-title" style={{ color: 'var(--color-text-dark)' }}>Lo que nos <span>define</span></h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 40px 1fr', gap: '0 2rem', position: 'relative' }}>
            {/* Central timeline line */}
            <div style={{ gridColumn: '2', gridRow: `1 / ${values.length * 2 + 1}`, display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
              <div className="qs-timeline-line" style={{ width: '2px', flex: 1, background: 'linear-gradient(to bottom, #E53935, #4361ee, #f0a500, #00a651)', borderRadius: '2px' }} />
            </div>

            {values.map((value, index) => {
              const isLeft = index % 2 === 0;
              return (
                <div key={index} className="qs-value-card" style={{
                  gridColumn: isLeft ? '1' : '3',
                  gridRow: index + 1,
                  background: '#fff',
                  border: `1px solid rgba(0,0,0,0.06)`,
                  borderRadius: '20px',
                  padding: '2rem 2.5rem',
                  marginBottom: '2rem',
                  position: 'relative',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
                  cursor: 'default',
                }}>
                  {/* Number badge */}
                  <div style={{
                    position: 'absolute',
                    top: '-1px',
                    [isLeft ? 'right' : 'left']: '-1.5rem',
                    width: '40px',
                    height: '40px',
                    background: value.color,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 900,
                    fontSize: '0.75rem',
                    color: '#fff',
                  }}>{value.year}</div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                    <div style={{
                      width: '44px', height: '44px',
                      background: `${value.color}12`,
                      borderRadius: '12px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: value.color,
                    }}>
                      <value.icon size={20} />
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 800, color: 'var(--color-text-dark)' }}>{value.title}</h3>
                  </div>
                  <p style={{ color: 'var(--color-gray-mid)', lineHeight: 1.7, fontSize: '0.9rem' }}>{value.description}</p>
                  <div style={{ position: 'absolute', bottom: 0, left: '1.5rem', right: '1.5rem', height: '2px', background: value.color, borderRadius: '0 0 8px 8px', transform: 'scaleX(0)', transformOrigin: 'left', transition: 'transform 0.4s ease' }} className="val-line" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Why Us with Image ── */}
      <section style={{ background: '#0a0a0a', padding: 'clamp(5rem, 9vw, 8rem) 0' }}>
        <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>
            <div>
              <span style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', color: '#E53935', textTransform: 'uppercase', display: 'block', marginBottom: '1rem' }}>VENTAJAS</span>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#fff', lineHeight: 1.2, marginBottom: '2rem' }}>
                ¿Por qué <span style={{ color: '#E53935' }}>elegirnos?</span>
              </h2>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {whyUs.map((item, index) => (
                  <li key={index} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', color: 'rgba(255,255,255,0.75)', fontWeight: 500 }}>
                    <CheckCircle size={20} style={{ color: '#E53935', flexShrink: 0, marginTop: '2px' }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ position: 'relative', borderRadius: '24px', overflow: 'hidden', aspectRatio: '4/3' }}>
              <img src="/images/service-energy.jpg" alt="Ahorra tiempo y dinero" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.7)' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(229,57,53,0.4), transparent)' }} />
              <div style={{ position: 'absolute', bottom: '2rem', left: '2rem', color: '#fff' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', fontWeight: 900, lineHeight: 1 }}>40%</div>
                <div style={{ fontSize: '1rem', fontWeight: 600, opacity: 0.85 }}>Ahorro promedio</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section ref={testimonialsRef} className="section-awwards testimonials-section">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
          <div className="section-header">
            <p className="section-label">Google Reviews</p>
            <h2 className="section-title">Historias reales de <span>nuestros clientes</span></h2>
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
                  <span style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Opinión Real</span>
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

      {/* ── FAQ ── */}
      <section className="section-awwards faq-section">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
          <div className="section-header">
            <p className="section-label">Preguntas</p>
            <h2 className="section-title">Resolvemos tus <span>dudas</span></h2>
          </div>
          <div className="faq-list">
            {faq.map((item, index) => (
              <div key={index} className="faq-item">
                <button className="faq-question" onClick={() => toggleFaq(index)}>
                  <span>{item.question}</span>
                  <span className="faq-icon">+</span>
                </button>
                <div className="faq-answer"><p>{item.answer}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section ref={ctaRef} className="cta-brutal-section">
        <svg className="cta-bg-svg" viewBox="0 0 1200 500" fill="none">
          {[80, 160, 240, 320, 400].map((y, i) => (<line key={i} className="cta-grid-line" x1="0" y1={y} x2="1200" y2={y} stroke="rgba(255,255,255,0.03)" strokeWidth="1" />))}
        </svg>
        <div className="cta-about-content cta-content" style={{ position: 'relative', zIndex: 2 }}>
          <p style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '1rem' }}>— Únete a nuestra familia —</p>
          <h2 className="cta-brutal-title">Únete a más de<br /><span className="cta-gradient-text">5.000 clientes</span></h2>
          <p className="cta-text" style={{ maxWidth: '520px', margin: '1.5rem auto 2.5rem' }}>
            Descubre por qué más de 5,000 clientes confían en nosotros para optimizar sus gastos en telecomunicaciones y energía.
          </p>
          <Link to="/contacto" className="cta-btn-brutal">
            <ArrowRight size={20} />
            <span>Contactar ahora</span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default QuienesSomos;
