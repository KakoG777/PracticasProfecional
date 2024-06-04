document.getElementById('search-button').addEventListener('click', async function(event) {
    event.preventDefault();
    const question = document.getElementById('question-input').value;

    const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ question: question })
    });

    if (response.ok) {
        const data = await response.json();
        document.getElementById('response-text').innerText = data.answer;
    } else {
        document.getElementById('response-text').innerText = 'Error al obtener respuesta';
    }
});
