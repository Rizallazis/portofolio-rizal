import React, { useState, useEffect } from 'react';

export default function Lightbox({ isOpen, onClose, itemPool, initialIdx }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setCurrent(initialIdx);
      document.body.style.overflow = 'hidden';
      if (window.lenis) window.lenis.stop();
    } else {
      document.body.style.overflow = '';
      if (window.lenis) window.lenis.start();
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, initialIdx]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') navigate(-1);
      if (e.key === 'ArrowRight') navigate(1);
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, current, itemPool]);

  if (!isOpen || !itemPool || itemPool.length === 0) return null;

  const item = itemPool[current];

  const navigate = (dir) => {
    setCurrent((prev) => (prev + dir + itemPool.length) % itemPool.length);
  };

  return (
    <div className="lightbox open" id="lightbox" role="dialog" aria-modal="true" aria-label="Lihat Sertifikat">
      <div className="lb-backdrop" id="lbBackdrop" onClick={onClose}></div>
      <div className="lb-panel">
        {/* LEFT: Image */}
        <div className="lb-image-side">
          <div className="lb-img-wrap">
            {item.src ? (
              <img src={item.src} alt={item.title} className="lightbox-img" id="lightboxImg" style={{ opacity: 1 }} />
            ) : (
              <div style={{ display: 'none' }}></div>
            )}
          </div>
          {itemPool.length > 1 && (
            <div className="lb-nav-toolbar" id="lbNavToolbar" style={{ display: 'flex' }}>
              <button className="lightbox-prev" id="lightboxPrev" aria-label="Sebelumnya" onClick={() => navigate(-1)}>
                <i className='bx bx-chevron-left'></i>
              </button>
              <span className="lb-counter" id="lbCounter">{current + 1} / {itemPool.length}</span>
              <button className="lightbox-next" id="lightboxNext" aria-label="Selanjutnya" onClick={() => navigate(1)}>
                <i className='bx bx-chevron-right'></i>
              </button>
            </div>
          )}
        </div>
        {/* RIGHT: Info Panel */}
        <div className="lb-info-side">
          <button className="lightbox-close" id="lightboxClose" aria-label="Tutup" onClick={onClose}><i className='bx bx-x'></i></button>
          <div className="lb-info-body">
            <div className="lb-info-tag"><i className='bx bx-certification'></i> Sertifikat</div>
            <h4 className="lb-info-title" id="lightboxTitle">{item.title || '—'}</h4>
            <p className="lb-info-desc" id="lightboxDesc">{item.desc || ''}</p>
            <div className="lb-info-meta">
              <div className="lb-meta-item"><i className='bx bx-user-check'></i><span>Rizal Azis Nur Abdur Rasyid</span></div>
              <div className="lb-meta-item"><i className='bx bx-shield-quarter'></i><span>Sertifikat Resmi Terverifikasi</span></div>
            </div>
            {itemPool.length > 1 && (
              <div className="lb-dot-wrap" id="lbDotWrap">
                {itemPool.map((_, i) => (
                  <button 
                    key={i} 
                    className={`lb-dot ${i === current ? 'active' : ''}`} 
                    aria-label={`Slide ${i + 1}`}
                    onClick={() => setCurrent(i)}
                  ></button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
