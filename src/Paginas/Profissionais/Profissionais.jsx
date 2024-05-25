import { Card, Col, Container, Form, Row, Button, Table, Pagination } from "react-bootstrap";
import { useOutletContext, Link } from "react-router-dom";
import { CiCirclePlus } from "react-icons/ci";
import { RiUserSearchLine } from "react-icons/ri";
import { useState } from "react"; 
import './Profissionais.css';

function Profissionais() {
  const { show } = useOutletContext();
  const [profissionaisFiltrados, setProfissionaisFiltrados] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const profissionaisPerPage = 10; 

  // Calcula o índice dos profissionais que serão mostrados na página atual
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
                  <Form.Select aria-label="Default select example" size="sm" className="me-2">
                    <option>Selecione</option>
                    <option value="1">Registro</option>
                    <option value="2">Nome</option>
                  </Form.Select>
                  <Form.Control 
                    type="text" 
                    placeholder="Pesquisar"
                    id="pesquisar"
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
