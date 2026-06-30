window.AppConfig = {

  /* =========================
     🌐 APP BASIC INFO
  ========================= */
  appName: "11WEB",
  shortName: "11Web",
  version: "1.0.0",

  baseUrl: "https://oneoneweb.github.io/11Web/",

  /* =========================
     🔍 SEO CONFIG
  ========================= */
  seo: {
    defaultTitle: "11WEB - Smart Web Access",
    defaultDescription: "11WEB - News, Casino, Login and Smart Updates Platform",
    keywords: [
      "11web",
      "oneoneweb",
      "web11",
      "11 web",
      "casino",
      "bet",
      "login",
      "news",
      "1111",
      "one web"
    ]
  },

  /* =========================
     📰 NEWS CONFIG
  ========================= */
  news: {
    pageSize: 10,
    excerptLength: 120,
    enableLazyLoad: true
  },

  /* =========================
     🎨 UI CONFIG
  ========================= */
  ui: {
    theme: "dark",
    primaryColor: "#0b66ff",
    enableAnimations: true
  },

  /* =========================
     🔥 FIREBASE FLAGS
  ========================= */
  firebase: {
    enableAuth: true,
    enableFirestore: true
  },

  /* =========================
     ⚙️ FEATURE FLAGS
  ========================= */
  features: {
    newsFeed: true,
    casinoModule: true,
    profileSystem: true,
    favorites: true,
    history: true
  },

  /* =========================
     🚦 NAVIGATION RULES (NEW - SAFE ADDITION)
     (NO BREAKING CHANGE)
  ========================= */
  navigation: {

    // internal SPA routes only
    internalRoutes: [
      "home",
      "news",
      "search",
      "favorites",
      "history",
      "profile",
      "privacy",
      "terms",
      "contact",
      "about"
    ],

    // external domains allowed in app context
    externalAllowed: [
      "youtube.com",
      "facebook.com",
      "instagram.com"
    ],

    // payment / sensitive detection keywords
    paymentKeywords: [
      "payment",
      "pay",
      "checkout",
      "bank",
      "upi",
      "stripe",
      "paypal",
      "wallet"
    ],

    // behavior rules
    openExternalIn: "browser", // browser | app-webview (future android control)
    forceSPAInternal: true
  }

};