import React, { useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import { FaArrowLeft, FaFileDownload } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import RelatorioService from "../../services/relatorioService";
import "./RelatoriosPacientes.css";

const relatorioService = new RelatorioService();

function Relatorio() {
  const [relatorios, setRelatorios] = useState([]);
  const [erro, setErro] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const navigate = useNavigate();

  // Carregar os relatórios
  useEffect(() => {
    const fetchRelatorios = async () => {
      try {
        setCarregando(true);
        const dadosRelatorios = await relatorioService.listar();
        setRelatorios(dadosRelatorios);
      } catch (error) {
        setErro('Erro ao carregar os relatórios. Tente novamente mais tarde.');
      } finally {
        setCarregando(false);
      }
    };

    fetchRelatorios();
  }, []);

  const exportarRelatorio = (relatorioId) => {
    // Lógica para exportar relatório
    console.log(`Exportando relatório ${relatorioId}`);
  };

  return (
    <Container className="container-relatorios">
      <h1>Relatórios</h1>

      {erro && <div className="alert-erro">{erro}</div>}

      {carregando ? (
        <div className="spinner-container">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Carregando...</span>
          </div>
        </div>
      ) : (
        <div className="card-lista-relatorios">
          {relatorios.length === 0 ? (
            <p>Não há relatórios disponíveis.</p>
          ) : (
            relatorios.map((relatorio) => (
              <div key={relatorio.id} className="card-relatorio">
                <div>
                  <p className="titulo-relatorio">{relatorio.titulo}</p>
                  <p className="data-relatorio">
                    {new Date(relatorio.data).toLocaleDateString()}
                  </p>
                </div>

                <Button
                  className="button-exportar"
                  onClick={() => exportarRelatorio(relatorio.id)}
                >
                  <FaFileDownload className="me-2" />
                  Exportar
                </Button>
              </div>
            ))
          )}
        </div>
      )}

      <div className="d-flex justify-content-end mt-3">
        <Link to="/dashboard">
          <Button variant="secondary" className="me-2">
            <FaArrowLeft className="me-2" />
            Voltar
          </Button>
        </Link>
      </div>
    </Container>
  );
}

export default Relatorio;