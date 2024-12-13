import { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import { useOutletContext } from "react-router-dom";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import PacientesService from "../../services/pacientesService";
import ServicosService from "../../services/servicosService";
import ProfissionaisService from "../../services/profissionaisService";
import ProfissionaisServicoService from "../../services/profissionaisServicoService";
import AgendamentoService from "../../services/agendamentoService";
import "./AgendaConsultas.css";
import { FaCheckCircle } from "react-icons/fa";

const pacientesService = new PacientesService();
const servicosService = new ServicosService();
const profissionaisServicoService = new ProfissionaisServicoService();
const profissionaisService = new ProfissionaisService();
const agendamentoService = new AgendamentoService();

const localizer = momentLocalizer(moment);

function AgendarConsultas() {
  const { show } = useOutletContext();

  const [pacientes, setPacientes] = useState([]);
  const [servicos, setServicos] = useState([]);
  const [profissionais, setProfissionais] = useState([]);
  const [horarios, setHorarios] = useState([]);
  const [idHorarioProfissional, setIdHorarioProfissional] = useState(null);
  const [selectedPaciente, setSelectedPaciente] = useState("");
  const [selectedServico, setSelectedServico] = useState("");
  const [selectedProfissional, setSelectedProfissional] =useState("");
  const [observacoes, setObservacoes] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const fetchHorarios = async () => {
    setLoading(true);
    try {
      const horariosOriginais = await profissionaisService.obterHorariosProfissional(selectedProfissional);

      const horariosFormatados = horariosOriginais.map((item) => {
        const date = item.Data.split("T")[0];
        const startDate = moment(`${date}T${item.HorarioInicio}`).toDate();
        const endDate = moment(`${date}T${item.HorarioTermino}`).toDate();

        return {
          title: item.Disponivel ? "Disponível" : "Indisponível",
          start: startDate,
          end: endDate,
          disponivel: item.Disponivel,
          idHorarioProfissional: item.ID_Horario,
        };
      });

      setHorarios(horariosFormatados);
    } catch (error) {
      console.error("Erro ao obter horários:", error);
      setErrors({ profissional: error.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchPacientes = async () => {
      setLoading(true);
      try {
        const dados = await pacientesService.obterTodos();
        setPacientes(dados || []);
      } catch (error) {
        console.error("Erro ao obter pacientes:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPacientes();
  }, []);

  useEffect(() => {
    const fetchServicos = async () => {
      setLoading(true);
      try {
        const dados = await servicosService.obterTodos();
        setServicos(dados || []);
      } catch (error) {
        console.error("Erro ao obter serviços:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchServicos();
  }, []);

  useEffect(() => {
    if (selectedServico) {
      const fetchProfissionais = async () => {
        setLoading(true);
        try {
          const dados = await profissionaisServicoService.obterProfissionaisPorServico(selectedServico);
          setProfissionais(dados || []);
        } catch (error) {
          console.error("Erro ao obter profissionais:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchProfissionais();
    } else {
      setProfissionais([]);
    }
  }, [selectedServico]);

  useEffect(() => {
    if (selectedProfissional) {
      fetchHorarios(); // Chama fetchHorarios quando o profissional é alterado
    }
  }, [selectedProfissional]);

  const eventStyleGetter = (event) => {
    const style = {
      backgroundColor: event.disponivel
        ? event === selectedEvent
          ? "blue"
          : "green"
        : "red",
      color: "white",
      borderRadius: "5px",
      border: "solid 1px black",
    };
    return { style };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!selectedPaciente) newErrors.paciente = "Por favor, selecione um paciente.";
    if (!selectedServico) newErrors.servico = "Por favor, selecione um serviço.";
    if (!selectedProfissional) newErrors.profissional = "Por favor, selecione um profissional.";
    if (!selectedEvent || !selectedEvent.disponivel) newErrors.event = "Por favor, selecione um horário disponível.";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const agendamento = {
        prontuario: selectedPaciente,
        idProfissional: selectedProfissional,
        idServico: selectedServico,
        dataHora: moment(selectedEvent.start).format(),
        status: "Pendente",
        observacoes,
        idHorarioProfissional: selectedEvent.idHorarioProfissional,
      };

      try {
        setLoading(true);
        await agendamentoService.criarAgendamento(agendamento);
        console.log("Agendamento criado:", agendamento);
        setSuccessMessage("Agendamento criado com sucesso!");

        // Reseta os campos
        setSelectedPaciente("");
        setSelectedServico("");
        setSelectedProfissional("");
        setObservacoes("");
        setSelectedEvent(null);

        // Atualiza os horários
        if (selectedProfissional) {
          await fetchHorarios();
        }
      } catch (error) {
        console.error("Erro ao criar agendamento:", error);
        alert("Erro ao criar agendamento: " + error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Container className={`agendamento-container ${show ? "agendamento-container-active" : ""}`}>
      <h1>Agendamento de Consultas</h1>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="formPaciente">
              <Form.Label>Paciente</Form.Label>
              <Form.Select
                value={selectedPaciente}
                onChange={(e) => setSelectedPaciente(e.target.value)}
                isInvalid={!!errors.paciente}
              >
                <option value="">Selecione o paciente</option>
                {pacientes.map((paciente) => (
                  <option key={paciente.Prontuario} value={paciente.Prontuario}>
                    {paciente.Nome_Completo}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">{errors.paciente}</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="formServico">
              <Form.Label>Serviço</Form.Label>
              <Form.Select
                value={selectedServico}
                onChange={(e) => setSelectedServico(e.target.value)}
                isInvalid={!!errors.servico}
              >
                <option value="">Selecione o serviço</option>
                {servicos.map((servico) => (
                  <option key={servico.ID_Servico} value={servico.ID_Servico}>
                    {servico.Nome_Servico}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">{errors.servico}</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="formProfissional">
              <Form.Label>Profissional</Form.Label>
              <Form.Select
                value={selectedProfissional}
                onChange={(e) => setSelectedProfissional(e.target.value)}
                isInvalid={!!errors.profissional}
                disabled={!selectedServico}
              >
                <option value="">Selecione o profissional</option>
                {profissionais.map((profissional) => (
                  <option key={profissional.ID_Profissional} value={profissional.ID_Profissional}>
                    {profissional.Nome_Profissional}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">{errors.profissional}</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <div className="mb-4">
          <h3>Horários Disponíveis</h3>
          {loading ? (
            <Spinner animation="border" variant="primary" />
          ) : (
            <Calendar
              localizer={localizer}
              events={horarios}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 500, width: 700 }}
              selectable
              onSelectEvent={(event) => {
                if (!event.disponivel) {
                  alert("Data indisponível. Por favor, escolha outra data.");
                } else {
                  setSelectedEvent(event);
                  setIdHorarioProfissional(event.idHorarioProfissional);
                }
              }}
              eventPropGetter={eventStyleGetter}
            />
          )}
          {errors.event && <div className="text-danger mt-2">{errors.event}</div>}
        </div>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="formObservacoes">
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

        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? "Aguarde..." : "Confirmar Agendamento"}
        </Button>

        {successMessage && (
          <Alert variant="success" className="mt-3">
            <FaCheckCircle className="me-2" /> {successMessage}
          </Alert>
        )}
      </Form>
    </Container>
  );
}

export default AgendarConsultas;
