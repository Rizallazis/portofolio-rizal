# 📁 Panduan Konten — Portfolio Rizal Azis

Dokumen ini menjelaskan cara menambahkan konten (foto, sertifikat, CV) ke website portofoliomu.

---

## 🗂️ Struktur Folder

```
Porto/
├── index.html
├── css/style.css
├── js/script.js
└── assets/
    ├── cv/
    │   └── Rizal_CV.pdf          ← CV kamu di sini
    └── images/
        ├── profile.jpg           ← Foto profil (langsung di folder ini)
        ├── portfolio/
        │   ├── design/           ← Poster, foto editing, konten IG
        │   ├── documentation/    ← Foto & video event
        │   └── digital/          ← Feed IG, campaign, desain edukasi
        └── certificates/         ← Foto/scan sertifikat
```

---

## 👤 Mengganti Foto Profil

1. Siapkan fotomu (sebaiknya **format .jpg**, rasio **1:1**, minimal 400x400px)
2. Simpan di: `assets/images/profile.jpg`
3. Website akan otomatis mendeteksi & menampilkan foto tersebut ✅

---

## 🎨 Menambahkan Item Portfolio

### 1. Simpan gambar di folder yang sesuai:

| Kategori | Folder |
|---|---|
| Editing & Desain | `assets/images/portfolio/design/` |
| Dokumentasi | `assets/images/portfolio/documentation/` |
| Konten Digital | `assets/images/portfolio/digital/` |

### 2. Buka `index.html`, cari `<!-- Grid -->` di bagian Portfolio

### 3. Tambahkan atau ganti item berikut:

```html
<!-- Untuk DESIGN -->
<div class="portfolio-item" data-cat="design" data-title="Judul Karya" data-desc="Deskripsi singkat">
  <img src="assets/images/portfolio/design/nama-file.jpg" alt="Judul Karya" class="portfolio-img" />
  <div class="portfolio-overlay">
    <div class="overlay-icon">🔍</div>
    <h4>Judul Karya</h4>
    <p>Desain & Ilustrasi · Keterangan</p>
  </div>
</div>

<!-- Untuk DOKUMENTASI -->
<div class="portfolio-item" data-cat="doc" ... >

<!-- Untuk KONTEN DIGITAL -->
<div class="portfolio-item" data-cat="digital" ... >
```

> **Tips:** Ganti `data-cat="design"` sesuai kategori (`design`, `doc`, `digital`)

---

## 🏆 Menambahkan Sertifikat

1. Simpan foto sertifikat di: `assets/images/certificates/cert-nama.jpg`
2. Buka `index.html`, cari bagian **Sertifikat & Pelatihan**
3. Salin dan sesuaikan template card:

```html
<div class="cert-card">
  <div class="cert-img-wrap">
    <img src="assets/images/certificates/cert-nama.jpg" alt="Sertifikat" />
    <span class="cert-badge">Training</span>  <!-- Training / Seminar / Workshop / Sertifikat -->
  </div>
  <div class="cert-body">
    <h4>Nama Sertifikat / Pelatihan</h4>
    <div class="cert-issuer">Nama Lembaga Penerbit</div>
    <p>Deskripsi singkat tentang sertifikat ini...</p>
    <div class="cert-date">📅 2024</div>
  </div>
</div>
```

---

## 📄 Mengganti CV

1. Export CV kamu ke format **PDF**
2. Simpan di: `assets/cv/Rizal_CV.pdf`
3. Tombol "Download CV" di Hero sudah otomatis mengarah ke file ini ✅

---

## 📞 Mengisi Data Kontak

Buka `index.html` dan cari komentar `<!-- TODO: -->`:

```html
<!-- Email -->
<a href="mailto:EMAILMU@gmail.com" ...>

<!-- WhatsApp (format: 62 + nomor tanpa 0 di depan) -->
<a href="https://wa.me/628123456789" ...>

<!-- Instagram -->
<a href="https://instagram.com/USERNAMEMU" ...>
```

Juga ganti di `js/script.js` baris:
```js
const phone = '628123456789'; // Nomor WA kamu
```

---

## 🏛️ Menambahkan Pengalaman Organisasi / Kepanitiaan

### Organisasi baru (dengan beberapa jabatan):
Salin blok `<div class="exp-group">` dan sesuaikan kontennya.

### Kepanitiaan / Volunteer baru (single card):
Salin blok `<div class="exp-standalone">` dan sesuaikan kontennya.

---

## 🚀 Tips Format Gambar

| Kegunaan | Format | Ukuran Ideal |
|---|---|---|
| Foto profil | JPG | 400×400 px |
| Portfolio item | JPG/PNG | 800×600 px |
| Sertifikat | JPG | 1200×850 px |

---

*Selamat mengisi portfolio kamu! 🎉*
