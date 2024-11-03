const express = require('express');
const { body, param, validationResult } = require('express-validator');
const router = express.Router();
const livroDao = require('../modelo/livro-dao');

// Função para tratar erros de validação
const validarResultados = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ erros: errors.array() });
    }
    next();
};

// Rota para obter todos os livros (GET)
router.get('/', async (req, res) => {
    try {
        const livros = await livroDao.obterLivros();
        res.json(livros);
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao obter livros', erro: error.message });
    }
});

// Rota para incluir um novo livro (POST)
router.post('/', 
    [
        body('titulo').isString().withMessage('Título deve ser uma string'),
        body('resumo').isString().optional().withMessage('Resumo deve ser uma string'),
        body('codEditora').isInt().withMessage('Código da editora deve ser um número inteiro'),
        body('autores').isArray().withMessage('Autores deve ser uma lista de strings'),
    ],
    validarResultados,
    async (req, res) => {
    try {
        const dadosLivro = req.body; // Obtendo os dados do livro do corpo da requisição

        const novoLivro = await livroDao.incluir(dadosLivro);

        res.status(201).json({ mensagem: 'Livro incluído com sucesso', novoLivro });  // Retorna o livro criado
    } catch (error) {
        console.error('Erro ao salvar livro:', error);
        res.status(500).json({ mensagem: 'Erro ao incluir livro', erro: error.message });
    }
});

// Rota para excluir um livro pelo _id (DELETE)
router.delete('/:id',
    param('id').isMongoId().withMessage('ID inválido'),
    validarResultados,
    async (req, res) => {
    const livroId = req.params.id;
    try {
        const resultado = await livroDao.excluir(livroId);
        if (resultado.deletedCount > 0) {
            res.json({ mensagem: 'Livro excluído com sucesso' });
        } else {
            res.status(404).json({ mensagem: 'Livro não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao excluir livro', erro: error.message });
    }
});

// Exporta o router
module.exports = router;