const PRESETS = [
  { id: 'ig', name: 'Instagram', color: '#E1306C', url: h => `https://instagram.com/${h}` },
  { id: 'x',  name: 'X',         color: '#000000', url: h => `https://x.com/${h}` },
  { id: 'yt', name: 'YouTube',   color: '#C4302B', url: h => `https://youtube.com/@${h}` },
  { id: 'in', name: 'LinkedIn',  color: '#0A66C2', url: h => `https://linkedin.com/in/${h}` },
  { id: 'gh', name: 'GitHub',    color: '#24292F', url: h => `https://github.com/${h}` },
  { id: 'fb', name: 'Facebook',  color: '#1877F2', url: h => `https://facebook.com/${h}` },
  { id: 'tt', name: 'TikTok',    color: '#000000', url: h => `https://tiktok.com/@${h}` },
  { id: 'custom', name: 'Custom (full URL)', color: '#6750A4', url: h => h },
];

const links = [];
const platformSel = document.getElementById('platform');
const handleInput = document.getElementById('handle');
const listEl = document.getElementById('linkList');
const qrBox = document.getElementById('qrBox');

if (location.protocol === 'file:') {
  qrBox.insertAdjacentHTML('beforebegin',
    '<p style="background:#FFD8E4;border-radius:12px;padding:12px 16px;margin:0 0 12px">⚠️ Open this page at <b>http://localhost:8080/index.html</b> — a <code>file://</code> URL QR code cannot open on a phone.</p>');
}

PRESETS.forEach(p => {
  const o = document.createElement('option');
  o.value = p.id; o.textContent = p.name;
  platformSel.appendChild(o);
});

function cleanHandle(v) { return v.trim().replace(/^@/, ''); }

function renderList() {
  listEl.innerHTML = '';
  if (!links.length) {
    listEl.innerHTML = '<div class="empty">No links yet — add your first below.</div>';
    return;
  }
  links.forEach((l, i) => {
    const row = document.createElement('div');
    row.className = 'link-row';
    row.innerHTML = `
      <div class="chip" style="background:${l.color}">${l.short}</div>
      <div><div class="name">${l.name}</div><div class="handle">${l.display}</div></div>
      <div class="spacer"></div>
      <button class="icon-btn" data-i="${i}" title="Remove">✕</button>`;
    row.querySelector('button').onclick = () => { links.splice(i, 1); renderList(); };
    listEl.appendChild(row);
  });
}

document.getElementById('addBtn').onclick = () => {
  const preset = PRESETS.find(p => p.id === platformSel.value);
  const raw = handleInput.value.trim();
  if (!raw) { handleInput.focus(); return; }
  const isCustom = preset.id === 'custom';
  const h = isCustom ? raw : cleanHandle(raw);
  links.push({
    id: preset.id, name: preset.name, color: preset.color,
    short: isCustom ? '🔗' : preset.name.slice(0, 2).toUpperCase(),
    display: h, url: preset.url(h),
  });
  handleInput.value = '';
  renderList();
};

document.getElementById('genBtn').onclick = () => {
  if (!links.length) return;
  const params = links.map(l => `${l.id}=${encodeURIComponent(l.display)}`).join('&');
  const base = location.href.split('#')[0].replace(/index\.html$/, 'viewer.html');
  const target = `${base}#${params}`;
  const qr = qrcode(0, 'M');
  qr.addData(target);
  qr.make();
  qrBox.innerHTML = `<img alt="QR for your links" src="${qr.createDataURL(8, 2)}">
    <p class="hint" style="word-break:break-all">${target}</p>`;
};

renderList();
