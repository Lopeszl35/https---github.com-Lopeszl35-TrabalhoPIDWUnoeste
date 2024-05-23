import './Usuarios.css';
import { useOutletContext } from 'react-router-dom';
import { Container } from 'react-bootstrap';

function Usuarios() {
    const { show } = useOutletContext();
    return ( <>
        <Container className={`container-usuarios ${show ? 'container-usuarios-active' : ''}`}>
            <h1>Usuários</h1>
        </Container>
    </> );
}

export default Usuarios;