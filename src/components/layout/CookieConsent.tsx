import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, Check } from 'lucide-react';

const CookieConsent = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookie-consent-importphones');
        if (!consent) {
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
            style={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 1000,
                padding: 'clamp(0.5rem, 2vw, 1rem)',
                background: 'linear-gradient(to top, rgba(0,0,0,0.97), rgba(0,0,0,0.90))',
                backdropFilter: 'blur(10px)',
                borderTop: '2px solid #E53935',
            }}
        >
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: 'clamp(0.5rem, 2vw, 1rem)',
            }}>
                {/* Cookie Icon */}
                <div style={{
                    width: 'clamp(32px, 6vw, 44px)',
                    height: 'clamp(32px, 6vw, 44px)',
                    minWidth: '32px',
                    background: '#E53935',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    boxShadow: '3px 3px 0 #fff',
                }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.5 2C18.299 2 23 6.70101 23 12.5C23 13.0523 22.5523 13.5 22 13.5C20.3431 13.5 19 12.1569 19 10.5C19 9.94772 18.5523 9.5 18 9.5C16.3431 9.5 15 8.15685 15 6.5C15 5.94772 14.5523 5.5 14 5.5C12.3431 5.5 11 4.15685 11 2.5C11 1.94772 11.4477 1.5 12 1.5C12.166 1.5 12.3338 1.66014 12.5 2Z" fill="#fff" opacity="0.1" />
                        <path d="M21.949 13.268C21.8415 17.8488 17.8935 21.611 12.8333 21.611C7.40251 21.611 3 17.1354 3 11.611C3 7.02706 6.0716 3.16117 10.2319 2.01917C10.7481 1.87747 11.2319 2.27439 11.2319 2.8093C11.2319 4.35985 12.4497 5.61102 14.0044 5.61102C14.4753 5.61102 14.9083 5.83648 15.1843 6.20811C15.5412 6.68884 16.5413 8.36102 18.2319 8.36102C19.6468 8.36102 20.8143 9.42168 20.9856 10.7937C21.0506 11.3142 21.4646 11.7589 22.0003 11.8384C22.6186 11.9302 23 12.5028 23 13.111C23 13.1636 22.9926 13.2162 21.949 13.268Z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <rect x="7" y="10" width="3" height="3" rx="1.5" fill="#fff" />
                        <rect x="13" y="15" width="4" height="4" rx="2" fill="#fff" />
                        <rect x="8" y="16" width="2" height="2" rx="1" fill="#fff" />
                        <rect x="16" y="11" width="2.5" height="2.5" rx="1.25" fill="#fff" />
                    </svg>
                </div>

                {/* Text */}
                <div style={{ flex: '1 1 250px', minWidth: 0 }}>
                    <h4 style={{
                        fontFamily: 'Space Grotesk, sans-serif',
                        fontWeight: 800,
                        fontSize: 'clamp(0.8rem, 2.5vw, 1.1rem)',
                        color: '#fff',
                        marginBottom: '0.25rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                    }}>
                        Control de Cookies
                    </h4>
                    <p style={{
                        fontSize: 'clamp(0.7rem, 2vw, 0.82rem)',
                        color: 'rgba(255,255,255,0.65)',
                        lineHeight: 1.4,
                        margin: 0,
                    }}>
                        Utilizamos cookies para mejorar tu experiencia.{' '}
                        <Link to="/politica-cookies" style={{ color: 'white', textDecoration: 'underline' }}>
                            Política de Cookies
                        </Link>.
                    </p>
                </div>

                {/* Buttons */}
                <div style={{
                    display: 'flex',
                    gap: '0.5rem',
                    flexShrink: 0,
                    flexWrap: 'nowrap',
                }}>
                    <button
                        onClick={handleReject}
                        style={{
                            padding: 'clamp(0.5rem, 1.5vw, 0.75rem) clamp(0.75rem, 2vw, 1.25rem)',
                            border: '1px solid rgba(255,255,255,0.2)',
                            background: 'none',
                            color: 'rgba(255,255,255,0.6)',
                            fontSize: 'clamp(0.7rem, 2vw, 0.82rem)',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        Rechazar
                    </button>
                    <button
                        onClick={handleAccept}
                        style={{
                            padding: 'clamp(0.5rem, 1.5vw, 0.75rem) clamp(0.75rem, 2vw, 1.25rem)',
                            background: 'white',
                            color: 'black',
                            fontWeight: 700,
                            fontSize: 'clamp(0.7rem, 2vw, 0.82rem)',
                            textTransform: 'uppercase',
                            border: 'none',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.35rem',
                            transition: 'all 0.3s ease',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        <Check size={16} />
                        Aceptar
                    </button>
                </div>

                {/* Close Button */}
                <button
                    onClick={() => setIsVisible(false)}
                    aria-label="Cerrar"
                    style={{
                        position: 'absolute',
                        top: '0.5rem',
                        right: '0.5rem',
                        background: 'none',
                        border: 'none',
                        color: 'rgba(255,255,255,0.3)',
                        cursor: 'pointer',
                        padding: '4px',
                    }}
                >
                    <X size={18} />
                </button>
            </div>

            {/* Accent line */}
            <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100px',
                height: '3px',
                background: '#E53935',
            }} />
        </div>
    );
};

export default CookieConsent;
