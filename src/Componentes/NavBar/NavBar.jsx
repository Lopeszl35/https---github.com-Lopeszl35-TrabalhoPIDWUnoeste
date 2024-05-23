import './NavBar.css';
import { Link, Outlet } from 'react-router-dom';
import { FaHome, FaKey, FaUser, FaComment, FaCogs, FaChartBar, FaBars, FaTimes, FaSignOutAlt } from "react-icons/fa";
import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import { useState } from 'react';

function NavBar({ onLogout }) {
    const [show, setShow] = useState(true);
    const handleShow = () => {
        setShow(!show);
    };

    return (
        <>
            <div>
                <Navbar bg="dark" variant="dark" className='navbar'>
                    <Container>
                        <Nav className="me-auto gap-3">
                            <Nav.Link as={Link} to="/">
                                <FaUser className='m-2' />
                                <span>Perfil Usuário</span>
                            </Nav.Link>
                            <Nav.Link as={Link} to="/">
                                <FaComment className='m-2'/>
                                <span>Comunicação Interna</span>
                            </Nav.Link>
                        </Nav>
                        <Button variant="outline-light" onClick={onLogout}>
                            <FaSignOutAlt /> Logout
                        </Button>
                    </Container>
                </Navbar>
            </div>

            <div className={`side-navbar ${show ? 'active-nav' : ''}`} id="sidebar">
                <ul className="nav text-white w-100">
                    <span className="nav-link h3 my-2">Saúde Solutions Connect</span>
                </ul>
                <li className="nav-link">
                    <Link to='/home'>
                        <FaHome />
                        <span className="mx-2">Home</span>
                    </Link>
                </li>
                <li className="nav-link">
                    <Link to='/materiais'>
                        <FaCogs />
                        <span className="mx-2">Materiais</span>
                    </Link>
                </li>
                <li className="nav-link">
                    <Link to='/produtos'>
                        <FaKey />
                        <span className="mx-2">Produtos</span>
                    </Link>
                </li>
                <li className="nav-link">
                    <Link to='/relatorios'>
                        <FaChartBar />
                        <span className="mx-2">Gerar Relatórios</span>
                    </Link>
                </li>
            </div>

            <div className={`p-1 my-container ${show ? 'active-cont' : ''}`}>
                <nav onClick={handleShow} className='d-flex align-items-center gap-2 menu'>
                    {show ? <FaTimes /> : <FaBars />} Menu
                </nav>
            </div>

            <Container className='container-principal'>
                <Outlet context={{ show }} />
            </Container>
        </>
    );
}

export default NavBar;
