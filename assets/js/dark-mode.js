// Seleciona o botão de alternância, o elemento <html> e a logo
const darkModeToggle = document.getElementById('darkModeToggle');
const toggleIndicator = document.getElementById('toggleIndicator');
const htmlElement = document.documentElement;
const logo = document.getElementById('logo'); // Seleciona a logo

// Verifica se os elementos foram encontrados
console.log('darkModeToggle:', darkModeToggle);
console.log('toggleIndicator:', toggleIndicator);
console.log('htmlElement:', htmlElement);
console.log('logo:', logo);

// Verifica se o modo escuro está ativado no armazenamento local
if (localStorage.getItem('theme') === 'dark') {
    htmlElement.classList.add('dark');
    darkModeToggle.setAttribute('aria-checked', 'true');
    toggleIndicator.style.transform = 'translateX(100%)'; // Move a bolinha para a direita
    logo.src = 'assets/img/Logos/logo-dark.svg'; // Altera para a logo do modo escuro
}

// Alterna o modo escuro ao clicar no botão
darkModeToggle.addEventListener('click', () => {
    console.log('Botão clicado!');
    const isDarkMode = htmlElement.classList.toggle('dark');
    darkModeToggle.setAttribute('aria-checked', isDarkMode);

    // Move a bolinha e altera a logo
    if (isDarkMode) {
        console.log('Modo escuro ativado');
        toggleIndicator.style.transform = 'translateX(100%)'; // Move para a direita
        localStorage.setItem('theme', 'dark');
        logo.src = 'assets/img/Logos/logo-dark.svg'; // Altera para a logo do modo escuro
    } else {
        console.log('Modo claro ativado');
        toggleIndicator.style.transform = 'translateX(0)'; // Move para a esquerda
        localStorage.setItem('theme', 'light');
        logo.src = 'assets/img/Logos/logo-light.svg'; // Altera para a logo do modo claro
    }
});