import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Link, useOutletContext } from "react-router-dom";
import { Container, Card, Alert } from "react-bootstrap";
import { FaRegSave, FaArrowLeft, FaCheckCircle } from "react-icons/fa";
import { useState } from "react";
import "./Servicos.css";
import ServicosService from "../../services/servicosService";

const servicosService = new ServicosService();

function ServicosNovo() {
  const { show } = useOutletContext();

  const initialFormState = {
    descricao: "",
    dataCadastro: "",
    nomeServico: "",
    status: "Ativo",
  };

  const [showMensagem, setShowMensagem] = useState(false);
  const [validated, setValidated] = useState(false);
  const [formState, setFormState] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const validarForm = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    let newErrors = {};

    if (form.checkValidity() === false) {
      event.stopPropagation();
    }

    if (!formState.descricao) {
      newErrors.descricao = "O campo descrição é obrigatório";
    } else if (formState.descricao.length > 150) {
      newErrors.descricao = "A descrição deve ter no máximo 150 caracteres";
    }

    if (!formState.dataCadastro) {
      newErrors.dataCadastro = "A data de cadastro é obrigatória";
    } else if (new Date(formState.dataCadastro) > new Date()) {
      newErrors.dataCadastro = "Não é permitido uma data de cadastro futura";
    }

    if (!formState.nomeServico) {
      newErrors.nomeServico = "O campo nome do serviço é obrigatório";
    } else if (formState.nomeServico.length > 100) {
      newErrors.nomeServico = "O nome do serviço deve ter no máximo 100 caracteres";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      const novoServico = {
        Nome_Servico: formState.nomeServico,
        Descricao: formState.descricao,
        Data_De_Cadastro: formState.dataCadastro,
        Status: formState.status,
      };

      try {
        await servicosService.adicionar(novoServico);
        setShowMensagem(true);
        setFormState(initialFormState); 
      } catch (error) {
        console.error('Erro ao adicionar o Serviço:', error);
        setErrors({ erro: 'Erro ao adicionar o Serviço. Por favor, tente novamente mais tarde.' });
      }
    }

    setValidated(true);
  };

  return (
    <Container>
      <Card className={`container-add-servico ${show ? "side-active-add-servico" : ""}`}>
        <Card.Header>
          <h3>Adicionar Serviço</h3>
        </Card.Header>
        <Card.Body>
          <Form noValidate validated={validated} onSubmit={validarForm}>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="nomeServico">
                <Form.Label className="fw-bold">Nome do Serviço</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Serviço"
                  name="nomeServico"
                  required
                  value={formState.nomeServico}
                  onChange={handleInputChange}
                  isInvalid={!!errors.nomeServico}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.nomeServico}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} controlId="status">
                <Form.Label className="fw-bold">Status</Form.Label>
                <Form.Select
                  name="status"
                  required
                  value={formState.status}
                  onChange={handleInputChange}
                  isInvalid={!!errors.status}
                >
                  <option value="Ativo">Ativo</option>
                  <option value="Inativo">Inativo</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.status}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="descricao">
              <Form.Label className="fw-bold">Descrição</Form.Label>
              <Form.Control
                type="text"
                placeholder="Descrição"
                name="descricao"
                required
                value={formState.descricao}
                onChange={handleInputChange}
                isInvalid={!!errors.descricao}
              />
              <Form.Control.Feedback type="invalid">
                {errors.descricao}
              </Form.Control.Feedback>
            </Form.Group>

            <Row>
              <Form.Group as={Col} controlId="dataCadastro">
                <Form.Label className="fw-bold">Data Cadastro</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Data Cadastro"
                  name="dataCadastro"
                  required
                  value={formState.dataCadastro}
                  onChange={handleInputChange}
                  isInvalid={!!errors.dataCadastro}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.dataCadastro}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <div className="d-flex justify-content-end mt-3">
              <Link to={"/servicos"}>
                <Button variant="secondary" className="me-2">
                  <FaArrowLeft className="me-2" />
                  Voltar
                </Button>
              </Link>
              <Button variant="success" type="submit">
                <FaRegSave className="me-2" />
                Salvar
              </Button>
            </div>
          </Form>
        </Card.Body>
        <Alert
          show={showMensagem}
          variant="success"
          className="mt-3"
          dismissible
          onClose={() => setShowMensagem(false)}
        >
          <Alert.Heading>
            <FaCheckCircle className="me-2" />
            Serviço salvo com sucesso!
          </Alert.Heading>
        </Alert>
      </Card>
    </Container>
  );
}

export default ServicosNovo;
