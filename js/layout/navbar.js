const Navbar = (() => {

  let root;

  /* ================= INIT ================= */
  function init() {
    root = document.getElementById("bottomNav");
    render("home");
    bindEvents();
  }

  /* ================= RENDER ================= */
  function render(active = "home") {

    if (!root) return;

    root.innerHTML = `
      <div class="nav ${active === "home" ? "active" : ""}" data-page="home">🏠</div>
      <div class="nav ${active === "news" ? "active" : ""}" data-page="news">📰</div>
      <div class="nav ${active === "favorites" ? "active" : ""}" data-page="favorites">❤️</div>
    `;
  }

  /* ================= EVENTS ================= */
  function bindEvents() {

    document.addEventListener("click", (e) => {

      const item = e.target.closest("#bottomNav .nav");
      if (!item) return;

      const page = item.dataset.page;

      if (!page) return;

      window.Router?.navigate?.(page);
    });
  }

  /* ================= UPDATE ================= */
  function update(page) {
    render(page);
  }

  return {
    init,
    update
  };

})();

/* ================= EXPORT ================= */
window.Navbar = Navbar;
