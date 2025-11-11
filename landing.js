requireLogin();

var mensajes = [
  "Bienvenido a la Shop.",
  "Que se le ofrece mi estimado.",
  "Pregunte por lo que no vea."
];
var idx = 0;
var slide = document.getElementById("slide");

function mostrarSlide() {
  slide.textContent = mensajes[idx];
}
mostrarSlide();

document.getElementById("prev").onclick = function () {
  idx = (idx - 1 + mensajes.length) % mensajes.length;
  mostrarSlide();
};
document.getElementById("next").onclick = function () {
  idx = (idx + 1) % mensajes.length;
  mostrarSlide();
};

var cont = document.getElementById("landingProducts");
var msg = document.getElementById("landingMsg");

fetch("https://dummyjson.com/products?limit=16")
  .then(function (res) { return res.json(); })
  .then(function (data) {
    data.products.forEach(function (p) {
      var card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML =
        "<img src='" + p.thumbnail + "'>" +
        "<h4>" + p.title + "</h4>" +
        "<p>" + p.category + "</p>";
      cont.appendChild(card);
    });
  })
  .catch(function () {
    msg.textContent = "No se pudieron cargar los productos.";
    msg.classList.add("error");
  });
