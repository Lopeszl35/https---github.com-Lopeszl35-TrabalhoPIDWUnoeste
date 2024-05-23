import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import NavBar from './Componentes/NavBar/NavBar';
import Materiais from './Paginas/Materiais/Materiais';
import MateriaisNovo from './Paginas/Materiais/MateriaisNovo';
import MateriaisPesquisa from './Paginas/Materiais/MateriaisPesquisa';
import Home from './Paginas/Home/Home';
import Login from './Componentes/Login/Login';
import MateriaisEditar from './Paginas/Materiais/MateriaisEditar';
import GerarRelatorios from './Paginas/Relatorios/GerarRelatorios';

function AppRouter() {
  const [loggedIn, setLoggedIn] = React.useState(() => localStorage.getItem('isLoggedIn') === 'true');

  const handleLoginSuccess = () => {
    localStorage.setItem('isLoggedIn', 'true');
    setLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setLoggedIn(false);
  };

  if (loggedIn) {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<NavBar onLogout={handleLogout} />}>
            <Route index element={<App />} />
            <Route path="home" element={<Home />} />
            <Route path="materiais" element={<Materiais />} />
            <Route path="materiais/cadastro" element={<MateriaisNovo />} />
            <Route path="materiais/editar/:id" element={<MateriaisEditar />} />
            <Route path="materiais/pesquisa/:id" element={<MateriaisPesquisa />} />
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
        <Route path="/" element={<Login onLoginSuccess={handleLoginSuccess} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
