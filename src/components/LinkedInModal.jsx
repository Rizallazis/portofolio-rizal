import React, { useEffect, useRef } from 'react';

export default function LinkedInModal({ isOpen, onClose, project }) {
  const panelRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      if (window.lenis) window.lenis.stop();
      if (panelRef.current) panelRef.current.scrollTop = 0;
    } else {
      document.body.style.overflow = '';
      if (window.lenis) window.lenis.start();
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  if (!isOpen || !project) return null;

  const skillsArray = typeof project.skills === 'string'
    ? project.skills.split(',').map(s => s.trim()).filter(Boolean)
    : (project.skills || []);

  const handleWheel = (e) => {
    e.stopPropagation();
    if (panelRef.current) {
      panelRef.current.scrollTop += e.deltaY;
    }
  };

  const getHostName = (url) => {
    try {
      return new URL(url).hostname;
    } catch (e) {
      return 'Tautan Eksternal';
    }
  };

  return (
    <div className="li-modal open" id="liModal" role="dialog" aria-modal="true" aria-label="Detail Proyek">
      <div className="li-modal-backdrop" id="liModalBackdrop" onClick={onClose}></div>
      <div className="li-modal-panel" ref={panelRef} onWheel={handleWheel}>
        {/* Header */}
        <div className="li-modal-header">
          <button className="li-modal-close" id="liModalClose" aria-label="Tutup" onClick={onClose}>✕</button>
          <div className="li-modal-header-meta">Proyek</div>
        </div>

        {/* Media */}
        <div className="li-modal-media">
          {project.img ? (
            <img src={project.img} className="li-media-img" alt={project.title} />
          ) : (
            <div className="li-media-ph">
              <span className="li-media-icon">{project.icon || '📁'}</span>
              <span className="li-media-label">{project.title}</span>
            </div>
          )}
        </div>

        {/* Body */}
        <div className="li-modal-body">
          {/* Project Identity */}
          <div className="li-project-identity">
            <div className="li-project-icon">{project.icon || '📁'}</div>
            <div className="li-project-main">
              <h2 className="li-project-title" dangerouslySetInnerHTML={{ __html: project.subtitle || project.title }}></h2>
              <div className="li-project-org" dangerouslySetInnerHTML={{ __html: project.org || '' }}></div>
              <div className="li-project-dates">
                <svg className="li-icon-svg" viewBox="0 0 16 16" fill="none">
                  <rect x="2" y="2" width="12" height="12" rx="2" stroke="currentColor" stroke-width="1.5" />
                  <path d="M5 1v2M11 1v2M2 6h12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                </svg>
                {project.date}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="li-divider"></div>

          {/* Description */}
          <div className="li-section">
            <h3 className="li-section-title">Deskripsi</h3>
            <div className="li-desc" id="liDescContent" dangerouslySetInnerHTML={{ __html: project.desc || '' }}></div>
          </div>

          {/* Divider */}
          <div className="li-divider"></div>

          {/* Skills */}
          {skillsArray.length > 0 && (
            <>
              <div className="li-section">
                <h3 className="li-section-title">Keahlian yang Digunakan</h3>
                <div className="li-skills">
                  {skillsArray.map((skill, index) => (
                    <span key={index}>{skill}</span>
                  ))}
                </div>
              </div>
              <div className="li-divider"></div>
            </>
          )}

          {/* Links */}
          {(project.extUrl || project.projUrl) && (
            <div className="li-section">
              <h3 className="li-section-title">Tautan</h3>
              <div className="li-links">
                {project.extUrl && (
                  <a href={project.extUrl} target="_blank" rel="noopener noreferrer" className="li-link-item" id="liExtLink">
                    <div className="li-link-icon">📰</div>
                    <div className="li-link-text">
                      <div className="li-link-title" id="liExtTitle">{project.extText || 'Kunjungi Tautan'}</div>
                      <div className="li-link-url" id="liExtUrl">{getHostName(project.extUrl)}</div>
                    </div>
                    <svg className="li-ext-icon" viewBox="0 0 16 16" fill="none">
                      <path d="M6 3H3a1 1 0 00-1 1v9a1 1 0 001 1h9a1 1 0 001-1v-3M9 2h5v5M8.5 7.5L14 2" stroke="currentColor"
                        strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                )}

                {project.projUrl && (
                  <a href={project.projUrl} target="_blank" rel="noopener noreferrer" className="li-link-item" id="liProjLink">
                    <div className="li-link-icon">↗️</div>
                    <div className="li-link-text">
                      <div className="li-link-title" id="liProjTitle">{project.projText || 'Lihat Proyek'}</div>
                      <div className="li-link-url" id="liProjUrlDomain">{getHostName(project.projUrl)}</div>
                    </div>
                    <svg className="li-ext-icon" viewBox="0 0 16 16" fill="none">
                      <path d="M6 3H3a1 1 0 00-1 1v9a1 1 0 001 1h9a1 1 0 001-1v-3M9 2h5v5M8.5 7.5L14 2" stroke="currentColor"
                        strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
