import React, { useState, useEffect } from 'react';
import { Card, Col, Container, Form, Row, Button, Table, Pagination } from "react-bootstrap";
import { useOutletContext, Link } from "react-router-dom";
import { CiCirclePlus } from "react-icons/ci";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import ModalExcluir from './ModalExcluir';
import './Profissionais.css';

function Profissionais() {
  const { show } = useOutletContext();
  const [profissionais, setProfissionais] = useState([]);
  const [profissionaisFiltrados, setProfissionaisFiltrados] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("");
  const [modalDelete, setModalDelete] = useState(false);
  const profissionaisPerPage = 10;

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
    setCurrentPage(1);
  }, [searchQuery, searchType, profissionais]);

  const indexOfLastProfissional = currentPage * profissionaisPerPage;
  const indexOfFirstProfissional = indexOfLastProfissional - profissionaisPerPage;
  const currentProfissionais = profissionaisFiltrados.slice(indexOfFirstProfissional, indexOfLastProfissional);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const fecharModalDelete = () => {
    setModalDelete(false);
  };

  return (
    <section>
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
                    <option value="1">Registro Profissional</option>
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
                <Button className="button-cadastro-profissional mt-3" as={Link} to="/Profissionais/CadastrarProfissionais">
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
                    <th>Registro Profissional</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {currentProfissionais.length <= 0 ? (
                    <tr>
                      <td colSpan="4" className="text-center">Nenhum profissional encontrado</td>
                    </tr>
                  ) : (
                    currentProfissionais.map((profissional) => (
                      <tr key={profissional.ID_Profissional}>
                        <td>{profissional.ID_Profissional}</td>
                        <td>{profissional.Nome_Completo}</td>
                        <td>{profissional.RegistroProfissional}</td>
                        <td className="d-flex flex-row gap-2">
                          <Button as={Link} to={`/profissionais/${profissional.id}`}><FaEdit /></Button>
                          <Button className='btn-danger' onClick={() => setModalDelete(true)}
                          ><FaTrashAlt></FaTrashAlt>
                          </Button>
                        </td>
                        
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

      <ModalExcluir 
      modalDelete={modalDelete} 
      setShow={setModalDelete}
      fecharModalDelete={fecharModalDelete}
      />
    </section>
  );
}

export default Profissionais;
