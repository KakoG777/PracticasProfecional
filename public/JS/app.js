document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.getElementById('login-form');
  const signupForm = document.getElementById('signup-form');
  const chatForm = document.getElementById('chat-form');
  const chatInput = document.getElementById('question-input');
  const chatOutput = document.getElementById('response-text');

  if (loginForm) {
    loginForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const email = document.getElementById('login-email').value;
      const password = document.getElementById('login-password').value;
      console.log('Iniciar Sesión:', email, password);
    });
  }

  if (signupForm) {
    signupForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const email = document.getElementById('signup-email').value;
      const password = document.getElementById('signup-password').value;
      console.log('Crear Cuenta:', email, password);
    });
  }

  if (chatForm) {
    chatForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const question = chatInput.value;

      fetch('/chat/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ question: question })
      })
      .then(response => response.json())
      .then(data => {
        chatOutput.innerText = data.response;
      })
      .catch(error => console.error('Error:', error));
    });
  }
});
