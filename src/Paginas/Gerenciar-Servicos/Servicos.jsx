import { useEffect, useState } from "react";
import "./Servicos.css";
import { Container, Table, Button, Row, Col, Form, Modal, Card } from "react-bootstrap";
import { FaListAlt, FaPlus, FaSearch, FaEdit, FaTrashAlt, FaRegSave, FaUserPlus } from "react-icons/fa";
import { Link, useOutletContext } from "react-router-dom";
import ServicosService from "../../services/servicosService";

const servicosService = new ServicosService();

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
  const [pacientes] = useState([
    { id: 1, nome: "Paciente 1" },
    { id: 2, nome: "Paciente 2" },
    { id: 3, nome: "Paciente 3" },
  ]);

  const listarServicos = async () => {
    try {
      const dados = await servicosService.obterTodos();
      const servicosComNomes = await Promise.all(dados.map(async servico => {
        try {
          const nomeProfissional = await servicosService.obterNomeProfissionalPorId(servico.Profissional_Responsavel);
          return { ...servico, Nome_Profissional: nomeProfissional };
        } catch (error) {
          console.error(`Erro ao obter o nome do profissional para o serviço ${servico.ID_Servico}:`, error);
          return { ...servico, Nome_Profissional: 'Erro ao obter nome' };
        }
      }));
      setListaServicos(servicosComNomes);
      setServicosFiltrados(servicosComNomes);
    } catch (error) {
      console.error("Erro ao obter serviços:", error);
    }
  };

  useEffect(() => {
    listarServicos();
  }, []);

  const abrirModalEdicao = async (id) => {
    try {
      const servico = await servicosService.obterPorId(id);
      const nomeProfissional = await servicosService.obterNomeProfissionalPorId(servico.Profissional_Responsavel);
      setServicoEditando({ ...servico, Profissional_Responsavel: nomeProfissional });
      setShowEditarModal(true);
    } catch (error) {
      console.error('Erro ao obter serviço para edição:', error);
    }
  };

  const abrirModalAtribuir = (id) => {
    const servico = listaServicos.find((s) => s.ID_Servico === id);
    setServicoEditando({ ...servico });
    setShowAtribuirModal(true);
  };

  const handleExcluir = async (id) => {
    try {
      await servicosService.excluir(id);
      listarServicos();
      alert("Serviço excluído com sucesso!");
      setShowConfirmDeleteModal(false);
    } catch (error) {
      console.error("Erro ao excluir serviço:", error);
    }
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
          return servico.Nome_Servico.toLowerCase().includes(busca.toLowerCase());
        } else if (filtro === "3") {
          return servico.Nome_Profissional.toLowerCase().includes(busca.toLowerCase());
        } else if (filtro === "4") {
          return servico.Status.toLowerCase() === "ativo";
        } else if (filtro === "5") {
          return servico.Status.toLowerCase() === "inativo";
        } else {
          return true;
        }
      });
    }
    setServicosFiltrados(resultados);
  };

  const handleSalvarEdicao = async () => {
    if (validarEdicao()) {
      try {
        await servicosService.atualizar(servicoEditando.ID_Servico, servicoEditando);
        listarServicos();
        setShowEditarModal(false);
        setServicoEditando(null);
        setErrors({});
      } catch (error) {
        if (error.message === 'Profissional não encontrado') {
          setErrors((prev) => ({ ...prev, profissional: 'Profissional não encontrado' }));
        } else {
          console.error('Erro ao atualizar o serviço:', error);
        }
      }
    }
  };

  const handleAtribuirServico = () => {
    if (pacienteSelecionado) {
      alert(`Serviço ${servicoEditando.Nome_Servico} atribuído ao paciente ${pacienteSelecionado}.`);
      setShowAtribuirModal(false);
      setPacienteSelecionado("");
    } else {
      alert("Selecione um paciente.");
    }
  };

  const handleDescricaoChange = (e) => {
    const value = e.target.value;
    setServicoEditando({ ...servicoEditando, Descricao: value });
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
    setServicoEditando({ ...servicoEditando, Profissional_Responsavel: value });
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
    const { Descricao, Profissional_Responsavel } = servicoEditando;
    let newErrors = {};

    if (!Descricao || Descricao.length > 100) {
      newErrors.descricao = "A descrição deve ter no máximo 100 caracteres";
      isValid = false;
    }

    if (!Profissional_Responsavel) {
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
                <tr key={servico.ID_Servico}>
                  <td>{servico.ID_Servico}</td>
                  <td>{servico.Nome_Servico}</td>
                  <td>{servico.Descricao}</td>
                  <td>{servico.Status}</td>
                  <td>{servico.Nome_Profissional}</td>
                  <td className="d-flex flex-row">
                    <Button onClick={() => abrirModalEdicao(servico.ID_Servico)}
                      className="btn btn-primary m-1 w-100 custom-button"
                    >
                      <FaEdit /> Editar
                    </Button>
                    <Button
                      className="btn btn-danger m-1 w-100 custom-button"
                      onClick={() => abrirModalConfirmacao(servico.ID_Servico)}
                    >
                      <FaTrashAlt /> Excluir
                    </Button>
                    <Button
                      className="btn btn-info m-1 w-100 custom-button"
                      onClick={() => abrirModalAtribuir(servico.ID_Servico)}
                    >
                      <FaUserPlus /> Atribuir paciente
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
                value={servicoEditando?.Nome_Servico || ""}
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
                value={servicoEditando?.Descricao || ""}
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
                value={servicoEditando?.Status || ""}
                onChange={(e) => setServicoEditando({ ...servicoEditando, Status: e.target.value })}
              >
                <option value="Ativo">Ativo</option>
                <option value="Inativo">Inativo</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formProfissional">
              <Form.Label>Profissional Responsável</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nome do profissional"
                value={servicoEditando?.Profissional_Responsavel || ""}
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