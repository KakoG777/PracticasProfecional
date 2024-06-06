const express = require('express');
const path = require('path');
const apiRouter = require('./routes/api');
const chatApiRouter = require('./chatApi');
const app = express();
const port = process.env.PORT || 3000;

// Middleware para servir archivos estáticos desde el directorio 'public'
app.use(express.json()); // Para parsear el cuerpo de las solicitudes JSON
app.use(express.static(path.join(__dirname, '../public')));

// Ruta de ejemplo para una API
app.use('/api', apiRouter);
app.use('/chat', chatApiRouter);


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
