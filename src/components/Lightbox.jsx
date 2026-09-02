import React, { useState, useEffect } from 'react';

export default function Lightbox({ isOpen, onClose, itemPool, initialIdx }) {
  const [certIndex, setCertIndex] = useState(0);
  const [pageIndex, setPageIndex] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setCertIndex(initialIdx || 0);
      setPageIndex(0);
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

  const item = (itemPool && itemPool.length > 0) ? (itemPool[certIndex] || {}) : {};

  // Check if item has multiple images
  const isMultiPage = Boolean(item.isMulti && item.images && item.images.length > 1);

  const navigateCert = (dir) => {
    if (!itemPool || itemPool.length === 0) return;
    setCertIndex((prev) => (prev + dir + itemPool.length) % itemPool.length);
    setPageIndex(0); // Reset sub-page index when switching certificate
  };

  const navigatePage = (dir) => {
    if (!isMultiPage) return;
    const maxPage = item.images.length;
    setPageIndex((prev) => (prev + dir + maxPage) % maxPage);
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') {
        if (isMultiPage && pageIndex > 0 && e.shiftKey) {
          navigatePage(-1);
        } else {
          navigateCert(-1);
        }
      }
      if (e.key === 'ArrowRight') {
        if (isMultiPage && pageIndex < item.images.length - 1 && e.shiftKey) {
          navigatePage(1);
        } else {
          navigateCert(1);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, certIndex, pageIndex, itemPool, isMultiPage]);

  if (!isOpen || !itemPool || itemPool.length === 0) return null;

  // Compute current image, title, and description based on multi-page status
  const currentSrc = isMultiPage ? (item.images[pageIndex] || item.img || item.src) : (item.img || item.src || '');
  const currentTitle = isMultiPage ? (item.titles?.[pageIndex] || item.title) : item.title;
  const currentDesc = isMultiPage ? (item.descs?.[pageIndex] || item.summary || item.desc) : (item.summary || item.desc);

  return (
    <div className="lightbox open" id="lightbox" role="dialog" aria-modal="true" aria-label="Lihat Sertifikat">
      <div className="lb-backdrop" id="lbBackdrop" onClick={onClose}></div>

      <div className="lb-panel-wrap">
        {/* Tombol Kiri Utama (Navigasi Antar Sertifikat) */}
        {itemPool.length > 1 && (
          <button 
            className="lb-outer-nav lb-outer-prev magnetic-btn" 
            aria-label="Sertifikat Sebelumnya" 
            onClick={() => navigateCert(-1)}
            title="Sertifikat Sebelumnya"
          >
            <i className='bx bx-chevron-left'></i>
          </button>
        )}

        <div className="lb-panel">
          {/* LEFT SIDE: Gambar & Kontrol Multi-Sertifikat */}
          <div className="lb-image-side">
            <div className="lb-img-wrap">
              {/* Badge Counter Sertifikat di Kiri Atas Gambar */}
              {itemPool.length > 1 && (
                <div className="lb-cert-counter-badge">
                  Sertifikat {certIndex + 1} / {itemPool.length}
                </div>
              )}

              {currentSrc ? (
                <img 
                  src={currentSrc} 
                  alt={currentTitle || 'Sertifikat'} 
                  className="lightbox-img" 
                  key={`${certIndex}-${pageIndex}`}
                  style={{ opacity: 1 }} 
                />
              ) : (
                <div className="lb-img-placeholder">
                  <i className='bx bx-image-alt' style={{ fontSize: '3rem', opacity: 0.4 }}></i>
                  <p style={{ marginTop: '8px', color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>Gambar Sertifikat Belum Dimuat</p>
                </div>
              )}
            </div>

            {/* Tombol Tengah Bawah Sertifikat — KHUSUS UNTUK MULTI-SERTIFIKAT SAJA */}
            {isMultiPage && (
              <div className="lb-multipage-bar">
                <button 
                  className="lb-page-btn" 
                  disabled={pageIndex === 0}
                  onClick={() => navigatePage(-1)}
                  title="Halaman Sebelumnya"
                >
                  <i className='bx bx-chevron-left'></i>
                </button>
                <div className="lb-page-pills">
                  {item.images.map((_, pIdx) => (
                    <button 
                      key={pIdx}
                      className={`lb-page-pill ${pIdx === pageIndex ? 'active' : ''}`}
                      onClick={() => setPageIndex(pIdx)}
                    >
                      <span className="lb-page-icon">📄</span>
                      Halaman {pIdx + 1}
                    </button>
                  ))}
                </div>
                <button 
                  className="lb-page-btn" 
                  disabled={pageIndex === item.images.length - 1}
                  onClick={() => navigatePage(1)}
                  title="Halaman Selanjutnya"
                >
                  <i className='bx bx-chevron-right'></i>
                </button>
              </div>
            )}
          </div>

          {/* RIGHT SIDE: Info Panel Sertifikat */}
          <div className="lb-info-side">
            <button className="lightbox-close" id="lightboxClose" aria-label="Tutup" onClick={onClose}>
              <i className='bx bx-x'></i>
            </button>

            <div className="lb-info-body">
              <div className="lb-info-tag">
                <i className='bx bx-certification'></i> {item.badge || 'Sertifikat'}
              </div>

              <h4 className="lb-info-title" id="lightboxTitle">{currentTitle || '—'}</h4>

              {item.issuer && (
                <div className="lb-info-issuer" style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.7)', fontWeight: '500', marginTop: '-8px' }}>
                  <i className='bx bx-building-house' style={{ color: 'var(--accent-light)', marginRight: '6px' }}></i>
                  {item.issuer}
                </div>
              )}

              <p className="lb-info-desc" id="lightboxDesc">{currentDesc || ''}</p>

              <div className="lb-info-meta">
                {item.date && (
                  <div className="lb-meta-item">
                    <i className='bx bx-calendar'></i>
                    <span>{item.date}</span>
                  </div>
                )}
                <div className="lb-meta-item">
                  <i className='bx bx-user-check'></i>
                  <span>Rizal Azis Nur Abdur Rasyid</span>
                </div>
                <div className="lb-meta-item">
                  <i className='bx bx-shield-quarter'></i>
                  <span>Sertifikat Resmi Terverifikasi</span>
                </div>
              </div>

              {/* Indikator Halaman di Panel Kanan jika Multi-Sertifikat */}
              {isMultiPage && (
                <div className="lb-dot-wrap" id="lbDotWrap" style={{ marginTop: '12px' }}>
                  {item.images.map((_, pIdx) => (
                    <button 
                      key={pIdx} 
                      className={`lb-dot ${pIdx === pageIndex ? 'active' : ''}`} 
                      aria-label={`Halaman ${pIdx + 1}`}
                      onClick={() => setPageIndex(pIdx)}
                      title={`Halaman ${pIdx + 1}`}
                    ></button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tombol Kanan Utama (Navigasi Antar Sertifikat) */}
        {itemPool.length > 1 && (
          <button 
            className="lb-outer-nav lb-outer-next magnetic-btn" 
            aria-label="Sertifikat Selanjutnya" 
            onClick={() => navigateCert(1)}
            title="Sertifikat Selanjutnya"
          >
            <i className='bx bx-chevron-right'></i>
          </button>
        )}
      </div>
    </div>
  );
}
