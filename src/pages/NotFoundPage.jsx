import React from 'react';
import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className="not-found-page">
      <h1>404</h1>
      <p>Halaman yang Anda cari tidak ditemukan.</p>
      <Link to="/" className="button button--primary">Kembali ke Beranda</Link>
    </div>
  );
}

export default NotFoundPage;
