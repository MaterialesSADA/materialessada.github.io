import { db } from './firebaseConfig.js';
import { doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";

const form = document.getElementById("editar-form");
const mensaje = document.getElementById("mensaje");

async function cargarFormulario() {
  const docRef = doc(db, "empresa", "info");
  const docSnap = await getDoc(docRef);

  const info = docSnap.exists()
    ? docSnap.data()
    : {
        sobreNosotros: "",
        direccion: "",
        telefono: "",
        email: "",
        footerDireccion: "",
        footerTelefono: "",
        footerEmail: "",
        footerBottom: "© 2024 Materiales SADA. Todos los derechos reservados."
      };

  document.getElementById("sobreNosotros").value = info.sobreNosotros;
  document.getElementById("direccion").value = info.direccion;
  document.getElementById("telefono").value = info.telefono;
  document.getElementById("email").value = info.email;
  document.getElementById("footerDireccion").value = info.footerDireccion;
  document.getElementById("footerTelefono").value = info.footerTelefono;
  document.getElementById("footerEmail").value = info.footerEmail;
  document.getElementById("footerBottom").value = info.footerBottom;
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nuevaInfo = {
    sobreNosotros: document.getElementById("sobreNosotros").value.trim(),
    direccion: document.getElementById("direccion").value.trim(),
    telefono: document.getElementById("telefono").value.trim(),
    email: document.getElementById("email").value.trim(),
    footerDireccion: document.getElementById("footerDireccion").value.trim(),
    footerTelefono: document.getElementById("footerTelefono").value.trim(),
    footerEmail: document.getElementById("footerEmail").value.trim(),
    footerBottom: document.getElementById("footerBottom").value.trim()
  };

  await setDoc(doc(db, "empresa", "info"), nuevaInfo);

  mensaje.textContent = "Información actualizada correctamente.";
  setTimeout(() => {
    mensaje.textContent = "";
  }, 3000);
});

window.addEventListener("DOMContentLoaded", cargarFormulario);
