console.log("Página cargada correctamente.");

// Seleccionamos todos los productos
document.querySelectorAll('.product').forEach(product => {
    product.addEventListener('click', () => {
        // Obtener la información del producto
        const title = product.getAttribute('data-title');
        const imageSrc = product.getAttribute('data-image'); // Esta es la imagen que aparecerá en el modal
        const price = product.getAttribute('data-price');
        const description = product.getAttribute('data-description');

        // Actualizar el contenido del modal
        document.getElementById('modal-title').innerText = title;
        document.getElementById('modal-image').src = imageSrc; // Cambiar imagen del modal
        document.getElementById('modal-description').innerText = description;
        document.getElementById('modal-price').innerText = price;

        // Mostrar el modal
        document.getElementById('modal').style.display = 'block';
    });
});

// Cerrar el modal cuando se hace clic en el botón de cierre
document.getElementById('close').addEventListener('click', () => {
    document.getElementById('modal').style.display = 'none';
});

// Cerrar el modal si se hace clic fuera del modal
window.addEventListener('click', (event) => {
    if (event.target === document.getElementById('modal')) {
        document.getElementById('modal').style.display = 'none';
    }
});
// Navegación suave
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        targetElement.scrollIntoView({ behavior: 'smooth' });
    });
});

// Modal de "Más sobre nosotros"
document.getElementById('about-us-link').addEventListener('click', function (e) {
    e.preventDefault();
    document.getElementById('about-us-modal').style.display = 'block';
});

// Cerrar modal "Sobre nosotros"
document.getElementById('close-about-us').addEventListener('click', function () {
    document.getElementById('about-us-modal').style.display = 'none';
});

// Cerrar el modal  "Sobre nosotros" si se hace clic fuera del modal
window.addEventListener('click', (event) => {
    if (event.target === document.getElementById('about-us-modal')) {
        document.getElementById('about-us-modal').style.display = 'none';
    }
});