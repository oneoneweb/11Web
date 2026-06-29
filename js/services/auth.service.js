
/* =====================================================
   🔐 AUTH SERVICE (GOOGLE LOGIN + FIREBASE)
===================================================== */

const AuthService = (() => {

  let currentUser = null;

  /* =========================
     INIT AUTH STATE LISTENER
  ========================= */
  function init() {

    if (!window.firebase || !firebase.auth) {
      console.error("❌ Firebase Auth not loaded");
      return;
    }

    firebase.auth().onAuthStateChanged(async (user) => {

      if (user) {

        currentUser = {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          photo: user.photoURL
        };

        console.log("✅ USER LOGGED IN:", currentUser);

        // Sync to Profile Service
        if (window.ProfileService) {

          const existing = window.ProfileService.getUser() || {};

          window.ProfileService.setUser({
            ...existing,
            uid: user.uid,
            name: user.displayName,
            email: user.email,
            photo: user.photoURL
          });

        }

      } else {
        currentUser = null;
        console.log("⚠️ USER LOGGED OUT");
      }

    });

  }

  /* =========================
     GOOGLE LOGIN
  ========================= */
  async function loginWithGoogle() {

    try {

      const provider = new firebase.auth.GoogleAuthProvider();

      const result = await firebase.auth().signInWithPopup(provider);

      const user = result.user;

      currentUser = {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        photo: user.photoURL
      };

      console.log("🚀 GOOGLE LOGIN SUCCESS:", currentUser);

      // Save to ProfileService immediately
      if (window.ProfileService) {

        const existing = window.ProfileService.getUser() || {};

        window.ProfileService.setUser({
          ...existing,
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          photo: user.photoURL
        });

      }

      return currentUser;

    } catch (error) {
      console.error("❌ GOOGLE LOGIN ERROR:", error);
      return null;
    }
  }

  /* =========================
     LOGOUT
  ========================= */
  async function logout() {

    try {
      await firebase.auth().signOut();
      currentUser = null;
      console.log("👋 LOGOUT SUCCESS");
    } catch (e) {
      console.error("❌ LOGOUT ERROR:", e);
    }

  }

  /* =========================
     GET USER
  ========================= */
  function getUser() {
    return currentUser;
  }

  /* =========================
     IS LOGGED IN
  ========================= */
  function isLoggedIn() {
    return !!currentUser;
  }

  return {
    init,
    loginWithGoogle,
    logout,
    getUser,
    isLoggedIn
  };

})();

/* expose globally */
window.AuthService = AuthService;