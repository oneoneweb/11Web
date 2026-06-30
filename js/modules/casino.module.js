/* =====================================================
   🎰 CASINO MODULE (FINAL v5.7 PRODUCTION FIXED)
   FIX: GLOBAL DATA SYNC + FAVORITES COMPATIBILITY
===================================================== */

const CasinoModule = (() => {

  let root = null;
  let rawData = [];
  let currentView = "all";

  let favorites = new Set();

  let forYouIndex = 0;
  let forYouTimer = null;

  const FOR_YOU_SIZE = 10;
  const IMAGE_PATH = "assets/sites/";

  const CLICK_KEY = "casino_clicks";
  const FAVORITE_KEY = "casino_favorites";

  /* =====================================================
     INIT
  ===================================================== */
  async function init(containerId = "casino-root") {

    root = document.getElementById(containerId);
    if (!root) return;

    rawData = await window.FirebaseService.getSites();

    // 🔥 CRITICAL FIX: GLOBAL SHARE FOR FAVORITES + SEARCH
    window.CASINO_DATA = rawData;

    loadClicks();
    syncFavorites();

    forYouIndex = getTimeBasedIndex();

    startForYouLoop();
    render();
  }

  /* =====================================================
     LOAD DATA SAFE (fallback support)
  ===================================================== */
  function loadData() {

    rawData = Array.isArray(window.CASINO_DATA)
      ? [...window.CASINO_DATA]
      : [];

    rawData.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
  }

  /* =====================================================
     FAVORITES SYNC
  ===================================================== */
  function syncFavorites() {
    try {
      const saved = JSON.parse(localStorage.getItem(FAVORITE_KEY) || "[]");
      favorites = new Set(Array.isArray(saved) ? saved : []);
    } catch {
      favorites = new Set();
    }
  }

  function saveFavorites() {
    localStorage.setItem(FAVORITE_KEY, JSON.stringify([...favorites]));
  }

  function isFavorite(id) {
    return favorites.has(id);
  }

  function toggleFavorite(id) {

    if (!id) return;

    syncFavorites();

    if (favorites.has(id)) {
      favorites.delete(id);
    } else {
      favorites.add(id);
    }

    saveFavorites();

    window.dispatchEvent(new CustomEvent("FAVORITES_UPDATED"));

    render();
  }

  function getFavorites() {
    return [...favorites];
  }

  /* =====================================================
     CLICK TRACK
  ===================================================== */
  function loadClicks() {
    const saved = JSON.parse(localStorage.getItem(CLICK_KEY) || "{}");

    rawData.forEach(item => {
      item.clicks = saved[item.id] || 0;
    });
  }

  function saveClicks() {
    const obj = {};
    rawData.forEach(i => obj[i.id] = i.clicks || 0);
    localStorage.setItem(CLICK_KEY, JSON.stringify(obj));
  }

  function registerClick(id) {
    const item = rawData.find(x => x.id === id);
    if (!item) return;

    item.clicks = (item.clicks || 0) + 1;
    saveClicks();
  }

  /* =====================================================
     IMAGE
  ===================================================== */
  const getImage = (src) => {
    if (!src) return "";
    if (src.startsWith("http")) return src;
    return IMAGE_PATH + src;
  };

  /* =====================================================
     VIEW LOGIC
  ===================================================== */
  function getViewData() {

    if (currentView === "all") return rawData;

    if (currentView === "popular") {
      return [...rawData]
        .filter(x => (x.clicks || 0) > 0)
        .sort((a, b) => b.clicks - a.clicks);
    }

    if (currentView === "foryou") {
      return getForYouData();
    }

    return rawData;
  }

  function getForYouData() {

    const total = rawData.length;
    if (!total) return [];

    const result = [];

    for (let i = 0; i < FOR_YOU_SIZE; i++) {
      result.push(rawData[(forYouIndex + i) % total]);
    }

    return result;
  }

  function getTimeBasedIndex() {
    return Math.floor(Date.now() / 60000) % (rawData.length || 1);
  }

  /* =====================================================
     RENDER
  ===================================================== */
  function render() {

    if (!root) return;

    const data = getViewData();

    root.innerHTML = `
      <div class="casino-grid">

        ${data.map(item => `
          <div class="casino-card" data-id="${item.id}">

            <div class="card-front">

              <img class="casino-img" src="${getImage(item.image)}"/>

              <div class="site-name">${item.name || ""}</div>

              <div class="fav-btn" data-id="${item.id}">
                ${isFavorite(item.id) ? "❤️" : "🤍"}
              </div>

              <a class="play-btn"
                 href="${item.link}"
                 target="_blank"
                 rel="noopener noreferrer">
                 Play Now
              </a>

            </div>

            <div class="card-back">
              <img class="back-img"
                   src="${getImage(item.backImage || '11webback.webp')}"/>
            </div>

          </div>
        `).join("")}

      </div>
    `;

    bindEvents();
  }

  /* =====================================================
     EVENTS
  ===================================================== */
  function bindEvents() {

    if (!root) return;

    root.querySelectorAll(".casino-card").forEach(card => {
      card.onclick = (e) => {
        if (e.target.closest(".fav-btn")) return;
        if (e.target.closest(".play-btn")) return;
        card.classList.toggle("flipped");
      };
    });

    root.querySelectorAll(".fav-btn").forEach(btn => {
      btn.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(btn.dataset.id);
      };
    });

    root.querySelectorAll(".play-btn").forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();

        const id = btn.closest(".casino-card")?.dataset.id;
        registerClick(id);

        const item = rawData.find(x => String(x.id) === String(id));

        if (item && window.HistoryModule?.addEntry) {
          window.HistoryModule.addEntry({
            id: item.id,
            name: item.name,
            link: item.link
          });
        }
      };
    });
  }

  /* =====================================================
     LOOP
  ===================================================== */
  function startForYouLoop() {

    if (forYouTimer) clearInterval(forYouTimer);

    forYouTimer = setInterval(() => {

      if (currentView !== "foryou") return;

      const total = rawData.length;
      if (!total) return;

      forYouIndex = (forYouIndex + 1) % total;
      render();

    }, 60000);
  }

  function setView(view) {
    currentView = view;

    if (view === "foryou") {
      forYouIndex = getTimeBasedIndex();
    }

    render();
  }

  return {
    init,
    setView,
    toggleFavorite,
    registerClick,
    isFavorite,
    getFavorites
  };

})();

window.CasinoModule = CasinoModule;