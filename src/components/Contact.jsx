import React, { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [btnState, setBtnState] = useState({
    text: 'Kirim Pesan',
    disabled: false,
    style: {}
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBtnState({
      text: 'Mengirim...',
      disabled: true,
      style: {}
    });

    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('email', formData.email);
      data.append('message', formData.message);

      const response = await fetch('https://formspree.io/f/xjgjryjn', {
        method: 'POST',
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setBtnState({
          text: 'Pesan Terkirim!',
          disabled: true,
          style: {
            backgroundColor: '#10b981',
            borderColor: '#10b981',
            color: '#ffffff'
          }
        });
        setFormData({ name: '', email: '', message: '' });
      } else {
        setBtnState({
          text: 'Gagal Dikirim!',
          disabled: true,
          style: {
            backgroundColor: '#ef4444',
            borderColor: '#ef4444',
            color: '#ffffff'
          }
        });
      }
    } catch (error) {
      setBtnState({
        text: 'Gagal Menyambung!',
        disabled: true,
        style: {
          backgroundColor: '#ef4444',
          borderColor: '#ef4444',
          color: '#ffffff'
        }
      });
    } finally {
      setTimeout(() => {
        setBtnState({
          text: 'Kirim Pesan',
          disabled: false,
          style: {}
        });
      }, 3500);
    }
  };

  return (
    <section className="contact section-pad" id="contact">
      <div className="container">
        <div className="contact-inner">
          {/* Teks */}
          <div className="reveal-left visible">
            <span className="badge">Hubungi Saya</span>
            <h2 className="section-title">Mari <span className="gradient-text">Berkolaborasi</span></h2>
            <p>
              Tertarik berkolaborasi dalam proyek digital, event, atau kampanye sosial?
              Jangan ragu untuk menghubungi saya lewat salah satu channel di bawah ini.
              Saya terbuka untuk diskusi, kolaborasi, dan peluang baru!
            </p>

            <div className="contact-cards">
              <a href="mailto:rizalbyi03@gmail.com" className="contact-card" id="contactEmail">
                <div className="contact-icon">✉️</div>
                <div className="contact-info">
                  <div className="label">Email</div>
                  <div className="value">rizalbyi03@gmail.com</div>
                </div>
                <span className="contact-arrow">→</span>
              </a>

              <a
                href="https://wa.me/6288226637840?text=Halo%20kak,%20saya%20tertarik%20dengan%20portofolio%20Anda.%20Boleh%20bertanya%20lebih%20lanjut?"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-card"
                id="contactWA"
              >
                <div className="contact-icon">💬</div>
                <div className="contact-info">
                  <div className="label">WhatsApp</div>
                  <div className="value">088226637840</div>
                </div>
                <span className="contact-arrow">→</span>
              </a>

              <a
                href="https://instagram.com/rizalazis_12"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-card"
                id="contactIG"
              >
                <div className="contact-icon">📸</div>
                <div className="contact-info">
                  <div className="label">Instagram</div>
                  <div className="value">@rizalazis_12</div>
                </div>
                <span className="contact-arrow">→</span>
              </a>

              <a
                href="https://www.linkedin.com/in/rizallazis123/"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-card"
                id="contactLI"
              >
                <div className="contact-icon">💼</div>
                <div className="contact-info">
                  <div className="label">LinkedIn</div>
                  <div className="value">linkedin.com/in/rizallazis123</div>
                </div>
                <span className="contact-arrow">→</span>
              </a>
            </div>
          </div>

          {/* Quick Message Form */}
          <form className="contact-form-area reveal-right visible" id="contactForm" onSubmit={handleSubmit}>
            <h3 style={{ fontFamily: "'Poppins',sans-serif", fontSize: '1.3rem', fontWeight: 600, marginBottom: '24px' }}>
              Kirim Pesan Cepat
            </h3>
            <div className="form-group">
              <label htmlFor="formName">Nama Lengkap</label>
              <input
                type="text"
                id="formName"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nama kamu..."
                autoComplete="off"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="formEmail">Email</label>
              <input
                type="email"
                id="formEmail"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="email@kamu.com"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="formMsg">Pesan</label>
              <textarea
                id="formMsg"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tuliskan pesan atau ide kolaborasimu..."
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              id="sendMsgBtn"
              disabled={btnState.disabled}
              style={{ marginTop: '8px', width: '100%', justifyContent: 'center', ...btnState.style }}
            >
              <span>🚀</span> {btnState.text}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
