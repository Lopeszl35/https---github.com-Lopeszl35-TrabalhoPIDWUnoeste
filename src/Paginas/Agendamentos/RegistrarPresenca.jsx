import React, { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Form, Container, Button, Row, Col, Alert, Accordion, Card } from "react-bootstrap";
import RegistrarPresensaService from "../../services/RegistrarPresencaService";
import styles from "./RegistrarPresenca.module.css";

const registrarPresensaService = new RegistrarPresensaService();

function RegistrarPresenca() {
  const { show } = useOutletContext();
  const navigate = useNavigate();

  const [dataConsulta, setDataConsulta] = useState("");
  const [agendamentos, setAgendamentos] = useState([]);
  const [selectedAgendamento, setSelectedAgendamento] = useState(null);
  const [currentAction, setCurrentAction] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [motivoAusencia, setMotivoAusencia] = useState("");
  const [motivoCancelamento, setMotivoCancelamento] = useState("");
  const [observacoesPresenca, setObservacoesPresenca] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const dataAtual = new Date().toISOString().split("T")[0];
    setDataConsulta(dataAtual);
    buscarAgendamentos(dataAtual);
  }, []);

  const buscarAgendamentos = async (data) => {
    try {
      const resultado = await registrarPresensaService.buscarAgendamentoPorData(data);
      if (!Array.isArray(resultado)) {
        throw new Error("Resposta inválida do servidor");
      }
      if (resultado.length === 0) {
        setAgendamentos([]);
        setAlertMessage("Nenhum paciente encontrado");
        setShowAlert(true);
      } else {
        setAgendamentos(resultado);
        setShowAlert(false);
      }
    } catch (error) {
      setAlertMessage("Erro ao buscar agendamentos: " + error.message);
      setShowAlert(true);
      setAgendamentos([]);
    }
  };

  const salvarPresenca = async () => {
    try {
      await registrarPresensaService.registrarPresenca(selectedAgendamento.ID_Agendamento, observacoesPresenca);
      setAlertMessage("Presença registrada com sucesso");
      setShowAlert(true);
      setSelectedAgendamento(null);
      setCurrentAction("");
      await buscarAgendamentos(dataConsulta);
    } catch (error) {
      setAlertMessage("Erro ao registrar presença: " + error.message);
      setShowAlert(true);
    }
  };

  const salvarAusencia = async () => {
    if (!motivoAusencia) {
      setAlertMessage("Motivo deve ser informado para registrar ausência");
      setShowAlert(true);
      return;
    }
    try {
      await registrarPresensaService.registrarAusencia(selectedAgendamento.ID_Agendamento, motivoAusencia);
      setAlertMessage("Ausência registrada com sucesso");
      setShowAlert(true);
      setSelectedAgendamento(null);
      setCurrentAction("");
      await buscarAgendamentos(dataConsulta);
    } catch (error) {
      setAlertMessage("Erro ao registrar ausência: " + error.message);
      setShowAlert(true);
    }
  };

  const cancelarConsulta = async () => {
    if (!motivoCancelamento) {
      setAlertMessage("Motivo deve ser informado para cancelar a consulta");
      setShowAlert(true);
      return;
    }
    try {
      await registrarPresensaService.cancelarAgendamento(selectedAgendamento.ID_Agendamento, motivoCancelamento);
      setAlertMessage("Consulta cancelada com sucesso");
      setShowAlert(true);
      setSelectedAgendamento(null);
      setCurrentAction("");
      await buscarAgendamentos(dataConsulta);
    } catch (error) {
      setAlertMessage("Erro ao cancelar consulta: " + error.message);
      setShowAlert(true);
    }
  };

  const isFutureDate = (date) => {
    const consultaDate = new Date(`${date}T00:00:00`);
    const today = new Date();
    consultaDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    return consultaDate > today;
  };

  return (
    <Container className={`${styles.registrarPresencaContainer} ${show ? styles.registrarPresencaContainerActive : ""}`}>
      <h1 className="text-center">Registrar Presença</h1>
      {showAlert && <Alert variant="warning">{alertMessage}</Alert>}

      <Form>
        <Row>
          <Col md={4}>
            <Form.Group controlId="dataConsulta">
              <Form.Label>Data da Consulta</Form.Label>
              <Form.Control
                type="date"
                value={dataConsulta}
                onChange={(e) => {
                  setDataConsulta(e.target.value);
                  buscarAgendamentos(e.target.value);
                }}
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>

      <h2 className="mt-4">Consultas</h2>
      <Accordion>
        {agendamentos.length === 0 ? (
          <Alert variant="danger">Nenhuma consulta encontrada.</Alert>
        ) : (
          agendamentos.map((agendamento, index) => (
            <Accordion.Item eventKey={index} key={agendamento.ID_Agendamento}>
              <Accordion.Header>
                {agendamento.Paciente} - {agendamento.Data} às {agendamento.Hora}
              </Accordion.Header>
              <Accordion.Body>
                <p><strong>Serviço:</strong> {agendamento.Nome_Servico}</p>
                <p><strong>Profissional:</strong> {agendamento.Profissional}</p>
                <p><strong>Status:</strong> {agendamento.Status}</p>
                <p><strong>Observações:</strong> {agendamento.Observacoes}</p>
                <div className="d-flex gap-2">
                  {isFutureDate(agendamento.Data) ? (
                    <Button
                      variant="danger"
                      onClick={() => {
                        setSelectedAgendamento(agendamento);
                        setCurrentAction("cancel");
                      }}
                    >
                      Cancelar Consulta
                    </Button>
                  ) : (
                    <>
                      <Button
                        variant="success"
                        onClick={() => {
                          setSelectedAgendamento(agendamento);
                          setCurrentAction("presence");
                        }}
                      >
                        Registrar Presença
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => {
                          setSelectedAgendamento(agendamento);
                          setCurrentAction("absence");
                        }}
                      >
                        Registrar Ausência
                      </Button>
                    </>
                  )}
                </div>
              </Accordion.Body>
            </Accordion.Item>
          ))
        )}
      </Accordion>

      {selectedAgendamento && currentAction === "presence" && (
        <div className="mt-4">
          <h3>Registrar Presença</h3>
          <Form.Group>
            <Form.Label>Observações</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={observacoesPresenca}
              onChange={(e) => setObservacoesPresenca(e.target.value)}
            />
          </Form.Group>
          <Button variant="success" className="mt-3" onClick={salvarPresenca}>
            Confirmar Presença
          </Button>
        </div>
      )}

      {selectedAgendamento && currentAction === "absence" && (
        <div className="mt-4">
          <h3>Registrar Ausência</h3>
          <Form.Group>
            <Form.Label>Motivo da Ausência</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={motivoAusencia}
              onChange={(e) => setMotivoAusencia(e.target.value)}
            />
          </Form.Group>
          <Button variant="danger" className="mt-3" onClick={salvarAusencia}>
            Confirmar Ausência
          </Button>
        </div>
      )}

      {selectedAgendamento && currentAction === "cancel" && (
        <div className="mt-4">
          <h3>Cancelar Consulta</h3>
          <Form.Group>
            <Form.Label>Motivo do Cancelamento</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={motivoCancelamento}
              onChange={(e) => setMotivoCancelamento(e.target.value)}
            />
          </Form.Group>
          <Button variant="secondary" className="mt-3" onClick={cancelarConsulta}>
            Confirmar Cancelamento
          </Button>
        </div>
      )}
    </Container>
  );
}

export default RegistrarPresenca;
