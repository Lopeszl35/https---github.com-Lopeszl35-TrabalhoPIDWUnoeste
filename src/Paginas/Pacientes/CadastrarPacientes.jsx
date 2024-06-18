import React, { useState, useEffect } from 'react';
import { Container, Button } from "react-bootstrap";
import { FaRegSave, FaArrowLeft } from "react-icons/fa";
import { useOutletContext, Link, useNavigate } from "react-router-dom";
import "./CadastrarPacientes.css";
import PacientesService from "../../services/pacientesService";

const pacientesService = new PacientesService();

function CadastrarPacientes() {
  const { show } = useOutletContext();
  const [erros, setErros] = useState({});
  const navigate = useNavigate();
  const estados = [
    "", "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"
  ];
  const [pacienteInfo, setPacienteInfo] = useState({
    Prontuario: '1',
    Nome_Completo: '', 
    Data_De_Nascimento: '', 
    CPF: '', 
    RG: '',
    Nome_Mae: '', 
    Telefone_Mae: '',
    Nome_Pai: '',
    Telefone_Pai: '',
    Numero: '', 
    Logradouro: '', 
    Bairro: '', 
    Estado: '',
    cidadeEscola: '',
    Escola: '',
    Ano_Escolar: '',
    Periodo: '',
    autorizacaoImagem: false,
    CartaoSUS: '',
    Cidade: '',
    CEP: '',
  });

  useEffect(() => {
    const fetchUltimoProntuario = async () => {
      try {
        console.log('Chamando fetchUltimoPaciente...');
        const ultimoProntuario = await pacientesService.buscarUltimoPaciente();
        console.log('Último prontuário recebido:', ultimoProntuario);
        
        // Atualiza o estado do componente com o último prontuário
        setPacienteInfo(prevState => ({
          ...prevState,
          Prontuario: ultimoProntuario + 1  // Define o próximo prontuário disponível
        }));
      } catch (error) {
        console.error('Erro ao buscar o último paciente:', error);
      }
    };

    fetchUltimoProntuario();
  }, []);

  const handleInputChange = (e) => {
    setPacienteInfo({
      ...pacienteInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckboxChange = (e) => {
    setPacienteInfo({
      ...pacienteInfo,
      autorizacaoImagem: e.target.checked,
    });
  };
 
  //-------------------------------------------

  const validate = () => {
    const newErros = {};

    if (!pacienteInfo.Nome_Completo) {
      newErros.Nome_Completo = 'Nome completo é obrigatório';
    }

    if (!pacienteInfo.Nome_Mae) {
      newErros.Nome_Mae = 'Nome mãe é obrigatório';
    }

    if (!pacienteInfo.Nome_Pai) {
      newErros.Nome_Pai = 'Nome pai é obrigatório';
    }

    if (!pacienteInfo.Data_De_Nascimento) {
      newErros.Data_De_Nascimento = 'Data de nascimento é obrigatória';
    }

    const cpfRegex = /^\d{11}$/;
    if (!pacienteInfo.CPF || !cpfRegex.test(pacienteInfo.CPF)) {
      newErros.CPF = 'CPF inválido. Deve conter 11 dígitos numéricos';
    }

    const rgRegex = /^\d+$/;
    if (!pacienteInfo.RG || !rgRegex.test(pacienteInfo.RG)) {
      newErros.RG = 'RG inválido. Deve conter apenas dígitos numéricos';
    }

    const telRegex = /^\d{10,11}$/;
    if (pacienteInfo.Telefone_Mae && !telRegex.test(pacienteInfo.Telefone_Mae)) {
      newErros.Telefone_Mae = 'Telefone da mãe inválido. Deve conter 10 ou 11 dígitos numéricos';
    }

    if (pacienteInfo.Telefone_Pai && !telRegex.test(pacienteInfo.Telefone_Pai)) {
      newErros.Telefone_Pai = 'Telefone do pai inválido. Deve conter 10 ou 11 dígitos numéricos';
    }

    const cepRegex = /^\d{8}$/;
    if (!pacienteInfo.CEP || !cepRegex.test(pacienteInfo.CEP)) {
      newErros.CEP = 'CEP inválido. Deve conter 8 dígitos numéricos';
    }

    setErros(newErros);
    return Object.keys(newErros).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        await pacientesService.adicionar(pacienteInfo);
        console.log('Paciente cadastrado com sucesso');
        navigate('/pacientes');
      } catch (error) {
        console.error('Erro ao cadastrar paciente:', error);
      }
    }
  };

  return (
    <div>
      <Container className={`container-pacientes ${show ? "container-pacientes-active" : ""}`}>
        <h1>Cadastrar Pacientes</h1>
        <form className="form-container" onSubmit={handleSubmit}>

          <h2>Paciente</h2>
          <label htmlFor="Nome_Completo">Nome completo:</label>
          <input type="text" id="Nome_Completo" name="Nome_Completo" value={pacienteInfo.Nome_Completo} onChange={handleInputChange} />
          {erros.Nome_Completo && <p className="erros">{erros.Nome_Completo}</p>}

          <div className="row">
            <div className="form-group col-md-6 col">
              <label htmlFor="Data_De_Nascimento">Data de nascimento:</label>
              <div className="input-group">
                <input type="date" id="Data_De_Nascimento" name="Data_De_Nascimento" value={pacienteInfo.Data_De_Nascimento} onChange={handleInputChange} />
                {erros.Data_De_Nascimento && <p className="erros">{erros.Data_De_Nascimento}</p>}
              </div>
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="CPF">CPF:</label>
              <div className="input-group">
                <input type="text" id="CPF" name="CPF" value={pacienteInfo.CPF} onChange={handleInputChange} />
                {erros.CPF && <p className="erros">{erros.CPF}</p>}
              </div>
            </div>
          </div>

          <div className="row">
            <div className="form-group col-md-6">
              <label htmlFor="RG">RG:</label>
              <div className="input-group">
                <input type="text" id="RG" name="RG" value={pacienteInfo.RG} onChange={handleInputChange} />
                {erros.RG && <p className="erros">{erros.RG}</p>}
              </div>
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="CartaoSUS">Cartão nacional de saúde (CNS):</label>
              <input type="text" id="CartaoSUS" name="CartaoSUS" value={pacienteInfo.CartaoSUS} onChange={handleInputChange} />
            </div>
          </div>

          <h2>Responsáveis</h2>

          <div className="row">
            <div className="form-group col-md-6">
              <label htmlFor="Nome_Mae">Nome da mãe:</label>
              <div className="input-group">
                <input type="text" id="Nome_Mae" name="Nome_Mae" value={pacienteInfo.Nome_Mae} onChange={handleInputChange} />
                {erros.Nome_Mae && <p className="erros">{erros.Nome_Mae}</p>}
              </div>
            </div>

            <div className="form-group col-md-6">
              <label htmlFor="Telefone_Mae">Telefone da mãe:</label>
              <div className="input-group">
                <input type="tel" id="Telefone_Mae" name="Telefone_Mae" value={pacienteInfo.Telefone_Mae} onChange={handleInputChange} />
                {erros.Telefone_Mae && <p className="erros">{erros.Telefone_Mae}</p>}
              </div>
            </div>
          </div>

          <div className="row">
            <div className="form-group col-md-6">
              <label htmlFor="Nome_Pai">Nome do pai:</label>
              <div className="input-group">
                <input type="text" id="Nome_Pai" name="Nome_Pai" value={pacienteInfo.Nome_Pai} onChange={handleInputChange} />
                {erros.Nome_Pai && <p className="erros">{erros.Nome_Pai}</p>}
              </div>
            </div>

            <div className="form-group col-md-6">
              <label htmlFor="Telefone_Pai">Telefone do pai:</label>
              <input type="tel" id="Telefone_Pai" name="Telefone_Pai" value={pacienteInfo.Telefone_Pai} onChange={handleInputChange} />
              {erros.Telefone_Pai && <p className="erros">{erros.Telefone_Pai}</p>}
            </div>
          </div>

          <h2>Endereço</h2>

          <div className="row">
            <div className="form-group col-md-6">
              <label htmlFor="Logradouro">Rua:</label>
              <input type="text" id="Logradouro" name="Logradouro" value={pacienteInfo.Logradouro} onChange={handleInputChange} />
            </div>

            <div className="form-group col-md-6">
              <label htmlFor="Numero">Numero:</label>
              <input type="text" id="Numero" name="Numero" value={pacienteInfo.Numero} onChange={handleInputChange} />
            </div>
          </div>

          <div className="row">
            <div className="form-group col-md-6">
              <label htmlFor="Bairro">Bairro:</label>
              <input type="text" id="Bairro" name="Bairro" value={pacienteInfo.Bairro} onChange={handleInputChange} />
            </div>

            <div className="form-group col-md-6">
              <label htmlFor="Cidade">Cidade:</label>
              <input type="text" id="Cidade" name="Cidade" value={pacienteInfo.Cidade} onChange={handleInputChange} />
            </div>
          </div>

          <div className="row">
            <div className="form-group col-md-6">
              <label htmlFor="Estado">Estado:</label>
              <select id="Estado" name="Estado" value={pacienteInfo.Estado} onChange={handleInputChange}>
                {estados.map((Estado, index) => (
                  <option key={index} value={Estado}>{Estado}</option>
                ))}
              </select>
            </div>

            <div className="form-group col-md-6">
              <label htmlFor="CEP">CEP:</label>
              <div className="input-group">
                <input type="text" id="CEP" name="CEP" value={pacienteInfo.CEP} onChange={handleInputChange} />
                {erros.CEP&& <p className="erros">{erros.CEP}</p>}
              </div>
            </div>
          </div>

          <h2>Escolaridade</h2>

          <div className="row">
            <div className="form-group col-md-6">
              <label htmlFor="Escola">Escola:</label>
              <input type="text" id="Escola" name="Escola" value={pacienteInfo.Escola} onChange={handleInputChange} />
            </div>

            <div className="form-group col-md-6">
              <label htmlFor="cidadeEscola">Cidade:</label>
              <input type="text" id="cidadeEscola" name="cidadeEscola" value={pacienteInfo.cidadeEscola} onChange={handleInputChange} />
            </div>
          </div>

          <div className="row">
            <div className="form-group col-md-6">
              <label htmlFor="Ano_Escolar">Ano Escolar:</label>
              <input type="text" id="Ano_Escolar" name="Ano_Escolar" value={pacienteInfo.Ano_Escolar} onChange={handleInputChange} />
            </div>

            <div className="form-group col-md-6">
              <label htmlFor="Periodo">Periodo:</label>
              <input type="text" id="Periodo" name="Periodo" value={pacienteInfo.Periodo} onChange={handleInputChange} />
            </div>
          </div>

          <h2>Dados de consentimento</h2>

          <div className="checkbox">
            <input type="checkbox" id="autorizacaoImagem" name="autorizacaoImagem" checked={pacienteInfo.autorizacaoImagem} onChange={handleCheckboxChange} />
            <label htmlFor="autorizacaoImagem">Autoriza o uso da imagem do paciente</label>
          </div>

          <div className="d-flex justify-content-end mt-3">
            <Link to={"/pacientes"}>
              <Button variant="secondary" className="me-2">
                <FaArrowLeft className="me-2" />
                Voltar
              </Button>
            </Link>
            <button type="submit" className="d-flex justify-content-center">
              <FaRegSave className="me-2 mt-1" /> Cadastrar
            </button>
          </div>
        </form>
      </Container>
    </div>
  );
}

export default CadastrarPacientes;
