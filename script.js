console.log("Página cargada correctamente.");
let cart = [];

// Abrir el modal cuando se hace clic en el enlace "Más Sobre Nosotros"
document.getElementById('about-us-link').addEventListener('click', (event) => {
    event.preventDefault();
    document.getElementById('about-us-modal').style.display = 'block';  // Muestra el modal
});

// Cerrar el modal cuando se hace clic en el botón de cierre
document.getElementById('close-about-us').addEventListener('click', () => {
    document.getElementById('about-us-modal').style.display = 'none';
});

// Cerrar el modal si se hace clic fuera del contenido del modal
window.addEventListener('click', (event) => {
    if (event.target === document.getElementById('about-us-modal')) {
        document.getElementById('about-us-modal').style.display = 'none';  // Cierra el modal si se hace clic fuera de él
    }
});

// Función para enviar mensaje de WhatsApp
function sendWhatsAppMessage(message) {
    // Codificar el mensaje para URL
    const encodedMessage = encodeURIComponent(message);

    // Número de teléfono para enviar el mensaje
    const phoneNumber = '573122349338';  // El número de WhatsApp de la empresa

    // Crear el enlace para WhatsApp
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    // Abrir WhatsApp en una nueva pestaña o ventana
    window.open(whatsappLink, '_blank');
}

// Función para el evento del logo de WhatsApp
document.getElementById('whatsapp-logo').addEventListener('click', () => {
    const message = 'Hola, tengo una pregunta sobre sus productos. Me gustaría obtener más información. ¡Gracias!';
    sendWhatsAppMessage(message);
});

// Función para el evento del enlace PQRS
document.getElementById('pqr-link').addEventListener('click', () => {
    const message = 'Hola, tengo una pregunta, queja o reclamo sobre los productos. ¿Podrían ayudarme?';
    sendWhatsAppMessage(message);
});

// Seleccionamos todos los productos
document.querySelectorAll('.product').forEach(product => {
    product.addEventListener('click', () => {
        // Obtener la información del producto
        const title = product.getAttribute('data-title');
        const imageSrc = product.getAttribute('data-image');
        const price = product.getAttribute('data-price');
        const description = product.getAttribute('data-description');

        // Actualizar el contenido del modal
        document.getElementById('modal-title').innerText = title;
        document.getElementById('modal-image').src = imageSrc; // Cambiar imagen del modal
        document.getElementById('modal-description').innerText = description;
        document.getElementById('modal-price').innerText = price;

        // Mostrar el selector de tamaño solo para el "Cristal de baño"
        if (title === "Cristal de baño") {
            document.getElementById('size-selector').style.display = 'block';
        } else {
            document.getElementById('size-selector').style.display = 'none';
        }

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

// Función para añadir un producto al carrito
function addToCart(product, quantity) {
    const productIndex = cart.findIndex(item => item.title === product.title && item.size === product.size);

    if (productIndex !== -1) {
        // Si el producto ya está en el carrito y el tamaño coincide, incrementamos la cantidad
        cart[productIndex].quantity += quantity;
    } else {
        // Si no está en el carrito, lo añadimos con la cantidad seleccionada
        cart.push({ ...product, quantity });
    }

    updateCart(); // Actualizamos la visualización del carrito
}

// Función para actualizar la visualización del carrito
function updateCart() {
    const cartItemsElement = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    
    // Limpiar el carrito actual
    cartItemsElement.innerHTML = '';
    
    let total = 0;
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <p>${item.title} - ${item.size ? item.size : 'Sin tamaño'} - Cantidad: ${item.quantity} - Precio: ${item.price}</p>
        `;
        cartItemsElement.appendChild(cartItem);
        total += parseInt(item.price.replace('$', '').replace(',', '')) * item.quantity;
    });
    
    // Actualizar el total del carrito
    cartTotalElement.innerText = `$${total}`;
}

// Función para manejar el evento de "Agregar al carrito"
document.getElementById('add-to-cart-button').addEventListener('click', () => {
    const quantity = parseInt(document.getElementById('quantity').value); // Obtén la cantidad seleccionada

    const product = {
        title: document.getElementById('modal-title').innerText,
        image: document.getElementById('modal-image').src,
        size: document.querySelector('input[name="size"]:checked') ? document.querySelector('input[name="size"]:checked').value : null, // Si no tiene tamaño, se pone como null
        price: document.getElementById('modal-price').innerText,
        description: document.getElementById('modal-description').innerText
    };

    // Si es "Cristal de baño", el tamaño seleccionado sí afecta el precio
    if (product.title === "Cristal de baño") {
        if (product.size === "Pequeño") {
            product.price = "$4000";
        } else if (product.size === "Grande") {
            product.price = "$5000";
        }
    }

    // Para Serum y Body Frosting no hay cambio de tamaño, por lo que el precio permanece como está.
    // Añadir el producto al carrito con la cantidad seleccionada
    addToCart(product, quantity);

    // Cerrar el modal después de agregar al carrito
    document.getElementById('modal').style.display = 'none';
});

// Función para manejar el evento de "Finalizar Compra"
document.getElementById('checkout-button').addEventListener('click', () => {
    // Crear el mensaje para WhatsApp
    let message = 'Hola, me gustaría realizar una compra. Aquí están los detalles:\n';
    
    cart.forEach(item => {
        // Si el producto no tiene tamaño, no lo mostramos
        const sizeMessage = item.size ? `Tamaño: ${item.size}` : 'Sin tamaño';
        message += `Producto: ${item.title}\n${sizeMessage}\nCantidad: ${item.quantity}\nPrecio: ${item.price}\n\n`; 
    });

    // Precio total
    const total = document.getElementById('cart-total').innerText;
    message += `Total: ${total}\nGracias por su atención.`;

    // Codificar el mensaje para URL
    const encodedMessage = encodeURIComponent(message);

    // Número de teléfono para enviar el mensaje
    const phoneNumber = '573122349338';

    // Crear el enlace para WhatsApp
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    // Abrir WhatsApp en una nueva pestaña o ventana
    window.open(whatsappLink, '_blank');
});