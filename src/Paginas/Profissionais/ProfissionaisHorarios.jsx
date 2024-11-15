import { useOutletContext, useParams } from "react-router-dom";
import { Container, Form, Button, Row, Col, Accordion } from "react-bootstrap";
import { useState, useEffect } from "react";
import ProfissionaisService from "../../services/profissionaisService";
import { TbClockHour5 } from "react-icons/tb";
import "./ProfissionaisHorarios.css";

const profissionaisService = new ProfissionaisService();

function ProfissionaisHorarios() {
  const { show } = useOutletContext();
  const { idProfissional } = useParams();
  const [profissional, setProfissional] = useState(null);
  const [horarios, setHorarios] = useState([]);
  const [form, setForm] = useState({
    data: "",
    horario: "",
  });

  useEffect(() => {
    async function fetchProfissional() {
      try {
        const profissionalData = await profissionaisService.obterPorId(idProfissional);
        setProfissional(profissionalData);
        console.log(profissionalData);

        // Simulando horários cadastrados para o profissional
        const horariosCadastrados = [
          { data: "2024-01-01", horario: "10:00" },
          { data: "2024-01-01", horario: "11:00" },
          { data: "2024-01-02", horario: "14:00" },
        ];

        setHorarios(horariosCadastrados);
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

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (form.data && form.horario) {
      const novoHorario = {
        data: form.data,
        horario: form.horario,
      };
      console.log("Novo horário cadastrado:", novoHorario);
      setHorarios((prevHorarios) => [...prevHorarios, novoHorario]);
      setForm({ data: "", horario: "" });
    } else {
      alert("Por favor, preencha todos os campos obrigatórios.");
    }
  };

  const handleExcluirHorario = (data, horario) => {
    setHorarios((prevHorarios) =>
      prevHorarios.filter(
        (item) => !(item.data === data && item.horario === horario)
      )
    );
  };

  const horariosAgrupados = horarios.reduce((acc, horario) => {
    if (!acc[horario.data]) {
      acc[horario.data] = [];
    }
    acc[horario.data].push(horario.horario);
    return acc;
  }, {});

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
                  <Form.Label>Hora</Form.Label>
                  <Form.Control
                    type="time"
                    name="horario"
                    value={form.horario}
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
                onClick={() => setForm({ data: "", horario: "" })}
              >
                Cancelar
              </Button>
            </div>
          </Form>
        </Container>

        <Container className="mt-5 container-horarios-cadastrados">
          <h2>Horários Cadastrados</h2>
          <Accordion>
            {Object.entries(horariosAgrupados).map(([data, horarios], index) => (
              <Accordion.Item eventKey={index} key={index}>
                <Accordion.Header><strong className="text-primary">{data}</strong></Accordion.Header>
                <Accordion.Body>
                  {horarios.map((horario, i) => (
                    <div
                      key={i}
                      className="d-flex justify-content-between align-items-center mb-2 p-2 border rounded"
                    >
                      <span><strong className="text-secondary">{horario}</strong></span>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleExcluirHorario(data, horario)}
                      >
                        Excluir
                      </Button>
                    </div>
                  ))}
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </Container>
      </section>
    </main>
  );
}

export default ProfissionaisHorarios;
