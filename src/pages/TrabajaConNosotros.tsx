import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import { Users, Rocket, Trophy, Heart, Send, Upload, Star, ArrowRight, CheckCircle, Briefcase, TrendingUp, Smile } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface TrabajaConNosotrosProps {
    isLoaded?: boolean;
}

const TrabajaConNosotros = ({ isLoaded = true }: TrabajaConNosotrosProps) => {
    const pageRef = useRef<HTMLDivElement>(null);
    const heroRef = useRef<HTMLElement>(null);
    const benefitsRef = useRef<HTMLElement>(null);
    const valuesRef = useRef<HTMLElement>(null);
    const openingsRef = useRef<HTMLElement>(null);
    const formRef = useRef<HTMLElement>(null);

    const [formData, setFormData] = useState({
        name: '', email: '', phone: '', position: '', message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [fileName, setFileName] = useState('');

    useEffect(() => {
        if (!isLoaded) return;
        window.scrollTo(0, 0);

        const ctx = gsap.context(() => {
            // ── Hero title SplitType
            const heroTitle = pageRef.current?.querySelector<HTMLElement>('.tcn-hero-title');
            if (heroTitle) {
                heroTitle.classList.add('split-target');
                const split = new SplitType(heroTitle, { types: 'words,chars' });
                gsap.fromTo(split.chars,
                    { y: '110%', opacity: 0 },
                    { y: '0%', opacity: 1, duration: 0.75, stagger: 0.022, ease: 'power3.out', delay: 0.35 }
                );
            }
            gsap.fromTo('.tcn-hero-sub',
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.85 }
            );
            gsap.fromTo('.tcn-hero-cta',
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 1.1 }
            );
            gsap.fromTo('.tcn-stat',
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: 'back.out(1.4)', delay: 1.3 }
            );
            // SVG people path draw
            gsap.fromTo('.tcn-svg-path',
                { strokeDashoffset: 2000 },
                { strokeDashoffset: 0, duration: 2.5, ease: 'power2.out', stagger: 0.08, delay: 0.2 }
            );

            // ── Benefits
            gsap.fromTo('.tcn-benefit-card',
                { y: 60, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out',
                    scrollTrigger: { trigger: benefitsRef.current, start: 'top 70%' }
                }
            );

            // ── Values
            gsap.fromTo('.tcn-value-item',
                { x: -40, opacity: 0 },
                {
                    x: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power3.out',
                    scrollTrigger: { trigger: valuesRef.current, start: 'top 72%' }
                }
            );
            gsap.fromTo('.tcn-values-img',
                { x: 60, opacity: 0, scale: 0.95 },
                {
                    x: 0, opacity: 1, scale: 1, duration: 1.1, ease: 'power3.out',
                    scrollTrigger: { trigger: valuesRef.current, start: 'top 65%' }
                }
            );

            // ── Openings
            gsap.fromTo('.tcn-opening-card',
                { y: 50, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.75, stagger: 0.14, ease: 'power3.out',
                    scrollTrigger: { trigger: openingsRef.current, start: 'top 72%' }
                }
            );

            // ── Form
            gsap.fromTo('.tcn-form-wrapper',
                { y: 60, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 1, ease: 'power3.out',
                    scrollTrigger: { trigger: formRef.current, start: 'top 70%' }
                }
            );

        }, pageRef);
        return () => ctx.revert();
    }, [isLoaded]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => { setIsSubmitting(false); setIsSubmitted(true); }, 1500);
    };

    const benefits = [
        { icon: Rocket, title: 'Crecimiento', desc: 'Oportunidades reales de ascenso y formación continua en el sector energético y telecom.' },
        { icon: Heart, title: 'Ambiente', desc: 'Un equipo joven, dinámico y apasionado por la tecnología y el servicio al cliente.' },
        { icon: Trophy, title: 'Excelencia', desc: 'Trabajamos con los estándares más altos del sector. La calidad es nuestra seña de identidad.' },
        { icon: Star, title: 'Impacto', desc: 'Ayudamos a miles de familias y empresas a ahorrar cada día. Tu trabajo importa.' },
        { icon: TrendingUp, title: 'Comisiones', desc: 'Sistema de comisiones competitivo y transparente. Tus resultados determinan tus ingresos.' },
        { icon: Smile, title: 'Flexibilidad', desc: 'Horarios adaptables y posibilidad de trabajo remoto según el puesto.' },
    ];

    const openings = [
        { title: 'Asesor Comercial', dept: 'Ventas', type: 'Jornada completa', location: '📍 Presencial / Remoto' },
        { title: 'Técnico de Soporte', dept: 'Técnico', type: 'Jornada completa', location: '📍 Presencial' },
        { title: 'Agente de Atención al Cliente', dept: 'Customer Success', type: 'Media jornada', location: '📍 Remoto' },
        { title: 'Candidatura espontánea', dept: 'Cualquier área', type: 'A determinar', location: '📍 Flexible' },
    ];

    return (
        <div ref={pageRef} className="overflow-hidden">

            {/* ── S1: Hero */}
            <section ref={heroRef} className="page-header" style={{ position: 'relative', overflow: 'hidden', minHeight: '85vh', display: 'flex', alignItems: 'center' }}>
                {/* Background SVG */}
                <div className="hero-subpage-svg" aria-hidden="true">
                    <svg viewBox="0 0 700 500" fill="none" xmlns="http://www.w3.org/2000/svg">
                        {/* Person 1 */}
                        <circle className="tcn-svg-path" cx="220" cy="160" r="45" stroke="#E53935" strokeWidth="1.5" strokeDasharray="2000" strokeDashoffset="2000" />
                        <path className="tcn-svg-path" d="M160 300 Q220 250 280 300 L290 400 H150 Z" stroke="#E53935" strokeWidth="1.5" strokeDasharray="2000" strokeDashoffset="2000" />
                        {/* Person 2 */}
                        <circle className="tcn-svg-path" cx="380" cy="140" r="38" stroke="rgba(229,57,53,0.6)" strokeWidth="1.2" strokeDasharray="2000" strokeDashoffset="2000" />
                        <path className="tcn-svg-path" d="M325 290 Q380 245 435 290 L445 390 H315 Z" stroke="rgba(229,57,53,0.6)" strokeWidth="1.2" strokeDasharray="2000" strokeDashoffset="2000" />
                        {/* Person 3 */}
                        <circle className="tcn-svg-path" cx="530" cy="170" r="32" stroke="rgba(229,57,53,0.3)" strokeWidth="1" strokeDasharray="2000" strokeDashoffset="2000" />
                        <path className="tcn-svg-path" d="M485 300 Q530 260 575 300 L580 390 H480 Z" stroke="rgba(229,57,53,0.3)" strokeWidth="1" strokeDasharray="2000" strokeDashoffset="2000" />
                        {/* Connection lines */}
                        <path className="tcn-svg-path" d="M265 185 Q322 165 342 178" stroke="rgba(229,57,53,0.5)" strokeWidth="1" strokeDasharray="2000" strokeDashoffset="2000" />
                        <path className="tcn-svg-path" d="M418 162 Q474 155 498 168" stroke="rgba(229,57,53,0.3)" strokeWidth="1" strokeDasharray="2000" strokeDashoffset="2000" />
                        {/* Dots */}
                        <circle cx="220" cy="160" r="4" fill="#E53935" />
                        <circle cx="380" cy="140" r="3" fill="rgba(229,57,53,0.6)" />
                        <circle cx="530" cy="170" r="2.5" fill="rgba(229,57,53,0.3)" />
                    </svg>
                </div>

                <div className="max-w-[1800px] mx-auto px-6 lg:px-12 w-full" style={{ position: 'relative', zIndex: 2, paddingTop: '8rem', paddingBottom: '5rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'center' }}>
                        <div>
                            <p className="page-header-label tcn-hero-sub" style={{ marginBottom: '1.5rem' }} >Únete al equipo</p>
                            <h1 className="tcn-hero-title page-header-title" style={{ overflow: 'hidden', marginBottom: '2rem' }}>
                                Construye el futuro de la <span style={{ color: '#E53935' }}>consultoría</span>
                            </h1>
                            <div className="tcn-hero-sub" style={{ fontSize: '1.15rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.75, marginBottom: '3rem', maxWidth: '520px' }}>
                                <p style={{ marginBottom: '1rem' }}>
                                    En Importphones, no solo vendemos servicios; resolvemos problemas.
                                    Nuestra historia comenzó con una visión simple: hacer que la energía
                                    y las telecomunicaciones sean justas para todos.
                                </p>
                                <p>
                                    Buscamos personas inconformistas, detallistas y que entiendan que
                                    el cliente es el centro de todo lo que hacemos.
                                </p>
                            </div>
                            <div className="tcn-hero-cta" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                                <a href="#application-form" className="btn-primary">
                                    <span>Ver vacantes</span>
                                    <ArrowRight size={18} />
                                </a>
                            </div>
                        </div>

                        {/* Stats column */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                            {[
                                { num: '+5.000', label: 'Clientes ayudados', icon: Users },
                                { num: '98%', label: 'Satisfacción cliente', icon: Star },
                                { num: '+10', label: 'Años de experiencia', icon: Trophy },
                                { num: '3', label: 'Sedes operativas', icon: Briefcase },
                            ].map((s, i) => (
                                <div key={i} className="tcn-stat" style={{
                                    background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                                    borderRadius: '16px', padding: '2rem 1.5rem', textAlign: 'center'
                                }}>
                                    <s.icon size={28} style={{ color: '#E53935', marginBottom: '0.75rem' }} />
                                    <div style={{ fontFamily: 'Space Grotesk', fontSize: '2rem', fontWeight: 800, color: '#fff', lineHeight: 1 }}>{s.num}</div>
                                    <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', marginTop: '0.4rem' }}>{s.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── S2: Benefits */}
            <section ref={benefitsRef} className="section-light" style={{ padding: '6rem 0' }}>
                <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
                    <div className="section-header" style={{ marginBottom: '4rem' }}>
                        <p className="section-label">Por qué elegirnos</p>
                        <h2 className="section-title" style={{ color: 'var(--color-text-dark)' }}>
                            Lo que <span>ofrecemos</span>
                        </h2>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
                        {benefits.map((b, i) => (
                            <div key={i} className="tcn-benefit-card service-card-light" style={{
                                padding: '2.5rem', borderRadius: '20px',
                                border: '1px solid rgba(0,0,0,0.06)',
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                            }}
                                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-6px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 20px 50px rgba(0,0,0,0.1)'; }}
                                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ''; (e.currentTarget as HTMLElement).style.boxShadow = ''; }}
                            >
                                <div style={{
                                    width: '52px', height: '52px', background: '#E5393510', borderRadius: '14px',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem'
                                }}>
                                    <b.icon size={26} style={{ color: '#E53935' }} />
                                </div>
                                <h3 style={{ fontFamily: 'Space Grotesk', fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-text-dark)', marginBottom: '0.75rem' }}>{b.title}</h3>
                                <p style={{ color: '#666', lineHeight: 1.6, fontSize: '0.95rem' }}>{b.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── S3: Culture / Values with image */}
            <section ref={valuesRef} style={{ background: 'var(--color-section-light-2)', padding: '6rem 0' }}>
                <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'center' }}>
                        <div>
                            <p className="section-label">Nuestra cultura</p>
                            <h2 className="section-title" style={{ color: 'var(--color-text-dark)', marginBottom: '2.5rem' }}>
                                Valores que nos <span>definen</span>
                            </h2>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                {[
                                    'Compromiso total con el cliente',
                                    'Transparencia en cada proceso',
                                    'Innovación constante en nuestras soluciones',
                                    'Trabajo en equipo por encima de todo',
                                    'Formación continua y desarrollo personal',
                                    'Resultados medibles y honestidad radical',
                                ].map((v, i) => (
                                    <div key={i} className="tcn-value-item" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <div style={{ width: '28px', height: '28px', background: '#E5393515', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                            <CheckCircle size={16} style={{ color: '#E53935' }} />
                                        </div>
                                        <span style={{ color: '#444', fontSize: '1rem', lineHeight: 1.5 }}>{v}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="tcn-values-img" style={{ position: 'relative' }}>
                            {/* Decorative frame */}
                            <div style={{ position: 'absolute', inset: '-20px', border: '2px solid rgba(229,57,53,0.15)', borderRadius: '24px', zIndex: 0 }} />
                            <div style={{ position: 'relative', zIndex: 1, borderRadius: '20px', overflow: 'hidden', aspectRatio: '4/3', background: 'linear-gradient(135deg, #E53935 0%, #B71C1C 100%)' }}>
                                {/* Placeholder visual */}
                                <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem', padding: '3rem' }}>
                                    <Users size={80} style={{ color: 'rgba(255,255,255,0.3)' }} />
                                    <div style={{ textAlign: 'center' }}>
                                        <div style={{ fontFamily: 'Space Grotesk', fontSize: '1.8rem', fontWeight: 800, color: '#fff', marginBottom: '0.5rem' }}>El equipo Importphones</div>
                                        <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1rem' }}>Jóvenes, apasionados y comprometidos</div>
                                    </div>
                                </div>
                            </div>
                            {/* Badge */}
                            <div style={{
                                position: 'absolute', bottom: '-1.5rem', left: '-1.5rem', zIndex: 2,
                                background: '#fff', borderRadius: '16px', padding: '1.2rem 1.6rem',
                                boxShadow: '0 16px 40px rgba(0,0,0,0.12)', display: 'flex', alignItems: 'center', gap: '0.8rem'
                            }}>
                                <div style={{ width: '40px', height: '40px', background: '#E5393515', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <TrendingUp size={20} style={{ color: '#E53935' }} />
                                </div>
                                <div>
                                    <div style={{ fontFamily: 'Space Grotesk', fontWeight: 800, fontSize: '1.1rem', color: '#111' }}>Crecemos contigo</div>
                                    <div style={{ fontSize: '0.75rem', color: '#888' }}>Formación y ascenso garantizados</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── S4: Open Positions */}
            <section ref={openingsRef} className="section-light" style={{ padding: '6rem 0' }} id="application-form">
                <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
                    <div className="section-header" style={{ marginBottom: '3.5rem' }}>
                        <p className="section-label">Vacantes actuales</p>
                        <h2 className="section-title" style={{ color: 'var(--color-text-dark)' }}>
                            Puestos <span>disponibles</span>
                        </h2>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {openings.map((o, i) => (
                            <div key={i} className="tcn-opening-card" style={{
                                background: '#fff', border: '1px solid rgba(0,0,0,0.07)', borderRadius: '16px',
                                padding: '2rem 2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                gap: '2rem', transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
                                cursor: 'pointer'
                            }}
                                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateX(6px)'; (e.currentTarget as HTMLElement).style.borderColor = '#E53935'; (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 30px rgba(0,0,0,0.08)'; }}
                                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ''; (e.currentTarget as HTMLElement).style.borderColor = ''; (e.currentTarget as HTMLElement).style.boxShadow = ''; }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                    <div style={{ width: '48px', height: '48px', background: '#E5393510', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                        <Briefcase size={22} style={{ color: '#E53935' }} />
                                    </div>
                                    <div>
                                        <div style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '1.1rem', color: '#111' }}>{o.title}</div>
                                        <div style={{ fontSize: '0.85rem', color: '#888', marginTop: '0.2rem' }}>{o.dept} · {o.location}</div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                    <span style={{ background: '#E5393510', color: '#E53935', padding: '0.4rem 1rem', borderRadius: '99px', fontSize: '0.8rem', fontWeight: 600, whiteSpace: 'nowrap' }}>{o.type}</span>
                                    <ArrowRight size={20} style={{ color: '#E53935', flexShrink: 0 }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── S5: Application Form */}
            <section ref={formRef} style={{ background: 'var(--color-text-dark)', padding: '6rem 0' }}>
                <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '6rem', alignItems: 'start' }}>
                        {/* Left copy */}
                        <div>
                            <p className="section-label">Candidatura</p>
                            <h2 style={{ fontFamily: 'Space Grotesk', fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 900, color: '#fff', lineHeight: 1.1, marginBottom: '1.5rem' }}>
                                Envíanos tu <span style={{ color: '#E53935' }}>CV</span>
                            </h2>
                            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '2.5rem' }}>
                                Queremos conocerte. Completa el formulario y adjunta tu currículum. Nuestro equipo de RRHH revisará tu perfil en menos de 48 horas.
                            </p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {['CV revisado en 48h', 'Proceso transparente y ágil', 'Feedback siempre garantizado'].map((t, i) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <CheckCircle size={18} style={{ color: '#E53935', flexShrink: 0 }} />
                                        <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem' }}>{t}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right form */}
                        <div className="tcn-form-wrapper" style={{
                            background: '#fff', borderRadius: '24px', padding: '3rem'
                        }}>
                            {isSubmitted ? (
                                <div style={{ textAlign: 'center', padding: '3rem 0' }}>
                                    <div style={{ width: '72px', height: '72px', background: '#E5393515', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                                        <CheckCircle size={36} style={{ color: '#E53935' }} />
                                    </div>
                                    <h3 style={{ fontFamily: 'Space Grotesk', fontSize: '1.7rem', fontWeight: 700, color: '#111', marginBottom: '1rem' }}>¡Candidatura recibida!</h3>
                                    <p style={{ color: '#666' }}>Nuestro equipo de RRHH revisará tu perfil y te contactará pronto.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                                        <div className="form-group">
                                            <label className="form-label" style={{ color: '#333' }}>Nombre completo</label>
                                            <input type="text" name="name" required className="form-input"
                                                value={formData.name} onChange={handleChange} placeholder="Tu nombre" />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label" style={{ color: '#333' }}>Email</label>
                                            <input type="email" name="email" required className="form-input"
                                                value={formData.email} onChange={handleChange} placeholder="tu@email.com" />
                                        </div>
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                                        <div className="form-group">
                                            <label className="form-label" style={{ color: '#333' }}>Teléfono</label>
                                            <input type="tel" name="phone" required className="form-input"
                                                value={formData.phone} onChange={handleChange} placeholder="+34 XXX XXX XXX" />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label" style={{ color: '#333' }}>Puesto de interés</label>
                                            <select name="position" required className="form-input"
                                                value={formData.position} onChange={handleChange}>
                                                <option value="">Selecciona un puesto</option>
                                                <option value="comercial">Asesor Comercial</option>
                                                <option value="tecnico">Servicio Técnico</option>
                                                <option value="admin">Administración</option>
                                                <option value="otro">Otro</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label" style={{ color: '#333' }}>Currículum (CV)</label>
                                        <div style={{ position: 'relative' }}>
                                            <input type="file" required accept=".pdf,.doc,.docx"
                                                style={{ opacity: 0, position: 'absolute', inset: 0, width: '100%', height: '100%', cursor: 'pointer', zIndex: 10 }}
                                                onChange={e => setFileName(e.target.files?.[0]?.name || '')}
                                            />
                                            <div className="form-input" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                                <Upload size={18} style={{ color: '#E53935' }} />
                                                <span style={{ color: fileName ? '#333' : '#aaa', fontSize: '0.9rem' }}>
                                                    {fileName || 'Seleccionar archivo (PDF o Word)'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label" style={{ color: '#333' }}>¿Por qué quieres unirte? (opcional)</label>
                                        <textarea name="message" className="form-textarea" rows={4}
                                            value={formData.message} onChange={handleChange}
                                            placeholder="Cuéntanos tu motivación..." />
                                    </div>
                                    <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={isSubmitting}>
                                        <Send size={18} />
                                        <span>{isSubmitting ? 'Enviando...' : 'Enviar candidatura'}</span>
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default TrabajaConNosotros;
