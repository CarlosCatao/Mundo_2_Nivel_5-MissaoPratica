import { Livro } from '../modelo/Livro';

const baseURL = "http://localhost:3030/livros";

export type LivroId = {
  _id: string;
  codigo: string;
  codEditora: number;
  titulo: string;
  resumo: string;
  autores: string[];
};

interface LivroMongo {
  _id: { $oid: string } | null;
  codigo: string;
  codEditora: number;
  titulo: string;
  resumo: string;
  autores: string[];
}

export class ControleLivro {

  // Método para obter livros do servidor
  async obterLivros(): Promise<Array<Livro>> {
    try {
      const resposta = await fetch(baseURL, { method: 'GET' });
      const livrosMongo: LivroMongo[] = await resposta.json();

      // Mapeia o formato LivroMongo para Livro, convertendo _id.$oid para string
      return livrosMongo.map((livroMongo: LivroMongo) => ({
        
        codigo: String(livroMongo.codigo),
        codEditora: livroMongo.codEditora,
        titulo: livroMongo.titulo,
        resumo: livroMongo.resumo,
        autores: livroMongo.autores

      }));
    } catch (error) {
      console.error("Erro ao obter livros:", error);
      return [];
    }
  }

  // Método para incluir um novo livro no servidor
  async incluir(livro: Livro): Promise<boolean> {
    try {
      const livroMongo: LivroMongo = {
        _id: null,
        codigo: String(livro.codigo),
        codEditora: livro.codEditora,
        titulo: livro.titulo,
        resumo: livro.resumo,
        autores: livro.autores,
      };
      const resposta = await fetch(baseURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(livroMongo),
      });
      if (!resposta.ok && resposta.status === 409) {
        console.error("Erro: Código já existe no banco de dados.");
        return false;
       }
      return resposta.ok;
    } catch (error) {
      console.error("Erro ao incluir livro:", error);
      return false;
    }
  }

  // Método para excluir um livro do servidor
  async excluir(codigo: string): Promise<boolean> {
    try {

      const id = await this.obterIdPorCodigo(codigo);

      const resposta = await fetch(`${baseURL}/${id}`, {
        method: 'DELETE',
      });
      return resposta.ok;
    } catch (error) {
    console.error("Erro ao excluir livro:", error);
    return false;
    }
  }

  // Método para obter o _id para exclusao
  async obterIdPorCodigo(codigo: string): Promise<string | null> {
    try {
      const resposta = await fetch(baseURL, { method: 'GET' });
      const livrosId: LivroId[] = await resposta.json();

      // Verifica se a resposta foi bem-sucedida
      if (!resposta.ok) {
        throw new Error('Erro ao buscar o livro');
      }  

      // Localiza o Livro correspondente ao codigo informado
      const livro = livrosId.find((livro) => livro.codigo === codigo);

      // Retorna o _id se encontrado, caso contrário retorna null
      return livro ? livro._id : null;

    } catch (error) {
      console.error('Erro:', error);
      return null;
    }  
  }
}

export const controleLivro = new ControleLivro();