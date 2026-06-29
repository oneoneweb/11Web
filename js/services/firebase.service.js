
const FirebaseService = (() => {

  const db = firebase.firestore();

  async function getSites() {
    const snap = await db.collection("sites").orderBy("createdAt","desc").get();
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  }

  async function getNews() {
    const snap = await db.collection("news").orderBy("createdAt","desc").get();
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  }

  async function getBanners() {
    const snap = await db.collection("banners").orderBy("createdAt","desc").get();
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  }

  return { getSites, getNews, getBanners };

})();

window.FirebaseService = FirebaseService;
