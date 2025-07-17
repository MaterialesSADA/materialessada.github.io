const infoDefault = {
      sobreNosotros:
        "En Materiales SADA, nos especializamos en ofrecer los mejores materiales para construcción en la región de Coatzacoalcos, Veracruz. Contamos con una amplia gama de productos de alta calidad y un excelente servicio al cliente.",
      direccion: "Lázaro Cárdenas No. 1705, Col. Puerto México, Coatzacoalcos, Ver.",
      telefono: "(+52) 9211101741",
      email: "m2gise@hotmail.com",
      footerDireccion: "Lázaro Cárdenas No. 1705 Col. Puerto México Coatzacoalcos, Ver.",
      footerTelefono: "(+52) 9211101741",
      footerEmail: "m2gise@hotmail.com",
    };

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

    function cargarFooterBottom() {
      const infoGuardada = localStorage.getItem("infoEmpresa");
      const info = infoGuardada ? JSON.parse(infoGuardada) : {};
      const textoDefault = "© 2024 Materiales SADA. Todos los derechos reservados.";

      document.getElementById("footer-bottom-text").textContent = info.footerBottom || textoDefault;
    }

    window.addEventListener("DOMContentLoaded", cargarFooterBottom);