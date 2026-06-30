
/* =====================================================
   👤 PROFILE SERVICE (FINAL STABLE CORE)
===================================================== */

const ProfileService = (() => {

  const KEY = "profile_user";
  const START = "profile_start_time";

  /* =========================
     GET USER
  ========================= */
  function getUser() {
    try {
      const data = localStorage.getItem(KEY);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.error("ProfileService getUser error:", e);
      return null;
    }
  }

  /* =========================
     SET USER
  ========================= */
  function setUser(user) {

    try {

      if (!user) {
        localStorage.removeItem(KEY);
      } else {
        localStorage.setItem(KEY, JSON.stringify(user));
      }

      // safe event trigger (no payload dependency)
      window.dispatchEvent(new Event("PROFILE_UPDATED"));

    } catch (e) {
      console.error("ProfileService setUser error:", e);
    }
  }

  /* =========================
     INIT TIME TRACKER
  ========================= */
  function initTime() {

    let t = localStorage.getItem(START);

    if (!t) {
      t = Date.now();
      localStorage.setItem(START, String(t));
    }

    return Number(t);
  }

  /* =========================
     GET TIME DIFFERENCE
  ========================= */
  function getTime() {

    const diff = Date.now() - initTime();

    const sec = Math.floor(diff / 1000);
    const min = Math.floor(sec / 60);
    const hr  = Math.floor(min / 60);
    const day = Math.floor(hr / 24);
    const month = Math.floor(day / 30);
    const year = Math.floor(day / 365);

    return {
      y: year,
      mo: month % 12,
      d: day % 30,
      h: hr % 24,
      m: min % 60,
      s: sec % 60
    };
  }

  return {
    getUser,
    setUser,
    getTime
  };

})();

/* expose globally */
window.ProfileService = ProfileService;