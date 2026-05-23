/* ============================================================
   Blushed Style — Global JavaScript Utilities
   Sidebar, toast, navigation helpers shared by all pages
   ============================================================ */

/* ── Sidebar toggle (mobile) ── */
function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
  document.getElementById('sidebarOverlay').classList.toggle('show');
}
function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sidebarOverlay').classList.remove('show');
}

/* ── Toast notification ── */
function showToast(msg, duration = 2800) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.style.transform = 'translateY(0)';
  t.style.opacity = '1';
  t.style.pointerEvents = 'auto';
  clearTimeout(t._timer);
  t._timer = setTimeout(() => {
    t.style.transform = 'translateY(20px)';
    t.style.opacity = '0';
    t.style.pointerEvents = 'none';
  }, duration);
}

/* ── Resolve page path (works from both root and /pages/) ── */
function resolvePath(page) {
  const inPages = window.location.pathname.includes('/pages/');
  const paths = {
    'index':     inPages ? '../index.html'          : 'index.html',
    'auth':      inPages ? 'auth.html'              : 'pages/auth.html',
    'dashboard': inPages ? 'dashboard.html'         : 'pages/dashboard.html',
    'wardrobe':  inPages ? 'wardrobe.html'          : 'pages/wardrobe.html',
    'outfits':   inPages ? 'outfits.html'           : 'pages/outfits.html',
    'events':    inPages ? 'events.html'            : 'pages/events.html',
    'favorites': inPages ? 'favorites.html'         : 'pages/favorites.html',
    'settings':  inPages ? 'settings.html'          : 'pages/settings.html',
  };
  return paths[page] || '#';
}

/* ── Build the standard sidebar HTML ── */
function buildSidebar(activePage) {
  const items = [
    { key: 'dashboard', icon: '🏠', label: 'Dashboard',  badge: null },
    { key: 'wardrobe',  icon: '👗', label: 'My Wardrobe', badge: '8' },
    { key: 'outfits',   icon: '✨', label: 'Outfits',     badge: null },
    { key: 'events',    icon: '📅', label: 'Events',      badge: '4' },
    { key: 'favorites', icon: '♡',  label: 'Favorites',   badge: null },
  ];
  const acct = [
    { key: 'settings', icon: '⚙', label: 'Settings', badge: null },
    { key: 'auth',     icon: '↩', label: 'Logout',   badge: null },
  ];

  const navHTML = (list) => list.map(it => `
    <a href="${resolvePath(it.key)}" class="nav-item ${activePage === it.key ? 'active' : ''}">
      <span class="nav-icon">${it.icon}</span> ${it.label}
      ${it.badge ? `<span class="nav-badge">${it.badge}</span>` : ''}
    </a>
  `).join('');

  return `
    <div class="sidebar-overlay" id="sidebarOverlay" onclick="closeSidebar()"></div>
    <aside class="sidebar" id="sidebar">
      <a href="${resolvePath('index')}" class="sidebar-logo">Blushed<span>.</span>Style</a>
      <nav class="sidebar-nav">
        <div class="nav-section-label">Main</div>
        ${navHTML(items)}
        <div class="nav-section-label" style="margin-top:8px">Account</div>
        ${navHTML(acct)}
      </nav>
      <div class="sidebar-bottom">
        <div class="user-card">
          <div class="user-av">S</div>
          <div>
            <div class="user-name">Sana Malik</div>
            <div class="user-plan">Free plan</div>
          </div>
        </div>
      </div>
    </aside>
  `;
}

/* ── Inject sidebar into any page ── */
function injectSidebar(activePage) {
  const wrap = document.getElementById('sidebarWrap');
  if (wrap) wrap.innerHTML = buildSidebar(activePage);
}

/* ── Password visibility toggle ── */
function togglePw(inputId, btnId) {
  const inp = document.getElementById(inputId);
  const btn = document.getElementById(btnId);
  if (!inp || !btn) return;
  inp.type = inp.type === 'password' ? 'text' : 'password';
  btn.textContent = inp.type === 'password' ? '👁' : '🙈';
}

/* ── Password strength checker ── */
function checkPasswordStrength(pw, seg1, seg2, seg3, seg4, labelId) {
  const segs = [seg1, seg2, seg3, seg4].map(id => document.getElementById(id));
  const label = labelId ? document.getElementById(labelId) : null;
  const checks = [pw.length >= 8, /[A-Z]/.test(pw), /[0-9]/.test(pw), /[^A-Za-z0-9]/.test(pw)];
  const score = checks.filter(Boolean).length;
  const classes = ['', 'weak', 'fair', 'good', 'strong'];
  const labels  = ['', 'Weak', 'Fair', 'Good', 'Strong 💪'];
  const colors  = ['', '#ef9a9a', '#ffcc80', '#a5d6a7', '#66bb6a'];
  segs.forEach((s, i) => { if (s) { s.className = 'strength-seg'; if (i < score) s.classList.add(classes[score]); } });
  if (label) { label.textContent = pw.length > 0 ? labels[score] : ''; label.style.color = colors[score]; }
}

/* ── Email validator ── */
function isValidEmail(val) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());
}

/* ── Set input state (error / success) ── */
function setInputState(id, state) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.remove('error', 'success');
  if (state) el.classList.add(state);
}

/* ── Show / hide field error ── */
function showErr(id)  { const el = document.getElementById(id); if (el) el.classList.add('show'); }
function hideErr(id)  { const el = document.getElementById(id); if (el) el.classList.remove('show'); }

/* ── Animate a number counter ── */
function animateNumber(elementId, target, duration = 1200) {
  const el = document.getElementById(elementId);
  if (!el) return;
  let start = 0;
  const step = Math.ceil(target / (duration / 30));
  const iv = setInterval(() => {
    start = Math.min(start + step, target);
    el.textContent = start;
    if (start >= target) clearInterval(iv);
  }, 30);
}

/* ── Close modals on Escape key ── */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.show').forEach(m => m.classList.remove('show'));
  }
});
