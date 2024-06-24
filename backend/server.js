const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

// Middleware para permitir CORS
app.use(cors());

// Middleware para servir archivos estáticos desde la carpeta 'public'
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configuración de la conexión a la base de datos MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Reemplaza 'tu_usuario' con el nombre de usuario de tu base de datos
  password: '2032562885600', // Reemplaza 'tu_contraseña' con la contraseña de tu base de datos
  database: 'mi_sitio_web', // Reemplaza 'tu_base_de_datos' con el nombre de tu base de datos
});

connection.connect((err) => {
  if (err) {
    console.error('Error de conexión a la base de datos: ' + err.stack);
    return;
  }
  console.log('Conectado a la base de datos MySQL como id ' + connection.threadId);
});

// Endpoint para obtener datos de clientes
app.get('/api/clientes', (req, res) => {
  connection.query('SELECT * FROM clientes', (error, results) => {
    if (error) {
      console.error('Error al obtener datos de la base de datos: ' + error.stack);
      res.status(500).json({ error: 'Error al obtener datos' });
      return;
    }
    res.json(results);
  });
});

// Endpoint para crear usuario
app.post('/crear-usuario', (req, res) => {
  const { email, password } = req.body;
  const sql = 'INSERT INTO usuarios (email, password) VALUES (?, ?)';
  connection.query(sql, [email, password], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error al crear el usuario');
    } else {
      res.send('Usuario creado exitosamente');
    }
  });
});

// Endpoint para iniciar sesión
app.post('/iniciar-sesion', (req, res) => {
  const { email, password } = req.body;
  const sql = 'SELECT * FROM usuarios WHERE email = ? AND password = ?';
  connection.query(sql, [email, password], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error al iniciar sesión');
    } else {
      if (results.length > 0) {
        res.send('Inicio de sesión exitoso');
      } else {
        res.status(401).send('Credenciales incorrectas');
      }
    }
  });
});

// Endpoint para integrar OpenAI
app.post('/openai', async (req, res) => {
  const { question } = req.body;
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

    res.json({ text: response.data.choices[0].text });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error al obtener respuesta de OpenAI');
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
