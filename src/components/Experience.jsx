import React, { useRef, useState } from 'react';
import { 
  certifications, 
  experiences, 
  volunteers, 
  internships, 
  featuredProjects, 
  allProjects, 
  otherCertificates 
} from '../data';

export default function Experience({ onOpenLightbox, onOpenLinkedIn }) {
  const [showAllProjects, setShowAllProjects] = useState(false);
  const trackRef = useRef(null);
  
  // Drag states for Cert Track
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);

  // Scroll cert track using buttons
  const scrollTrack = (direction) => {
    const track = trackRef.current;
    if (!track) return;
    const scrollAmount = track.offsetWidth * 0.8;
    track.style.scrollBehavior = 'smooth';
    track.scrollLeft += direction * scrollAmount;
  };

  const handleMouseDown = (e) => {
    const track = trackRef.current;
    if (!track) return;
    setIsDown(true);
    track.classList.add('dragging');
    track.style.scrollSnapType = 'none';
    track.style.scrollBehavior = 'auto';
    setStartX(e.pageX - track.offsetLeft);
    setScrollLeftState(track.scrollLeft);
  };

  const handleMouseLeave = () => {
    const track = trackRef.current;
    if (!track) return;
    setIsDown(false);
    track.classList.remove('dragging');
    track.style.scrollSnapType = '';
  };

  const handleMouseUp = () => {
    const track = trackRef.current;
    if (!track) return;
    setIsDown(false);
    track.classList.remove('dragging');
    track.style.scrollSnapType = '';
  };

  const handleMouseMove = (e) => {
    if (!isDown) return;
    const track = trackRef.current;
    if (!track) return;
    e.preventDefault();
    const x = e.pageX - track.offsetLeft;
    const walk = (x - startX) * 1.5; // scroll speed multiplier
    track.scrollLeft = scrollLeftState - walk;
  };

  const handleCertClick = (cert, idx) => {
    onOpenLightbox(idx, certifications);
  };

  const handleOtherCertClick = (certIdx) => {
    onOpenLightbox(certIdx, otherCertificates);
  };

  return (
    <>
      {/* ── PELATIHAN ── */}
      <section className="certificates section-pad" id="certificates">
        <div className="container">
          <span className="badge reveal visible">Pelatihan</span>
          <h2 className="section-title reveal visible">Riwayat <span className="gradient-text">Pelatihan</span></h2>
          <p className="section-subtitle reveal visible">
            Berbagai pelatihan yang telah diikuti untuk memperkaya kompetensi.
          </p>

          <div className="cert-track-wrap reveal visible">
            <div 
              className="cert-track" 
              id="certTrack"
              ref={trackRef}
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseLeave}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
            >
              {certifications.map((cert, index) => (
                <div 
                  key={index}
                  className={`cert-card ${cert.isMulti ? 'cert-card-multi' : ''}`}
                  onClick={() => handleCertClick(cert, index)}
                >
                  <div className="cert-img-wrap">
                    <img src={cert.img} alt={cert.title} draggable="false" />
                    <span className="cert-badge">{cert.badge}</span>
                    <div className="cert-zoom-hint">🔍 Klik untuk perbesar</div>
                  </div>
                  <div className="cert-body">
                    <h4>{cert.title}</h4>
                    <div className="cert-issuer">{cert.issuer}</div>
                    <p>{cert.summary}</p>
                    <div className="cert-date">📅 {cert.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="cert-nav">
            <button className="cert-btn" id="certPrev" aria-label="Sebelumnya" onClick={() => scrollTrack(-1)}>‹</button>
            <button className="cert-btn" id="certNext" aria-label="Selanjutnya" onClick={() => scrollTrack(1)}>›</button>
          </div>
        </div>
      </section>

      {/* ── PENGALAMAN ORGANISASI ── */}
      <section className="section-pad" id="experience">
        <div className="container">
          <span className="badge reveal visible">Rekam Jejak</span>
          <h2 className="section-title reveal visible">Pengalaman <span className="gradient-text">Organisasi</span></h2>
          <p className="section-subtitle reveal visible">
            Perjalanan aktif di berbagai organisasi kemahasiswaan yang membentuk karakter kepemimpinan, kolaborasi, dan kepedulian sosial.
          </p>

          <div className="exp-container">
            {experiences.map((exp, index) => (
              <div key={index} className="exp-group reveal visible">
                <div className="exp-org-header">
                  <div className="exp-org-logo">
                    <img src={exp.orgLogo} alt={`Logo ${exp.orgName}`} />
                  </div>
                  <div className="exp-org-info">
                    <h3>{exp.orgName}</h3>
                    <div className="org-type">{exp.orgType}</div>
                    <div className="org-total">
                      <span>📅</span> {exp.orgPeriod}
                    </div>
                  </div>
                </div>

                <div className="exp-role-list">
                  {exp.roles.map((role, rIdx) => (
                    <div key={rIdx} className="exp-role">
                      <div className="exp-role-timeline">
                        <div className="exp-dot"></div>
                        {rIdx < exp.roles.length - 1 && <div className="exp-line"></div>}
                      </div>
                      <div className="exp-role-content">
                        <h4>{role.title}</h4>
                        <div className="exp-role-meta">
                          <span className="exp-period">📅 {role.period}</span>
                          <span className="exp-type-badge badge-org">{role.type}</span>
                        </div>
                        <p className="exp-role-desc">{role.desc}</p>
                        <div className="exp-role-skills">
                          {role.skills.map((skill, sIdx) => (
                            <span key={sIdx} className="exp-skill-chip">{skill}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── KEPANITIAAN & VOLUNTEER ── */}
      <section className="section-pad" id="volunteer" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <span className="badge reveal visible">Kepanitiaan &amp; Relawan</span>
          <h2 className="section-title reveal visible">Kepanitiaan &amp; <span className="gradient-text">Volunteer</span></h2>
          <p className="section-subtitle reveal visible">
            Pengalaman aktif sebagai panitia dan relawan di berbagai event kemahasiswaan, sosial, dan kemanusiaan — membangun manajemen event dan kerja tim.
          </p>

          <div className="exp-container">
            {volunteers.map((vol, index) => (
              <div key={index} className="exp-standalone reveal visible">
                <div className="exp-role">
                  <div className="exp-standalone-header">
                    <div className="standalone-logo">{vol.logo}</div>
                    <div className="exp-role-content">
                      <h4>{vol.title}</h4>
                      <div className="exp-role-meta">
                        <span className="exp-period">📅 {vol.period}</span>
                        <span className={`exp-type-badge ${vol.type === 'Volunteer' ? 'badge-vol' : 'badge-com'}`}>{vol.type}</span>
                      </div>
                      <p className="exp-role-desc">{vol.desc}</p>
                      <div className="exp-role-skills">
                        {vol.skills.map((skill, sIdx) => (
                          <span key={sIdx} className="exp-skill-chip">{skill}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MAGANG & PRAKTIK KERJA ── */}
      <section className="internship section-pad" id="internship">
        <div className="container">
          <span className="badge reveal visible">Pengalaman Magang</span>
          <h2 className="section-title reveal visible">Magang &amp; <span className="gradient-text">Praktik Kerja</span></h2>
          <p className="section-subtitle reveal visible">
            Pengalaman kerja nyata di lingkungan profesional yang membentuk kemampuan praktis dan wawasan industri.
          </p>

          <div className="internship-list">
            {internships.map((intern, index) => (
              <div key={index} className="intern-card reveal visible">
                <div className="intern-card-left">
                  <div className="intern-logo">{intern.logo}</div>
                  <div className="intern-timeline-line"></div>
                </div>
                <div className="intern-card-body">
                  <div className="intern-header">
                    <div>
                      <h3 className="intern-title">{intern.title}</h3>
                      <div className="intern-company">{intern.company}</div>
                    </div>
                    <div className="intern-meta">
                      <span className="intern-period">📅 {intern.period}</span>
                      <span className="intern-type">{intern.type}</span>
                    </div>
                  </div>
                  <p className="intern-desc">{intern.desc}</p>
                  <div className="intern-skills">
                    {intern.skills.map((skill, sIdx) => (
                      <span key={sIdx} className="intern-chip">{skill}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJEK & KARYA ── */}
      <section className="projects section-pad" id="projects">
        <div className="container">
          <span className="badge reveal visible">Projek</span>
          <h2 className="section-title reveal visible">Projek &amp; <span className="gradient-text">Karya Mandiri</span></h2>
          <p className="section-subtitle reveal visible">
            Proyek pribadi, kolaboratif, dan akademik yang mencerminkan kemampuan teknis dan kreativitas.
          </p>

          {/* Featured projects grid */}
          <div className="projects-grid proj-featured-grid reveal visible">
            {featuredProjects.map((proj, idx) => (
              <div 
                key={idx} 
                className="project-card btn-li-modal"
                onClick={() => onOpenLinkedIn(proj)}
              >
                <div className="project-img-wrap">
                  <img src={proj.img} alt={proj.title} className="project-img" />
                  <div className="project-overlay">
                    <span className="project-status status-done">✅ Selesai</span>
                  </div>
                </div>
                <div className="project-body">
                  <div className="project-tags">
                    {proj.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="project-tag">{tag}</span>
                    ))}
                  </div>
                  <h3 className="project-title">{proj.title}</h3>
                  <p className="project-desc">{proj.summary}</p>
                  <div className="project-footer">
                    <div className="project-stack">
                      {proj.stack.map((item, sIdx) => (
                        <span key={sIdx} className="stack-chip">{item}</span>
                      ))}
                    </div>
                  </div>
                  {proj.newsUrl && (
                    <a 
                      href={proj.newsUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="project-news-link"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {proj.newsText}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Show all / hide button */}
          <div className="proj-showall-wrap reveal visible" style={{ textAlign: 'center', marginTop: '48px' }}>
            {!showAllProjects ? (
              <button className="btn btn-outline proj-showall-btn" onClick={() => setShowAllProjects(true)}>
                <span>📂</span> Lihat Projek Lainnya
              </button>
            ) : null}
          </div>

          {/* Hidden grid by default, toggled with state */}
          {showAllProjects && (
            <div className="proj-allgrid-wrap" id="projAllGrid" style={{ display: 'block', marginTop: '48px' }}>
              <div className="projects-grid">
                {allProjects.map((proj, idx) => (
                  <div 
                    key={idx} 
                    className="project-card reveal visible btn-li-modal"
                    onClick={() => onOpenLinkedIn(proj)}
                  >
                    <div className="project-img-wrap">
                      <img src={proj.img} alt={proj.title} className="project-img" />
                      <div className="project-overlay">
                        <span className="project-status status-done">✅ Selesai</span>
                      </div>
                    </div>
                    <div className="project-body">
                      <div className="project-tags">
                        {proj.tags.map((tag, tIdx) => (
                          <span key={tIdx} className="project-tag">{tag}</span>
                        ))}
                      </div>
                      <h3 className="project-title">{proj.title}</h3>
                      <p className="project-desc">{proj.summary}</p>
                      <div className="project-footer">
                        <div className="project-stack">
                          {proj.stack.map((item, sIdx) => (
                            <span key={sIdx} className="stack-chip">{item}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ textAlign: 'center', marginTop: '40px' }}>
                <button className="btn btn-outline" onClick={() => {
                  setShowAllProjects(false);
                  const projSec = document.getElementById('projects');
                  if (projSec) {
                    if (window.lenis) window.lenis.scrollTo(projSec);
                    else projSec.scrollIntoView({ behavior: 'smooth' });
                  }
                }}>
                  <span>🔼</span> Sembunyikan Projek
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── SERTIFIKAT LAINNYA ── */}
      <section className="other-certs section-pad" id="other-certs">
        <div className="container">
          <span className="badge reveal visible">Koleksi Sertifikat</span>
          <h2 className="section-title reveal visible">Sertifikat <span className="gradient-text">Kepanitiaan & Partisipasi</span></h2>
          <p className="section-subtitle reveal visible">
            Sertifikat penghargaan, kepanitiaan, dan keikutsertaan acara dari berbagai organisasi.
          </p>

          <div className="ocert-gallery">
            {otherCertificates.map((cert, index) => (
              <div 
                key={index} 
                className="ocert-img-card reveal visible"
                onClick={() => handleOtherCertClick(index)}
              >
                <img src={cert.img} alt={cert.title} />
                <div className="ocert-img-overlay">
                  <span className="ocert-overlay-title">{cert.overlayTitle}</span>
                  <span className="ocert-overlay-badge">{cert.overlayBadge}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
