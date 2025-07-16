import { auth, db } from "./firebaseConfig.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";

const userNameSpan = document.getElementById("user-name");
const userNameSpanMobile = document.getElementById("user-name-mobile"); // Nuevo para móvil
const moduleFrame = document.getElementById("module-frame");
const navLinks = document.querySelectorAll(".navbar a");
const accountLink = document.getElementById("account-link");
const logoutButton = document.getElementById("logout-button");
const accountLinkMobile = document.getElementById("account-link-mobile"); // Nuevo móvil
const logoutButtonMobile = document.getElementById("logout-button-mobile"); // Nuevo móvil
const usersLink = document.getElementById("users-link"); // Enlace gestión usuarios

const hamburgerBtn = document.getElementById("hamburger-btn");
const mobileMenu = document.getElementById("mobile-menu");

// Crear overlay para cerrar menú al hacer clic fuera
const overlay = document.createElement("div");
overlay.id = "overlay";
document.body.appendChild(overlay);

// Función para abrir/cerrar menú hamburguesa
function toggleMenu() {
    const isOpen = mobileMenu.classList.toggle("open");
    hamburgerBtn.setAttribute("aria-expanded", isOpen);
    if (isOpen) {
        overlay.classList.add("active");
    } else {
        overlay.classList.remove("active");
    }
}

hamburgerBtn.addEventListener("click", toggleMenu);

overlay.addEventListener("click", () => {
    mobileMenu.classList.remove("open");
    hamburgerBtn.setAttribute("aria-expanded", false);
    overlay.classList.remove("active");
});

// Cerrar menú hamburguesa al seleccionar un enlace (móvil)
mobileMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        if (mobileMenu.classList.contains("open")) {
            mobileMenu.classList.remove("open");
            hamburgerBtn.setAttribute("aria-expanded", false);
            overlay.classList.remove("active");
        }
    });
});

// Actualizar iframe según enlace clickeado (escritorio y móvil)
navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
        event.preventDefault();
        const page = link.dataset.page;
        moduleFrame.src = `/screens/${page}`;
        navLinks.forEach((l) => l.classList.remove("active"));
        link.classList.add("active");

        // Cerrar menú hamburguesa si está abierto (por si se usa en móvil)
        if (mobileMenu.classList.contains("open")) {
            mobileMenu.classList.remove("open");
            hamburgerBtn.setAttribute("aria-expanded", false);
            overlay.classList.remove("active");
        }
    });
});

// Cambiar iframe al dar clic en datos de cuenta (escritorio)
accountLink.addEventListener("click", () => {
    moduleFrame.src = "/screens/cuenta.html";
    navLinks.forEach((l) => l.classList.remove("active"));
});

// Cambiar iframe al dar clic en datos de cuenta (móvil)
accountLinkMobile.addEventListener("click", () => {
    moduleFrame.src = "/screens/cuenta.html";
    navLinks.forEach((l) => l.classList.remove("active"));

    // Cerrar menú hamburguesa móvil
    mobileMenu.classList.remove("open");
    hamburgerBtn.setAttribute("aria-expanded", false);
    overlay.classList.remove("active");
});

// Cerrar sesión (escritorio)
logoutButton.addEventListener("click", async () => {
    try {
        await auth.signOut();
        window.location.href = "/screens/login.html";
    } catch (error) {
        console.error("Error al cerrar sesión:", error);
        alert("Hubo un problema al cerrar sesión. Intenta nuevamente.");
    }
});

// Cerrar sesión (móvil)
logoutButtonMobile.addEventListener("click", async () => {
    try {
        await auth.signOut();
        window.location.href = "/screens/login.html";
    } catch (error) {
        console.error("Error al cerrar sesión:", error);
        alert("Hubo un problema al cerrar sesión. Intenta nuevamente.");
    }
});

// Verificar el tipo de cuenta y setear nombre de usuario en ambos menús
auth.onAuthStateChanged(async (user) => {
    if (user) {
        userNameSpan.textContent = user.email;
        if (userNameSpanMobile) userNameSpanMobile.textContent = user.email;

        const userRef = doc(db, "Usuarios", user.uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
            const userData = userDoc.data();

            if (userData.tipoCuenta === "empleado") {
                usersLink.style.display = "none";

                if (window.location.pathname.includes("usuarios.html")) {
                    window.location.href = "/screens/inventario.html";
                }
            }
        }
    } else {
        userNameSpan.textContent = "Usuario";
        if (userNameSpanMobile) userNameSpanMobile.textContent = "Usuario";
    }
});
