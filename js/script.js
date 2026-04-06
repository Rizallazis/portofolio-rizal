/* ============================================================
   RIZAL AZIS — PERSONAL PORTFOLIO
   script.js
   ============================================================ */

'use strict';

/* ── Utility ─────────────────────────────────────────────── */
const qs  = (sel, ctx = document) => ctx.querySelector(sel);
const qsa = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

/* ════════════════════════════════════════════════════════════
   CUSTOM CURSOR
════════════════════════════════════════════════════════════ */
(function initCursor() {
  const dot  = qs('#cursorDot');
  const ring = qs('#cursorRing');
  if (!dot || !ring) return;

  let mx = -100, my = -100;
  let rx = -100, ry = -100;
  let raf;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
  });

  function animateRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    raf = requestAnimationFrame(animateRing);
  }
  animateRing();

  // Hover effect on interactive elements
  const hoverEls = 'a, button, .portfolio-item, .cert-card, .contact-card, .skill-tag, .filter-btn, .exp-standalone, .exp-group, .ocert-img-card, .ig-post, .ig-nav-btn, .ig-action-btn';
  document.addEventListener('mouseover', e => {
    if (e.target.closest(hoverEls)) ring.classList.add('hovering');
  });
  document.addEventListener('mouseout', e => {
    if (e.target.closest(hoverEls)) ring.classList.remove('hovering');
  });

  document.addEventListener('mouseleave', () => {
    dot.style.opacity  = '0';
    ring.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    dot.style.opacity  = '1';
    ring.style.opacity = '1';
  });
})();

/* ════════════════════════════════════════════════════════════
   NAVBAR — sticky + active link
════════════════════════════════════════════════════════════ */
(function initNavbar() {
  const nav       = qs('#navbar');
  const hamburger = qs('#hamburger');
  const navLinks  = qs('#navLinks');
  const links     = qsa('#navLinks a');

  // Scroll: add glass background
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 30);
  }, { passive: true });

  // Hamburger toggle (mobile)
  hamburger.addEventListener('click', () => {
    const open = !navLinks.classList.contains('open');
    navLinks.classList.toggle('open', open);
    hamburger.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', open);
  });

  // Close mobile menu on link click
  links.forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  // Active link on scroll
  const sections = qsa('section[id]');
  const navObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(a => a.classList.remove('active'));
        const active = links.find(a => a.getAttribute('href') === '#' + entry.target.id);
        if (active) active.classList.add('active');
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => navObserver.observe(s));
})();

/* ════════════════════════════════════════════════════════════
   HERO TYPED TEXT ANIMATION
════════════════════════════════════════════════════════════ */
(function initTyped() {
  const el     = qs('#heroTyped');
  if (!el) return;

  const phrases = [
    'Digital Content',
    'Media Enthusiast',
    'Creative Designer',
    'Event Documenter',
    'Psychology Student',
  ];

  let phraseIdx = 0;
  let charIdx   = 0;
  let deleting  = false;
  let paused    = false;

  function tick() {
    const phrase = phrases[phraseIdx];

    if (!deleting) {
      el.textContent = phrase.slice(0, ++charIdx);
      if (charIdx === phrase.length) {
        paused = true;
        setTimeout(() => { paused = false; deleting = true; }, 2000);
      }
    } else {
      el.textContent = phrase.slice(0, --charIdx);
      if (charIdx === 0) {
        deleting  = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
      }
    }

    if (!paused) setTimeout(tick, deleting ? 50 : 90);
  }
  setTimeout(tick, 700);
})();

/* ════════════════════════════════════════════════════════════
   SCROLL REVEAL (Intersection Observer)
════════════════════════════════════════════════════════════ */
(function initReveal() {
  const els = qsa('.reveal, .reveal-left, .reveal-right');

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  els.forEach(el => obs.observe(el));
})();

/* ════════════════════════════════════════════════════════════
   SKILL BARS ANIMATION
════════════════════════════════════════════════════════════ */
(function initSkillBars() {
  const fills = qsa('.skill-fill');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const w = e.target.dataset.width;
        e.target.style.width = w + '%';
        e.target.classList.add('animated');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });

  fills.forEach(f => obs.observe(f));
})();

