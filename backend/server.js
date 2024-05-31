const express = require('express');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require('openai');
const app = express();
const port = 3000;

// Configuración de OpenAI
const configuration = new Configuration({
    apiKey: 'TU_CLAVE_DE_API_DE_OPENAI',
});
const openai = new OpenAIApi(configuration);

// Middleware para parsear JSON
app.use(bodyParser.json());

// Ruta para manejar el formulario
app.post('/api/consulta', async (req, res) => {
    const { pregunta } = req.body;

    try {
        const response = await openai.createCompletion({
            model: 'text-davinci-003',
            prompt: pregunta,
            max_tokens: 150,
        });

        const respuestaAI = response.data.choices[0].text.trim();
        res.json({ respuesta: respuestaAI });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener la respuesta de la IA' });
    }
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});

//Manejo de errores//

app.post('/api/consulta', async (req, res) => {
    const { pregunta } = req.body;

    if (!pregunta || typeof pregunta !== 'string') {
        return res.status(400).json({ error: 'Pregunta inválida' });
    }

    try {
        const response = await openai.createCompletion({
            model: 'text-davinci-003',
            prompt: pregunta,
            max_tokens: 150,
        });

        const respuestaAI = response.data.choices[0].text.trim();
        res.json({ respuesta: respuestaAI });
    } catch (error) {
        console.error('Error al obtener la respuesta de la IA:', error);
        res.status(500).json({ error: 'Error al obtener la respuesta de la IA' });
    }
});
