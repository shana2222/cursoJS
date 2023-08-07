// Obtenemos una referencia al elemento que contiene la lista de productos
const productList = document.querySelector('#product-list');
// Creamos un arreglo vacío para almacenar los productos
let products = [];

// Clase Producto
class Producto {
    constructor(name, description, price, quantity) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.quantity = quantity;
    }
}




// Función para agregar un nuevo producto

function addProduct(name, description, price, quantity) {
    // Verificamos si el producto ya existe en el localStorage
    const existingProduct = products.find((product) => product.name === name);

    if (existingProduct) {
        // Si el producto ya existe, mostramos un mensaje de alerta con Toastify
        Toastify({
            text: "El producto ya existe en la lista.",
            duration: 3000,
            gravity: "top",
            position: "center",
            style: {
                background: "linear-gradient(to right, #e61717, #f6a703)",
            }
        }).showToast();
    } else {
        // Si el producto no existe, creamos una nueva instancia de la clase Producto con los datos recibidos
        const product = new Producto(name, description, price, quantity);
        // Agregamos el producto al arreglo de productos
        products.push(product);
        // Guardamos los productos en el localStorage como un JSON
        localStorage.setItem('products', JSON.stringify(products));

        // Mostramos un mensaje de alerta de producto agregado exitoso
        Toastify({
            text: "Producto agregado exitosamente.",
            duration: 3000,
            gravity: "top",
            position: "center",
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
            }
        }).showToast();

        // Limpiamos el formulario
        document.querySelector('#product-name').value = '';
        document.querySelector('#product-description').value = '';
        document.querySelector('#product-price').value = '';
        document.querySelector('#product-quantity').value = '';
        
        // Mostramos la lista de productos actualizada en la página
        showProducts();
    }
}


// Función para mostrar la lista de productos
function showProducts() {
    // Limpiamos el contenido del contenedor de la lista de productos
    productList.innerHTML = '';
    // Recorremos el arreglo de productos y creamos una card para cada uno
    products.forEach((product, index) => {
        const card = document.createElement('div');
        card.classList.add('card', 'col-md-4');
        // Creamos el contenido de la card con los datos del producto

        card.innerHTML = `
            <h4>${product.name}</h4>
            <p>${product.description}</p>
            <p>Precio: $${product.price}</p>
            <div class="card-buttons">
                <button class="btn decrement-quantity" onClick="decreaseQuantity(${index})">-</button>
                <span>${product.quantity || 0}</span>
                <button class="btn increment-quantity" onclick="incrementQuantity(${index})">+</button>

                <button class="btn add-to-cart" onclick="addToCart(${index})">Agregar al Carrito</button>
                
                <button class="btn delete-product" onclick="deleteProduct(${index})">Eliminar Producto</button>
            </div>
        `;
        // Agregamos la card al contenedor de la lista de productos
        productList.appendChild(card);
    });
}



// Función para aumentar la cantidad del producto
function incrementQuantity(index) {
    // Incrementamos la cantidad del producto en 1
    products[index].quantity = (products[index].quantity || 0) + 1;
    // Guardamos los productos actualizados en el localStorage
    localStorage.setItem('products', JSON.stringify(products));
    // Mostramos la lista de productos actualizada en la página
    showProducts();
}

// Función para disminuir la cantidad del producto
function decreaseQuantity(index) {
    // Verificamos que la cantidad sea mayor que 0
    if (products[index].quantity > 0) {
        // Disminuimos la cantidad del producto en 1
        products[index].quantity -= 1;
        // Guardamos los productos actualizados en el localStorage
        localStorage.setItem('products', JSON.stringify(products));
        // Mostramos la lista de productos actualizada en la página
        showProducts();
    }
}

// Función para eliminar un producto
function deleteProduct(index) {
    Swal.fire({
        title: '¿Está seguro de eliminar el producto?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, seguro',
        cancelButtonText: 'No, no quiero'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: 'Borrado!',
                icon: 'success',
                text: 'El archivo ha sido borrado'
            })

            // Eliminamos el producto del arreglo usando splice
            products.splice(index, 1);

            // Guardamos los productos actualizados en el localStorage
            localStorage.setItem('products', JSON.stringify(products));

            // Mostramos la lista de productos actualizada en la página
            showProducts();
        }
    });
}

