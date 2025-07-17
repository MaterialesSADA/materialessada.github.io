const carousel = document.getElementById("carousel");
const indicatorsContainer = document.getElementById("indicators");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let currentSlide = 0;

// Recuperar imágenes desde localStorage (simula base de datos)
function getCarouselImages() {
  return JSON.parse(localStorage.getItem("carouselImages")) || [];
}

// Renderizar las imágenes del carrusel
function renderCarousel() {
  const images = getCarouselImages();
  carousel.innerHTML = "";
  indicatorsContainer.innerHTML = "";

  if (images.length === 0) {
    carousel.innerHTML = `<div class="slide"><p>No hay imágenes cargadas.</p></div>`;
    return;
  }

  images.forEach((url, index) => {
    const slide = document.createElement("div");
    slide.className = "slide";
    slide.innerHTML = `<img src="${url}" alt="Anuncio ${index + 1}" />`;
    carousel.appendChild(slide);

    const indicator = document.createElement("span");
    indicator.className = "indicator";
    if (index === 0) indicator.classList.add("active");
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
    indicators[i].classList.toggle("active", i === index);
  });

  currentSlide = index;
}

// Navegación
prevBtn.addEventListener("click", () => {
  const total = getCarouselImages().length;
  const newIndex = (currentSlide - 1 + total) % total;
  showSlide(newIndex);
});

nextBtn.addEventListener("click", () => {
  const total = getCarouselImages().length;
  const newIndex = (currentSlide + 1) % total;
  showSlide(newIndex);
});

// Iniciar
renderCarousel();
