import React, { useState, useEffect } from 'react';
import { Card, Col, Container, Form, Row, Button, Table, Pagination } from "react-bootstrap";
import { useOutletContext, Link } from "react-router-dom";
import { CiCirclePlus } from "react-icons/ci";
import { RiUserSearchLine } from "react-icons/ri";
import './Profissionais.css';

function Profissionais() {
  const { show } = useOutletContext();
  const [profissionais, setProfissionais] = useState([]);
  const [profissionaisFiltrados, setProfissionaisFiltrados] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("");
  const profissionaisPerPage = 10;

  useEffect(() => {
    const profissionais = [
      { id: 1, registro: '001', nome: 'Dr. Alice Silva' },
      { id: 2, registro: '002', nome: 'Dr. Bruno Sousa' },
      { id: 3, registro: '003', nome: 'Dr. Carla Mendes' },
      { id: 4, registro: '004', nome: 'Dr. Diego Lima' },
      { id: 5, registro: '005', nome: 'Dra. Elaine Costa' },
      { id: 6, registro: '006', nome: 'Dr. Fábio Alves' },
      { id: 7, registro: '007', nome: 'Dra. Gabriela Martins' },
      { id: 8, registro: '008', nome: 'Dr. Henrique Oliveira' },
      { id: 9, registro: '009', nome: 'Dra. Isabela Ferreira' },
      { id: 10, registro: '010', nome: 'Dr. Jorge Nunes' },
      { id: 11, registro: '011', nome: 'Dra. Karina Rocha' },
      { id: 12, registro: '012', nome: 'Dr. Lucas Araújo' },
      { id: 13, registro: '013', nome: 'Dra. Mariana Santos' },
      { id: 14, registro: '014', nome: 'Dr. Nicolas Souza' },
      { id: 15, registro: '015', nome: 'Dra. Olivia Ramos' },
      // Adicione mais profissionais conforme necessário
    ];
    setProfissionais(profissionais);
    setProfissionaisFiltrados(profissionais);
  }, []);

  useEffect(() => {
    const filteredProfissionais = profissionais.filter((profissional) => {
      if (searchType === "1") {
        return profissional.registro.toLowerCase().includes(searchQuery.toLowerCase());
      } else if (searchType === "2") {
        return profissional.nome.toLowerCase().includes(searchQuery.toLowerCase());
      }
      return true;
    });
    setProfissionaisFiltrados(filteredProfissionais);
    setCurrentPage(1); // Reset to first page on new search
  }, [searchQuery, searchType, profissionais]);

  const indexOfLastProfissional = currentPage * profissionaisPerPage;
  const indexOfFirstProfissional = indexOfLastProfissional - profissionaisPerPage;
  const currentProfissionais = profissionaisFiltrados.slice(indexOfFirstProfissional, indexOfLastProfissional);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <Container className={`container-profissionais ${show ? "container-profissionais-active" : ""}`}>
        <Card className="card-lista-profissionais">
          <Card.Body>
            <Row>
              <Card.Title className="font-bold">Lista de Profissionais</Card.Title>
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
                    <option value="1">Registro</option>
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
                <Button className="button-cadastro-profissional mt-3" as={Link} to="/profissionais/CadastrarProfissionais">
                  <CiCirclePlus /> Cadastrar Profissional
                </Button>
              </Col>
            </Row>
            <Row>
              <Table striped bordered hover className="mt-4">
                <thead>
                  <tr>
                    <th>Registro</th>
                    <th>Nome</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {currentProfissionais.length <= 0 ? (
                    <tr>
                      <td colSpan="3" className="text-center">Nenhum profissional encontrado</td>
                    </tr>
                  ) : (
                    currentProfissionais.map((profissional) => (
                      <tr key={profissional.id}>
                        <td>{profissional.registro}</td>
                        <td>{profissional.nome}</td>
                        <td><Button as={Link} to={`/profissionais/${profissional.id}`}><RiUserSearchLine /></Button></td>
                      </tr>
                    ))
                  )}
                </tbody>
              </Table>
            </Row>
            <Row>
              <Pagination className="justify-content-center mt-3">
                {Array.from({ length: Math.ceil(profissionaisFiltrados.length / profissionaisPerPage) }, (_, index) => (
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

export default Profissionais;
