/* =====================================================
   📱 MENU SYSTEM (11WEB SPA - PRODUCTION FIXED)
   INTERNAL + EXTERNAL SAFE NAVIGATION
===================================================== */

const Menu = (() => {

  let menuEl, overlayEl, btnEl;

  let activePage = "home";

  /* ================= INIT ================= */
  function init() {

    menuEl = document.getElementById("sideMenu");
    overlayEl = document.getElementById("overlay");
    btnEl = document.getElementById("menuBtn");

    render();
    bind();
  }

  /* ================= MENU DATA ================= */
  function getData() {

    return window.MenuConfig || [];
  }

  /* ================= RENDER ================= */
  function render() {

    const data = getData();

    if (!menuEl) return;

    menuEl.innerHTML = `
      <div class="menu-header">
        <div class="menu-icon">☰</div>
        <div>
          <div class="menu-title">11Web</div>
          <div class="menu-subtitle">Smart Web Access</div>
        </div>
      </div>

      <div class="menu-body">
        ${data.map(i => {

          if (i.type === "divider") {
            return `<div class="menu-divider"></div>`;
          }

          if (i.type === "version") {
            return `<div class="menu-version">${i.label}</div>`;
          }

          const isActive = i.page === activePage ? "active" : "";

          return `
            <div class="menu-item ${isActive}" data-page="${i.page}">
              ${i.label}
            </div>
          `;

        }).join("")}
      </div>
    `;
  }

  /* ================= EVENTS ================= */
  function bind() {

    // open menu
    btnEl?.addEventListener("click", open);

    // close menu
    overlayEl?.addEventListener("click", close);

    // ESC close
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") close();
    });

    // menu click handler
    menuEl?.addEventListener("click", (e) => {

      const item = e.target.closest(".menu-item");
      if (!item) return;

      const page = item.dataset.page;
      if (!page) return;

      const config = getData().find(i => i.page === page);

      // ================= EXTERNAL LINK =================
      if (config?.url) {
        window.open(config.url, "_blank");
        close();
        return;
      }

      // ================= INTERNAL ROUTE =================
      if (page !== activePage) {
        setActive(page);
      }

      window.Router?.navigate?.(page);

      close();
    });

  }

  /* ================= ACTIVE STATE ================= */
  function setActive(page) {
    activePage = page;
    render();
  }

  /* ================= OPEN ================= */
  function open() {
    menuEl?.classList.add("active");
    overlayEl?.classList.add("active");
  }

  /* ================= CLOSE ================= */
  function close() {
    menuEl?.classList.remove("active");
    overlayEl?.classList.remove("active");
  }

  return {
    init,
    open,
    close,
    setActive
  };

})();

window.Menu = Menu;