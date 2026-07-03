const FirebaseService = (() => {

  const db = firebase.firestore();

  /* =====================================================
     BASIC DATA
  ===================================================== */

  async function getSites() {
    const snap = await db.collection("sites")
      .orderBy("createdAt", "desc")
      .get();

    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  }

  async function getNews() {
    const snap = await db.collection("news")
      .orderBy("createdAt", "desc")
      .get();

    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  }

  async function getBanners() {
    const snap = await db.collection("banners")
      .orderBy("createdAt", "desc")
      .get();

    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  }

  /* =====================================================
     GLOBAL CLICK SYSTEM (OPTIMIZED)
  ===================================================== */

  async function getGlobalClicks() {
    try {
      const snap = await db.collection("siteClicks").get();

      const clicks = {};

      snap.forEach(doc => {
        const data = doc.data();
        clicks[doc.id] = Number(data.clicks || 0);
      });

      return clicks;

    } catch (error) {
      console.error("❌ getGlobalClicks failed:", error);
      return {};
    }
  }

  /* =====================================================
     SAFE INCREMENT (FIXED FOR WEBVIEW + APK)
  ===================================================== */

  async function incrementSiteClick(siteId) {

    if (!siteId) return false;

    try {

      const ref = db.collection("siteClicks").doc(String(siteId));

      await db.runTransaction(async (transaction) => {

        const doc = await transaction.get(ref);

        if (!doc.exists) {
          transaction.set(ref, {
            siteId: String(siteId),
            clicks: 1,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
          });
        } else {
          const newCount = (doc.data().clicks || 0) + 1;

          transaction.update(ref, {
            clicks: newCount,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
          });
        }

      });

      return true;

    } catch (error) {
      console.error("❌ incrementSiteClick failed:", error);
      return false;
    }
  }

  /* =====================================================
     RETURN
  ===================================================== */

  return {
    getSites,
    getNews,
    getBanners,
    getGlobalClicks,
    incrementSiteClick
  };

})();

window.FirebaseService = FirebaseService;
