import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Editora } from '../models/editora';
import { Livro } from '../models/Livro';
import { ControleEditoraService } from '../services/controle-editora.service';
import { ControleLivroService } from '../services/controle-livros.service';

@Component({
  selector: 'app-livro-dados',
  templateUrl: './livro-dados.component.html',
  styleUrls: ['./livro-dados.component.css']
})

export class LivroDadosComponent implements OnInit  {

  livro: Livro = new Livro();
  editoras: Array<Editora> = [];
  autoresForm: string = '';

  constructor(
    private controleEditora: ControleEditoraService,
    private controleLivros: ControleLivroService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Inicializa a Lista de Editoras obtendo as informações do Serviço
    this.editoras = this.controleEditora.getEditoras();
  }

  incluir = (): void => {
    this.livro.autores = this.autoresForm.split(',').map((autor) => autor.trim()); // Convert to array
    this.controleLivros.incluir(this.livro).then((sucesso: boolean) => {
      if (sucesso) {
        this.router.navigateByUrl('/lista');
      } else {
        alert("Erro ao incluir o livro.");
      }
    });
  }
}