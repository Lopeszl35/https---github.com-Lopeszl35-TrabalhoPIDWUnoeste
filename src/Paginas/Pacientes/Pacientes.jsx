import { Card, Col, Container, Form, Row, Button, Table } from "react-bootstrap";
import { useOutletContext, Link } from "react-router-dom";
import { CiCirclePlus} from "react-icons/ci";
import "./Pacientes.css";

function Pacientes() {
  const { show } = useOutletContext();
  return (
    <div>
      <Container className={`container-pacientes ${show ? "container-pacientes-active" : ""}`}>
        <Card className="card-lista-pacientes">
          <Card.Body>
            <Row>
              <Card.Title className="font-bold">Lista de Pacientes</Card.Title>
            </Row>
            <Row className="mt-4 ">
              <Col lg={12} className="busca">
                <Card.Text>Pesquise Por:</Card.Text>
                <Form className="busca">
                  <Form.Select aria-label="Default select example" size="sm" className="">
                    <option>Selecione</option>
                    <option value="1">Prontuario</option>
                    <option value="2">Nome</option>
                  </Form.Select>
                  <Form.Control 
                    type="text" 
                    placeholder="Pesquisar"
                    id="pesquisar"
                  />
                </Form>
                <Button className="button-cadastro-paciente" as={Link} to="/pacientes/novo">
                  <CiCirclePlus /> Cadastrar Paciente
                </Button>
              </Col>
            </Row>
            <Row>
              <Table striped bordered hover className="mt-4">
                <thead>
                  <tr>
                    <th>Prontuário</th>
                    <th>Nome</th>
                    <th>Ações</th>
                  </tr>
                </thead>
              </Table>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default Pacientes;
