
/* =====================================================
   👤 PROFILE VIEW (PRODUCTION FIXED)
===================================================== */

const ProfileView = (() => {

  let root = null;
  let timer = null;
  let isBound = false;

  function render(container) {

    root = container;
    if (!root) return;

    draw();

    // SAFE EVENT BIND (with payload support)
    if (!isBound) {

      window.addEventListener("PROFILE_UPDATED", () => {
        draw();
      });

      isBound = true;
    }

    // SAFE TIMER (no router dependency crash)
    clearInterval(timer);

    timer = setInterval(() => {

      // safe check only (no hard dependency)
      if (window.Router && window.Router.getCurrentPage) {
        const page = window.Router.getCurrentPage();
        if (page !== "profile") return;
      }

      draw();

    }, 1500);
  }

  function draw() {

    if (!root) return;

    const user = window.ProfileService?.getUser();
    const time = window.ProfileService?.getTime();
    const isGuest = !user;

    root.innerHTML = `
      <section class="profile-page">

        <div class="profile-card">

          <div class="avatar">👤</div>

          <h2>${user?.name || "Guest User"}</h2>
          <p>${user?.email || "Not logged in"}</p>

          ${isGuest ? `
            <button id="loginBtn" class="btn-login">
              Continue with Google
            </button>
          ` : `
            <div class="form-box">

              <input id="phone" placeholder="Phone" value="${user?.phone || ""}" />
              <input id="birthday" type="date" value="${user?.birthday || ""}" />

              <select id="gender">
                <option value="Male" ${user?.gender === "Male" ? "selected" : ""}>Male</option>
                <option value="Female" ${user?.gender === "Female" ? "selected" : ""}>Female</option>
              </select>

              <button id="saveBtn" class="btn-save">Save</button>

            </div>

            <button id="logoutBtn" class="btn-logout">Logout</button>
          `}

        </div>

        <div class="time-card">
          <div class="grid">
            <div class="box">${time?.y || 0}<span>Year</span></div>
            <div class="box">${time?.mo || 0}<span>Month</span></div>
            <div class="box">${time?.d || 0}<span>Day</span></div>
            <div class="box">${time?.h || 0}<span>Hour</span></div>
            <div class="box">${time?.m || 0}<span>Min</span></div>
            <div class="box">${time?.s || 0}<span>Sec</span></div>
          </div>
        </div>

      </section>
    `;

    bind();
  }

  function bind() {

    document.getElementById("loginBtn")?.addEventListener("click", async () => {

      // 🔥 REAL GOOGLE LOGIN (NO FAKE DATA)
      if (window.AuthService?.loginWithGoogle) {
        await window.AuthService.loginWithGoogle();
      }

    });

    document.getElementById("saveBtn")?.addEventListener("click", () => {

      const u = window.ProfileService?.getUser();
      if (!u) return;

      u.phone = document.getElementById("phone").value;
      u.birthday = document.getElementById("birthday").value;
      u.gender = document.getElementById("gender").value;

      window.ProfileService.setUser(u);
    });

    document.getElementById("logoutBtn")?.addEventListener("click", async () => {

      if (window.AuthService?.logout) {
        await window.AuthService.logout();
      }

      window.ProfileService.setUser(null);

      draw();
    });
  }

  return { render };

})();

window.ProfileView = ProfileView;