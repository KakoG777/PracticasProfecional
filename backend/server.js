const express = require('express');
const path = require('path');
const cors = require('cors'); // Importa el paquete CORS
const chatApiRouter = require('./chatApi');

const app = express();
const port = process.env.PORT || 3000;

// Middleware para permitir CORS
app.use(cors());

// Middleware para servir archivos estáticos desde el directorio 'public'
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Configurar las rutas de la API
app.use('/chat', chatApiRouter);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
