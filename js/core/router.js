/* =====================================================
   🚦 ROUTER (PRODUCTION HYBRID UPGRADE)
===================================================== */

const Router = (() => {

  let currentPage = "home";
  let isTransitioning = false;

  const viewMap = {
    home: "HomeView",
    news: "NewsView",
    search: "SearchView",
    favorites: "FavoritesView",
    history: "HistoryView",
    profile: "ProfileView",
    privacy: "PrivacyView",
    terms: "TermsView",
    contact: "ContactView",
    about: "AboutView"
  };

  /* ================= INIT ================= */
  function init() {
    bindLinks();
    navigate("home", true);
  }

  /* ================= CURRENT PAGE ================= */
  function getCurrentPage() {
    return currentPage;
  }

  /* ================= NAVIGATE ================= */
  function navigate(page, initial = false) {

    if (!page || isTransitioning) return;

    currentPage = page;

    if (initial) {
      render(page);
      syncUI(page);
      return;
    }

    transition(page);
    syncUI(page);
  }

  /* ================= TRANSITION ================= */
  function transition(page) {

    const root = document.getElementById("app-view");
    if (!root) return;

    isTransitioning = true;

    root.classList.add("page-exit");

    setTimeout(() => {

      render(page);

      root.classList.remove("page-exit");
      root.classList.add("page-enter");

      requestAnimationFrame(() => {
        root.classList.add("page-enter-active");
      });

      setTimeout(() => {
        root.classList.remove("page-enter", "page-enter-active");
        isTransitioning = false;
      }, 250);

    }, 120);
  }

  /* ================= RENDER ================= */
  function render(page) {

    const root = document.getElementById("app-view");
    if (!root) return;

    root.innerHTML = "";

    const viewName = viewMap[page];
    const view = window[viewName];

    if (view && typeof view.render === "function") {

      view.render(root);

      requestAnimationFrame(() => {

        if (page === "home") {
          window.Category?.reset?.();
          window.Category?.init?.("category-root");
        }

      });

      return;
    }

    root.innerHTML = `
      <div style="padding:20px;color:white;">
        <h3>404 View Not Found</h3>
      </div>
    `;
  }

  /* ================= UI SYNC ================= */
  function syncUI(page) {
    window.Topbar?.update?.(page);
    window.Navbar?.update?.(page);
  }

  /* =====================================================
     🧠 LINK CONTROL ENGINE (CORE)
  ===================================================== */

  function isExternalLink(url) {
    try {
      if (!url) return false;
      if (url.startsWith("mailto:") || url.startsWith("tel:")) return true;
      if (url.startsWith("#")) return false;

      const u = new URL(url, window.location.href);
      return u.origin !== window.location.origin;

    } catch (e) {
      return false;
    }
  }

  function isPaymentLink(url) {
    const keywords = [
      "payment", "pay", "checkout", "bank", "upi", "stripe", "paypal"
    ];

    return keywords.some(k => url.toLowerCase().includes(k));
  }

  /* =====================================================
     🚀 NEW: CENTRALIZED EXTERNAL HANDLER
  ===================================================== */

  function handleExternalClick(e, href) {

    if (!href) return;

    // payment → external safe browser
    if (isPaymentLink(href)) {
      e?.preventDefault?.();
      window.open(href, "_blank", "noopener,noreferrer");
      return true;
    }

    // external site → browser
    if (isExternalLink(href)) {
      e?.preventDefault?.();
      window.open(href, "_blank", "noopener,noreferrer");
      return true;
    }

    return false;
  }

  /* =====================================================
     🚀 NEW: CATEGORY HOOK
  ===================================================== */

  function handleCategoryChange(tab) {
    console.log("📂 Category changed:", tab);

    // future: analytics / filtering / casino engine sync
  }

  /* =====================================================
     🚀 NEW: BANNER HOOK
  ===================================================== */

  function handleBannerClick(href, e) {
    return handleExternalClick(e, href);
  }

  /* =====================================================
     LINK BIND
  ===================================================== */

  function bindLinks() {

    document.addEventListener("click", (e) => {

      const pageEl = e.target.closest("[data-page]");
      if (pageEl) {
        e.preventDefault();
        navigate(pageEl.dataset.page);
        return;
      }

      const link = e.target.closest("a");
      if (!link) return;

      const href = link.getAttribute("href");
      if (!href || href === "#") return;

      if (href.startsWith("#")) return;

      // CENTRAL CONTROL
      const handled = handleExternalClick(e, href);
      if (handled) return;

    }, true);

  }

  return {
    init,
    navigate,
    getCurrentPage,

    // exposed hooks
    handleExternalClick,
    handleCategoryChange,
    handleBannerClick
  };

})();

window.Router = Router;