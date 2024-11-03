const Livro = require('./livro-schema');

// Lista os Livros cadastrados
const obterLivros = async () => {
    try {
        const livros = await Livro.find();
        return livros;
      } catch (error) {
        console.error('Erro ao obter livros:', error);
        throw error;
      } 
};

// Incluir um Livro Novo
const incluir = async (livro) => {
    try {
        // Verifica se 'codigo' é null ou não fornecido. Gerar funciona como uma Tag.
        if (livro.codigo === "Gerar" || null || livro.codigo === undefined) {

          // Busca o maior código existente e incrementa em 1 para gerar um novo código único
          const ultimoLivro = await Livro.findOne().sort({ codigo: -1 });

          const novoCodigo = ultimoLivro ? parseInt(ultimoLivro.codigo) + 1 : 1;
          livro.codigo = novoCodigo.toString(); // Converte para string para garantir compatibilidade com o esquema

        }
        const novoLivro = await Livro.create(livro);
        return novoLivro;

        } catch (error) {
            if (error.code === 11000) {
              console.error('Erro: Código duplicado. O código do livro deve ser único.');
              throw new Error('Código duplicado: O código do livro já existe.');
            } else {
                console.error('Erro ao incluir livro:', error);
                throw error;
              }
    } 
};

// Excluir um Livro
const excluir = async (_id) => {
    try {
        const resultado = await Livro.deleteOne({ _id });
        return resultado;
      } catch (error) {
        console.error('Erro ao excluir livro:', error);
        throw error;
      }    
};

module.exports = { obterLivros, incluir, excluir };
