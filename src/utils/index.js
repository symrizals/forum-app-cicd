function postedAt(date) {
  const now = new Date();
  const posted = new Date(date);
  const diffInSeconds = Math.floor((now - posted) / 1000);

  const units = [
    { name: 'tahun', seconds: 31536000 },
    { name: 'bulan', seconds: 2592000 },
    { name: 'minggu', seconds: 604800 },
    { name: 'hari', seconds: 86400 },
    { name: 'jam', seconds: 3600 },
    { name: 'menit', seconds: 60 },
    { name: 'detik', seconds: 1 },
  ];

  for (let i = 0; i < units.length; i += 1) {
    const { name, seconds } = units[i];
    const interval = Math.floor(diffInSeconds / seconds);

    if (interval >= 1) {
      return `${interval} ${name} yang lalu`;
    }
  }

  return 'Baru saja';
}

function stripHtml(html) {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || '';
}

export { postedAt, stripHtml };
