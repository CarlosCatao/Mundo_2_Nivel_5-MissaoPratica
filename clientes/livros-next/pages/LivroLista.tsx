import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../styles/Livro.module.css';
import Head from 'next/head';
import Menu from '../componentes/Menu';
import LinhaLivro from '../componentes/LinhaLivro';
import ControleEditora from '../classes/controle/ControleEditora';
import ControleLivros from '../classes/controle/ControleLivros';

// Instancia o controle de editoras
const controleEditora = new ControleEditora();

// Instancia o controle de livros
const controleLivros = new ControleLivros();

const LivroLista: React.FC = () => {

    // Armazena a lista de livros e o status do carregamento
    const [livros, setLivros] = useState<Array<any>>([]);

    const [carregado, setCarregado] = useState<boolean>(false);

useEffect(() => {
  controleLivros.obterLivros().then((result) => {
    setLivros(result);
    setCarregado(true);
  });
}, []);

// Função para excluir livro
const excluirLivro = async (codigo: string) => {
  const sucesso = await controleLivros.excluir(codigo);
    if (sucesso) {
      setLivros(livros.filter((livro) => livro.codigo !== codigo));
    } else {
      alert("Erro ao excluir o livro.");
    }
};

return (
  <div  className={styles.container}>
      <Head>
        <title>Catálogo de Livros</title>
        <meta name="description" content="Exibição da lista de livros disponíveis" />
      </Head>
      <Menu />
      <main className={styles.main}>
        <h1>Catálogo de Livros</h1>
          <table className={styles.table}>
            <thead className="table-head-bg-black">
            <tr>
              <th>Título</th>
              <th>Resumo</th>
              <th>Editora</th>
              <th>Autores</th>
            </tr>
          </thead>
          <tbody className={styles['zebra-striped']}>
            {carregado && livros.map((livro) => (
              <tr key={livro.codigo}>
                <td>
                  <div>
                    {livro.titulo}
                  </div>
                  <div>
                    <button onClick={() => excluirLivro(livro.codigo)}
                      className="btn btn-danger btn-sm mt-2"
                    >
                      Excluir
                    </button>
                  </div>
                </td>
                <td>{livro.resumo}</td>
                <td>{controleEditora.getNomeEditora(livro.codEditora)}</td>
                <td>
                  <ul>
                    {livro.autores.map((autor, index) => (
                      <li key={index}>{autor}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
);

};

export default LivroLista;
