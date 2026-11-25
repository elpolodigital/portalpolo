// Ruta: firebase-init.js (raíz del repo). Se carga como módulo desde index.html.
// Sin bundler: los SDK se importan directo del CDN oficial de Firebase (gstatic).
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getAnalytics, isSupported } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyBVFtYZa91IsvATUWfaUuehnqOX-oHp3KU",
  authDomain: "portalpolo-864b8.firebaseapp.com",
  databaseURL: "https://portalpolo-864b8-default-rtdb.firebaseio.com",
  projectId: "portalpolo-864b8",
  storageBucket: "portalpolo-864b8.firebasestorage.app",
  messagingSenderId: "128951436308",
  appId: "1:128951436308:web:a9860cf1faa4f3e68f1301",
  measurementId: "G-43EF8XLFSG"
};

export const app = initializeApp(firebaseConfig);
export let analytics = null;

// Analytics no funciona sin red, en file:// ni con bloqueadores: se comprueba y no rompe el portal.
isSupported().then(function (ok) { if (ok) analytics = getAnalytics(app); }).catch(function () {});
