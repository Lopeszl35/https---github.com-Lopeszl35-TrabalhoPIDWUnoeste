import "./NavBar.css";
import { Link, Outlet } from "react-router-dom";
import { FaUser, FaBars, FaTimes, FaSignOutAlt } from "react-icons/fa";
import { MdOutlineFactCheck } from "react-icons/md";
import { BsFileText } from "react-icons/bs";
import { MdOutlineMedicalServices } from "react-icons/md";
import { TbUserHeart } from "react-icons/tb";
import { LiaUserLockSolid, LiaHomeSolid } from "react-icons/lia";
import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { useState } from "react";
import { useAuth } from "../../context/AuthProvider";

function NavBar() {
  const [show, setShow] = useState(true);
  const { logout, user } = useAuth();

  const handleShow = () => setShow(!show);

  return (
    <>
      <div>
        <Navbar bg="dark" variant="dark" className="navbar">
          <Container>
            <Nav className="me-auto gap-3">
              <Nav.Link as={Link} to="/">
                <FaUser className="m-2" />
                Olá, <strong>{user?.nome || "Usuário"}</strong> - Perfil: <strong>{user?.tipoPermissao}</strong>
              </Nav.Link>
            </Nav>
            <Button variant="outline-light" onClick={logout}>
              <FaSignOutAlt /> Sair
            </Button>
          </Container>
        </Navbar>
      </div>

      <div className={`side-navbar ${show ? "active-nav" : ""}`} id="sidebar">
        <ul className="nav text-white w-100">
          <span className="nav-link h3 my-2 tittle">CareConnect</span>
        </ul>

        {/* Link para Home (disponível para todos) */}
        <li className="nav-link">
          <Link to="/home">
            <LiaHomeSolid />
            <span className="mx-2">Início</span>
          </Link>
        </li>

        {/* Links para Admin (acesso irrestrito) */}
        {user?.tipoPermissao === "admin" && (
          <>
            <li className="nav-link">
              <Link to="usuarios/cadastrar">
                <FaUser />
                <span className="mx-2">Cadastrar Usuários</span>
              </Link>
            </li>
            <li className="nav-link">
              <Link to="/pacientes">
                <TbUserHeart />
                <span className="mx-2">Pacientes</span>
              </Link>
            </li>
            <li className="nav-link">
              <Link to="/Profissionais">
                <LiaUserLockSolid />
                <span className="mx-2">Profissionais</span>
              </Link>
            </li>
            <li className="nav-link">
              <Link to="/servicos">
                <MdOutlineMedicalServices />
                <span className="mx-2">Áreas de Serviços</span>
              </Link>
            </li>
            <li className="nav-link">
              <Link to="/relatorios">
                <BsFileText />
                <span className="mx-2">Relatórios</span>
              </Link>
            </li>
          </>
        )}

        {/* Links para Profissional de Saúde */}
        {user?.tipoPermissao === "profissionalSaude" && (
          <>
            <li className="nav-link">
              <Link to="/pacientes">
                <TbUserHeart />
                <span className="mx-2">Pacientes</span>
              </Link>
            </li>
            <li className="nav-link">
              <Link to="/evoluirPacientes">
                <TbUserHeart />
                <span className="mx-2">Evoluir Pacientes</span>
              </Link>
            </li>
            <li className="nav-link">
              <Link to="/servicos">
                <MdOutlineMedicalServices />
                <span className="mx-2">Áreas de Serviços</span>
              </Link>
            </li>
          </>
        )}

        {/* Links para Usuário Padrão */}
        {user?.tipoPermissao === "usuarioPadrao" && (
          <>
            <li className="nav-link">
              <Link to="/registrarAgendamentos">
                <MdOutlineFactCheck />
                <span className="mx-2">Registrar Presença</span>
              </Link>
            </li>
            <li className="nav-link">
              <Link to="/agendamentos">
                <MdOutlineMedicalServices />
                <span className="mx-2">Agendar Consultas</span>
              </Link>
            </li>
            <li className="nav-link">
              <Link to="/servicos">
                <MdOutlineMedicalServices />
                <span className="mx-2">Áreas de Serviços</span>
              </Link>
            </li>
            <li className="nav-link">
              <Link to="/pacientes">
                <TbUserHeart />
                <span className="mx-2">Ver Pacientes</span>
              </Link>
            </li>
            <li className="nav-link">
              <Link to="/Profissionais">
                <LiaUserLockSolid />
                <span className="mx-2">Ver Profissionais</span>
              </Link>
            </li>
            <li className="nav-link">
              <Link to="/relatorios">
                <BsFileText />
                <span className="mx-2">Relatórios</span>
              </Link>
            </li>
          </>
        )}
      </div>

      <div className={`p-1 my-container ${show ? "active-cont" : ""}`}>
        <nav onClick={handleShow} className="d-flex align-items-center gap-2 menu">
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
