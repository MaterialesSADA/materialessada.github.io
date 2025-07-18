const hamburger = document.getElementById("hamburger");
const sidebar = document.getElementById("sidebar");
const closeSidebar = document.getElementById("closeSidebar");

hamburger.addEventListener("click", () => {
  sidebar.style.left = "0";
});

closeSidebar.addEventListener("click", () => {
  sidebar.style.left = "-250px";
});

import { db } from './firebaseConfig.js';
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";

const footerDefault = { 
  direccion: "Lázaro Cárdenas No. 1705 Col. Puerto México Coatzacoalcos, Ver.",
  telefono: "(+52) 9211101741",
  email: "m2gise@hotmail.com",
  footerBottom: "© 2024 Materiales SADA. Todos los derechos reservados."
};

async function cargarFooter() {
  try {
    const docSnap = await getDoc(doc(db, "empresa", "info"));
    const info = docSnap.exists() ? docSnap.data() : footerDefault;

    document.getElementById("footer-direccion").textContent = "Dirección: " + (info.footerDireccion || info.direccion);
    document.getElementById("footer-telefono").textContent = "Teléfono: " + (info.footerTelefono || info.telefono);
    document.getElementById("footer-email").textContent = "Email: " + (info.footerEmail || info.email);
  } catch (error) {
    console.error("Error al cargar el footer:", error);
    // Mostrar datos por defecto en caso de error
    document.getElementById("footer-direccion").textContent = "Dirección: " + footerDefault.direccion;
    document.getElementById("footer-telefono").textContent = "Teléfono: " + footerDefault.telefono;
    document.getElementById("footer-email").textContent = "Email: " + footerDefault.email;
  }
}

async function cargarFooterBottom() {
  try {
    const docSnap = await getDoc(doc(db, "empresa", "info"));
    const info = docSnap.exists() ? docSnap.data() : {};

    const textoDefault = "© 2024 Materiales SADA. Todos los derechos reservados.";
    document.getElementById("footer-bottom-text").textContent = info.footerBottom || textoDefault;
  } catch (error) {
    console.error("Error al cargar el footer bottom:", error);
    document.getElementById("footer-bottom-text").textContent = "© 2024 Materiales SADA. Todos los derechos reservados.";
  }
}

window.addEventListener("DOMContentLoaded", () => {
  cargarFooter();
  cargarFooterBottom();
});
