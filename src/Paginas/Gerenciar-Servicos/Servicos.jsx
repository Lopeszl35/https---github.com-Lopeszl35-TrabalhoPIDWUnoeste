import { useEffect, useState } from "react";
import "./Servicos.css";
import {
  Container,
  Card,
  Button,
  Row,
  Col,
  Form,
  Table,
  Modal,
} from "react-bootstrap";
import {
  FaListAlt,
  FaPlus,
  FaSearch,
  FaEdit,
  FaTrashAlt,
  FaRegSave,
  FaUserPlus
} from "react-icons/fa";
import { Link, useOutletContext } from "react-router-dom";

function Servicos() {
  const { show } = useOutletContext();
  const [listaServicos, setListaServicos] = useState([]);
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
  const [servicoToDelete, setServicoToDelete] = useState(null);
  const [busca, setBusca] = useState("");
  const [filtro, setFiltro] = useState("1");
  const [servicosFiltrados, setServicosFiltrados] = useState([]);
  const [servicoEditando, setServicoEditando] = useState(null);
  const [showEditarModal, setShowEditarModal] = useState(false);
  const [showAtribuirModal, setShowAtribuirModal] = useState(false);
  const [errors, setErrors] = useState({});
  const [pacienteSelecionado, setPacienteSelecionado] = useState("");
  const [pacientes, setPacientes] = useState([
    { id: 1, nome: "Paciente 1" },
    { id: 2, nome: "Paciente 2" },
    { id: 3, nome: "Paciente 3" },
  ]);

  useEffect(() => {
    const listaSalva = localStorage.getItem("servicos");
    if (listaSalva !== null) {
      setListaServicos(JSON.parse(listaSalva));
      setServicosFiltrados(JSON.parse(listaSalva));
    }
  }, []);

  const abrirModalEdicao = (id) => {
    const servico = listaServicos.find((s) => s.id === id);
    setServicoEditando({ ...servico });
    setShowEditarModal(true);
  };

  const abrirModalAtribuir = (id) => {
    const servico = listaServicos.find((s) => s.id === id);
    setServicoEditando({ ...servico });
    setShowAtribuirModal(true);
  };

  const handleExcluir = (id) => {
    const novaLista = listaServicos.filter((item) => item.id !== id);
    setListaServicos(novaLista);
    setServicosFiltrados(novaLista);
    localStorage.setItem("servicos", JSON.stringify(novaLista));
    alert("Serviço excluído com sucesso!");
    setShowConfirmDeleteModal(false);
  };

  const abrirModalConfirmacao = (id) => {
    setServicoToDelete(id);
    setShowConfirmDeleteModal(true);
  };

  const fecharModalConfirmacao = () => {
    setShowConfirmDeleteModal(false);
    setServicoToDelete(null);
  };

  const handleBuscar = () => {
    let resultados = listaServicos;
    if (busca !== "") {
      resultados = resultados.filter((servico) => {
        if (filtro === "2") {
          return servico.nome.toLowerCase().includes(busca.toLowerCase());
        } else if (filtro === "3") {
          return servico.profissional.toLowerCase().includes(busca.toLowerCase());
        } else if (filtro === "4") {
          return servico.status.toLowerCase() === "ativo";
        } else if (filtro === "5") {
          return servico.status.toLowerCase() === "inativo";
        } else {
          return true;
        }
      });
    }
    setServicosFiltrados(resultados);
  };

  const handleSalvarEdicao = () => {
    if (validarEdicao()) {
      const novaLista = listaServicos.map((servico) =>
        servico.id === servicoEditando.id ? { ...servicoEditando } : servico
      );

      setListaServicos(novaLista);
      localStorage.setItem("servicos", JSON.stringify(novaLista));

      setShowEditarModal(false);
      setServicoEditando(null);
      setErrors({});
    }
  };

  const handleAtribuirServico = () => {
    if (pacienteSelecionado) {
      alert(`Serviço ${servicoEditando.nome} atribuído ao paciente ${pacienteSelecionado}.`);
      setShowAtribuirModal(false);
      setPacienteSelecionado("");
    } else {
      alert("Selecione um paciente.");
    }
  };

  const handleDescricaoChange = (e) => {
    const value = e.target.value;
    setServicoEditando({ ...servicoEditando, descricao: value });
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

  const handleProfissionalChange = (e) => {
    const value = e.target.value;
    setServicoEditando({ ...servicoEditando, profissional: value });
    if (value) {
      setErrors((prev) => ({ ...prev, profissional: null }));
    } else {
      setErrors((prev) => ({
        ...prev,
        profissional: "O campo profissional responsável é obrigatório",
      }));
    }
  };

  const validarEdicao = () => {
    let isValid = true;
    const { descricao, profissional } = servicoEditando;
    let newErrors = {};

    if (!descricao || descricao.length > 100) {
      newErrors.descricao = "A descrição deve ter no máximo 100 caracteres";
      isValid = false;
    }

    if (!profissional) {
      newErrors.profissional = "O campo profissional responsável é obrigatório";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  return (
    <div className={`container-servicos ${show ? "container-servicos-side-active" : ""}`}>
      <h1>
        <FaListAlt /> Serviços
      </h1>
      <Container>
        <Card.Body className="mt-2 card-servicos">
          <Row>
            <Col lg="2">
              <Button as={Link} to="/servicos/cadastro" variant="primary">
                <FaPlus /> Adicionar
              </Button>
            </Col>
            <Col lg="6">
              <Form>
                <Form.Group className="mb-3 d-flex">
                  <Form.Select
                    className="me-2"
                    aria-label="Filtro"
                    value={filtro}
                    onChange={(e) => setFiltro(e.target.value)}
                  >
                    <option value="1">Filtro</option>
                    <option value="2">Nome</option>
                    <option value="3">Profissional Responsável</option>
                    <option value="4">Ativo</option>
                    <option value="5">Inativo</option>
                  </Form.Select>
                  <Form.Control
                    type="text"
                    id="busca"
                    placeholder="Buscar"
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                  />
                </Form.Group>
              </Form>
            </Col>
            <Col lg="2">
              <Button variant="secondary" onClick={handleBuscar}>
                <FaSearch /> Pesquisar
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Container>
      <Container>
        <h2>Serviços Cadastrados</h2>
        <Table striped bordered hover className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Status</th>
              <th>Profissional Responsável</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {servicosFiltrados.length <= 0 ? (
              <tr>
                <td colSpan={6}>Nenhum serviço encontrado</td>
              </tr>
            ) : (
              servicosFiltrados.map((servico) => (
                <tr key={servico.id}>
                  <td>{servico.id}</td>
                  <td>{servico.nome}</td>
                  <td>{servico.descricao}</td>
                  <td>{servico.status}</td>
                  <td>{servico.profissional}</td>
                  <td className="d-flex flex-row">
                    <Button onClick={() => abrirModalEdicao(servico.id)}
                      className="btn btn-primary m-1 w-100"
                    >
                      <FaEdit /> Editar
                    </Button>
                    <Button
                      className="btn btn-danger m-1 w-100"
                      onClick={() => abrirModalConfirmacao(servico.id)}
                    >
                      <FaTrashAlt /> Excluir
                    </Button>
                    <Button
                      className="btn btn-info m-1 w-100"
                      onClick={() => abrirModalAtribuir(servico.id)}
                    >
                      <FaUserPlus /> Atribuir a Paciente
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </Container>

      <Modal show={showConfirmDeleteModal} onHide={fecharModalConfirmacao}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmação de Exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>Tem certeza que deseja excluir este serviço?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={fecharModalConfirmacao}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={() => handleExcluir(servicoToDelete)}>
            Excluir
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showEditarModal} onHide={() => setShowEditarModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Editar Serviço</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formNome">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nome do serviço"
                value={servicoEditando?.nome || ""}
                disabled
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDescricao">
              <Form.Label>Descrição</Form.Label>
              <Form.Control
                required
                as="textarea"
                rows={3}
                placeholder="Descrição do serviço"
                value={servicoEditando?.descricao || ""}
                isInvalid={errors.descricao}
                onChange={handleDescricaoChange}
              />
              <Form.Control.Feedback type="invalid">
                {errors.descricao}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formStatus">
              <Form.Label>Status</Form.Label>
              <Form.Select
                value={servicoEditando?.status || ""}
                onChange={(e) => setServicoEditando({ ...servicoEditando, status: e.target.value })}
              >
                <option value="ativo">Ativo</option>
                <option value="inativo">Inativo</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formProfissional">
              <Form.Label>Profissional Responsável</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nome do profissional"
                value={servicoEditando?.profissional || ""}
                isInvalid={errors.profissional}
                onChange={handleProfissionalChange}
              />
              <Form.Control.Feedback type="invalid">
                {errors.profissional}
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditarModal(false)}>
            Cancelar
          </Button>
          <Button variant="success" onClick={handleSalvarEdicao}>
            <FaRegSave /> Salvar Alterações
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showAtribuirModal} onHide={() => setShowAtribuirModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Atribuir Serviço a Paciente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formPaciente">
              <Form.Label>Selecione o Paciente</Form.Label>
              <Form.Select
                value={pacienteSelecionado}
                onChange={(e) => setPacienteSelecionado(e.target.value)}
              >
                <option value="">Selecione um paciente</option>
                {pacientes.map((paciente) => (
                  <option key={paciente.id} value={paciente.nome}>
                    {paciente.nome}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAtribuirModal(false)}>
            Cancelar
          </Button>
          <Button variant="success" onClick={handleAtribuirServico}>
            <FaRegSave /> Atribuir Serviço
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Servicos;
