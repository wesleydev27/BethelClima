/**
 * BethelClima - Script Principal
 *
 * Contém inicialização de bibliotecas, lógica do slider,
 * botão "Voltar ao Topo", controle do modal de contato,
 * validação de formulário e envio.
 */

// Espera o DOM estar completamente carregado antes de executar o script
document.addEventListener('DOMContentLoaded', function () {

    // 1. Inicialização da biblioteca AOS (Animate On Scroll)
    // ---------------------------------------------------------
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800, // Duração da animação em ms
            once: true      // Animar elementos apenas uma vez
        });
    } else {
        console.warn("Biblioteca AOS não encontrada. As animações de scroll não funcionarão.");
    }

    // 2. Lógica do Slider de Texto/Banner
    // ---------------------------------------------------------
    const slides = document.querySelectorAll(".slide");
    if (slides.length > 0) {
        let currentIndex = 0;
        const slideInterval = 10000; // Tempo em milissegundos (10 segundos)

        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.classList.toggle("active", i === index); // Alterna a classe 'active'
            });
        }

        function nextSlide() {
            currentIndex = (currentIndex + 1) % slides.length;
            showSlide(currentIndex);
        }

        showSlide(currentIndex); // Mostra o primeiro slide imediatamente
        setInterval(nextSlide, slideInterval); // Inicia a troca automática
    } else {
        // Aviso opcional se não houver slides
        // console.log("Nenhum elemento '.slide' encontrado para o slider.");
    }

    // 3. Botão "Voltar ao Topo"
    // ---------------------------------------------------------
    const backToTopButton = document.getElementById('backToTop');
    if (backToTopButton) {
        // Mostrar/Esconder o botão baseado na posição do scroll
        window.addEventListener('scroll', function () {
            if (window.scrollY > 300) { // Aparece após rolar 300px
                backToTopButton.classList.remove('hidden');
            } else {
                backToTopButton.classList.add('hidden');
            }
        });

        // Ação de clicar no botão para rolar suavemente para o topo
        backToTopButton.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    } else {
        console.warn("Elemento com id 'backToTop' não encontrado.");
    }

    // 4. Carrossel de Marcas (Garantir estado da animação) - Opcional
    // ---------------------------------------------------------
    const carousel = document.getElementById('carousel-marcas');
    if (carousel) {
        // Garante que a animação definida no CSS comece no estado 'running'.
        // Nota: Interações como :hover no CSS podem pausar a animação independentemente disto.
        carousel.style.animationPlayState = 'running';
    } else {
        // Aviso opcional se o carrossel não for encontrado
        // console.log("Elemento com id 'carousel-marcas' não encontrado.");
    }


    // 5. Modal de Contato e Validação do Formulário
    // ---------------------------------------------------------
    const contactModal = document.getElementById('contactModal');
    const contactForm = document.getElementById('contactForm');
    const openModalButton = document.getElementById('openModal'); // Assumindo que o botão para abrir tem este ID
    const closeModalButton = document.getElementById('closeModal');
    const modalOverlay = document.getElementById('modalOverlay');

    // Verifica se os elementos essenciais do modal existem antes de prosseguir
    if (contactModal && contactForm && openModalButton && closeModalButton && modalOverlay) {

        // Seleciona os campos do formulário e elementos de erro/status
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        const nameError = document.getElementById('nameError');
        const emailError = document.getElementById('emailError');
        const messageError = document.getElementById('messageError');
        const submitButton = document.getElementById('submitButton');
        const formStatus = document.getElementById('formStatus');

        // Verifica se todos os campos e elementos de erro/status foram encontrados
        if (!nameInput || !emailInput || !messageInput || !nameError || !emailError || !messageError || !submitButton || !formStatus) {
            console.error("Erro Crítico: Um ou mais elementos internos do formulário de contato (inputs, errors, submit, status) não foram encontrados. Verifique os IDs no HTML.");
            // Impede a adição de listeners se elementos cruciais faltarem
            return;
        }

        // --- Funções Auxiliares de UI (Mostrar/Limpar Erros) ---
        function showError(inputElement, errorElement, message) {
            errorElement.textContent = message;
            errorElement.classList.remove('hidden');
            // Adiciona classes de erro ao input
            inputElement.classList.add('border-red-500', 'focus:ring-red-500', 'focus:border-red-500');
            // Remove classes normais/de foco padrão
            inputElement.classList.remove('border-gray-300', 'focus:ring-violet-500', 'focus:border-transparent');
        }

        function clearError(inputElement, errorElement) {
            errorElement.textContent = '';
            errorElement.classList.add('hidden');
            // Remove classes de erro do input
            inputElement.classList.remove('border-red-500', 'focus:ring-red-500', 'focus:border-red-500');
            // Adiciona de volta as classes normais/de foco padrão
            inputElement.classList.add('border-gray-300', 'focus:ring-violet-500', 'focus:border-transparent');
        }

        // --- Funções de Validação Específicas por Campo ---
        function validateName() {
            clearError(nameInput, nameError);
            const value = nameInput.value.trim();
            if (value === '') {
                showError(nameInput, nameError, 'O campo Nome é obrigatório.');
                return false;
            }
            if (value.length < 2) {
                showError(nameInput, nameError, 'O nome deve ter pelo menos 2 caracteres.');
                return false;
            }
            if (value.length > 100) {
                showError(nameInput, nameError, 'O nome não pode exceder 100 caracteres.');
                return false;
            }
            // Regex para permitir letras (incluindo acentuadas), espaços, apóstrofos e hífens
            if (!/^[a-zA-ZÀ-ú\s'-]+$/.test(value)) {
                showError(nameInput, nameError, 'Por favor, insira um nome válido.');
                return false;
            }
            return true; // Válido
        }

        function validateEmail() {
            clearError(emailInput, emailError);
            const value = emailInput.value.trim();
            if (value === '') {
                showError(emailInput, emailError, 'O campo Email é obrigatório.');
                return false;
            }
            // Regex comum para validação de formato de e-mail
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                showError(emailInput, emailError, 'Por favor, insira um endereço de e-mail válido.');
                return false;
            }
            return true; // Válido
        }

        function validateMessage() {
            clearError(messageInput, messageError);
            const value = messageInput.value.trim();
            if (value === '') {
                showError(messageInput, messageError, 'O campo Mensagem é obrigatório.');
                return false;
            }
            if (value.length < 10) {
                showError(messageInput, messageError, 'A mensagem deve ter pelo menos 10 caracteres.');
                return false;
            }
            if (value.length > 500) {
                showError(messageInput, messageError, 'A mensagem não pode exceder 500 caracteres.');
                return false;
            }
            // Validação opcional para evitar HTML simples (não é segurança robusta)
            // const sanitizedValue = value.replace(/</g, "<").replace(/>/g, ">");
            // if (sanitizedValue !== value) {
            //    showError(messageInput, messageError, 'Caracteres < ou > não são permitidos na mensagem.');
            //    return false;
            // }
            return true; // Válido
        }

        // --- Função para Limpar Completamente o Formulário ---
        function resetFormAndErrors() {
             // 1. Reseta os valores dos campos do formulário para o padrão
             contactForm.reset();

             // 2. Limpa visualmente quaisquer mensagens de erro e estilos de erro dos inputs
             clearError(nameInput, nameError);
             clearError(emailInput, emailError);
             clearError(messageInput, messageError);

             // 3. Limpa a mensagem de status do formulário (sucesso/erro geral)
             formStatus.textContent = '';
             formStatus.classList.remove('text-green-600', 'text-red-600', 'text-blue-600');

             // 4. Garante que o botão de submit esteja habilitado e com o texto padrão
             submitButton.disabled = false;
             submitButton.textContent = 'Enviar';
        }

        // --- Funções de Controle do Modal ---
        function openTheModal() {
            resetFormAndErrors(); // Garante que o form esteja limpo ao abrir
            contactModal.classList.remove('hidden');
            nameInput.focus(); // Foca no primeiro campo para melhor acessibilidade
        }

        function closeTheModal() {
            contactModal.classList.add('hidden');
            resetFormAndErrors(); // Limpa o formulário ao fechar
        }

        // --- Listeners de Eventos do Modal ---
        openModalButton.addEventListener('click', openTheModal);
        closeModalButton.addEventListener('click', closeTheModal);
        modalOverlay.addEventListener('click', closeTheModal); // Fecha ao clicar fora

        // Fecha o modal ao pressionar a tecla 'Escape'
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && !contactModal.classList.contains('hidden')) {
                closeTheModal();
            }
        });

        // --- Validação em Tempo Real (ao perder o foco - 'blur') ---
        nameInput.addEventListener('blur', validateName);
        emailInput.addEventListener('blur', validateEmail);
        messageInput.addEventListener('blur', validateMessage);

        // --- Listener de Envio do Formulário ---
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault(); // Previne o envio padrão HTML imediatamente

            // Limpa o status anterior antes de validar novamente
            formStatus.textContent = '';
            formStatus.classList.remove('text-green-600', 'text-red-600', 'text-blue-600');

            // Executa todas as validações
            const isNameValid = validateName();
            const isEmailValid = validateEmail();
            const isMessageValid = validateMessage();

            // Verifica se todos os campos são válidos
            if (isNameValid && isEmailValid && isMessageValid) {
                // Formulário Válido - Prosseguir com o envio

                submitButton.disabled = true;
                submitButton.textContent = 'Enviando...';

                // --- ESCOLHA UM MÉTODO DE ENVIO ---

                // MÉTODO 1: Envio AJAX (Recomendado para Modais - mantém o usuário na página)
                // Descomente este bloco e comente/remova o MÉTODÓ 2 para usar AJAX
                /*
                formStatus.textContent = 'Processando seu envio...';
                formStatus.classList.add('text-blue-600');
                const formData = new FormData(contactForm);

                fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' } // Importante para Formspree responder com JSON
                })
                .then(response => {
                    if (response.ok) {
                        // Sucesso
                        formStatus.textContent = "Mensagem enviada com sucesso! Obrigado.";
                        formStatus.classList.remove('text-blue-600');
                        formStatus.classList.add('text-green-600');
                        resetFormAndErrors(); // Limpa o formulário após sucesso
                        // Opcional: Fechar o modal automaticamente após um tempo
                        // setTimeout(closeTheModal, 3000);
                    } else {
                        // Erro na resposta do servidor (ex: erro do Formspree)
                        return response.json().then(data => { throw data; }); // Lança o erro para o catch
                    }
                })
                .catch(errorData => {
                    // Erro (rede ou vindo do .then)
                    console.error('Erro no envio do formulário:', errorData);
                    if (errorData && errorData.errors) {
                        // Tenta exibir erros específicos do Formspree
                        formStatus.textContent = errorData.errors.map(err => err.message).join(", ");
                    } else if (errorData && typeof errorData === 'object' && errorData.error) {
                         formStatus.textContent = errorData.error; // Outro formato de erro comum
                    } else {
                        formStatus.textContent = "Ocorreu um erro ao enviar. Tente novamente.";
                    }
                    formStatus.classList.remove('text-blue-600');
                    formStatus.classList.add('text-red-600');
                    // Reabilita o botão em caso de erro para permitir nova tentativa
                    submitButton.disabled = false;
                    submitButton.textContent = 'Enviar';
                });
                // Nota: O .finally não é necessário aqui pois o botão é reabilitado
                // no sucesso (pelo resetFormAndErrors) ou no erro (no catch).
                */

                // MÉTODO 2: Envio Padrão HTML (Recarrega a página ou redireciona para Formspree)
                // Deixe este ativo se não quiser usar AJAX.
                // Comente ou remova este bloco se estiver usando AJAX (MÉTODO 1).
                 formStatus.textContent = 'Enviando formulário...'; // Feedback visual antes do recarregamento
                 formStatus.classList.add('text-blue-600');
                 contactForm.submit(); // Executa o envio padrão do formulário


            } else {
                // Formulário Inválido
                formStatus.textContent = 'Por favor, corrija os erros destacados no formulário.';
                formStatus.classList.add('text-red-600');

                // Foca no primeiro campo com erro para acessibilidade
                if (!isNameValid) {
                    nameInput.focus();
                } else if (!isEmailValid) {
                    emailInput.focus();
                } else if (!isMessageValid) {
                    messageInput.focus();
                }
                // Garante que o botão esteja habilitado caso a validação falhe
                submitButton.disabled = false;
                submitButton.textContent = 'Enviar';
            }
        });

    } else {
        // Log de erro se algum elemento essencial do modal não foi encontrado
        console.error("Não foi possível inicializar completamente o modal de contato. Verifique se os elementos com os IDs 'contactModal', 'contactForm', 'openModal', 'closeModal' e 'modalOverlay' existem no seu HTML.");
    }

}); // Fim do listener DOMContentLoaded