import React, { useEffect, useState } from 'react';

export default function Hero() {
  const [typedText, setTypedText] = useState('Psychology Graduate');

  useEffect(() => {
    // Dynamic greeting based on time
    const h = new Date().getHours();
    let greeting = '';
    if (h >= 5 && h < 12)       greeting = 'Selamat Pagi!';
    else if (h >= 12 && h < 15) greeting = 'Selamat Siang!';
    else if (h >= 15 && h < 19) greeting = 'Selamat Sore!';
    else                         greeting = 'Selamat Malam!';

    const phrases = [
      greeting,
      'HR Practitioner',
      'People & Culture',
      'Inclusivity Advocate',
      'Creative Designer',
      'Psychology Graduate',
    ];

    let phraseIdx = 0;
    let charIdx   = 0;
    let deleting  = false;
    let paused    = false;
    let timeoutId;

    function tick() {
      const phrase = phrases[phraseIdx];

      if (!deleting) {
        setTypedText(phrase.slice(0, charIdx + 1));
        charIdx++;
        if (charIdx === phrase.length) {
          paused = true;
          timeoutId = setTimeout(() => { 
            paused = false; 
            deleting = true; 
            tick();
          }, 2000);
          return;
        }
      } else {
        setTypedText(phrase.slice(0, charIdx - 1));
        charIdx--;
        if (charIdx === 0) {
          deleting  = false;
          phraseIdx = (phraseIdx + 1) % phrases.length;
        }
      }

      const delay = deleting ? 50 : 90;
      timeoutId = setTimeout(tick, delay);
    }

    timeoutId = setTimeout(tick, 700);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <section className="hero" id="home">
      <div className="hero-bg">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>
      <div className="hero-grid"></div>

      <div className="container hero-inner">
        {/* Content */}
        <div className="hero-content">
          <div className="hero-badge">
            <span>●</span> Open for Collaboration &amp; Opportunities
          </div>

          <h1 className="hero-title">
            <span className="typed-text gradient-text" id="heroTyped">{typedText}</span>
            <span className="cursor-blink"></span>
          </h1>

          <p className="hero-sub">
            Lulusan S1 Psikologi Universitas Brawijaya dengan fokus pada{' '}
            <strong>inklusivitas, komunikasi digital, dan pengembangan SDM</strong>.
            Berorientasi pada pengembangan diri dan kontribusi dalam menciptakan lingkungan kerja yang inklusif serta{' '}
            kolaboratif.
          </p>

          <div className="hero-tags">
            <span className="hero-tag"><i className='bx bx-brain'></i> Psikologi HR</span>
            <span className="hero-tag"><i className='bx bx-group'></i> People &amp; Culture</span>
            <span className="hero-tag"><i className='bx bx-globe'></i> Inklusivitas</span>
            <span className="hero-tag"><i className='bx bx-target-lock'></i> Kepemimpinan</span>
            <span className="hero-tag"><i className='bx bx-broadcast'></i> Komunikasi</span>
          </div>

          <div className="hero-btns">
            <a href="/assets/cv/Portofolio_Kreatif.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-primary magnetic-btn" id="btnLihatKarya">
              <i className='bx bx-palette'></i> Portofolio Kreatif
            </a>
            <a href="/assets/cv/Rizal_CV.pdf" className="btn btn-outline magnetic-btn" download id="btnDownloadCV">
              <i className='bx bx-file'></i> Download CV
            </a>
          </div>

          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-number">4+</div>
              <div className="stat-label">Organisasi &amp; Komunitas</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">15+</div>
              <div className="stat-label">Event &amp; Proyek</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">7+</div>
              <div className="stat-label">Pelatihan &amp; Sertifikasi</div>
            </div>
          </div>
        </div>

        {/* Visual */}
        <div className="hero-visual">
          <div className="hero-photo-wrap">
            <div className="hero-photo-ring"></div>
            <div className="hero-photo" id="heroPhoto">
              <img src="/assets/images/profile.jpg" alt="Foto Profil" className="hero-img" />
            </div>

            <div className="hero-float-badge hfb-1">
              <i className='bx bx-brain icon'></i> Psikologi UB
            </div>
            <div className="hero-float-badge hfb-2">
              <i className='bx bx-mobile-alt icon'></i> Digital Media
            </div>
            <div className="hero-float-badge hfb-3">
              <i className='bx bx-donate-blood icon'></i> Human Resources
            </div>
          </div>
        </div>

        <div className="hero-scroll">
          <span>Scroll</span>
          <div className="scroll-line"></div>
        </div>
      </div>
    </section>
  );
}
