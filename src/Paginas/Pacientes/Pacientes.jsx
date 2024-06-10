import React, { useState, useEffect } from 'react';
import { Card, Col, Container, Form, Row, Button, Table, Pagination } from "react-bootstrap";
import { useOutletContext, Link } from "react-router-dom";
import { CiCirclePlus } from "react-icons/ci";
import { RiUserSearchLine } from "react-icons/ri";
import "./Pacientes.css";
import PacientesService from "../../services/pacientesService";

const pacientesService = new PacientesService();

function Pacientes() {
  const { show } = useOutletContext();
  const [pacientes, setPacientes] = useState([]);
  const [pacientesFiltrados, setPacientesFiltrados] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("");
  const pacientesPerPage = 10;

  const obterTodos = async () => {
    try {
      const dados = await pacientesService.obterTodos();
      setPacientes(dados);
      setPacientesFiltrados(dados);
    } catch (error) {
      console.error("Erro ao obter pacientes:", error);
    }
  };

  useEffect(() => {
    obterTodos();
  }, []);
 

  useEffect(() => {
    const filteredPacientes = pacientes.filter((paciente) => {
      if (searchType === "1") {
        return paciente.prontuario.toLowerCase().includes(searchQuery.toLowerCase());
      } else if (searchType === "2") {
        return paciente.nome.toLowerCase().includes(searchQuery.toLowerCase());
      }
      return true;
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
      <Container className={`container-pacientes ${show ? "container-pacientes-active" : ""}`}>
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
                    aria-label="Default select example" 
                    size="sm" 
                    className="me-2"
                    value={searchType}
                    onChange={(e) => setSearchType(e.target.value)}
                  >
                    <option value="">Selecione</option>
                    <option value="1">Prontuario</option>
                    <option value="2">Nome</option>
                  </Form.Select>
                  <Form.Control 
                    type="text" 
                    placeholder="Pesquisar"
                    id="pesquisar"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </Form>
                <Button className="button-cadastro-paciente mt-3" as={Link} to="/pacientes/CadastrarPacientes">
                  <CiCirclePlus /> Cadastrar Paciente
                </Button>
              </Col>
            </Row>
            <Row>
              <Table striped bordered hover className="mt-4">
                <thead>
                  <tr>
                    <th>Prontuário</th>
                    <th>Nome</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {currentPacientes.length <= 0 ? (
                    <tr>
                      <td colSpan="3" className="text-center">Nenhum paciente encontrado</td>
                    </tr>
                  ) : (
                    currentPacientes.map((paciente) => (
                      <tr key={paciente.Prontuario}>
                        <td>{paciente.Prontuario}</td>
                        <td>{paciente.Nome_Completo}</td>
                        <td><Button as={Link} to={`/pacientes/EditarPacientes/${paciente.id}`}><RiUserSearchLine /> Editar Paciente</Button></td>
                      </tr>
                    ))
                  )}
                </tbody>
              </Table>
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
    </div>
  );
}

export default Pacientes;
