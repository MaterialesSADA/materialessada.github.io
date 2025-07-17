import { initializeApp, getApps, getApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getAuth, setPersistence, browserLocalPersistence } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyAvt2gcEF_LAcqjjGtscDVVXdsU7dFs2uc",
  authDomain: "sada-36b96.firebaseapp.com",
  projectId: "sada-36b96",
  storageBucket: "sada-36b96.appspot.com",
  messagingSenderId: "998976500687",
  appId: "1:998976500687:web:ff3561018e141d391758ba"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Instancia secundaria para crear usuarios
const secondaryApp = initializeApp(firebaseConfig, "Secondary");
export const secondaryAuth = getAuth(secondaryApp);

// Configurar persistencia local para ambas instancias
setPersistence(auth, browserLocalPersistence)
  .catch((error) => {
    console.error("Error setting persistence for auth:", error);
  });

setPersistence(secondaryAuth, browserLocalPersistence)
  .catch((error) => {
    console.error("Error setting persistence for secondaryAuth:", error);
  });
