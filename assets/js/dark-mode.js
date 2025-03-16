// Script para controlar o modo claro/escuro

// Seleciona os elementos necessários
const darkModeToggle = document.getElementById('darkModeToggle');
const toggleIndicator = document.getElementById('toggleIndicator');
const body = document.body;

// Verifica se há uma preferência salva no localStorage
const isDarkMode = localStorage.getItem('darkMode') === null ? true : localStorage.getItem('darkMode') === 'true';

// Função para aplicar o modo escuro
function enableDarkMode() {
    body.classList.add('dark-mode', 'dark-bg');
    body.classList.remove('light-mode', 'light-bg');
    // Ajuste para o botão toggle
    toggleIndicator.style.transform = 'translateX(0)';
    toggleIndicator.classList.remove('light-indicator');
    toggleIndicator.classList.add('dark-indicator');
    darkModeToggle.setAttribute('aria-checked', 'true');
    localStorage.setItem('darkMode', 'true');
}

// Função para aplicar o modo claro
function enableLightMode() {
    body.classList.add('light-mode', 'light-bg');
    body.classList.remove('dark-mode', 'dark-bg');
    // Ajuste para o botão toggle
    toggleIndicator.style.transform = 'translateX(16px)';
    toggleIndicator.classList.add('light-indicator');
    toggleIndicator.classList.remove('dark-indicator');
    darkModeToggle.setAttribute('aria-checked', 'false');
    localStorage.setItem('darkMode', 'false');
}

// Define o modo inicial baseado na preferência salva
if (isDarkMode) {
    enableDarkMode();
} else {
    enableLightMode();
}

// Adiciona o evento de clique ao botão
darkModeToggle.addEventListener('click', () => {
    // Verifica o estado atual e alterna
    if (body.classList.contains('dark-mode')) {
        enableLightMode();
    } else {
        enableDarkMode();
    }
});

// Opcionalmente, verifica as preferências do sistema
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    const prefersDarkMode = e.matches;
    // Só alterna automaticamente se o usuário não tiver definido uma preferência
    if (localStorage.getItem('darkMode') === null) {
        if (prefersDarkMode) {
            enableDarkMode();
        } else {
            enableLightMode();
        }
    }
});