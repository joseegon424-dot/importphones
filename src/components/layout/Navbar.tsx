import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ChevronDown, Wifi, Zap } from 'lucide-react';

const Navbar = () => {
  const [currentTime, setCurrentTime] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const location = useLocation();
  const navRef = useRef<HTMLElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 3.5 }
    );
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on route change
  useEffect(() => { setServicesOpen(false); }, [location.pathname]);

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

  return (
    <nav ref={navRef} className={`nav-awwards ${isScrolled ? 'scrolled' : ''}`}>
      <Link to="/" className="nav-logo">
        <div className="logo-container">
          <img src="/images/logo_importphones.png" alt="Importphones Logo" />
        </div>
      </Link>

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

      <div className="nav-meta">
        <span className="nav-clock">{currentTime}</span>
        <span className="nav-location">Barcelona, ES</span>
      </div>
    </nav>
  );
};

export default Navbar;
