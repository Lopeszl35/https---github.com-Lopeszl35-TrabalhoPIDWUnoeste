import { Container } from 'react-bootstrap';
import { useOutletContext } from 'react-router-dom';
import './Profissionais.css';
function Profissionais() {
    const { show } = useOutletContext();
    return ( <>
        <Container className={`container-profissionais ${show ? 'container-profissionais-active' : ''}`}>
            <h1>Profissionais</h1>
        </Container>
    </> );
}

export default Profissionais;