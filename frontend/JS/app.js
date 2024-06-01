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

//Validación de Formulario//

document.getElementById('consultaForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const pregunta = document.getElementById('pregunta').value;

    if (!pregunta.trim()) {
        alert('Por favor, ingrese una pregunta.');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/api/consulta', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ pregunta })
        });

        const data = await response.json();
        document.getElementById('respuesta').innerText = data.respuesta;
    } catch (error) {
        console.error('Error al enviar la solicitud:', error);
        document.getElementById('respuesta').innerText = 'Error al obtener la respuesta.';
    }
});