/* ════════════════════════════════════════════════════════════
   PORTFOLIO FILTER
════════════════════════════════════════════════════════════ */
(function initPortfolioFilter() {
  const btns  = qsa('.filter-btn');
  const items = qsa('.portfolio-item');

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      items.forEach(item => {
        const match = filter === 'all' || item.dataset.cat === filter;
        item.style.transition = 'opacity .3s, transform .3s';
        if (match) {
          item.classList.remove('hidden');
          item.style.opacity   = '1';
          item.style.transform = 'scale(1)';
        } else {
          item.style.opacity   = '0';
          item.style.transform = 'scale(.9)';
          setTimeout(() => item.classList.add('hidden'), 300);
        }
      });
    });
  });
})();

/* ════════════════════════════════════════════════════════════
   LIGHTBOX — Portfolio & Sertifikat (+ Multi-Cert)
════════════════════════════════════════════════════════════ */
(function initLightbox() {
  const lb        = qs('#lightbox');
  const lbImg     = qs('#lightboxImg');
  const lbTitle   = qs('#lightboxTitle');
  const lbDesc    = qs('#lightboxDesc');
  const lbClose   = qs('#lightboxClose');
  const lbPrev    = qs('#lightboxPrev');
  const lbNext    = qs('#lightboxNext');
  const lbCounter = qs('#lbCounter');

  // pool: array of plain objects { src, title, desc }
  let pool    = [];
  let current = 0;

  /* ── Build item from DOM element ──────────────────────── */
  function elToItem(el) {
    const imgEl = el.querySelector('img.portfolio-img')
                || el.querySelector('.cert-img-wrap img')
                || el.querySelector('.ig-slide') // for Instagram post (first image)
                || el.querySelector('img'); // for ocert-img-card
    return {
      src:   imgEl ? (imgEl.src || imgEl.currentSrc) : '',
      title: el.dataset.title || '',
      desc:  el.dataset.desc  || '',
    };
  }

  /* ── Open lightbox ────────────────────────────────────── */
  function openLightbox(idx, itemPool) {
    pool    = itemPool;
    current = Math.max(0, Math.min(idx, pool.length - 1));
    renderSlide(current);
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  /* ── Render slide ─────────────────────────────────────── */
  function renderSlide(idx) {
    const item = pool[idx];

    if (item.src) {
      lbImg.src           = item.src;
      lbImg.alt           = item.title || '';
      lbImg.style.display = 'block';
    } else {
      lbImg.src           = '';
      lbImg.style.display = 'none';
    }

    lbTitle.textContent = item.title || '';
    lbDesc.textContent  = item.desc  || '';

    // Counter: hide when only 1 item
    if (pool.length > 1) {
      lbCounter.textContent = `${idx + 1} / ${pool.length}`;
      lbCounter.style.display = 'block';
      lbPrev.style.display = 'flex';
      lbNext.style.display = 'flex';
    } else {
      lbCounter.style.display = 'none';
      lbPrev.style.display = 'none';
      lbNext.style.display = 'none';
    }
  }

  /* ── Close ────────────────────────────────────────────── */
  function closeLightbox() {
    lb.classList.remove('open');
    document.body.style.overflow = '';
  }

  /* ── Navigate ─────────────────────────────────────────── */
  function navigate(dir) {
    current = (current + dir + pool.length) % pool.length;
    renderSlide(current);
  }

  /* ── Bind: Portfolio ──────────────────────────────────── */
  function bindPortfolio() {
    const els = qsa('.portfolio-item');
    const itemPool = els.map(elToItem);
    els.forEach((el, idx) => {
      el.addEventListener('click', () => openLightbox(idx, itemPool));
    });
  }

  /* ── Bind: Certificate (single + multi) ──────────────── */
  function bindCerts() {
    let dragStartX = 0;

    // Single cert cards (non-multi)
    const singles = qsa('.cert-card:not(.cert-card-multi)');
    const singlePool = singles.map(elToItem);
    singles.forEach((card, idx) => {
      card.addEventListener('mousedown', e => { dragStartX = e.clientX; });
      card.addEventListener('click', e => {
        if (Math.abs(e.clientX - dragStartX) > 5) return;
        openLightbox(idx, singlePool);
      });
    });

    // Multi-cert cards
    qsa('.cert-card-multi').forEach(card => {
      card.addEventListener('mousedown', e => { dragStartX = e.clientX; });
      card.addEventListener('click', e => {
        if (Math.abs(e.clientX - dragStartX) > 5) return;
        try {
          const srcs   = JSON.parse(card.dataset.images);
          const titles = JSON.parse(card.dataset.titles);
          const descs  = JSON.parse(card.dataset.descs);
          const multiPool = srcs.map((src, i) => ({
            src,
            title: titles[i] || '',
            desc:  descs[i]  || '',
          }));
          openLightbox(0, multiPool);
        } catch (err) {
          console.warn('cert-card-multi: invalid JSON data', err);
        }
      });
    });
  }

  /* ── Bind: Instagram Posts ────────────────────────────── */
  function bindIgPosts() {
    qsa('.ig-post').forEach(post => {
      post.addEventListener('click', e => {
        // Don't open lightbox if clicking navigation arrows or action buttons
        if (e.target.closest('.ig-nav-btn') || e.target.closest('.ig-action-btn')) return;

        const slides = qsa('.ig-slide', post);
        const multiPool = slides.map(img => ({
          src:   img.src || img.currentSrc,
          title: post.dataset.title || '',
          desc:  post.dataset.desc  || '',
        }));
        
        // Find current slide index for initial lightbox view if possible
        const wrapper = qs('.ig-media-wrapper', post);
        const idx = Math.round(wrapper.scrollLeft / wrapper.offsetWidth);
        
        openLightbox(idx, multiPool);
      });
    });
  }

  function bindOtherCerts() {
    const els = qsa('.ocert-img-card');
    const itemPool = els.map(elToItem);
    els.forEach((el, idx) => {
      el.addEventListener('click', () => openLightbox(idx, itemPool));
    });
  }

  bindPortfolio();
  bindCerts();
  bindOtherCerts();
  bindIgPosts();

  /* ── Controls ─────────────────────────────────────────── */
  lbClose.addEventListener('click', closeLightbox);
  lbPrev.addEventListener('click',  () => navigate(-1));
  lbNext.addEventListener('click',  () => navigate(1));
  lb.addEventListener('click', e => { if (e.target === lb) closeLightbox(); });
  document.addEventListener('keydown', e => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape')     closeLightbox();
    if (e.key === 'ArrowLeft')  navigate(-1);
    if (e.key === 'ArrowRight') navigate(1);
  });
})();


