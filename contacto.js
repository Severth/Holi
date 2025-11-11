requireLogin();

var formCon = document.getElementById("formContacto");
var conMsg = document.getElementById("conMsg");

formCon.addEventListener("submit", function (e) {
  e.preventDefault();

  var nombre = document.getElementById("conNombre").value.trim();
  var email = document.getElementById("conEmail").value.trim();
  var mensaje = document.getElementById("conMensaje").value.trim();

  conMsg.textContent = "";
  conMsg.className = "msg";

  if (!nombre || !email || !mensaje) {
    conMsg.textContent = "Todos los campos son obligatorios.";
    conMsg.classList.add("error");
    return;
  }

  if (email.indexOf("@") === -1) {
    conMsg.textContent = "Correo no válido.";
    conMsg.classList.add("error");
    return;
  }

  conMsg.textContent = "Mensaje enviado correctamente (demo).";
  conMsg.classList.add("ok");
  formCon.reset();
});
