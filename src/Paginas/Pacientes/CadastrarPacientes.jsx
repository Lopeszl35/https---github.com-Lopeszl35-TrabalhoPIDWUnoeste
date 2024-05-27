import { Card, Col, Container, Form, Row } from "react-bootstrap";
import { useOutletContext } from "react-router-dom";
import React, {useState } from 'react';
import "./CadastrarPacientes.css";

function Pacientes() {
    const { show } = useOutletContext();

    const [pacienteInfo, setPacienteInfo] = useState({
      nomeCompleto: '', 
      dataNasc: '', 
      cpf: '', 
      rg: '',
      mae: {nome: '', telefone: '',},
      pai: {nome: '',telefone: '',},
      endereco: {rua: '', bairro: '', estado: '',},
      escolaridade: '',
      escola: '',
      anoEscolar: '',
      autorizacaoImagem: false,
      cns: '',
      cidade: '',
      cep: '',
    });
  
    const handleInputChange = (e) => {
      setPacienteInfo({
        ...pacienteInfo,
        [e.target.name]: e.target.value,
      });
    };
  
    const handleAddressInputChange = (e, addressType) => {
      setPacienteInfo({
        ...pacienteInfo,
        [addressType]: {
          ...pacienteInfo[addressType],
          [e.target.name]: e.target.value,
        },
      });
    };
  
    const handleCheckboxChange = (e) => {
      setPacienteInfo({
        ...pacienteInfo,
        autorizacaoImagem: e.target.checked,
      });
    };


    return (
      <div>
        <Container className={`container-pacientes ${show ? "container-pacientes-active" : ""}`}>
        <h1>Cadastrar Pacientes</h1>
        <form className="form-container">
          <label htmlFor="nomeCompleto">Nome completo:</label>
          <input type="text" id="nomeCompleto" name="nomeCompleto" value={pacienteInfo.nomeCompleto} onChange={handleInputChange} />

          <div className="form-group">
            <label htmlFor="dataNasc">Data de nascimento:</label>
            <input type="date" id="dataNasc" name="dataNasc" value={pacienteInfo.dataNasc} onChange={handleInputChange} />
          
            <label htmlFor="cpf">CPF:</label>
            <input type="text" id="cpf" name="cpf" value={pacienteInfo.cpf} onChange={handleInputChange} />
          </div>

          <label htmlFor="rg">RG:</label>
          <input type="text" id="rg" name="rg" value={pacienteInfo.rg} onChange={handleInputChange} />

          <label htmlFor="cns">Cartão nacional de saúde (CNS):</label>
          <input type="text" id="cns" name="cns" value={pacienteInfo.cns} onChange={handleInputChange} />

        <h2>Responsáveis</h2>

          <label htmlFor="nomeMae">Nome da mãe:</label>
          <input type="text" id="nomeMae" name="nome" value={pacienteInfo.mae.nome} onChange={(e) => handleAddressInputChange(e, 'mae')} />

          <label htmlFor="telefoneMae">Telefone da mãe:</label>
          <input type="tel" id="telefoneMae" name="telefone" value={pacienteInfo.mae.telefone} onChange={(e) => handleAddressInputChange(e, 'mae')} />

          <h2>Pai</h2>

          <label htmlFor="nomePai">Nome do pai:</label>
          <input type="text" id="nomePai" name="nome" value={pacienteInfo.pai.nome} onChange={(e) => handleAddressInputChange(e, 'pai')} />

          <label htmlFor="telefonePai">Telefone do pai:</label>
          <input type="tel" id="telefonePai" name="telefone" value={pacienteInfo.pai.telefone} onChange={(e) => handleAddressInputChange(e, 'pai')} />

        <h2>Endereço</h2>
          <label htmlFor="rua">Rua:</label>
          <input type="text" id="rua" name="rua" value={pacienteInfo.endereco.rua} onChange={(e) => handleAddressInputChange(e, 'endereco')} />

          <label htmlFor="bairro">Bairro:</label>
          <input type="text" id="bairro" name="bairro" value={pacienteInfo.endereco.bairro} onChange={(e) => handleAddressInputChange(e, 'endereco')} />

          <label htmlFor="estado">Estado:</label>
          <input type="text" id="estado" name="estado" value={pacienteInfo.endereco.estado} onChange={(e) => handleAddressInputChange(e, 'endereco')} />

          <label htmlFor="cidade">Cidade:</label>
          <input type="text" id="cidade" name="cidade" value={pacienteInfo.cidade} onChange={handleInputChange} />

          <label htmlFor="cep">CEP:</label>
          <input type="text" id="cep" name="cep" value={pacienteInfo.cep} onChange={handleInputChange} />

        <h2>Escolaridade</h2>

          <label htmlFor="escolaridade">Escolaridade:</label>
          <input type="text" id="escolaridade" name="escolaridade" value={pacienteInfo.escolaridade} onChange={handleInputChange} />

          <label htmlFor="escola">Escola:</label>
          <input type="text" id="escola" name="escola" value={pacienteInfo.escola} onChange={handleInputChange} />

          <label htmlFor="anoEscolar">Ano Escolar:</label>
          <input type="text" id="anoEscolar" name="anoEscolar" value={pacienteInfo.anoEscolar} onChange={handleInputChange} />

        <h2>Dados de consentimento</h2>

          <label htmlFor="autorizacaoImagem">Autoriza o uso da imagem do paciente</label>
          <input type="checkbox" id="autorizacaoImagem" name="autorizacaoImagem" checked={pacienteInfo.autorizacaoImagem} onChange={handleCheckboxChange} />
        

        <button type="submit">Cadastrar</button>
        </form>
        </Container>
      </div>
  );
}
export default Pacientes;