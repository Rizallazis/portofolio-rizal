import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <p>
        Dibuat oleh <strong>Rizal Azis Nur Abdur Rasyid</strong>
        &nbsp;·&nbsp;
        <span id="footerYear">{currentYear}</span>
      </p>
    </footer>
  );
}
