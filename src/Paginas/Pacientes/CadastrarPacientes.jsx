import { Card, Col, Container, Form, Row } from "react-bootstrap";
import { useOutletContext } from "react-router-dom";
import "./CadastrarPacientes.css";

function Pacientes() {
    const { show } = useOutletContext();
    return (
      <div>
        <Container className={`container-pacientes ${show ? "container-pacientes-active" : ""}`}>
        <h1>Cadastrar Paciente</h1>
        </Container>
      </div>
  );
}

export default Pacientes;