import { Injectable } from '@angular/core';
import { Livro }  from '../models/Livro';

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
  _id: string | null;
  codigo: string;
  codEditora: number;
  titulo: string;
  resumo: string;
  autores: string[];
}

@Injectable({
  providedIn: 'root'
})

export class ControleLivroService {

  // metodo para obter livros
  async obterLivros(): Promise<Livro[]> {
    const response = await fetch(baseURL, { method: 'GET' });
    const livrosMongo: LivroMongo[] = await response.json();
    return livrosMongo.map(livro => ({
      codigo: livro.codigo,
      codEditora: livro.codEditora,
      titulo: livro.titulo,
      resumo: livro.resumo,
      autores: livro.autores,
    }));
  }

  // metodo para incluir livros
  async incluir(livro: Livro): Promise<boolean> {
    const livroMongo: LivroMongo = {
      _id: null,
      codigo: "Gerar",
      codEditora: livro.codEditora,
      titulo: livro.titulo,
      resumo: livro.resumo,
      autores: livro.autores,
    };
    const response = await fetch(baseURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(livroMongo),
    });
    return response.ok;
  }

  // metodo para excluir livros
  async excluir(codigo: string): Promise<boolean> {
    try {

      const id = await this.obterIdPorCodigo(codigo);

      // Verifica se o livro foi encontrado
      if (!id) {
        console.error(`Livro com código ${codigo} não encontrado para exclusão.`);
        return false;
      }

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

      // Encontra o livro com o código correspondente
      const livro = livrosId.find((livro) => livro.codigo === codigo);

      // Retorna o _id do livro
      return livro ? livro._id : null;

    } catch (error) {
      console.error('Erro:', error);
      return null;
    }
  }  
}
