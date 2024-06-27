const express = require('express');
const router = express.Router();

// Define las rutas para tu chat API aquí
router.get('https://api.openai.com/v1/engines/davinci-codex/completions', (req, res) => {
  res.send('Hello from chat API');
});

module.exports = router;
