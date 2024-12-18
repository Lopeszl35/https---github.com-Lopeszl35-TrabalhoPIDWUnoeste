import React, { useState, useEffect } from 'react';
import { Accordion, Card, Col, Container, Form, Row, Button, Pagination, Modal, ModalBody } from "react-bootstrap";
import { useOutletContext, Link, useNavigate } from "react-router-dom";
import { CiCirclePlus } from "react-icons/ci";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import styles from "./Pacientes.module.css";
import PacientesService from "../../services/pacientesService";

const pacientesService = new PacientesService();

function Pacientes() {
  const { show } = useOutletContext();
  const [pacientes, setPacientes] = useState([]);
  const [pacientesFiltrados, setPacientesFiltrados] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("");
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [pacienteToDelete, setPacienteToDelete] = useState(null);
  const [erroExclusao, setErroExclusao] = useState(null);
  const [confirmacaoExclusao, setConfirmacaoExclusao] = useState(true);
  const [sucessoExclusao, setSucessoExclusao] = useState(null);
  const navigate = useNavigate();
  const pacientesPerPage = 10;

  const obterTodos = async () => {
    try {
      const dadosPacientes = await pacientesService.obterTodos();
      setPacientes(dadosPacientes);
      setPacientesFiltrados(dadosPacientes);
    } catch (error) {
      console.error("Erro ao obter pacientes:", error);
    }
  };

  const showDelete = (prontuario) => {
    setShowModalDelete(true);
    setPacienteToDelete(prontuario);
  };

  const handleEdit = (prontuario) => {
    navigate(`/pacientes/EditarPacientes/${prontuario}`);
  };

  const atualizarPacientes = async () => {
    await obterTodos();
  };

  const excluirPaciente = async (prontuario) => {
    try {
      await pacientesService.excluirPaciente(prontuario);
      const filtrarPacientes = pacientes.filter((paciente) => paciente.Prontuario !== prontuario);
      setPacientes(filtrarPacientes);
      setPacientesFiltrados(filtrarPacientes);
      setShowModalDelete(false);
      setSucessoExclusao(true);
      atualizarPacientes();
    } catch (error) {
      console.error("Erro ao excluir paciente:", error);
      setErroExclusao(true);
    }
  };

  useEffect(() => {
    obterTodos();
  }, []);
 
  useEffect(() => {
    const filteredPacientes = pacientes.filter((paciente) => {
      switch (searchType) {
        case "prontuario":
          return paciente.Prontuario.toString().includes(searchQuery);
        case "nome":
          return paciente.Nome_Completo.toLowerCase().includes(searchQuery.toLowerCase());
        case "cpf":
          return paciente.CPF.toString().includes(searchQuery);
        case "data_nascimento":
          return paciente.Data_De_Nascimento && 
                 paciente.Data_De_Nascimento.includes(searchQuery);
        case "nome_mae":
          return paciente.Nome_Mae && 
                 paciente.Nome_Mae.toLowerCase().includes(searchQuery.toLowerCase());
        default:
          return true;
      }
    });
    setPacientesFiltrados(filteredPacientes);
    setCurrentPage(1); 
  }, [searchQuery, searchType, pacientes]);

  const indexOfLastPaciente = currentPage * pacientesPerPage;
  const indexOfFirstPaciente = indexOfLastPaciente - pacientesPerPage;
  const currentPacientes = pacientesFiltrados.slice(indexOfFirstPaciente, indexOfLastPaciente);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <Container className={`${styles.containerPacientes } ${show ? styles.containerPacientesActive : '' }` }>
        <Card className="card-lista-pacientes">
          <Card.Body>
            <Row>
              <Card.Title className="font-bold">Lista de Pacientes</Card.Title>
            </Row>
            <Row className="mt-4">
              <Col lg={12} className="busca">
                <Card.Text>Pesquise Por:</Card.Text>
                <Form className="busca d-flex">
                  <Form.Select 
                    aria-label="Tipo de busca" 
                    size="sm" 
                    className="me-2"
                    value={searchType}
                    onChange={(e) => setSearchType(e.target.value)}
                  >
                    <option value="">Selecione</option>
                    <option value="prontuario">Prontuário</option>
                    <option value="nome">Nome</option>
                    <option value="cpf">CPF</option>
                    <option value="data_nascimento">Data de Nascimento</option>
                    <option value="nome_mae">Nome da Mãe</option>
                  </Form.Select>
                  <Form.Control 
                    type="text" 
                    placeholder="Pesquisar"
                    id="pesquisar"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </Form>
                <Button className="button-cadastro-paciente mb-4" as={Link} to="/pacientes/CadastrarPacientes">
                  <CiCirclePlus /> Cadastrar Paciente
                </Button>
              </Col>
            </Row>
            <Row>
              <Accordion>
                {currentPacientes.length <= 0 ? (
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>Nenhum paciente encontrado</Accordion.Header>
                  </Accordion.Item>
                ) : (
                  currentPacientes.map((paciente) => (
                    <Accordion.Item eventKey={paciente.Prontuario} key={paciente.Prontuario}>
                      <Accordion.Header>
                        <p className='m-2 text-primary'><strong>Prontuário: </strong></p>{paciente.Prontuario} - {paciente.Nome_Completo} 
                      </Accordion.Header>
                      <Accordion.Body>
                        <Row>
                          <Col md={4}>
                            <p><strong>Prontuário:</strong> {paciente.Prontuario}</p>
                            <p><strong>Nome:</strong> {paciente.Nome_Completo}</p>
                            <p><strong>Data de Nascimento:</strong> {new Date(paciente.Data_De_Nascimento).toLocaleDateString()}</p>
                          </Col>
                          <Col md={4}>
                            <p><strong>CPF:</strong> {paciente.CPF}</p>
                            <p><strong>RG:</strong> {paciente.RG}</p>
                            <p><strong>Email:</strong> {paciente.Email}</p>
                          </Col>
                          <Col md={4}>
                            <p><strong>Telefone da Mãe:</strong> {paciente.Telefone_Mae}</p>
                            <p><strong>Endereço:</strong> {paciente.Logradouro}, {paciente.Numero}</p>
                            <p><strong>Cidade:</strong> {paciente.Cidade}</p>
                          </Col>
                        </Row>
                        <div className="d-flex flex-row gap-2">
                          <Button className='btn-primary' onClick={() => handleEdit(paciente.Prontuario)}><FaEdit /></Button>
                          <Button className='btn-danger' onClick={() => showDelete(paciente.Prontuario)}><FaTrashAlt /></Button>
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>
                  ))
                )}
              </Accordion>
            </Row>
            <Row>
              <Pagination className="justify-content-center mt-3">
                {Array.from({ length: Math.ceil(pacientesFiltrados.length / pacientesPerPage) }, (_, index) => (
                  <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => paginate(index + 1)}>
                    {index + 1}
                  </Pagination.Item>
                ))}
              </Pagination>
            </Row>
          </Card.Body>
        </Card>
      </Container>

      {/* MODAL EXCLUIR PACIENTE */}  
      <Modal show={showModalDelete} onHide={() => setShowModalDelete(false)}>
        <ModalBody>
          {confirmacaoExclusao && !erroExclusao && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>Excluir Paciente</Modal.Title>
            </Modal.Header>
            <Modal.Body>Tem certeza que deseja excluir este paciente?</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModalDelete(false)}>
                Cancelar
              </Button>
              <Button variant="danger" onClick={() => excluirPaciente(pacienteToDelete)}>
                Excluir
              </Button>
            </Modal.Footer>
          </>
          )} 
          {erroExclusao && (
            <div className="alert alert-danger" role="alert">
              Erro ao excluir paciente. Tente novamente.
              <button className="btn-ok" onClick={() => setErroExclusao(null)}>OK</button>
            </div>
          )}
          {sucessoExclusao && (
            <div className="alert alert-success" role="alert">
              Paciente excluído com sucesso.
              <button className="btn-ok" onClick={() => setSucessoExclusao(null)}>OK</button>
            </div>
          )}
        </ModalBody>
      </Modal>
    </div>
  );
}

export default Pacientes;
