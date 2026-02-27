import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, ArrowRight, Upload } from 'lucide-react';
import SplitType from 'split-type';
import ReCAPTCHA from 'react-google-recaptcha';

gsap.registerPlugin(ScrollTrigger);

const WhatsAppIcon = ({ size = 24 }: { size?: number }) => (
  <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" style={{ width: size, height: size, objectFit: 'contain' }} />
);

interface ContactoProps {
  isLoaded: boolean;
}

const Contacto = ({ isLoaded }: ContactoProps) => {
  const pageRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const methodsRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', service: '', message: '', file: null as File | null });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isHuman, setIsHuman] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

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
    }, pageRef);
    return () => ctx.revert();
  }, [isLoaded]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const recaptchaValue = recaptchaRef.current?.getValue();
    if (!recaptchaValue || !isHuman) {
      alert('Por favor, verifica que no eres un robot.');
      return;
    }
    setIsSubmitting(true);

    try {
      let fileUrl = 'No se adjuntó archivo';

      // 1. Subir a Cloudinary si hay archivo
      if (formData.file) {
        const cloudinaryData = new FormData();
        cloudinaryData.append('file', formData.file);
        cloudinaryData.append('upload_preset', 'u5ic0lzm');

        const cloudinaryRes = await fetch('https://api.cloudinary.com/v1_1/drprrdhyp/auto/upload', {
          method: 'POST',
          body: cloudinaryData
        });

        const cloudinaryJson = await cloudinaryRes.json();
        fileUrl = cloudinaryJson.secure_url || fileUrl;
      }

      // 2. Enviar datos a FormSubmit con el link de Cloudinary
      const data = new FormData();
      data.append('Nombre', formData.name);
      data.append('Email', formData.email);
      data.append('Teléfono', formData.phone);
      data.append('Servicio', formData.service);
      data.append('Mensaje', formData.message || 'Sin mensaje');
      data.append('ARCHIVO_ADJUNTO_LINK', fileUrl);

      data.append('_subject', `NUEVA CONSULTA IMPORTPHONES: ${formData.name}`);
      data.append('_template', 'table');
      data.append('_captcha', 'false');

      const res = await fetch('https://formsubmit.co/ajax/joseegon424@gmail.com', {
        method: 'POST',
        body: data
      });

      if (res.ok) {
        setIsSubmitting(false);
        setIsSubmitted(true);
      } else {
        throw new Error('Error en el envío');
      }
    } catch (error) {
      console.error('Error al enviar:', error);
      setIsSubmitting(false);
      alert('Hubo un error al enviar el mensaje. Inténtalo de nuevo o contáctanos por WhatsApp.');
    }
  };

  const handleReset = () => {
    setFormData({ name: '', email: '', phone: '', service: '', message: '', file: null });
    setIsSubmitted(false);
    setIsHuman(false);
    if (recaptchaRef.current) recaptchaRef.current.reset();
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

  return (
    <div ref={pageRef} className="overflow-hidden">

      {/* ── S1: Hero */}
      <section className="page-header hero-awwards !py-0" style={{ position: 'relative', overflow: 'hidden', minHeight: '80vh', display: 'flex', alignItems: 'center' }}>

        {/* Background image related to contact */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <img
            src="https://images.unsplash.com/photo-1596524430615-b46475ddff6e?auto=format&fit=crop&w=1920&q=80"
            alt="Contacto"
            style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.35)' }}
          />
        </div>

        {/* Bring SVG envelope to the front, make it glow and bolder */}
        <div className="hero-subpage-svg" aria-hidden="true" style={{ zIndex: 3, pointerEvents: 'none', filter: 'drop-shadow(0 0 18px rgba(229,57,53,0.9))' }}>
          <svg viewBox="0 0 700 500" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path className="ct-envelope-path" d="M120 160 L580 160 L580 400 L120 400 Z" stroke="#ff3b3b" strokeWidth="2.5" strokeDasharray="2000" strokeDashoffset="2000" />
            <path className="ct-envelope-path" d="M120 160 L350 310 L580 160" stroke="#E53935" strokeWidth="2.5" strokeDasharray="2000" strokeDashoffset="2000" />
            <path className="ct-envelope-path" d="M120 400 L310 270 M580 400 L390 270" stroke="rgba(255,100,100,0.6)" strokeWidth="2" strokeDasharray="2000" strokeDashoffset="2000" />
            <path className="ct-envelope-path" d="M590 180 Q630 200 635 240 Q638 275 620 300 L605 315 L590 295 Q602 280 600 255 Q598 225 580 208 Z" stroke="rgba(255,100,100,0.7)" strokeWidth="2" strokeDasharray="2000" strokeDashoffset="2000" />
            <circle cx="350" cy="310" r="6" fill="#ff3b3b" />
            <circle cx="350" cy="160" r="4" fill="#ff3b3b" opacity="0.8" />
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
      <section className="section-light" style={{ padding: '6rem 0', background: '#FAFAFA' }}>
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
                    background: '#fff', borderRadius: '16px', padding: '1.5rem 2rem', border: '1px solid rgba(0,0,0,0.06)',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.04)', transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                  }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateX(6px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 30px rgba(0,0,0,0.1)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ''; (e.currentTarget as HTMLElement).style.boxShadow = ''; }}
                  >
                    <div style={{ width: '48px', height: '48px', background: 'rgba(229,57,53,0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
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
              <div style={{ marginTop: '3rem', padding: '2rem', background: 'rgba(229,57,53,0.05)', borderRadius: '20px', border: '1px solid rgba(229,57,53,0.15)' }}>
                <p style={{ fontFamily: 'Space Grotesk', fontWeight: 700, color: '#E53935', marginBottom: '1rem', fontSize: '0.9rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>¿Por qué contactar?</p>
                {['Análisis gratuito de tus facturas', 'Propuesta personalizada en 24h', 'Sin compromiso ni costes ocultos', 'Ahorro garantizado'].map((t, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.6rem' }}>
                    <CheckCircle size={16} style={{ color: '#E53935', flexShrink: 0 }} />
                    <span style={{ color: '#444', fontSize: '1rem' }}>{t}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: form */}
            <div className="ct-form-box" style={{ background: '#fff', borderRadius: '24px', padding: '3rem', border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 20px 60px rgba(0,0,0,0.08)' }}>
              {isSubmitted ? (
                <div style={{ textAlign: 'center', padding: '3rem 0' }}>
                  <div style={{ width: '72px', height: '72px', background: 'rgba(229,57,53,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                    <CheckCircle size={36} style={{ color: '#E53935' }} />
                  </div>
                  <h3 style={{ fontFamily: 'Space Grotesk', fontSize: '1.7rem', fontWeight: 700, color: '#111', marginBottom: '1rem' }}>¡Mensaje enviado!</h3>
                  <p style={{ color: '#666', marginBottom: '2rem' }}>Nos pondremos en contacto contigo en menos de 24 horas.</p>
                  <button
                    onClick={handleReset}
                    style={{
                      background: '#111',
                      color: '#fff',
                      padding: '1rem 2rem',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      margin: '0 auto',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    <ArrowRight size={18} />
                    Enviar otro mensaje
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <h3 style={{ fontFamily: 'Space Grotesk', fontSize: '1.3rem', fontWeight: 700, color: '#111', marginBottom: '0.25rem' }}>Solicita tu análisis gratuito</h3>
                  <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Rellena el formulario y te responderemos en menos de 24h.</p>

                  <div className="form-group">
                    <label className="form-label" style={{ color: '#333' }}>Nombre</label>
                    <input type="text" name="name" className="form-input" value={formData.name} onChange={handleChange} required placeholder="Tu nombre" style={{ background: '#fff', color: '#111', border: '1px solid #ddd' }} />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                    <div className="form-group">
                      <label className="form-label" style={{ color: '#333' }}>Email</label>
                      <input type="email" name="email" className="form-input" value={formData.email} onChange={handleChange} required placeholder="tu@email.com" style={{ background: '#fff', color: '#111', border: '1px solid #ddd' }} />
                    </div>
                    <div className="form-group">
                      <label className="form-label" style={{ color: '#333' }}>Teléfono</label>
                      <input type="tel" name="phone" className="form-input" value={formData.phone} onChange={handleChange} required placeholder="+34 931 596 464" style={{ background: '#fff', color: '#111', border: '1px solid #ddd' }} />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label" style={{ color: '#333' }}>Servicio de interés</label>
                    <select name="service" className="form-input" value={formData.service} onChange={handleChange} required style={{ background: '#fff', color: '#111', border: '1px solid #ddd' }}>
                      <option value="">Selecciona un servicio</option>
                      <option value="telecom">Telecomunicaciones</option>
                      <option value="energia">Energía</option>
                      <option value="ambos">Ambos</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label" style={{ color: '#333' }}>Adjuntar facturas (opcional)</label>
                    <div style={{ position: 'relative' }}>
                      <input type="file" name="attachment" accept=".pdf,.doc,.docx,.xls,.xlsx,image/*"
                        style={{ opacity: 0, position: 'absolute', inset: 0, width: '100%', height: '100%', cursor: 'pointer', zIndex: 10 }}
                        onChange={e => { const file = e.target.files?.[0] || null; setFormData({ ...formData, file }); }}
                      />
                      <div className="form-input" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: '#fff', color: '#111', border: '1px solid #ddd' }}>
                        <Upload size={18} style={{ color: '#E53935' }} />
                        <span style={{ color: formData.file ? '#333' : '#aaa', fontSize: '0.9rem' }}>
                          {formData.file ? formData.file.name : 'Subir fotos o documentos (PDF, Word...)'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label" style={{ color: '#333' }}>Mensaje (opcional)</label>
                    <textarea name="message" className="form-textarea" value={formData.message} onChange={handleChange} placeholder="Cuéntanos tu situación..." style={{ background: '#fff', color: '#111', border: '1px solid #ddd' }} />
                  </div>
                  {/* reCAPTCHA verification */}
                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: '0.5rem' }}>
                    <ReCAPTCHA
                      ref={recaptchaRef}
                      sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                      theme="light"
                      onChange={(token) => setIsHuman(!!token)}
                    />
                  </div>

                  <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={isSubmitting || !isHuman}>
                    {isSubmitting ? <span>Enviando...</span> : <><Send size={18} /><span>Enviar solicitud</span></>}
                  </button>
                  <p style={{ textAlign: 'center', fontSize: '0.78rem', color: '#999', marginTop: '0.25rem' }}>
                    Al enviar este formulario, aceptas nuestra política de privacidad.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── S3: Contact Methods */}
      <section ref={methodsRef} style={{ background: '#111', padding: '6rem 0' }}>
        <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
          <div className="section-header" style={{ marginBottom: '3.5rem' }}>
            <p className="section-label">Métodos de contacto</p>
            <h2 className="section-title" style={{ color: '#fff' }}>
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
                  border: '1px solid #E53935', textDecoration: 'none', color: 'inherit', display: 'block',
                  transition: 'transform 0.3s ease, background 0.3s ease, box-shadow 0.3s ease',
                  borderBottomWidth: '6px'
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = 'translateY(-6px)';
                  el.style.background = '#0a0a0a';
                  el.style.boxShadow = '0 20px 50px rgba(229,57,53,0.1)';
                  const t = el.querySelector('h3') as HTMLElement; if (t) t.style.color = '#fff';
                  const p = el.querySelector('p') as HTMLElement; if (p) p.style.color = 'rgba(255,255,255,0.7)';
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = '';
                  el.style.background = '#fff';
                  el.style.boxShadow = '';
                  const t = el.querySelector('h3') as HTMLElement; if (t) t.style.color = '#111';
                  const p = el.querySelector('p') as HTMLElement; if (p) p.style.color = '#888';
                }}
              >
                <div style={{ width: '64px', height: '64px', background: m.bg, borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                  <m.icon size={36} style={{ color: m.iconColor }} />
                </div>
                <h3 style={{ fontFamily: 'Space Grotesk', fontSize: '1.2rem', fontWeight: 700, color: '#111', marginBottom: '0.5rem', transition: 'color 0.3s ease' }}>{m.title}</h3>
                <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '1.5rem', transition: 'color 0.3s ease' }}>{m.desc}</p>
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
