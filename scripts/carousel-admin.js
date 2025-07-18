import { db } from "./firebaseConfig.js";
import { collection, addDoc, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";

const uploadForm = document.getElementById("upload-form");
const imageInput = document.getElementById("image-input");
const previewContainer = document.getElementById("carousel-preview");

const IMGBB_API_KEY = "e8b72545a514b6da09673f2dc63502e9";
const CAROUSEL_COLLECTION = "carousel";

// Cargar imágenes desde Firestore
async function loadImages() {
  previewContainer.innerHTML = "";

  try {
    const querySnapshot = await getDocs(collection(db, CAROUSEL_COLLECTION));
    querySnapshot.forEach((docSnap) => {
      const url = docSnap.data().url;
      const id = docSnap.id;

      const div = document.createElement("div");
      div.className = "carousel-item";
      div.innerHTML = `
        <img src="${url}" alt="Carrusel" />
        <button data-id="${id}">X</button>
      `;
      previewContainer.appendChild(div);
    });

    // Botones de eliminar
    document.querySelectorAll(".carousel-item button").forEach(btn => {
      btn.addEventListener("click", async () => {
        const id = btn.dataset.id;
        await deleteImage(id);
      });
    });

  } catch (error) {
    console.error("Error al cargar imágenes desde Firestore:", error);
  }
}

// Subir imagen a imgbb
async function uploadImage(file) {
  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
    method: "POST",
    body: formData
  });

  const data = await res.json();
  if (data.success) {
    return data.data.url;
  } else {
    throw new Error("Error al subir imagen a imgbb");
  }
}

// Guardar URL en Firestore
async function saveImage(url) {
  try {
    await addDoc(collection(db, CAROUSEL_COLLECTION), { url });
    loadImages(); // recargar
  } catch (error) {
    console.error("Error al guardar imagen en Firestore:", error);
  }
}

// Eliminar imagen por ID de documento en Firestore
async function deleteImage(id) {
  try {
    await deleteDoc(doc(db, CAROUSEL_COLLECTION, id));
    loadImages();
  } catch (error) {
    console.error("Error al eliminar imagen:", error);
  }
}

// Manejador del formulario
uploadForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const file = imageInput.files[0];
  if (!file) return alert("Selecciona una imagen");

  try {
    const url = await uploadImage(file);
    await saveImage(url);
    imageInput.value = ""; // limpiar input
  } catch (error) {
    alert("Error al subir imagen");
    console.error(error);
  }
});

// Cargar imágenes al iniciar
loadImages();
