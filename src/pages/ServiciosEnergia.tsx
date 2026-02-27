import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Shield, Clock, TrendingUp, CheckCircle, Headphones, Star, Leaf } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ServiciosEnergiaProps { isLoaded: boolean; }

const ServiciosEnergia = ({ isLoaded }: ServiciosEnergiaProps) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const providersRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const savingsRef = useRef<HTMLDivElement>(null);
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

      // Hero image animation (Target removed, keeping delay logic synchronized)

      // Hero stat numbers count-up
      const statEls = heroRef.current?.querySelectorAll<HTMLElement>('.en-hero-stat');
      statEls?.forEach((el: HTMLElement) => {
        const target = parseFloat(el.dataset.target || '0');
        const suffix = el.dataset.suffix || '';
        const counter = { val: 0 };
        gsap.to(counter, {
          val: target, duration: 2, ease: 'power2.out', delay: 0.6,
          onUpdate: () => { el.textContent = Math.round(counter.val) + suffix; },
          scrollTrigger: { trigger: el, start: 'top 95%' }
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
        { scale: 0.8, opacity: 0, y: 30 },
        {
          scale: 1, opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'back.out(1.5)',
          scrollTrigger: { trigger: providersRef.current, start: 'top 75%' }
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
        { x: -60, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1.1, ease: 'power3.out',
          scrollTrigger: { trigger: benefitsRef.current, start: 'top 65%' }
        }
      );

      // ── Process (different layout now)
      gsap.fromTo('.en-process-step-col',
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: 'back.out(1.2)',
          scrollTrigger: { trigger: processRef.current, start: 'top 75%' }
        }
      );

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

    }, heroRef);
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
    { name: 'Endesa', logo: 'https://firmar.online/wp-content/uploads/2016/07/Endesa-Logo.png', color: '#005481' },
    { name: 'Iberdrola', logo: 'https://www.liferay.com/documents/10182/454278648/Logo-Iberdrola.png/34596900-51b6-70f0-c88c-6ea56d8f46ec?t=1663242153214&download=true', color: '#3A913F' },
    { name: 'Niba', logo: 'https://static2.chollometro.com/images/780x408/images/n/niba-LOGO%20(1).png', color: '#FF0000' },
    { name: 'Naturgy', logo: '/images/logo_naturgy_local.svg', color: '#00A859' },
    { name: 'Repsol', logo: '/images/repsol-logo-DmRPVn3o.png', color: '#006C35' },
    { name: 'Audax', logo: 'https://upload.wikimedia.org/wikipedia/commons/6/69/Audax_renovables.png', color: '#FFB81C' },
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

  const faq = [
    { question: '¿Cuánto tarda el cambio de compañía de luz?', answer: 'Una vez firmado el contrato puede durar entre 5 y 20 días el cambio de comercializadora. Te recordamos que no sufrirás cortes de suministro.' },
    { question: '¿Tengo que pagar algo por el cambio?', answer: 'No, el cambio es un trámite totalmente gratuito. Si sube o baja potencia inscrita sí hay un coste regulado por LEY de la distribuidora.' },
    { question: '¿Cuánto puedo ahorrar realmente?', answer: 'Depende de su tarifa actual y del consumo reflejado en el estudio presentado por nuestro asesor. Hay clientes que ahorran hasta un 40% mensual. Esa información la tendrá clara y sin compromiso.' },
    { question: '¿Hay permanencia?', answer: 'La mayoría de tarifas del mercado libre y de las comercializadoras que ofrecemos NO exigen ningún tipo de permanencia.' },
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
          S1 — HERO (2-col brutalist dark red energy)
      ══════════════════════════════════════════════ */}
      {/* ── S1: HERO */}
      <section className="hero-awwards">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/energy-hero-bg.jpg"
            alt="Energía"
            className="w-full h-full object-cover filter brightness-[0.35]"
          />
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3BaseFilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/baseFilter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
        </div>

        <div className="max-w-[1800px] mx-auto px-6 lg:px-12 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <p className="hero-label">SERVICIOS</p>
              <h1 ref={titleRef} className="hero-title-brutal">
                {[
                  { text: 'ENERGÍA', red: true },
                  { text: '& AHORRO', red: false },
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
                Optimiza tu factura eléctrica y ahorra hasta un 40%. Gestionamos el cambio de compañía sin cortes de suministro y con asesoramiento personalizado.
              </p>

              {/* Stat row */}
              <div className="flex gap-8 mt-12 bg-white/[0.03] border border-white/10 p-8 rounded-2xl backdrop-blur-sm">
                {[
                  { target: 40, suffix: '%', label: 'Ahorro' },
                  { target: 5000, suffix: '+', label: 'Clientes' },
                  { target: 24, suffix: 'h', label: 'Estudio' },
                ].map((s, i) => (
                  <div key={i}>
                    <div className="en-hero-stat" data-target={s.target} data-suffix={s.suffix}
                      style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 900, color: '#E53935', lineHeight: 1 }}>
                      0{s.suffix}
                    </div>
                    <div className="text-[10px] text-white/40 uppercase tracking-widest font-bold mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden lg:block relative">
              <div className="aspect-[4/3] border-[6px] border-white/5 rounded-3xl overflow-hidden shadow-2xl">
                <img src="/images/service-energy.jpg" alt="Ahorro energético" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-[#E53935] text-white p-6 rounded-2xl shadow-xl border-4 border-black">
                <div className="text-3xl font-black italic">-40%</div>
                <div className="text-[10px] font-bold uppercase tracking-wider">Ahorro Garantizado</div>
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
          S2 — SERVICES (INVERTED BRUTALIST) 
          Default: Red BG, White Text, Black shadow
          Hover: Black BG, flat
      ══════════════════════════════════════════════ */}
      <section className="section-light" style={{ padding: 'clamp(5rem,9vw,8rem) 0' }}>
        <div ref={servicesRef} className="max-w-[1800px] mx-auto px-6 lg:px-12">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 450px', gap: '6rem', alignItems: 'flex-start' }}>
            <div>
              <p className="section-label">QUÉ OFRECEMOS</p>
              <h2 className="section-title" style={{ color: 'var(--color-text-dark)', marginBottom: '3rem' }}>
                Qué <span>ofrecemos</span>
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {services.map((svc, i) => (
                  <div key={i} className="en-service-card group" style={{
                    background: '#E53935',
                    border: '2px solid #111',
                    padding: '2.5rem',
                    display: 'flex', gap: '1.75rem', alignItems: 'flex-start',
                    position: 'relative',
                    transition: 'all 0.35s ease',
                    boxShadow: '-10px 10px 0 #111'
                  }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.transform = 'translate(-10px, 10px)';
                      el.style.boxShadow = '0 0 0 #111';
                      el.style.background = '#111';
                      el.style.borderColor = '#111';

                      const t = el.querySelector('.en-svc-title') as HTMLElement;
                      if (t) t.style.color = '#fff';

                      const n = el.querySelector('.en-svc-num') as HTMLElement;
                      if (n) n.style.color = 'rgba(255,255,255,0.05)';

                      const ticks = el.querySelectorAll('.en-svc-tick');
                      ticks.forEach(ti => { (ti as HTMLElement).style.color = '#fff'; });
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.transform = '';
                      el.style.boxShadow = '-10px 10px 0 #111';
                      el.style.background = '#E53935';
                      el.style.borderColor = '#111';

                      const t = el.querySelector('.en-svc-title') as HTMLElement;
                      if (t) t.style.color = '#fff';

                      const n = el.querySelector('.en-svc-num') as HTMLElement;
                      if (n) n.style.color = 'rgba(0,0,0,0.1)';

                      const ticks = el.querySelectorAll('.en-svc-tick');
                      ticks.forEach(ti => { (ti as HTMLElement).style.color = '#111'; });
                    }}
                  >
                    <span className="en-svc-num" style={{ position: 'absolute', top: '1rem', right: '1.5rem', fontFamily: 'var(--font-display)', fontSize: '5rem', fontWeight: 900, color: 'rgba(0,0,0,0.1)', lineHeight: 1, transition: 'color 0.3s ease' }}>{svc.number}</span>
                    <div style={{ width: '55px', height: '55px', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#111', flexShrink: 0, border: '2px solid #111', boxShadow: '-3px 3px 0 #111' }}>
                      <svc.icon size={28} />
                    </div>
                    <div style={{ flex: 1, position: 'relative', zIndex: 1 }}>
                      <h3 className="en-svc-title" style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 900, color: '#fff', marginBottom: '0.75rem', textTransform: 'uppercase', transition: 'color 0.3s ease' }}>{svc.title}</h3>
                      <p style={{ color: 'rgba(255,255,255,0.9)', lineHeight: 1.7, fontSize: '0.95rem', marginBottom: svc.features.length ? '1.25rem' : 0, fontWeight: 500 }}>{svc.description}</p>
                      {svc.features.length > 0 && (
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                          {svc.features.map((f, j) => (
                            <li key={j} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', fontWeight: 700, color: '#fff' }}>
                              <CheckCircle className="en-svc-tick" size={16} style={{ color: '#111', flexShrink: 0, transition: 'color 0.3s ease' }} /> {f}
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
              <div style={{ border: '4px solid #111', overflow: 'hidden', aspectRatio: '3/4', boxShadow: '15px 15px 0 #E53935' }}>
                <img src="/images/service-energy.jpg" alt="Servicios energía" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              {/* Floating badge top */}
              <div style={{ position: 'absolute', top: '0', left: '-2rem', background: '#111', color: '#fff', border: '2px solid #fff', padding: '1rem 1.5rem', boxShadow: '-8px 8px 0 #fff' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 900, lineHeight: 1 }}>ANÁLISIS</div>
                <div style={{ fontSize: '0.75rem', color: '#E53935', marginTop: '0.2rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>Gratuito y detallado</div>
              </div>
              {/* Floating badge bottom */}
              <div style={{ position: 'absolute', bottom: '2rem', right: '-2.5rem', background: '#fff', border: '2px solid #111', padding: '1.25rem 1.5rem', boxShadow: '10px 10px 0 #111', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <div style={{ background: '#111', width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Leaf size={16} style={{ color: '#E53935' }} />
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '1rem', color: '#111', textTransform: 'uppercase' }}>100% Verde</div>
                  <div style={{ fontSize: '0.75rem', color: '#666', fontWeight: 700, textTransform: 'uppercase' }}>Energía renovable</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          S3 — PROVIDERS (BRUTALIST INVERTED)
      ══════════════════════════════════════════════ */}
      <section style={{ background: '#0a0a0a', padding: 'clamp(6rem,9vw,8rem) 0' }}>
        <div ref={providersRef} className="max-w-[1800px] mx-auto px-6 lg:px-12">
          <div className="section-header" style={{ marginBottom: '4rem', textAlign: 'center' }}>
            <p className="section-label" style={{ color: '#E53935' }}>COMERCIALIZADORAS</p>
            <h2 className="section-title" style={{ color: '#fff' }}>
              Trabajamos con las <span>principales</span>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
            {providers.map((pv, i) => (
              <div key={i} className="en-provider-item group" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                <div style={{
                  width: '100%', background: '#111',
                  border: '1px solid #333',
                  padding: '2.5rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  aspectRatio: '1/1', overflow: 'hidden',
                  transition: 'all 0.35s ease',
                  boxShadow: '8px 8px 0 #E53935'
                }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = '#fff';
                    el.style.borderColor = '#fff';
                    el.style.transform = 'translate(8px, 8px)';
                    el.style.boxShadow = 'none';
                    const img = el.querySelector('img') as HTMLImageElement;
                    if (img) img.style.filter = 'none';
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = '#111';
                    el.style.borderColor = '#333';
                    el.style.transform = '';
                    el.style.boxShadow = '8px 8px 0 #E53935';
                    const img = el.querySelector('img') as HTMLImageElement;
                    if (img) img.style.filter = 'grayscale(1) brightness(2)'; // make logo white initially
                  }}
                >
                  <img src={pv.logo} alt={pv.name} style={{ maxHeight: '60px', maxWidth: '85%', objectFit: 'contain', filter: 'grayscale(1) brightness(2)', transition: 'filter 0.35s ease' }} />
                </div>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.85rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#888' }}>{pv.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          S4 — BENEFITS (BLACK) + image right
      ══════════════════════════════════════════════ */}
      <section style={{ background: '#111', padding: 'clamp(5rem,9vw,8rem) 0', borderTop: '1px solid #222' }}>
        <div ref={benefitsRef} className="max-w-[1800px] mx-auto px-6 lg:px-12">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'center' }}>
            {/* Left: benefit cards */}
            <div>
              <p className="section-label" style={{ color: '#E53935' }}>VENTAJAS</p>
              <h2 className="section-title" style={{ color: '#fff', marginBottom: '3rem' }}>
                Por qué optimizar tu <span>factura</span>
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                {benefits.map((b, i) => (
                  <div key={i} className="en-benefit-card group" style={{
                    background: '#111',
                    border: '1px solid #333',
                    padding: '2rem',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    boxShadow: '-8px 8px 0 #E53935'
                  }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.transform = 'translate(-8px, 8px)';
                      el.style.boxShadow = 'none';
                      el.style.background = '#fff';
                      el.style.borderColor = '#fff';

                      const ti = el.querySelector('.en-ben-ti') as HTMLElement;
                      if (ti) ti.style.color = '#111';
                      const de = el.querySelector('.en-ben-de') as HTMLElement;
                      if (de) de.style.color = '#444';
                      const iconWrap = el.querySelector('.en-ben-icon') as HTMLElement;
                      if (iconWrap) {
                        iconWrap.style.background = '#E53935';
                        iconWrap.style.color = '#fff';
                      }
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.transform = '';
                      el.style.boxShadow = '-8px 8px 0 #E53935';
                      el.style.background = '#111';
                      el.style.borderColor = '#333';

                      const ti = el.querySelector('.en-ben-ti') as HTMLElement;
                      if (ti) ti.style.color = '#E53935';
                      const de = el.querySelector('.en-ben-de') as HTMLElement;
                      if (de) de.style.color = '#aaa';
                      const iconWrap = el.querySelector('.en-ben-icon') as HTMLElement;
                      if (iconWrap) {
                        iconWrap.style.background = '#222';
                        iconWrap.style.color = '#E53935';
                      }
                    }}
                  >
                    <div className="en-ben-icon" style={{ width: '45px', height: '45px', background: '#222', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#E53935', marginBottom: '1.25rem', transition: 'all 0.3s ease' }}>
                      <b.icon size={20} />
                    </div>
                    <h3 className="en-ben-ti" style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 900, color: '#E53935', marginBottom: '0.5rem', textTransform: 'uppercase', transition: 'color 0.3s ease' }}>{b.title}</h3>
                    <p className="en-ben-de" style={{ fontSize: '0.85rem', color: '#aaa', lineHeight: 1.6, fontWeight: 500, transition: 'color 0.3s ease' }}>{b.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: energy photo */}
            <div className="en-benefit-img" style={{ position: 'relative' }}>
              <div style={{ border: '4px solid #E53935', overflow: 'hidden', aspectRatio: '4/3', boxShadow: '15px 15px 0 #fff' }}>
                <img src="/images/service-energy.jpg" alt="Beneficios ahorro energía" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'contrast(1.2)' }} />
              </div>

              {/* Stat card */}
              <div style={{ position: 'absolute', top: '-1rem', left: '-2rem', background: '#111', border: '2px solid #fff', padding: '1.25rem 1.5rem', boxShadow: '-10px 10px 0 #000', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '40px', height: '40px', background: '#00A859', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                  <Leaf size={20} />
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '1.1rem', color: '#fff', textTransform: 'uppercase' }}>Energía verde</div>
                  <div style={{ fontSize: '0.75rem', color: '#aaa', fontWeight: 700, textTransform: 'uppercase' }}>100% renovable</div>
                </div>
              </div>
              {/* Bottom stat */}
              <div style={{ position: 'absolute', bottom: '-2rem', right: '-1rem', background: '#E53935', color: '#fff', border: '2px solid #111', padding: '1.5rem 2rem', boxShadow: '10px 10px 0 #111' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 900, lineHeight: 1 }}>480€</div>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, marginTop: '0.2rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Ahorro / año</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          S5 — PROCESS (NEW LAYOUT GRID BRUTALIST)
      ══════════════════════════════════════════════ */}
      <section style={{ background: '#f5f5f5', padding: 'clamp(5rem,9vw,8rem) 0', borderTop: '4px solid #111' }}>
        <div ref={processRef} className="max-w-[1800px] mx-auto px-6 lg:px-12">

          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <p className="section-label">PROCESO</p>
            <h2 className="section-title" style={{ color: '#111' }}>
              Cómo <span>funciona</span>
            </h2>
          </div>

          {/* 4-col Brutalist timeline grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {process.map((step, i) => (
              <div key={i} className="en-process-step-col group" style={{
                background: '#111',
                border: '2px solid #E53935',
                padding: '2.5rem 2rem',
                position: 'relative',
                transition: 'all 0.3s ease',
                boxShadow: '-10px 10px 0 #E53935'
              }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = 'translate(-10px, 10px)';
                  el.style.boxShadow = 'none';
                  el.style.background = '#fff';
                  el.style.borderColor = '#111';

                  const n = el.querySelector('.en-proc-num') as HTMLElement;
                  if (n) n.style.color = '#E53935';
                  const t = el.querySelector('.en-proc-ti') as HTMLElement;
                  if (t) t.style.color = '#111';
                  const d = el.querySelector('.en-proc-de') as HTMLElement;
                  if (d) d.style.color = '#444';
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = '';
                  el.style.boxShadow = '-10px 10px 0 #E53935';
                  el.style.background = '#111';
                  el.style.borderColor = '#E53935';

                  const n = el.querySelector('.en-proc-num') as HTMLElement;
                  if (n) n.style.color = 'rgba(255,255,255,0.1)';
                  const t = el.querySelector('.en-proc-ti') as HTMLElement;
                  if (t) t.style.color = '#fff';
                  const d = el.querySelector('.en-proc-de') as HTMLElement;
                  if (d) d.style.color = '#aaa';
                }}
              >
                <div className="en-proc-num" style={{ position: 'absolute', top: '1rem', right: '1rem', fontFamily: 'var(--font-display)', fontSize: '5rem', fontWeight: 900, color: 'rgba(255,255,255,0.1)', lineHeight: 0.8, transition: 'color 0.3s ease' }}>{step.number}</div>
                <h3 className="en-proc-ti" style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 900, color: '#fff', marginBottom: '1rem', marginTop: '2.5rem', textTransform: 'uppercase', transition: 'color 0.3s ease', position: 'relative', zIndex: 1 }}>{step.title}</h3>
                <p className="en-proc-de" style={{ color: '#aaa', fontSize: '1rem', lineHeight: 1.6, fontWeight: 500, transition: 'color 0.3s ease', position: 'relative', zIndex: 1 }}>{step.desc}</p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '4rem', display: 'flex', justifyContent: 'center' }}>
            <div style={{ background: '#fff', border: '2px solid #111', padding: '1.5rem 3rem', display: 'flex', alignItems: 'center', gap: '3rem', flexWrap: 'wrap', justifyContent: 'center', boxShadow: '8px 8px 0 #111' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '1.2rem', textTransform: 'uppercase', color: '#E53935' }}>Proceso cambio energía:</div>
              {['Sin cortes', 'Sin papeleos', 'Totalmente Gratis'].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#111', fontWeight: 800, fontSize: '1rem', textTransform: 'uppercase' }}>
                  <CheckCircle size={18} style={{ color: '#E53935' }} /> {item}
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════
          S6 — SAVINGS EXAMPLE (WHITE)
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
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0', maxWidth: '1000px', margin: '0 auto', border: '4px solid #111', boxShadow: '20px 20px 0 #E53935' }}>
            {/* Before */}
            <div className="en-savings-card" style={{ background: '#f0f0f0', padding: '4rem 2rem', textAlign: 'center', borderRight: '2px solid #111' }}>
              <p style={{ fontSize: '0.85rem', fontWeight: 900, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#111', marginBottom: '1.5rem' }}>FACTURA ACTUAL</p>
              <div className="en-saving-num" data-target="95" data-suffix="€" style={{ fontFamily: 'var(--font-display)', fontSize: '4rem', fontWeight: 900, color: '#111', textDecoration: 'line-through', textDecorationColor: '#E53935', textDecorationThickness: '4px', lineHeight: 1 }}>95€</div>
              <p style={{ color: '#111', marginTop: '1rem', fontSize: '0.9rem', fontWeight: 800, textTransform: 'uppercase' }}>Mensual</p>
            </div>

            {/* After */}
            <div className="en-savings-card" style={{ background: '#fff', padding: '4rem 2rem', textAlign: 'center', borderRight: '2px solid #111', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: '#E53935', color: '#fff', fontSize: '0.75rem', fontWeight: 800, padding: '0.4rem 1rem', textTransform: 'uppercase', border: '1px solid #111', boxShadow: '3px 3px 0 #111' }}>−42%</div>
              <p style={{ fontSize: '0.85rem', fontWeight: 900, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#E53935', marginBottom: '1.5rem' }}>CON NOSOTROS</p>
              <div className="en-saving-num" data-target="55" data-suffix="€" style={{ fontFamily: 'var(--font-display)', fontSize: '4rem', fontWeight: 900, color: '#E53935', lineHeight: 1 }}>55€</div>
              <p style={{ color: '#111', marginTop: '1rem', fontSize: '0.9rem', fontWeight: 800, textTransform: 'uppercase' }}>Mensual</p>
            </div>

            {/* Savings */}
            <div className="en-savings-card" style={{ background: '#111', padding: '4rem 2rem', textAlign: 'center' }}>
              <p style={{ fontSize: '0.85rem', fontWeight: 900, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#E53935', marginBottom: '1.5rem' }}>AHORRO ANUAL</p>
              <div className="en-saving-num" data-target="480" data-suffix="€" style={{ fontFamily: 'var(--font-display)', fontSize: '4rem', fontWeight: 900, color: '#fff', lineHeight: 1 }}>480€</div>
              <p style={{ color: '#fff', marginTop: '1rem', fontSize: '0.9rem', fontWeight: 800, textTransform: 'uppercase' }}>Por año</p>
            </div>
          </div>

          {/* Sub-note */}
          <p style={{ textAlign: 'center', marginTop: '3rem', color: '#111', fontSize: '0.9rem', fontWeight: 600, maxWidth: '600px', margin: '3rem auto 0 auto' }}>
            * Ejemplo real basado en perfil residencial estándar. Los resultados dependen de tu consumo y tarifa actual.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          S8 — FAQ  (Gradient Dark to brand palette)
      ══════════════════════════════════════════════ */}
      <section ref={faqRef} style={{ background: 'linear-gradient(170deg, #111 0%, #1a1a1a 60%, #4a0d0b 100%)', padding: 'clamp(6rem, 10vw, 8rem) 0' }}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <p className="section-label" style={{ color: '#E53935' }}>Preguntas</p>
            <h2 className="section-title" style={{ color: '#fff' }}>Dudas <span>frecuentes</span></h2>
          </div>

          <div className="faq-list" style={{ maxWidth: '900px', margin: '0 auto' }}>
            {faq.map((item, i) => (
              <div key={i} className="faq-energy-item faq-item" style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <button className="faq-question" onClick={() => toggleFaq(i)} style={{ color: '#fff', padding: '2rem 0' }}>
                  <span style={{ fontSize: '1.2rem', fontWeight: 700 }}>{item.question}</span>
                  <span className="faq-icon" style={{ color: '#E53935' }}>+</span>
                </button>
                <div className="faq-answer"><p style={{ color: '#ccc', paddingBottom: '2rem', fontSize: '1rem', lineHeight: 1.6 }}>{item.answer}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          S9 — CTA (Different brutalist background)
      ══════════════════════════════════════════════ */}
      <section ref={ctaRef} style={{
        background: '#fff',
        padding: 'clamp(6rem, 12vw, 10rem) 0',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '8px solid #111',
        borderBottom: '8px solid #111'
      }}>
        {/* HUGE BACKGROUND STRIPES OR TEXT */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          fontSize: '28vw', fontWeight: 900, color: 'transparent',
          WebkitTextStroke: '3px rgba(0,0,0,0.03)', fontFamily: 'var(--font-display)',
          lineHeight: 1, whiteSpace: 'nowrap', pointerEvents: 'none', zIndex: 0
        }}>
          AHORRO
        </div>

        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 position-relative" style={{ zIndex: 1, textAlign: 'center' }}>
          <div style={{ display: 'inline-block', background: '#111', color: '#fff', padding: '0.6rem 2rem', fontWeight: 900, letterSpacing: '0.2em', textTransform: 'uppercase', fontSize: '0.85rem', marginBottom: '2.5rem', border: '2px solid #E53935', boxShadow: '6px 6px 0 #E53935' }}>
            — Sin coste, sin compromiso —
          </div>

          <h2 className="cta-energy-content" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 900, color: '#111', lineHeight: 1.1, textTransform: 'uppercase', marginBottom: '2rem' }}>
            ¿EMPEZAMOS A <br />
            <span style={{ color: '#E53935', textDecoration: 'underline', textDecorationThickness: '10px', textUnderlineOffset: '10px' }}>AHORRAR?</span>
          </h2>

          <p className="cta-energy-content" style={{ fontSize: '1.25rem', color: '#333', lineHeight: 1.6, maxWidth: '750px', margin: '0 auto 4rem auto', fontWeight: 700 }}>
            Solicita tu análisis gratuito y descubre cuánto puedes ahorrar en tu factura de luz. <br />Sin compromiso, solo beneficios.
          </p>

          <Link to="/contacto" className="cta-energy-content group inline-flex" style={{
            alignItems: 'center', gap: '1.5rem', background: '#E53935', color: '#fff', padding: '1.5rem 3rem',
            fontSize: '1.2rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.05em',
            transition: 'all 0.3s ease', border: '4px solid #111', boxShadow: '10px 10px 0 #111'
          }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.transform = 'translate(10px, 10px)';
              el.style.boxShadow = '0 0 0 #111';
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.transform = '';
              el.style.boxShadow = '10px 10px 0 #111';
            }}>
            <span>Solicitar análisis gratuito</span>
            <div style={{ width: '40px', height: '40px', background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%' }}>
              <ArrowRight size={20} color="#fff" />
            </div>
          </Link>
        </div>
      </section>

    </div>
  );
};

export default ServiciosEnergia;
