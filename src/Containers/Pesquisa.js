import { useState, useEffect } from "react";
import CEPDados from "../Components/CEPDados";
import App from "../App";
import consultarCep from 'cep-promise';

function numbersOnly(str){
  return str.replace(/[^\d]/g, '')
}

function translate(cepDados){
  return {
      "CEP: ": cepDados.cep,
      "RUA: ": cepDados.street,
      "CIDADE: ": cepDados.city,
      "ESTADO: ": cepDados.state,
      "BAIRRO: ": cepDados.neighborhood
  }
}

function Pesquisa(props) {
  const goTo = props.goTo;
  const ticket = props.ticket;
  const setErrorMessage = props.setErrorMessage;
  const setResultado = props.setResultado;
  const [cepNumber, setCepNumber] = useState("");
  const [cepFavorito, setCepFavorito] = useState("");
  const [cepDados, setCepDados] = useState({});

  useEffect(() => {
    const storageCep = localStorage.getItem("cepFavorito") || "";
    setCepFavorito(storageCep)
  },[])

  useEffect(() => {
    if(!cepFavorito){
      return;
    }
    localStorage.setItem("cepFavorito", cepFavorito);
    consultarCep(cepFavorito)
      .then(resultado => setCepDados(resultado))
      .catch(err => setCepDados({"ERRO": err.message}))
  },[cepFavorito])

  function handleChange(evt) {
    const value = evt.target.value;
    setCepNumber(numbersOnly(value));
  }

  function handleSuccess(dadosCEP){
    const resultado = {
      "CEP: ": dadosCEP.cep,
      "RUA: ": dadosCEP.street,
      "CIDADE: ": dadosCEP.city,
      "ESTADO: ": dadosCEP.state,
      "BAIRRO: ": dadosCEP.neighborhood
    }
    setResultado(resultado);
    goTo("RESULTADOS");
  }

  function handleError(err){
    const errorMessage = err.message;
    setErrorMessage(errorMessage);
    goTo("ERRO");
  }

  function handleSearch(){
    ticket.current++;
    const currentTicket = ticket.current;
    goTo("CARREGANDO");
    consultarCep(cepNumber)
    .then(result => currentTicket == ticket.current && handleSuccess(result))
    .catch(err => currentTicket == ticket.current && handleError(err))
  }

  function handleAddFavorite (){
    localStorage.setItem("cepFavorito", cepNumber);
    setCepFavorito(cepNumber);
  }

    return <>
          {<p>Qual CEP você deseja pesquisar?</p>}
          {<input value={cepNumber} onChange={handleChange}/>}
          {<button onClick={handleSearch}>CONSULTAR</button>}
          {<button onClick={handleAddFavorite}>SALVAR FAVORITO</button>}
          {<p>Favorito: {cepFavorito}</p>}
          <CEPDados cepDados={translate(cepDados)} />
          <p>Desenvolvido com ❤ pelo Cauan.</p>
        </>;
    }

export default Pesquisa;