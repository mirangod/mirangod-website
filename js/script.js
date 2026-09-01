const newsletterForm = document.querySelector("#newsletter-form");

if (newsletterForm) {
  newsletterForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const nameInput = newsletterForm.querySelector("#name");
    const emailInput = newsletterForm.querySelector("#email");
    const submitButton = newsletterForm.querySelector("button[type='submit']");

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();

    // Validação básica
    if (!name || !email) {
      alert("Por favor, preencha seu nome e e-mail.");
      return;
    }

    // Evita múltiplos envios
    submitButton.disabled = true;
    submitButton.textContent = "Cadastrando...";

    try {
      const response = await fetch(
        "https://mirangod-website-api.matheus-coelho.workers.dev/subscribe",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name: name,
            email: email
          })
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Não foi possível realizar o cadastro.");
      }

      // Cadastro realizado
      newsletterForm.reset();

      alert("Cadastro realizado com sucesso!");

    } catch (error) {
      console.error("Newsletter error:", error);

      alert(
        "Não foi possível realizar o cadastro agora. Tente novamente em alguns instantes."
      );

    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "Cadastrar-se";
    }
  });
}