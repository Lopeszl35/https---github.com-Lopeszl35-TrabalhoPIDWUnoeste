import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import NavBar from "./Componentes/NavBar/NavBar";
import Home from "./Paginas/Home/Home";
import Login from "./Componentes/Login/Login";
import GerarRelatorios from "./Paginas/Relatorios/GerarRelatorios";
import Pacientes from "./Paginas/Pacientes/Pacientes";
import Usuarios from "./Paginas/Usuarios/Usuarios";
import CadastrarUsuarios from "./Paginas/Usuarios/CadastrarUsuarios";
import Servicos from "./Paginas/Gerenciar-Servicos/Servicos";
import ServicosNovo from "./Paginas/Gerenciar-Servicos/ServicosNovo";
import CadastrarPacientes from "./Paginas/Pacientes/CadastrarPacientes";
import EditarPacientes from "./Paginas/Pacientes/EditarPacientes";


function AppRouter() {
  const [loggedIn, setLoggedIn] = React.useState(
    () => localStorage.getItem("isLoggedIn") === "true"
  );

  const handleLoginSuccess = () => {
    localStorage.setItem("isLoggedIn", "true");
    setLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setLoggedIn(false);
  };

  return (
    <Router>
      <Routes>
        {loggedIn ? (
          <Route path="/" element={<NavBar onLogout={handleLogout} />}>
            <Route index element={<Navigate to="/home" />} />
            <Route path="home" element={<Home />} />
            <Route path="pacientes" element={<Pacientes />} />
            <Route path="pacientes/CadastrarPacientes" element={<CadastrarPacientes />} />
            <Route path="pacientes/EditarPacientes/:id" element={<EditarPacientes />} />
            <Route path="usuarios" element={<Usuarios />} />
            <Route path="/usuarios/CadastrarUsuarios" element={<CadastrarUsuarios />} />
            <Route path="servicos" element={<Servicos />} />
            <Route path="servicos/cadastro" element={<ServicosNovo />} />
            <Route path="relatorios" element={<GerarRelatorios />} />
            <Route path="*" element={<Navigate to="/home" />} />
          </Route>
        ) : (
          <>
            <Route 
              path="/" 
              element={<Login onLoginSuccess={handleLoginSuccess} />} 
            />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
);

reportWebVitals();
