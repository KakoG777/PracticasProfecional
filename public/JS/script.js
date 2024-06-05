document.getElementById("question-input").addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    var question = this.value;
    var answer = obtenerRespuesta(question);
    mostrarRespuesta(answer);
    this.value = "";
  }
});

function obtenerRespuesta(question) {
  return "Esta es una respuesta genérica a la pregunta: " + question;
}

function mostrarRespuesta(answer) {
  const answerContainer = document.getElementById('answer-container');
  if (answerContainer) {
    answerContainer.innerHTML = "<p>" + answer + "</p>";
  }
}
