/* =====================================================
   👤 PROFILE VIEW (FINAL FIXED STABLE)
===================================================== */

const ProfileView = (() => {

  let root = null;
  let timer = null;
  let bound = false;

  function render(container) {

    root = container;
    if (!root) return;

    draw();

    // prevent multiple interval bug
    if (!bound) {
      window.addEventListener("PROFILE_UPDATED", draw);
      bound = true;
    }

    // safe timer reset
    clearInterval(timer);
    timer = setInterval(() => {

      const page = window.Router?.currentPage;
      if (page !== "profile") {
        clearInterval(timer);
        return;
      }

      draw();

    }, 1000);
  }

  function draw() {

    if (!root) return;

    const user = window.ProfileService.getUser();
    const time = window.ProfileService.getTime();
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
              <input id="phone" placeholder="Phone" value="${user.phone || ""}" />
              <input id="birthday" type="date" value="${user.birthday || ""}" />

              <select id="gender">
                <option ${user.gender=="Male"?"selected":""}>Male</option>
                <option ${user.gender=="Female"?"selected":""}>Female</option>
              </select>

              <button id="saveBtn" class="btn-save">Save</button>
            </div>

            <button id="logoutBtn" class="btn-logout">Logout</button>
          `}

        </div>

        <div class="time-card">
          <div class="grid">
            <div class="box">${time.y}<span>Year</span></div>
            <div class="box">${time.mo}<span>Month</span></div>
            <div class="box">${time.d}<span>Day</span></div>
            <div class="box">${time.h}<span>Hour</span></div>
            <div class="box">${time.m}<span>Min</span></div>
            <div class="box">${time.s}<span>Sec</span></div>
          </div>
        </div>

      </section>
    `;

    bind();
  }

  function bind() {

    document.getElementById("loginBtn")?.addEventListener("click", () => {

      window.ProfileService.setUser({
        name: "Google User",
        email: "user@gmail.com",
        phone: "",
        birthday: "",
        gender: "Male"
      });
    });

    document.getElementById("saveBtn")?.addEventListener("click", () => {

      const u = window.ProfileService.getUser();

      u.phone = document.getElementById("phone").value;
      u.birthday = document.getElementById("birthday").value;
      u.gender = document.getElementById("gender").value;

      window.ProfileService.setUser(u);
    });

    document.getElementById("logoutBtn")?.addEventListener("click", () => {

      window.ProfileService.setUser(null);

      // stay on same page (NO ROUTER REDIRECT)
      draw();
    });
  }

  return { render };

})();

window.ProfileView = ProfileView;