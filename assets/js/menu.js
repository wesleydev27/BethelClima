const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const closeMobileMenu = document.getElementById('closeMobileMenu');
const menuContent = mobileMenu.querySelector('div');

mobileMenuToggle.addEventListener('click', () => {
    mobileMenu.classList.remove('hidden');
    mobileMenu.classList.add('opacity-100');
    menuContent.classList.remove('translate-x-full');
    menuContent.classList.add('translate-x-0');
});

closeMobileMenu.addEventListener('click', () => {
    mobileMenu.classList.remove('opacity-100');
    mobileMenu.classList.add('opacity-0');
    menuContent.classList.remove('translate-x-0');
    menuContent.classList.add('translate-x-full');

    // Aguarde a transição antes de ocultar completamente
    setTimeout(() => {
        mobileMenu.classList.add('hidden');
    }, 300);
});

// Fecha o menu ao clicar fora dele
mobileMenu.addEventListener('click', (e) => {
    if (e.target === mobileMenu) {
        closeMobileMenu.click();
    }
});