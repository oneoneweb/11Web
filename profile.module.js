/* =====================================================
   👤 PROFILE MODULE (v1 CORE ENGINE)
   GOOGLE AUTH READY • LIFETIME USAGE TRACKER
   LOCAL + FIREBASE COMPATIBLE
===================================================== */

const ProfileModule = (() => {

  const STORAGE_KEY = "profile_data_v1";
  const TIME_KEY = "profile_lifetime_time_v1";

  let user = null;
  let timer = null;

  /* ===============================
     INIT USER
  =============================== */
  function setUser(data) {
    if (!data) return;

    user = {
      id: data.uid || "guest",
      name: data.displayName || "Guest User",
      email: data.email || "",
      photo: data.photoURL || "",
      phone: data.phoneNumber || ""
    };

    saveProfile();
    initLifetime();
  }

  /* ===============================
     GET USER
  =============================== */
  function getUser() {
    if (user) return user;

    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }

  /* ===============================
     SAVE PROFILE
  =============================== */
  function saveProfile() {
    if (!user) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  }

  /* ===============================
     LIFETIME USAGE ENGINE
  =============================== */
  function initLifetime() {

    if (!user) return;

    const data = getLifetime();

    if (!data.firstVisit) {
      data.firstVisit = Date.now();
    }

    data.lastActive = Date.now();

    saveLifetime(data);

    if (timer) clearInterval(timer);

    timer = setInterval(() => {

      const t = getLifetime();

      t.totalSeconds = (t.totalSeconds || 0) + 1;
      t.lastActive = Date.now();

      saveLifetime(t);

      window.dispatchEvent(new Event("PROFILE_STATS_UPDATED"));

    }, 1000);
  }

  /* ===============================
     GET LIFETIME DATA
  =============================== */
  function getLifetime() {
    try {
      const raw = localStorage.getItem(TIME_KEY);
      return raw ? JSON.parse(raw) : { totalSeconds: 0 };
    } catch {
      return { totalSeconds: 0 };
    }
  }

  /* ===============================
     SAVE LIFETIME DATA
  =============================== */
  function saveLifetime(data) {
    localStorage.setItem(TIME_KEY, JSON.stringify(data));
  }

  /* ===============================
     FORMAT TIME
  =============================== */
  function formatTime(seconds) {

    const min = Math.floor(seconds / 60);
    const hour = Math.floor(min / 60);
    const day = Math.floor(hour / 24);
    const year = Math.floor(day / 365);

    if (year > 0) {
      return `${year}y ${day % 365}d`;
    }

    if (day > 0) {
      return `${day}d ${hour % 24}h`;
    }

    if (hour > 0) {
      return `${hour}h ${min % 60}m`;
    }

    return `${min}m ${seconds % 60}s`;
  }

  /* ===============================
     GET STATS
  =============================== */
  function getStats() {

    const lifetime = getLifetime();

    return {
      visits: Number(localStorage.getItem("sites_visit") || 0),
      history: Number(localStorage.getItem("history_count") || 0),
      favourites: Number(localStorage.getItem("favourites_count") || 0),
      usage: formatTime(lifetime.totalSeconds || 0)
    };
  }

  return {
    setUser,
    getUser,
    getStats,
    initLifetime
  };

})();

window.ProfileModule = ProfileModule;