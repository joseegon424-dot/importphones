import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, ArrowRight, Upload } from 'lucide-react';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

const WhatsAppIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

interface ContactoProps {
  isLoaded: boolean;
}

const Contacto = ({ isLoaded }: ContactoProps) => {
  const pageRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const methodsRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({ name: '', email: '', phone: '', service: '', message: '', file: null as File | null });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    if (!isLoaded) return;
    const ctx = gsap.context(() => {
      const heroTitle = pageRef.current?.querySelector<HTMLElement>('.ct-title');
      if (heroTitle) {
        heroTitle.classList.add('split-target');
        const split = new SplitType(heroTitle, { types: 'words,chars' });
        gsap.fromTo(split.chars,
          { y: '110%', opacity: 0 },
          { y: '0%', opacity: 1, duration: 0.8, stagger: 0.025, ease: 'power3.out', delay: 0.4 }
        );
      }
      gsap.fromTo('.ct-hero-sub', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.85 });
      gsap.fromTo('.ct-envelope-path', { strokeDashoffset: 2000 }, { strokeDashoffset: 0, duration: 2.5, ease: 'power2.out', stagger: 0.08, delay: 0.3 });
      gsap.fromTo('.ct-info-stat', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: 'back.out(1.4)', delay: 1.2 });

      // Info cards & form
      gsap.fromTo('.ct-info-card',
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: infoRef.current, start: 'top 70%' }
        }
      );
      gsap.fromTo('.ct-form-box',
        { x: 60, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: infoRef.current, start: 'top 65%' }
        }
      );

      // Methods
      gsap.fromTo('.ct-method-card',
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.75, stagger: 0.15, ease: 'back.out(1.3)',
          scrollTrigger: { trigger: methodsRef.current, start: 'top 72%' }
        }
      );

      // FAQ
      gsap.fromTo('.ct-faq-item',
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: faqRef.current, start: 'top 72%' }
        }
      );
    }, pageRef);
    return () => ctx.revert();
  }, [isLoaded]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => { setIsSubmitting(false); setIsSubmitted(true); }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactInfo = [
    { icon: Phone, title: 'Teléfono', content: '+34 931 596 464', link: 'tel:+34931596464', label: 'Llamar ahora', color: '#E53935' },
    { icon: Mail, title: 'Email', content: 'info@importphones.net', link: 'mailto:info@importphones.net', label: 'Enviar email', color: '#E53935' },
    { icon: MapPin, title: 'Ubicación', content: 'Viladecavalls, España', link: 'https://www.google.com/maps/search/HX33%2BH3+Viladecavalls,+Espa%C3%B1a/@41.5583737,1.9161746,17z/', label: 'Ver en mapa', color: '#E53935' },
    { icon: Clock, title: 'Horario', content: 'Lun - Vie: 9:00 - 19:00', link: null, label: null, color: '#E53935' },
  ];

  const methods = [
    { icon: Phone, title: 'Teléfono', desc: 'Llámanos al +34 931 596 464', action: 'Llamar ahora', link: 'tel:+34931596464', bg: '#E5393510', iconColor: '#E53935' },
    { icon: WhatsAppIcon, title: 'WhatsApp', desc: 'Escríbenos al +34 611 809 595', action: 'Enviar mensaje', link: 'https://wa.me/34611809595?text=Hola,%20quisiera%20recibir%20más%20información%20sobre%20vuestros%20servicios.', bg: '#25D36610', iconColor: '#25D366' },
    { icon: Mail, title: 'Email', desc: 'info@importphones.net', action: 'Enviar email', link: 'mailto:info@importphones.net', bg: '#E5393510', iconColor: '#E53935' },
  ];

  const faq = [
    { q: '¿Cuánto tarda el cambio de compañía?', a: 'Una vez firmado el contrato puede durar entre 5 y 20 días el cambio de comercializadora.' },
    { q: '¿Tengo que pagar algo por el cambio?', a: 'No, el cambio es un trámite gratuito. Si sube o baja potencia inscrita sí hay un coste regulado por LEY.' },
    { q: '¿Cuánto puedo ahorrar realmente?', a: 'Depende de su tarifa actual y del estudio presentado por nuestro asesor, pero toda esta información la tendrá cuando un asesor se contacte con usted.' },
    { q: '¿Cuánto tarda la portabilidad?', a: 'La portabilidad móvil es de 2 días hábiles sin contar festivos ni fines de semana, una vez lanzada la ventana de cambio.' },
    { q: '¿Pierdo mi número de teléfono?', a: 'La portabilidad móvil mantiene su mismo número de siempre y no se queda sin línea; el cambio siempre se realiza de madrugada entre las 3 y las 6 AM.' },
    { q: '¿Hay permanencia?', a: 'Depende de la compañía; algunas no tienen permanencia, como por ejemplo O2.' },
  ];

  return (
    <div ref={pageRef} className="overflow-hidden">

      {/* ── S1: Hero */}
      <section className="page-header" style={{ position: 'relative', overflow: 'hidden', minHeight: '75vh', display: 'flex', alignItems: 'center' }}>
        <div className="hero-subpage-svg" aria-hidden="true">
          <svg viewBox="0 0 700 500" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path className="ct-envelope-path" d="M120 160 L580 160 L580 400 L120 400 Z" stroke="#E53935" strokeWidth="1.5" strokeDasharray="2000" strokeDashoffset="2000" />
            <path className="ct-envelope-path" d="M120 160 L350 310 L580 160" stroke="rgba(229,57,53,0.8)" strokeWidth="1.5" strokeDasharray="2000" strokeDashoffset="2000" />
            <path className="ct-envelope-path" d="M120 400 L310 270 M580 400 L390 270" stroke="rgba(229,57,53,0.3)" strokeWidth="1" strokeDasharray="2000" strokeDashoffset="2000" />
            <path className="ct-envelope-path" d="M590 180 Q630 200 635 240 Q638 275 620 300 L605 315 L590 295 Q602 280 600 255 Q598 225 580 208 Z" stroke="rgba(229,57,53,0.5)" strokeWidth="1.5" strokeDasharray="2000" strokeDashoffset="2000" />
            <circle cx="350" cy="310" r="5" fill="#E53935" opacity="0.8" />
            <circle cx="350" cy="160" r="3" fill="rgba(229,57,53,0.4)" />
          </svg>
        </div>

        <div className="max-w-[1800px] mx-auto px-6 lg:px-12 w-full" style={{ position: 'relative', zIndex: 2, paddingTop: '9rem', paddingBottom: '5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>
            <div>
              <p className="page-header-label ct-hero-sub" style={{ marginBottom: '1.5rem' }}>Contacto</p>
              <h1 className="ct-title page-header-title" style={{ overflow: 'hidden', marginBottom: '2rem' }}>
                Hablemos de <span style={{ color: '#E53935' }}>ahorro</span>
              </h1>
              <p className="ct-hero-sub" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.1rem', lineHeight: 1.75, marginBottom: '3rem', maxWidth: '480px' }}>
                Estamos aquí para ayudarte a reducir tus facturas.
                Contacta con nosotros y descubre cuánto puedes ahorrar.
              </p>
              <div className="ct-hero-sub" style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
                <a href="tel:+34931596464" className="btn-primary">
                  <Phone size={18} />
                  <span>Llamar ahora</span>
                </a>
                <a href="https://wa.me/34611809595" target="_blank" rel="noopener noreferrer"
                  className="btn-primary"
                  style={{ background: 'transparent', border: '2px solid rgba(255,255,255,0.3)', color: '#fff' }}>
                  <WhatsAppIcon size={18} />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
            {/* Hero stats */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              {[
                { v: 'Gratis', label: 'Análisis de facturas', icon: CheckCircle },
                { v: '24h', label: 'Propuesta personalizada', icon: Clock },
                { v: '0€', label: 'Sin costes ocultos', icon: CheckCircle },
                { v: '100%', label: 'Ahorro garantizado', icon: CheckCircle },
              ].map((s, i) => (
                <div key={i} className="ct-info-stat" style={{
                  background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '16px', padding: '2rem 1.5rem', textAlign: 'center'
                }}>
                  <div style={{ fontFamily: 'Space Grotesk', fontSize: '2rem', fontWeight: 800, color: '#E53935', lineHeight: 1 }}>{s.v}</div>
                  <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', marginTop: '0.5rem' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── S2: Info + Form */}
      <section className="section-light" style={{ padding: '6rem 0' }}>
        <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
          <div ref={infoRef} style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '5rem', alignItems: 'start' }}>

            {/* Left: contact info cards */}
            <div>
              <p className="section-label">Información de contacto</p>
              <h2 className="section-title" style={{ color: 'var(--color-text-dark)', marginBottom: '2.5rem' }}>
                Estamos <span>para ayudarte</span>
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {contactInfo.map((item, i) => (
                  <div key={i} className="ct-info-card" style={{
                    display: 'flex', alignItems: 'center', gap: '1.25rem',
                    background: '#fff', borderRadius: '16px', padding: '1.5rem 2rem',
                    border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                  }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateX(6px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 30px rgba(0,0,0,0.1)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ''; (e.currentTarget as HTMLElement).style.boxShadow = ''; }}
                  >
                    <div style={{ width: '48px', height: '48px', background: '#E5393510', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <item.icon size={22} style={{ color: '#E53935' }} />
                    </div>
                    <div>
                      <div style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '0.85rem', color: '#888', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{item.title}</div>
                      {item.link ? (
                        <a href={item.link} target={item.link.startsWith('http') ? '_blank' : undefined}
                          rel={item.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                          style={{ color: '#111', fontWeight: 600, fontSize: '1rem', textDecoration: 'none' }}>
                          {item.content}
                        </a>
                      ) : (
                        <p style={{ color: '#111', fontWeight: 600, fontSize: '1rem', margin: 0 }}>{item.content}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Why contact checklist */}
              <div style={{ marginTop: '3rem', padding: '2rem', background: '#E5393508', borderRadius: '20px', border: '1px solid #E5393520' }}>
                <p style={{ fontFamily: 'Space Grotesk', fontWeight: 700, color: '#E53935', marginBottom: '1rem', fontSize: '0.9rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>¿Por qué contactar?</p>
                {['Análisis gratuito de tus facturas', 'Propuesta personalizada en 24h', 'Sin compromiso ni costes ocultos', 'Ahorro garantizado'].map((t, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.6rem' }}>
                    <CheckCircle size={16} style={{ color: '#E53935', flexShrink: 0 }} />
                    <span style={{ color: '#444', fontSize: '0.9rem' }}>{t}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: form */}
            <div className="ct-form-box" style={{ background: '#fff', borderRadius: '24px', padding: '3rem', border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 20px 60px rgba(0,0,0,0.08)' }}>
              {isSubmitted ? (
                <div style={{ textAlign: 'center', padding: '3rem 0' }}>
                  <div style={{ width: '72px', height: '72px', background: '#E5393515', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                    <CheckCircle size={36} style={{ color: '#E53935' }} />
                  </div>
                  <h3 style={{ fontFamily: 'Space Grotesk', fontSize: '1.7rem', fontWeight: 700, color: '#111', marginBottom: '1rem' }}>¡Mensaje enviado!</h3>
                  <p style={{ color: '#666' }}>Nos pondremos en contacto contigo en menos de 24 horas.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <h3 style={{ fontFamily: 'Space Grotesk', fontSize: '1.3rem', fontWeight: 700, color: '#111', marginBottom: '0.25rem' }}>Solicita tu análisis gratuito</h3>
                  <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Rellena el formulario y te responderemos en menos de 24h.</p>

                  <div className="form-group">
                    <label className="form-label" style={{ color: '#333' }}>Nombre</label>
                    <input type="text" name="name" className="form-input" value={formData.name} onChange={handleChange} required placeholder="Tu nombre" />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                    <div className="form-group">
                      <label className="form-label" style={{ color: '#333' }}>Email</label>
                      <input type="email" name="email" className="form-input" value={formData.email} onChange={handleChange} required placeholder="tu@email.com" />
                    </div>
                    <div className="form-group">
                      <label className="form-label" style={{ color: '#333' }}>Teléfono</label>
                      <input type="tel" name="phone" className="form-input" value={formData.phone} onChange={handleChange} required placeholder="+34 931 596 464" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label" style={{ color: '#333' }}>Servicio de interés</label>
                    <select name="service" className="form-input" value={formData.service} onChange={handleChange} required>
                      <option value="">Selecciona un servicio</option>
                      <option value="telecom">Telecomunicaciones</option>
                      <option value="energia">Energía</option>
                      <option value="ambos">Ambos</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label" style={{ color: '#333' }}>Adjuntar facturas (opcional)</label>
                    <div style={{ position: 'relative' }}>
                      <input type="file" name="file" accept=".pdf,.doc,.docx,image/*"
                        style={{ opacity: 0, position: 'absolute', inset: 0, width: '100%', height: '100%', cursor: 'pointer', zIndex: 10 }}
                        onChange={e => { const file = e.target.files?.[0] || null; setFormData({ ...formData, file }); }}
                      />
                      <div className="form-input" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <Upload size={18} style={{ color: '#E53935' }} />
                        <span style={{ color: formData.file ? '#333' : '#aaa', fontSize: '0.9rem' }}>
                          {formData.file ? formData.file.name : 'Subir fotos o documentos (PDF, Word...)'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label" style={{ color: '#333' }}>Mensaje (opcional)</label>
                    <textarea name="message" className="form-textarea" value={formData.message} onChange={handleChange} placeholder="Cuéntanos tu situación..." />
                  </div>
                  <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={isSubmitting}>
                    {isSubmitting ? <span>Enviando...</span> : <><Send size={18} /><span>Enviar solicitud</span></>}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── S3: Contact Methods */}
      <section ref={methodsRef} style={{ background: 'var(--color-section-light-2)', padding: '6rem 0' }}>
        <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
          <div className="section-header" style={{ marginBottom: '3.5rem' }}>
            <p className="section-label">Métodos de contacto</p>
            <h2 className="section-title" style={{ color: 'var(--color-text-dark)' }}>
              Elige tu <span>canal preferido</span>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
            {methods.map((m, i) => (
              <a key={i} href={m.link} target={m.link.startsWith('http') ? '_blank' : undefined}
                rel={m.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="ct-method-card"
                style={{
                  background: '#fff', borderRadius: '20px', padding: '2.5rem',
                  border: '1px solid rgba(0,0,0,0.06)', textDecoration: 'none', color: 'inherit', display: 'block',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-6px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 20px 50px rgba(0,0,0,0.1)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ''; (e.currentTarget as HTMLElement).style.boxShadow = ''; }}
              >
                <div style={{ width: '56px', height: '56px', background: m.bg, borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                  <m.icon size={26} style={{ color: m.iconColor }} />
                </div>
                <h3 style={{ fontFamily: 'Space Grotesk', fontSize: '1.2rem', fontWeight: 700, color: '#111', marginBottom: '0.5rem' }}>{m.title}</h3>
                <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '1.5rem' }}>{m.desc}</p>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: m.iconColor, fontWeight: 600, fontSize: '0.9rem' }}>
                  {m.action} <ArrowRight size={16} />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── S4: Map */}
      <section className="section-light" style={{ padding: '5rem 0' }}>
        <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
          <div style={{ borderRadius: '24px', overflow: 'hidden', border: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 20px 60px rgba(0,0,0,0.08)' }}>
            <iframe
              title="Importphones location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2990.1234!2d1.9527!3d41.5538!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a492c7fdc4b1ef%3A0x1f6274004c9fd9e8!2sImportphones.net!5e0!3m2!1ses!2ses!4v1234567890"
              width="100%" height="420" style={{ border: 0, display: 'block' }}
              allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <a href="https://www.google.com/maps/place/Importphones.net/@41.5538813,1.9501491,688m/data=!3m2!1e3!4b1!4m6!3m5!1s0x12a492c7fdc4b1ef:0x1f6274004c9fd9e8!8m2!3d41.5538813!4d1.952724!16s%2Fg%2F11b81rv68c"
              target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ display: 'inline-flex' }}>
              <MapPin size={18} />
              <span>Ver ubicación en Google Maps</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── S5: FAQ */}
      <section ref={faqRef} style={{ background: 'var(--color-text-dark)', padding: '6rem 0' }}>
        <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
          <div className="section-header" style={{ marginBottom: '3.5rem' }}>
            <p className="section-label">Preguntas</p>
            <h2 className="section-title">Dudas <span>frecuentes</span></h2>
          </div>
          <div style={{ maxWidth: '820px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {faq.map((item, i) => (
              <div key={i} className="ct-faq-item" style={{
                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '16px', overflow: 'hidden', transition: 'border-color 0.3s ease',
                borderColor: openFaq === i ? 'rgba(229,57,53,0.4)' : undefined
              }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{
                  width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '1.5rem 2rem', background: 'none', border: 'none', cursor: 'pointer', gap: '1rem'
                }}>
                  <span style={{ fontFamily: 'Space Grotesk', fontWeight: 600, color: '#fff', fontSize: '1rem', textAlign: 'left' }}>{item.q}</span>
                  <span style={{ color: '#E53935', fontSize: '1.5rem', flexShrink: 0, lineHeight: 1, transform: openFaq === i ? 'rotate(45deg)' : 'none', transition: 'transform 0.3s ease' }}>+</span>
                </button>
                {openFaq === i && (
                  <div style={{ padding: '0 2rem 1.5rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, fontSize: '0.95rem' }}>
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── S6: CTA */}
      <section className="cta-section">
        <div className="cta-content">
          <h2 className="cta-title">¿A qué esperas?</h2>
          <p className="cta-text">Miles de clientes ya están ahorrando. Únete a ellos y descubre cuánto puedes reducir tus facturas.</p>
          <a href="tel:+34931596464" className="cta-button">
            <Phone size={20} />
            <span>Llamar ahora</span>
          </a>
        </div>
      </section>

    </div>
  );
};

export default Contacto;
