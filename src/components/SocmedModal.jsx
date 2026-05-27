import React, { useState, useEffect, useRef } from 'react';

export default function SocmedModal({ isOpen, onClose, project }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const infoRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setCurrentIdx(0);
      document.body.style.overflow = 'hidden';
      if (window.lenis) window.lenis.stop();
      if (infoRef.current) infoRef.current.scrollTop = 0;
    } else {
      document.body.style.overflow = '';
      if (window.lenis) window.lenis.start();
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !project) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') showSlide(-1);
      if (e.key === 'ArrowRight') showSlide(1);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIdx, project]);

  if (!isOpen || !project) return null;

  const images = project.images || [];
  const imageDescs = project.imageDescs || [];

  const showSlide = (dir) => {
    if (images.length === 0) return;
    setCurrentIdx((prev) => (prev + dir + images.length) % images.length);
  };

  const handleWheel = (e) => {
    e.stopPropagation();
    if (infoRef.current) {
      infoRef.current.scrollTop += e.deltaY;
    }
  };

  const tagsArray = typeof project.projectTags === 'string'
    ? project.projectTags.split('·').map(t => t.trim()).filter(Boolean)
    : (project.projectTags || []);

  return (
    <div className="smp-modal open" id="smpModal" role="dialog" aria-modal="true" aria-label="Detail Proyek">
      <div className="smp-modal-backdrop" id="smpModalBackdrop" onClick={onClose}></div>
      <div className="smp-modal-inner">
        <button className="smp-modal-close" id="smpModalClose" aria-label="Tutup" onClick={onClose}>✕</button>

        {/* Left: Gallery */}
        <div className="smp-modal-gallery">
          <div className="smp-gallery-main">
            {images.length > 0 ? (
              <>
                <img 
                  src={images[currentIdx]} 
                  alt={`Gambar ${currentIdx + 1}`} 
                  id="smpGalleryMain" 
                  className="smp-gallery-main-img" 
                  style={{ opacity: 1 }}
                />
                <button className="smp-gallery-nav smp-gallery-prev" id="smpGalleryPrev" onClick={() => showSlide(-1)}>&#8249;</button>
                <button className="smp-gallery-nav smp-gallery-next" id="smpGalleryNext" onClick={() => showSlide(1)}>&#8250;</button>
                <div className="smp-gallery-counter" id="smpGalleryCounter">{currentIdx + 1} / {images.length}</div>
              </>
            ) : (
              <div className="smp-gallery-empty" id="smpGalleryEmpty" style={{ display: 'flex' }}>
                <div className="smp-empty-icon">🖼️</div>
                <p>Tambahkan gambar proyek ke<br /><code>assets/images/portfolio/socmed/[nama-proyek]/</code></p>
              </div>
            )}
          </div>
          
          {images.length > 1 && (
            <div className="smp-gallery-thumbs" id="smpGalleryThumbs">
              {images.map((src, i) => (
                <div 
                  key={i} 
                  className={`smp-thumb-item ${i === currentIdx ? 'active' : ''}`}
                  onClick={() => setCurrentIdx(i)}
                >
                  <img src={src} alt={`Gambar ${i + 1}`} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Info */}
        <div className="smp-modal-info" ref={infoRef} onWheel={handleWheel}>
          <div className="smp-modal-year" id="smpModalYear">{project.projectYear}</div>
          <h2 className="smp-modal-title" id="smpModalTitle">{project.projectTitle}</h2>
          <p className="smp-modal-desc" id="smpModalDesc">{project.projectDesc}</p>
          <div className="smp-modal-tags" id="smpModalTags">
            {tagsArray.map((tag, i) => (
              <span key={i}>{tag}</span>
            ))}
          </div>
          
          {imageDescs[currentIdx] && (
            <div className="smp-modal-img-desc-wrap" id="smpModalImgDescWrap" style={{ display: 'block' }}>
              <div className="smp-img-desc-label">📝 Deskripsi Gambar</div>
              <p className="smp-modal-img-desc" id="smpModalImgDesc">{imageDescs[currentIdx]}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
