document.getElementById('consultaForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const pregunta = document.getElementById('pregunta').value;

    const response = await fetch('http://localhost:3000/api/consulta', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ pregunta })
    });

    const data = await response.json();
    document.getElementById('respuesta').innerText = data.respuesta;
});
