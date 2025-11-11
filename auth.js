function requireLogin() {
  var logged = localStorage.getItem("loggedIn");
  if (logged !== "true") {
    window.location.href = "login.html";
  }
}

var btnLogout = document.getElementById("btnLogout");
if (btnLogout) {
  btnLogout.addEventListener("click", function () {
    localStorage.removeItem("loggedIn");
    window.location.href = "login.html";
  });
}

// ======= REGISTRO =======
var formRegistro = document.getElementById("formRegistro");

if (formRegistro) {
  formRegistro.addEventListener("submit", function (e) {
    e.preventDefault();

    var nombre = document.getElementById("regNombre").value.trim();
    var apellido = document.getElementById("regApellido").value.trim();
    var email = document.getElementById("regEmail").value.trim();
    var msg = document.getElementById("regMsg");
    var cred = document.getElementById("regCred");

    msg.textContent = "";
    cred.textContent = "";
    msg.className = "msg";
    cred.className = "msg";

    if (!nombre || !apellido || !email) {
      msg.textContent = "Todos los campos son obligatorios.";
      msg.classList.add("error");
      return;
    }

    if (email.indexOf("@") === -1) {
      msg.textContent = "Correo no válido.";
      msg.classList.add("error");
      return;
    }

    var usuario = (nombre[0] + apellido).toLowerCase();
    var contra = nombre.substring(0, 2).toUpperCase() +
                 apellido.substring(0, 3).toLowerCase() +
                 Math.floor(Math.random() * 90 + 10); // 2 dígitos

    var userObj = {
      usuario: usuario,
      contra: contra,
      nombre: nombre,
      apellido: apellido,
      email: email
    };

    localStorage.setItem("user", JSON.stringify(userObj));
    localStorage.removeItem("loggedIn"); // por si acaso

    msg.textContent = "Registro exitoso. Usa estas credenciales para iniciar sesión.";
    msg.classList.add("ok");
    cred.innerHTML = "Usuario: <b>" + usuario + "</b><br>Contraseña: <b>" + contra + "</b>";
  });
}

// ======= LOGIN =======
var formLogin = document.getElementById("formLogin");

if (formLogin) {
  var logMsg = document.getElementById("logMsg");
  var inputUser = document.getElementById("logUser");
  var inputPass = document.getElementById("logPass");

  // Autocompletar último usuario
  var saved = localStorage.getItem("user");
  if (saved) {
    try {
      var u = JSON.parse(saved);
      inputUser.value = u.usuario;
    } catch (e) {}
  }

  formLogin.addEventListener("submit", function (e) {
    e.preventDefault();
    logMsg.textContent = "";
    logMsg.className = "msg";

    var user = localStorage.getItem("user");
    if (!user) {
      logMsg.textContent = "No hay usuario registrado. Ve a Registro.";
      logMsg.classList.add("error");
      return;
    }

    var data = JSON.parse(user);

    if (inputUser.value === data.usuario && inputPass.value === data.contra) {
      logMsg.textContent = "Inicio de sesión correcto.";
      logMsg.classList.add("ok");
      localStorage.setItem("loggedIn", "true");
      window.location.href = "index.html";
    } else {
      logMsg.textContent = "Usuario o contraseña incorrectos.";
      logMsg.classList.add("error");
    }
  });
}
