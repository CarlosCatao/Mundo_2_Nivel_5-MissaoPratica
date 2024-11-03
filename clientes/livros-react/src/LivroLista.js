import React, { useState, useEffect } from 'react';
import { controleLivro } from './controle/ControleLivros';
import { controleEditora } from './controle/ControleEditora';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

//import LinhaLivro from './LinhaLivro';

const LivroLista = () => {
  const [livros, setLivros] = useState([]);
  const [carregado, setCarregado] = useState(false);

  // Chamada assíncrona para obter todos os livros no useEffect
  useEffect(() => {
    controleLivro.obterLivros().then((livrosObtidos) => {
      setLivros(livrosObtidos);
      setCarregado(true);
    });
  }, [carregado]);

  // Método excluir com uso de .then para atualizar carregado apenas ao final
  const excluir = (codigo) => {
    controleLivro.excluir(String(codigo)).then((resposta) => {
      if (resposta) {
        setCarregado(false);  // Isso vai disparar o useEffect e atualizar a lista
      } else {
        console.error("Falha ao excluir o livro.");
      }
    });
  };
  
  return (
    <main>

    <h1 style={{ paddingLeft: '10%', textAlign: 'left' }}>Catálogo de Livros</h1>

    <div className="d-flex justify-content-center mt-4">
      <table style={{ width: '80%' }}>
        
          <thead  className="table-head-bg-black">
            <tr>
              <th>Título</th>
              <th>Resumo</th>
              <th>Editora</th>
              <th>Autores</th>
            </tr>
          </thead>
        
        <tbody  className="zebra-striped">
          {livros.map((livro) => {

//{livros.map((livro, index) => (
//  <LinhaLivro key={index} livro={livro} excluir={excluir} />


            const nomeEditora = controleEditora.getNomeEditora(livro.codEditora);
            return (
             <tr key={livro.codigo}>
                <td>
                  <div>
                    <strong>{livro.titulo}</strong>
                  </div>
                  <div>
                    <button 
                      onClick={() => excluir(livro.codigo)} 
                      className="btn btn-danger btn-sm mt-2"
                    >
                    Excluir
                    </button>
                  </div>
                </td>
                <td>{livro.resumo}</td>
                <td>{nomeEditora}</td>
                <td>
                  <ul>
                    {livro.autores.map((autor, index) => (
                      <li key={index}>{autor}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </main>
  );
};

export default LivroLista;
