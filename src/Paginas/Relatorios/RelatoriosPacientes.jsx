import React, { useEffect, useState } from "react";
import {
  Container,
  Card,
  Button,
  Table,
  Form,
  Row,
  Col,
} from "react-bootstrap";
import { useOutletContext } from "react-router-dom";
import RelatoriosPacientesService from "../../services/relatoriosPacientesService";
import styles from "./RelatoriosPacientes.module.css";
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

const relatoriosPacientesService = new RelatoriosPacientesService();

function RelatoriosPacientes() {
  const { show } = useOutletContext();
  const [relatorioPacientes, setRelatorioPacientes] = useState([]);
  const [dadosGrafico, setDadosGrafico] = useState(null);
  const [graficoLabel, setGraficoLabel] = useState("Pacientes por Estado");
  const [filtros, setFiltros] = useState({
    nome: "",
    cidade: "",
    estado: "",
    sexo: "",
    idade: "",
    idadeMin: "",
    idadeMax: "",
  });

  useEffect(() => {
    carregarRelatorioPacientes();
  }, []);

  const carregarRelatorioPacientes = async () => {
    try {
      const data = await relatoriosPacientesService.obterRelatorioPacientes(
        filtros
      );
      setRelatorioPacientes(data);
      gerarDadosGrafico(data);
    } catch (error) {
      console.error("Erro ao carregar relatório de pacientes:", error);
    }
  };

  const gerarDadosGrafico = (dados) => {
    if (!Array.isArray(dados) || dados.length === 0) {
      setDadosGrafico(null);
      return;
    }
  
    let agrupados = {};
    let label = "Pacientes";
  
    if (filtros.idadeMin && filtros.idadeMax) {
      const idadeMin = parseInt(filtros.idadeMin, 10);
      const idadeMax = parseInt(filtros.idadeMax, 10);
  
      // Contar pacientes na faixa etária para o gráfico
      const totalPacientes = dados.filter(
        (paciente) => paciente.idade >= idadeMin && paciente.idade <= idadeMax
      ).length;
  
      agrupados = { [`Entre ${idadeMin} e ${idadeMax}`]: totalPacientes };
      label = `Pacientes entre ${idadeMin} e ${idadeMax} anos`;
    } else if (filtros.cidade) {
      agrupados = dados.reduce((acc, curr) => {
        acc[curr.cidade] = (acc[curr.cidade] || 0) + 1;
        return acc;
      }, {});
      label = "Pacientes por Cidade";
    } else if (filtros.estado) {
      agrupados = dados.reduce((acc, curr) => {
        acc[curr.estado] = (acc[curr.estado] || 0) + 1;
        return acc;
      }, {});
      label = "Pacientes por Estado";
    } else {
      agrupados = dados.reduce((acc, curr) => {
        acc[curr.sexo] = (acc[curr.sexo] || 0) + 1;
        return acc;
      }, {});
      label = "Pacientes por Sexo";
    }
  
    const labels = Object.keys(agrupados);
    const valores = Object.values(agrupados);
  
    setGraficoLabel(label);
    setDadosGrafico({
      labels,
      datasets: [
        {
          label,
          data: valores,
          backgroundColor: "rgba(75, 192, 192, 0.6)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    });
  };

  const handleFiltroChange = (e) => {
    const { name, value } = e.target;
    setFiltros((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const renderTabela = (dados) => (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Prontuário</th>
          <th>Nome</th>
          <th>Cidade</th>
          <th>Estado</th>
          <th>Sexo</th>
          <th>Idade</th>
        </tr>
      </thead>
      <tbody>
        {dados.length === 0 ? (
          <tr>
            <td colSpan="5" className="text-danger">Nenhum dado encontrado.</td>
          </tr>
        ) : (
          dados.map((item, index) => (
            <tr key={index}>
              <td>{item.prontuario}</td>
              <td>{item.nome}</td>
              <td>{item.cidade}</td>
              <td>{item.estado}</td>
              <td>{item.sexo}</td>
              <td>{item.idade}</td>
            </tr>
          ))
        )}
      </tbody>
    </Table>
  );

  return (
    <Container
      className={`${styles.containerRelatoriosPacientes} ${
        show ? styles.containerRelatoriosPacientesActive : ""
      }`}
    >
      <h1 className="text-center mb-4">Relatórios de Pacientes</h1>
      <Card className={styles.cardRelatorio}>
        <Form className="mb-4">
          <Row>
            <Col md={3}>
              <Form.Group>
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  type="text"
                  name="nome"
                  value={filtros.nome}
                  onChange={handleFiltroChange}
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>Cidade</Form.Label>
                <Form.Control
                  type="text"
                  name="cidade"
                  value={filtros.cidade}
                  onChange={handleFiltroChange}
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>Estado</Form.Label>
                <Form.Control
                  type="text"
                  name="estado"
                  value={filtros.estado}
                  onChange={handleFiltroChange}
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>Sexo</Form.Label>
                <Form.Control
                  as="select"
                  name="sexo"
                  value={filtros.sexo}
                  onChange={handleFiltroChange}
                >
                  <option value="">Todos</option>
                  <option value="M">Masculino</option>
                  <option value="F">Feminino</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col md={3}>
              <Form.Group>
                <Form.Label>Idade Mínima</Form.Label>
                <Form.Control
                  type="number"
                  name="idadeMin"
                  value={filtros.idadeMin}
                  onChange={handleFiltroChange}
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>Idade Máxima</Form.Label>
                <Form.Control
                  type="number"
                  name="idadeMax"
                  value={filtros.idadeMax}
                  onChange={handleFiltroChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Button
            variant="primary"
            className="mt-3"
            onClick={carregarRelatorioPacientes}
          >
            Filtrar
          </Button>
        </Form>
        <h2 className="text-center">Tabela de Pacientes</h2>
        {renderTabela(relatorioPacientes)}
      </Card>
      <Card className={`${styles.cardRelatorio} mt-4`}>
        <h2 className="text-center">{graficoLabel}</h2>
        {dadosGrafico ? (
          <Bar data={dadosGrafico} />
        ) : (
          <p className="text-center text-danger">Nenhum dado disponível para o gráfico.</p>
        )}
      </Card>
    </Container>
  );
}

export default RelatoriosPacientes;
