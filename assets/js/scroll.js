// Controla o comportamento do header ao rolar a página
window.addEventListener('scroll', function () {
    const header = document.getElementById('header');
    const scrollPosition = window.scrollY;

    if (scrollPosition > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});
