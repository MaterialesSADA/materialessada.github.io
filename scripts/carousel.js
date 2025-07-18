import { db } from "./firebaseConfig.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";

const carousel = document.getElementById("carousel");
const indicatorsContainer = document.getElementById("indicators");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let currentSlide = 0;
let carouselImages = [];
let autoSlideInterval;

// Obtener imágenes desde Firestore
async function fetchCarouselImages() {
  try {
    const snapshot = await getDocs(collection(db, "carousel"));
    carouselImages = snapshot.docs.map(doc => doc.data().url);
    renderCarousel();
    startAutoSlide(); // Iniciar después de renderizar
  } catch (error) {
    console.error("Error al obtener imágenes del carrusel:", error);
  }
}

// Renderizar las imágenes del carrusel
function renderCarousel() {
  carousel.innerHTML = "";
  indicatorsContainer.innerHTML = "";

  if (carouselImages.length === 0) {
    carousel.innerHTML = `<div class="slide"><p>No hay imágenes cargadas.</p></div>`;
    return;
  }

  carouselImages.forEach((url, index) => {
    const slide = document.createElement("div");
    slide.className = "slide";
    slide.innerHTML = `<img src="${url}" alt="Anuncio ${index + 1}" />`;
    carousel.appendChild(slide);

    const indicator = document.createElement("span");
    indicator.className = "indicator";
    if (index === 0) indicator.classList.add("active");
    indicator.addEventListener("click", () => {
      stopAutoSlide();
      showSlide(index);
      startAutoSlide();
    });
    indicatorsContainer.appendChild(indicator);
  });

  showSlide(0);
}

// Mostrar una imagen según el índice
function showSlide(index) {
  const slides = document.querySelectorAll(".slide");
  const indicators = document.querySelectorAll(".indicator");

  if (slides.length === 0) return;

  slides.forEach((slide, i) => {
    slide.style.display = i === index ? "block" : "none";
    indicators[i]?.classList.toggle("active", i === index);
  });

  currentSlide = index;
}

// Ir a la siguiente imagen
function nextSlide() {
  const total = carouselImages.length;
  const newIndex = (currentSlide + 1) % total;
  showSlide(newIndex);
}

// Iniciar cambio automático
function startAutoSlide() {
  stopAutoSlide(); // por si ya había uno
  autoSlideInterval = setInterval(nextSlide, 5000); // cada 5 segundos
}

// Detener cambio automático
function stopAutoSlide() {
  if (autoSlideInterval) {
    clearInterval(autoSlideInterval);
    autoSlideInterval = null;
  }
}

// Botones manuales
prevBtn.addEventListener("click", () => {
  stopAutoSlide();
  const total = carouselImages.length;
  const newIndex = (currentSlide - 1 + total) % total;
  showSlide(newIndex);
  startAutoSlide();
});

nextBtn.addEventListener("click", () => {
  stopAutoSlide();
  const total = carouselImages.length;
  const newIndex = (currentSlide + 1) % total;
  showSlide(newIndex);
  startAutoSlide();
});

// Iniciar
fetchCarouselImages();
