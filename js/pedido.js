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
    // Creamos una nueva instancia de la clase Producto con los datos recibidos
    const product = new Producto(name, description, price, quantity);
    // Agregamos el producto al arreglo de productos
    products.push(product);
    // Guardamos los productos en el localStorage como un JSON
    localStorage.setItem('products', JSON.stringify(products));
    // Mostramos la lista de productos actualizada en la página
    showProducts();
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
    // Eliminamos el producto del arreglo usando splice
    products.splice(index, 1);
    // Guardamos los productos actualizados en el localStorage
    localStorage.setItem('products', JSON.stringify(products));
    // Mostramos la lista de productos actualizada en la página
    showProducts();
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
            // Limpiamos el formulario
            form.reset();
        });
    }
    
    // Verificamos si hay productos almacenados en el localStorage
    if (localStorage.getItem('products')) {
        // Si hay productos, los cargamos en el arreglo products
        products = JSON.parse(localStorage.getItem('products'));
    }
    // Mostramos la lista de productos en la página
    showProducts();
});
