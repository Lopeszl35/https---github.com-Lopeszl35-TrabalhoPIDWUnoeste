import { useOutletContext, useParams } from "react-router-dom";
import { Container, Form, Button, Row, Col, Alert } from "react-bootstrap";
import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import ProfissionaisService from "../../services/profissionaisService";
import { TbClockHour5 } from "react-icons/tb";
import "./ProfissionaisHorarios.css";
import { FaCheckCircle } from "react-icons/fa";

const profissionaisService = new ProfissionaisService();

function ProfissionaisHorarios() {
  const { show } = useOutletContext();
  const { idProfissional } = useParams();
  const [erros, setErros] = useState({});
  const [showMensagem, setShowMensagem] = useState(false);
  const [profissional, setProfissional] = useState(null);
  const [horarios, setHorarios] = useState([]);
  const [form, setForm] = useState({
    data: "",
    horarioInicial: "",
    horarioFinal: "",
  });

  // Função reutilizável para buscar horários do profissional
  const fetchHorarios = async () => {
    try {
      const horariosCadastrados = await profissionaisService.obterHorariosProfissional(idProfissional);
      const eventosFormatados = horariosCadastrados.map((item) => ({
        title: item.Disponivel ? "Horário Disponível" : "Horário Agendado",
        start: `${item.Data.split("T")[0]}T${item.HorarioInicio}`,
        end: `${item.Data.split("T")[0]}T${item.HorarioTermino}`,
        color: item.Disponivel ? "green" : "red",
      }));
      setHorarios(eventosFormatados);
    } catch (error) {
      console.error("Erro ao carregar horários:", error);
    }
  };

  // Carregar dados do profissional e horários ao montar o componente
  useEffect(() => {
    async function fetchProfissional() {
      try {
        const profissionalData = await profissionaisService.obterPorId(idProfissional);
        setProfissional(profissionalData);
        await fetchHorarios();
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    }
    fetchProfissional();
  }, [idProfissional]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (form.data && form.horarioInicial && form.horarioFinal) {
      try {
        const novoHorario = { data: form.data, horaInicio: form.horarioInicial, horaFim: form.horarioFinal };
        await profissionaisService.cadastrarHorarioProfissional(idProfissional, novoHorario);

        // Atualizar os horários cadastrados
        await fetchHorarios();

        // Limpar o formulário e exibir mensagem de sucesso
        setForm({ data: "", horarioInicial: "", horarioFinal: "" });
        setShowMensagem(true);
      } catch (error) {
        setErros({ form: error.message });
        console.error("Erro ao cadastrar horário:", error);
      }
    } else {
      alert("Por favor, preencha todos os campos obrigatórios.");
    }
  };

  return (
    <main className={`container-profissionais ${show ? "container-profissionais-active" : ""}`}>
      <header>
        <h1 className="titulo-principal">
          <TbClockHour5 /> Cadastro de horários disponíveis para o profissional
          <strong className="text-primary"> {profissional?.Nome_Completo} </strong>
        </h1>
      </header>
      <section>
        <Container className="mt-4 container-form-horarios">
          <h2>Cadastrar Horários</h2>
          <Form onSubmit={handleFormSubmit}>
            <Row>
              <Col md={4}>
                <Form.Group controlId="formData">
                  <Form.Label>Data</Form.Label>
                  <Form.Control
                    type="date"
                    name="data"
                    value={form.data}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group controlId="formHorario">
                  <Form.Label>Hora inicial do atendimento</Form.Label>
                  <Form.Control
                    type="time"
                    name="horarioInicial"
                    value={form.horarioInicial}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group controlId="formHorario">
                  <Form.Label>Hora final do atendimento</Form.Label>
                  <Form.Control
                    type="time"
                    name="horarioFinal"
                    value={form.horarioFinal}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <div className="mt-4 d-flex gap-2 justify-content-end">
              <Button type="submit" variant="success">
                Salvar Horário
              </Button>
              <Button
                type="reset"
                variant="secondary"
                onClick={() => setForm({ data: "", horarioInicial: "", horarioFinal: "" })}
              >
                Cancelar
              </Button>
            </div>
            <Alert show={showMensagem} variant="success" className="mt-3" onClose={() => setShowMensagem(false)} dismissible>
              <Alert.Heading>
                <FaCheckCircle className="me-2" /> Horário cadastrado com sucesso
              </Alert.Heading>
            </Alert>
            {erros.form && <p className="erros text-danger mt-3">{erros.form}</p>}
          </Form>
        </Container>

        <Container className="mt-5 container-horarios-cadastrados">
          <h2>Horários Cadastrados</h2>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={horarios}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek",
            }}
            locale="pt-br"
            height="auto"
          />
        </Container>
      </section>
    </main>
  );
}

export default ProfissionaisHorarios;
