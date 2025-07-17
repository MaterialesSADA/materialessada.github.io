// Importar Firebase SDK
import { initializeApp, getApps, getApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-storage.js";

// Configuración del proyecto Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAvt2gcEF_LAcqjjGtscDVVXdsU7dFs2uc",
  authDomain: "sada-36b96.firebaseapp.com",
  projectId: "sada-36b96",
  storageBucket: "sada-36b96.appspot.com", // Corregido: dominio correcto para Firebase Storage
  messagingSenderId: "998976500687",
  appId: "1:998976500687:web:ff3561018e141d391758ba"
};

// Inicializar la app principal si no está ya inicializada
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Instancias para uso normal (auth principal del usuario actual)
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// ✅ Instancia secundaria solo para registrar usuarios (NO cierra sesión actual)
const secondaryApp = initializeApp(firebaseConfig, "Secondary");
export const secondaryAuth = getAuth(secondaryApp);
