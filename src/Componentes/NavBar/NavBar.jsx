import './NavBar.css';
import { Link, Outlet } from 'react-router-dom';
import { FaUser, FaChartBar, FaBars, FaTimes, FaSignOutAlt,} from "react-icons/fa";
import { TbUserHeart } from "react-icons/tb";
import { LiaUserLockSolid, LiaUser, LiaHomeSolid   } from "react-icons/lia";
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
                        </Nav>
                        <Button variant="outline-light" onClick={onLogout}>
                            <FaSignOutAlt /> Sair
                        </Button>
                    </Container>
                </Navbar>
            </div>

            <div className={`side-navbar ${show ? 'active-nav' : ''}`} id="sidebar">
                <ul className="nav text-white w-100">
                    <span className="nav-link h3 my-2 tittle">CareConnect</span>
                </ul>
                <li className="nav-link">
                    <Link to='/home'>
                        <LiaHomeSolid  />
                        <span className="mx-2">Inicio</span>
                    </Link>
                </li>
                <li className="nav-link">
                    <Link to='/pacientes'>
                        <TbUserHeart  />
                        <span className="mx-2">Pacientes</span>
                    </Link>
                </li>
                <li className="nav-link">
                    <Link to='/profissionais'>
                        <LiaUserLockSolid Key />
                        <span className="mx-2">Profissionais</span>
                    </Link>
                </li>
                <li className="nav-link">
                    <Link to='usuarios'>
                        <LiaUser />
                        <span className="mx-2">Usúarios</span>
                    </Link>
                </li>
                <li className="nav-link">
                    <Link to='/relatorios'>
                        <FaChartBar />
                        <span className="mx-2">Relatórios</span>
                    </Link>
                </li>
            </div>

            <div className={`p-1 my-container ${show ? 'active-cont' : ''}`}>
                <nav onClick={handleShow} className='d-flex align-items-center gap-2 menu'>
                    {show ? <FaTimes /> : <FaBars />} Menu
                </nav>
            </div>

            <Container>
                <Outlet context={{ show }} />
            </Container>
        </>
    );
}

export default NavBar;
