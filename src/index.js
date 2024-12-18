import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { AuthProvider, useAuth } from "./context/AuthProvider";

// Componentes e Páginas
import NavBar from "./Componentes/NavBar/NavBar";
import Home from "./Paginas/Home/Home";
import Login from "./Componentes/Login/Login";
import CadastrarUsuario from "./Paginas/CadastrarUsuario/CadastrarUsuario";
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
import NotAuthorized from "./Paginas/acessoNaoAutorizado/NotAuthorized";
import RoleBasedRoute from "./components/RoleBasedRoute";

// Layout principal
function Layout() {
  return <NavBar />;
}

// Rotas protegidas
function AppRouter() {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) return <div>Carregando...</div>;

  return (
    <Router>
      <Routes>
        {/* Rota pública */}
        <Route path="/" element={!isAuthenticated ? <Login /> : <Navigate to="/home" />} />

        {/* Rotas protegidas */}
        {isAuthenticated && user && (
          <Route element={<Layout />}>
            <Route index element={<Navigate to="/home" />} />
            <Route path="home" element={<Home />} />

             {/* Rotas compartilhadas entre Admin e Usuário Padrão */}
             <Route element={<RoleBasedRoute allowedRoles={["admin", "usuarioPadrao"]} />}>
              <Route path="registrarAgendamentos" element={<RegistrarPresenca />} />
              <Route path="agendamentos" element={<AgendarConsultas />} />
              <Route path="pacientes" element={<Pacientes />} />
              <Route path="pacientes/CadastrarPacientes" element={<CadastrarPacientes />} />
              <Route path="pacientes/EditarPacientes/:prontuario" element={<EditarPacientes />} />
              <Route path="Profissionais" element={<Profissionais />} />
              <Route path="profissionais/horarios/:idProfissional" element={<ProfissionaisHorarios />} />
              <Route path="servicos" element={<Servicos />} />
              <Route path="servicos/:idServico/profissionais" element={<ProfissionaisPorServico />} />
            </Route>

            {/* Rotas compartilhadas entre Admin e Profissional de Saúde */}
            <Route element={<RoleBasedRoute allowedRoles={["admin", "profissionalSaude"]} />}>
              <Route path="servicos" element={<Servicos />} />
              <Route path="pacientes" element={<Pacientes />} />
              <Route path="evoluirPacientes" element={<EvolucaoPaciente />} />
            </Route>

            {/* Rotas exclusivas para Admin */}
            <Route element={<RoleBasedRoute allowedRoles={["admin"]} />}>
              <Route path="usuarios/cadastrar" element={<CadastrarUsuario />} />
              <Route path="servicos/cadastro" element={<ServicosNovo />} />
              <Route path="relatorios" element={<Relatorios />} />
              <Route path="RelatoriosAgendamento" element={<RelatoriosAgendamento />} />
              <Route path="RelatoriosPacientes" element={<RelatoriosPacientes />} />
              <Route path="pacientes/CadastrarPacientes" element={<CadastrarPacientes />} />
              <Route path="pacientes/EditarPacientes/:prontuario" element={<EditarPacientes />} />
              <Route path="Profissionais" element={<Profissionais />} />
              <Route path="/Profissionais/CadastrarProfissionais" element={<CadastrarProfissionais />} />
              <Route path="profissionais/horarios/:idProfissional" element={<ProfissionaisHorarios />} />
              <Route path="servicos/:idServico/profissionais" element={<ProfissionaisPorServico />} />
            </Route>

            {/* Página de acesso negado */}
            <Route path="not-authorized" element={<NotAuthorized />} />
            <Route path="*" element={<Navigate to="/home" />} />
          </Route>
        )}

        {/* Redirecionamento para Login */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

// Renderização principal
const RootApp = () => (
  <AuthProvider>
    <AppRouter />
  </AuthProvider>
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RootApp />
  </React.StrictMode>
);

reportWebVitals();
