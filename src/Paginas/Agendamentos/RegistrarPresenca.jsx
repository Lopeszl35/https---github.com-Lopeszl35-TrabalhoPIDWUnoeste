import React, { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Form, Container, Button, Row, Col, Alert, Table } from "react-bootstrap";
import RegistrarPresensaService from "../../services/RegistrarPresencaService";
import styles from "./RegistrarPresenca.module.css";
const registrarPresencaService = new RegistrarPresensaService();

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
    console.log("Data atual:", dataAtual);
    setDataConsulta(dataAtual);
    buscarAgendamentos(dataAtual);
  }, []);
  const buscarAgendamentos = async (data) => {
    try {
      const resultado = await registrarPresencaService.buscarAgendamentoPorData(data);
      console.log("Agendamentos encontrados:", resultado);
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
      console.error("Erro ao buscar agendamentos:", error.message);
      setAlertMessage("Erro ao buscar agendamentos Erro: " + error.message);
      setShowAlert(true);
      setAgendamentos([]);
    }
  };
  

  const salvarPresenca = async () => {
    try {
      const presenca = await registrarPresencaService.registrarPresenca(selectedAgendamento.ID_Agendamento, observacoesPresenca);
      console.log("Presença registrada:", presenca);
      setAlertMessage("Presença registrada com sucesso");
      setShowAlert(true);
      await buscarAgendamentos(dataConsulta);
    } catch (error) {
      console.error("Erro ao registrar presença:", error);
      setAlertMessage("Erro ao registrar presença Erro: " + error.message);
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
      await registrarPresencaService.registrarAusencia(selectedAgendamento.ID_Agendamento, motivoAusencia);
      setAlertMessage("Ausência registrada com sucesso");
      setShowAlert(true);
      await buscarAgendamentos(dataConsulta);
      /*const desejaReagendar = window.confirm("Deseja reagendar a consulta?");
      if (desejaReagendar) {
        navigate(`/agendamento?paciente=${selectedAgendamento.paciente}`);
      }*/
    } catch (error) {
      console.error("Erro ao registrar ausência:", error);
      setAlertMessage("Erro ao registrar ausência Erro: " + error.message);
      setShowAlert(true);
    }
  };

  const cancelarConsulta = () => {
    if (!motivoCancelamento) {
      setAlertMessage("Motivo deve ser informado para cancelar a consulta");
      setShowAlert(true);
      return;
    }
    try {
      registrarPresencaService.cancelarAgendamento(selectedAgendamento.ID_Agendamento, motivoCancelamento);
      setAlertMessage("Consulta cancelada com sucesso");
      setShowAlert(true);
      buscarAgendamentos(dataConsulta);
    } catch (error) {
      console.error("Erro ao cancelar consulta:", error);
      setAlertMessage("Erro ao cancelar consulta Erro: " + error.message);
      setShowAlert(true);
      buscarAgendamentos(dataConsulta);
    }
  };

  const isFutureDate = (date) => {
    // Converta a string da data em um objeto Date no fuso horário local
    const consultaDate = new Date(`${date}T00:00:00`);
    const today = new Date();
  
    // Define as horas para 0 para comparar apenas a data
    consultaDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
  
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
            <th>Observação</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {agendamentos.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center text-danger">
                Nenhuma consulta encontrada.
              </td>
            </tr>
          ) : (
            agendamentos.map((agendamento) => (
              <tr key={agendamento.id}>
                <td>{agendamento.ID_Agendamento}</td>
                <td>{agendamento.Paciente}</td>
                <td>{agendamento.Hora}</td>
                <td>{agendamento.Data}</td>
                <td>{agendamento.Status}</td>
                <td>{agendamento.Observacoes}</td>
                <td>
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
