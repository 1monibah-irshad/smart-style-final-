# 💗 Blushed Style — AI Virtual Wardrobe

A complete, beautiful pink & white frontend for an AI-powered virtual wardrobe web app, built for girls. Pure HTML, CSS, and JavaScript — no frameworks, no build step.

---

## 🚀 How to run in VS Code (2 steps)

### Step 1 — Install Live Server
1. Open VS Code
2. Press `Ctrl+Shift+X` (Extensions panel)
3. Search **"Live Server"** by Ritwick Dey
4. Click **Install**

### Step 2 — Open the project
1. In VS Code: `File → Open Folder` → select the `blushed-style-app` folder
2. Right-click on `index.html` in the Explorer
3. Click **"Open with Live Server"**
4. Your browser opens at `http://127.0.0.1:5500`
5. Done! ✨

> **Tip:** Every file you edit saves automatically and the browser refreshes live.

---

## 📁 Project Structure

```
blushed-style-app/
│
├── index.html              ← Landing page (start here)
├── 404.html                ← Not found page
│
├── pages/
│   ├── auth.html           ← Login & Signup
│   ├── dashboard.html      ← Main dashboard
│   ├── wardrobe.html       ← Wardrobe grid + upload
│   ├── outfits.html        ← AI outfit recommendations
│   ├── events.html         ← Events & calendar
│   ├── favorites.html      ← Saved looks
│   └── settings.html       ← Profile & preferences
│
├── assets/
│   ├── css/
│   │   └── global.css      ← Shared CSS variables & components
│   ├── js/
│   │   └── global.js       ← Shared JS utilities
│   └── images/             ← Add your images here
│
├── .vscode/
│   ├── settings.json       ← Live Server config
│   └── extensions.json     ← Recommended extensions
│
└── README.md               ← This file
```

---

## 🗺️ Page Navigation Map

```
index.html (Landing)
    │
    ├── Login button ──────────────→ pages/auth.html
    ├── Get Started button ────────→ pages/auth.html
    │
    └── After login ───────────────→ pages/dashboard.html
                                          │
                          ┌───────────────┼───────────────┐
                          ↓               ↓               ↓
                   wardrobe.html    outfits.html    events.html
                          │               │               │
                    Upload item    Generate outfit   Add event
                          │               │               │
                          └───────────────┴───────────────┘
                                          │
                          ┌───────────────┴───────────────┐
                          ↓                               ↓
                   favorites.html                  settings.html
                   (Saved looks)               (Profile & prefs)
```

---

## 🎨 Design System

| Token | Value | Use |
|-------|-------|-----|
| `--pink` | `#E75480` | Primary buttons, active states |
| `--pink-soft` | `#F4A7BB` | Hover borders, decorative |
| `--pink-pale` | `#FDEEF4` | Card backgrounds, tags |
| `--pink-deep` | `#C2185B` | Hover states, dark accent |
| `--bg3` | `#FDF6F9` | Page background |
| `--bg2` | `#FFF0F5` | Sidebar, section backgrounds |
| `--border` | `#F2C4D0` | All borders |
| `--text` | `#2D1B22` | Primary text |
| `--muted` | `#8B5A6B` | Secondary text |

**Fonts:**
- Headings: `Cormorant Garamond` (Google Fonts)
- Body/UI: `DM Sans` (Google Fonts)

---

## 📄 Pages Reference

| File | Description | Key features |
|------|-------------|--------------|
| `index.html` | Landing page | Hero, features, occasions, testimonials, CTA |
| `pages/auth.html` | Login & Signup | JWT-ready forms, password strength, forgot password modal |
| `pages/dashboard.html` | Dashboard | Stats, today's outfit, events, wardrobe grid, quick actions |
| `pages/wardrobe.html` | My Wardrobe | Filter/search, grid/list view, upload modal, edit/delete |
| `pages/outfits.html` | AI Stylist | Occasion picker, 3 outfit combos, save to favorites |
| `pages/events.html` | Events | Monthly calendar, event list, add event modal |
| `pages/favorites.html` | Saved Looks | Filter, sort, match scores, remove favorites |
| `pages/settings.html` | Settings | Profile, password, style prefs, notifications, plan, danger zone |

---

## 🔌 Connecting a Backend

This is a complete frontend. To make it fully functional:

### 1. Backend (Node.js + Express)
```bash
npm init -y
npm install express pg bcryptjs jsonwebtoken multer cloudinary cors dotenv nodemailer
```

### 2. Database (PostgreSQL)
- Free tier: [neon.tech](https://neon.tech)
- Run the SQL schema from the project prompt

### 3. Image Storage (Cloudinary)
- Free 25GB: [cloudinary.com](https://cloudinary.com)
- Replace `📸` emoji placeholders with real `<img>` tags

### 4. Connect API calls
- Replace `showToast('...')` stubs in forms with `fetch('/api/v1/...')`
- Store JWT token in `localStorage` after login
- Send `Authorization: Bearer <token>` header on protected requests

### 5. Hosting (all free tiers)
| Service | What for |
|---------|----------|
| [Vercel](https://vercel.com) | Frontend hosting |
| [Railway](https://railway.app) | Node.js backend |
| [Neon.tech](https://neon.tech) | PostgreSQL database |
| [Cloudinary](https://cloudinary.com) | Image storage |

---

## ✅ Features Checklist

### Frontend (complete ✓)
- [x] Landing page with animations
- [x] Login & Signup with validation
- [x] Dashboard with stats & activity
- [x] Wardrobe grid with filter/search
- [x] Clothing upload modal (drag & drop)
- [x] AI outfit recommendations (8 occasions)
- [x] Monthly event calendar
- [x] Favorites / saved looks
- [x] Settings with all sections
- [x] Mobile responsive (all pages)
- [x] Toast notifications
- [x] Pink & white theme throughout

### Backend (to build)
- [ ] User authentication (JWT)
- [ ] Wardrobe CRUD API
- [ ] Cloudinary image upload
- [ ] Outfit recommendation engine
- [ ] Events API
- [ ] Email reminders (Nodemailer)
- [ ] Password reset flow

---

## 👩‍💻 Built by

Blushed Style — a student startup project  
Stack: Pure HTML · CSS · JavaScript  
Theme: Pink & White · Girls fashion · AI-powered

---

*Made with ♡ for every girl's wardrobe*
