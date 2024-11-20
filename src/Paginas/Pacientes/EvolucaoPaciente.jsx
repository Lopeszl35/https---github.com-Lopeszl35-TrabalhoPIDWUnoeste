import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Form, Button, Container, Row, Col, Card, ListGroup, Modal, Alert } from "react-bootstrap";
import PacientesService from "../../services/pacientesService";
import AgendamentoService from "../../services/agendamentoService";

const pacientesService = new PacientesService();
const agendamentoService = new AgendamentoService();

function EvolucaoPaciente() {
  const { show } = useOutletContext();
  const [pacientes, setPacientes] = useState([]);
  const [filteredPacientes, setFilteredPacientes] = useState([]);
  const [selectedPaciente, setSelectedPaciente] = useState(null);
  const [searchFields, setSearchFields] = useState({
    Nome_Completo: "",
    Prontuario: "",
    CPF: "",
    RG: "",
    Email: "",
  });
  const [agendamentos, setAgendamentos] = useState([]);
  const [evolucoes, setEvolucoes] = useState([]);
  const [selectedAgendamento, setSelectedAgendamento] = useState(null);
  const [avaliacao, setAvaliacao] = useState("");
  const [observacoes, setObservacoes] = useState("");
  const [selectedEvolucao, setSelectedEvolucao] = useState(null);
  const [noAgendamentos, setNoAgendamentos] = useState(false);

  // Atualiza o campo de busca conforme o usuário digita
  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchFields((prev) => ({ ...prev, [name]: value }));
  };

  // Função para buscar pacientes diretamente do banco de dados
  const handleSearchPaciente = async () => {
    try {
      const searchTerm = Object.values(searchFields).find(value => value.trim() !== "");
      const searchType = Object.keys(searchFields).find(key => searchFields[key].trim() !== "");

      if (!searchTerm || !searchType) {
        alert("Por favor, preencha um dos campos de busca.");
        return;
      }

      const pacientes = await pacientesService.buscarPaciente(searchTerm, searchType);
      setPacientes(pacientes);
      setFilteredPacientes(pacientes);
      
    } catch (error) {
      console.error("Erro ao buscar pacientes: ", error);
      alert("Erro ao buscar pacientes: " + error.message);
    }
  };

  // Busca os agendamentos do paciente selecionado para a data atual
  const handleSearchAgendamentos = async (prontuario) => {
      try {
        if (!prontuario) {
          alert("Por favor, selecione um paciente.");
          return;
        }
        const dataAtual = new Date().toISOString().split('T')[0];
        const agendamentos = await agendamentoService.buscarAgendamentosPorData(prontuario, dataAtual);
        setAgendamentos(agendamentos);
        setNoAgendamentos(agendamentos.length === 0);
        console.log("Agendamentos encontrados:", agendamentos);
      } catch (error) {
          console.error("Erro ao buscar agendamentos: ", error);
          alert("Erro ao buscar agendamentos: " + error.message);
      }
  }
