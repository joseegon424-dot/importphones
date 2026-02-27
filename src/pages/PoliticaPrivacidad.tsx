import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const tocSections = [
    { id: 'pp-1', title: '1. Responsable del Tratamiento' },
    { id: 'pp-2', title: '2. Finalidad del Tratamiento' },
    { id: 'pp-3', title: '3. Legitimación' },
    { id: 'pp-4', title: '4. Conservación de los Datos' },
    { id: 'pp-5', title: '5. Destinatarios' },
    { id: 'pp-6', title: '6. Derechos del Usuario' },
];

const PoliticaPrivacidad = () => {
    const heroRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const [active, setActive] = useState('pp-1');

    useEffect(() => {
        window.scrollTo(0, 0);
        const ctx = gsap.context(() => {
            // ── Hero title
            if (titleRef.current) {
                const words = titleRef.current.querySelectorAll('.hero-word-line');
                gsap.fromTo(words,
                    { y: '110%', opacity: 0, skewY: 3 },
                    { y: '0%', opacity: 1, skewY: 0, duration: 0.9, stagger: 0.1, ease: 'power3.out', delay: 0.3 }
                );
            }
            gsap.fromTo('.pp-hero-sub', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: 0.8 });
            gsap.fromTo('.pp-svg-path', { strokeDashoffset: 2000 }, { strokeDashoffset: 0, duration: 2.5, ease: 'power2.out', stagger: 0.07, delay: 0.2 });
            gsap.fromTo('.pp-block',
                { y: 40, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: 'power3.out',
                    scrollTrigger: { trigger: '.pp-content', start: 'top 75%' }
                }
            );
            tocSections.forEach(sec => {
                ScrollTrigger.create({
                    trigger: `#${sec.id}`, start: 'top 40%', end: 'bottom 40%',
                    onEnter: () => setActive(sec.id),
                    onEnterBack: () => setActive(sec.id),
                });
            });
        }, heroRef);
        return () => ctx.revert();
    }, []);

    const scrollTo = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const Block = ({ id, title, children }: { id: string; title: string; children: React.ReactNode }) => (
        <div id={id} className="pp-block" style={{ background: '#fff', borderRadius: '20px', padding: '2.5rem', border: '1px solid rgba(0,0,0,0.06)' }}>
            <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '1.35rem', fontWeight: 700, color: '#111', marginBottom: '1.25rem', paddingBottom: '1rem', borderBottom: '2px solid #E5393520' }}>{title}</h2>
            {children}
        </div>
    );

    const P = ({ children }: { children: React.ReactNode }) => (
        <p style={{ color: '#555', lineHeight: 1.85, marginBottom: '1rem' }}>{children}</p>
    );

    const Li = ({ children }: { children: React.ReactNode }) => (
        <li style={{ display: 'flex', gap: '0.75rem', padding: '0.7rem', background: '#FAFAFA', borderRadius: '10px', fontSize: '0.875rem', color: '#555', lineHeight: 1.6 }}>
            <span style={{ color: '#E53935', flexShrink: 0, marginTop: '2px' }}>▸</span>
            {children}
        </li>
    );

    return (
        <div ref={heroRef} className="overflow-hidden">
            {/* ── S1: HERO */}
            <section className="hero-awwards">
                {/* Background Image & Overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1920&q=80"
                        alt="Política de Privacidad"
                        className="w-full h-full object-cover filter brightness-[0.25]"
                    />
                    <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3BaseFilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/baseFilter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/40 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-transparent" />
                </div>

                <div className="hero-subpage-svg" aria-hidden="true" style={{ zIndex: 1, opacity: 0.4 }}>
                    <svg viewBox="0 0 700 500" fill="none">
                        <path className="pp-svg-path"
                            d="M350 80 L470 130 L470 260 Q470 370 350 420 Q230 370 230 260 L230 130 Z"
                            stroke="#E53935" strokeWidth="1.5" strokeDasharray="2000" strokeDashoffset="2000" />
                        <path className="pp-svg-path"
                            d="M350 100 L455 145 L455 258 Q455 355 350 400 Q245 355 245 258 L245 145 Z"
                            stroke="rgba(229,57,53,0.4)" strokeWidth="1" strokeDasharray="2000" strokeDashoffset="2000" />
                        <path className="pp-svg-path" d="M300 250 L335 285 L410 210"
                            stroke="rgba(229,57,53,0.7)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="2000" strokeDashoffset="2000" />
                        <circle cx="350" cy="80" r="5" fill="#E53935" opacity="0.8" />
                    </svg>
                </div>

                <div className="max-w-[1800px] mx-auto px-6 lg:px-12 w-full relative z-10">
                    <p className="hero-label pp-hero-sub">PRIVACIDAD</p>
                    <h1 ref={titleRef} className="hero-title-brutal">
                        {[
                            { text: 'POLÍTICA DE', red: false },
                            { text: 'PRIVACIDAD', red: true },
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
                    <p className="hero-subtitle pp-hero-sub max-w-[600px]">
                        Tu seguridad y confianza son nuestra prioridad. Cumplimos rigurosamente con el RGPD para proteger tus datos personales.
                    </p>
                </div>

                {/* Minimal Scroll Indicator */}
                <div className="absolute bottom-8 left-12 flex flex-col items-center gap-3">
                    <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent opacity-20"></div>
                    <span className="text-[9px] text-white/20 uppercase tracking-[0.4em] font-bold [writing-mode:vertical-lr]">Scroll</span>
                </div>
            </section>

            <section className="section-light pp-content" style={{ padding: '6rem 0' }}>
                <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
                    <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '5rem', alignItems: 'start' }}>
                        <aside style={{ position: 'sticky', top: '120px' }}>
                            <div style={{ background: '#fff', borderRadius: '20px', padding: '1.75rem', border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 8px 30px rgba(0,0,0,0.06)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.5rem' }}>
                                    <Shield size={18} style={{ color: '#E53935' }} />
                                    <span style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '0.9rem', color: '#111' }}>Contenido</span>
                                </div>
                                <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                                    {tocSections.map(sec => (
                                        <button key={sec.id} onClick={() => scrollTo(sec.id)} style={{
                                            display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 0.75rem',
                                            borderRadius: '10px', border: 'none', cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s ease',
                                            background: active === sec.id ? '#E5393512' : 'transparent',
                                            color: active === sec.id ? '#E53935' : '#666',
                                            fontWeight: active === sec.id ? 600 : 400, fontSize: '0.82rem',
                                        }}>
                                            <ChevronRight size={14} style={{ flexShrink: 0, opacity: active === sec.id ? 1 : 0 }} />
                                            {sec.title}
                                        </button>
                                    ))}
                                </nav>
                            </div>
                        </aside>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            <Block id="pp-1" title="1. Responsable del Tratamiento">
                                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <Li><span><strong>Identidad:</strong> Tech-grup 2023 slu</span></Li>
                                    <Li><span><strong>NIF/DNI:</strong> L718140P</span></Li>
                                    <Li><span><strong>Dirección postal:</strong> Escoles 2 ed Noguera Desptx 16 Sant Julia de L'orial (Principat d'Andorra)</span></Li>
                                    <Li><span><strong>Correo electrónico:</strong> INFO@IMPORTPHONES.NET</span></Li>
                                </ul>
                            </Block>

                            <Block id="pp-2" title="2. Finalidad del Tratamiento de los Datos">
                                <P>En www.importphones.net tratamos la información que nos facilitan las personas interesadas con el fin de:</P>
                                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <Li>Gestionar el envío de la información que nos soliciten.</Li>
                                    <Li>Proveer ofertas de productos y servicios de su interés (si han dado su consentimiento).</Li>
                                    <Li>Gestionar las compras realizadas a través del sitio web, incluyendo el envío de los productos y la facturación.</Li>
                                </ul>
                            </Block>

                            <Block id="pp-3" title="3. Legitimación">
                                <P>La base legal para el tratamiento de sus datos es:</P>
                                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <Li><span><strong>Consentimiento del interesado:</strong> Para la gestión de consultas y el envío de comunicaciones comerciales.</span></Li>
                                    <Li><span><strong>Ejecución de un contrato:</strong> Para la gestión, envío y facturación de las compras de productos que realice en nuestra tienda.</span></Li>
                                </ul>
                            </Block>

                            <Block id="pp-4" title="4. Conservación de los Datos">
                                <P>Los datos personales proporcionados se conservarán mientras se mantenga la relación mercantil o hasta que solicites su supresión y, en cualquier caso, durante los años necesarios para cumplir con las obligaciones legales (por ejemplo, datos de facturación).</P>
                            </Block>

                            <Block id="pp-5" title="5. Destinatarios">
                                <P>Los datos no se cederán a terceros salvo en los casos en que exista una obligación legal o sea estrictamente necesario para el cumplimiento de los servicios ofertados (por ejemplo, empresas de mensajería para enviar los pedidos o pasarelas de pago).</P>
                            </Block>

                            <Block id="pp-6" title="6. Derechos del Usuario">
                                <P>Cualquier persona tiene derecho a obtener confirmación sobre si en IMPORTPHONES estamos tratando datos personales que les conciernan, o no. Las personas interesadas tienen derecho a:</P>
                                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.25rem' }}>
                                    {['Acceder a sus datos personales.', 'Solicitar la rectificación de los datos inexactos.',
                                        'Solicitar su supresión.', 'Solicitar la limitación u oposición de su tratamiento.',
                                        'Solicitar la portabilidad de los datos.'].map((t, i) => <Li key={i}>{t}</Li>)}
                                </ul>
                                <P>Podrá ejercer estos derechos enviando un correo electrónico a <strong>info@importphones.net</strong>, acompañando una fotocopia de su DNI o documento equivalente para acreditar su identidad.</P>
                            </Block>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PoliticaPrivacidad;
