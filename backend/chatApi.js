const express = require('express');
const router = express.Router();
// Definición de rutas API
router.get('/', (_req, res) => {
  console.log('Solicitud GET a /chat recibida');
  res.json({ message: '¡Hola desde la ruta /chat!' });
});
// Puedes agregar más rutas aquí
router.post('/message', (req, res) => {
  const message = req.body.message;
  res.json({ status: 'Mensaje recibido', message });
});

module.exports = router;
