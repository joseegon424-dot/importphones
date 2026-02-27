import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const WhatsAppFloating = () => {
    const btnRef = useRef<HTMLAnchorElement>(null);

    useEffect(() => {
        if (btnRef.current) {
            gsap.fromTo(
                btnRef.current,
                { scale: 0, opacity: 0 },
                {
                    scale: 1,
                    opacity: 1,
                    duration: 0.8,
                    ease: 'back.out(1.7)',
                    delay: 2
                }
            );
        }
    }, []);

    const whatsappUrl = 'https://wa.me/34611809595?text=Hola,%20quisiera%20recibir%20más%20información%20sobre%20vuestros%20servicios.';

    return (
        <a
            ref={btnRef}
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-floating-btn"
            aria-label="Contactar por WhatsApp"
            style={{ backgroundColor: '#666', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
            <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp original logo" style={{ width: 36, height: 36, objectFit: 'contain' }} />
            <span className="whatsapp-tooltip">¿Hola! ¿En qué podemos ayudarte?</span>
        </a>
    );
};

export default WhatsAppFloating;
