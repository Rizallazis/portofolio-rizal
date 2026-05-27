import React, { useEffect } from 'react';

export default function About() {
  useEffect(() => {
    const fills = document.querySelectorAll('.skill-fill');
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const w = e.target.getAttribute('data-width');
          e.target.style.width = w + '%';
          e.target.classList.add('animated');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.5 });

    fills.forEach((f) => obs.observe(f));

    return () => {
      fills.forEach((f) => obs.unobserve(f));
    };
  }, []);

  return (
    <section className="about section-pad" id="about">
      <div className="container">
        <div className="about-grid">
          {/* Kiri: Bio */}
          <div className="about-text reveal-left">
            <span className="badge">Tentang Saya</span>
            <h2 className="section-title">Mengenal <span className="gradient-text">Rizal Azis</span></h2>
            <p>
              Halo! Saya <strong>Rizal Azis Nur Abdur Rasyid</strong>, Lulusan S1 Psikologi Universitas Brawijaya yang
              fokus pada
              inklusivitas, komunikasi digital, dan pengembangan sumber daya manusia (HR).
              Saya memiliki landasan teori psikologi yang kuat untuk mendukung fungsi HR, khususnya dalam komunikasi
              empatik,
              peer counseling, dan pemahaman perilaku individu.
            </p>
            <p>
              Saya berpengalaman memimpin unit organisasi besar sebagai <strong>Kepala Divisi di KSR PMI Unit Universitas
                Brawijaya</strong>.
              Peran ini membekali saya dengan tanggung jawab kepemimpinan strategis, manajemen tim, dan koordinasi antar
              divisi.
            </p>
            <p>
              Sebagai penyandang disabilitas fisik, saya membawa perspektif unik dalam mempromosikan nilai-nilai
              kesetaraan,
              penerimaan keberagaman, dan aksesibilitas di lingkungan profesional. Saya berorientasi pada kontribusi
              dalam menciptakan lingkungan kerja yang inklusif dan kolaboratif.
            </p>

            <div className="about-info">
              <div className="info-item">
                <span className="info-label">Universitas</span>
                <span className="info-value">Universitas Brawijaya</span>
              </div>
              <div className="info-item">
                <span className="info-label">Pendidikan</span>
                <span className="info-value">S1 Psikologi</span>
              </div>
              <div className="info-item">
                <span className="info-label">Fokus Utama</span>
                <span className="info-value">HR &amp; Inklusivitas</span>
              </div>
              <div className="info-item">
                <span className="info-label">Minat Karir</span>
                <span className="info-value">People &amp; Culture</span>
              </div>
            </div>
          </div>

          {/* Kanan: Skills */}
          <div className="skills-section reveal-right">
            <h3>Kualifikasi Utama Bidang HR</h3>
            
            <div className="skill-item">
              <div className="skill-header">
                <span className="skill-name">Psikologi &amp; Kesejahteraan Karyawan</span>
                <span className="skill-pct">90%</span>
              </div>
              <div className="skill-bar">
                <div className="skill-fill" data-width="90"></div>
              </div>
            </div>

            <div className="skill-item">
              <div className="skill-header">
                <span className="skill-name">Kepemimpinan Strategis</span>
                <span className="skill-pct">85%</span>
              </div>
              <div className="skill-bar">
                <div className="skill-fill" data-width="85"></div>
              </div>
            </div>

            <div className="skill-item">
              <div className="skill-header">
                <span className="skill-name">Advokasi Inklusivitas</span>
                <span className="skill-pct">95%</span>
              </div>
              <div className="skill-bar">
                <div className="skill-fill" data-width="95"></div>
              </div>
            </div>

            <div className="skill-item">
              <div className="skill-header">
                <span className="skill-name">Komunikasi &amp; Media</span>
                <span className="skill-pct">85%</span>
              </div>
              <div className="skill-bar">
                <div className="skill-fill" data-width="85"></div>
              </div>
            </div>

            <div className="skill-item">
              <div className="skill-header">
                <span className="skill-name">Administrasi &amp; Teknis Kreatif</span>
                <span className="skill-pct">80%</span>
              </div>
              <div className="skill-bar">
                <div className="skill-fill" data-width="80"></div>
              </div>
            </div>

            <div className="soft-skills">
              <h3>Keahlian Khusus</h3>
              <div className="tags-cloud">
                <span className="skill-tag"><i className='bx bx-conversation'></i> Peer Counseling</span>
                <span className="skill-tag"><i className='bx bx-heart'></i> Psychological First Aid (PFA)</span>
                <span className="skill-tag"><i className='bx bx-group'></i> Manajemen Tim</span>
                <span className="skill-tag"><i className='bx bx-hand'></i> Dasar Bahasa Isyarat</span>
                <span className="skill-tag"><i className='bx bx-globe'></i> Aksesibilitas</span>
                <span className="skill-tag"><i className='bx bx-broadcast'></i> Strategi Komunikasi</span>
                <span className="skill-tag"><i className='bx bx-brain'></i> Analisis Perilaku</span>
              </div>
            </div>

            <div className="tools-skills" style={{ marginTop: '32px' }}>
              <h3>Tools &amp; Software</h3>
              <div className="tags-cloud">
                <span className="skill-tag"><i className='bx bxl-windows'></i> Microsoft Office</span>
                <span className="skill-tag"><i className='bx bx-bar-chart-alt-2'></i> R Studio &amp; SPSS</span>
                <span className="skill-tag"><i className='bx bxl-figma'></i> Canva &amp; Figma</span>
                <span className="skill-tag"><i className='bx bxl-adobe'></i> Adobe Photoshop &amp; Illustrator</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
