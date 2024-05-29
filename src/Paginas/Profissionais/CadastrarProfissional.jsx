import { Card, Col, Container, Form, Row } from "react-bootstrap";
import { useOutletContext } from "react-router-dom";
import React, {useState } from 'react';
import "./CadastrarProfissional.css";

function Profissional() {
    const { show } = useOutletContext();

    const [profissionalInfo, setProfissionalInfo] = useState({
      nomeCompleto: '', 
      dataNasc: '', 
      cpf: '', 
      rg: '',
      endereco: {numero: '', rua: '', bairro: '', estado: '', cidade: '', cep: ''},
      email: '',
      telefone: '',
      cargo: '',
      DataI: '',
      acesso: '',
      senha: '',
    });
  
    const handleInputChange = (e) => {
      setProfissionalInfo({
        ...profissionalInfo,
        [e.target.name]: e.target.value,
      });
    };
  
    const handleAddressInputChange = (e, addressType) => {
      setProfissionalInfo({
        ...profissionalInfo,
        [addressType]: {
          ...profissionalInfo[addressType],
          [e.target.name]: e.target.value,
        },
      });
    };
  
    const handleCheckboxChange = (e) => {
      setProfissionalInfo({
        ...profissionalInfo,
        autorizacaoImagem: e.target.checked,
      });
    };

    const [erros, setErros] = useState({});

    //-------------------------------------------
    
    const validate = () => {
      const newErros = {};
  
      if (!profissionalInfo.nomeCompleto) {
        newErros.nomeCompleto = 'Nome completo é obrigatório';
      }
  
      if (!profissionalInfo.dataNasc) {
        newErros.dataNasc = 'Data de nascimento é obrigatória';
      }
  
      const cpfRegex = /^\d{11}$/;
      if (!profissionalInfo.cpf || !cpfRegex.test(profissionalInfo.cpf)) {
        newErros.cpf = 'CPF inválido. Deve conter 11 dígitos numéricos';
      }
  
      const rgRegex = /^\d+$/;
      if (!profissionalInfo.rg || !rgRegex.test(profissionalInfo.rg)) {
        newErros.rg = 'RG inválido. Deve conter apenas dígitos numéricos';
      }
  
      const cepRegex = /^\d{8}$/;
      if (!profissionalInfo.cep || !cepRegex.test(profissionalInfo.cep)) {
        newErros.cep = 'CEP inválido. Deve conter 8 dígitos numéricos';
      }
  
      setErros(newErros);
      return Object.keys(newErros).length === 0;
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (validate()) {
        // Enviar os dados do profissional
        console.log('Dados do profissinal:', profissionalInfo);
      }
    };

    //-------------------------------------------
    

    return (
      <div>
        <Container className={`container-profissional ${show ? "container-profissional-active" : ""}`}>
        <h1>Cadastrar Profissionais</h1>
        <form className="form-container" onSubmit={handleSubmit}>
        
        <h2>Profissional</h2>
          <label htmlFor="nomeCompleto">Nome completo:</label>
          <input type="text" id="nomeCompleto" name="nomeCompleto" value={profissionalInfo.nomeCompleto} onChange={handleInputChange} />
          {erros.nomeCompleto && <p className="erros">{erros.nomeCompleto}</p>}

          <div className="row">
            <div className="form-group col-md-6">
            <label htmlFor="dataNasc">Data de nascimento:</label>
            <input type="date" id="dataNasc" name="dataNasc" value={profissionalInfo.dataNasc} onChange={handleInputChange} />
            {erros.dataNasc && <p className="erros">{erros.dataNasc}</p>}
            </div>
            <div className="form-group col-md-6">
            <label htmlFor="cpf">CPF:</label>
            <input type="text" id="cpf" name="cpf" value={profissionalInfo.cpf} onChange={handleInputChange} />
            {erros.cpf && <p className="erros">{erros.cpf}</p>}
            </div>
          </div>

          <div className="row">
            <div className="form-group col-md-6">
            <label htmlFor="rg">RG:</label>
            <input type="text" id="rg" name="rg" value={profissionalInfo.rg} onChange={handleInputChange} />
            {erros.rg && <p className="erros">{erros.rg}</p>}
            </div>
          </div>


        <h2>Endereço</h2>

          <div className="row">
            <div className="form-group col-md-6">
            <label htmlFor="rua">Rua:</label>
            <input type="text" id="rua" name="rua" value={profissionalInfo.endereco.rua} onChange={(e) => handleAddressInputChange(e, 'endereco')} />
            </div>

            <div className="form-group col-md-6">
            <label htmlFor="numero">Numero:</label>
            <input type="text" id="numero" name="numero" value={profissionalInfo.endereco.numero} onChange={(e) => handleAddressInputChange(e, 'endereco')} />
            </div>
          </div>

          <div className="row">
            <div className="form-group col-md-6">
            <label htmlFor="bairro">Bairro:</label>
            <input type="text" id="bairro" name="bairro" value={profissionalInfo.endereco.bairro} onChange={(e) => handleAddressInputChange(e, 'endereco')} />
            </div>

            <div className="form-group col-md-6">
            <label htmlFor="cidade">Cidade:</label>
            <input type="text" id="cidade" name="cidade" value={profissionalInfo.cidade} onChange={handleInputChange} />
            </div>
          </div>

          <div className="row">
            <div className="form-group col-md-6">
            <label htmlFor="estado">Estado:</label>
            <input type="text" id="estado" name="estado" value={profissionalInfo.endereco.estado} onChange={(e) => handleAddressInputChange(e, 'endereco')} />
            </div>

            <div className="form-group col-md-6">
            <label htmlFor="cep">CEP:</label>
            <input type="text" id="cep" name="cep" value={profissionalInfo.cep} onChange={handleInputChange} />
            {erros.cep && <p className="erros">{erros.cep}</p>}
            </div>
          </div>

          <div className="botao">
          <button type="submit">Cadastrar</button>
          </div>
        </form>
        </Container>
      </div>
  );
}
export default Profissional;