document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
  
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
  });
  