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
      endereco: {numero: '', rua: '', bairro: '', estado: '',},
      cidadeEscola: '',
      escola: '',
      anoEscolar: '',
      periodo: '',
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

    const [erros, setErros] = useState({});

    //-------------------------------------------
    
    const validate = () => {
      const newErros = {};
  
      if (!pacienteInfo.nomeCompleto) {
        newErros.nomeCompleto = 'Nome completo é obrigatório';
      }

      if (!pacienteInfo.mae.nome) {
        newErros.maeNome = 'Nome mãe é obrigatório';
      }

      if (!pacienteInfo.pai.nome) {
        newErros.paiNome = 'Nome pai é obrigatório';
      }
  
      if (!pacienteInfo.dataNasc) {
        newErros.dataNasc = 'Data de nascimento é obrigatória';
      }
  
      const cpfRegex = /^\d{11}$/;
      if (!pacienteInfo.cpf || !cpfRegex.test(pacienteInfo.cpf)) {
        newErros.cpf = 'CPF inválido. Deve conter 11 dígitos numéricos';
      }
  
      const rgRegex = /^\d+$/;
      if (!pacienteInfo.rg || !rgRegex.test(pacienteInfo.rg)) {
        newErros.rg = 'RG inválido. Deve conter apenas dígitos numéricos';
      }
  
      const telRegex = /^\d{10,11}$/;
      if (pacienteInfo.mae.telefone && !telRegex.test(pacienteInfo.mae.telefone)) {
        newErros.telefoneMae = 'Telefone da mãe inválido. Deve conter 10 ou 11 dígitos numéricos';
      }
  
      if (pacienteInfo.pai.telefone && !telRegex.test(pacienteInfo.pai.telefone)) {
        newErros.telefonePai = 'Telefone do pai inválido. Deve conter 10 ou 11 dígitos numéricos';
      }
  
      const cepRegex = /^\d{8}$/;
      if (!pacienteInfo.cep || !cepRegex.test(pacienteInfo.cep)) {
        newErros.cep = 'CEP inválido. Deve conter 8 dígitos numéricos';
      }
  
      setErros(newErros);
      return Object.keys(newErros).length === 0;
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (validate()) {
        // Enviar os dados do paciente
        console.log('Dados do paciente:', pacienteInfo);
      }
    };

    //-------------------------------------------
    

    return (
      <div>
        <Container className={`container-pacientes ${show ? "container-pacientes-active" : ""}`}>
        <h1>Cadastrar Pacientes</h1>
        <form className="form-container" onSubmit={handleSubmit}>
        
        <h2>Paciente</h2>
          <label htmlFor="nomeCompleto">Nome completo:</label>
          <input type="text" id="nomeCompleto" name="nomeCompleto" value={pacienteInfo.nomeCompleto} onChange={handleInputChange} />
          {erros.nomeCompleto && <p className="erros">{erros.nomeCompleto}</p>}

          <div className="row">
            <div className="form-group col-md-6">
            <label htmlFor="dataNasc">Data de nascimento:</label>
            <input type="date" id="dataNasc" name="dataNasc" value={pacienteInfo.dataNasc} onChange={handleInputChange} />
            {erros.dataNasc && <p className="erros">{erros.dataNasc}</p>}
            </div>
            <div className="form-group col-md-6">
            <label htmlFor="cpf">CPF:</label>
            <input type="text" id="cpf" name="cpf" value={pacienteInfo.cpf} onChange={handleInputChange} />
            {erros.cpf && <p className="erros">{erros.cpf}</p>}
            </div>
          </div>

          <div className="row">
            <div className="form-group col-md-6">
            <label htmlFor="rg">RG:</label>
            <input type="text" id="rg" name="rg" value={pacienteInfo.rg} onChange={handleInputChange} />
            {erros.rg && <p className="erros">{erros.rg}</p>}
            </div>
            <div className="form-group col-md-6">
            <label htmlFor="cns">Cartão nacional de saúde (CNS):</label>
            <input type="text" id="cns" name="cns" value={pacienteInfo.cns} onChange={handleInputChange} />
            </div>
          </div>

        <h2>Responsáveis</h2>

          <div className="row">
            <div className="form-group col-md-6">
            <label htmlFor="nomeMae">Nome da mãe:</label>
            <input type="text" id="nomeMae" name="nome" value={pacienteInfo.mae.nome} onChange={(e) => handleAddressInputChange(e, 'mae')} />
            {erros.maeNome&& <p className="erros">{erros.maeNome}</p>}
            </div>
          
            <div className="form-group col-md-6">
            <label htmlFor="telefoneMae">Telefone da mãe:</label>
            <input type="tel" id="telefoneMae" name="telefone" value={pacienteInfo.mae.telefone} onChange={(e) => handleAddressInputChange(e, 'mae')} />
            {erros.telefoneMae && <p className="erros">{erros.telefoneMae}</p>}
            </div>
          </div>

          <div className="row">
            <div className="form-group col-md-6">
            <label htmlFor="nomePai">Nome do pai:</label>
            <input type="text" id="nomePai" name="nome" value={pacienteInfo.pai.nome} onChange={(e) => handleAddressInputChange(e, 'pai')} />
            {erros.paiNome && <p className="erros">{erros.paiNome}</p>}
            </div>

            <div className="form-group col-md-6">
            <label htmlFor="telefonePai">Telefone do pai:</label>
            <input type="tel" id="telefonePai" name="telefone" value={pacienteInfo.pai.telefone} onChange={(e) => handleAddressInputChange(e, 'pai')} />
            {erros.telefonePai && <p className="erros">{erros.telefonePai}</p>}
            </div>
          </div>

        <h2>Endereço</h2>

          <div className="row">
            <div className="form-group col-md-6">
            <label htmlFor="rua">Rua:</label>
            <input type="text" id="rua" name="rua" value={pacienteInfo.endereco.rua} onChange={(e) => handleAddressInputChange(e, 'endereco')} />
            </div>

            <div className="form-group col-md-6">
            <label htmlFor="numero">Numero:</label>
            <input type="text" id="numero" name="numero" value={pacienteInfo.endereco.numero} onChange={(e) => handleAddressInputChange(e, 'endereco')} />
            </div>
          </div>

          <div className="row">
            <div className="form-group col-md-6">
            <label htmlFor="bairro">Bairro:</label>
            <input type="text" id="bairro" name="bairro" value={pacienteInfo.endereco.bairro} onChange={(e) => handleAddressInputChange(e, 'endereco')} />
            </div>

            <div className="form-group col-md-6">
            <label htmlFor="cidade">Cidade:</label>
            <input type="text" id="cidade" name="cidade" value={pacienteInfo.cidade} onChange={handleInputChange} />
            </div>
          </div>

          <div className="row">
            <div className="form-group col-md-6">
            <label htmlFor="estado">Estado:</label>
            <input type="text" id="estado" name="estado" value={pacienteInfo.endereco.estado} onChange={(e) => handleAddressInputChange(e, 'endereco')} />
            </div>

            <div className="form-group col-md-6">
            <label htmlFor="cep">CEP:</label>
            <input type="text" id="cep" name="cep" value={pacienteInfo.cep} onChange={handleInputChange} />
            {erros.cep && <p className="erros">{erros.cep}</p>}
            </div>
          </div>
          

        <h2>Escolaridade</h2>

          <div className="row">
            <div className="form-group col-md-6">
            <label htmlFor="escola">Escola:</label>
            <input type="text" id="escola" name="escola" value={pacienteInfo.escola} onChange={handleInputChange} />
            </div>

            <div className="form-group col-md-6">
            <label htmlFor="cidadeEscola">Cidade:</label>
            <input type="text" id="cidadeEscola" name="cidadeEscola" value={pacienteInfo.cidadeEscola} onChange={handleInputChange} />
            </div>
          </div>

          <div className="row">
            <div className="form-group col-md-6">
            <label htmlFor="anoEscolar">Ano Escolar:</label>
            <input type="text" id="anoEscolar" name="anoEscolar" value={pacienteInfo.anoEscolar} onChange={handleInputChange} />
            </div>

            <div className="form-group col-md-6">
            <label htmlFor="periodo">Periodo:</label>
            <input type="text" id="periodo" name="periodo" value={pacienteInfo.periodo} onChange={handleInputChange} />
            </div>
          </div>

        <h2>Dados de consentimento</h2>

            <input type="checkbox" id="autorizacaoImagem" name="autorizacaoImagem" checked={pacienteInfo.autorizacaoImagem} onChange={handleCheckboxChange} />
            <label htmlFor="autorizacaoImagem">Autoriza o uso da imagem do paciente</label>
        
        <button type="submit">Cadastrar</button>

        
        </form>
        </Container>
      </div>
  );
}
export default Pacientes;