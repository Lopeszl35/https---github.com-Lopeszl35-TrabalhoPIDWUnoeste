import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col, Card, ListGroup, Modal, Alert } from "react-bootstrap";
import { useOutletContext } from "react-router-dom";

// Simulação de dados locais
const pacientesMock = [
  { Prontuario: 1, Nome_Completo: "João Silva" },
  { Prontuario: 2, Nome_Completo: "Maria Oliveira" },
];

const agendamentosMock = [
  { ID_Agendamento: 1, Prontuario: 1, ID_Servico: 1, Nome_Servico: "Fisioterapia", Data: "2024-11-20", Profissional: "Dr. Pedro" },
  { ID_Agendamento: 2, Prontuario: 1, ID_Servico: 2, Nome_Servico: "Psicologia", Data: "2024-11-22", Profissional: "Dra. Ana" },
];

const evolucoesMock = [
  { ID_Evolucao: 1, Data: "2024-11-10", Nome_Servico: "Fisioterapia", Profissional: "Dr. Pedro", Avaliacao: "Boa recuperação." },
  { ID_Evolucao: 2, Data: "2024-11-05", Nome_Servico: "Psicologia", Profissional: "Dra. Ana", Avaliacao: "Paciente responde bem ao tratamento." },
];

function EvolucaoPaciente() {
  const { show } = useOutletContext();
  const [pacientes] = useState(pacientesMock);
  const [agendamentos, setAgendamentos] = useState([]);
  const [evolucoes, setEvolucoes] = useState(evolucoesMock);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPaciente, setSelectedPaciente] = useState(null);
  const [selectedAgendamento, setSelectedAgendamento] = useState(null);
  const [avaliacao, setAvaliacao] = useState("");
  const [observacoes, setObservacoes] = useState("");
  const [selectedEvolucao, setSelectedEvolucao] = useState(null);
  const [noAgendamentos, setNoAgendamentos] = useState(false);

  // Busca e seleção do paciente
  const handleSearchPaciente = () => {
    const pacienteEncontrado = pacientes.find(
      (p) => p.Nome_Completo.toLowerCase().includes(searchTerm.toLowerCase()) || p.Prontuario.toString() === searchTerm
    );
    if (pacienteEncontrado) {
      setSelectedPaciente(pacienteEncontrado);
      const agendamentosFiltrados = agendamentosMock.filter((a) => a.Prontuario === pacienteEncontrado.Prontuario);
      setAgendamentos(agendamentosFiltrados);
      setNoAgendamentos(agendamentosFiltrados.length === 0);
    } else {
      setSelectedPaciente(null);
      setAgendamentos([]);
      setNoAgendamentos(true);
    }
  };

  // Salva a evolução
  const handleSaveEvolucao = () => {
    if (selectedAgendamento && avaliacao) {
      const novaEvolucao = {
        ID_Evolucao: evolucoes.length + 1,
        Data: new Date().toISOString().split("T")[0],
        Nome_Servico: agendamentos.find((a) => a.ID_Agendamento === selectedAgendamento).Nome_Servico,
        Profissional: agendamentos.find((a) => a.ID_Agendamento === selectedAgendamento).Profissional,
        Avaliacao: avaliacao,
        Observacoes: observacoes,
      };
      setEvolucoes([novaEvolucao, ...evolucoes]);
      setAvaliacao("");
      setObservacoes("");
      alert("Evolução salva com sucesso!");
    } else {
      alert("Por favor, selecione um agendamento e preencha a avaliação.");
    }
  };

  // Modal para exibir detalhes de uma evolução
  const handleShowEvolucao = (evolucao) => {
    setSelectedEvolucao(evolucao);
  };

  return (
    <Container className={`container-pacientes ${show ? "container-pacientes-active" : ""}`}>
      <h1 className="my-4">Evolução de Paciente</h1>
      <Form>
        <Row className="align-items-end">
          <Col md={6}>
            <Form.Group controlId="searchPaciente">
              <Form.Label>Buscar Paciente (Nome ou Prontuário)</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite o nome ou prontuário do paciente"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Button variant="primary" onClick={handleSearchPaciente}>
              Buscar
            </Button>
          </Col>
        </Row>

        {selectedPaciente && (
          <>
            <Row className="mt-4">
              <Col>
                <h4>
                  Paciente: <strong>{selectedPaciente.Nome_Completo}</strong>
                </h4>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group controlId="agendamentoSelect">
                  <Form.Label>Agendamentos</Form.Label>
                  {noAgendamentos ? (
                    <Alert variant="warning">Paciente não possui consultas para esta data.</Alert>
                  ) : (
                    <Form.Select
                      value={selectedAgendamento || ""}
                      onChange={(e) => setSelectedAgendamento(e.target.value)}
                    >
                      <option value="">Selecione um agendamento</option>
                      {agendamentos.map((agendamento) => (
                        <option key={agendamento.ID_Agendamento} value={agendamento.ID_Agendamento}>
                          {`${agendamento.Nome_Servico} - ${agendamento.Profissional} (${agendamento.Data})`}
                        </option>
                      ))}
                    </Form.Select>
                  )}
                </Form.Group>
              </Col>
            </Row>
          </>
        )}

        <Row className="mt-4">
          <Col>
            <Form.Group controlId="avaliacao">
              <Form.Label>Avaliação</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={avaliacao}
                onChange={(e) => setAvaliacao(e.target.value)}
                disabled={!selectedPaciente}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mt-3">
          <Col>
            <Form.Group controlId="observacoes">
              <Form.Label>Observações</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={observacoes}
                onChange={(e) => setObservacoes(e.target.value)}
                disabled={!selectedPaciente}
              />
            </Form.Group>
          </Col>
        </Row>

        <Button className="mt-4" variant="primary" onClick={handleSaveEvolucao} disabled={!selectedPaciente}>
          Salvar Evolução
        </Button>
      </Form>

      <h2 className="my-4">Últimas Avaliações</h2>
      <Card>
        <ListGroup variant="flush">
          {evolucoes.map((evolucao) => (
            <ListGroup.Item key={evolucao.ID_Evolucao} className="d-flex justify-content-between align-items-center">
              <div>
                <strong>{evolucao.Nome_Servico}</strong> - {evolucao.Data}
              </div>
              <Button variant="info" size="sm" onClick={() => handleShowEvolucao(evolucao)}>
                Detalhes
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card>

      <Modal show={!!selectedEvolucao} onHide={() => setSelectedEvolucao(null)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Detalhes da Avaliação</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedEvolucao && (
            <div>
              <p>
                <strong>Serviço:</strong> {selectedEvolucao.Nome_Servico}
              </p>
              <p>
                <strong>Profissional:</strong> {selectedEvolucao.Profissional}
              </p>
              <p>
                <strong>Data:</strong> {selectedEvolucao.Data}
              </p>
              <p>
                <strong>Avaliação:</strong> {selectedEvolucao.Avaliacao}
              </p>
              <p>
                <strong>Observações:</strong> {selectedEvolucao.Observacoes || "Nenhuma"}
              </p>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default EvolucaoPaciente;
