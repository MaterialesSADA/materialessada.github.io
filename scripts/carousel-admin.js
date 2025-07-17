const uploadForm = document.getElementById("upload-form");
const imageInput = document.getElementById("image-input");
const previewContainer = document.getElementById("carousel-preview");

// API Key de imgbb (debes usar tu propia)
const IMGBB_API_KEY = "e8b72545a514b6da09673f2dc63502e9";

// Usamos localStorage como almacenamiento temporal de URLs (simula base de datos)
const STORAGE_KEY = "carouselImages";

// Cargar imágenes desde el almacenamiento
function loadImages() {
  previewContainer.innerHTML = "";
  const images = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

  images.forEach((url, index) => {
    const div = document.createElement("div");
    div.className = "carousel-item";
    div.innerHTML = `
      <img src="${url}" alt="Carrusel ${index}" />
      <button data-index="${index}">X</button>
    `;
    previewContainer.appendChild(div);
  });

  // Agrega funcionalidad a botones de eliminar
  document.querySelectorAll(".carousel-item button").forEach(btn => {
    btn.addEventListener("click", () => {
      const index = btn.dataset.index;
      deleteImage(index);
    });
  });
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
    throw new Error("Error al subir imagen");
  }
}

// Guardar imagen en localStorage
function saveImage(url) {
  const images = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  images.push(url);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(images));
  loadImages();
}

// Eliminar imagen
function deleteImage(index) {
  const images = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  images.splice(index, 1);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(images));
  loadImages();
}

// Manejador del formulario
uploadForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const file = imageInput.files[0];
  if (!file) return alert("Selecciona una imagen");

  try {
    const url = await uploadImage(file);
    saveImage(url);
    imageInput.value = ""; // limpiar input
  } catch (error) {
    alert("Error al subir imagen");
    console.error(error);
  }
});

// Cargar imágenes al iniciar
loadImages();
