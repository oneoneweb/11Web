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

    console.log("🔍 Loading View:", page, viewName, view);

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

  /* ================= LINK HANDLER ================= */
  function bindLinks() {

    document.addEventListener("click", (e) => {
      const el = e.target.closest("[data-page]");
      if (!el) return;
      navigate(el.dataset.page);
    });

  }

  return { init, navigate };

})();

window.Router = Router;