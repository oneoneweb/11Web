const Topbar = (() => {

  let root;

  function init() {
    root = document.getElementById("topbar");
    render("home");
  }

  function render(page = "home") {

    if (!root) return;

    const titleMap = {
      home: "11Web",
      news: "News",
      search: "Search",
      favorites: "Favorites",
      profile: "Profile",
      history: "History"
    };

    const subtitleMap = {
      home: "Smart Web Access",
      news: "Latest Updates",
      search: "Find Content",
      favorites: "Saved Items",
      profile: "Your Account",
      history: "Activity Log"
    };

    root.innerHTML = `
      <div>

        <div id="menuBtn">☰</div>

        <div style="text-align:center;">
          <div class="topbar-title">
            ${titleMap[page] || "11Web"}
          </div>
          <div class="topbar-subtitle">
            ${subtitleMap[page] || ""}
          </div>
        </div>

        <div id="searchBtn">🔍</div>

      </div>
    `;
  }

  function update(page) {
    render(page);
  }

  return { init, update };

})();

window.Topbar = Topbar;