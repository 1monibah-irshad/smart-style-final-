/* ============================================================
   Blushed Style — Frontend API Layer
   All fetch calls to the backend in one place.
   Backend runs on: http://localhost:5000
   ============================================================ */

const API_BASE = 'http://localhost:5000/api/v1';

// ── Token helpers ────────────────────────────────────────────
const getToken  = ()        => localStorage.getItem('bs_token');
const setToken  = (token)   => localStorage.setItem('bs_token', token);
const clearToken= ()        => { localStorage.removeItem('bs_token'); localStorage.removeItem('bs_user'); };
const getUser   = ()        => { try { return JSON.parse(localStorage.getItem('bs_user')); } catch { return null; } };
const setUser   = (user)    => localStorage.setItem('bs_user', JSON.stringify(user));

// ── Base fetch with auth header ──────────────────────────────
const apiFetch = async (endpoint, options = {}) => {
  const token = getToken();
  const headers = { ...options.headers };

  // Don't set Content-Type for FormData (browser sets it with boundary)
  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}${endpoint}`, { ...options, headers });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'Something went wrong');
  }
  return data;
};

// ── Auth guard: redirect to login if not authenticated ───────
const requireAuth = () => {
  const token = getToken();
  const inPages = window.location.pathname.includes('/pages/');
  if (!token) {
    window.location.href = inPages ? 'auth.html' : 'pages/auth.html';
    return false;
  }
  return true;
};

// ── Redirect to dashboard if already logged in ───────────────
const redirectIfLoggedIn = () => {
  const token = getToken();
  if (token) {
    const inPages = window.location.pathname.includes('/pages/');
    window.location.href = inPages ? 'dashboard.html' : 'pages/dashboard.html';
  }
};

// ── Load user info into the UI ───────────────────────────────
const loadUserUI = () => {
  const user = getUser();
  if (!user) return;
  document.querySelectorAll('.user-name').forEach(el => el.textContent = `${user.first_name} ${user.last_name || ''}`.trim());
  document.querySelectorAll('.user-av, .topbar-av').forEach(el => {
    if (user.avatar_url) {
      el.innerHTML = `<img src="${user.avatar_url}" style="width:100%;height:100%;border-radius:50%;object-fit:cover" alt="avatar"/>`;
    } else {
      el.textContent = user.first_name?.[0]?.toUpperCase() || 'S';
    }
  });
};

/* ============================================================
   AUTH API
   ============================================================ */
const Auth = {
  async signup(firstName, lastName, email, password) {
    const data = await apiFetch('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ first_name: firstName, last_name: lastName, email, password }),
    });
    setToken(data.token);
    setUser(data.user);
    return data;
  },

  async login(email, password) {
    const data = await apiFetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    setToken(data.token);
    setUser(data.user);
    return data;
  },

  logout() {
    clearToken();
    window.location.href = window.location.pathname.includes('/pages/') ? '../index.html' : 'index.html';
  },

  async getMe() {
    const data = await apiFetch('/auth/me');
    setUser(data.user);
    return data.user;
  },

  async forgotPassword(email) {
    return apiFetch('/auth/forgot-password', { method: 'POST', body: JSON.stringify({ email }) });
  },

  async resetPassword(token, password) {
    return apiFetch('/auth/reset-password', { method: 'POST', body: JSON.stringify({ token, password }) });
  },

  async updateProfile(data) {
    const result = await apiFetch('/auth/update-profile', { method: 'PATCH', body: JSON.stringify(data) });
    setUser(result.user);
    return result;
  },

  async changePassword(current_password, new_password) {
    return apiFetch('/auth/change-password', { method: 'PATCH', body: JSON.stringify({ current_password, new_password }) });
  },

  async uploadAvatar(file) {
    const form = new FormData();
    form.append('avatar', file);
    return apiFetch('/auth/upload-avatar', { method: 'POST', body: form });
  },
};

/* ============================================================
   WARDROBE API
   ============================================================ */
const Wardrobe = {
  // Get all items — optional filters: { category, search, occasion, season, sort }
  async getAll(filters = {}) {
    const params = new URLSearchParams(filters).toString();
    return apiFetch(`/wardrobe${params ? '?' + params : ''}`);
  },

  async getOne(id) {
    return apiFetch(`/wardrobe/${id}`);
  },

  // Upload image + item details
  async create(formData) {
    return apiFetch('/wardrobe', { method: 'POST', body: formData });
  },

  async update(id, formData) {
    return apiFetch(`/wardrobe/${id}`, { method: 'PUT', body: formData });
  },

  async delete(id) {
    return apiFetch(`/wardrobe/${id}`, { method: 'DELETE' });
  },

  async getStats() {
    return apiFetch('/wardrobe/stats');
  },
};

/* ============================================================
   OUTFITS API
   ============================================================ */
const Outfits = {
  // Generate outfits for an occasion
  async generate(occasion) {
    return apiFetch('/outfits/generate', { method: 'POST', body: JSON.stringify({ occasion }) });
  },

  async getSaved() {
    return apiFetch('/outfits/saved');
  },

  async getSavedById(id) {
    return apiFetch(`/outfits/saved/${id}`);
  },

  // Save an outfit combo — items is array of clothing item objects
  async save({ name, occasion, items, styling_tip, score }) {
    return apiFetch('/outfits/save', {
      method: 'POST',
      body: JSON.stringify({
        name,
        occasion,
        item_ids: items.map(i => i.id),
        styling_tip,
        score,
      }),
    });
  },

  async delete(id) {
    return apiFetch(`/outfits/saved/${id}`, { method: 'DELETE' });
  },
};

/* ============================================================
   EVENTS API
   ============================================================ */
const Events = {
  async getAll() {
    return apiFetch('/events');
  },

  async getUpcoming() {
    return apiFetch('/events/upcoming');
  },

  async getOne(id) {
    return apiFetch(`/events/${id}`);
  },

  async create(data) {
    return apiFetch('/events', { method: 'POST', body: JSON.stringify(data) });
  },

  async update(id, data) {
    return apiFetch(`/events/${id}`, { method: 'PUT', body: JSON.stringify(data) });
  },

  async delete(id) {
    return apiFetch(`/events/${id}`, { method: 'DELETE' });
  },
};

/* ============================================================
   DASHBOARD helper — loads all data for dashboard page
   ============================================================ */
const Dashboard = {
  async load() {
    const [wardrobeStats, savedOutfits, upcomingEvents] = await Promise.all([
      Wardrobe.getStats(),
      Outfits.getSaved(),
      Events.getUpcoming(),
    ]);
    return { wardrobeStats, savedOutfits, upcomingEvents };
  },
};
