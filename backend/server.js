const express = require('express');
const bodyParser = require('body-parser');
const { getResponse } = require('./chatApi');
const path = require('path');

const app = express();
const port = 3000;

// Servir archivos estáticos desde el directorio 'public'
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());

app.post('/api/chat', async (req, res) => {
    const { question } = req.body;
    try {
        const answer = await getResponse(question);
        res.json({ answer: answer });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error processing request');
    }
});

// Ruta para manejar cualquier otra petición no definida
app.use((req, res) => {
    res.status(404).send('Not Found');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
