import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Rocket, Trophy, Zap, ShieldCheck, CheckCircle, Send, Upload, Target, LineChart, ArrowRight } from 'lucide-react';
import ReCAPTCHA from 'react-google-recaptcha';

gsap.registerPlugin(ScrollTrigger);

interface TrabajaConNosotrosProps {
    isLoaded?: boolean;
}

const TrabajaConNosotros = ({ isLoaded = true }: TrabajaConNosotrosProps) => {
    const pageRef = useRef<HTMLDivElement>(null);
    const heroRef = useRef<HTMLElement>(null);
    const whyRef = useRef<HTMLElement>(null);
    const productsRef = useRef<HTMLDivElement>(null);
    const whatWeLookForRef = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLElement>(null);

    const [formData, setFormData] = useState({
        name: '', email: '', phone: '', message: '', file: null as File | null,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [fileName, setFileName] = useState('');
    const [isHuman, setIsHuman] = useState(false);
    const recaptchaRef = useRef<ReCAPTCHA>(null);

    useEffect(() => {
        if (!isLoaded) return;
        window.scrollTo(0, 0);

        const ctx = gsap.context(() => {
            // Hero Animations
            gsap.fromTo('.tcn-hero-title',
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.9, stagger: 0.1, ease: 'power3.out', delay: 0.2 }
            );
            gsap.fromTo('.tcn-hero-sub',
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.5 }
            );
            gsap.fromTo('.tcn-hero-cta',
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.7 }
            );

            // Benefits Animations
            gsap.fromTo('.tcn-benefit-card',
                { y: 50, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out',
                    scrollTrigger: { trigger: whyRef.current, start: 'top 75%' }
                }
            );

            // Products Animations
            gsap.fromTo('.tcn-product-item',
                { x: -30, opacity: 0 },
                {
                    x: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: 'power3.out',
                    scrollTrigger: { trigger: productsRef.current, start: 'top 75%' }
                }
            );

            // What We Look For
            gsap.fromTo('.tcn-lookfor-item',
                { y: 40, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: 'power3.out',
                    scrollTrigger: { trigger: whatWeLookForRef.current, start: 'top 75%' }
                }
            );

            // Form Animation
            gsap.fromTo('.tcn-form-wrapper',
                { y: 40, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 1, ease: 'power3.out',
                    scrollTrigger: { trigger: formRef.current, start: 'top 80%' }
                }
            );

            // Image reveal
            gsap.fromTo('.reveal-img',
                { scale: 0.9, opacity: 0 },
                {
                    scale: 1, opacity: 1, duration: 1.2, ease: 'power2.out',
                    scrollTrigger: { trigger: whyRef.current, start: 'top 60%' }
                }
            );

        }, pageRef);
        return () => ctx.revert();
    }, [isLoaded]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const recaptchaValue = recaptchaRef.current?.getValue();
        if (!recaptchaValue || !isHuman) {
            alert('Por favor, completa el captcha de seguridad.');
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
            data.append('Mensaje', formData.message || 'Sin mensaje');
            data.append('CV_ADJUNTO_LINK', fileUrl);

            data.append('_subject', `NUEVA CANDIDATURA IMPORTPHONES: ${formData.name}`);
            data.append('_template', 'table');
            data.append('_captcha', 'false');

            const res = await fetch('https://formsubmit.co/ajax/joseegon424@gmail.com', {
                method: 'POST',
                body: data,
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
            alert('Hubo un error al enviar la solicitud. Inténtalo de nuevo o contáctanos por WhatsApp.');
        }
    };

    const handleReset = () => {
        setFormData({ name: '', email: '', phone: '', message: '', file: null });
        setIsSubmitted(false);
        setFileName('');
        setIsHuman(false);
        if (recaptchaRef.current) recaptchaRef.current.reset();
    };

    return (
        <div ref={pageRef} className="overflow-hidden bg-[#FAFAFA]">

            {/* ── 1. HERO SECTION ── */}
            <section ref={heroRef} className="hero-awwards" style={{ position: 'relative', overflow: 'hidden', minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
                <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
                    <img
                        src="https://images.unsplash.com/photo-1556761175-4b46a572b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
                        alt="Comercial Freelance"
                        style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.35)' }}
                    />
                </div>

                <div className="max-w-[1400px] mx-auto px-6 lg:px-12 w-full" style={{ position: 'relative', zIndex: 2, paddingTop: '10rem', paddingBottom: '6rem' }}>
                    <div style={{ maxWidth: '800px' }}>
                        <p className="tcn-hero-title" style={{ color: '#E53935', fontSize: '1rem', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
                            Trabaja con nosotros
                        </p>
                        <h1 className="tcn-hero-title title-display" style={{
                            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                            fontWeight: 900,
                            color: '#ffffff',
                            lineHeight: 1.1,
                            marginBottom: '1.5rem',
                            textShadow: '0 4px 20px rgba(0,0,0,0.6)'
                        }}>
                            ¡Únete a ImportPhones como <span style={{ color: '#E53935' }}>Comercial Freelance</span>!
                        </h1>
                        <p className="tcn-hero-sub" style={{
                            fontSize: 'clamp(1.1rem, 2vw, 1.25rem)',
                            color: 'rgba(255,255,255,0.85)',
                            lineHeight: 1.7,
                            marginBottom: '2.5rem',
                            maxWidth: '700px',
                            fontWeight: 400
                        }}>
                            ¿Buscas maximizar tus ingresos con total libertad? En ImportPhones estamos expandiendo nuestra red comercial y buscamos a los mejores talentos en ventas. Si eres una persona ambiciosa, proactiva y quieres trabajar con un modelo de negocio altamente rentable, este es tu sitio.
                        </p>
                        <div className="tcn-hero-cta" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                            <a href="#application-form" className="btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.05rem', background: '#E53935', color: '#fff', borderRadius: '50px' }}>
                                <span>Solicitar más información</span>
                                <ArrowRight size={18} />
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 2. ¿POR QUÉ COLABORAR CON NOSOTROS? ── */}
            <section ref={whyRef} style={{ padding: '6rem 0' }}>
                <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <p style={{ color: '#E53935', fontSize: '0.9rem', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '1rem' }}>
                                Tu crecimiento es el nuestro
                            </p>
                            <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 800, color: '#111', lineHeight: 1.15, marginBottom: '2rem' }}>
                                🚀 ¿Por qué colaborar con <span style={{ color: '#E53935' }}>nosotros</span>?
                            </h2>
                            <p style={{ color: '#555', fontSize: '1.1rem', lineHeight: 1.7, marginBottom: '3rem' }}>
                                En un mercado competitivo, nos diferenciamos por ofrecer condiciones que realmente valoran tu esfuerzo:
                            </p>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                {/* Benefit 1 */}
                                <div className="tcn-benefit-card" style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', background: '#fff', padding: '2rem', borderRadius: '16px', border: '1px solid #E53935', transition: 'all 0.3s ease', cursor: 'pointer', borderLeftWidth: '5px' }}
                                    onMouseEnter={e => {
                                        const el = e.currentTarget as HTMLElement;
                                        el.style.transform = 'translateY(-6px)'; el.style.background = '#111'; el.style.boxShadow = '0 15px 35px rgba(229,57,53,0.2)';
                                        const t = el.querySelector('.bc-title') as HTMLElement; if (t) t.style.color = '#fff';
                                        const d = el.querySelector('.bc-desc') as HTMLElement; if (d) d.style.color = 'rgba(255,255,255,0.8)';
                                    }}
                                    onMouseLeave={e => {
                                        const el = e.currentTarget as HTMLElement;
                                        el.style.transform = ''; el.style.background = '#fff'; el.style.boxShadow = '';
                                        const t = el.querySelector('.bc-title') as HTMLElement; if (t) t.style.color = '#111';
                                        const d = el.querySelector('.bc-desc') as HTMLElement; if (d) d.style.color = '#555';
                                    }}
                                >
                                    <div style={{ width: '48px', height: '48px', background: 'rgba(229,57,53,0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#E53935' }}>
                                        <LineChart size={24} />
                                    </div>
                                    <div>
                                        <h3 className="bc-title" style={{ fontSize: '1.2rem', fontWeight: 800, color: '#111', marginBottom: '0.5rem', transition: 'color 0.3s ease' }}>Comisiones Altas y Sin Techo</h3>
                                        <p className="bc-desc" style={{ color: '#555', lineHeight: 1.6, transition: 'color 0.3s ease' }}>
                                            Creemos en recompensar el éxito. Ofrecemos uno de los esquemas de comisiones más competitivos del sector. Cuanto más vendes, más ganas, sin límites.
                                        </p>
                                    </div>
                                </div>

                                {/* Benefit 2 */}
                                <div className="tcn-benefit-card" style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', background: '#fff', padding: '2rem', borderRadius: '16px', border: '1px solid #E53935', transition: 'all 0.3s ease', cursor: 'pointer', borderLeftWidth: '5px' }}
                                    onMouseEnter={e => {
                                        const el = e.currentTarget as HTMLElement;
                                        el.style.transform = 'translateY(-6px)'; el.style.background = '#111'; el.style.boxShadow = '0 15px 35px rgba(229,57,53,0.2)';
                                        const t = el.querySelector('.bc-title') as HTMLElement; if (t) t.style.color = '#fff';
                                        const d = el.querySelector('.bc-desc') as HTMLElement; if (d) d.style.color = 'rgba(255,255,255,0.8)';
                                    }}
                                    onMouseLeave={e => {
                                        const el = e.currentTarget as HTMLElement;
                                        el.style.transform = ''; el.style.background = '#fff'; el.style.boxShadow = '';
                                        const t = el.querySelector('.bc-title') as HTMLElement; if (t) t.style.color = '#111';
                                        const d = el.querySelector('.bc-desc') as HTMLElement; if (d) d.style.color = '#555';
                                    }}
                                >
                                    <div style={{ width: '48px', height: '48px', background: 'rgba(229,57,53,0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#E53935' }}>
                                        <Trophy size={24} />
                                    </div>
                                    <div>
                                        <h3 className="bc-title" style={{ fontSize: '1.2rem', fontWeight: 800, color: '#111', marginBottom: '0.5rem', transition: 'color 0.3s ease' }}>Ventaja Fiscal Estratégica</h3>
                                        <p className="bc-desc" style={{ color: '#555', lineHeight: 1.6, transition: 'color 0.3s ease' }}>
                                            ImportPhones es una marca propiedad de una empresa andorrana. Esto supone una ventaja fiscal competitiva y una estructura sólida que nos permite optimizar los recursos para ofrecer mejores márgenes.
                                        </p>
                                    </div>
                                </div>

                                {/* Benefit 3 */}
                                <div className="tcn-benefit-card" style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', background: '#fff', padding: '2rem', borderRadius: '16px', border: '1px solid #E53935', transition: 'all 0.3s ease', cursor: 'pointer', borderLeftWidth: '5px' }}
                                    onMouseEnter={e => {
                                        const el = e.currentTarget as HTMLElement;
                                        el.style.transform = 'translateY(-6px)'; el.style.background = '#111'; el.style.boxShadow = '0 15px 35px rgba(229,57,53,0.2)';
                                        const t = el.querySelector('.bc-title') as HTMLElement; if (t) t.style.color = '#fff';
                                        const d = el.querySelector('.bc-desc') as HTMLElement; if (d) d.style.color = 'rgba(255,255,255,0.8)';
                                    }}
                                    onMouseLeave={e => {
                                        const el = e.currentTarget as HTMLElement;
                                        el.style.transform = ''; el.style.background = '#fff'; el.style.boxShadow = '';
                                        const t = el.querySelector('.bc-title') as HTMLElement; if (t) t.style.color = '#111';
                                        const d = el.querySelector('.bc-desc') as HTMLElement; if (d) d.style.color = '#555';
                                    }}
                                >
                                    <div style={{ width: '48px', height: '48px', background: 'rgba(229,57,53,0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#E53935' }}>
                                        <ShieldCheck size={24} />
                                    </div>
                                    <div>
                                        <h3 className="bc-title" style={{ fontSize: '1.2rem', fontWeight: 800, color: '#111', marginBottom: '0.5rem', transition: 'color 0.3s ease' }}>Seguridad y Transparencia</h3>
                                        <p className="bc-desc" style={{ color: '#555', lineHeight: 1.6, transition: 'color 0.3s ease' }}>
                                            No trabajamos con promesas en el aire. Todo se formaliza mediante un contrato profesional donde quedan estipuladas de forma clara y transparente tus comisiones.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right side Image */}
                        <div className="reveal-img" style={{ position: 'relative', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', height: '100%', minHeight: '500px' }}>
                            <img
                                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                                alt="Equipo de ventas"
                                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 3. PRODUCTOS Y QUÉ BUSCAMOS ── */}
            <section style={{ padding: '6rem 0', background: '#fff' }}>
                <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

                        {/* QUÉ PRODUCTOS COMERCIALIZARÁS */}
                        <div ref={productsRef}>
                            <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 800, color: '#111', lineHeight: 1.2, marginBottom: '1.5rem' }}>
                                ⚡ ¿Qué productos<br />comercializarás?
                            </h2>
                            <p style={{ color: '#555', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '2rem' }}>
                                Te proporcionamos un catálogo de servicios de alta demanda con procesos de contratación ágiles:
                            </p>
                            <div className="tcn-product-item" style={{ background: '#fff', padding: '1.5rem', borderRadius: '0 12px 12px 0', marginBottom: '1rem', border: '1px solid #E53935', borderLeftWidth: '5px', transition: 'all 0.3s ease', cursor: 'pointer' }}
                                onMouseEnter={e => {
                                    const el = e.currentTarget as HTMLElement;
                                    el.style.transform = 'translateX(6px)'; el.style.background = '#111'; el.style.boxShadow = '0 10px 20px rgba(229,57,53,0.2)';
                                    const t = el.querySelector('.pi-title') as HTMLElement; if (t) t.style.color = '#fff';
                                    const d = el.querySelector('.pi-desc') as HTMLElement; if (d) d.style.color = 'rgba(255,255,255,0.8)';
                                }}
                                onMouseLeave={e => {
                                    const el = e.currentTarget as HTMLElement;
                                    el.style.transform = ''; el.style.background = '#fff'; el.style.boxShadow = '';
                                    const t = el.querySelector('.pi-title') as HTMLElement; if (t) t.style.color = '#111';
                                    const d = el.querySelector('.pi-desc') as HTMLElement; if (d) d.style.color = '#555';
                                }}
                            >
                                <h4 className="pi-title" style={{ fontSize: '1.1rem', fontWeight: 800, color: '#111', display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem', transition: 'color 0.3s ease' }}>
                                    <Zap size={20} color="#E53935" /> Energía
                                </h4>
                                <p className="pi-desc" style={{ color: '#555', fontSize: '0.95rem', transition: 'color 0.3s ease' }}>Soluciones de ahorro luz y gas para hogares y empresas.</p>
                            </div>
                            <div className="tcn-product-item" style={{ background: '#fff', padding: '1.5rem', borderRadius: '0 12px 12px 0', marginBottom: '1.5rem', border: '1px solid #E53935', borderLeftWidth: '5px', transition: 'all 0.3s ease', cursor: 'pointer' }}
                                onMouseEnter={e => {
                                    const el = e.currentTarget as HTMLElement;
                                    el.style.transform = 'translateX(6px)'; el.style.background = '#111'; el.style.boxShadow = '0 10px 20px rgba(229,57,53,0.2)';
                                    const t = el.querySelector('.pi-title') as HTMLElement; if (t) t.style.color = '#fff';
                                    const d = el.querySelector('.pi-desc') as HTMLElement; if (d) d.style.color = 'rgba(255,255,255,0.8)';
                                }}
                                onMouseLeave={e => {
                                    const el = e.currentTarget as HTMLElement;
                                    el.style.transform = ''; el.style.background = '#fff'; el.style.boxShadow = '';
                                    const t = el.querySelector('.pi-title') as HTMLElement; if (t) t.style.color = '#111';
                                    const d = el.querySelector('.pi-desc') as HTMLElement; if (d) d.style.color = '#555';
                                }}
                            >
                                <h4 className="pi-title" style={{ fontSize: '1.1rem', fontWeight: 800, color: '#111', display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem', transition: 'color 0.3s ease' }}>
                                    <Rocket size={20} color="#E53935" /> Conectividad (Fibra)
                                </h4>
                                <p className="pi-desc" style={{ color: '#555', fontSize: '0.95rem', transition: 'color 0.3s ease' }}>Los mejores servicios de fibra óptica y telefonía con cobertura nacional.</p>
                            </div>
                            <p className="tcn-product-item" style={{ fontSize: '0.9rem', color: '#888', fontStyle: 'italic', background: '#FAFAFA', padding: '1rem', borderRadius: '8px', border: '1px solid #EAEAEA' }}>
                                * Tus comisiones por cada cierre en Energía o Fibra estarán detalladas específicamente en tu contrato comercial.
                            </p>
                        </div>

                        {/* QUÉ BUSCAMOS */}
                        <div ref={whatWeLookForRef}>
                            <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 800, color: '#111', lineHeight: 1.2, marginBottom: '2rem' }}>
                                📋 ¿Qué buscamos?
                            </h2>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <div className="tcn-lookfor-item" style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: '#fff', padding: '1.25rem', borderRadius: '12px', border: '1px solid #E53935', transition: 'all 0.3s ease', cursor: 'pointer' }}
                                    onMouseEnter={e => {
                                        const el = e.currentTarget as HTMLElement; el.style.transform = 'scale(1.02)'; el.style.background = '#111';
                                        const sp = el.querySelector('.li-text') as HTMLElement; if (sp) sp.style.color = '#fff';
                                    }}
                                    onMouseLeave={e => {
                                        const el = e.currentTarget as HTMLElement; el.style.transform = ''; el.style.background = '#fff';
                                        const sp = el.querySelector('.li-text') as HTMLElement; if (sp) sp.style.color = '#333';
                                    }}
                                >
                                    <CheckCircle size={22} style={{ color: '#E53935', flexShrink: 0 }} />
                                    <span className="li-text" style={{ fontSize: '1.05rem', color: '#333', fontWeight: 500, transition: 'color 0.3s ease' }}>Perfiles con experiencia en ventas (valorable en sector energético o telecomunicaciones).</span>
                                </div>
                                <div className="tcn-lookfor-item" style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: '#fff', padding: '1.25rem', borderRadius: '12px', border: '1px solid #E53935', transition: 'all 0.3s ease', cursor: 'pointer' }}
                                    onMouseEnter={e => {
                                        const el = e.currentTarget as HTMLElement; el.style.transform = 'scale(1.02)'; el.style.background = '#111';
                                        const sp = el.querySelector('.li-text') as HTMLElement; if (sp) sp.style.color = '#fff';
                                    }}
                                    onMouseLeave={e => {
                                        const el = e.currentTarget as HTMLElement; el.style.transform = ''; el.style.background = '#fff';
                                        const sp = el.querySelector('.li-text') as HTMLElement; if (sp) sp.style.color = '#333';
                                    }}
                                >
                                    <CheckCircle size={22} style={{ color: '#E53935', flexShrink: 0 }} />
                                    <span className="li-text" style={{ fontSize: '1.05rem', color: '#333', fontWeight: 500, transition: 'color 0.3s ease' }}>Autónomos con mentalidad emprendedora.</span>
                                </div>
                                <div className="tcn-lookfor-item" style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: '#fff', padding: '1.25rem', borderRadius: '12px', border: '1px solid #E53935', transition: 'all 0.3s ease', cursor: 'pointer' }}
                                    onMouseEnter={e => {
                                        const el = e.currentTarget as HTMLElement; el.style.transform = 'scale(1.02)'; el.style.background = '#111';
                                        const sp = el.querySelector('.li-text') as HTMLElement; if (sp) sp.style.color = '#fff';
                                    }}
                                    onMouseLeave={e => {
                                        const el = e.currentTarget as HTMLElement; el.style.transform = ''; el.style.background = '#fff';
                                        const sp = el.querySelector('.li-text') as HTMLElement; if (sp) sp.style.color = '#333';
                                    }}
                                >
                                    <CheckCircle size={22} style={{ color: '#E53935', flexShrink: 0 }} />
                                    <span className="li-text" style={{ fontSize: '1.05rem', color: '#333', fontWeight: 500, transition: 'color 0.3s ease' }}>Capacidad de autogestión y orientación a resultados.</span>
                                </div>
                            </div>

                            <div style={{ marginTop: '3rem', padding: '2rem', background: '#fff', borderRadius: '16px', border: '2px dashed #E53935', transition: 'all 0.4s ease', cursor: 'pointer' }}
                                onMouseEnter={e => {
                                    const el = e.currentTarget as HTMLElement; el.style.transform = 'scale(1.02)'; el.style.background = '#111'; el.style.borderStyle = 'solid'; el.style.boxShadow = '0 15px 35px rgba(229,57,53,0.2)';
                                    const t = el.querySelector('.opp-title') as HTMLElement; if (t) t.style.color = '#fff';
                                    const d = el.querySelector('.opp-desc') as HTMLElement; if (d) d.style.color = 'rgba(255,255,255,0.8)';
                                }}
                                onMouseLeave={e => {
                                    const el = e.currentTarget as HTMLElement; el.style.transform = ''; el.style.background = '#fff'; el.style.borderStyle = 'dashed'; el.style.boxShadow = '';
                                    const t = el.querySelector('.opp-title') as HTMLElement; if (t) t.style.color = '#111';
                                    const d = el.querySelector('.opp-desc') as HTMLElement; if (d) d.style.color = '#555';
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                                    <Target size={28} style={{ color: '#E53935' }} />
                                    <h3 className="opp-title" style={{ fontSize: '1.25rem', fontWeight: 800, color: '#111', transition: 'color 0.3s ease' }}>Una oportunidad única</h3>
                                </div>
                                <p className="opp-desc" style={{ color: '#555', fontSize: '1rem', lineHeight: 1.6, transition: 'color 0.3s ease' }}>
                                    No pierdas la oportunidad de formar parte de una marca con proyección internacional y beneficios fiscales únicos. El momento de escalar tus ingresos es ahora.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 4. FORM (Dark Theme) ── */}
            <section id="application-form" ref={formRef} style={{ padding: '6rem 0', background: '#111' }}>
                <div className="max-w-[800px] mx-auto px-6 lg:px-12">
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, color: '#fff', lineHeight: 1.1, marginBottom: '1rem' }}>
                            📩 ¿Estás listo para <span style={{ color: '#E53935' }}>empezar?</span>
                        </h2>
                        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', lineHeight: 1.6 }}>
                            Déjanos tus datos y nos pondremos en contacto contigo rápidamente.
                        </p>
                    </div>

                    <div className="tcn-form-wrapper" style={{
                        background: '#0a0a0a', borderRadius: '24px', padding: '3.5rem 3rem',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.5)', border: '1px solid #222'
                    }}>
                        {isSubmitted ? (
                            <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                                <div style={{ width: '80px', height: '80px', background: 'rgba(229,57,53,0.15)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                                    <CheckCircle size={40} style={{ color: '#E53935' }} />
                                </div>
                                <h3 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#fff', marginBottom: '1rem' }}>¡Candidatura recibida!</h3>
                                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.2rem', marginBottom: '3rem' }}>Revisaremos tu perfil y te contactaremos en menos de 48 horas.</p>
                                <button
                                    onClick={handleReset}
                                    style={{
                                        background: '#E53935',
                                        color: '#fff',
                                        padding: '1.2rem 2.5rem',
                                        borderRadius: '16px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.75rem',
                                        margin: '0 auto',
                                        fontWeight: 700,
                                        fontSize: '1rem',
                                        cursor: 'pointer',
                                        border: 'none',
                                        boxShadow: '0 10px 30px rgba(229,57,53,0.3)'
                                    }}
                                >
                                    <Rocket size={18} />
                                    Enviar otra solicitud
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                                    <div className="form-group">
                                        <label className="form-label" style={{ color: '#ccc', fontWeight: 600 }}>Nombre completo</label>
                                        <input type="text" name="name" required className="form-input" style={{ background: '#151515', border: '1px solid #333', color: '#fff' }}
                                            value={formData.name} onChange={handleChange} placeholder="Tu nombre" />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label" style={{ color: '#ccc', fontWeight: 600 }}>Email profesional</label>
                                        <input type="email" name="email" required className="form-input" style={{ background: '#151515', border: '1px solid #333', color: '#fff' }}
                                            value={formData.email} onChange={handleChange} placeholder="tu@email.com" />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="form-label" style={{ color: '#ccc', fontWeight: 600 }}>Teléfono</label>
                                    <input type="tel" name="phone" required className="form-input" style={{ background: '#151515', border: '1px solid #333', color: '#fff' }}
                                        value={formData.phone} onChange={handleChange} placeholder="+34 XXX XXX XXX" />
                                </div>

                                <div className="form-group">
                                    <label className="form-label" style={{ color: '#ccc', fontWeight: 600 }}>Currículum (CV)</label>
                                    <div style={{ position: 'relative' }}>
                                        <input type="file" name="attachment" required accept=".pdf,.doc,.docx,.xls,.xlsx"
                                            style={{ opacity: 0, position: 'absolute', inset: 0, width: '100%', height: '100%', cursor: 'pointer', zIndex: 10 }}
                                            onChange={e => {
                                                const file = e.target.files?.[0] || null;
                                                setFormData({ ...formData, file });
                                                setFileName(file?.name || '');
                                            }}
                                        />
                                        <div className="form-input" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: '#151515', border: '1px dashed #444' }}>
                                            <Upload size={18} style={{ color: '#E53935' }} />
                                            <span style={{ color: fileName ? '#fff' : '#888', fontSize: '0.95rem', fontWeight: fileName ? 600 : 400 }}>
                                                {fileName || 'Seleccionar archivo (PDF o Word)'}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="form-label" style={{ color: '#ccc', fontWeight: 600 }}>Mensaje (opcional)</label>
                                    <textarea name="message" className="form-textarea" rows={4} style={{ background: '#151515', border: '1px solid #333', color: '#fff' }}
                                        value={formData.message} onChange={handleChange}
                                        placeholder="Breve presentación de tu experiencia en ventas..." />
                                </div>

                                {/* Componente Real de Google reCAPTCHA */}
                                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '0.5rem' }}>
                                    <ReCAPTCHA
                                        ref={recaptchaRef}
                                        sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" // <- Reemplazar por tu clave real de Google reCAPTCHA v2
                                        theme="dark"
                                        onChange={(token) => setIsHuman(!!token)}
                                    />
                                </div>

                                <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '1.2rem', fontSize: '1.1rem', marginTop: '1rem', background: '#E53935', color: '#fff' }} disabled={isSubmitting}>
                                    <Send size={20} style={{ marginRight: '0.5rem' }} />
                                    <span>{isSubmitting ? 'Enviando...' : 'Solicitar Más Información / Enviar CV'}</span>
                                </button>

                                <p style={{ textAlign: 'center', fontSize: '0.8rem', color: '#888', marginTop: '0.5rem' }}>
                                    Al enviar este formulario, aceptas nuestra política de privacidad.
                                </p>
                            </form>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default TrabajaConNosotros;
