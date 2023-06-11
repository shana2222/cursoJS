// Variables del pedido

let nombreInput;
let carneInput;
let cantidadInput;
let condimentosInput;
let papasInput;
let totalPedido = 0;
let validoInput = false;
const precioHamburguesa = 250;
let id = 1;
let subTotal;
let combos;

cantidadCombos(); //llamado una función
// Se resuelve utilizando la estructura de control selectiva : if - else  y un bucle do- while

function pedirDatos() {
  // Solicitar información al usuario
  nombreInput = prompt("Ingrese su nombre del cliente para el combo " + id);
  carneInput = prompt(
    "Ingrese el tipo proteina que desea en la hamburguesa, Tiene un costo de $250"
  );
  cantidadInput = parseInt(
    prompt(
      "Cuantas carnes desea en la hamburguesa. Cada carne tiene un extra de $50"
    )
  );
  condimentosInput = prompt("Ingrese los condimentos deseado");

  // Validar la entrada del usuario para las papas fritas
  do {
    papasInput = prompt("Con fritas? Tiene un extra de $75");
    papasInput = papasInput.toUpperCase();
    if (papasInput == "SI") {
      validoInput = true;
    } else if (papasInput == "NO") {
      validoInput = true;
    }
    if (validoInput == false) {
      alert("Valor incorrecto! Ingrese SI o NO");
    }
  } while (!validoInput);

  // Mostrar el ticket en la consola
  ticketEnConsola();

  // Incrementar el contador de combos
  ++id;
}
// Función para calcular el precio total de un combo.
// La haburguesa tiene un costo de 250 , cada carne vale 50 cada una y con las papas se adiciona 75.
// Se resuelve utilizando la estructura de control selectiva : Switch 

function cacularPrecio() {
  subTotal = 0;
  switch (papasInput) {
    case "SI":
      subTotal = precioHamburguesa + cantidadInput * 50 + 75;
      break;
    case "NO":
      subTotal = precioHamburguesa + cantidadInput * 50;
      break;
    default:
      alert("Valor no validoo, ingrese SI o NO");
  }
  return subTotal;
}
// Función para mostrar el ticket del pedido en la consola

function ticketEnConsola() {
  // Mostrar el ticket en la consola
  console.log("--- Ticket de Pedido console.log ---");
  console.log("Cliente:", nombreInput);
  console.log("Tipo de carne:", carneInput);
  console.log("Cantidad de hamburguesas:", cantidadInput);
  console.log("Condimentos:", condimentosInput);
  console.log("Con papas fritas:", papasInput ? "Sí" : "No");
  console.log("--- Fin pedido  ---", id);
}

// Función para solicitar la cantidad de combos y realizar los pedidos correspondientes. Al finalizar dice el total de la compra.
// Se resuelve utilizando la estructura de control iterativa : for 

function cantidadCombos() {
  combos = parseInt(prompt("Cuantas combos llevarás?"));
  for (let i = combos; i > 0; i--) {
    pedirDatos();
    totalPedido = cacularPrecio() + totalPedido;
  }
  if (combos == 0) {
    console.log("Gracias por su visita, Seguramente la próxima te tentas !");
  } else {
    console.log("---->>>>>>>  Costo total: ", totalPedido);
    console.log("Gracias por su compra, hasta luego !");
  }
}

// BOTÓN QUE SOLO FUNCIONA PARA UN PEDIDO - EN PROCESO se buscó en internet como mostrar en html.

function mostrarTicket() {
  var ticketElement = document.getElementById("ticket");
  ticketElement.innerHTML =
    "<h2>Ticket de Pedido</h2>" +
    "<p>Nombre: " +
    nombreInput +
    "</p>" +
    "<p>Tipo de Carne: " +
    carneInput +
    "</p>" +
    "<p>Cantidad de Hamburguesas: " +
    cantidadInput +
    "</p>" +
    "<p>Condimentos: " +
    condimentosInput +
    "</p>" +
    "<p>Papas Fritas: " +
    papasInput +
    "</p>" +
    "<p>Subtotal: " +
    totalPedido +
    "</p>";
}
