import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Cookie, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const tocSections = [
    { id: 'pc-1', title: '1. ¿Qué son las Cookies?' },
    { id: 'pc-2', title: '2. Tipos de Cookies que utilizamos' },
    { id: 'pc-3', title: '3. Cookies de Terceros' },
    { id: 'pc-4', title: '4. Cómo gestionar las Cookies' },
    { id: 'pc-5', title: '5. Actualizaciones y Cambios' },
];

const PoliticaCookies = () => {
    const heroRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const [active, setActive] = useState('pc-1');

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
            gsap.fromTo('.pc-hero-sub', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: 0.8 });
            gsap.fromTo('.pc-svg-path', { strokeDashoffset: 2000 }, { strokeDashoffset: 0, duration: 2.5, ease: 'power2.out', stagger: 0.07, delay: 0.2 });
            gsap.fromTo('.pc-block',
                { y: 40, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: 'power3.out',
                    scrollTrigger: { trigger: '.pc-content', start: 'top 75%' }
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
        <div id={id} className="pc-block" style={{ background: '#fff', borderRadius: '20px', padding: '2.5rem', border: '1px solid rgba(0,0,0,0.06)' }}>
            <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '1.35rem', fontWeight: 700, color: '#111', marginBottom: '1.25rem', paddingBottom: '1rem', borderBottom: '2px solid #E5393520' }}>{title}</h2>
            {children}
        </div>
    );

    const P = ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => (
        <p style={{ color: '#555', lineHeight: 1.85, marginBottom: '1rem', ...style }}>{children}</p>
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
                        src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1920&q=80"
                        alt="Política de Cookies"
                        className="w-full h-full object-cover filter brightness-[0.25]"
                    />
                    <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3BaseFilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/baseFilter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/40 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-transparent" />
                </div>

                <div className="hero-subpage-svg" aria-hidden="true" style={{ zIndex: 1, opacity: 0.4 }}>
                    <svg viewBox="0 0 700 500" fill="none">
                        {/* Outer Tech Ring */}
                        <circle className="pc-svg-path" cx="350" cy="250" r="160" stroke="rgba(229,57,53,0.15)" strokeWidth="1.5" strokeDasharray="6 6" />
                        <circle className="pc-svg-path" cx="350" cy="250" r="180" stroke="rgba(229,57,53,0.08)" strokeWidth="1" />

                        {/* Main Cookie Outline */}
                        <path className="pc-svg-path"
                            d="M 470 250 A 120 120 0 1 1 350 130 A 120 120 0 0 1 434.8 165.1 A 50 50 0 0 0 470 250 Z"
                            stroke="#E53935" strokeWidth="2.5" fill="rgba(0,0,0,0.4)" strokeLinecap="round" strokeLinejoin="round"
                            strokeDasharray="2000" strokeDashoffset="2000" />

                        {/* Technological Data Chips */}
                        <rect className="pc-svg-path" x="270" y="200" width="16" height="16" rx="4" stroke="#E53935" strokeWidth="1.5" strokeDasharray="2000" strokeDashoffset="2000" />
                        <circle className="pc-svg-path" cx="278" cy="208" r="3" fill="rgba(229,57,53,0.4)" />

                        <circle className="pc-svg-path" cx="330" cy="170" r="12" stroke="#E53935" strokeWidth="1.5" strokeDasharray="2000" strokeDashoffset="2000" />
                        <path className="pc-svg-path" d="M326 170 L334 170 M330 166 L330 174" stroke="#E53935" strokeWidth="1.5" strokeDasharray="2000" strokeDashoffset="2000" />

                        <rect className="pc-svg-path" x="380" y="230" width="20" height="20" rx="4" fill="rgba(229,57,53,0.1)" stroke="#E53935" strokeWidth="1.5" strokeDasharray="2000" strokeDashoffset="2000" />
                        <circle className="pc-svg-path" cx="390" cy="240" r="4" fill="#E53935" />

                        <polygon className="pc-svg-path" points="300,280 320,280 310,300" stroke="#E53935" strokeLinejoin="round" strokeWidth="1.5" strokeDasharray="2000" strokeDashoffset="2000" />

                        <circle className="pc-svg-path" cx="360" cy="320" r="10" stroke="#E53935" strokeWidth="1.5" strokeDasharray="2000" strokeDashoffset="2000" />
                        <circle className="pc-svg-path" cx="360" cy="320" r="4" fill="rgba(229,57,53,0.6)" />

                        {/* Connecting Circuit Lines */}
                        <path className="pc-svg-path" d="M 286 208 L 310 208 L 318 180" stroke="rgba(229,57,53,0.5)" strokeWidth="1.5" fill="none" strokeDasharray="2000" strokeDashoffset="2000" />
                        <path className="pc-svg-path" d="M 342 170 L 370 170 L 390 230" stroke="rgba(229,57,53,0.5)" strokeWidth="1.5" fill="none" strokeDasharray="2000" strokeDashoffset="2000" />
                        <path className="pc-svg-path" d="M 310 300 L 330 320 L 350 320" stroke="rgba(229,57,53,0.5)" strokeWidth="1.5" fill="none" strokeDasharray="2000" strokeDashoffset="2000" />

                        {/* Privacy / Shield Core */}
                        <path className="pc-svg-path" d="M 320 230 L 360 230 L 360 260 C 360 280 340 295 340 295 C 340 295 320 280 320 260 Z" fill="rgba(229,57,53,0.05)" stroke="#E53935" strokeWidth="2" strokeDasharray="2000" strokeDashoffset="2000" />
                        <path className="pc-svg-path" d="M 330 230 L 330 215 C 330 205 350 205 350 215 L 350 230" fill="none" stroke="#E53935" strokeWidth="2" strokeDasharray="2000" strokeDashoffset="2000" />
                        <circle className="pc-svg-path" cx="340" cy="255" r="3" fill="#E53935" />
                        <path className="pc-svg-path" d="M 340 258 L 340 266" stroke="#E53935" strokeWidth="2" strokeDasharray="2000" strokeDashoffset="2000" />

                        {/* Extracted Data Blocks from Bite */}
                        <rect className="pc-svg-path" x="480" y="160" width="16" height="16" rx="3" stroke="rgba(229,57,53,0.8)" strokeWidth="1.5" fill="none" strokeDasharray="2000" strokeDashoffset="2000" />
                        <rect className="pc-svg-path" x="450" y="120" width="10" height="10" rx="2" fill="#E53935" />
                        <rect className="pc-svg-path" x="510" y="200" width="12" height="12" rx="2" fill="rgba(229,57,53,0.2)" stroke="#E53935" strokeWidth="1.5" strokeDasharray="2000" strokeDashoffset="2000" />
                        <circle className="pc-svg-path" cx="540" cy="150" r="5" fill="#E53935" />
                    </svg>
                </div>

                <div className="max-w-[1800px] mx-auto px-6 lg:px-12 w-full relative z-10">
                    <p className="hero-label pc-hero-sub">COOKIES</p>
                    <h1 ref={titleRef} className="hero-title-brutal">
                        {[
                            { text: 'POLÍTICA DE', red: false },
                            { text: 'COOKIES', red: true },
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
                    <p className="hero-subtitle pc-hero-sub max-w-[600px]">
                        Transparencia en el uso de datos. Te explicamos qué son las cookies, cómo las usamos y cómo puedes gestionarlas.
                    </p>
                </div>

                {/* Minimal Scroll Indicator */}
                <div className="absolute bottom-8 left-12 flex flex-col items-center gap-3">
                    <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent opacity-20"></div>
                    <span className="text-[9px] text-white/20 uppercase tracking-[0.4em] font-bold [writing-mode:vertical-lr]">Scroll</span>
                </div>
            </section>

            <section className="section-light pc-content" style={{ padding: '6rem 0' }}>
                <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
                    <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '5rem', alignItems: 'start' }}>
                        <aside style={{ position: 'sticky', top: '120px' }}>
                            <div style={{ background: '#fff', borderRadius: '20px', padding: '1.75rem', border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 8px 30px rgba(0,0,0,0.06)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.5rem' }}>
                                    <Cookie size={18} style={{ color: '#E53935' }} />
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
                            <Block id="pc-1" title="1. ¿Qué son las Cookies?">
                                <P>Una cookie es un pequeño fichero de texto que se almacena en su navegador cuando visita casi cualquier página web. Su utilidad es que la web sea capaz de recordar su visita cuando vuelva a navegar por esa página.</P>
                                <P>Las cookies suelen almacenar información de carácter técnico, preferencias personales, personalización de contenidos, estadísticas de uso, enlaces a redes sociales, acceso a cuentas de usuario, etc. El objetivo de la cookie es adaptar el contenido de la web a su perfil y necesidades; sin cookies los servicios ofrecidos por cualquier página se verían mermados notablemente.</P>
                            </Block>

                            <Block id="pc-2" title="2. Tipos de Cookies que utilizamos">
                                <P>Siguiendo las directrices de la Agencia Española de Protección de Datos (AEPD), procedemos a detallar el uso de cookies que hace esta web:</P>
                                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <Li><span><strong>Cookies Técnicas:</strong> Son aquellas que permiten al usuario la navegación a través de la página web y la utilización de las diferentes opciones o servicios que en ella existen. Son estrictamente necesarias para el funcionamiento del sitio.</span></Li>
                                    <Li><span><strong>Cookies de Preferencias:</strong> Permiten recordar información para que el usuario acceda al servicio con determinadas características (por ejemplo, el idioma).</span></Li>
                                    <Li><span><strong>Cookies de Análisis:</strong> Son aquellas que nos permiten cuantificar el número de usuarios y así realizar la medición y análisis estadístico de la utilización que hacen los usuarios del servicio ofertado.</span></Li>
                                </ul>
                            </Block>

                            <Block id="pc-3" title="3. Cookies de Terceros">
                                <P>Este sitio web utiliza servicios de terceros que recopilarán información con fines estadísticos y de uso de la web por parte del usuario:</P>
                                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <Li><strong>Google Analytics:</strong> Almacena cookies para poder elaborar estadísticas sobre el tráfico y volumen de visitas de esta web. Al utilizar este sitio web está consintiendo el tratamiento de información acerca de usted por Google.</Li>
                                    <Li><strong>Redes Sociales:</strong> Cada red social utiliza sus propias cookies para que usted pueda pinchar en botones del tipo "Me gusta" o "Compartir".</Li>
                                </ul>
                            </Block>

                            <Block id="pc-4" title="4. Cómo gestionar las Cookies">
                                <P>En cualquier momento podrá ejercer su derecho de desactivación o eliminación de cookies de este sitio web. Estas acciones se realizan de forma diferente en función del navegador que esté usando. Aquí tiene guías para los navegadores más populares:</P>
                                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <Li><a href="https://support.google.com/chrome/answer/95647?hl=es" target="_blank" rel="noopener noreferrer" style={{ color: '#E53935', fontWeight: 600 }}>Google Chrome</a></Li>
                                    <Li><a href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias" target="_blank" rel="noopener noreferrer" style={{ color: '#E53935', fontWeight: 600 }}>Mozilla Firefox</a></Li>
                                    <Li><a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" style={{ color: '#E53935', fontWeight: 600 }}>Safari</a></Li>
                                    <Li><a href="https://support.microsoft.com/es-es/microsoft-edge/eliminar-las-cookies-en-microsoft-edge-63491105-951c-e30a-7063-e2316e159114" target="_blank" rel="noopener noreferrer" style={{ color: '#E53935', fontWeight: 600 }}>Microsoft Edge</a></Li>
                                </ul>
                                <P style={{ marginTop: '1rem' }}>También puede utilizar el banner de configuración de cookies que aparece al entrar en nuestra web para modificar sus preferencias.</P>
                            </Block>

                            <Block id="pc-5" title="5. Actualizaciones y Cambios">
                                <P>Es posible que actualicemos la Política de Cookies de nuestro Sitio Web, por ello le recomendamos revisar esta política cada vez que acceda a nuestro Sitio Web con el objetivo de estar adecuadamente informado sobre cómo y para qué usamos las cookies.</P>
                                <P>La Política de Cookies se actualizó por última vez en fecha 05 de Marzo de 2026.</P>
                            </Block>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PoliticaCookies;
