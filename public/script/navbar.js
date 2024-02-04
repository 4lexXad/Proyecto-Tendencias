document.addEventListener("DOMContentLoaded", function() {
    // Carga la barra de navegación utilizando fetch
    fetch('navbar.html')
        .then(response => response.text())
        .then(data => {
            var navbarContainer = document.getElementById("navbarContainer");
            navbarContainer.innerHTML = data;
        })
        .catch(error => console.error('Error:', error));
});
