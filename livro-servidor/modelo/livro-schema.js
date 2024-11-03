const mongoose = require('mongoose');

mongoose.set('strictQuery', true);

const livroSchema = new mongoose.Schema({
    codigo: { type: String, required: true, unique: true },
    codEditora: { type: Number, required: true },
    titulo: { type: String, required: true },
    resumo: { type: String, required: true },
    autores: { type: [String], required: true }
});

// Criação do índice para garantir unicidade
livroSchema.index({ codigo: 1 }, { unique: true });

// Tratamento do modelo
const Livro = mongoose.model('Livro', livroSchema);

// Certifique-se de que o índice é criado ao iniciar o servidor
Livro.createIndexes()
    .then(() => console.log('Índices criados com sucesso'))
    .catch((error) => console.error('Erro ao criar índice:', error));

module.exports = Livro;
