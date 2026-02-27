import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import { FileText, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const tocSections = [
    { id: 'sec-1', title: '1. Datos Identificativos' },
    { id: 'sec-2', title: '2. Usuarios y Uso' },
    { id: 'sec-3', title: '3. Propiedad Intelectual' },
    { id: 'sec-4', title: '4. Exclusión de Garantías' },
    { id: 'sec-5', title: '5. Jurisdicción y Ley' },
];

const AvisoLegal = () => {
    const pageRef = useRef<HTMLDivElement>(null);
    const [active, setActive] = useState('sec-1');

    useEffect(() => {
        window.scrollTo(0, 0);
        const ctx = gsap.context(() => {
            const title = pageRef.current?.querySelector<HTMLElement>('.al-title');
            if (title) {
                title.classList.add('split-target');
                const split = new SplitType(title, { types: 'words,chars' });
                gsap.fromTo(split.chars,
                    { y: '110%', opacity: 0 },
                    { y: '0%', opacity: 1, duration: 0.7, stagger: 0.02, ease: 'power3.out', delay: 0.3 }
                );
            }
            gsap.fromTo('.al-hero-sub', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: 0.8 });
            gsap.fromTo('.al-svg-path', { strokeDashoffset: 2000 }, { strokeDashoffset: 0, duration: 2.5, ease: 'power2.out', stagger: 0.07, delay: 0.2 });
            gsap.fromTo('.al-block',
                { y: 40, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: 'power3.out',
                    scrollTrigger: { trigger: '.al-content', start: 'top 75%' }
                }
            );
            tocSections.forEach(sec => {
                ScrollTrigger.create({
                    trigger: `#${sec.id}`, start: 'top 40%', end: 'bottom 40%',
                    onEnter: () => setActive(sec.id),
                    onEnterBack: () => setActive(sec.id),
                });
            });
        }, pageRef);
        return () => ctx.revert();
    }, []);

    const scrollTo = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const Block = ({ id, title, children }: { id: string; title: string; children: React.ReactNode }) => (
        <div id={id} className="al-block" style={{ background: '#fff', borderRadius: '20px', padding: '2.5rem', border: '1px solid rgba(0,0,0,0.06)' }}>
            <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '1.35rem', fontWeight: 700, color: '#111', marginBottom: '1.25rem', paddingBottom: '1rem', borderBottom: '2px solid #E5393520' }}>{title}</h2>
            {children}
        </div>
    );

    const P = ({ children }: { children: React.ReactNode }) => (
        <p style={{ color: '#555', lineHeight: 1.85, marginBottom: '1rem' }}>{children}</p>
    );

    return (
        <div ref={pageRef} className="overflow-hidden">
            <section className="page-header hero-awwards" style={{ position: 'relative', overflow: 'hidden', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {/* Background image — legal / trust */}
                <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
                    <img
                        src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1920&q=80"
                        alt="Aviso Legal"
                        style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.25)' }}
                    />
                </div>
                <div className="hero-subpage-svg" aria-hidden="true" style={{ zIndex: 1 }}>
                    <svg viewBox="0 0 700 500" fill="none">
                        <rect className="al-svg-path" x="200" y="80" width="300" height="360" rx="16" stroke="#E53935" strokeWidth="1.5" strokeDasharray="2000" strokeDashoffset="2000" />
                        <line className="al-svg-path" x1="240" y1="160" x2="460" y2="160" stroke="rgba(229,57,53,0.6)" strokeWidth="1.2" strokeDasharray="2000" strokeDashoffset="2000" />
                        <line className="al-svg-path" x1="240" y1="200" x2="420" y2="200" stroke="rgba(229,57,53,0.4)" strokeWidth="1" strokeDasharray="2000" strokeDashoffset="2000" />
                        <line className="al-svg-path" x1="240" y1="240" x2="440" y2="240" stroke="rgba(229,57,53,0.4)" strokeWidth="1" strokeDasharray="2000" strokeDashoffset="2000" />
                        <line className="al-svg-path" x1="240" y1="280" x2="380" y2="280" stroke="rgba(229,57,53,0.3)" strokeWidth="1" strokeDasharray="2000" strokeDashoffset="2000" />
                        <path className="al-svg-path" d="M440 80 L500 140 L440 140 Z" stroke="rgba(229,57,53,0.5)" strokeWidth="1.2" strokeDasharray="2000" strokeDashoffset="2000" />
                        <circle cx="350" cy="120" r="4" fill="#E53935" opacity="0.8" />
                    </svg>
                </div>
                <div className="max-w-[1800px] mx-auto px-6 lg:px-12 w-full" style={{ position: 'relative', zIndex: 2, paddingTop: '8rem', paddingBottom: '5rem' }}>
                    <p className="page-header-label al-hero-sub" style={{ marginBottom: '1rem' }}>Legal</p>
                    <h1 className="al-title page-header-title" style={{ overflow: 'hidden', marginBottom: '1.5rem', maxWidth: '700px' }}>
                        Aviso <span style={{ color: '#E53935' }}>Legal</span>
                    </h1>
                    <p className="al-hero-sub" style={{ color: 'rgba(255,255,255,0.55)', fontSize: '1.05rem', maxWidth: '560px', lineHeight: 1.7 }}>
                        En cumplimiento de la normativa vigente, a continuación se recogen los datos legales y condiciones de uso de importphones.net.
                    </p>
                </div>
            </section>

            <section className="section-light al-content" style={{ padding: '6rem 0' }}>
                <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
                    <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '5rem', alignItems: 'start' }}>
                        <aside style={{ position: 'sticky', top: '120px' }}>
                            <div style={{ background: '#fff', borderRadius: '20px', padding: '1.75rem', border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 8px 30px rgba(0,0,0,0.06)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.5rem' }}>
                                    <FileText size={18} style={{ color: '#E53935' }} />
                                    <span style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '0.9rem', color: '#111' }}>Contenido</span>
                                </div>
                                <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                                    {tocSections.map(sec => (
                                        <button key={sec.id} onClick={() => scrollTo(sec.id)} style={{
                                            display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 0.75rem',
                                            borderRadius: '10px', border: 'none', cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s ease',
                                            background: active === sec.id ? '#E5393512' : 'transparent',
                                            color: active === sec.id ? '#E53935' : '#666',
                                            fontWeight: active === sec.id ? 600 : 400, fontSize: '0.85rem',
                                        }}>
                                            <ChevronRight size={14} style={{ flexShrink: 0, opacity: active === sec.id ? 1 : 0 }} />
                                            {sec.title}
                                        </button>
                                    ))}
                                </nav>
                            </div>
                        </aside>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            <Block id="sec-1" title="1. Datos Identificativos">
                                <P>En cumplimiento con el deber de información recogido en artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y del Comercio Electrónico, a continuación se reflejan los siguientes datos:</P>
                                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                                    {[['Titular de la web', 'Tech-Grup 2023 slu (en adelante, IMPORTPHONES).'],
                                    ['Dominio web', 'www.importphones.net'], ['NIF/DNI', 'L718140P'],
                                    ['Domicilio', "Escoles 2 ed Noguera Desptx 16 Sant Julia de L'orial (Principat d'Andorra)"],
                                    ['Correo electrónico', 'info@importphones.net'], ['Teléfono', '931596464'],
                                    ].map(([k, v]) => (
                                        <li key={k} style={{ display: 'flex', gap: '0.75rem', padding: '0.75rem', background: '#FAFAFA', borderRadius: '10px' }}>
                                            <span style={{ fontWeight: 600, color: '#333', minWidth: '180px', flexShrink: 0, fontSize: '0.875rem' }}>{k}:</span>
                                            <span style={{ color: '#666', fontSize: '0.875rem' }}>{v}</span>
                                        </li>
                                    ))}
                                </ul>
                            </Block>

                            <Block id="sec-2" title="2. Usuarios y Uso del Portal">
                                <P>El acceso y/o uso de este portal atribuye la condición de USUARIO, que acepta, desde dicho acceso y/o uso, las Condiciones Generales de Uso aquí reflejadas. La página web proporciona el acceso a multitud de informaciones, servicios, programas o datos en Internet pertenecientes a IMPORTPHONES a los que el USUARIO pueda tener acceso. El USUARIO asume la responsabilidad del uso del portal.</P>
                            </Block>

                            <Block id="sec-3" title="3. Propiedad Intelectual e Industrial">
                                <P>Tech-Grup 2023 slu por sí o como cesionario, es titular de todos los derechos de propiedad intelectual e industrial de su página web, así como de los elementos contenidos en la misma (a título enunciativo: imágenes, sonido, audio, vídeo, software o textos; marcas o logotipos, combinaciones de colores, estructura y diseño, etc.).</P>
                                <P>Todos los derechos reservados. Quedan expresamente prohibidas la reproducción, la distribución y la comunicación pública, incluida su modalidad de puesta a disposición, de la totalidad o parte de los contenidos de esta página web, con fines comerciales, en cualquier soporte y por cualquier medio técnico, sin la autorización de IMPORTPHONES.</P>
                            </Block>

                            <Block id="sec-4" title="4. Exclusión de Garantías y Responsabilidad">
                                <P>IMPORTPHONES no se hace responsable, en ningún caso, de los daños y perjuicios de cualquier naturaleza que pudieran ocasionar, a título enunciativo: errores u omisiones en los contenidos, falta de disponibilidad del portal o la transmisión de virus o programas maliciosos o lesivos en los contenidos, a pesar de haber adoptado todas las medidas tecnológicas necesarias para evitarlo.</P>
                            </Block>

                            <Block id="sec-5" title="5. Jurisdicción y Ley Aplicable">
                                <P>Estas condiciones se regirán o interpretarán conforme a la legislación española. Para la resolución de cualquier conflicto, las partes acuerdan someterse a los Juzgados y Tribunales del domicilio del consumidor.</P>
                            </Block>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AvisoLegal;
