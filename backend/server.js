require('dotenv').config();
const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3001;

// Middleware para permitir CORS
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Conexión a la base de datos MySQL
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user:  process.env.DB_USER, // Reemplaza 'tu_usuario' con el nombre de usuario de tu base de datos
  password: process.env.DB_PASSWORD, // Reemplaza 'tu_contraseña' con la contraseña de tu base de datos
  database: process.env.DB_NAME // Reemplaza 'tu_base_de_datos' con el nombre de tu base de datos
});

// Conectar a la base de datos
connection.connect((err) => {
  if (err) {
    console.error('Error conectando a la base de datos: ', err);
    return;
  }
  console.log('Conexión exitosa a la base de datos');
});

// Ejemplo de una ruta que consulta la base de datos
app.get('/test-db', (req, res) => {
  connection.query('SELECT 1 + 1 AS solution', (err, results) => {
    if (err) {
      console.error('Error ejecutando la consulta: ', err);
      res.status(500).send('Error en la base de datos');
      return;
    }
    res.send(`La solución es: ${results[0].solution}`);
  });
});

// Ruta de inicio (puedes personalizar según tus necesidades)
app.get('/', (req, res) => {
  res.send('¡Hola Mundo!');
});

// Ruta para crear una cuenta
app.post('/crear-cuenta', (req, res) => {
  const { nombre, email, password } = req.body;
  const query = 'INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)';
  connection.query(query, [nombre, email, password], (err, results) => {
    if (err) {
      console.error('Error al crear la cuenta: ', err);
      res.status(500).send('Error en la base de datos');
      return;
    }
    res.status(200).send('Cuenta creada exitosamente');
  });
});

// Ruta para iniciar sesión
app.post('/iniciar-sesion', (req, res) => {
  const { email, password } = req.body;
  const query = 'SELECT * FROM usuarios WHERE email = ? AND password = ?';
  connection.query(query, [email, password], (err, results) => {
    if (err) {
      console.error('Error al iniciar sesión: ', err);
      res.status(500).send('Error en la base de datos');
      return;
    }
    if (results.length > 0) {
      res.status(200).send('Inicio de sesión exitoso');
    } else {
      res.status(401).send('Credenciales incorrectas');
    }
  });
});

// Endpoint para interactuar con la API de OpenAI
app.post('/openai', async (req, res) => {
  const prompt = req.body.prompt;

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/engines/davinci-codex/completions',
      {
        prompt: prompt,
        max_tokens: 150
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.API_KEY}`
        }
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error('Error interacting with OpenAI API:', error);
    res.status(500).send('Error interacting with OpenAI API');
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

module.exports = connection;
