const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware para analisar JSON
app.use(express.json());

// Conexão ao MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Conectado ao MongoDB');
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error.message);
    process.exit(1);
  }
};

// Iniciar a conexão ao banco de dados
connectDB();

// Definição de um esquema e modelo de nota
const noteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
});

const Note = mongoose.model('Note', noteSchema);

// Rota para adicionar uma nova nota
app.post('/api/notes', async (req, res) => {
  const { title, content } = req.body;
  
  try {
    const newNote = new Note({ title, content });
    await newNote.save();
    res.status(201).json(newNote);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao adicionar nota', error });
  }
});

// Rota para obter todas as notas
app.get('/api/notes', async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter notas', error });
  }
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
