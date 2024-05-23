import { Container } from "react-bootstrap";
import { useOutletContext } from "react-router-dom";
import './Pacientes.css';

function Pacientes() {
    const { show } = useOutletContext();
    return (
        <Container className={`container-pacientes ${show ? 'container-pacientes-active' : ''}`}>
            <h1>Pacientes</h1>
            
        </Container>
    );
}

export default Pacientes;
