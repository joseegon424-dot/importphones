import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, Check } from 'lucide-react';

const CookieConsent = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookie-consent-importphones');
        if (!consent) {
            // Delay showing the banner slightly for better entry
            const timer = setTimeout(() => setIsVisible(true), 2000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookie-consent-importphones', 'accepted');
        setIsVisible(false);
    };

    const handleReject = () => {
        localStorage.setItem('cookie-consent-importphones', 'rejected');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div
            className="fixed bottom-0 left-0 right-0 z-[1000] p-4 lg:p-8 animate-in fade-in slide-in-from-bottom-10 duration-700"
            style={{
                background: 'linear-gradient(to top, rgba(0,0,0,0.95), rgba(0,0,0,0.85))',
                backdropFilter: 'blur(10px)',
                borderTop: '2px solid #E53935'
            }}
        >
            <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row items-center gap-6 lg:gap-12">
                {/* Icon & Title */}
                <div className="flex items-center gap-4 flex-shrink-0">
                    <div style={{
                        width: '50px',
                        height: '50px',
                        background: '#E53935',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '4px 4px 0 #fff'
                    }}>
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.5 2C18.299 2 23 6.70101 23 12.5C23 13.0523 22.5523 13.5 22 13.5C20.3431 13.5 19 12.1569 19 10.5C19 9.94772 18.5523 9.5 18 9.5C16.3431 9.5 15 8.15685 15 6.5C15 5.94772 14.5523 5.5 14 5.5C12.3431 5.5 11 4.15685 11 2.5C11 1.94772 11.4477 1.5 12 1.5C12.166 1.5 12.3338 1.66014 12.5 2Z" fill="#fff" opacity="0.1" />
                            <path d="M21.949 13.268C21.8415 17.8488 17.8935 21.611 12.8333 21.611C7.40251 21.611 3 17.1354 3 11.611C3 7.02706 6.0716 3.16117 10.2319 2.01917C10.7481 1.87747 11.2319 2.27439 11.2319 2.8093C11.2319 4.35985 12.4497 5.61102 14.0044 5.61102C14.4753 5.61102 14.9083 5.83648 15.1843 6.20811C15.5412 6.68884 16.5413 8.36102 18.2319 8.36102C19.6468 8.36102 20.8143 9.42168 20.9856 10.7937C21.0506 11.3142 21.4646 11.7589 22.0003 11.8384C22.6186 11.9302 23 12.5028 23 13.111C23 13.1636 22.9926 13.2162 21.949 13.268Z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <rect x="7" y="10" width="3" height="3" rx="1.5" fill="#fff" />
                            <rect x="13" y="15" width="4" height="4" rx="2" fill="#fff" />
                            <rect x="8" y="16" width="2" height="2" rx="1" fill="#fff" />
                            <rect x="16" y="11" width="2.5" height="2.5" rx="1.25" fill="#fff" />
                        </svg>
                    </div>
                </div>

                {/* Text Content */}
                <div className="flex-1 text-center lg:text-left">
                    <h4 style={{
                        fontFamily: 'Space Grotesk',
                        fontWeight: 800,
                        fontSize: '1.2rem',
                        color: '#fff',
                        marginBottom: '0.5rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                    }}>
                        Control de Cookies
                    </h4>
                    <p style={{
                        fontSize: '0.85rem',
                        color: 'rgba(255,255,255,0.7)',
                        lineHeight: 1.5,
                        maxWidth: '800px'
                    }}>
                        Utilizamos cookies propias y de terceros para mejorar tu experiencia, analizar el tráfico y mostrarte contenido relevante.
                        Puedes aceptarlas todas, rechazarlas o configurar tus preferencias en nuestra{' '}
                        <Link to="/politica-cookies" className="text-white underline hover:text-[#E53935] transition-colors">
                            Política de Cookies
                        </Link>.
                    </p>
                </div>

                {/* Buttons */}
                <div className="flex flex-wrap justify-center gap-4 sm:flex-nowrap">
                    <button
                        onClick={handleReject}
                        className="group relative px-6 py-3 overflow-hidden"
                        style={{ border: '1px solid rgba(255,255,255,0.2)', transition: 'all 0.3s ease' }}
                    >
                        <span style={{ position: 'relative', zIndex: 1, fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)' }}>Rechazar</span>
                        <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>

                    <button
                        onClick={handleAccept}
                        className="group relative px-8 py-3 bg-white text-black font-bold flex items-center gap-2 overflow-hidden"
                        style={{ transition: 'all 0.3s cubic-bezier(0.23, 1, 0.32, 1)' }}
                        
                        
                    >
                        <Check size={18} />
                        <span style={{ fontSize: '0.85rem', textTransform: 'uppercase' }}>Aceptar Todas</span>
                    </button>
                </div>

                {/* Close Button (Small) */}
                <button
                    onClick={() => setIsVisible(false)}
                    className="absolute top-4 right-4 text-white/30 hover:text-white transition-colors"
                    aria-label="Cerrar"
                >
                    <X size={20} />
                </button>
            </div>

            {/* Branding Accent */}
            <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '150px',
                height: '4px',
                background: '#E53935'
            }} />
        </div>
    );
};

export default CookieConsent;
