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
  