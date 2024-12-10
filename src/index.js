import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import NavBar from "./Componentes/NavBar/NavBar";
import Home from "./Paginas/Home/Home";
import Login from "./Componentes/Login/Login";
import Relatorios from "./Paginas/Relatorios/Relatorios";
import RelatoriosAgendamento from "./Paginas/Relatorios/RelatoriosAgendamento";
import RelatoriosPacientes from "./Paginas/Relatorios/RelatoriosPacientes";
import Pacientes from "./Paginas/Pacientes/Pacientes";
import EvolucaoPaciente from "./Paginas/Pacientes/EvolucaoPaciente";
import Profissionais from "./Paginas/Profissionais/Profissionais";
import ProfissionaisHorarios from "./Paginas/Profissionais/ProfissionaisHorarios";
import CadastrarProfissionais from "./Paginas/Profissionais/CadastrarProfissionais";
import Servicos from "./Paginas/Gerenciar-Servicos/Servicos";
import ProfissionaisPorServico from "./Paginas/Gerenciar-Servicos/ProfissionaisPorServico";
import ServicosNovo from "./Paginas/Gerenciar-Servicos/ServicosNovo";
import CadastrarPacientes from "./Paginas/Pacientes/CadastrarPacientes";
import EditarPacientes from "./Paginas/Pacientes/EditarPacientes";
import RegistrarPresenca from "./Paginas/Agendamentos/RegistrarPresenca";
import AgendarConsultas from "./Paginas/Agendamentos/AgendaConsulta";
import { AuthProvider, useAuth } from "./context/AuthProvider";
import PrivateRoute from "./components/PrivateRoute";

// Layout com NavBar e Outlet para rotas privadas
function Layout() {
  const [show, setShow] = useState(true);
  return (
    <>
      <NavBar  />
    </>
  );
}

// AppRouter com AuthProvider e PrivateRoute
function AppRouter() {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <Routes>
        {/* Rota pública para login, acessível apenas se não autenticado */}
        {!isAuthenticated && (
          <Route path="/" element={<Login />} />
        )}

        {/* Rotas privadas, acessíveis apenas se autenticado */}
        {isAuthenticated && (
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/home" />} /> {/* Redireciona apenas na rota raiz */}
            <Route path="home" element={<Home />} />
            <Route path="pacientes" element={<Pacientes />} />
            <Route path="evoluirPacientes" element={<EvolucaoPaciente />} />
            <Route path="pacientes/CadastrarPacientes" element={<CadastrarPacientes />} />
            <Route path="pacientes/EditarPacientes/:prontuario" element={<EditarPacientes />} />
            <Route path="Profissionais" element={<Profissionais />} />
            <Route path="profissionais/horarios/:idProfissional" element={<ProfissionaisHorarios />} />
            <Route path="Profissionais/CadastrarProfissionais" element={<CadastrarProfissionais />} />
            <Route path="servicos" element={<Servicos />} />
            <Route path="servicos/:idServico/profissionais" element={<ProfissionaisPorServico />} />
            <Route path="servicos/cadastro" element={<ServicosNovo />} />
            <Route path="registrarAgendamentos" element={<RegistrarPresenca />} />
            <Route path="agendamentos" element={<AgendarConsultas />} />
            <Route path="relatorios" element={<Relatorios />} />
            <Route path="RelatoriosAgendamento" element={<RelatoriosAgendamento />} />
            <Route path="RelatoriosPacientes" element={<RelatoriosPacientes />} />
           <Route path="*" element={<Navigate to="/home" />} /> {/* Redireciona qualquer rota desconhecida para Home */}
          </Route>
        )}

        {/* Redireciona qualquer rota desconhecida para login */}
        {!isAuthenticated && <Route path="*" element={<Navigate to="/" />} />}
      </Routes>
    </Router>
  );
}

const RootApp = () => (
  <AuthProvider>
    <AppRouter />
  </AuthProvider>
);

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(
  <React.StrictMode>
    <RootApp />
  </React.StrictMode>
);

reportWebVitals();
