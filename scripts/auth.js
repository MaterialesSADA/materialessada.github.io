import { auth, db } from './firebaseConfig.js'; 

import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";

let logoutTimeout = null;

onAuthStateChanged(auth, async (user) => {
    // Si el usuario está autenticado, cancela cualquier redirección pendiente
    if (logoutTimeout) {
        clearTimeout(logoutTimeout);
        logoutTimeout = null;
    }

    if (user) {
        const uid = user.uid;

        try {
            const userDocRef = doc(db, "Usuarios", uid);
            const userDoc = await getDoc(userDocRef);

            if (userDoc.exists()) {
                const userData = userDoc.data();
                const tipoCuenta = userData.tipoCuenta;

                localStorage.setItem("tipoCuenta", tipoCuenta);

                const rolesPermitidos = ["admin", "empleado"];
                if (!rolesPermitidos.includes(tipoCuenta)) {
                    alert("No tienes permisos para acceder.");
                    window.location.href = "/screens/login.html";
                }
            } else {
                console.error("No se encontró el documento del usuario.");
                window.location.href = "/screens/login.html";
            }

        } catch (error) {
            console.error("Error al obtener datos del usuario:", error);
            window.location.href = "/screens/login.html";
        }

    } else {
        logoutTimeout = setTimeout(() => {
            window.location.href = "/screens/login.html";
        }, 1500);
    }
});
