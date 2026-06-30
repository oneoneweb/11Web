const Shell = (() => {

  function init() {

    console.log("Shell initializing...");

    renderStaticLayout();
    bindGlobalEvents();

    // IMPORTANT BOOT ORDER FIX
    window.Topbar?.init?.();
    window.Navbar?.init?.();
  }

  /* ================= STATIC LAYOUT ================= */
  function renderStaticLayout() {

    // SIDE MENU placeholder
    const menu = document.getElementById("sideMenu");

    if (menu) {
      menu.innerHTML = `
        <div style="padding:20px;color:white;">
          <h3>Loading Menu...</h3>
        </div>
      `;
    }

    // ensure overlay hidden
    const overlay = document.getElementById("overlay");
    overlay?.classList.remove("active");
  }

  /* ================= GLOBAL EVENTS ================= */
  function bindGlobalEvents() {

    const overlay = document.getElementById("overlay");

    // close menu on overlay click
    overlay?.addEventListener("click", () => {
      document.getElementById("sideMenu")?.classList.remove("active");
      overlay.classList.remove("active");
    });

    // global click delegation
    document.addEventListener("click", (e) => {

      // MENU OPEN
      if (e.target.id === "menuBtn") {
        document.getElementById("sideMenu")?.classList.add("active");
        overlay?.classList.add("active");
      }

      // SEARCH NAV
      if (e.target.id === "searchBtn") {
        window.Router?.navigate?.("search");
      }

    });
  }

  return {
    init
  };

})();

/* ================= GLOBAL EXPORT ================= */
window.Shell = Shell;