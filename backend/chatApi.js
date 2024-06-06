const express = require('express');
const router = express.Router();

// Simulación de conexión a una AI (reemplaza con tu lógica de AI)
router.post('/ask', (req, res) => {
  const question = req.body.question;

  // Aquí va la lógica para conectar y obtener la respuesta de la AI
  const responseFromAI = "Esta es una respuesta simulada a tu pregunta: " + question;

  res.json({ response: responseFromAI });
});

module.exports = router;
