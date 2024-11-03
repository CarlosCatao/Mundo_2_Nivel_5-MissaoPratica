import { useState } from 'react';
import styles from '../styles/Livro.module.css'; // estilo para livros
import Head from 'next/head';
import Menu from '../componentes/Menu';
import ControleEditora from '../classes/controle/ControleEditora';
import ControleLivros from '../classes/controle/ControleLivros';
import { Livro } from '../classes/modelo/Livro';
import { useRouter } from 'next/router';

// Define o objeto controleEditora
const controleEditora = new ControleEditora();

// Define o objeto controleLivro
const controleLivros = new ControleLivros();

const LivroDados = () => {
  // Define as opções de editoras
  const opcoes = controleEditora.getEditoras().map(editora => ({
    value: editora.codEditora,
    text: editora.nome,
  }));

  // Define estados para título, resumo, autores e codEditora
  const [titulo, setTitulo] = useState<string>('');
  const [resumo, setResumo] = useState<string>('');
  const [autores, setAutores] = useState<string>('');
  const [codEditora, setCodEditora] = useState<number>(opcoes.length > 0 ? opcoes[0].value : 0);

  //  Usar o hook de navegação
  const router = useRouter();

  // Método para tratar a seleção de editora
  const tratarCombo = (evento: React.ChangeEvent<HTMLSelectElement>) => {
    setCodEditora(Number(evento.target.value));
  };

  const [loading, setLoading] = useState(false);

  // Método para inclusão de livro
  const incluir = async () => {
    setLoading(true); // Começa o loading
    const livro = new Livro('Gerar', codEditora, titulo, resumo, autores.split('\n')); // Indica que o codigo será gerado pelo servidor
    const sucesso = await controleLivros.incluir(livro);
    setLoading(false);
    
    if (sucesso) {
      router.push('/LivroLista');
    } else {
      alert("Erro ao incluir o livro.");
    }
  };

  // Retorno do componente (estrutura da página com o formulário)
  return (
    <div className={styles.container}>
      <Head>
        <title>Adicionar Livro</title>
        <meta name="description" content="Formulário para inclusão de novos livros" />
      </Head>
      <Menu />
      <main className={styles.main}>
        <h1>Dados do Livro</h1>
        
        <form className={styles.formulario} onSubmit={incluir}>

          <div>
            <label htmlFor="titulo">Título:</label>
            <input
              id="titulo"
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="resumo">Resumo:</label>
            <textarea
              id="resumo"
              value={resumo}
              onChange={(e) => setResumo(e.target.value)}
              required
            />
          </div>

          {/* Lista de seleção para editoras */}
          <div>
            <label htmlFor="editora">Editora:</label>
            <select id="editora" value={codEditora} onChange={tratarCombo}>
              {opcoes.map((opcao) => (
                <option key={opcao.value} value={opcao.value}>
                  {opcao.text}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="autores">Autores (separados por linha):</label>
            <textarea
              id="autores"
              value={autores}
              onChange={(e) => setAutores(e.target.value)}
              required
            />
          </div>
          
          <button type="submit">Salvar Dados</button>
        </form>
      </main>
    </div>
  );
};

export default LivroDados;
