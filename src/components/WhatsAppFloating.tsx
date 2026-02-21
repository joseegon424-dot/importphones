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
        >
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.011 0C5.394 0 0.014 5.38 0 11.996c0 2.114.553 4.18 1.597 6.04L0 24l6.13-.1.52.33a11.942 11.942 0 0 0 5.361 1.28c6.617 0 11.996-5.38 12.011-11.996.014-6.616-5.38-11.996-12.011-12.01" fill="none" />
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.983.998-3.648-.235-.374a9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884" fill="#25D366" />
            </svg>
            <span className="whatsapp-tooltip">¿Hola! ¿En qué podemos ayudarte?</span>
        </a>
    );
};

export default WhatsAppFloating;
