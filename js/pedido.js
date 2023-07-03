// Clase Combo
class Combo {
  constructor(nombre, carne, cantidad, condimentos, papas) {
    this.nombre = nombre;
    this.carne = carne;
    this.cantidad = cantidad;
    this.condimentos = condimentos;
    this.papas = papas;
    this.subTotal = this.calcularPrecio();
  }

  calcularPrecio = () => {
    const precioHamburguesa = 250;
    const precioCarneExtra = 50;
    const precioPapas = 75;

    let subtotal = precioHamburguesa + this.cantidad * precioCarneExtra;
    if (this.papas === "SI") {
      subtotal += precioPapas;
    }

    return subtotal;
  };

  mostrarTicket = () => {
    console.log("--- Ticket de Pedido ---");
    console.log("Cliente:", this.nombre);
    console.log("Tipo de carne:", this.carne);
    console.log("Cantidad de hamburguesas:", this.cantidad);
    console.log("Condimentos:", this.condimentos);
    console.log("Con papas fritas:", this.papas === "SI" ? "Sí" : "No");
    console.log("--- Fin pedido ---");
  };
}

// Variables del pedido
let combos = [];

const pedirDatos = () => {
  const nombreInput = prompt(`Ingrese el nombre del cliente para el combo ${combos.length + 1}`);
  const carneInput = prompt("Ingrese el tipo de proteína que desea en la hamburguesa (250$)");
  const cantidadInput = parseInt(prompt("Cuantas carnes desea en la hamburguesa. Cada carne tiene un extra de $50"));
  const condimentosInput = prompt("Ingrese los condimentos deseados");
  let papasInput;

  do {
    papasInput = prompt("¿Con papas fritas? (SI/NO)").toUpperCase();
    if (papasInput !== "SI" && papasInput !== "NO") {
      alert("Valor incorrecto. Ingrese SI o NO");
    }
  } while (papasInput !== "SI" && papasInput !== "NO");

  const combo = new Combo(nombreInput, carneInput, cantidadInput, condimentosInput, papasInput);
  combos.push(combo);

  // Mostrar el ticket en la consola
  combo.mostrarTicket();
};

const mostrarTickets = () => {
  console.log("--- Tickets de Pedido ---");
  combos.forEach(combo => {
    combo.mostrarTicket();
  });
  console.log("Gracias por su compra. ¡Hasta luego!");
};

const cantidadCombos = () => {
  const cantidad = parseInt(prompt("¿Cuántos combos llevarás?"));

  for (let i = 0; i < cantidad; i++) {
    pedirDatos();
  }

  if (combos.length === 0) {
    console.log("Gracias por su visita. ¡Seguramente la próxima te tentarás!");
  } else {
    let totalPedido = combos.reduce((total, combo) => total + combo.subTotal, 0);
    console.log("---->>>>>>>  Costo total: ", totalPedido);
    mostrarTickets();
  }
};

cantidadCombos();

// BOTÓN QUE DOM .

const mostrarTicket = () => {
  const ticketElement = document.getElementById("ticket");
  let ticketHTML = "<h2>Ticket de Pedido</h2>";

  combos.forEach(combo => {
    ticketHTML += `
      <div class="card mb-4">
        <div class="card-body">
          <h5 class="card-title">Cliente: ${combo.nombre}</h5>
          <p class="card-text">Tipo de Carne: ${combo.carne}</p>
          <p class="card-text">Cantidad de Hamburguesas: ${combo.cantidad}</p>
          <p class="card-text">Condimentos: ${combo.condimentos}</p>
          <p class="card-text">Papas Fritas: ${combo.papas}</p>
          <p class="card-text">Subtotal: ${combo.subTotal}</p>
        </div>
      </div>
    `;
  });

  ticketElement.innerHTML = ticketHTML;
};