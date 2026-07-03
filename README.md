her# 🌐 11Web - Smart Web Access

A modern **Single Page Application (SPA)** built with vanilla JavaScript, Firebase, and modular architecture.  
This project is designed as a **PWA-ready web platform** and can be converted into an Android APK using WebView/PWA tools.

---

# 🚀 Live Features

- 🔥 Firebase Authentication (Login/Register)
- 📰 Dynamic News System
- 🎰 Casino / Content Modules
- ⭐ Favorites System
- 📜 History Tracking
- 👤 User Profile System
- 🔍 Search System
- ⚡ SPA Router (No page reload)
- 📱 Mobile-first responsive UI
- 🧠 Modular JS architecture

---

# 🧱 Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript (ES6 Modules)
- Firebase (Auth + Firestore)
- PWA (Manifest + SEO ready)
- GitHub Pages compatible

---

# 📁 Project Structure
11web/
│
├── 11web.apk
├── index.html
├── manifest.json
├── firebase.json
├── robots.txt
├── sitemap.xml
│
├── assets/
│   └── icon/
│       ├── 11web-192.png
│       └── 11web-512.png
│
├── css/
│   ├── components.css
│   ├── pages.css
│   └── history.css
│
├── js/
│
│   ├── app.js
│
│   ├── core/
│   │   ├── router.js
│   │   ├── state.js
│   │   ├── utils.js
│   │   └── events.js
│
│   ├── config/
│   │   ├── app.config.js
│   │   ├── firebase.config.js
│   │   ├── menu.config.js
│   │   └── banner.data.js
│
│   ├── layout/
│   │   ├── shell.js
│   │   ├── topbar.js
│   │   ├── navbar.js
│   │   └── menu.js
│
│   ├── views/
│   │   ├── home.view.js
│   │   ├── news.view.js
│   │   ├── search.view.js
│   │   ├── profile.view.js
│   │   ├── favorites.view.js
│   │   ├── history.view.js
│   │   ├── privacy.view.js
│   │   ├── terms.view.js
│   │   ├── contact.view.js
│   │   └── about.view.js
│
│   ├── ui/
│   │   ├── banner.js
│   │   ├── category.js
│   │   ├── news.card.js
│   │   ├── profile.card.js
│   │   └── profile.stats.js
│
│   ├── services/
│   │   ├── firebase.service.js
│   │   ├── auth.service.js
│   │   ├── api.service.js
│   │   ├── banner.service.js
│   │   ├── news.service.js
│   │   ├── favorites.service.js
│   │   ├── user.service.js
│   │   ├── stats.service.js
│   │   └── profile.service.js
│
│   ├── modules/
│   │   ├── news.module.js
│   │   ├── casino.module.js
│   │   ├── history.module.js
│   │   └── profile.module.js
│
│   ├── repositories/
│   │   └── banner.repository.js
│
│   └── data/
│       ├── profile.data.js
│       └── user.stats.data.js
│
└── js/legal/
    └── privacy.policy.js

---

# ⚙️ Installation (Local Setup)

```bash
# Clone repository
git clone https://oneoneweb.github.io/11Web/

# Open project folder
cd 11web

# Run using Live Server (recommended)
# Deploy retry
