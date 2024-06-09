import { useEffect, useState } from "react";
import "./Servicos.css";
import { Container, Table, Button, Row, Col, Form, Card } from "react-bootstrap";
import { FaListAlt, FaPlus, FaSearch, FaEdit, FaTrashAlt, FaUserPlus } from "react-icons/fa";
import { Link, useOutletContext } from "react-router-dom";
import ServicosService from "../../services/servicosService";
import ModalConfirmDelete from "./ModalConfirmDelete";
import ModalEditarServico from "./ModalEditarServico";
import ModalAtribuirServico from "./ModalAtribuirServico";

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
      console.error('Erro ao obter servico para edição:', error);
    }
  };

  const abrirModalAtribuir = (id) => {
    const servico = listaServicos.find((s) => s.ID_Servico === id);
    setServicoEditando({ ...servico });
    setShowAtribuirModal(true);
  };

  const handleExcluir = async (id) => {
    await servicosService.excluir(id);
    listarServicos();
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

  const handleBuscar = async () => {
    try {
        let resultados;
        if (busca !== "") {
            if (filtro === '2') {
                resultados = await servicosService.filtrar('nome', busca);
            } else if (filtro === '3') {
                resultados = await servicosService.filtrar('profissional', busca);
            } else if (filtro === '4') {
                resultados = await servicosService.filtrar('status', 'ativo');
            } else if (filtro === '5') {
                resultados = await servicosService.filtrar('status', 'inativo');
            } else {
                resultados = await servicosService.obterTodos();
            }

            const servicosComNomes = await Promise.all(resultados.map(async servico => {
                try {
                    const nomeProfissional = await servicosService.obterNomeProfissionalPorId(servico.Profissional_Responsavel);
                    return { ...servico, Nome_Profissional: nomeProfissional };
                } catch (error) {
                    console.error(`Erro ao obter o nome do profissional para o serviço ${servico.ID_Servico}:`, error);
                    return { ...servico, Nome_Profissional: 'Erro ao obter nome' };
                }
            }));

            setServicosFiltrados(servicosComNomes);
        } else {
            listarServicos();
        }
    } catch (error) {
        console.error("Erro ao filtrar os serviços:", error);
    }
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
    <main className={`container-servicos ${show ? "container-servicos-side-active" : ""}`}>
      <header>
        <h1>
          <FaListAlt /> Serviços
        </h1>
      </header>
      <section>
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
                        className="btn btn-primary m-1 w-100 "
                      >
                        <FaEdit /> 
                      </Button>
                      <Button
                        className="btn btn-danger m-1 w-100 "
                        onClick={() => abrirModalConfirmacao(servico.ID_Servico)}
                      >
                        <FaTrashAlt /> 
                      </Button>
                      <Button
                        className="btn btn-info m-1 w-100 "
                        onClick={() => abrirModalAtribuir(servico.ID_Servico)}
                      >
                        <FaUserPlus />
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </Container>
      </section>

      <ModalConfirmDelete
        show={showConfirmDeleteModal}
        fecharModalConfirmacao={fecharModalConfirmacao}
        handleExcluir={handleExcluir}
        servicoToDelete={servicoToDelete}
      />

      <ModalEditarServico
        show={showEditarModal}
        setShowEditarModal={setShowEditarModal}
        handleSalvarEdicao={handleSalvarEdicao}
        servicoEditando={servicoEditando}
        setServicoEditando={setServicoEditando}
        handleDescricaoChange={handleDescricaoChange}
        handleProfissionalChange={handleProfissionalChange}
        errors={errors}
      />

      <ModalAtribuirServico
        show={showAtribuirModal}
        setShowAtribuirModal={setShowAtribuirModal}
        handleAtribuirServico={handleAtribuirServico}
        servicoEditando={servicoEditando}
        pacientes={pacientes}
        pacienteSelecionado={pacienteSelecionado}
        setPacienteSelecionado={setPacienteSelecionado}
      />
    </main>
  );
}

export default Servicos;
