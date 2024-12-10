import React, { useEffect, useState } from "react";
import {
  Container,
  Card,
  Button,
  Table,
  Tabs,
  Tab,
  Form,
  Row,
  Col,
} from "react-bootstrap";
import { useOutletContext } from "react-router-dom";
import RelatoriosService from "../../services/relatoriosService";
import RelatoriosAgendamentoService from "../../services/relatoriosAgendamentoService";
import styles from "./RelatoriosAgendamento.module.css"
import { Bar } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Registrar as escalas e elementos necessários no Chart.js
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const relatoriosAgendamentoService = new RelatoriosAgendamentoService();
const relatoriosService = new RelatoriosService();

function formatarDataHora(dataHora) {
  if (!dataHora) return "";
  const dateObj = new Date(dataHora);
  const data = dateObj.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const hora = dateObj.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return { data, hora };
}

function DashboardRelatorios() {
  const { show } = useOutletContext();
  const [relatorioAgendamentos, setRelatorioAgendamentos] = useState([]);
  const [dadosGrafico, setDadosGrafico] = useState(null);
  const [graficoComparacao, setGraficoComparacao] = useState(null);
  const [ativo, setAtivo] = useState("agendamentos");
  const [filtros, setFiltros] = useState({
    dataInicio: "",
    dataFim: "",
    paciente: "",
    profissional: "",
    servico: "",
    status: "",
  });
  const [servicosComparar, setServicosComparar] = useState({
    servico1: "",
    servico2: "",
  });

  useEffect(() => {
    if (ativo === "agendamentos") {
      relatoriosAgendamentoService
        .obterAgendamentos(filtros)
        .then((data) => {
          setRelatorioAgendamentos(data || []);
          gerarDadosGrafico(data || []);
        })
        .catch((error) => console.error("Erro ao carregar agendamentos:", error));
    }
  }, [ativo, filtros]);

  const gerarDadosGrafico = (dados) => {
    if (!Array.isArray(dados) || dados.length === 0) {
      setDadosGrafico(null);
      return;
    }

    const agrupadosPorServico = dados.reduce((acc, curr) => {
      acc[curr.servico] = (acc[curr.servico] || 0) + 1;
      return acc;
    }, {});

    const labels = Object.keys(agrupadosPorServico);
    const valores = Object.values(agrupadosPorServico);

    setDadosGrafico({
      labels,
      datasets: [
        {
          label: "Número de Agendamentos por Serviço",
          data: valores,
          backgroundColor: "rgba(75, 192, 192, 0.6)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    });
  };

  const gerarGraficoComparacao = (dados, servico1, servico2) => {
    if (!Array.isArray(dados) || dados.length === 0) {
      setGraficoComparacao(null);
      return;
    }

    const agrupados = dados.reduce((acc, curr) => {
      if (curr.servico === servico1 || curr.servico === servico2) {
        acc[curr.servico] = (acc[curr.servico] || 0) + 1;
      }
      return acc;
    }, {});

    const labels = [servico1, servico2];
    const valores = [agrupados[servico1] || 0, agrupados[servico2] || 0];

    setGraficoComparacao({
      labels,
      datasets: [
        {
          label: `Comparação entre ${servico1} e ${servico2}`,
          data: valores,
          backgroundColor: ["rgba(255, 99, 132, 0.6)", "rgba(54, 162, 235, 0.6)"],
          borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
          borderWidth: 1,
        },
      ],
    });
  };

  const renderTabela = (dados, headers) => (
    <Table striped bordered hover className="table">
      <thead>
        <tr>
          {headers.map((header) => (
            <th key={header}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {dados.length === 0 ? (
          <tr>
            <td colSpan={headers.length}>Nenhum dado encontrado</td>
          </tr>
        ) : (
          dados.map((item, index) => (
            <tr key={index}>
              {headers.map((header) => {
                if (header === "data_hora") {
                  const { data, hora } = formatarDataHora(item[header]);
                  return (
                    <td key={`${index}-${header}`}>
                      {data} <br /> {hora}
                    </td>
                  );
                }
                return <td key={`${index}-${header}`}>{item[header]}</td>;
              })}
            </tr>
          ))
        )}
      </tbody>
    </Table>
  );

  const headersAgendamentos = [
    "id_agendamento",
    "data_hora",
    "paciente",
    "profissional",
    "servico",
    "status",
    "observacoes",
  ];

  const handleFiltroChange = (e) => {
    const { name, value } = e.target;
    setFiltros((prevFiltros) => ({
      ...prevFiltros,
      [name]: value,
    }));
  };

  const handleComparacaoChange = (e) => {
    const { name, value } = e.target;
    setServicosComparar((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGerarRelatorio = async (tipo) => {
    try {
      const filtrosQuery = new URLSearchParams(filtros).toString();
      const response = await fetch(
        `http://localhost:3001/relatorio/gerar${tipo === "pdf" ? "Pdf" : "Excel"}?${filtrosQuery}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Erro ao gerar relatório ${tipo.toUpperCase()}!`);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `relatorio.${tipo}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      alert(`Relatório ${tipo.toUpperCase()} gerado com sucesso!`);
    } catch (error) {
      console.error(`Erro ao gerar relatório ${tipo}:`, error);
      alert(`Erro ao gerar relatório ${tipo.toUpperCase()}!`);
    }
  };

  return (
    <div
      className={`${styles.containerDashboard} ${show ? styles.containerDashboardSideActive : ""}`}
    >
      <h1 className="text-center mb-4">Dashboard de Relatórios</h1>
      <Tabs
        activeKey={ativo}
        onSelect={(key) => setAtivo(key)}
        className="mb-3"
        justify
      >
        <Tab eventKey="agendamentos" title="Relatório de Agendamentos">
          <Container>
            <Card className={`${styles.cardRelatorio}`}>
              <Form className="mb-4">
                <Row>
                  <Col md={3}>
                    <Form.Group>
                      <Form.Label>Data Início</Form.Label>
                      <Form.Control
                        type="date"
                        name="dataInicio"
                        value={filtros.dataInicio}
                        onChange={handleFiltroChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group>
                      <Form.Label>Data Fim</Form.Label>
                      <Form.Control
                        type="date"
                        name="dataFim"
                        value={filtros.dataFim}
                        onChange={handleFiltroChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group>
                      <Form.Label>Paciente</Form.Label>
                      <Form.Control
                        type="text"
                        name="paciente"
                        placeholder="Nome do Paciente"
                        value={filtros.paciente}
                        onChange={handleFiltroChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group>
                      <Form.Label>Profissional</Form.Label>
                      <Form.Control
                        type="text"
                        name="profissional"
                        placeholder="Nome do Profissional"
                        value={filtros.profissional}
                        onChange={handleFiltroChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={3} className="mt-3">
                    <Form.Group>
                      <Form.Label>Serviço</Form.Label>
                      <Form.Control
                        type="text"
                        name="servico"
                        placeholder="Serviço"
                        value={filtros.servico}
                        onChange={handleFiltroChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={3} className="mt-3">
                    <Form.Group>
                      <Form.Label>Status</Form.Label>
                      <Form.Control
                        as="select"
                        name="status"
                        value={filtros.status}
                        onChange={handleFiltroChange}
                      >
                        <option value="">Todos</option>
                        <option value="Confirmado">Confirmado</option>
                        <option value="Pendente">Pendente</option>
                        <option value="Concluído">Concluído</option>
                        <option value="Cancelado">Cancelado</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
              </Form>
              <h2 className="text-center mt-3">Agendamentos</h2>
              {renderTabela(relatorioAgendamentos, headersAgendamentos)}
              <div className="d-flex justify-content-center mt-3">
                <Button variant="success" onClick={() => handleGerarRelatorio("excel")}>
        Baixar Relatório em Excel
      </Button>
      <Button variant="danger" onClick={() => handleGerarRelatorio("pdf")}>
        Baixar Relatório em PDF
      </Button>
              </div>
            </Card>
          </Container>
          <Container className="mt-4">
            <Card className={`${styles.cardRelatorio} mt-4`}>
              <h2 className="text-center">Gráficos de Análise</h2>
              {dadosGrafico ? (
                <Bar data={dadosGrafico} />
              ) : (
                <p className="text-center">Nenhum dado disponível para o gráfico.</p>
              )}
            </Card>
            <Card className={`${styles.cardRelatorio} mt-4`}>
              <h2 className="text-center">Comparação de Serviços</h2>
              <Form>
                <Row>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Serviço 1</Form.Label>
                      <Form.Control
                        type="text"
                        name="servico1"
                        placeholder="Serviço para comparar"
                        value={servicosComparar.servico1}
                        onChange={handleComparacaoChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Serviço 2</Form.Label>
                      <Form.Control
                        type="text"
                        name="servico2"
                        placeholder="Outro serviço para comparar"
                        value={servicosComparar.servico2}
                        onChange={handleComparacaoChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Form>
              <Button
                variant="primary"
                className="mt-3"
                onClick={() =>
                  gerarGraficoComparacao(
                    relatorioAgendamentos,
                    servicosComparar.servico1,
                    servicosComparar.servico2
                  )
                }
              >
                Comparar Serviços
              </Button>
              {graficoComparacao ? (
                <Bar data={graficoComparacao} className="mt-4" />
              ) : (
                <p className="text-center mt-4">Nenhum dado disponível para comparação.</p>
              )}
            </Card>
          </Container>
        </Tab>
      </Tabs>
    </div>
  );
}

export default DashboardRelatorios;
