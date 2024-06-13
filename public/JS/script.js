document.addEventListener('DOMContentLoaded', function() {
  const chatForm = document.getElementById('chat-form');
  console.log(chatForm); // Esto debería mostrar el elemento o null si no se encuentra
  if (chatForm) {
    chatForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const questionInput = document.getElementById('question-input').value;
      // Lógica de la pregunta
      console.log('Pregunta enviada:', questionInput);
    });
  } else {
    console.error('Formulario chat-form no encontrado');
  }
});
