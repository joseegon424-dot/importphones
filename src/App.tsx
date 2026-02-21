import { useState, useEffect, useRef } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

import Preloader from './components/Preloader';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/ScrollToTop';
import { PageTransitionOverlay, pageTransitionOut, pageTransitionIn } from './components/ui/PageTransition';
import Home from './pages/Home';
import QuienesSomos from './pages/QuienesSomos';
import Servicios from './pages/Servicios';
import ServiciosTelecom from './pages/ServiciosTelecom';
import ServiciosEnergia from './pages/ServiciosEnergia';
import Contacto from './pages/Contacto';
import AvisoLegal from './pages/AvisoLegal';
import PoliticaPrivacidad from './pages/PoliticaPrivacidad';
import TrabajaConNosotros from './pages/TrabajaConNosotros';
import WhatsAppFloating from './components/WhatsAppFloating';

import './App.css';

gsap.registerPlugin(ScrollTrigger);

// Wrapper component to handle scroll and navigation
const AppContent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);
  const location = useLocation();
  const mainRef = useRef<HTMLElement>(null);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      lenis.destroy();
    };
  }, []);

  // Page transition + scroll reset on route change
  useEffect(() => {
    const runTransition = async () => {
      await pageTransitionOut();
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { immediate: true });
      }
      ScrollTrigger.refresh();
      await pageTransitionIn();
    };
    runTransition();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  // Refresh ScrollTrigger on load
  useEffect(() => {
    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [location.pathname]);

  const handlePreloaderComplete = () => {
    setIsLoading(false);
    setTimeout(() => setIsLoaded(true), 100);
  };

  const scrollToTop = () => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Preloader */}
      {isLoading && <Preloader onComplete={handlePreloaderComplete} />}

      {/* Barba-style page transition overlay */}
      <PageTransitionOverlay />

      {/* Navigation */}
      {!isLoading && <Navbar />}

      {/* Mobile Menu */}
      {!isLoading && <MobileMenu />}

      {/* Main Content */}
      <main ref={mainRef} className="barba-container" data-barba="container" data-barba-namespace={location.pathname}>
        <Routes>
          <Route path="/" element={<Home isLoaded={isLoaded} />} />
          <Route path="/quienes-somos" element={<QuienesSomos isLoaded={isLoaded} />} />
          <Route path="/servicios" element={<Servicios isLoaded={isLoaded} />} />
          <Route path="/servicios/telecomunicaciones" element={<ServiciosTelecom isLoaded={isLoaded} />} />
          <Route path="/servicios/energia" element={<ServiciosEnergia isLoaded={isLoaded} />} />
          <Route path="/contacto" element={<Contacto isLoaded={isLoaded} />} />
          <Route path="/aviso-legal" element={<AvisoLegal />} />
          <Route path="/politica-privacidad" element={<PoliticaPrivacidad />} />
          <Route path="/trabaja-con-nosotros" element={<TrabajaConNosotros />} />
        </Routes>
      </main>

      {/* Footer */}
      {!isLoading && <Footer />}

      {/* WhatsApp Floating Button */}
      {!isLoading && <WhatsAppFloating />}

      {/* Scroll to Top Button */}
      {!isLoading && (
        <button
          className={`scroll-top-btn ${showScrollTop ? 'visible' : ''}`}
          onClick={scrollToTop}
          aria-label="Volver arriba"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 15l-6-6-6 6" />
          </svg>
        </button>
      )}
    </>
  );
};

// Mobile Menu Component
const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { path: '/', label: 'Inicio' },
    { path: '/quienes-somos', label: 'Nosotros' },
    { path: '/servicios', label: 'Servicios' },
    { path: '/contacto', label: 'Contacto' },
  ];

  return (
    <>
      <button
        className={`mobile-menu-btn ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div className={`mobile-menu ${isOpen ? 'active' : ''}`}>
        {navLinks.map((link) => (
          <a
            key={link.path}
            href={`#${link.path}`}
            className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              setIsOpen(false);
              window.location.hash = link.path;
            }}
          >
            {link.label}
          </a>
        ))}
      </div>
    </>
  );
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-black text-white overflow-x-hidden">
        <AppContent />
      </div>
    </Router>
  );
}

export default App;
