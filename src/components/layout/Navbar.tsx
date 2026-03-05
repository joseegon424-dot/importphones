import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ChevronDown, Wifi, Zap, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [currentTime, setCurrentTime] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  const navRef = useRef<HTMLElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 992);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    gsap.fromTo(navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 1.2 }
    );
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close on route change
  useEffect(() => {
    setServicesOpen(false);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.overflow = 'hidden';
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.overflow = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleServicesEnter = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setServicesOpen(true);
  };

  const handleServicesLeave = () => {
    timerRef.current = setTimeout(() => setServicesOpen(false), 200);
  };

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const closeMobile = () => setMobileMenuOpen(false);

  return (
    <nav ref={navRef} className={`nav-awwards ${isScrolled ? 'scrolled' : ''}`}>
      <Link to="/" className="nav-logo" onClick={closeMobile}>
        <div className="logo-container">
          <img src="/images/logo_importphones.png" alt="Importphones Logo" />
        </div>
      </Link>

      {/* ====== MOBILE ONLY: Hamburger Button ====== */}
      {isMobile && (
        <button
          className="mobile-hamburger-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '48px',
            height: '48px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            zIndex: 1200,
            position: 'relative',
            padding: 0,
            marginLeft: 'auto',
          }}
        >
          {mobileMenuOpen ? (
            <X size={28} color="white" strokeWidth={2} />
          ) : (
            <Menu size={28} color="white" strokeWidth={2} />
          )}
        </button>
      )}

      {/* ====== MOBILE ONLY: Fullscreen Menu ====== */}
      {isMobile && (
        <div
          className="mobile-fullscreen-menu"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100vw',
            height: '100vh',
            background: '#0a0a0a',
            zIndex: 1100,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '5rem 2rem 3rem',
            transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(-100%)',
            opacity: mobileMenuOpen ? 1 : 0,
            visibility: mobileMenuOpen ? 'visible' as const : 'hidden' as const,
            pointerEvents: mobileMenuOpen ? 'auto' as const : 'none' as const,
            transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease, visibility 0.5s',
            overflowY: 'auto',
          }}
        >
          {[
            { to: '/', label: 'Inicio' },
            { to: '/quienes-somos', label: 'Nosotros' },
            { to: '/servicios', label: 'Servicios' },
            { to: '/servicios/telecomunicaciones', label: 'Telecomunicaciones' },
            { to: '/servicios/energia', label: 'Energía' },
            { to: '/trabaja-con-nosotros', label: 'Trabaja con nosotros' },
            { to: '/contacto', label: 'Contacto' },
          ].map((item, i) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={closeMobile}
              style={{
                fontSize: item.to.includes('/servicios/') ? '1.2rem' : '1.6rem',
                fontWeight: item.to.includes('/servicios/') ? 500 : 700,
                paddingLeft: item.to.includes('/servicios/') ? '1.5rem' : '0',
                color: isActive(item.to) ? '#E53935' : 'white',
                textDecoration: 'none',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                padding: '0.75rem 0',
                width: '100%',
                textAlign: 'center',
                borderBottom: i < 6 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                transition: 'color 0.3s ease',
                display: 'block',
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}

      {/* ====== DESKTOP ONLY: Nav Links ====== */}
      {!isMobile && (
        <div className="nav-links">
          <Link to="/" className={`nav-link ${isActive('/') && location.pathname === '/' ? 'active' : ''}`}>
            Inicio
          </Link>
          <Link to="/quienes-somos" className={`nav-link ${isActive('/quienes-somos') ? 'active' : ''}`}>
            Nosotros
          </Link>

          {/* Servicios with dropdown */}
          <div
            className="nav-dropdown-wrapper"
            onMouseEnter={handleServicesEnter}
            onMouseLeave={handleServicesLeave}
          >
            <Link
              to="/servicios"
              className={`nav-link nav-link-dropdown ${isActive('/servicios') ? 'active' : ''}`}
            >
              Servicios
              <ChevronDown size={13} className={`nav-chevron ${servicesOpen ? 'open' : ''}`} />
            </Link>
            <div
              ref={dropdownRef}
              className={`nav-dropdown ${servicesOpen ? 'visible' : ''}`}
              onMouseEnter={handleServicesEnter}
              onMouseLeave={handleServicesLeave}
            >
              <Link
                to="/servicios/telecomunicaciones"
                className={`nav-dropdown-item ${isActive('/servicios/telecomunicaciones') ? 'active' : ''}`}
              >
                <Wifi size={15} />
                <span>Telecomunicaciones</span>
              </Link>
              <Link
                to="/servicios/energia"
                className={`nav-dropdown-item ${isActive('/servicios/energia') ? 'active' : ''}`}
              >
                <Zap size={15} />
                <span>Energía</span>
              </Link>
            </div>
          </div>

          <Link to="/trabaja-con-nosotros" className={`nav-link ${isActive('/trabaja-con-nosotros') ? 'active' : ''}`}>
            Trabaja con nosotros
          </Link>
          <Link to="/contacto" className={`nav-link ${isActive('/contacto') ? 'active' : ''}`}>
            Contacto
          </Link>
        </div>
      )}

      {/* ====== DESKTOP ONLY: Meta (clock + location) ====== */}
      {!isMobile && (
        <div className="nav-meta">
          <span className="nav-clock">{currentTime}</span>
          <span className="nav-location">Barcelona, ES</span>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
