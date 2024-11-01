import { Injectable } from '@angular/core';
import { Livro } from '../modelo/Livro';

@Injectable({
  providedIn: 'root',
})

export class ControleLivroService {
  private livros: Array<Livro> = [
    {
      codigo: 10,
      codEditora: 1,
      titulo: 'Livro 1',
      resumo: 'Resumo do Livro 1',
      autores: ['Autor 1'],
    },
    {
      codigo: 20,
      codEditora: 2,
      titulo: 'Livro 2',
      resumo: 'Resumo do Livro 2',
      autores: ['Autor 2', 'Autor 3'],
    },
    {
      codigo: 30,
      codEditora: 3,
      titulo: 'Livro 3',
      resumo: 'Resumo do Livro 3',
      autores: ['Autor 4'],
    },
  ];

  obterLivros(): Array<Livro> {
    return this.livros;
  }

  incluir(livro: Livro): void {
    // Gera o novo código baseado no maior código existente
    const novoCodigo = this.livros.length > 0 ? Math.max(...this.livros.map(l => l.codigo)) + 1 : 1;
    livro.codigo = novoCodigo;
    this.livros.push(livro);
  }

  excluir(codigo: number): void {
    const index = this.livros.findIndex(l => l.codigo === codigo);
    if (index >= 0) {
      this.livros.splice(index, 1);
    }
  }
}
