const Livro = require('./livro-schema');

const obterLivros = async () => {
    try {
        const livros = await Livro.find();
        console.log(livros);
        return livros;
      } catch (error) {
        console.error('Erro ao obter livros:', error);
        throw error;
      } 
};

const incluir = async (livro) => {
    try {
        console.log("Incluir - livro recebido: ", livro);
        const novoLivro = await Livro.create(livro);
        console.log("Incluir: ", novoLivro);
        return novoLivro;
      } catch (error) {
        if (error.code === 11000) {
          console.error('Erro: Código duplicado. O código do livro deve ser único.');
          throw new Error('Código duplicado: O código do livro já existe.');
      } else {
          console.error('Erro ao incluir livro:', error);
          throw error;
      }      }    
};

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
