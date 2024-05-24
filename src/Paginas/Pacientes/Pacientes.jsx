import { Card, Container } from "react-bootstrap";
import { useOutletContext } from "react-router-dom";
import "./Pacientes.css";

function Pacientes() {
  const { show } = useOutletContext();
  return (
    <div>
      <Container
        className={`container-pacientes ${show ? "container-pacientes-active" : ""}`}
      >
        <Card className="card-pacientes">
          <Card.Body>
            <Card.Title className="font-bold">Lista de Pacientes</Card.Title>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default Pacientes;
