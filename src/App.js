import './App.css';
import { useState, useRef } from 'react';
import Pesquisa from './Containers/Pesquisa';
import Carregando from './Containers/Carregando';
import Resultados from './Containers/Resultados';
import Erro from './Containers/Erro';

function App() {
  useState(0);

  const [nomeTela, setNomeTela] = useState("PESQUISA");
  const [resultado, setResultado] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const ticket = useRef(1);

  function goTo(nomeTela){
    setNomeTela(nomeTela);
  }

  return <div>
    <div className="App">
        <header className="App-header">
          {nomeTela == "PESQUISA" ? <Pesquisa goTo={goTo} setResultado={setResultado} setErrorMessage={setErrorMessage} ticket={ticket} /> : null}
          {nomeTela == "RESULTADOS" ? <Resultados goTo={goTo} result={resultado}/> : null}
          {nomeTela == "ERRO" ?  <Erro goTo={goTo} errorMessage={errorMessage} /> : null}
          {nomeTela == "CARREGANDO" ? <Carregando goTo={goTo} ticket={ticket}/> : null}
        </header>
    </div>
  </div>
}

export default App;
