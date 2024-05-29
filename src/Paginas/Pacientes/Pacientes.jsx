import React, { useState, useEffect } from 'react';
import { Card, Col, Container, Form, Row, Button, Table, Pagination } from "react-bootstrap";
import { useOutletContext, Link } from "react-router-dom";
import { CiCirclePlus } from "react-icons/ci";
import { RiUserSearchLine } from "react-icons/ri";
import "./Pacientes.css";

function Pacientes() {
  const { show } = useOutletContext();
  const [pacientes, setPacientes] = useState([]);
  const [pacientesFiltrados, setPacientesFiltrados] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("");
  const pacientesPerPage = 10;

  useEffect(() => {
    const pacientes = [
      { id: 1, prontuario: '001', nome: 'Alice Silva' },
      { id: 2, prontuario: '002', nome: 'Bruno Sousa' },
      { id: 3, prontuario: '003', nome: 'Carla Mendes' },
      { id: 4, prontuario: '004', nome: 'Diego Lima' },
      { id: 5, prontuario: '005', nome: 'Elaine Costa' },
      { id: 6, prontuario: '006', nome: 'Fábio Alves' },
      { id: 7, prontuario: '007', nome: 'Gabriela Martins' },
      { id: 8, prontuario: '008', nome: 'Henrique Oliveira' },
      { id: 9, prontuario: '009', nome: 'Isabela Ferreira' },
      { id: 10, prontuario: '010', nome: 'Jorge Nunes' },
      { id: 11, prontuario: '011', nome: 'Karina Rocha' },
      { id: 12, prontuario: '012', nome: 'Lucas Araújo' },
      { id: 13, prontuario: '013', nome: 'Mariana Santos' },
      { id: 14, prontuario: '014', nome: 'Nicolas Souza' },
      { id: 15, prontuario: '015', nome: 'Olivia Ramos' },
    ];
    setPacientes(pacientes);
    setPacientesFiltrados(pacientes);
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
                      <tr key={paciente.id}>
                        <td>{paciente.prontuario}</td>
                        <td>{paciente.nome}</td>
                        <td><Button as={Link} to={`/pacientes/EditarPaciente${paciente.id}`}><RiUserSearchLine /> Editar Paciente</Button></td>
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
