document.addEventListener('DOMContentLoaded', () => { // Garante que o DOM está carregado

    // --- Seleção dos Elementos ---
    const darkModeToggle = document.getElementById('darkModeToggle');
    const toggleIndicator = document.getElementById('toggleIndicator');
    // const htmlElement = document.documentElement; // NÃO precisamos mais do htmlElement para aplicar a classe
    const logo = document.getElementById('logo');

    // Seleciona os elementos do Header e Footer
    const headerElement = document.querySelector('header'); // Assume que há uma tag <header>
    const footerElement = document.querySelector('footer'); // Assume que há uma tag <footer>

    // Seleciona os novos elementos da caixa de mensagem
    const messageContainer = document.getElementById('darkModeMessageContainer');
    const messageText = document.getElementById('darkModeMessageText');
    const actionButtonsContainer = document.getElementById('darkModeActionButtons');
    const confirmBtn = document.getElementById('darkModeConfirmBtn');
    const cancelBtn = document.getElementById('darkModeCancelBtn');

    // Variável para guardar o estado do timeout
    let messageTimeout = null;

    // --- Verificações de Elementos Essenciais ---
    // Essenciais para a funcionalidade do toggle e mensagem
    if (!darkModeToggle || !toggleIndicator || !messageContainer || !messageText || !actionButtonsContainer || !confirmBtn || !cancelBtn) {
        console.error("Erro: Um ou mais elementos essenciais do dark mode (toggle, indicador, caixa de mensagem) não foram encontrados. Verifique os IDs no HTML.");
        return; // Interrompe a execução
    }
    // Opcionais (alvos do tema) - Apenas avisa se não encontrar
    if (!headerElement) {
        console.warn("Aviso: Elemento <header> não encontrado. O tema escuro não será aplicado ao cabeçalho.");
    }
    if (!footerElement) {
        console.warn("Aviso: Elemento <footer> não encontrado. O tema escuro não será aplicado ao rodapé.");
    }
    // Opcional (logo)
    if (!logo) {
        console.warn("Aviso: Elemento da logo (ID: logo) não encontrado.");
    }


    // --- Funções da Caixa de Mensagem (sem alterações) ---
    const showMessage = (text, showConfirmButtons = false, autoHideDelay = null) => {
        if (messageTimeout) {
            clearTimeout(messageTimeout);
            messageTimeout = null;
        }
        messageText.textContent = text;
        actionButtonsContainer.classList.toggle('hidden', !showConfirmButtons);
        messageContainer.classList.remove('hidden');
        if (autoHideDelay && autoHideDelay > 0) {
            messageTimeout = setTimeout(() => {
                hideMessage();
            }, autoHideDelay);
        }
    };

    const hideMessage = () => {
        messageContainer.classList.add('hidden');
        if (messageTimeout) {
            clearTimeout(messageTimeout);
            messageTimeout = null;
        }
    };


    // --- Função para APLICAR o tema (MODIFICADA) ---
    const applyTheme = (activateDark) => {
        // Aplica/remove a classe .dark APENAS no header e footer
        if (headerElement) {
            headerElement.classList.toggle('dark', activateDark);
        }
        if (footerElement) {
            footerElement.classList.toggle('dark', activateDark);
        }

        // Atualiza o estado visual do toggle e salva no localStorage
        darkModeToggle.setAttribute('aria-checked', activateDark);

        let statusMessage = "";

        if (activateDark) {
            console.log('Modo escuro ativado');
            toggleIndicator.style.transform = 'translateX(100%)';
            localStorage.setItem('theme', 'dark');
            if (logo) logo.src = 'assets/img/Logos/logo-dark.svg'; // Atualiza logo se existir
            statusMessage = "Modo escuro ativado!";
        } else {
            console.log('Modo claro ativado');
            toggleIndicator.style.transform = 'translateX(0)';
            localStorage.setItem('theme', 'light');
            if (logo) logo.src = 'assets/img/Logos/logo-light.svg'; // Atualiza logo se existir
            statusMessage = "Modo claro ativado!";
        }

        // Mostra a mensagem de status e a esconde após 3 segundos
        showMessage(statusMessage, false, 3000);
    };


    // --- Função para INICIALIZAR o tema (MODIFICADA) ---
    const initializeTheme = () => {
        const savedTheme = localStorage.getItem('theme');
        const activateDark = savedTheme === 'dark'; // Determina se deve iniciar escuro

        // Aplica o estado inicial ao header e footer
        if (headerElement) {
            headerElement.classList.toggle('dark', activateDark);
        }
        if (footerElement) {
            footerElement.classList.toggle('dark', activateDark);
        }

        // Define estado inicial do toggle e indicador
        darkModeToggle.setAttribute('aria-checked', activateDark);
        toggleIndicator.style.transform = activateDark ? 'translateX(100%)' : 'translateX(0)';

        // Define logo inicial
        if (logo) {
            logo.src = activateDark ? 'assets/img/Logos/logo-dark.svg' : 'assets/img/Logos/logo-light.svg';
        }

        // Garante que a caixa de mensagem comece escondida
        hideMessage();
    };


    // --- Função Auxiliar para Checar Estado Atual ---
    // Verifica se o modo escuro está ativo (baseado no header ou footer)
    const isCurrentlyDark = () => {
        if (headerElement && headerElement.classList.contains('dark')) {
            return true;
        }
        if (footerElement && footerElement.classList.contains('dark')) {
            return true; // Assume que se um está dark, o estado é dark
        }
        return false; // Se nenhum tiver a classe, está claro
    };


    // --- Event Listener para o clique no BOTÃO TOGGLE (MODIFICADO) ---
    darkModeToggle.addEventListener('click', () => {
        console.log('Botão toggle clicado!');
        hideMessage(); // Esconde qualquer mensagem anterior

        // Usa a função auxiliar para checar o estado
        const currentlyDark = isCurrentlyDark();
        const confirmationMessage = currentlyDark
            ? "Deseja desativar o modo escuro?"
            : "Deseja ativar o modo escuro?";

        // Mostra a mensagem de confirmação COM os botões
        showMessage(confirmationMessage, true);
    });


    // --- Event Listener para o botão CONFIRMAR (MODIFICADO) ---
    confirmBtn.addEventListener('click', () => {
        console.log('Botão Confirmar clicado!');
        // Determina a ação baseado no estado atual (usando a função auxiliar)
        const activateDark = !isCurrentlyDark();
        hideMessage(); // Esconde a caixa de confirmação imediatamente
        applyTheme(activateDark); // Aplica a mudança de tema
    });


    // --- Event Listener para o botão CANCELAR (sem alterações) ---
    cancelBtn.addEventListener('click', () => {
        console.log('Botão Cancelar clicado!');
        hideMessage(); // Apenas esconde a caixa de mensagem
    });


    // --- Inicializa o tema quando o DOM estiver pronto ---
    initializeTheme();

}); // Fim do DOMContentLoaded

// --- IMPORTANTE: Considerações sobre o CSS ---
// Lembre-se que suas regras de CSS agora precisam ser mais específicas.
// Em vez de:
// html.dark body { background-color: #121212; }
// html.dark .meu-componente { color: white; }
//
// Você precisará mirar dentro do header e footer:
// header.dark { background-color: #333; }
// header.dark .nav-link { color: #eee; }
// header.dark #logo { filter: brightness(0) invert(1); /* Exemplo */ }
//
// footer.dark { background-color: #222; }
// footer.dark p { color: #ccc; }
// footer.dark a { color: lightblue; }