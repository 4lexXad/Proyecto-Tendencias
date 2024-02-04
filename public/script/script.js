function submitForm() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var message = document.getElementById("message").value;

    // Validación simple
    if (name === "" || !isValidEmail(email) || message === "") {
        alert("Por favor, complete todos los campos correctamente.");
        return;
    }

    var successMessage = document.getElementById("successMessage");
    successMessage.innerHTML = "¡Mensaje enviado con éxito!";

    // Puedes agregar aquí el código para enviar los datos del formulario a tu servidor o realizar otras acciones.

    // Limpiar el formulario después de enviar
    document.getElementById("contactForm").reset();
}

function isValidEmail(email) {
    // Utiliza una expresión regular para validar el formato del correo electrónico
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
document.addEventListener("DOMContentLoaded", function () {
    const rainContainer = document.querySelector(".rain");

    for (let i = 0; i < 100; i++) {
        const drop = document.createElement("div");
        drop.className = "drop";
        rainContainer.appendChild(drop);
        animateDrop(drop);
    }
});

function animateDrop(drop) {
    const duration = Math.random() * (1.5 - 0.5) + 0.5; // Duración aleatoria entre 0.5s y 1.5s
    const delay = Math.random() * 1; // Retraso aleatorio entre 0s y 2s

    drop.style.animation = `dropAnimation ${duration}s ${delay}s infinite linear`;

    drop.addEventListener("animationiteration", function () {
        // Reinicia la animación en cada iteración para simular la lluvia continua
        animateDrop(drop);
    });
}

