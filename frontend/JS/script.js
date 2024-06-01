document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.getElementById('login-form');
  const signupForm = document.getElementById('signup-form');


  if (loginForm) {
  loginForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Evita el envío del formulario
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    // Aquí puedes enviar los datos del formulario a tu backend para la autenticación
    console.log('Iniciar Sesión:', email, password);
  });
}

  
if (signupForm) {
  signupForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Evita el envío del formulario
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    // Aquí puedes enviar los datos del formulario a tu backend para la creación de cuenta
    console.log('Crear Cuenta:', email, password);
  });
}
});

// Evento para manejar la entrada de preguntas
document.getElementById("question-input").addEventListener("keyup", function(event) {
if (event.keyCode === 13) { // Verifica si se presionó la tecla Enter
  var question = this.value; // Obtiene la pregunta ingresada por el usuario
  var answer = obtenerRespuesta(question); // Obtiene la respuesta correspondiente
  mostrarRespuesta(answer); // Muestra la respuesta en la página
  this.value = ""; // Limpia el input de pregunta
}
});

// Función para obtener la respuesta basada en la pregunta
function obtenerRespuesta(question) {
// Aquí podrías implementar la lógica para obtener la respuesta basada en la pregunta
// Por ahora, simplemente retornaré una respuesta genérica.
return "Esta es una respuesta genérica a la pregunta: " + question;
}

// Función para mostrar la respuesta en la página
function mostrarRespuesta(answer) {
  const answerContainer = document.getElementById('answer-container');
  if (answerContainer) {
    answerContainer.innerHTML = "<p>" + answer + "</p>";
  }
}