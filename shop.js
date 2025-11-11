requireLogin();

var contShop = document.getElementById("shopProducts");
var shopMsg = document.getElementById("shopMsg");
var cartBody = document.getElementById("cartBody");
var cartTotal = document.getElementById("cartTotal");

var carrito = {}; 
fetch("https://dummyjson.com/products?limit=20")
  .then(function (res) { return res.json(); })
  .then(function (data) {
    data.products.forEach(function (p) {
      var card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML =
        "<img src='" + p.thumbnail + "'>" +
        "<h4>" + p.title + "</h4>" +
        "<p>$" + p.price + "</p>" +
        "<button>Agregar al carrito</button>";

      card.querySelector("button").addEventListener("click", function () {
        agregarAlCarrito(p);
      });

      contShop.appendChild(card);
    });
  })
  .catch(function () {
    shopMsg.textContent = "Error al cargar productos.";
    shopMsg.classList.add("error");
  });

function agregarAlCarrito(prod) {
  if (!carrito[prod.id]) {
    carrito[prod.id] = { titulo: prod.title, precio: prod.price, cantidad: 0 };
  }
  carrito[prod.id].cantidad += 1;
  renderCarrito();
}

function renderCarrito() {
  cartBody.innerHTML = "";
  var total = 0;

  for (var id in carrito) {
    var item = carrito[id];
    var subtotal = item.precio * item.cantidad;
    total += subtotal;

    var tr = document.createElement("tr");
    tr.innerHTML =
      "<td>" + item.titulo + "</td>" +
      "<td>" + item.cantidad + "</td>" +
      "<td>$" + item.precio + "</td>" +
      "<td>$" + subtotal + "</td>";
    cartBody.appendChild(tr);
  }

  cartTotal.textContent = "$" + total;
}
