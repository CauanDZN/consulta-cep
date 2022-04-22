import CEPDados from "../Components/CEPDados";

function Resultados(props) {
    const result = props.result;
    const goTo = props.goTo;

    return <>
          <p>Resultados para o CEP:</p>
          <CEPDados cepDados={result} />
          <button onClick={() => props.goTo("PESQUISA")}>NOVA CONSULTA</button>
          <p>Desenvolvido com ❤ pelo Cauan.</p>
        </>
  }

export default Resultados;