/* =====================================================
   🎰 CASINO MODULE (FINAL v5.9 PRODUCTION FIX)
   FIX: WEB + APK GLOBAL CLICK SYNC (100% SAFE)
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
  const FAVORITE_KEY = "casino_favorites";

  /* =====================================================
     INIT
  ===================================================== */
  async function init(containerId = "casino-root") {

    root = document.getElementById(containerId);
    if (!root) return;

    rawData = await window.FirebaseService.getSites();

    await loadGlobalClicks();

    window.CASINO_DATA = rawData;

    syncFavorites();

    forYouIndex = getTimeBasedIndex();

    startForYouLoop();
    render();
  }

  /* =====================================================
     GLOBAL CLICK LOAD
  ===================================================== */
  async function loadGlobalClicks() {
    try {
      if (!window.FirebaseService?.getGlobalClicks) return;

      const globalClicks = await window.FirebaseService.getGlobalClicks();

      rawData.forEach(item => {
        item.clicks = Number(globalClicks[item.id] || item.clicks || 0);
      });

    } catch (e) {
      rawData.forEach(item => item.clicks = Number(item.clicks || 0));
    }
  }

  /* =====================================================
     CLICK HANDLER (🔥 WEBVIEW SAFE GLOBAL LISTENER)
  ===================================================== */
  function bindGlobalClick() {

    if (!root) return;

    root.addEventListener("click", async (e) => {

      const btn = e.target.closest(".play-btn");
      if (!btn) return;

      e.preventDefault();
      e.stopPropagation();

      const card = btn.closest(".casino-card");
      const id = card?.dataset?.id;

      const item = rawData.find(x => String(x.id) === String(id));

      if (!item) return;

      // UI instant update
      item.clicks = Number(item.clicks || 0) + 1;

      try {
        if (window.FirebaseService?.incrementSiteClick) {
          await window.FirebaseService.incrementSiteClick(id);
        }
      } catch (err) {
        console.error("Firebase click failed:", err);
      }

      // open link AFTER tracking
      window.open(btn.href, "_blank");

      // history save
      if (item && window.HistoryModule?.addEntry) {
        window.HistoryModule.addEntry({
          id: item.id,
          name: item.name,
          link: item.link
        });
      }

    });
  }

  /* =====================================================
     FAVORITES
  ===================================================== */
  function syncFavorites() {
    try {
      const saved = JSON.parse(localStorage.getItem(FAVORITE_KEY) || "[]");
      favorites = new Set(saved);
    } catch {
      favorites = new Set();
    }
  }

  function saveFavorites() {
    localStorage.setItem(FAVORITE_KEY, JSON.stringify([...favorites]));
  }

  function toggleFavorite(id) {

    if (!id) return;

    syncFavorites();

    if (favorites.has(id)) favorites.delete(id);
    else favorites.add(id);

    saveFavorites();

    window.dispatchEvent(new CustomEvent("FAVORITES_UPDATED"));

    render();
  }

  function isFavorite(id) {
    return favorites.has(id);
  }

  /* =====================================================
     VIEW LOGIC
  ===================================================== */
  function getViewData() {

    if (currentView === "all") return rawData;

    if (currentView === "popular") {
      return [...rawData]
        .filter(x => Number(x.clicks || 0) > 0)
        .sort((a, b) => Number(b.clicks || 0) - Number(a.clicks || 0));
    }

    if (currentView === "foryou") {
      const total = rawData.length;
      return Array.from({ length: FOR_YOU_SIZE }, (_, i) =>
        rawData[(forYouIndex + i) % total]
      );
    }

    return rawData;
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

              <img class="casino-img" src="${IMAGE_PATH + item.image}"/>

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
                   src="${IMAGE_PATH + (item.backImage || '11webback.webp')}"/>
            </div>

          </div>
        `).join("")}

      </div>
    `;

    bindGlobalClick();
    bindFavorite();
    bindFlip();
  }

  /* =====================================================
     SUPPORT EVENTS
  ===================================================== */
  function bindFlip() {
    root.querySelectorAll(".casino-card").forEach(card => {
      card.onclick = (e) => {
        if (e.target.closest(".fav-btn")) return;
        if (e.target.closest(".play-btn")) return;
        card.classList.toggle("flipped");
      };
    });
  }

  function bindFavorite() {
    root.querySelectorAll(".fav-btn").forEach(btn => {
      btn.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(btn.dataset.id);
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

  async function setView(view) {
    currentView = view;

    if (view === "popular") {
      await loadGlobalClicks();
    }

    if (view === "foryou") {
      forYouIndex = getTimeBasedIndex();
    }

    render();
  }

  return {
    init,
    setView,
    toggleFavorite,
    isFavorite
  };

})();

window.CasinoModule = CasinoModule;
