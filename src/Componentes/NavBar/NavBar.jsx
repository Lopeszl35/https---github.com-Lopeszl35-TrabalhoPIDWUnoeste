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
import { useAuth } from "../../context/AuthProvider"; // Importa o contexto de autenticação

function NavBar() {
  const [show, setShow] = useState(true);
  const { logout, user } = useAuth(); // Obtém o usuário e a função logout do contexto

  const handleShow = () => setShow(!show);

  return (
    <>
      <div>
        <Navbar bg="dark" variant="dark" className="navbar">
          <Container>
            <Nav className="me-auto gap-3">
              <Nav.Link as={Link} to="/">
                <FaUser className="m-2" />
                <span>Olá, {user?.nome || "Usuário"}</span> {/* Saudação com o nome */}
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
        <li className="nav-link">
          <Link to="/home">
            <LiaHomeSolid />
            <span className="mx-2">Inicio</span>
          </Link>
        </li>

        {/* Links exibidos somente para Admin */}
        {user?.tipoPermissao === "admin" && (
          <>
            <li className="nav-link">
              <Link to="usuarios/cadastrar">
                <FaUser />
                <span className="mx-2">Cadastrar Usuários</span>
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
          </>
        )}

        {/* Links para Profissionais de Saúde */}
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
          </>
        )}

        {/* Links comuns para todos */}
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
          <Link to="/Relatorios">
            <BsFileText />
            <span className="mx-2">Relatórios</span>
          </Link>
        </li>

        <div className="logo-container">
          <img
            src="./img/Login/Logo-removebg-preview.png"
            alt="LogoCareConnect"
            className="logo"
          />
        </div>
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