const handleSearchAvaliacoes = async (prontuario) => {
    try {
      if (!prontuario) {
        alert("Por favor, selecione um paciente.");
        return;
      }
      const evolucoes = await pacientesService.buscarEvolucaoPaciente(prontuario);
      setEvolucoes(evolucoes);
      console.log("Evolucoes encontradas:", evolucoes);
    } catch (error) {
        console.error("Erro ao buscar evolucoes: ", error);
        alert("Erro ao buscar evolucoes: " + error.message);
    }
}
  

  // Seleciona um paciente da lista de resultados
  const handleSelectPaciente = (paciente) => {
    setSelectedPaciente(paciente);
    setSearchFields({
      Nome_Completo: paciente.Nome_Completo,
      Prontuario: paciente.Prontuario.toString(),
      CPF: paciente.CPF,
      RG: paciente.RG,
      Email: paciente.Email,
    });

    handleSearchAgendamentos(paciente.Prontuario);
    handleSearchAvaliacoes(paciente.Prontuario);
  };

  // Salva a evolução
  const handleSaveEvolucao = async () => {
    if (selectedAgendamento && avaliacao) {
        const agendamentoSelecionado = agendamentos.find((a) => a.ID_Agendamento === parseInt(selectedAgendamento));

    if (!agendamentoSelecionado) {
      alert("Agendamento selecionado não encontrado.");
      return;
    }

    const novaEvolucao = {
        Prontuario: selectedPaciente.Prontuario,
        ID_Servico: agendamentoSelecionado.ID_Servico,
        ID_Profissional: agendamentoSelecionado.ID_Profissional,
        Data_Servico: new Date().toISOString().split("T")[0],
        Avaliacao: avaliacao,
        Observacoes: observacoes,
    };
      try {
        await pacientesService.salvarEvolucao(novaEvolucao);
        setEvolucoes([novaEvolucao, ...evolucoes]);
        setAvaliacao("");
        setObservacoes("");
        alert("Evolução salva com sucesso!");
      } catch (error) {
        console.error("Erro ao salvar evolução: ", error);
        alert("Erro ao salvar evolução: " + error.message);
      }
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

      {/* Campos de busca */}
      <Row className="mb-4">
        {["Nome_Completo", "Prontuario", "CPF", "RG", "Email"].map((field) => (
          <Col md={4} key={field}>
            <Form.Group controlId={`search-${field}`}>
              <Form.Label>{field.replace("_", " ")}</Form.Label>
              <Form.Control
                type="text"
                name={field}
                placeholder={`Digite ${field.replace("_", " ").toLowerCase()}`}
                value={searchFields[field]}
                onChange={handleSearchChange}
              />
            </Form.Group>
          </Col>
        ))}
        <Col md={4} className="d-flex align-items-center mt-2">
          <Button variant="primary" onClick={handleSearchPaciente}>
            Buscar Paciente
          </Button>
        </Col>
      </Row>

      {/* Lista de resultados */}
      {filteredPacientes.length > 0 && (
        <Card className="mb-4">
          <Card.Header>Pacientes Encontrados</Card.Header>
          <ListGroup variant="flush">
            {filteredPacientes.map((paciente) => (
              <ListGroup.Item
                key={paciente.Prontuario}
                action
                onClick={() => handleSelectPaciente(paciente)}
              >
                {paciente.Nome_Completo} - Prontuário: {paciente.Prontuario}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card>
      )}

      {/* Informações do paciente selecionado */}
      {selectedPaciente && (
        <Card className="mb-4">
          <Card.Header>Informações do Paciente Selecionado</Card.Header>
          <Card.Body>
            <Row>
              <Col md={4}>
                <Card.Text><strong>Nome:</strong> {selectedPaciente.Nome_Completo}</Card.Text>
              </Col>
              <Col md={4}>
                <Card.Text><strong>Prontuário:</strong> {selectedPaciente.Prontuario}</Card.Text>
              </Col>
              <Col md={4}>
                <Card.Text><strong>CPF:</strong> {selectedPaciente.CPF}</Card.Text>
              </Col>
              <Col md={4}>
                <Card.Text><strong>RG:</strong> {selectedPaciente.RG}</Card.Text>
              </Col>
              <Col md={4}>
                <Card.Text><strong>Email:</strong> {selectedPaciente.Email}</Card.Text>
              </Col>
              <Col md={4}>
                <Card.Text><strong>Nome Mãe:</strong> {selectedPaciente.Nome_Mae}</Card.Text>
              </Col>
            </Row>

            <Row>
              <Col md={4}>
                <Card.Text><strong>Data Nascimente</strong> {selectedPaciente.Data_De_Nascimento.split("T")[0]}</Card.Text>
             </Col>
             <Col md={4}>
                <Card.Text><strong>Cidade:</strong> {selectedPaciente.Cidade}</Card.Text>
            </Col>
            </Row>

          </Card.Body>
        </Card>
      )}

      {/* Formulário de evolução */}
      <Form>
        {selectedPaciente && (
          <>
            <Row>
              <Col md={6}>
              <Form.Group controlId="agendamentoSelect">
                <Form.Label>Agendamentos</Form.Label>
                {noAgendamentos ? (
                    <Alert variant="warning">Paciente não possui consultas para esta data.</Alert>
                ) : (
                    <>
                    <Form.Select
                        value={selectedAgendamento || ""}
                        onChange={(e) => setSelectedAgendamento(e.target.value)}
                    >
                        <option value="">Selecione um agendamento</option>
                        {agendamentos.map((agendamento) => (
                        <option key={agendamento.ID_Agendamento} value={agendamento.ID_Agendamento}>
                            {`${agendamento.Servico} - ${agendamento.Profissional} (${agendamento.Data_Hora.split("T")[0]})`}
                        </option>
                        ))}
                    </Form.Select>

                    {/* Mostrar detalhes do agendamento selecionado */}
                    {selectedAgendamento && (
                    <Card className="mt-3">
                        <Card.Header>Detalhes do Agendamento</Card.Header>
                        <Card.Body>
                        <Row>
                            <Col md={10}>
                            {(() => {
                                const agendamentoSelecionado = agendamentos.find(
                                (agendamento) => agendamento.ID_Agendamento === parseInt(selectedAgendamento)
                                );
                                return (
                                <Card.Text>
                                    <strong>Observações do Agendamento:</strong>{" "}
                                    {agendamentoSelecionado ? agendamentoSelecionado.Observacoes || "Nenhuma" : "Nenhuma"}
                                </Card.Text>
                                );
                            })()}
                            </Col>
                        </Row>
                        </Card.Body>
                    </Card>
                    )}
                    </>
                )}
                </Form.Group>

              </Col>
            </Row>
            <Row className="mt-4">
              <Col>
                <Form.Group controlId="avaliacao">
                  <Form.Label>Avaliação</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={avaliacao}
                    onChange={(e) => setAvaliacao(e.target.value)}
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
                  />
                </Form.Group>
              </Col>
            </Row>
            <Button className="mt-4" variant="primary" onClick={handleSaveEvolucao}>
              Salvar Evolução
            </Button>
          </>
        )}
      </Form>

      {/* Últimas avaliações */}
      <h2 className="my-4">Últimas Avaliações</h2>
      <Card>
        <ListGroup variant="flush">
          {evolucoes.length > 0 ? (
            evolucoes.map((evolucao) => (
              <ListGroup.Item key={evolucao.ID_Evolucao} className="d-flex justify-content-between align-items-center">
                <div>
                  <strong>{evolucao.Servico}</strong> - {evolucao.Data_Servico.split("T")[0]}
                </div>
                <Button variant="info" size="sm" onClick={() => handleShowEvolucao(evolucao)}>
                  Detalhes
                </Button>
              </ListGroup.Item>
            ))
          ) : (
            <ListGroup.Item>Nenhuma avaliação anterior encontrada.</ListGroup.Item>
          )}
        </ListGroup>
      </Card>

      {/* Modal de detalhes */}
      <Modal show={!!selectedEvolucao} onHide={() => setSelectedEvolucao(null)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Detalhes da Avaliação</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedEvolucao ? (
            <div>
              <p><strong>Serviço:</strong> {selectedEvolucao.Servico}</p>
              <p><strong>Profissional:</strong> {selectedEvolucao.Profissional}</p>
              <p><strong>Data:</strong> {selectedEvolucao.Data_Servico.split("T")[0]}</p>
              <p><strong>Avaliação:</strong> {selectedEvolucao.Avaliacao}</p>
              <p><strong>Observações:</strong> {selectedEvolucao.Observacoes || "Nenhuma"}</p>
            </div>
          ) : (
            <p>Nenhuma avaliação anterior encontrada.</p>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default EvolucaoPaciente;
