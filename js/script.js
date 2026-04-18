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
  const hoverEls = 'a, button, .portfolio-item, .cert-card, .contact-card, .skill-tag, .filter-btn, .exp-standalone, .exp-group, .ocert-img-card, .ig-post, .ig-nav-btn, .ig-action-btn, .socmed-project-card, .project-news-link, .smp-thumb-item, .smp-modal-close, .btn-li-modal';
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
  const btns         = qsa('.filter-btn');
  const items        = qsa('.portfolio-item');
  const portfolioGrid = qs('#portfolioGrid');
  const socmedSection = qs('#socmedSection');

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      // Toggle between standard grid and socmed section
      if (filter === 'socmed') {
        if (portfolioGrid) portfolioGrid.style.display = 'none';
        if (socmedSection) {
          socmedSection.style.display = 'block';
          // Re-trigger reveal animations for socmed cards & intro
          qsa('.socmed-project-card, .socmed-intro', socmedSection).forEach(el => {
            if (!el.classList.contains('visible')) {
              el.classList.add('visible');
            }
          });
        }
      } else {
        if (socmedSection) socmedSection.style.display = 'none';
        if (portfolioGrid) portfolioGrid.style.display = 'grid';

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
      }
    });
  });
})();

/* ════════════════════════════════════════════════════════════
   SOCIAL MEDIA CONTENT — PROJECT MODAL
════════════════════════════════════════════════════════════ */
(function initSocmedModal() {
  const modal       = qs('#smpModal');
  const backdrop    = qs('#smpModalBackdrop');
  const closeBtn    = qs('#smpModalClose');
  const mainImg     = qs('#smpGalleryMain');
  const emptyState  = qs('#smpGalleryEmpty');
  const prevBtn     = qs('#smpGalleryPrev');
  const nextBtn     = qs('#smpGalleryNext');
  const counter     = qs('#smpGalleryCounter');
  const thumbsWrap  = qs('#smpGalleryThumbs');
  const titleEl     = qs('#smpModalTitle');
  const descEl      = qs('#smpModalDesc');
  const yearEl      = qs('#smpModalYear');
  const tagsEl      = qs('#smpModalTags');
  const imgDescWrap = qs('#smpModalImgDescWrap');
  const imgDescEl   = qs('#smpModalImgDesc');

  if (!modal) return;

  let images      = [];   // array of src strings
  let imageDescs  = [];   // array of per-image descriptions
  let currentIdx  = 0;

  /* ── Open modal ──────────────────────────────────────── */
  function openModal(card) {
    // Parse data
    try { images = JSON.parse(card.dataset.images || '[]'); } catch(e) { images = []; }
    try { imageDescs = JSON.parse(card.dataset.imageDescs || '[]'); } catch(e) { imageDescs = []; }

    // Fill info
    titleEl.textContent = card.dataset.projectTitle || '';
    descEl.textContent  = card.dataset.projectDesc  || '';
    yearEl.textContent  = card.dataset.projectYear  || '';

    // Tags
    const tags = (card.dataset.projectTags || '').split('·').map(t => t.trim()).filter(Boolean);
    tagsEl.innerHTML = tags.map(t => `<span>${t}</span>`).join('');

    // Gallery
    buildThumbs();
    showSlide(0);

    // Show modal
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  /* ── Build thumbnail strip ───────────────────────────── */
  function buildThumbs() {
    thumbsWrap.innerHTML = '';
    if (!images.length) return;
    images.forEach((src, i) => {
      const item = document.createElement('div');
      item.className = 'smp-thumb-item' + (i === 0 ? ' active' : '');
      const img = document.createElement('img');
      img.src = src;
      img.alt = `Gambar ${i + 1}`;
      item.appendChild(img);
      item.addEventListener('click', () => showSlide(i));
      thumbsWrap.appendChild(item);
    });
  }

  /* ── Show a specific slide ───────────────────────────── */
  function showSlide(idx) {
    if (!images.length) {
      mainImg.style.display    = 'none';
      emptyState.style.display = 'flex';
      prevBtn.style.display    = 'none';
      nextBtn.style.display    = 'none';
      counter.style.display    = 'none';
      imgDescWrap.style.display = 'none';
      return;
    }

    currentIdx = (idx + images.length) % images.length;

    emptyState.style.display = 'none';
    mainImg.style.display    = 'block';
    mainImg.src = images[currentIdx];
    mainImg.alt = `Gambar ${currentIdx + 1}`;

    // Fade effect
    mainImg.style.opacity = '0';
    setTimeout(() => { mainImg.style.opacity = '1'; }, 50);

    // Counter
    counter.textContent  = `${currentIdx + 1} / ${images.length}`;
    counter.style.display = images.length > 1 ? 'block' : 'none';

    // Nav
    prevBtn.style.display = images.length > 1 ? 'flex' : 'none';
    nextBtn.style.display = images.length > 1 ? 'flex' : 'none';

    // Active thumb
    qsa('.smp-thumb-item', thumbsWrap).forEach((t, i) => {
      t.classList.toggle('active', i === currentIdx);
    });

    // Per-image description
    const imgDesc = imageDescs[currentIdx] || '';
    if (imgDesc) {
      imgDescEl.textContent      = imgDesc;
      imgDescWrap.style.display  = 'block';
    } else {
      imgDescWrap.style.display  = 'none';
    }
  }

  /* ── Close modal ─────────────────────────────────────── */
  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(() => {
      images     = [];
      imageDescs = [];
      thumbsWrap.innerHTML = '';
      mainImg.src          = '';
    }, 350);
  }

  /* ── Bind project card clicks ────────────────────────── */
  qsa('.socmed-project-card').forEach(card => {
    card.addEventListener('click', () => openModal(card));
  });

  /* ── Controls ────────────────────────────────────────── */
  closeBtn.addEventListener('click', closeModal);
  if (backdrop) backdrop.addEventListener('click', closeModal);

  prevBtn.addEventListener('click', e => { e.stopPropagation(); showSlide(currentIdx - 1); });
  nextBtn.addEventListener('click', e => { e.stopPropagation(); showSlide(currentIdx + 1); });

  document.addEventListener('keydown', e => {
    if (!modal.classList.contains('open')) return;
    if (e.key === 'Escape')     closeModal();
    if (e.key === 'ArrowLeft')  showSlide(currentIdx - 1);
    if (e.key === 'ArrowRight') showSlide(currentIdx + 1);
  });
})();