/* ════════════════════════════════════════════════════════════
   CERTIFICATE SLIDER (drag/swipe)
════════════════════════════════════════════════════════════ */
(function initCertSlider() {
  const track = qs('#certTrack');
  const prev  = qs('#certPrev');
  const next  = qs('#certNext');
  if (!track) return;

  let isDown = false;
  let startX, scrollLeft;

  // Prevent image dragging interference
  track.querySelectorAll('img').forEach(img => {
    img.addEventListener('dragstart', (e) => e.preventDefault());
  });

  track.addEventListener('mousedown', e => {
    isDown = true;
    track.classList.add('dragging');
    // Disable snap and smooth scroll during drag
    track.style.scrollSnapType = 'none';
    track.style.scrollBehavior = 'auto';
    
    startX     = e.pageX - track.offsetLeft;
    scrollLeft = track.scrollLeft;
  });

  const endDrag = () => {
    if (!isDown) return;
    isDown = false;
    track.classList.remove('dragging');
    // Restore snap and smooth scroll
    track.style.scrollSnapType = 'x mandatory';
    track.style.scrollBehavior = 'smooth';
  };

  track.addEventListener('mouseleave', endDrag);
  track.addEventListener('mouseup',    endDrag);

  track.addEventListener('mousemove', e => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - track.offsetLeft;
    const walk = (x - startX) * 1.5; // multiplier for speed
    track.scrollLeft = scrollLeft - walk;
  });

  // Buttons
  const STEP = 320;
  if (prev) prev.addEventListener('click', () => {
    track.style.scrollBehavior = 'smooth';
    track.scrollBy({ left: -STEP });
  });
  if (next) next.addEventListener('click', () => {
    track.style.scrollBehavior = 'smooth';
    track.scrollBy({ left:  STEP });
  });
})();

/* ════════════════════════════════════════════════════════════
   INSTAGRAM CAROUSEL LOGIC
   ============================================================ */
