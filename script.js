// --- 1. MENU MOBILE (TOGGLE) ---
const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    mainNav.classList.toggle("active");
  });
}

// Fecha o menu ao clicar em um link
const navLinks = document.querySelectorAll(".main-nav a");
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("active");
  });
});

// --- 2. HERO SLIDER VERTICAL ---
const heroSlides = document.querySelectorAll(".hero-slide");
let currentHeroIndex = 0;
const slideInterval = 5000;

if (heroSlides.length > 0) {
  setInterval(() => {
    const currentSlide = heroSlides[currentHeroIndex];
    let nextHeroIndex = (currentHeroIndex + 1) % heroSlides.length;
    const nextSlide = heroSlides[nextHeroIndex];

    currentSlide.classList.remove("active");
    currentSlide.classList.add("exiting");

    nextSlide.classList.remove("waiting");
    nextSlide.classList.add("active");

    setTimeout(() => {
      currentSlide.classList.remove("exiting");
      currentSlide.classList.add("waiting");
    }, 1200);

    currentHeroIndex = nextHeroIndex;
  }, slideInterval);
}

// --- 3. COVER FLOW 3D + PAGINAÇÃO (VÍDEOS) ---
const cards = document.querySelectorAll(".video-card-3d");
const dotsContainer = document.getElementById("paginationDots");
let activeIndex = 0;
const totalCards = cards.length;

if (totalCards > 0 && dotsContainer) {
  // Cria as bolinhas dinamicamente
  function createDots() {
    dotsContainer.innerHTML = "";
    for (let i = 0; i < totalCards; i++) {
      const dot = document.createElement("div");
      dot.classList.add("dot");
      if (i === 0) dot.classList.add("active");

      dot.onclick = () => {
        activeIndex = i;
        updateCarousel();
      };
      dotsContainer.appendChild(dot);
    }
  }

  // Atualiza estado visual das bolinhas
  function updateDots() {
    const dots = document.querySelectorAll(".dot");
    dots.forEach((dot, index) => {
      if (index === activeIndex) {
        dot.classList.add("active");
      } else {
        dot.classList.remove("active");
      }
    });
  }

  // Atualiza posições do Carrossel 3D
  function updateCarousel() {
    cards.forEach((card, index) => {
      card.classList.remove("active", "prev", "next", "hidden");
      const video = card.querySelector("video");
      if (video) {
        video.pause();
        video.currentTime = 0;
      }

      let prevIndex = (activeIndex - 1 + totalCards) % totalCards;
      let nextIndex = (activeIndex + 1) % totalCards;

      if (index === activeIndex) {
        card.classList.add("active");
        if (video) {
          video.muted = true;
          video.play().catch(() => {});
          // Ao acabar, vai para o próximo
          video.onended = () => moveFlow(1);
        }
      } else if (index === prevIndex) {
        card.classList.add("prev");
      } else if (index === nextIndex) {
        card.classList.add("next");
      } else {
        card.classList.add("hidden");
      }

      // Clique na lateral navega
      card.onclick = () => {
        if (index === prevIndex) moveFlow(-1);
        if (index === nextIndex) moveFlow(1);
      };
    });
    updateDots();
  }

  // Função de navegação
  function moveFlow(direction) {
    activeIndex = (activeIndex + direction + totalCards) % totalCards;
    updateCarousel();
  }

  // Inicialização
  createDots();
  updateCarousel();

  // Tornar a função global para os botões do HTML funcionarem
  window.moveFlow = moveFlow;
}

// --- 4. ATUALIZA ANO RODAPÉ ---
const yearSpan = document.getElementById("current-year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// --- 5. WHATSAPP FORM ---
const whatsappForm = document.getElementById("whatsapp-form");
if (whatsappForm) {
  whatsappForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const nome = document.getElementById("nome").value;
    const cidade = document.getElementById("cidade").value;
    const finalidade = document.getElementById("finalidade").value;

    // Número da L2 (Exemplo - Substituir pelo real)
    const numeroWhatsApp = "5565996889835";

    const mensagem = `Olá! Me chamo *${nome}* de *${cidade}*.\nGostaria de um orçamento para: *${finalidade}*.`;

    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(
      mensagem
    )}`;

    window.open(url, "_blank");
  });
}
