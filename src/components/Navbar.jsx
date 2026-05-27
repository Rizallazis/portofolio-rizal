import React, { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState('light');
  const [activeSection, setActiveSection] = useState('home');

  // Handle Scroll (Glassmorphism bg)
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle Theme
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    if (savedTheme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
    if (nextTheme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  };

  // Handle Intersection Observer for Active Links
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { threshold: 0.4 });

    sections.forEach((s) => observer.observe(s));
    return () => {
      sections.forEach((s) => observer.unobserve(s));
    };
  }, []);

  const handleLinkClick = (e, id) => {
    e.preventDefault();
    setMenuOpen(false);
    
    const target = document.getElementById(id);
    if (target) {
      if (window.lenis) {
        window.lenis.scrollTo(target);
      } else {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} id="navbar">
      <div className="container nav-inner">
        <a href="#home" className="nav-logo" onClick={(e) => handleLinkClick(e, 'home')}>
          rizalazis.xyz
        </a>
        <ul className={`nav-links ${menuOpen ? 'open' : ''}`} id="navLinks">
          <li>
            <a href="#home" className={activeSection === 'home' ? 'active' : ''} onClick={(e) => handleLinkClick(e, 'home')}>
              Beranda
            </a>
          </li>
          <li>
            <a href="#about" className={activeSection === 'about' ? 'active' : ''} onClick={(e) => handleLinkClick(e, 'about')}>
              Tentang
            </a>
          </li>
          <li style={{ display: 'none' }}>
            <a href="#portfolio" className={activeSection === 'portfolio' ? 'active' : ''} onClick={(e) => handleLinkClick(e, 'portfolio')}>
              Portokreatif
            </a>
          </li>
          <li>
            <a href="#certificates" className={activeSection === 'certificates' ? 'active' : ''} onClick={(e) => handleLinkClick(e, 'certificates')}>
              Pelatihan
            </a>
          </li>
          <li>
            <a href="#experience" className={activeSection === 'experience' ? 'active' : ''} onClick={(e) => handleLinkClick(e, 'experience')}>
              Organisasi
            </a>
          </li>
          <li>
            <a href="#volunteer" className={activeSection === 'volunteer' ? 'active' : ''} onClick={(e) => handleLinkClick(e, 'volunteer')}>
              Kepanitiaan
            </a>
          </li>
          <li>
            <a href="#internship" className={activeSection === 'internship' ? 'active' : ''} onClick={(e) => handleLinkClick(e, 'internship')}>
              Magang
            </a>
          </li>
          <li>
            <a href="#projects" className={activeSection === 'projects' ? 'active' : ''} onClick={(e) => handleLinkClick(e, 'projects')}>
              Projek
            </a>
          </li>
          <li>
            <a href="#other-certs" className={activeSection === 'other-certs' ? 'active' : ''} onClick={(e) => handleLinkClick(e, 'other-certs')}>
              Other
            </a>
          </li>
          <li>
            <a href="#contact" className={`nav-cta magnetic-btn ${activeSection === 'contact' ? 'active' : ''}`} onClick={(e) => handleLinkClick(e, 'contact')}>
              Kontak
            </a>
          </li>
        </ul>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button className="theme-toggle" id="themeToggle" onClick={toggleTheme} aria-label="Toggle Theme">
            <i 
              className='bx bx-sun icon-sun' 
              id="iconSun" 
              style={{ display: theme === 'dark' ? 'inline' : 'none' }}
            ></i>
            <i 
              className='bx bx-moon icon-moon' 
              id="iconMoon" 
              style={{ display: theme === 'light' ? 'inline' : 'none' }}
            ></i>
          </button>
          <button 
            className={`hamburger ${menuOpen ? 'open' : ''}`} 
            id="hamburger" 
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu" 
            aria-expanded={menuOpen}
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </nav>
  );
}
