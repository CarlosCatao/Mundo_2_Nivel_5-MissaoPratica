import { Injectable } from '@angular/core';
import { Editora } from '../modelo/Editora';

@Injectable({
  providedIn: 'root',
})
export class ControleEditoraService {
  private editoras: Array<Editora> = [
    { codEditora: 1, nome: 'Editora A' },
    { codEditora: 2, nome: 'Editora B' },
    { codEditora: 3, nome: 'Editora C' },
  ];

  getEditoras(): Array<Editora> {
    return this.editoras;
  }

  getNomeEditora(codEditora: number): string | undefined {
    const editora = this.editoras.filter(e => e.codEditora === codEditora);
    return editora.length > 0 ? editora[0].nome : undefined;
  }
}
