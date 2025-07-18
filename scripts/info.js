import { db } from './firebaseConfig.js';
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";

const infoDefault = {
  sobreNosotros: "En Materiales SADA, nos especializamos...",
  direccion: "Lázaro Cárdenas No. 1705...",
  telefono: "(+52) 9211101741",
  email: "m2gise@hotmail.com",
  footerDireccion: "Lázaro Cárdenas No. 1705...",
  footerTelefono: "(+52) 9211101741",
  footerEmail: "m2gise@hotmail.com",
  footerBottom: "© 2024 Materiales SADA. Todos los derechos reservados."
};

async function cargarInfo() {
  const docSnap = await getDoc(doc(db, "empresa", "info"));
  const info = docSnap.exists() ? docSnap.data() : infoDefault;

  document.getElementById("sobre-nosotros").textContent = info.sobreNosotros;
  document.getElementById("direccion").textContent = info.direccion;
  document.getElementById("telefono").textContent = info.telefono;
  document.getElementById("email").textContent = info.email;
  document.getElementById("footer-direccion").textContent = info.footerDireccion;
  document.getElementById("footer-telefono").textContent = info.footerTelefono;
  document.getElementById("footer-email").textContent = info.footerEmail;
  document.getElementById("footer-bottom-text").textContent = info.footerBottom;
}

window.addEventListener("DOMContentLoaded", cargarInfo);
