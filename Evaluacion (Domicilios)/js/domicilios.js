// Espera a que el contenido del documento HTML esté completamente cargado
document.addEventListener("DOMContentLoaded", function () {
    // Obtiene referencias a elementos del DOM
    const orderForm = document.getElementById("order-form");
    const orderSummary = document.getElementById("order-summary");
    const totalPrice = document.getElementById("total-price");

    // Inicializa el total del pedido
    let total = 0;

    // Agrega un evento de escucha al formulario de pedido
    orderForm.addEventListener("submit", function (event) {
        // Evita que el formulario se envíe de forma predeterminada
        event.preventDefault();

        // Muestra una alerta de éxito al enviar el pedido
        alert("Pedido enviado correctamente");

        // Redirige a la página de información básica
        window.location.href = "informacion.html";
    });

    // Agrega un evento de escucha al botón "Agregar al Pedido"
    document.getElementById("add-to-order").addEventListener("click", function () {
        // Obtiene los valores seleccionados del formulario
        const restaurant = document.getElementById("select-restaurant").value;
        const product = document.getElementById("select-product").value;
        const productQuantity = parseInt(document.getElementById("product-quantity").value);
        const additionalItem = document.getElementById("select-additional-item").value;
        const additionalItemQuantity = parseInt(document.getElementById("additional-item-quantity").value);

        // Verifica que se haya seleccionado al menos un plato de comida o bebida
        if (productQuantity > 0 || additionalItemQuantity > 0) {
            // Calcula el precio total del producto y el artículo adicional
            const productPrice = calculateProductPrice(product) * productQuantity;
            const additionalItemPrice = calculateAdditionalItemPrice(additionalItem) * additionalItemQuantity;
            // Calcula el subtotal del pedido
            const subtotal = productPrice + additionalItemPrice;

            // Crea un elemento de pedido y lo agrega al resumen del pedido
            const orderItem = createOrderItem(restaurant, product, productQuantity, additionalItem, additionalItemQuantity);
            orderSummary.appendChild(orderItem);

            // Actualiza el total del pedido y muestra el precio total
            total += subtotal;
            totalPrice.textContent = total.toFixed();
        } else {
            // Muestra una alerta si no se selecciona ningún plato de comida o bebida
            alert("Debe seleccionar al menos un plato de comida o bebida.");
        }
    });

    // Agrega un evento de escucha al botón "Limpiar Formulario"
    document.getElementById("clear-form").addEventListener("click", function () {
        // Restablece el formulario a sus valores predeterminados
        orderForm.reset();
    });

    // Agrega un evento de escucha al resumen del pedido para eliminar elementos
    orderSummary.addEventListener("click", function (event) {
        if (event.target.classList.contains("remove-item")) {
            // Elimina el elemento de pedido seleccionado y actualiza el total
            const selectedItem = event.target.closest(".order-item");
            const subtotalToRemove = parseFloat(selectedItem.getAttribute("data-subtotal"));

            total -= subtotalToRemove;
            totalPrice.textContent = total.toFixed();
            selectedItem.remove();
        }
    });

    // Función para calcular el precio del plato de comida
    function calculateProductPrice(product) {
        switch (product) {
            case "pizza":
                return 12000;
            case "hamburguesa":
                return 10000;
            case "mazorcada":
                return 8000;
            case "pataconas":
                return 9000;
            case "alitas":
                return 15000;
            case "costillas":
                return 12000;
            case "nachos":
                return 10000;
            default:
                return 0;
        }
    }

    // Función para calcular el precio del artículo adicional
    function calculateAdditionalItemPrice(additionalItem) {
        switch (additionalItem) {
            case "agua":
                return 1000;
            case "Gaseosa":
                return 1500;
            case "cerveza":
                return 2000;
            case "limonada":
                return 1200;
            default:
                return 0;
        }
    }

    // Función para crear un elemento de pedido y devolverlo
    function createOrderItem(restaurant, product, productQuantity, additionalItem, additionalItemQuantity) {
        // Calcula el subtotal del elemento de pedido
        const subtotal = calculateProductPrice(product) * productQuantity +
            calculateAdditionalItemPrice(additionalItem) * additionalItemQuantity;

        // Crea un elemento de pedido y lo configura con los datos proporcionados
        const orderItem = document.createElement("div");
        orderItem.classList.add("order-item");
        orderItem.setAttribute("data-subtotal", subtotal.toFixed());
        orderItem.innerHTML = `
            <p>Restaurante: ${restaurant}, Comida: ${product} (x${productQuantity}), Bebida: ${additionalItem} (x${additionalItemQuantity})</p>
            <button class="remove-item">Eliminar Producto</button>
        `;
        // Devuelve el elemento de pedido creado
        return orderItem;
    }
});
