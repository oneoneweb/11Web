/* =====================================================
   🏠 HOME VIEW (PRODUCTION SAFE VERSION)
   FILE: js/views/home.view.js
===================================================== */

const HomeView = (() => {

  function render(root) {

    if (!root) return;

    root.innerHTML = `
      <section class="home-page">

        <!-- ================= BANNER ================= -->
        <div class="home-banner-section">
          <div id="banner"></div>
        </div>

        <!-- ================= CATEGORY (BELOW BANNER) ================= -->
        <div class="home-category-section">
          <div id="category-root"></div>
        </div>

        <!-- ================= CASINO (FUTURE SAFE AREA) ================= -->
        <div class="home-casino-section">
          <div id="casino-root"></div>
        </div>

        <!-- ================= FUTURE CONTENT ================= -->
        <div class="home-content"></div>

      </section>
    `;

    /* =====================================================
       ⚡ SAFE INIT ORDER (CRITICAL FIX)
    ===================================================== */
    setTimeout(() => {

      // 1️⃣ Banner first (needs layout width)
      window.Banner?.init?.();

      // 2️⃣ Category under banner
      window.Category?.init?.("category-root");

      // 3️⃣ Casino module (if exists)
      window.CasinoModule?.init?.("casino-root");

    }, 0);
  }

  return { render };

})();

window.HomeView = HomeView;