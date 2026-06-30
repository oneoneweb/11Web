/* =====================================================
   ℹ️ ABOUT VIEW (11WEB SPA - PROFESSIONAL EDITION)
   CLEAN • MODERN • APPLE STYLE • NO NUMBER LIST UI
===================================================== */

const AboutView = (() => {

  let root = null;

  function render(container) {

    root = container;

    if (!root) {
      console.error("AboutView: container missing");
      return;
    }

    draw();
  }

  function draw() {

    root.innerHTML = `
      <section class="about-page">

        <!-- HERO -->
        <div class="about-hero">
          <h1>About 11WEB</h1>
          <p>Smart Browser Navigation Platform</p>
        </div>

        <!-- INTRO -->
        <div class="about-card">
          <p>
            11WEB is a browser-based navigation platform designed to provide users with
            a fast, unified, and structured way to access third-party websites and online services.
          </p>
        </div>

        <!-- WHAT WE DO -->
        <div class="about-card">
          <h3>What We Do</h3>

          <p>Provide a unified browsing and navigation experience.</p>
          <p>Organize external websites in a structured interface.</p>
          <p>Offer fast access to online services from a single platform.</p>
          <p>Deliver a lightweight and mobile-first web experience.</p>
        </div>

        <!-- WHAT WE DON'T DO -->
        <div class="about-card danger">
          <h3>What We Do Not Do</h3>

          <p>We do not host or control external websites.</p>
          <p>We do not process payments or financial transactions.</p>
          <p>We do not operate gambling or betting services.</p>
          <p>We do not guarantee third-party content or availability.</p>
        </div>

        <!-- FEATURES -->
        <div class="about-card">
          <h3>Core Features</h3>

          <p>Fast single-page application navigation system.</p>
          <p>Clean dark UI optimized for mobile devices.</p>
          <p>Favorites and history tracking (local device only).</p>
          <p>Category-based browsing experience.</p>
        </div>

        <!-- PRIVACY -->
        <div class="about-card">
          <h3>Privacy & Data</h3>

          <p>
            11WEB does not require user registration.
            We do not collect personal identity data such as name, email, or phone number.
          </p>

          <p>
            Some anonymous usage data may be used only to improve performance and user experience.
          </p>
        </div>

        <!-- LIABILITY -->
        <div class="about-card warning">
          <h3>Legal Disclaimer</h3>

          <p>
            External websites accessed through 11WEB are fully independent and managed by their respective owners.
            Users are responsible for their own actions while using third-party services.
          </p>

          <p>
            11WEB is not responsible for financial loss, service interruption, or content changes on external platforms.
          </p>
        </div>

        <!-- VERSION -->
        <div class="about-footer">
          <span>Version 1.0</span>
        </div>

      </section>
    `;
  }

  return { render };

})();

window.AboutView = AboutView;