const META = {
  ig: { name: 'Instagram', color: '#E1306C', short: 'IG', url: h => `https://instagram.com/${h}` },
  x:  { name: 'X',         color: '#000000', short: 'X',  url: h => `https://x.com/${h}` },
  yt: { name: 'YouTube',   color: '#C4302B', short: 'YT', url: h => `https://youtube.com/@${h}` },
  in: { name: 'LinkedIn',  color: '#0A66C2', short: 'IN', url: h => `https://linkedin.com/in/${h}` },
  gh: { name: 'GitHub',    color: '#24292F', short: 'GH', url: h => `https://github.com/${h}` },
  fb: { name: 'Facebook',  color: '#1877F2', short: 'FB', url: h => `https://facebook.com/${h}` },
  tt: { name: 'TikTok',    color: '#000000', short: 'TT', url: h => `https://tiktok.com/@${h}` },
};
const list = document.getElementById('list');
const hash = location.hash.replace(/^#/, '');
const pairs = hash ? hash.split('&').map(s => {
  const i = s.indexOf('=');
  return [decodeURIComponent(s.slice(0, i)), decodeURIComponent(s.slice(i + 1))];
}) : [];
let count = 0;
for (const [id, val] of pairs) {
  if (id === 'custom') {
    const a = document.createElement('a');
    a.className = 'row'; a.href = val; a.target = '_blank'; a.rel = 'noopener';
    a.innerHTML = `<div class="chip" style="background:#6750A4">🔗</div>
      <div><div class="name">Website</div><div class="handle">${val}</div></div>`;
    list.appendChild(a); count++;
    continue;
  }
  const m = META[id];
  if (!m) continue;
  const a = document.createElement('a');
  a.className = 'row'; a.href = m.url(val); a.target = '_blank'; a.rel = 'noopener';
  a.innerHTML = `<div class="chip" style="background:${m.color}">${m.short}</div>
    <div><div class="name">${m.name}</div><div class="handle">@${val}</div></div>`;
  list.appendChild(a); count++;
}
if (!count) list.innerHTML = '<p style="color:#49454F">No links encoded in this URL.</p>';
