// SLIDER com letras
document.addEventListener("DOMContentLoaded", function () {
    const slides = document.querySelectorAll(".slide");
    let currentIndex = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove("active");
            if (i === index) {
                slide.classList.add("active");
            }
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
    }

    showSlide(currentIndex);
    setInterval(nextSlide, 10000);
});





// botão de voltar ao topo
window.addEventListener('scroll', function () {
    const backToTopButton = document.getElementById('backToTop');
    if (window.scrollY > 300) {
        backToTopButton.classList.remove('hidden');
    } else {
        backToTopButton.classList.add('hidden');
    }
});

// Rolar para o topo ao clicar no botão
document.getElementById('backToTop').addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Remover eventos de pausa no carrossel
const carousel = document.getElementById('carousel-marcas');
carousel.style.animationPlayState = 'running';

/*Init library AOS*/
AOS.init();

//MODAL AO CLICAR EM CIMA DO faleConosco
const openModal = document.getElementById('openModal');
const closeModal = document.getElementById('closeModal');
const contactModal = document.getElementById('contactModal');

// Abrir o modal
openModal.addEventListener('click', () => {
    contactModal.classList.remove('hidden');
});

// Fechar o modal
closeModal.addEventListener('click', () => {
    contactModal.classList.add('hidden');
});

// Fechar o modal ao clicar fora dele
contactModal.addEventListener('click', (e) => {
    if (e.target === contactModal) {
        contactModal.classList.add('hidden');
    }
});