/* ════════════════════════════════════════════════════════════
   LINKEDIN-STYLE MODAL (Dynamic Project Cards)
════════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', function initLinkedInModal() {
  const triggerBtns = qsa('.btn-li-modal');
  const modal       = qs('#liModal');
  const closeBtn    = qs('#liModalClose');
  const backdrop    = qs('#liModalBackdrop');
  const goToProj    = qs('#liGoToProject');

  if (!modal || triggerBtns.length === 0) return;

  function populateModal(btn) {
    const d = btn.dataset;
    
    qs('#liModal .li-project-title').innerHTML = d.liTitle || '';
    qs('#liModal .li-project-org').innerHTML = d.liOrg || '';
    
    // Dates
    qs('#liModal .li-project-dates').innerHTML = `
      <svg class="li-icon-svg" viewBox="0 0 16 16" fill="none"><rect x="2" y="2" width="12" height="12" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="M5 1v2M11 1v2M2 6h12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
      ${d.liDate || ''}
    `;

    // Identity Icon
    qs('#liModal .li-project-icon').innerHTML = d.liIcon || '📁';
    
    // Header Media (Image or Icon)
    const mediaWrap = qs('#liModal .li-modal-media');
    if (d.liImg) {
      mediaWrap.innerHTML = `<img src="${d.liImg}" class="li-media-img" alt="${d.liTitle}">`;
    } else {
      mediaWrap.innerHTML = `
        <div class="li-media-ph">
          <span class="li-media-icon">${d.liIcon || '📁'}</span>
          <span class="li-media-label">${d.liTitle || ''}</span>
        </div>
      `;
    }

    // Description (HTML)
    qs('#liModal .li-desc').innerHTML = d.liDesc || '';

    // Skills
    const skillsWrap = qs('#liModal .li-skills');
    if (d.liSkills) {
      skillsWrap.innerHTML = d.liSkills.split(',').map(s => `<span>${s.trim()}</span>`).join('');
    } else {
      skillsWrap.innerHTML = '';
    }

    // External Link 1 (News/Article)
    const extLink = qs('#liExtLink');
    if (d.liExtUrl) {
      extLink.style.display = 'flex';
      extLink.href = d.liExtUrl;
      qs('#liExtTitle').innerHTML = d.liExtText || 'Kunjungi Tautan';
      try {
        qs('#liExtUrl').innerHTML = (new URL(d.liExtUrl)).hostname;
      } catch (e) {
        qs('#liExtUrl').innerHTML = 'Tautan Eksternal';
      }
    } else {
      if (extLink) extLink.style.display = 'none';
    }

    // External Link 2 (Direct Project / Heyzine)
    const projLink = qs('#liProjLink');
    if (d.liProjUrl) {
      projLink.style.display = 'flex';
      projLink.href = d.liProjUrl;
      qs('#liProjTitle').innerHTML = d.liProjText || 'Lihat Proyek';
      try {
        qs('#liProjUrlDomain').innerHTML = (new URL(d.liProjUrl)).hostname;
      } catch (e) {
        qs('#liProjUrlDomain').innerHTML = 'Tautan Eksternal';
      }
    } else {
      if (projLink) projLink.style.display = 'none';
    }
  }

  function openLiModal(e) {
    const btn = e.currentTarget;
    populateModal(btn);
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLiModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  // Bind clicks
  triggerBtns.forEach(btn => btn.addEventListener('click', openLiModal));

  if (closeBtn) closeBtn.addEventListener('click', closeLiModal);
  if (backdrop) backdrop.addEventListener('click', closeLiModal);

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeLiModal();
  });

  if (goToProj) {
    goToProj.addEventListener('click', (e) => {
      closeLiModal();
      const target = qs('#projects');
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
});


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
