document.addEventListener('DOMContentLoaded', () => { // Garante que o DOM está carregado

    // Seleciona os elementos
    const darkModeToggle = document.getElementById('darkModeToggle');
    const toggleIndicator = document.getElementById('toggleIndicator');
    const htmlElement = document.documentElement;
    const logo = document.getElementById('logo');

    // Seleciona os novos elementos da caixa de mensagem
    const messageContainer = document.getElementById('darkModeMessageContainer');
    const messageText = document.getElementById('darkModeMessageText');
    const actionButtonsContainer = document.getElementById('darkModeActionButtons');
    const confirmBtn = document.getElementById('darkModeConfirmBtn');
    const cancelBtn = document.getElementById('darkModeCancelBtn');

    // Variável para guardar o estado do timeout (para cancelar se necessário)
    let messageTimeout = null;

    // Verifica se todos os elementos essenciais foram encontrados
    if (!darkModeToggle || !toggleIndicator || !htmlElement || !messageContainer || !messageText || !actionButtonsContainer || !confirmBtn || !cancelBtn) {
        console.error("Erro: Um ou mais elementos essenciais do dark mode ou da caixa de mensagem não foram encontrados. Verifique os IDs no HTML.");
        return; // Interrompe a execução se algo estiver faltando
    }
    // A verificação do logo é opcional, então faremos dentro da lógica se ele existir
    // if (!logo) {
    //     console.warn("Aviso: Elemento da logo (ID: logo) não encontrado.");
    // }


    // --- Função para mostrar a caixa de mensagem ---
    const showMessage = (text, showConfirmButtons = false, autoHideDelay = null) => {
        // Limpa qualquer timeout anterior para evitar esconder a caixa prematuramente
        if (messageTimeout) {
            clearTimeout(messageTimeout);
            messageTimeout = null;
        }

        messageText.textContent = text; // Define o texto da mensagem

        if (showConfirmButtons) {
            actionButtonsContainer.classList.remove('hidden'); // Mostra botões Sim/Não
        } else {
            actionButtonsContainer.classList.add('hidden'); // Esconde botões Sim/Não (para mensagens de status)
        }

        messageContainer.classList.remove('hidden'); // Mostra a caixa de mensagem

        // Define um timeout para esconder a mensagem automaticamente (se um delay for fornecido)
        if (autoHideDelay && autoHideDelay > 0) {
            messageTimeout = setTimeout(() => {
                hideMessage();
            }, autoHideDelay);
        }
    };

    // --- Função para esconder a caixa de mensagem ---
    const hideMessage = () => {
        messageContainer.classList.add('hidden');
        if (messageTimeout) { // Limpa timeout se escondermos manualmente
            clearTimeout(messageTimeout);
            messageTimeout = null;
        }
    };


    // --- Função para aplicar o tema (lógica principal) ---
    const applyTheme = (activateDark) => {
        const isDarkModeNow = htmlElement.classList.toggle('dark', activateDark); // Força o estado
        darkModeToggle.setAttribute('aria-checked', isDarkModeNow);

        let statusMessage = "";

        if (isDarkModeNow) {
            console.log('Modo escuro ativado');
            toggleIndicator.style.transform = 'translateX(100%)';
            localStorage.setItem('theme', 'dark');
            if (logo) logo.src = 'assets/img/Logos/logo-dark.svg';
            statusMessage = "Modo escuro ativado!";
        } else {
            console.log('Modo claro ativado');
            toggleIndicator.style.transform = 'translateX(0)';
            localStorage.setItem('theme', 'light');
            if (logo) logo.src = 'assets/img/Logos/logo-light.svg';
            statusMessage = "Modo claro ativado!";
        }

        // Mostra a mensagem de status e a esconde após 3 segundos
        showMessage(statusMessage, false, 3000);
    };


    // --- Função para inicializar o tema na carga da página ---
    const initializeTheme = () => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            htmlElement.classList.add('dark');
            darkModeToggle.setAttribute('aria-checked', 'true');
            toggleIndicator.style.transform = 'translateX(100%)';
            if (logo) logo.src = 'assets/img/Logos/logo-dark.svg';
        } else {
            // Garante estado inicial claro se não for dark
            htmlElement.classList.remove('dark');
            darkModeToggle.setAttribute('aria-checked', 'false');
            toggleIndicator.style.transform = 'translateX(0)';
             if (logo) logo.src = 'assets/img/Logos/logo-light.svg';
        }
        // Garante que a caixa de mensagem comece escondida
        hideMessage();
    };


    // --- Event Listener para o clique no BOTÃO TOGGLE ---
    darkModeToggle.addEventListener('click', () => {
        console.log('Botão toggle clicado!');
        hideMessage(); // Esconde qualquer mensagem anterior ao mostrar a confirmação

        const isCurrentlyDark = htmlElement.classList.contains('dark');
        const confirmationMessage = isCurrentlyDark
            ? "Deseja desativar o modo escuro?"
            : "Deseja ativar o modo escuro?";

        // Mostra a mensagem de confirmação COM os botões
        showMessage(confirmationMessage, true);
    });


    // --- Event Listener para o botão CONFIRMAR na caixa de mensagem ---
    confirmBtn.addEventListener('click', () => {
        console.log('Botão Confirmar clicado!');
        const isCurrentlyDark = htmlElement.classList.contains('dark');
        // A ação é o oposto do estado atual
        const activateDark = !isCurrentlyDark;
        hideMessage(); // Esconde a caixa de confirmação imediatamente
        applyTheme(activateDark); // Aplica a mudança de tema
    });


    // --- Event Listener para o botão CANCELAR na caixa de mensagem ---
    cancelBtn.addEventListener('click', () => {
        console.log('Botão Cancelar clicado!');
        hideMessage(); // Apenas esconde a caixa de mensagem
    });


    // --- Inicializa o tema quando o DOM estiver pronto ---
    initializeTheme();

}); // Fim do DOMContentLoaded