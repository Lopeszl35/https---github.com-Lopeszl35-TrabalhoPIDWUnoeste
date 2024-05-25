import React from "react";
import ReactDOM from "react-dom";
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
import Profissionais from "./Paginas/Profissionais/Profissionais";
import Servicos from "./Paginas/Gerenciar-Servicos/Servicos";
import ServicosNovo from "./Paginas/Gerenciar-Servicos/ServicosNovo";
import CadastrarPacientes from "./Paginas/Pacientes/CadastrarPacientes";

function AppRouter() {
  const [loggedIn, setLoggedIn] = React.useState(
    () => localStorage.getItem("isLoggedIn") === "true",
  );

  const handleLoginSuccess = () => {
    localStorage.setItem("isLoggedIn", "true");
    setLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setLoggedIn(false);
  };

  if (loggedIn) {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<NavBar onLogout={handleLogout} />}>
            <Route index element={<App />} />
            <Route path="home" element={<Home />} />
            <Route path="pacientes" element={<Pacientes />} />
            <Route path="pacientes/CadastrarPacientes" element={<CadastrarPacientes />} />
            <Route path="profissionais" element={<Profissionais />} />
            <Route path="servicos" element={<Servicos />} />
            <Route path="servicos/cadastro" element={<ServicosNovo />} />
            <Route path="relatorios" element={<GerarRelatorios />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        </Routes>
      </Router>
    );
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Login onLoginSuccess={handleLoginSuccess} />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>,
  document.getElementById("root"),
);

reportWebVitals();