function addToCart(index) {
    // Obtenemos el producto seleccionado
    const product = products[index];

    // Verificamos que la cantidad sea mayor que 0 antes de agregar al carrito
    if (product.quantity > 0) {
        // Crea un nuevo arreglo 'cart' si no existe en localStorage
        const cart = JSON.parse(localStorage.getItem('cart')) || [];

        // Verificamos si el producto ya existe en el carrito
        const existingProduct = cart.find(item => item.name === product.name);

        if (existingProduct) {
            // Si el producto ya existe, incrementamos la cantidad y actualizamos el total
            existingProduct.quantity += product.quantity;
            existingProduct.total = existingProduct.price * existingProduct.quantity;
        } else {
            // Si el producto no existe, lo agregamos al carrito
            cart.push(product);
        }

        // Mostramos mensaje de éxito
        Toastify({
            text: "Agregado al carrito con éxito",
            duration: 3000,
            gravity: "top",
            position: "right",
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
            }
        }).showToast();

        // Reseteamos la cantidad del producto a cero
        product.quantity = 0;

        // Guardamos el carrito actualizado en el localStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        // Mostramos los productos del carrito actualizados en la página
        showProductsInCart();
        showProducts(); //Para setear cantidades en la página.
    } else {
        // Mostrar mensaje de error si la cantidad es 0 o menor
        Toastify({
            text: "La cantidad debe ser mayor a 0 para agregar al carrito",
            duration: 3000,
            gravity: "top",
            position: "right",
            style: {
                background: "linear-gradient(to right, #e61717, #f6a703)",
            }
        }).showToast();
    }
}

// Mostrar las ventas.
function showProductsInCart() {
    // Obtenemos una referencia al elemento que contiene el carrito
    const cartList = document.querySelector('#cart-list');
    // Limpiamos el contenido del contenedor del carrito
    cartList.innerHTML = '';

    // Obtenemos los productos almacenados en localStorage como un arreglo
    const cartProducts = JSON.parse(localStorage.getItem('cart')) || [];

    if (cartProducts.length > 0) {
        // Creamos una card para mostrar la compra del día con fecha y productos
        const cardCarrito = document.createElement('div');
        cardCarrito.classList.add('cart-card', 'text-center'); // Agrega la clase CSS para estilos del carrito

        cardCarrito.innerHTML = `
            <h3>Compra del día - ${new Date().toLocaleDateString()} </h3>
            <p><strong>Productos:</strong></p>
        `;

        let totalSales = 0;

        cartProducts.forEach((product) => {
            cardCarrito.innerHTML += `
                <p>${product.name} - Cantidad: ${product.quantity} - Precio: $${product.price} - Precio Total: $${product.price * product.quantity}</p>
            `;
            totalSales += product.price * product.quantity;
        });

        cardCarrito.innerHTML += `
            <p><strong>Total de Ventas:</strong> $${totalSales}</p>
        `;

        // Agregamos la card al contenedor del carrito
        cartList.appendChild(cardCarrito);
    }
}


// Event listener para el evento DOMContentLoaded, que se dispara cuando la página ha cargado completamente
document.addEventListener('DOMContentLoaded', function () {

    // Obtenemos una referencia al formulario para agregar productos
    const form = document.querySelector('#add-product-form');
    if (form) {
        // Agregamos un event listener para el evento submit del formulario
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            // Obtenemos los valores de los campos del formulario
            const name = document.querySelector('#product-name').value;
            const description = document.querySelector('#product-description').value;
            const price = document.querySelector('#product-price').value;
            // Agregamos el nuevo producto con cantidad 0 (por defecto)
            addProduct(name, description, price, 0);
        });
    }

    // Verificamos si hay productos almacenados en el localStorage
    if (localStorage.getItem('products')) {
        // Si hay productos, los cargamos en el arreglo products
        products = JSON.parse(localStorage.getItem('products'));
    }
    // Mostramos la lista de productos en la página
    showProducts();
    showProductsInCart();
});




  // Simulamos una llamada a una API que devuelve los datos de ventas en formato JSON
function fetchSalesData() {
  
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const salesData = [
          { date: '2023-08-01', product: 'Producto 1', quantity: 5, total: 100 },
          { date: '2023-08-01', product: 'Producto 2', quantity: 3, total: 75 },
          { date: '2023-08-02', product: 'Producto 1', quantity: 2, total: 40 },
          { date: '2023-08-02', product: 'Producto 3', quantity: 4, total: 120 }
        ];
        resolve(salesData);
      }, 1000); // Simulamos un tiempo de respuesta de 1 segundo
    });
  }
  
  function displaySalesData(salesData) {
    const salesContainer = document.querySelector('#sales-container');
    salesContainer.innerHTML = '';
  
    salesData.forEach((sale) => {
      const saleCard = document.createElement('div');
      saleCard.classList.add('sale-card');
  
      saleCard.innerHTML = `
        <h3>Fecha: ${sale.date}</h3>
        <p>Producto: ${sale.product}</p>
        <p>Cantidad vendida: ${sale.quantity}</p>
        <p>Total de ventas: $${sale.total}</p>
      `;
  
      salesContainer.appendChild(saleCard);
    });
  }
  
  async function loadSalesData() {
    try {
      const salesData = await fetchSalesData();
      displaySalesData(salesData);
    } catch (error) {
      console.error('Error al cargar los datos de ventas:', error);
    }
  }
  
  document.addEventListener('DOMContentLoaded', loadSalesData);
  