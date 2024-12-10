import React, { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Form, Container, Button, Row, Col, Alert, Table } from "react-bootstrap";
import styles from "./RegistrarPresenca.module.css";

function RegistrarPresenca() {
  const { show } = useOutletContext();
  const navigate = useNavigate();

  const agendamentosMock = [
    {
      id: 1,
      paciente: "João Silva",
      horario: "10:00",
      data: "2024-12-11",
      status: "Agendado",
    },
    {
      id: 2,
      paciente: "Maria Oliveira",
      horario: "14:30",
      data: "2024-12-10",
      status: "Agendado",
    },
    {
      id: 3,
      paciente: "Carlos Eduardo",
      horario: "09:00",
      data: "2024-12-09",
      status: "Agendado",
    },
  ];

  const [dataConsulta, setDataConsulta] = useState("");
  const [agendamentos, setAgendamentos] = useState([]);
  const [selectedAgendamento, setSelectedAgendamento] = useState(null);
  const [currentAction, setCurrentAction] = useState(""); // Action: presence, absence, cancel
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

  const buscarAgendamentos = (data) => {
    const resultado = agendamentosMock.filter((a) => a.data === data);
    if (resultado.length === 0) {
      setAlertMessage("Nenhum paciente encontrado");
      setShowAlert(true);
    } else {
      setAgendamentos(resultado);
      setShowAlert(false);
    }
  };

  const salvarPresenca = () => {
    setAgendamentos((prev) =>
      prev.map((a) =>
        a.id === selectedAgendamento.id
          ? { ...a, status: "Concluída", observacoes: observacoesPresenca }
          : a
      )
    );
    setAlertMessage("Presença registrada com sucesso");
    setShowAlert(true);
    setSelectedAgendamento(null);
    setCurrentAction("");
    setObservacoesPresenca("");
  };

  const salvarAusencia = () => {
    if (!motivoAusencia) {
      setAlertMessage("Motivo deve ser informado para registrar ausência");
      setShowAlert(true);
      return;
    }
    setAgendamentos((prev) =>
      prev.map((a) =>
        a.id === selectedAgendamento.id
          ? { ...a, status: "Ausente", motivoAusencia }
          : a
      )
    );
    setAlertMessage("Ausência registrada com sucesso");
    setShowAlert(true);

    const desejaReagendar = window.confirm("Deseja reagendar a consulta?");
    if (desejaReagendar) {
      navigate(`/agendamento?paciente=${selectedAgendamento.paciente}`);
    }
    setSelectedAgendamento(null);
    setCurrentAction("");
    setMotivoAusencia("");
  };

  const cancelarConsulta = () => {
    if (!motivoCancelamento) {
      setAlertMessage("Motivo deve ser informado para cancelar a consulta");
      setShowAlert(true);
      return;
    }
    setAgendamentos((prev) =>
      prev.map((a) =>
        a.id === selectedAgendamento.id
          ? { ...a, status: "Cancelada", motivoCancelamento }
          : a
      )
    );
    setAlertMessage("Consulta cancelada com sucesso");
    setShowAlert(true);
    setSelectedAgendamento(null);
    setCurrentAction("");
    setMotivoCancelamento("");
  };

  const isFutureDate = (date) => {
    const today = new Date();
    const consultaDate = new Date(date);
    return consultaDate > today;
  };

  return (
    <Container
      className={`${styles.registrarPresencaContainer} ${
        show ? styles.registrarPresencaContainerActive : ""
      }`}
    >
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
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Paciente</th>
            <th>Horário</th>
            <th>Data</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {agendamentos.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center">
                Nenhuma consulta encontrada.
              </td>
            </tr>
          ) : (
            agendamentos.map((agendamento) => (
              <tr key={agendamento.id}>
                <td>{agendamento.id}</td>
                <td>{agendamento.paciente}</td>
                <td>{agendamento.horario}</td>
                <td>{agendamento.data}</td>
                <td>{agendamento.status}</td>
                <td>
                  {isFutureDate(agendamento.data) ? (
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
                        className="me-2"
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
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      {selectedAgendamento && currentAction === "presence" && (
        <div className="mt-4">
          <h3>Registrar Presença</h3>
          <p>
            <strong>Paciente:</strong> {selectedAgendamento.paciente}
          </p>
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
          <p>
            <strong>Paciente:</strong> {selectedAgendamento.paciente}
          </p>
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
          <p>
            <strong>Paciente:</strong> {selectedAgendamento.paciente}
          </p>
          <Form.Group>
            <Form.Label>Motivo do Cancelamento</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={motivoCancelamento}
              onChange={(e) => setMotivoCancelamento(e.target.value)}
            />
          </Form.Group>
          <Button variant="danger" className="mt-3" onClick={cancelarConsulta}>
            Confirmar Cancelamento
          </Button>
        </div>
      )}
    </Container>
  );
}

export default RegistrarPresenca;
