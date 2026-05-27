import React, { useState } from 'react';
import { portfolioItems, socmedProjects } from '../data';

export default function Portfolio({ onOpenLightbox, onOpenSocmed }) {
  const [filter, setFilter] = useState('all');

  const handleFilterChange = (category) => {
    setFilter(category);
  };

  const getLightboxPool = () => {
    return portfolioItems.map(item => ({
      src: item.img || '',
      title: item.title,
      desc: item.desc
    }));
  };

  const handleItemClick = (index) => {
    const pool = getLightboxPool();
    onOpenLightbox(index, pool);
  };

  return (
    <section className="section-pad" id="portfolio" style={{ display: 'none' }}>
      <div className="container">
        <div className="portfolio-header reveal">
          <span className="badge">Karya Saya</span>
          <h2 className="section-title">Portfolio <span className="gradient-text">Kreatif</span></h2>
          <p className="section-subtitle">
            Kumpulan karya di bidang desain, dokumentasi event, dan konten digital
            yang mencerminkan semangat kreatif dan komunikasi yang inklusif.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="filter-tabs reveal">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`} 
            onClick={() => handleFilterChange('all')}
            id="filterAll"
          >
            Semua
          </button>
          <button 
            className={`filter-btn ${filter === 'design' ? 'active' : ''}`} 
            onClick={() => handleFilterChange('design')}
            id="filterDesign"
          >
            <i className="bx bx-palette"></i> Editing &amp; Desain
          </button>
          <button 
            className={`filter-btn ${filter === 'doc' ? 'active' : ''}`} 
            onClick={() => handleFilterChange('doc')}
            id="filterDoc"
          >
            <i className="bx bx-camera"></i> Dokumentasi
          </button>
          <button 
            className={`filter-btn ${filter === 'digital' ? 'active' : ''}`} 
            onClick={() => handleFilterChange('digital')}
            id="filterDigital"
          >
            <i className="bx bx-mobile-alt"></i> Konten Digital
          </button>
          <button 
            className={`filter-btn filter-btn-socmed ${filter === 'socmed' ? 'active' : ''}`} 
            onClick={() => handleFilterChange('socmed')}
            id="filterSocmed"
          >
            <i className="bx bx-share-alt"></i> Social Media Content
          </button>
        </div>

        {/* Grid for standard portfolio items */}
        {filter !== 'socmed' && (
          <div className="portfolio-grid" id="portfolioGrid" style={{ display: 'grid' }}>
            {portfolioItems.map((item, idx) => {
              const isMatch = filter === 'all' || item.cat === filter;
              if (!isMatch) return null;

              return (
                <div 
                  key={idx}
                  className="portfolio-item" 
                  onClick={() => handleItemClick(idx)}
                >
                  <div className={`port-placeholder port-ph-${(idx % 9) + 1}`}>
                    {item.placeholder}
                  </div>
                  <div className="portfolio-overlay">
                    <div className="overlay-icon">🔍</div>
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Social Media Content Section */}
        {filter === 'socmed' && (
          <div className="socmed-section" id="socmedSection" style={{ display: 'block' }}>
            <div className="socmed-intro reveal visible">
              <p>Klik pada proyek untuk melihat galeri konten lengkap dan deskripsi proyeknya.</p>
            </div>

            <div className="socmed-projects-grid" id="socmedProjectsGrid">
              {socmedProjects.map((project, idx) => (
                <div 
                  key={idx}
                  className="socmed-project-card reveal visible" 
                  onClick={() => onOpenSocmed(project)}
                >
                  <div className="smp-thumbnail">
                    <div className="smp-thumb-grid">
                      <div className="smp-thumb-cell smp-thumb-ph" style={{ '--ph-bg': project.phBg }}>
                        {project.thumbPh}
                      </div>
                      <div className="smp-thumb-cell smp-thumb-ph" style={{ '--ph-bg': project.phBg }}>
                        📢
                      </div>
                      <div className="smp-thumb-cell smp-thumb-ph" style={{ '--ph-bg': project.phBg }}>
                        ✨
                      </div>
                      <div className="smp-thumb-cell smp-thumb-ph" style={{ '--ph-bg': project.phBg }}>
                        ❤️
                      </div>
                    </div>
                    <div className="smp-thumb-overlay">
                      <span className="smp-view-btn">👁 Lihat Proyek</span>
                    </div>
                  </div>
                  <div className="smp-info">
                    <div className="smp-year-badge">{project.projectYear}</div>
                    <h3>{project.projectTitle}</h3>
                    <p>{project.projectDesc.slice(0, 100)}...</p>
                    <div className="smp-tags">
                      {project.projectTags.split('·').slice(0, 3).map((tag, tIdx) => (
                        <span key={tIdx}>{tag.trim()}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Hint */}
        <div className="add-hint reveal">
          <span className="icon">📁</span>
          <span>
            Tambahkan karya desain ke folder
            <code>assets/images/portfolio/design/</code>,
            <code>documentation/</code>,
            <code>digital/</code>, atau
            <code>socmed/[nama-proyek]/</code> untuk konten Social Media — lalu perbarui <code>data-images</code> di HTML.
          </span>
        </div>
      </div>
    </section>
  );
}
