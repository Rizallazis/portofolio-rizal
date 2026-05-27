import React, { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mx = -100, my = -100;
    let rx = -100, ry = -100;
    let rafId;

    const onMouseMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.left = `${mx}px`;
      dot.style.top = `${my}px`;
    };

    const animateRing = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.left = `${rx}px`;
      ring.style.top = `${ry}px`;
      rafId = requestAnimationFrame(animateRing);
    };

    document.addEventListener('mousemove', onMouseMove);
    animateRing();

    const hoverEls = 'a, button, .portfolio-item, .cert-card, .contact-card, .skill-tag, .filter-btn, .exp-standalone, .exp-group, .ocert-img-card, .ig-post, .ig-nav-btn, .ig-action-btn, .socmed-project-card, .project-news-link, .smp-thumb-item, .smp-modal-close, .btn-li-modal';

    const onMouseOver = (e) => {
      if (e.target.closest(hoverEls)) {
        ring.classList.add('hovering');
      }
    };

    const onMouseOut = (e) => {
      if (e.target.closest(hoverEls)) {
        ring.classList.remove('hovering');
      }
    };

    const onMouseLeave = () => {
      dot.style.opacity = '0';
      ring.style.opacity = '0';
    };

    const onMouseEnter = () => {
      dot.style.opacity = '1';
      ring.style.opacity = '1';
    };

    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafId);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, []);

  return (
    <>
      <div className="cursor-dot" id="cursorDot" ref={dotRef}></div>
      <div className="cursor-ring" id="cursorRing" ref={ringRef}></div>
    </>
  );
}
