/* Init library AOS */
AOS.init();

document.addEventListener('DOMContentLoaded', function () {

    // --- SLIDER com letras ---
    const slides = document.querySelectorAll(".slide");
    if (slides.length > 0) { // Verifica se existem slides antes de prosseguir
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

        showSlide(currentIndex); // Mostra o primeiro slide imediatamente
        setInterval(nextSlide, 10000); // Troca a cada 10 segundos
    } else {
        console.warn("Nenhum elemento '.slide' encontrado para o slider.");
    }

    // --- Botão de voltar ao topo ---
    const backToTopButton = document.getElementById('backToTop');
    if (backToTopButton) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 300) {
                backToTopButton.classList.remove('hidden');
            } else {
                backToTopButton.classList.add('hidden');
            }
        });

        backToTopButton.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    } else {
        console.warn("Elemento com id 'backToTop' não encontrado.");
    }


    // --- Carrossel Marcas (Garantir que a animação esteja rodando ao carregar) ---
    const carousel = document.getElementById('carousel-marcas');
    if (carousel) {
        // Nota: Isso define o estado apenas uma vez no carregamento.
        // Não impede que outras interações (ex: CSS hover) pausem a animação depois.
        carousel.style.animationPlayState = 'running';
    } else {
        console.warn("Elemento com id 'carousel-marcas' não encontrado.");
    }


    // --- Validação e Lógica do Modal de Contato ---
    const contactModal = document.getElementById('contactModal');
    const contactForm = document.getElementById('contactForm');
    const openModalButton = document.getElementById('openModal'); // <- Ajustado para usar ID
    const closeModalButton = document.getElementById('closeModal');
    const modalOverlay = document.getElementById('modalOverlay');

    // Verifica se todos os elementos essenciais do modal/form existem
    if (contactModal && contactForm && openModalButton && closeModalButton && modalOverlay) {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        const nameError = document.getElementById('nameError');
        const emailError = document.getElementById('emailError');
        const messageError = document.getElementById('messageError');
        const submitButton = document.getElementById('submitButton');
        const formStatus = document.getElementById('formStatus');

        // Verifica se os campos do formulário existem
        if (!nameInput || !emailInput || !messageInput || !nameError || !emailError || !messageError || !submitButton || !formStatus) {
            console.error("Um ou mais elementos do formulário de contato (inputs, errors, submit, status) não foram encontrados.");
            return; // Impede a execução do resto do código do formulário se algo estiver faltando
        }

        // --- Funções Auxiliares para Mostrar/Limpar Erros ---
        function showError(inputElement, errorElement, message) {
            errorElement.textContent = message;
            errorElement.classList.remove('hidden');
            inputElement.classList.add('border-red-500', 'focus:ring-red-500');
            inputElement.classList.remove('border-gray-300', 'focus:ring-violet-500');
        }

        function clearError(inputElement, errorElement) {
            errorElement.textContent = '';
            errorElement.classList.add('hidden');
            inputElement.classList.remove('border-red-500', 'focus:ring-red-500');
            inputElement.classList.add('border-gray-300', 'focus:ring-violet-500');
        }

        // --- Funções de Validação Específicas ---
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
            if (!/^[a-zA-ZÀ-ú\s'-]+$/.test(value)) {
                showError(nameInput, nameError, 'Por favor, insira um nome válido.');
                return false;
            }
            return true;
        }

        function validateEmail() {
            clearError(emailInput, emailError);
            const value = emailInput.value.trim();
            if (value === '') {
                showError(emailInput, emailError, 'O campo Email é obrigatório.');
                return false;
            }
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                showError(emailInput, emailError, 'Por favor, insira um endereço de e-mail válido.');
                return false;
            }
            return true;
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
            // Exemplo de sanitização básica (corrigido: < e >)
            // const sanitizedValue = value.replace(/</g, "<").replace(/>/g, ">");
            // if (sanitizedValue !== value) {
            //    showError(messageInput, messageError, 'Caracteres HTML não são permitidos na mensagem.');
            //    return false;
            // }
            return true;
        }

        // --- Validação em tempo real (ao sair do campo) ---
        nameInput.addEventListener('blur', validateName);
        emailInput.addEventListener('blur', validateEmail);
        messageInput.addEventListener('blur', validateMessage);

        // --- Validação no Envio do Formulário ---
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault();
            formStatus.textContent = '';
            formStatus.classList.remove('text-green-600', 'text-red-600', 'text-blue-600');

            const isNameValid = validateName();
            const isEmailValid = validateEmail();
            const isMessageValid = validateMessage();

            if (isNameValid && isEmailValid && isMessageValid) {
                submitButton.disabled = true;
                submitButton.textContent = 'Enviando...';

                // --- Escolha UMA das opções abaixo (AJAX ou Envio Padrão) ---

                // --- Opção 1: Envio AJAX (Recomendado para Modais - descomente para usar) ---
                /*
                formStatus.textContent = 'Processando seu envio...';
                formStatus.classList.add('text-blue-600');
                const formData = new FormData(contactForm);
                fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                })
                .then(response => {
                    if (response.ok) {
                        formStatus.textContent = "Mensagem enviada com sucesso! Obrigado.";
                        formStatus.classList.remove('text-blue-600');
                        formStatus.classList.add('text-green-600');
                        contactForm.reset();
                        // Limpar manualmente as bordas de erro caso reset() não o faça visualmente
                        clearError(nameInput, nameError);
                        clearError(emailInput, emailError);
                        clearError(messageInput, messageError);
                        // Opcional: Fechar o modal após um tempo
                        // setTimeout(closeTheModal, 3000); // Usa a função `closeTheModal` definida abaixo
                    } else {
                        return response.json().then(data => { throw data; }); // Lança erro para ser pego no catch
                    }
                })
                .catch(data => {
                    if (data && data.errors) {
                        formStatus.textContent = data.errors.map(error => error.message).join(", ");
                    } else if (data && typeof data === 'object' && data.error) {
                        formStatus.textContent = data.error; // Formspree pode retornar 'error'
                    } else {
                        formStatus.textContent = "Ocorreu um erro ao enviar. Tente novamente.";
                    }
                    formStatus.classList.remove('text-blue-600');
                    formStatus.classList.add('text-red-600');
                    console.error('Erro no envio Formspree:', data);
                })
                .finally(() => {
                    submitButton.disabled = false;
                    submitButton.textContent = 'Enviar';
                });
                */

                // --- Opção 2: Envio Padrão (Recarrega a Página - ativa por padrão) ---
                // Se não estiver usando AJAX, esta linha enviará o formulário.
                contactForm.submit();


            } else {
                formStatus.textContent = 'Por favor, corrija os erros no formulário.';
                formStatus.classList.add('text-red-600');
                // Foca no primeiro campo com erro
                if (!isNameValid) nameInput.focus();
                else if (!isEmailValid) emailInput.focus();
                else if (!isMessageValid) messageInput.focus();
            }
        });

        // --- Lógica para Abrir/Fechar o Modal ---
        function openTheModal() {
            // Limpa erros, status e campos ANTES de mostrar o modal
            clearError(nameInput, nameError);
            clearError(emailInput, emailError);
            clearError(messageInput, messageError);
            formStatus.textContent = '';
            formStatus.classList.remove('text-green-600', 'text-red-600', 'text-blue-600');
            contactForm.reset(); // Limpa os valores dos campos
            submitButton.disabled = false; // Garante que o botão esteja habilitado
            submitButton.textContent = 'Enviar'; // Garante o texto padrão do botão
            contactModal.classList.remove('hidden');
            // Opcional: Focar no primeiro campo ao abrir para acessibilidade
             nameInput.focus();
        }

        function closeTheModal() {
            contactModal.classList.add('hidden');
        }

        openModalButton.addEventListener('click', openTheModal);
        closeModalButton.addEventListener('click', closeTheModal);
        modalOverlay.addEventListener('click', closeTheModal); // Fecha ao clicar fora

        // Fechar com a tecla Esc
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && !contactModal.classList.contains('hidden')) {
                closeTheModal();
            }
        });

    } else {
        // Loga um erro se algum elemento essencial do modal não for encontrado
        console.error("Não foi possível inicializar o modal de contato. Verifique os IDs: 'contactModal', 'contactForm', 'openModal', 'closeModal', 'modalOverlay'.");
    }

}); // Fim do DOMContentLoaded principal