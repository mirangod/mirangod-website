const newsletterForm = document.getElementById("newsletter-form");
const newsletterMessage = document.getElementById("newsletter-message");

const NEWSLETTER_API =
    "https://mirangod-website-api.matheus-coelho.workers.dev/subscribe";


if (newsletterForm) {

    newsletterForm.addEventListener("submit", async (event) => {

        event.preventDefault();

        const nameInput = document.getElementById("newsletter-name");
        const emailInput = document.getElementById("newsletter-email");
        const submitButton = newsletterForm.querySelector(
            'button[type="submit"]'
        );

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();

        // Limpa mensagem anterior
        newsletterMessage.textContent = "";
        newsletterMessage.className = "newsletter__message";

        // Validação básica
        if (name.length < 2) {
            showNewsletterMessage(
                "Por favor, informe seu nome.",
                "error"
            );

            nameInput.focus();
            return;
        }

        if (!isValidEmail(email)) {
            showNewsletterMessage(
                "Por favor, informe um e-mail válido.",
                "error"
            );

            emailInput.focus();
            return;
        }

        // Estado de carregamento
        submitButton.disabled = true;
        submitButton.textContent = "Cadastrando...";

        try {

            const response = await fetch(NEWSLETTER_API, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    name: name,
                    email: email
                })

            });


            let data = null;
            try {
                data = await response.json();
            } catch {
                // APIs and proxies may return HTML or an empty body on failure.
            }

            if (!response.ok || !data || data.success !== true) {

                throw new Error(
                    data?.error || "Não foi possível realizar o cadastro."
                );

            }


            // Sucesso
            showNewsletterMessage(
                "Cadastro realizado com sucesso! Obrigado por acompanhar meu trabalho.",
                "success"
            );

            newsletterForm.reset();


        } catch (error) {

            console.error("Erro ao cadastrar newsletter:", error);

            showNewsletterMessage(
                "Não foi possível realizar o cadastro. Tente novamente em alguns instantes.",
                "error"
            );

        } finally {

            // Restaura botão
            submitButton.disabled = false;
            submitButton.textContent = "Inscrever-se";

        }

    });

}


/**
 * Validação básica de e-mail
 */
function isValidEmail(email) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

}


/**
 * Exibe mensagem para o usuário
 */
function showNewsletterMessage(message, type) {

    newsletterMessage.textContent = message;
    newsletterMessage.className =
        `newsletter__message newsletter__message--${type}`;

}
