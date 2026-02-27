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
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const historyRef = useRef<HTMLDivElement>(null);
  const missionRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isLoaded) return;

    const ctx = gsap.context(() => {
      // Page title reveal
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
      gsap.fromTo('.hero-badge-ref',
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, stagger: 0.15, ease: 'back.out(1.7)', delay: 1.3 }
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

      // --- Values SVG Animations ---
      values.forEach((_, i) => {
        const container = document.querySelector(`.value-svg-${i}`);
        if (!container) return;

        const mainIcon = container.querySelector('.main-icon');
        const secondaryElements = container.querySelectorAll('.secondary-element');
        const tertiaryElements = container.querySelectorAll('.tertiary-element');

        // Main Icon perpetual float
        if (mainIcon) {
          gsap.to(mainIcon, {
            y: -15,
            duration: 2 + Math.random(),
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut"
          });
        }

        // Rotation for secondary elements
        if (secondaryElements.length > 0) {
          gsap.to(secondaryElements, {
            rotation: 360,
            duration: 10 + i * 2,
            repeat: -1,
            ease: "none",
            svgOrigin: "100 100" // Assuming center of 200x200 viewBox
          });
        }

        // Reverse rotation for tertiary elements
        if (tertiaryElements.length > 0) {
          gsap.to(tertiaryElements, {
            rotation: -360,
            duration: 15,
            repeat: -1,
            ease: "none",
            svgOrigin: "100 100" // Assuming center of 200x200 viewBox
          });
        }
      });

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
    }, heroRef);

    return () => ctx.revert();
  }, [isLoaded]);

  const missionVision = [
    {
      icon: Target,
      title: 'Misión',
      accent: '#E53935',
      image: '/images/mision_importphones.png',
      description: 'Ayudar a empresas y particulares a optimizar sus gastos en telecomunicaciones y energía, ofreciendo asesoramiento experto y gestión integral de todos los trámites.',
      stat: '+5.000 clientes',
      statSub: 'que ya ahorran',
    },
    {
      icon: Eye,
      title: 'Visión',
      accent: '#4361ee',
      image: '/images/vision_importphones.png',
      description: 'Ser la consultora de referencia en España para servicios de telecomunicaciones y energía, reconocida por nuestra transparencia, profesionalidad y resultados tangibles.',
      stat: '#1 en confianza',
      statSub: 'Barcelona & alrededores',
    },
  ];

  const values = [
    { icon: Heart, title: 'Pasión', description: 'Nos apasiona ayudar a nuestros clientes a ahorrar dinero. Cada caso es único y lo tratamos con dedicación.', color: '#E53935', image: '/images/pasion.png', id: '01' },
    { icon: Award, title: 'Excelencia', description: 'Buscamos la excelencia en cada gestión. Nos mantenemos actualizados para ofrecer siempre lo mejor.', color: '#f0a500', image: '/images/excelencia.png', id: '02' },
    { icon: Users, title: 'Cercanía', description: 'Trato personalizado y cercano. Estamos disponibles para resolver cualquier duda o incidencia.', color: '#4361ee', image: '/images/cercania.png', id: '03' },
    { icon: TrendingUp, title: 'Mejora continua', description: 'Analizamos constantemente el mercado para ofrecer las mejores opciones a nuestros clientes.', color: '#00a651', image: '/images/mejora.png', id: '04' },
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
    { question: '¿Cuánto tarda el cambio de compañía de luz?', answer: 'Una vez firmado el contrato puede durar entre 5 y 20 días el cambio de comercializadora.' },
    { question: '¿Tengo que pagar algo por el cambio?', answer: 'No, el cambio es un trámite gratuito. Si sube o baja potencia inscrita sí hay un coste regulado por LEY.' },
    { question: '¿Cuánto puedo ahorrar realmente?', answer: 'Depende de su tarifa actual y del estudio presentado por nuestro asesor; toda esta información la tendrá cuando un asesor se contacte con usted.' },
    { question: '¿Cuánto tarda la portabilidad?', answer: 'La portabilidad móvil es de 2 días hábiles sin contar festivos ni fines de semana, una vez lanzada la ventana de cambio.' },
    { question: '¿Pierdo mi número de teléfono?', answer: 'La portabilidad móvil mantiene su mismo número de siempre; el cambio siempre se realiza de madrugada entre las 3 y las 6 AM.' },
    { question: '¿Hay permanencia?', answer: 'Depende de la compañía; algunas no tienen permanencia, como por ejemplo O2.' },
  ];

  const toggleFaq = (index: number) => {
    const item = document.getElementById(`faq-item-${index}`);
    if (item) {
      item.classList.toggle('active');
    }
  };

  return (
    <div ref={heroRef} className="overflow-hidden">

      {/* ── Hero header ── */}
      <section className="hero-awwards">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/quienes-somos-hero-v2.png"
            alt="Importphones Equipo"
            className="w-full h-full object-cover filter brightness-[0.6] contrast-[1.05]"
          />
          {/* Grainy texture overlay for brutalist feel */}
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3BaseFilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/baseFilter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>

          {/* Premium Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
        </div>

        <div className="max-w-[1800px] mx-auto px-6 lg:px-12 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">

            {/* Left side: Label & Title */}
            <div className="relative">
              <p className="hero-label">IMPORTPHONES.NET</p>
              <h1 ref={titleRef} className="hero-title-brutal">
                {[
                  { text: 'QUIÉNES', red: false },
                  { text: 'SOMOS', red: true },
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

              {/* Established Date & Decorative line */}
              <div className="mt-8 flex items-center gap-6 hero-cta">
                <div className="h-[2px] w-24 bg-gradient-to-r from-red-600 to-transparent"></div>
                <p className="text-white/40 text-sm font-bold uppercase tracking-[0.4em]">Est. 2015 — Madrid</p>
              </div>
            </div>

            {/* Right side: Description & Badges */}
            <div className="lg:pl-12 lg:border-l border-white/10" style={{ alignSelf: 'center' }}>
              <p className="hero-subtitle">
                Somos un equipo de profesionales apasionados por ayudar a empresas y particulares a optimizar sus gastos en
                telecomunicaciones y energía con <strong className="text-white">transparencia y resultados garantizados</strong>.
              </p>

              {/* Trust badges */}
              <div className="flex flex-wrap items-center gap-12">
                {[
                  { label: 'Certificada', sub: 'Excelencia', icon: Award },
                  { label: 'Humana', sub: 'Cercanía', icon: Users },
                ].map((b, i) => (
                  <div key={i} className="hero-badge-ref" style={{
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

        {/* Minimal Scroll Indicator */}
        <div className="absolute bottom-8 left-12 flex flex-col items-center gap-3">
          <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent opacity-20"></div>
          <span className="text-[9px] text-white/20 uppercase tracking-[0.4em] font-bold [writing-mode:vertical-lr]">Scroll</span>
        </div>
      </section>

      {/* ── Historia: two-column with premium presentation ── */}
      <section ref={historyRef} className="section-light bg-[#fdfdfd]" style={{ padding: 'clamp(6rem, 12vw, 10rem) 0', position: 'relative', overflow: 'hidden' }}>
        {/* Subtle decorative elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50/50 -skew-x-12 translate-x-1/2 z-0"></div>

        <div className="max-w-[1800px] mx-auto px-6 lg:px-12 relative z-10">
          <div className="alt-layout flex flex-col lg:grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="history-content order-2 lg:order-1">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-[2px] bg-[#E53935]"></div>
                <span className="text-[0.7rem] font-bold tracking-[0.2em] text-[#E53935] uppercase">Nuestra Trayectoria</span>
              </div>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#111] mb-8 leading-[1.1]">
                Más de <span className="text-[#E53935] relative">
                  10 años
                  <svg className="absolute -bottom-2 left-0 w-full h-2 text-[#E53935]/20" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 25 0 50 5 T 100 5" fill="none" stroke="currentColor" strokeWidth="4" />
                  </svg>
                </span> <br />liderando el ahorro energético
              </h2>

              <div className="space-y-6 text-[#444] text-lg leading-relaxed max-w-xl">
                <p className="font-medium text-[#222]">
                  Importphones.net no es solo una consultora; es el resultado de una visión nacida en 2015 para democratizar el ahorro.
                </p>
                <p>
                  Lo que comenzó como una iniciativa local en Barcelona se ha expandido a todo el territorio nacional,
                  consolidando un equipo de expertos dedicados exclusivamente a proteger el bolsillo de nuestros clientes.
                </p>
                <p className="bg-slate-50 p-6 border-l-4 border-[#E53935] italic text-base">
                  "Asignamos un profesional especializado para su atención personalizada, garantizando que cada gestión sea óptima y transparente."
                </p>
              </div>

              <div className="grid grid-cols-3 gap-8 mt-12 bg-white p-8 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100">
                {[{ n: '10+', l: 'Años' }, { n: '5K+', l: 'Clientes' }, { n: '881', l: 'Reviews' }].map((s, i) => (
                  <div key={i} className="text-center lg:text-left">
                    <div className="text-3xl font-black text-[#E53935] mb-1">{s.n}</div>
                    <div className="text-[0.65rem] text-[#888] font-bold uppercase tracking-widest">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: real photo — premium presentation */}
            <div className="history-image-col order-1 lg:order-2 group" style={{ position: 'relative', width: '100%', maxWidth: '900px' }}>
              <div className="relative z-10 w-full aspect-[16/10] lg:aspect-[16/9] rounded-[40px] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.15)] bg-slate-200">
                <img
                  src="/images/service-telecom.jpg"
                  alt="Equipo Importphones trabajando"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  style={{ transform: 'scale(1.05)' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                {/* Overlay info */}
                <div className="absolute bottom-8 left-8 right-8 p-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl transform translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700">
                  <p className="text-white text-sm font-light">Nuestro equipo en acción, siempre buscando la mejor opción para ti.</p>
                </div>
              </div>

              {/* Floating foundation badge */}
              <div className="absolute -bottom-8 -left-8 z-20 bg-[#E53935] text-white p-8 rounded-3xl shadow-2xl transform -rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="text-5xl font-black leading-none">2015</div>
                <div className="text-[0.6rem] font-bold uppercase tracking-[0.2em] mt-2 opacity-80">Año de Fundación</div>
              </div>

              {/* Floating experience card */}
              <div className="absolute -top-10 -right-4 lg:-right-10 z-20 bg-[#111] text-white p-6 rounded-3xl shadow-2xl hover:translate-y-[-5px] transition-transform duration-500">
                <div className="flex items-center gap-4">
                  <div className="text-4xl font-black text-[#E53935]">+10</div>
                  <div className="h-10 w-[1px] bg-white/20"></div>
                  <div className="text-[0.65rem] font-bold uppercase tracking-widest leading-tight">
                    Años de<br />Experiencia
                  </div>
                </div>
              </div>

              {/* Decorative back element */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] border border-[#E53935]/10 rounded-full z-0 pointer-events-none"></div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Misión & Visión: Split 2-panel with Focus Effect ── */}
      <section ref={missionRef} className="py-24 relative overflow-hidden" style={{ background: '#080808' }}>
        <div className="max-w-[1800px] mx-auto px-6 lg:px-12 relative z-10">
          <div className="section-header mb-16">
            <p className="text-red-600 text-xs font-black uppercase tracking-[0.4em] mb-4">FILOSOFÍA</p>
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter">Nuestra <span className="text-white/20">esencia</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-1 rounded-[40px] overflow-hidden border-2 border-red-600 bg-red-600/5 p-1">
            {missionVision.map((item, i) => (
              <div key={i} className="group relative min-h-[500px] flex flex-col justify-end p-10 lg:p-16 overflow-hidden transition-all duration-700 cursor-pointer">

                {/* Background Image: SHARP by default, blurry/dark on hover */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-all duration-1000 scale-100 blur-0 grayscale-0 brightness-[0.8] group-hover:blur-[10px] group-hover:scale-110 group-hover:grayscale-[0.5] group-hover:brightness-[0.3]"
                  />
                  {/* Subtle Grainy Texture */}
                  <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3BaseFilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/feFilter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>

                  {/* Color Overlay: Intensity increases on hover to focus text */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/20 to-transparent transition-opacity duration-700 group-hover:via-[#080808]/60 group-hover:opacity-100"></div>
                  <div className="absolute inset-0 bg-black/20 transition-all duration-700 group-hover:bg-black/40"></div>
                </div>

                {/* Content Container */}
                <div className="relative z-10">
                  {/* Icon with glow */}
                  <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white mb-8 transition-all duration-500 group-hover:border-red-600/50 group-hover:bg-red-600/10 group-hover:text-red-500 group-hover:shadow-[0_0_30px_rgba(220,38,38,0.2)]">
                    <item.icon size={30} strokeWidth={1.5} />
                  </div>

                  <h3 className="text-3xl md:text-4xl font-black text-white mb-6 tracking-tight flex items-baseline gap-4">
                    {item.title}
                    <span className="h-[2px] w-12 bg-red-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></span>
                  </h3>

                  <p className="text-white/60 text-lg leading-relaxed mb-10 max-w-lg transition-all duration-500 group-hover:text-white group-hover:opacity-100">
                    {item.description}
                  </p>

                  {/* Highlighted Stats: "Alumbramiento" effect */}
                  <div className="pt-8 border-t border-red-600/30">
                    <div className="flex flex-col">
                      <span className="text-5xl font-black text-white/10 tracking-tighter transition-all duration-700 group-hover:text-red-600 group-hover:drop-shadow-[0_0_20px_rgba(220,38,38,0.5)] group-active:scale-105">
                        {item.stat.split(' ')[0]}
                        <span className="text-xl ml-2 text-white/5 group-hover:text-white/40 transition-colors duration-700">{item.stat.split(' ').slice(1).join(' ')}</span>
                      </span>
                      <span className="text-[10px] uppercase tracking-[0.4em] text-white/20 mt-2 font-bold group-hover:text-white/50 transition-colors duration-700">
                        {item.statSub}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Corner Number Decorative - IMPROVED VISIBILITY */}
                <div className="absolute -bottom-10 -right-6 text-[15rem] font-black text-white/5 leading-none pointer-events-none transition-all duration-700 group-hover:text-red-600/10 group-hover:-translate-y-4">
                  0{i + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Values: Vertical Timeline with Interactive Focus ── */}
      <section ref={valuesRef} className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="section-header mb-24 text-center">
            <p className="text-red-600 text-xs font-black uppercase tracking-[0.4em] mb-4">NUESTROS VALORES</p>
            <h2 className="text-4xl md:text-6xl font-black text-[#111] tracking-tighter">Lo que nos <span className="text-red-600">define</span></h2>
          </div>

          <div className="relative">
            {/* Central timeline line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 hidden md:block"
              style={{ background: 'linear-gradient(to bottom, #E53935 0%, #f0a500 33%, #4361ee 66%, #00a651 100%)', borderRadius: '4px' }}>
            </div>

            <div className="space-y-12 md:space-y-0">
              {values.map((value, index) => {
                const isLeft = index % 2 === 0;
                return (
                  <div key={index} className={`flex flex-col md:flex-row items-center w-full ${isLeft ? 'md:flex-row-reverse' : ''} mb-12 md:mb-24 relative`}>

                    {/* SVG Graphic Column (The "Empty Space") */}
                    <div className={`hidden md:flex w-1/2 items-center justify-center p-12 value-svg-${index}`}>
                      <div className="relative w-full max-w-[320px] aspect-square flex items-center justify-center">

                        {/* Pasión SVG */}
                        {value.title === 'Pasión' && (
                          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_0_25px_rgba(229,57,53,0.5)]">
                            <defs>
                              <radialGradient id="grad-red" cx="50%" cy="50%" r="50%">
                                <stop offset="0%" stopColor="#E53935" stopOpacity="0.8" />
                                <stop offset="100%" stopColor="#E53935" stopOpacity="0.2" />
                              </radialGradient>
                            </defs>
                            <circle cx="100" cy="100" r="90" fill="none" stroke="#E53935" strokeWidth="2" strokeDasharray="6,14" className="secondary-element opacity-50" />
                            <circle cx="100" cy="100" r="75" fill="none" stroke="#E53935" strokeWidth="1.5" strokeDasharray="2,25" className="tertiary-element opacity-70" />
                            <g className="main-icon">
                              <Heart size={90} fill="#E53935" stroke="none" className="text-[#E53935]" />
                              <circle cx="100" cy="100" r="35" fill="url(#grad-red)" className="animate-pulse opacity-40" />
                            </g>
                          </svg>
                        )}

                        {/* Excelencia SVG */}
                        {value.title === 'Excelencia' && (
                          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_0_25px_rgba(240,165,0,0.5)]">
                            <g className="secondary-element">
                              <rect x="45" y="45" width="110" height="110" fill="none" stroke="#f0a500" strokeWidth="1.5" className="opacity-40" />
                              <rect x="55" y="55" width="90" height="90" fill="none" stroke="#f0a500" strokeWidth="2" strokeDasharray="12,12" className="opacity-60" />
                            </g>
                            <g className="tertiary-element">
                              <circle cx="100" cy="100" r="92" fill="none" stroke="#f0a500" strokeWidth="1" strokeDasharray="3,18" className="opacity-30" />
                            </g>
                            <g className="main-icon">
                              <Star size={90} fill="#f0a500" stroke="none" />
                              <path d="M100 0 L100 200 M0 100 L200 100" stroke="#f0a500" strokeWidth="1" className="opacity-20" />
                            </g>
                          </svg>
                        )}

                        {/* Cercanía SVG */}
                        {value.title === 'Cercanía' && (
                          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_0_25px_rgba(67,97,238,0.5)]">
                            <g className="secondary-element">
                              {[...Array(3)].map((_, i) => (
                                <circle key={i} cx="100" cy="100" r={65 + i * 18} fill="none" stroke="#4361ee" strokeWidth="1.5" className="opacity-30" />
                              ))}
                              <circle cx="100" cy="100" r="95" fill="none" stroke="#4361ee" strokeWidth="1" strokeDasharray="5,15" className="opacity-20" />
                            </g>
                            <g className="main-icon">
                              <Users size={90} fill="#4361ee" stroke="none" />
                              <circle cx="100" cy="100" r="48" fill="none" stroke="#4361ee" strokeWidth="2" className="animate-ping opacity-40" />
                            </g>
                          </svg>
                        )}

                        {/* Mejora continua SVG */}
                        {value.title === 'Mejora continua' && (
                          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_0_25px_rgba(0,166,81,0.5)]">
                            <g className="secondary-element">
                              <circle cx="100" cy="100" r="92" fill="none" stroke="#00a651" strokeWidth="1.5" strokeDasharray="8,18" className="opacity-40" />
                              <path d="M30 170 Q 100 20 170 170" fill="none" stroke="#00a651" strokeWidth="1.5" className="opacity-30" />
                            </g>
                            <g className="main-icon">
                              <TrendingUp size={90} fill="#00a651" stroke="none" />
                              <circle cx="100" cy="100" r="45" fill="none" stroke="#00a651" strokeWidth="3" strokeDasharray="2,12" className="animate-spin-slow opacity-50" />
                            </g>
                          </svg>
                        )}
                      </div>
                    </div>

                    {/* Timeline Node Point */}
                    <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center justify-center z-20">
                      <div className="w-12 h-12 rounded-full border-4 border-white shadow-xl flex items-center justify-center font-black text-white text-xs"
                        style={{ backgroundColor: value.color }}>
                        {value.id}
                      </div>
                    </div>

                    {/* Content Card Column */}
                    <div className="w-full md:w-1/2 flex items-center justify-center md:px-8">
                      <div className={`w-full group relative min-h-[300px] rounded-[32px] overflow-hidden border border-black/5 bg-white transition-all duration-500 shadow-sm hover:shadow-2xl hover:-translate-y-2 cursor-pointer flex flex-col justify-end p-8`}>

                        {/* Background Image: SHARP by default, blurry/dark on hover to focus text */}
                        <div className="absolute inset-0 z-0 transition-all duration-1000">
                          <img
                            src={value.image}
                            alt={value.title}
                            className="w-full h-full object-cover transition-all duration-1000 scale-100 blur-0 grayscale-0 brightness-[0.8] group-hover:blur-[12px] group-hover:scale-110 group-hover:grayscale group-hover:brightness-[0.4]"
                          />
                          {/* Overlay for legibility: Deepens on hover */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-100 group-hover:via-black/60 transition-all duration-700"></div>
                        </div>

                        {/* Content */}
                        <div className="relative z-10">
                          <div className="flex items-center gap-4 mb-4">
                            <div
                              className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg"
                              style={{ backgroundColor: value.color }}
                            >
                              <value.icon size={24} />
                            </div>
                            <h3 className="text-2xl font-black text-white tracking-tight">{value.title}</h3>
                          </div>

                          <p className="text-white/80 text-sm leading-relaxed transition-all duration-500 group-hover:text-white group-hover:opacity-100">
                            {value.description}
                          </p>
                        </div>

                        {/* Side Indicator Point */}
                        <div className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border-2 z-10 hidden md:block ${isLeft ? '-right-2' : '-left-2'}`}
                          style={{ borderColor: value.color }}></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Us with Image ── */}
      <section style={{ background: '#0a0a0a', padding: 'clamp(5rem, 9vw, 8rem) 0' }}>
        <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '4rem', alignItems: 'center' }}>
            <div style={{ textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}>
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
            <div style={{ position: 'relative', borderRadius: '24px', overflow: 'hidden', aspectRatio: '21/9', gridColumn: 'span 2', width: '100%' }}>
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
      <section ref={testimonialsRef} className="section-awwards testimonials-section" style={{ background: '#f8f8f8' }}>
        <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
          <div className="section-header">
            <p className="section-label">Google Reviews</p>
            <h2 className="section-title" style={{ color: '#111' }}>Historias reales de <span>nuestros clientes</span></h2>
          </div>
          <div className="testimonials-grid pt-12">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card-brutal">
                <div className="google-review-badge">
                  <svg width="20" height="20" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
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
      <section className="py-24 bg-[#080808] relative overflow-hidden">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-12 relative z-10">
          <div className="section-header">
            <p className="text-red-600 text-[0.7rem] font-bold uppercase tracking-[0.15em] mb-4">Preguntas</p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-12">Resolvemos tus <span style={{ color: '#E53935' }}>dudas</span></h2>
          </div>

          <div className="faq-list mt-12">
            {faq.map((item, index) => (
              <div key={index} id={`faq-item-${index}`} className="faq-item border-b border-white/10">
                <button
                  className="faq-question w-full flex items-center justify-between py-6 text-left"
                  onClick={() => toggleFaq(index)}
                >
                  <span className="text-lg md:text-xl font-semibold text-white">
                    {item.question}
                  </span>
                  <span className="faq-icon text-white text-2xl">+</span>
                </button>
                <div className="faq-answer">
                  <p className="text-white/70 py-4 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
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
