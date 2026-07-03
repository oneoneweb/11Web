const FirebaseService = (() => {  
  
  const db = firebase.firestore();  
  
  async function getSites() {  
    const snap = await db.collection("sites").orderBy("createdAt", "desc").get();  
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));  
  }  
  
  async function getNews() {  
    const snap = await db.collection("news").orderBy("createdAt", "desc").get();  
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));  
  }  
  
  async function getBanners() {  
    const snap = await db.collection("banners").orderBy("createdAt", "desc").get();  
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));  
  }  
  
  async function getGlobalClicks() {  
    try {  
      const snap = await db.collection("siteClicks").get();  
  
      const clicks = {};  
  
      snap.docs.forEach(doc => {  
        const data = doc.data() || {};  
        clicks[doc.id] = Number(data.clicks || 0);  
      });  
  
      return clicks;  
    } catch (error) {  
      console.error("❌ Failed to load global clicks:", error);  
      return {};  
    }  
  }  
  
  async function incrementSiteClick(siteId) {  
    if (!siteId) return false;  
  
    try {  
      await db.collection("siteClicks").doc(String(siteId)).set({  
        siteId: String(siteId),  
        clicks: firebase.firestore.FieldValue.increment(1),  
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()  
      }, { merge: true });  
  
      return true;  
    } catch (error) {  
      console.error("❌ Failed to update global click:", error);  
      return false;  
    }  
  }  
  
  return {  
    getSites,  
    getNews,  
    getBanners,  
    getGlobalClicks,  
    incrementSiteClick  
  };  
  
})();  
  
window.FirebaseService = FirebaseService;  
