import { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useOutletContext } from "react-router-dom";
import PacientesService from "../../services/pacientesService";
import ServicosService from "../../services/servicosService";
import ProfissionaisService from "../../services/profissionaisService";
import AgendamentoService from "../../services/agendamentoService";
import './AgendaConsultas.css';

const pacientesService = new PacientesService();
const servicosService = new ServicosService();
const profissionaisService = new ProfissionaisService();
const agendamentoService = new AgendamentoService();

function AgendarConsultas() {
  const { show } = useOutletContext();

  const initialFormState = {
    paciente: "",
    servico: "",
    profissional: "",
    dataHora: "",
    observacoes: "",
  };

  // State hooks para armazenar dados
  const [formState, setFormState] = useState(initialFormState);
  const [pacientes, setPacientes] = useState([]);
  const [servicos, setServicos] = useState([]);
  const [profissionais, setProfissionais] = useState([]);
  const [selectedPaciente, setSelectedPaciente] = useState("");
  const [detalhesPaciente, setDetalhesPaciente] = useState(null);
  const [selectedServico, setSelectedServico] = useState("");
  const [selectedProfissional, setSelectedProfissional] = useState("");
  const [dataHora, setDataHora] = useState("");
  const [observacoes, setObservacoes] = useState("");
  const [errors, setErrors] = useState({});

  // Obtém todos os pacientes ao carregar o componente
  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        const dados = await pacientesService.obterTodos();
        if (dados) {
          setPacientes(dados);
        }
      } catch (error) {
        console.error("Erro ao obter pacientes:", error);
      }
    };

    fetchPacientes();
  }, []);

  // Obtém todos os serviços ao carregar o componente
  useEffect(() => {
    const fetchServicos = async () => {
      try {
        const dados = await servicosService.obterTodos();
        if (dados) {
          setServicos(dados);
        }
      } catch (error) {
        console.error("Erro ao obter serviços:", error);
      }
    };

    fetchServicos();
  }, []);

  // Obtém os profissionais com base no serviço selecionado
  useEffect(() => {
    if (selectedServico) {
      console.log("Servico selecionado:", selectedServico);
      const fetchProfissionais = async () => {
        try {
          const dados = await profissionaisService.obterPorServico(selectedServico);
          if (dados) {
            setProfissionais(dados);
          }
        } catch (error) {
          console.error("Erro ao obter profissionais:", error);
        }
      };

      fetchProfissionais();
    } else {
      setProfissionais([]); // Reseta os profissionais se nenhum serviço estiver selecionado
    }
  }, [selectedServico]);

  // Busca os detalhes do paciente ao selecionar um paciente
  useEffect(() => {
    if (selectedPaciente) {
      const fetchDetalhesPaciente = async () => {
        try {
          const dados = await pacientesService.obterPorId(selectedPaciente);
          if (dados) {
            setDetalhesPaciente(dados);
          }
        } catch (error) {
          console.error("Erro ao obter detalhes do paciente:", error);
        }
      };

      fetchDetalhesPaciente();
    } else {
      setDetalhesPaciente(null);
    }
  }, [selectedPaciente]);

  // Função para lidar com o envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validação simples
    const newErrors = {};
    if (!selectedPaciente) newErrors.paciente = "Por favor, selecione um paciente.";
    if (!selectedServico) newErrors.servico = "Por favor, selecione um serviço.";
    if (!selectedProfissional) newErrors.profissional = "Por favor, selecione um profissional.";
    if (!dataHora) newErrors.dataHora = "Por favor, selecione uma data e hora.";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Implementar a lógica de envio dos dados de agendamento ao backend
      const agendamento = {
        prontuario: selectedPaciente,
        idProfissional: selectedProfissional,
        idServico: selectedServico,
        dataHora: dataHora,
        status: "Pendente",
        observacoes: observacoes,
      };
      try {
        await agendamentoService.criarAgendamento(agendamento);
        alert("Agendamento criado com sucesso!");

      } catch (error) {
        console.error("Erro ao criar agendamento:", error);
        alert("Erro ao criar agendamento. Por favor, tente novamente mais tarde.");
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
                {Array.isArray(pacientes) && pacientes.map((paciente) => (
                  <option key={paciente.Prontuario} value={paciente.Prontuario}>
                    {paciente.Nome_Completo}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.paciente}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        {detalhesPaciente && (
          <Row className="mb-3">
            <Col md={6}>
              <h5>Informações do Paciente</h5>
              <p><strong>Nome:</strong> {detalhesPaciente.Nome_Completo}</p>
              <p><strong>Data de Nascimento:</strong> {new Date(detalhesPaciente.Data_Nascimento).toLocaleDateString()}</p>
              <p><strong>Cartão SUS:</strong> {detalhesPaciente.Cartao_SUS}</p>
              <p><strong>Período Escolar:</strong> {detalhesPaciente.Periodo_Escolar}</p>
              <p><strong>Telefone da Mãe:</strong> {detalhesPaciente.Telefone_Mae}</p>
              <p><strong>Telefone do Pai:</strong> {detalhesPaciente.Telefone_Pai}</p>
            </Col>
          </Row>
        )}

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
                {Array.isArray(servicos) && servicos.map((servico) => (
                  <option key={servico.ID_Servico} value={servico.ID_Servico}>
                    {servico.Nome_Servico}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.servico}
              </Form.Control.Feedback>
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
                {Array.isArray(profissionais) && profissionais.map((profissional) => (
                  <option key={profissional.ID_Profissional} value={profissional.ID_Profissional}>
                    {profissional.Nome_Completo}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.profissional}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="formDataHora">
              <Form.Label>Data e Hora da Consulta</Form.Label>
              <Form.Control
                type="datetime-local"
                value={dataHora}
                onChange={(e) => setDataHora(e.target.value)}
                isInvalid={!!errors.dataHora}
              />
              <Form.Control.Feedback type="invalid">
                {errors.dataHora}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

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

        <Button variant="primary" type="submit">
          Agendar Consulta
        </Button>
      </Form>
    </Container>
  );
}

export default AgendarConsultas;
