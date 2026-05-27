import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';

// Components
import CustomCursor from './components/CustomCursor';
import ScrollProgressBar from './components/ScrollProgressBar';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Portfolio from './components/Portfolio';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';

// Modals
import Lightbox from './components/Lightbox';
import LinkedInModal from './components/LinkedInModal';
import SocmedModal from './components/SocmedModal';

export default function App() {
  // Modal States
  const [lightbox, setLightbox] = useState({ isOpen: false, initialIdx: 0, itemPool: [] });
  const [liModal, setLiModal] = useState({ isOpen: false, project: null });
  const [socmedModal, setSocmedModal] = useState({ isOpen: false, project: null });

  // 1. Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true
    });
    window.lenis = lenis;

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      window.lenis = null;
    };
  }, []);

  // 2. Scroll Reveal Observer
  useEffect(() => {
    const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    els.forEach((el) => obs.observe(el));
    return () => {
      els.forEach((el) => obs.unobserve(el));
    };
  }, []);

  // 3. Magnetic Buttons Effect
  useEffect(() => {
    const btns = document.querySelectorAll('.magnetic-btn');
    const strength = 0.35;

    const handleMouseMove = (e, btn) => {
      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      btn.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
    };

    const handleMouseLeave = (btn) => {
      btn.style.transform = '';
      btn.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
    };

    const handleMouseEnter = (btn) => {
      btn.style.transition = 'transform 0.1s linear';
    };

    const listeners = [];

    btns.forEach((btn) => {
      const moveHandler = (e) => handleMouseMove(e, btn);
      const leaveHandler = () => handleMouseLeave(btn);
      const enterHandler = () => handleMouseEnter(btn);

      btn.addEventListener('mousemove', moveHandler);
      btn.addEventListener('mouseleave', leaveHandler);
      btn.addEventListener('mouseenter', enterHandler);

      listeners.push({ btn, moveHandler, leaveHandler, enterHandler });
    });

    return () => {
      listeners.forEach(({ btn, moveHandler, leaveHandler, enterHandler }) => {
        btn.removeEventListener('mousemove', moveHandler);
        btn.removeEventListener('mouseleave', leaveHandler);
        btn.removeEventListener('mouseenter', enterHandler);
      });
    };
  }, []);

  // 4. Click Sparks Particles
  useEffect(() => {
    const colors = ['#7c3aed', '#3b82f6', '#9d5cf7', '#60a5fa', '#fff'];
    const handleClick = (e) => {
      // Don't fire sparks if clicking inside modals or active elements sometimes,
      // but let's keep it universal as the original script.
      for (let i = 0; i < 8; i++) {
        const spark = document.createElement('div');
        Object.assign(spark.style, {
          position: 'fixed',
          left: e.clientX + 'px',
          top: e.clientY + 'px',
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          background: colors[Math.floor(Math.random() * colors.length)],
          pointerEvents: 'none',
          zIndex: '9997',
          transform: 'translate(-50%,-50%)',
          transition: 'none',
        });
        document.body.appendChild(spark);

        const angle = Math.random() * 2 * Math.PI;
        const distance = 40 + Math.random() * 60;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;

        requestAnimationFrame(() => {
          Object.assign(spark.style, {
            transition: 'transform .6s ease-out, opacity .6s ease-out',
            transform: `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px))`,
            opacity: '0',
          });
        });
        setTimeout(() => spark.remove(), 700);
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  // 5. Source Code View Prevention (anti-Ctrl+U, anti-klik kanan, F12 dll.)
  useEffect(() => {
    const preventDefault = (e) => e.preventDefault();

    const handleKeyDown = (e) => {
      // 1. Prevent F12 (Developer Tools)
      if (e.key === 'F12') {
        e.preventDefault();
        return false;
      }
      
      // 2. Prevent Ctrl+U or Cmd+U (View Source)
      if ((e.ctrlKey || e.metaKey) && (e.key === 'u' || e.key === 'U' || e.keyCode === 85)) {
        e.preventDefault();
        return false;
      }
      
      // 3. Prevent Ctrl+Shift+I or Cmd+Opt+I (Developer Tools)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'i' || e.key === 'I' || e.keyCode === 73)) {
        e.preventDefault();
        return false;
      }
      
      // 4. Prevent Ctrl+Shift+C or Cmd+Opt+C (Inspect Element)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'c' || e.key === 'C' || e.keyCode === 67)) {
        e.preventDefault();
        return false;
      }
      
      // 5. Prevent Ctrl+Shift+J or Cmd+Opt+J (Console)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'j' || e.key === 'J' || e.keyCode === 74)) {
        e.preventDefault();
        return false;
      }
      
      // 6. Prevent Ctrl+S or Cmd+S (Save Page)
      if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'S' || e.keyCode === 83)) {
        e.preventDefault();
        return false;
      }
    };

    // Block right-click context menu
    document.addEventListener('contextmenu', preventDefault);
    // Block hotkeys
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('contextmenu', preventDefault);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Modal Open Handlers
  const handleOpenLightbox = (index, pool) => {
    setLightbox({ isOpen: true, initialIdx: index, itemPool: pool });
  };

  const handleCloseLightbox = () => {
    setLightbox({ isOpen: false, initialIdx: 0, itemPool: [] });
  };

  const handleOpenLiModal = (project) => {
    setLiModal({ isOpen: true, project });
  };

  const handleCloseLiModal = () => {
    setLiModal({ isOpen: false, project: null });
  };

  const handleOpenSocmedModal = (project) => {
    setSocmedModal({ isOpen: true, project });
  };

  const handleCloseSocmedModal = () => {
    setSocmedModal({ isOpen: false, project: null });
  };

  return (
    <>
      {/* Scroll Progress Indicator */}
      <ScrollProgressBar />

      {/* Interactive Custom Cursor */}
      <CustomCursor />

      {/* Navigation Menu */}
      <Navbar />

      {/* Main Pages */}
      <Hero />
      <About />
      <Portfolio 
        onOpenLightbox={handleOpenLightbox} 
        onOpenSocmed={handleOpenSocmedModal} 
      />
      <Experience 
        onOpenLightbox={handleOpenLightbox} 
        onOpenLinkedIn={handleOpenLiModal} 
      />
      <Contact />
      <Footer />

      {/* Floating Utilities */}
      <BackToTop />

      {/* Dynamic Popups */}
      <Lightbox 
        isOpen={lightbox.isOpen} 
        initialIdx={lightbox.initialIdx} 
        itemPool={lightbox.itemPool} 
        onClose={handleCloseLightbox} 
      />
      <LinkedInModal 
        isOpen={liModal.isOpen} 
        project={liModal.project} 
        onClose={handleCloseLiModal} 
      />
      <SocmedModal 
        isOpen={socmedModal.isOpen} 
        project={socmedModal.project} 
        onClose={handleCloseSocmedModal} 
      />
    </>
  );
}
