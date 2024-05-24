import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Link, useOutletContext } from "react-router-dom";
import { Container, Card, Alert } from "react-bootstrap";
import { FaRegSave, FaArrowLeft, FaCheckCircle } from "react-icons/fa";
import { useState } from "react";
import "./Servicos.css";

function ServicosNovo() {
  const { show } = useOutletContext();

  const [showMensagem, setShowMensagem] = useState(false);
  const [validated, setValidated] = useState(false);
  const [descricao, setDescricao] = useState("");
  const [dataCadastro, setDataCadastro] = useState("");
  const [nomeServico, setNomeServico] = useState("");
  const [status, setStatus] = useState("Ativo");
  const [profissional, setProfissional] = useState("");
  const [errors, setErrors] = useState({});

  const handleDescricaoChange = (e) => {
    const value = e.target.value;
    setDescricao(value);
    if (value && value.length <= 100) {
      setErrors((prev) => ({ ...prev, descricao: null }));
    } else {
      if (value === "") {
        setErrors((prev) => ({
          ...prev,
          descricao: "O campo descrição é obrigatório",
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          descricao: "A descrição deve ter no máximo 100 caracteres",
        }));
      }
    }
  };

  const handleDataCadastroChange = (e) => {
    const value = e.target.value;
    setDataCadastro(value);
    if (value && new Date(value) <= new Date()) {
      setErrors((prev) => ({ ...prev, dataCadastro: null }));
    } else {
      if (value === "") {
        setErrors((prev) => ({
          ...prev,
          dataCadastro: "A data de cadastro é obrigatória",
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          dataCadastro: "Não é permitido uma data de cadastro futura",
        }));
      }
    }
  };

  const handleNomeServicoChange = (e) => {
    const value = e.target.value;
    setNomeServico(value);
    if (value && value.length <= 100) {
      setErrors((prev) => ({ ...prev, nomeServico: null }));
    } else {
      if (value === "") {
        setErrors((prev) => ({
          ...prev,
          nomeServico: "O campo nome do serviço é obrigatório",
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          nomeServico: "O nome do serviço deve ter no máximo 100 caracteres",
        }));
      }
    }
  };

  const handleProfissionalChange = (e) => {
    const value = e.target.value;
    setProfissional(value);
    if (value && value.length <= 100) {
      setErrors((prev) => ({ ...prev, profissional: null }));
    } else {
      if (value === "") {
        setErrors((prev) => ({
          ...prev,
          profissional: "O campo profissional responsável é obrigatório",
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          profissional: "O nome do profissional deve ter no máximo 100 caracteres",
        }));
      }
    }
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  function validarForm(event) {
    event.preventDefault();
    const form = event.currentTarget;
    let newErrors = {};

    if (form.checkValidity() === false) {
      event.stopPropagation();
    }

    if (!descricao) {
      newErrors.descricao = "O campo descrição é obrigatório";
    } else if (descricao.length > 100) {
      newErrors.descricao = "A descrição deve ter no máximo 100 caracteres";
    }

    if (!dataCadastro) {
      newErrors.dataCadastro = "A data de cadastro é obrigatória";
    } else if (new Date(dataCadastro) > new Date()) {
      newErrors.dataCadastro = "Não é permitido uma data de cadastro futura";
    }

    if (!nomeServico) {
      newErrors.nomeServico = "O campo nome do serviço é obrigatório";
    } else if (nomeServico.length > 100) {
      newErrors.nomeServico = "O nome do serviço deve ter no máximo 100 caracteres";
    }

    if (!profissional) {
      newErrors.profissional = "O campo profissional responsável é obrigatório";
    } else if (profissional.length > 100) {
      newErrors.profissional = "O nome do profissional deve ter no máximo 100 caracteres";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      const servico = {
        id: 0,
        nome: nomeServico,
        descricao: descricao,
        dataCadastro: dataCadastro,
        status: status,
        profissional: profissional,
      };

      const listaSalva = localStorage.getItem("servicos");
      const servicos = listaSalva == null ? [] : JSON.parse(listaSalva);
      servico.id = servicos.length + 1;
      servicos.push(servico);
      localStorage.setItem("servicos", JSON.stringify(servicos));

      setShowMensagem(true);
    }

    setValidated(true);
  }

  return (
    <>
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
                    id="nomeServico"
                    required
                    value={nomeServico}
                    onChange={handleNomeServicoChange}
                    isInvalid={!!errors.nomeServico}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.nomeServico}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} controlId="status">
                  <Form.Label className="fw-bold">Status</Form.Label>
                  <Form.Select
                    id="status"
                    required
                    value={status}
                    onChange={handleStatusChange}
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
                  id="descricao"
                  required
                  value={descricao}
                  onChange={handleDescricaoChange}
                  isInvalid={!!errors.descricao}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.descricao}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="profissional">
                <Form.Label className="fw-bold">Profissional Responsável</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Profissional"
                  id="profissional"
                  required
                  value={profissional}
                  onChange={handleProfissionalChange}
                  isInvalid={!!errors.profissional}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.profissional}
                </Form.Control.Feedback>
              </Form.Group>

              <Row>
              <Form.Group as={Col} controlId="dataCadastro">
                <Form.Label className="fw-bold">Data Cadastro</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Data Cadastro"
                  id="dataCadastro"
                  required
                  value={dataCadastro}
                  onChange={handleDataCadastroChange}
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
    </>
  );
}

export default ServicosNovo;
