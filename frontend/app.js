// URL da API do backend
const apiUrl = 'http://localhost:5000/api/notes';

// Carregar notas ao iniciar
document.addEventListener('DOMContentLoaded', getNotes);

// Referências dos elementos do DOM
const noteList = document.getElementById('note-list');
const titleInput = document.getElementById('title');
const contentInput = document.getElementById('content');
const addNoteButton = document.getElementById('add-note');

// Função para buscar todas as notas
async function getNotes() {
    try {
        const response = await fetch(apiUrl);
        const notes = await response.json();
        renderNotes(notes);
    } catch (error) {
        console.error('Erro ao buscar notas:', error);
    }
}

// Função para adicionar uma nova nota
addNoteButton.addEventListener('click', async () => {
    const title = titleInput.value;
    const content = contentInput.value;

    if (title && content) {
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, content }),
            });
            const newNote = await response.json();
            addNoteToDOM(newNote);
            titleInput.value = '';
            contentInput.value = '';
        } catch (error) {
            console.error('Erro ao adicionar nota:', error);
        }
    }
});

// Função para renderizar as notas no DOM
function renderNotes(notes) {
    noteList.innerHTML = '';
    notes.forEach(note => addNoteToDOM(note));
}

// Função para adicionar uma nota ao DOM
function addNoteToDOM(note) {
    const li = document.createElement('li');
    li.innerHTML = `<h3>${note.title}</h3><p>${note.content}</p>`;
    noteList.appendChild(li);
}
