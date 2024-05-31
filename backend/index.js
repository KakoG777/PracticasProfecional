const express = require('express');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

const app = express();
const port = 3000;

app.use(bodyParser.json());

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

app.post('/ask', async (req, res) => {
    const { question } = req.body;

    if (!question) {
        return res.status(400).send({ error: 'Pregunta no proporcionada' });
    }

    try {
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: question,
            max_tokens: 150,
        });

        res.send({ answer: response.data.choices[0].text.trim() });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Error al obtener la respuesta de OpenAI' });
    }
});

app.listen(port, () => {
    console.log(`Servidor ejecutándose en http://localhost:${port}`);
});
