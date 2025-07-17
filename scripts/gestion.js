function cargarInfo() {
  let infoGuardada = localStorage.getItem("infoEmpresa");
  let info = infoGuardada ? JSON.parse(infoGuardada) : infoDefault;

  document.getElementById("sobre-nosotros").textContent = info.sobreNosotros;
  document.getElementById("direccion").textContent = info.direccion;
  document.getElementById("telefono").textContent = info.telefono;
  document.getElementById("email").textContent = info.email;

  document.getElementById("footer-direccion").textContent = info.footerDireccion;
  document.getElementById("footer-telefono").textContent = info.footerTelefono;
  document.getElementById("footer-email").textContent = info.footerEmail;
  
}

window.addEventListener("DOMContentLoaded", cargarInfo);

const form = document.getElementById("editar-form");
const mensaje = document.getElementById("mensaje");

// Cargar info actual en el formulario al abrir
function cargarFormulario() {
  let infoGuardada = localStorage.getItem("infoEmpresa");
  let info = infoGuardada
    ? JSON.parse(infoGuardada)
    : {
        sobreNosotros: "",
        direccion: "",
        telefono: "",
        email: "",
        footerDireccion: "",
        footerTelefono: "",
        footerEmail: "",
        footerBottom: ""
      };

  document.getElementById("sobreNosotros").value = info.sobreNosotros || "";
  document.getElementById("direccion").value = info.direccion || "";
  document.getElementById("telefono").value = info.telefono || "";
  document.getElementById("email").value = info.email || "";

  document.getElementById("footerDireccion").value = info.footerDireccion || "";
  document.getElementById("footerTelefono").value = info.footerTelefono || "";
  document.getElementById("footerEmail").value = info.footerEmail || "";
  document.getElementById("footerBottom").value = info.footerBottom || "© 2024 Materiales SADA. Todos los derechos reservados.";
}

form.addEventListener("submit", (e) => {
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

  localStorage.setItem("infoEmpresa", JSON.stringify(nuevaInfo));

  mensaje.textContent = "Información actualizada correctamente.";
  setTimeout(() => {
    mensaje.textContent = "";
  }, 3000);
});

// Cargar info al abrir el formulario
window.addEventListener("DOMContentLoaded", cargarFormulario);