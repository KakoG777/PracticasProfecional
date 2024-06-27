document.addEventListener('DOMContentLoaded', function() {
  // Referencias a elementos del DOM
  const loginForm = document.getElementById('login-form');
  const signupForm = document.getElementById('signup-form');
  const chatForm = document.getElementById('chat-form');
  const chatInput = document.getElementById('question-input');
  const chatOutput = document.getElementById('response-text');
  const searchButton = document.getElementById('search-button');
  const userMenu = document.getElementById('user-menu');
  const userButton = document.getElementById('user-button');
  const userDropdown = document.getElementById('user-dropdown');

  // Verificación de sesión iniciada
  const isLoggedIn = localStorage.getItem('isLoggedIn');

  if (isLoggedIn) {
    document.querySelector('.login-buttons').style.display = 'none';
    userMenu.style.display = 'block';
  }

  // Manejo del formulario de inicio de sesión
  if (loginForm) {
    loginForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const email = document.getElementById('login-email').value;
      const password = document.getElementById('login-password').value;
      console.log('Iniciar Sesión:', email, password);

      axios.post('/iniciar-sesion', { email, password })
        .then(response => {
          console.log(response.data);
          localStorage.setItem('isLoggedIn', 'true');
          document.querySelector('.login-buttons').style.display = 'none';
          userMenu.style.display = 'block';
        })
        .catch(error => {
          console.error('Error:', error);
        });
    });
  }

  // Manejo del formulario de registro
  if (signupForm) {
    signupForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const email = document.getElementById('signup-email').value;
      const password = document.getElementById('signup-password').value;
      console.log('Crear Cuenta:', email, password);

      axios.post('/crear-usuario', { email, password })
        .then(response => {
          console.log(response.data);
          localStorage.setItem('isLoggedIn', 'true');
          document.querySelector('.login-buttons').style.display = 'none';
          userMenu.style.display = 'block';
        })
        .catch(error => {
          console.error('Error:', error);
        });
    });
  }

  // Manejo del formulario de chat y obtención de respuesta de OpenAI
  if (chatForm) {
    chatForm.addEventListener('submit', async function(event) {
      event.preventDefault();
      const question = chatInput.value;

      try {
        const response = await axios.post('https://api.openai.com/v1/completions', {
          model: "gpt-3.5-turbo",
          prompt: question,
          max_tokens: 100,
          n: 1,
          stop: null,
          temperature: 1
        }, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `OPENAI_API_KEY=your_openai_api_key` // Reemplaza con tu API Key de OpenAI
          }
        });

        chatOutput.innerText = response.data.choices[0].text;
      } catch (error) {
        console.error('Error:', error);
        chatOutput.innerText = 'Error al obtener respuesta';
      }

      // Limpia el input después de enviar la pregunta
      chatInput.value = '';
    });
  }

  // Manejo del botón de búsqueda
  if (searchButton) {
    searchButton.addEventListener('click', async function(event) {
      event.preventDefault();
      const question = chatInput.value;

      try {
        const response = await axios.post('https://api.openai.com/v1/completions', {
          model: "gpt-3.5-turbo",
          prompt: question,
          max_tokens: 100,
          n: 1,
          stop: null,
          temperature: 1
        }, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `OPENAI_API_KEY=your_openai_api_key` // Reemplaza con tu API Key de OpenAI
          }
        });

        chatOutput.innerText = response.data.choices[0].text;
      } catch (error) {
        console.error('Error:', error);
        chatOutput.innerText = 'Error al obtener respuesta';
      }
    });
  }

  // Manejo del menú de usuario
  if (userButton) {
    userButton.addEventListener('click', function() {
      userDropdown.classList.toggle('show');
    });

    document.addEventListener('click', function(event) {
      if (!userMenu.contains(event.target)) {
        userDropdown.classList.remove('show');
      }
    });
  }


  // Obtener datos de clientes
  const clientesDiv = document.getElementById('clientes');
  if (clientesDiv) {
    axios.get('/api/clientes')
      .then(response => {
        const clientes = response.data;
        clientes.forEach(cliente => {
          const clienteElement = document.createElement('div');
          clienteElement.classList.add('cliente');
          clienteElement.innerHTML = `
            <p><strong>Nombre:</strong> ${cliente.Nombre}</p>
            <p><strong>Apellido:</strong> ${cliente.Apellido}</p>
            <p><strong>Contactos:</strong> ${cliente.Contactos}</p>
            <hr>
          `;
          clientesDiv.appendChild(clienteElement);
        });
      })
      .catch(error => {
        console.error('Error al obtener datos de clientes:', error);
      });
  }
});