(function initInstagramCarousel() {
  qsa('.ig-post').forEach(post => {
    const wrapper = qs('.ig-media-wrapper', post);
    const prevBtn = qs('.ig-nav-prev', post);
    const nextBtn = qs('.ig-nav-next', post);
    if (!wrapper) return;

    const slides = qsa('.ig-slide', post);
    const dots   = qsa('.ig-dot', post);

    const updateUI = () => {
      const idx = Math.round(wrapper.scrollLeft / wrapper.offsetWidth);
      dots.forEach((dot, i) => dot.classList.toggle('active', i === idx));
      if (prevBtn) prevBtn.style.opacity = idx === 0 ? '0' : '1';
      if (nextBtn) nextBtn.style.opacity = idx === slides.length - 1 ? '0' : '1';
    };

    if (prevBtn) prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      wrapper.scrollBy({ left: -wrapper.offsetWidth, behavior: 'smooth' });
    });

    if (nextBtn) nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      wrapper.scrollBy({ left: wrapper.offsetWidth, behavior: 'smooth' });
    });

    wrapper.addEventListener('scroll', updateUI);
    // Initial call
    updateUI();
  });
})();

/* ════════════════════════════════════════════════════════════
   CONTACT FORM → WhatsApp
════════════════════════════════════════════════════════════ */
(function initContactForm() {
  const btn = qs('#sendMsgBtn');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const name = qs('#formName')?.value.trim()  || '';
    const email= qs('#formEmail')?.value.trim() || '';
    const msg  = qs('#formMsg')?.value.trim()   || '';

    if (!name || !msg) {
      alert('Silakan isi nama dan pesan terlebih dahulu.');
      return;
    }

    // TODO: ganti nomor WA
    const phone = '62xxxxxxxxxx';
    const text  = encodeURIComponent(
      `Halo Rizal! 👋\n\nNama: ${name}\nEmail: ${email}\n\nPesan:\n${msg}`
    );
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
  });
})();

/* ════════════════════════════════════════════════════════════
   FOOTER YEAR
════════════════════════════════════════════════════════════ */
(function setYear() {
  const el = qs('#footerYear');
  if (el) el.textContent = new Date().getFullYear();
})();

/* ════════════════════════════════════════════════════════════
   SMOOTH SCROLL POLISH (for buttons/links)
════════════════════════════════════════════════════════════ */
(function initSmoothScroll() {
  qsa('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.pageYOffset - 70;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();

/* ════════════════════════════════════════════════════════════
   HERO PROFILE PHOTO — auto-load if file exists
════════════════════════════════════════════════════════════ */
(function initHeroPhoto() {
  const wrap = qs('#heroPhoto');
  if (!wrap) return;

  const img = new Image();
  img.src = 'assets/images/profile.jpg';
  img.onload = () => {
    wrap.innerHTML = '';
    img.className  = 'w-full h-full object-cover';
    img.alt        = 'Rizal Azis';
    img.style.cssText = 'width:100%;height:100%;object-fit:cover;border-radius:50%;';
    wrap.appendChild(img);
  };
  // If no image found, placeholder emoji stays.
})();

/* ════════════════════════════════════════════════════════════
   PARTICLE SPARKS on click
════════════════════════════════════════════════════════════ */
(function initSparks() {
  document.addEventListener('click', e => {
    const colors = ['#7c3aed','#3b82f6','#9d5cf7','#60a5fa','#fff'];
    for (let i = 0; i < 8; i++) {
      const spark = document.createElement('div');
      Object.assign(spark.style, {
        position:      'fixed',
        left:          e.clientX + 'px',
        top:           e.clientY + 'px',
        width:         '6px',
        height:        '6px',
        borderRadius:  '50%',
        background:    colors[Math.floor(Math.random() * colors.length)],
        pointerEvents: 'none',
        zIndex:        '9997',
        transform:     'translate(-50%,-50%)',
        transition:    'none',
      });
      document.body.appendChild(spark);

      const angle   = Math.random() * 2 * Math.PI;
      const distance= 40 + Math.random() * 60;
      const tx      = Math.cos(angle) * distance;
      const ty      = Math.sin(angle) * distance;

      requestAnimationFrame(() => {
        Object.assign(spark.style, {
          transition: 'transform .6s ease-out, opacity .6s ease-out',
          transform:  `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px))`,
          opacity:    '0',
        });
      });
      setTimeout(() => spark.remove(), 700);
    }
  });
})();
