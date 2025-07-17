const hamburger = document.getElementById("hamburger");
const sidebar = document.getElementById("sidebar");
const closeSidebar = document.getElementById("closeSidebar");

hamburger.addEventListener("click", () => {
  sidebar.style.left = "0";
});

closeSidebar.addEventListener("click", () => {
  sidebar.style.left = "-250px";
});

const footerDefault = {
      direccion: "Lázaro Cárdenas No. 1705 Col. Puerto México Coatzacoalcos, Ver.",
      telefono: "(+52) 9211101741",
      email: "m2gise@hotmail.com"
    };

    function cargarFooter() {
      const infoGuardada = localStorage.getItem("infoEmpresa");
      const info = infoGuardada ? JSON.parse(infoGuardada) : footerDefault;

      document.getElementById("footer-direccion").textContent = "Dirección: " + (info.footerDireccion || info.direccion);
      document.getElementById("footer-telefono").textContent = "Teléfono: " + (info.footerTelefono || info.telefono);
      document.getElementById("footer-email").textContent = "Email: " + (info.footerEmail || info.email);
    }

    window.addEventListener("DOMContentLoaded", cargarFooter);

    function cargarFooterBottom() {
      const infoGuardada = localStorage.getItem("infoEmpresa");
      const info = infoGuardada ? JSON.parse(infoGuardada) : {};
      const textoDefault = "© 2024 Materiales SADA. Todos los derechos reservados.";

      document.getElementById("footer-bottom-text").textContent = info.footerBottom || textoDefault;
    }

    window.addEventListener("DOMContentLoaded", cargarFooterBottom);