import { Component, OnInit } from '@angular/core';
import { ControleEditoraService } from '../services/controle-editora.service';
import { ControleLivroService } from '../services/controle-livros.service';
import { Livro } from '../models/Livro';
import { Editora } from '../models/editora';

@Component({
  selector: 'app-livro-lista',
  templateUrl: './livro-lista.component.html',
  styleUrls: ['./livro-lista.component.css']
})

export class LivroListaComponent implements OnInit {

  public editoras: Array<Editora> = [];
  public livros: Array<Livro> = [];

  constructor(
    private controleEditora: ControleEditoraService,
    private controleLivros: ControleLivroService
  ) {}

  ngOnInit(): void {
    
    this.editoras = this.controleEditora.getEditoras();
    
    this.controleLivros.obterLivros().then((livros) => {
      this.livros = livros;
    });
  }

  excluir(codigo: string) {
    this.controleLivros.excluir(codigo).then((sucesso) => {
      if (sucesso) {
        this.controleLivros.obterLivros().then((livros) => (this.livros = livros));
      } else {
        alert("Erro ao excluir o livro.");
      }
    });
  }

  obterNome = (codEditora: number): string | undefined => {
    return this.controleEditora.getNomeEditora(codEditora);
  };
}
