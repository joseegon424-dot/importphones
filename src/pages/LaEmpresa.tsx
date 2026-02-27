import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
// ScrollTrigger se registra en App.tsx
import {
  Calendar,
  Users,
  Star,
  Award,
  TrendingUp,
  MapPin,
  Phone,
  Mail,
  Clock,
  CheckCircle,
} from 'lucide-react';

const LaEmpresa = () => {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Animation
      gsap.fromTo(
        '.company-hero-content',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
      );

      // Timeline Animation
      gsap.fromTo(
        '.timeline-item',
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.timeline-section',
            start: 'top 70%',
          },
        }
      );

      // Stats Animation
      gsap.fromTo(
        '.company-stat',
        { y: 30, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.stats-section',
            start: 'top 75%',
          },
        }
      );

      // Features Animation
      gsap.fromTo(
        '.company-feature',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.features-section',
            start: 'top 70%',
          },
        }
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const timeline = [
    {
      year: '2015',
      title: 'Nuestros Inicios',
      description:
        'IMPORTPHONES.NET nace con la vocación de ofrecer un servicio integral de consultoría en telecomunicaciones.',
    },
    {
      year: '2016',
      title: 'Expansión a Energía',
      description:
        'Ampliamos nuestros servicios para incluir asesoramiento energético, ayudando a clientes a reducir sus facturas.',
    },
    {
      year: '2019',
      title: '+1000 Clientes',
      description:
        'Alcanzamos la marca de 1000 clientes satisfechos, consolidándonos como referentes en el sector.',
    },
    {
      year: '2022',
      title: 'Distribuidor Oficial',
      description:
        'Nos convertimos en distribuidores oficiales de las principales compañías de telecomunicaciones y energía.',
    },
    {
      year: '2024',
      title: '+5000 Clientes',
      description:
        'Superamos los 5000 clientes satisfechos con más de 800 reseñas positivas en Google.',
    },
  ];

  const stats = [
    { icon: Calendar, value: '10+', label: 'Años de experiencia', color: 'bg-blue-500' },
    { icon: Users, value: '5000+', label: 'Clientes satisfechos', color: 'bg-green-500' },
    { icon: Star, value: '881', label: 'Reseñas en Google', color: 'bg-yellow-500' },
    { icon: Award, value: '100%', label: 'Compromiso', color: 'bg-[#E53935]' },
  ];

  const features = [
    {
      icon: TrendingUp,
      title: 'Crecimiento Sostenido',
      description: 'Año tras año aumentamos nuestra cartera de clientes gracias a la confianza depositada en nosotros.',
    },
    {
      icon: Award,
      title: 'Excelencia Certificada',
      description: 'Distribuidores oficiales de las principales compañías del mercado.',
    },
    {
      icon: Users,
      title: 'Equipo Experto',
      description: 'Profesionales especializados con años de experiencia en el sector.',
    },
    {
      icon: Clock,
      title: 'Atención Continua',
      description: 'Soporte y asesoramiento durante todo el proceso de contratación.',
    },
  ];

  const differentiators = [
    'Cercanía y trato personalizado',
    'Transparencia en todas las gestiones',
    'Búsqueda constante del mejor precio',
    'Asesoramiento experto y sin compromiso',
    'Gestión integral de todos los trámites',
    'Soporte post-contratación',
  ];

  return (
    <div ref={pageRef} className="overflow-hidden">
      {/* ══════════════════════════════════════════════
          S1 — HERO (Standardized)
      ══════════════════════════════════════════════ */}
      <section className="hero-awwards" style={{ position: 'relative', overflow: 'hidden', minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
        {/* Background Image & Overlay */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1800&q=80"
            alt="La Empresa"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'brightness(0.5)' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(229,57,53,0.2) 0%, transparent 50%)' }} />
        </div>

        <div className="max-w-[1800px] mx-auto px-6 lg:px-12 w-full hero-content-z">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">

            {/* Left side: Content */}
            <div style={{ zIndex: 2, position: 'relative' }}>
              <p className="hero-label" style={{ marginBottom: '1.5rem', background: '#E53935' }}>LA EMPRESA</p>

              <h1 className="hero-title-brutal" style={{ marginBottom: '2rem', color: '#fff' }}>
                <div style={{ overflow: 'hidden' }}>
                  <span className="hero-word-line" style={{ display: 'block' }}>TU ALIADO</span>
                </div>
                <div style={{ overflow: 'hidden' }}>
                  <span className="hero-word-line" style={{ display: 'block' }}>
                    <span style={{ color: '#E53935' }}>ESTRATÉGICO</span>
                  </span>
                </div>
              </h1>

              <p className="hero-subtitle visible" style={{ color: 'rgba(255,255,255,0.7)', opacity: 1, transform: 'none', marginBottom: '3rem', maxWidth: '600px' }}>
                IMPORTPHONES.NET nace con la vocación de ofrecer un servicio integral de consultoría en telecomunicaciones y energía. Apostamos por la cercanía y profesionalidad.
              </p>

              <div className="hero-cta visible" style={{ opacity: 1, transform: 'none', display: 'flex', gap: '1rem' }}>
                <a href="#historia" className="btn-primary">
                  <span>Nuestra Historia</span>
                  <Award size={18} />
                </a>
              </div>
            </div>

            {/* Right side: Stats/Info Cards */}
            <div style={{ zIndex: 2, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              {[
                { icon: Calendar, value: '10+', label: 'Años' },
                { icon: Users, value: '5000+', label: 'Clientes' },
                { icon: Star, value: '881', label: 'Reseñas' },
                { icon: Award, value: '100%', label: 'Éxito' },
              ].map((stat, i) => (
                <div key={i} className="trust-card-brutal" style={{
                  background: 'rgba(255,255,255,0.05)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '16px', padding: '2rem 1.5rem', textAlign: 'center',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
                }}>
                  <div style={{ color: '#E53935', marginBottom: '0.75rem' }}>
                    <stat.icon size={32} strokeWidth={1.5} />
                  </div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#fff', lineHeight: 1, marginBottom: '0.25rem' }}>{stat.value}</div>
                  <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', fontWeight: 600, textTransform: 'uppercase' }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section py-16 bg-black">
        <div className="container-brutal">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="company-stat bg-white/5 border border-white/10 p-6 text-center hover:border-[#E53935]/50 transition-colors"
              >
                <div className={`w-12 h-12 ${stat.color} flex items-center justify-center mx-auto mb-4`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="font-display font-black text-4xl text-white mb-2">{stat.value}</div>
                <p className="text-gray-400 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="timeline-section section-padding bg-white">
        <div className="container-brutal">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block bg-black text-white px-4 py-1 text-xs font-bold uppercase tracking-widest mb-4">
              Nuestra Historia
            </span>
            <h2 className="section-title font-display text-black mb-6">
              Un recorrido de éxito
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-black transform md:-translate-x-1/2"></div>

              {timeline.map((item, index) => (
                <div
                  key={index}
                  className={`timeline-item relative flex items-start gap-8 mb-12 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-[#E53935] border-4 border-white rounded-full transform -translate-x-1/2 z-10 shadow-lg"></div>

                  {/* Content */}
                  <div
                    className={`ml-12 md:ml-0 md:w-5/12 ${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'
                      }`}
                  >
                    <div className="bg-[#F5F5F5] border-3 border-black p-6 brutal-shadow hover:brutal-shadow-red transition-all">
                      <span className="inline-block bg-[#E53935] text-white px-3 py-1 text-sm font-bold mb-3">
                        {item.year}
                      </span>
                      <h3 className="font-display font-bold text-xl mb-2">{item.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section section-padding bg-[#F5F5F5]">
        <div className="container-brutal">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-[#E53935] text-white px-4 py-1 text-xs font-bold uppercase tracking-widest mb-4">
                Por qué elegirnos
              </span>
              <h2 className="section-title font-display text-black mb-8">
                Lo que nos diferencia
              </h2>

              <div className="space-y-4 mb-8">
                {differentiators.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-[#E53935] flex-shrink-0" />
                    <span className="text-gray-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="company-feature bg-white border-3 border-black p-6 brutal-shadow hover:brutal-shadow-red transition-all"
                >
                  <div className="w-12 h-12 bg-black flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-[#E53935]" />
                  </div>
                  <h3 className="font-display font-bold text-lg mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="section-padding bg-black text-white">
        <div className="container-brutal">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#E53935] flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-display font-bold text-lg mb-2">Ubicación</h4>
                <p className="text-gray-400">HX33+H3 Viladecavalls, España</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#E53935] flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-display font-bold text-lg mb-2">Teléfono</h4>
                <p className="text-gray-400">+34 931 596 464</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#E53935] flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-display font-bold text-lg mb-2">Email</h4>
                <p className="text-gray-400">info@importphones.net</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LaEmpresa;
