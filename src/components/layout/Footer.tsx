import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ExternalLink, Star, Phone, Mail, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const noiseCanvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (footerRef.current) {
      gsap.set(footerRef.current.querySelectorAll('.footer-reveal'), {
        y: 0,
        opacity: 1
      });
    }

    // Animated red gradient noise canvas
    const canvas = noiseCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    let t = 0;
    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // Flowing grid lines with red tint
      ctx.strokeStyle = 'rgba(229,57,53,0.06)';
      ctx.lineWidth = 1;
      const cols = 20;
      const rows = 8;
      for (let i = 0; i <= cols; i++) {
        const x = (i / cols) * w;
        ctx.beginPath();
        for (let j = 0; j <= rows; j++) {
          const y = (j / rows) * h;
          const wave = Math.sin(j * 0.8 + t * 0.8 + i * 0.3) * 6;
          if (j === 0) ctx.moveTo(x + wave, y);
          else ctx.lineTo(x + wave, y);
        }
        ctx.stroke();
      }
      for (let j = 0; j <= rows; j++) {
        const y = (j / rows) * h;
        ctx.beginPath();
        for (let i = 0; i <= cols; i++) {
          const x = (i / cols) * w;
          const wave = Math.sin(i * 0.5 + t * 0.6 + j * 0.4) * 5;
          if (i === 0) ctx.moveTo(x, y + wave);
          else ctx.lineTo(x, y + wave);
        }
        ctx.stroke();
      }

      // Floating glowing particles
      for (let p = 0; p < 12; p++) {
        const px = Math.sin(t * 0.3 + p * 2.1) * w * 0.4 + w * 0.5;
        const py = Math.cos(t * 0.25 + p * 1.7) * h * 0.3 + h * 0.5;
        const radius = 2 + Math.sin(t + p) * 1.5;
        ctx.beginPath();
        ctx.arc(px, py, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(229,57,53,${0.15 + Math.sin(t + p) * 0.1})`;
        ctx.fill();
      }

      t += 0.015;
      animFrameRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      if (animFrameRef.current !== undefined) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  const quickLinks = [
    { path: '/', label: 'Inicio' },
    { path: '/quienes-somos', label: 'Nosotros' },
    { path: '/servicios', label: 'Servicios' },
    { path: '/contacto', label: 'Contacto' },
    { path: '/trabaja-con-nosotros', label: 'Trabaja con nosotros' },
  ];

  const services = [
    { path: '/servicios/telecomunicaciones', label: 'Telecomunicaciones' },
    { path: '/servicios/energia', label: 'Energía' },
  ];

  const legalLinks = [
    { path: '/aviso-legal', label: 'Aviso Legal' },
    { path: '/politica-privacidad', label: 'Política de Privacidad' },
    { path: '/politica-cookies', label: 'Política de Cookies' },
  ];

  const partners = [
    { name: 'Orange', logo: 'https://upload.wikimedia.org/wikipedia/commons/c/c8/Orange_logo.svg' },
    { name: 'O2', logo: '/images/logo-o2-WJ0ZyWZ8.png' },
    { name: 'Lowi', logo: '/images/lowi.png' },
    { name: 'Movistar', logo: '/images/movistar.png' },
    { name: 'Niba', logo: '/images/logo_niba_local.svg' },
    { name: 'Repsol', logo: '/images/repsol-logo-DmRPVn3o.png' },
    { name: 'Naturgy', logo: '/images/logo_naturgy_local.svg' },
    { name: 'Endesa', logo: 'https://firmar.online/wp-content/uploads/2016/07/Endesa-Logo.png' },
    { name: 'Iberdrola', logo: '/images/iberdrola-logo-BlFb9Nia.jpg' },
    { name: 'Audax', logo: '/images/audax-logo-PVxP_0SP.png' },
  ];

  const googleMapsReviewsUrl = 'https://www.google.com/maps/place/Importphones.net/@41.5538813,1.9501491,688m/data=!3m2!1e3!4b1!4m6!3m5!1s0x12a492c7fdc4b1ef:0x1f6274004c9fd9e8!8m2!3d41.5538813!4d1.952724!16s%2Fg%2F11b81rv68c?entry=ttu&g_ep=EgoyMDI2MDIxOC4wIKXMDSoASAFQAw%3D%3D';

  return (
    <footer
      ref={footerRef}
      className="footer-awwards"
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(170deg, #0a0a0a 0%, #111 40%, #2a0a0a 70%, #1a0505 100%)',
      }}
    >
      {/* Animated background canvas */}
      <canvas
        ref={noiseCanvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Red glow effects */}
      <div style={{
        position: 'absolute', top: '-20%', right: '-10%', width: '50%', height: '60%',
        background: 'radial-gradient(circle, rgba(229,57,53,0.08) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 0
      }} />
      <div style={{
        position: 'absolute', bottom: '-15%', left: '-5%', width: '40%', height: '50%',
        background: 'radial-gradient(circle, rgba(229,57,53,0.06) 0%, transparent 65%)',
        pointerEvents: 'none', zIndex: 0
      }} />

      {/* Main Footer */}
      <div className="footer-top" style={{ position: 'relative', zIndex: 1 }}>
        <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
          <div className="footer-grid">
            {/* Brand Column */}
            <div className="footer-reveal footer-brand">
              <div className="logo-container footer-logo-container">
                <img src="/images/logo_importphones.png" alt="Importphones Logo" />
              </div>
              <p className="footer-description">
                Consultoría y asesoría especializada en telecomunicaciones y energía
                para empresas y particulares. Más de 10 años de experiencia.
              </p>
              <div className="footer-contact">
                <a href="tel:+34931596464">
                  <Phone size={16} />
                  <span>Llámanos: +34 931 596 464</span>
                </a>
                <a href="https://wa.me/34611809595?text=Hola,%20quisiera%20recibir%20más%20información%20sobre%20vuestros%20servicios." target="_blank" rel="noopener noreferrer">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  <span>WhatsApp: +34 611 809 595</span>
                </a>
                <a href="mailto:info@importphones.net">
                  <Mail size={16} />
                  <span>info@importphones.net</span>
                </a>
                <span>
                  <MapPin size={16} />
                  <span>HX33+H3 Viladecavalls, España</span>
                </span>
              </div>
              <a href={googleMapsReviewsUrl} target="_blank" rel="noopener noreferrer" className="reviews-button">
                <Star size={16} fill="white" />
                <span>Ver 881 reseñas</span>
                <ExternalLink size={14} />
              </a>
            </div>

            {/* Quick Links */}
            <div className="footer-reveal">
              <h4 className="footer-title">Enlaces</h4>
              <ul className="footer-links">
                {quickLinks.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path} className="footer-link-glitch" data-text={link.label}>
                      <span>{link.label}</span>
                      <ArrowUpRight size={14} />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services + Legal */}
            <div className="footer-reveal">
              <h4 className="footer-title">Servicios</h4>
              <ul className="footer-links">
                {services.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path} className="footer-link-glitch" data-text={link.label}>
                      <span>{link.label}</span>
                      <ArrowUpRight size={14} />
                    </Link>
                  </li>
                ))}
              </ul>
              <h4 className="footer-title" style={{ marginTop: '2rem' }}>Legal</h4>
              <ul className="footer-links">
                {legalLinks.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path} className="footer-link-glitch" data-text={link.label}>
                      <span>{link.label}</span>
                      <ArrowUpRight size={14} />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Partners */}
            <div className="footer-reveal">
              <h4 className="footer-title">Partners</h4>
              <div className="footer-partners" style={{ gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.6rem' }}>
                {partners.map((partner, index) => (
                  <div key={index} className="partner-logo" title={partner.name}>
                    <img src={partner.logo} alt={partner.name} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar — single clean copyright line */}
      <div className="footer-bottom" style={{ position: 'relative', zIndex: 1, borderTop: '1px solid rgba(229,57,53,0.15)' }}>
        <div className="max-w-[1800px] mx-auto px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="footer-copyright">
            © 2026 IMPORTPHONES.NET — Todos los derechos reservados.
          </p>
          <div className="footer-social">
            <a href={googleMapsReviewsUrl} target="_blank" rel="noopener noreferrer" aria-label="Google Reviews">
              <Star size={20} />
            </a>
            <a href="https://wa.me/34611809595?text=Hola,%20quisiera%20recibir%20más%20información%20sobre%20vuestros%20servicios." target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
