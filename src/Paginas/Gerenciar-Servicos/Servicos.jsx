import { useEffect, useState } from "react";
import { Accordion, Container, Button, Row, Col, Form, Card } from "react-bootstrap";
import { FaListAlt, FaPlus, FaEdit, FaTrashAlt, FaEye } from "react-icons/fa";
import { Link, useOutletContext } from "react-router-dom";
import ServicosService from "../../services/servicosService";
import ModalConfirmDelete from "./ModalConfirmDelete";
import ModalEditarServico from "./ModalEditarServico";
import moment from "moment";

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
  const [errors, setErrors] = useState({});

  const listarServicos = async () => {
    try {
      const dados = await servicosService.obterTodos();
      setListaServicos(dados);
      setServicosFiltrados(dados);
    } catch (error) {
      console.error("Erro ao obter serviços:", error);
    }
  };

  useEffect(() => {
    listarServicos();
  }, []);

  useEffect(() => {
    filtrarServicos();
  }, [busca, filtro]);

  const filtrarServicos = () => {
    let resultados = [...listaServicos];

    if (filtro === '4') {
      resultados = resultados.filter(servico => 
        servico.Status.toLowerCase() === 'ativo'
      );
    } else if (filtro === '5') {
      resultados = resultados.filter(servico => 
        servico.Status.toLowerCase() === 'inativo'
      );
    } else if (busca) {
      if (filtro === '2') {
        resultados = resultados.filter(servico => 
          servico.Nome_Servico.toLowerCase().includes(busca.toLowerCase())
        );
      }
    }
    setServicosFiltrados(resultados);
  };

  const abrirModalEdicao = async (id) => {
    try {
      const servico = await servicosService.obterPorId(id);
      setServicoEditando({ ...servico });
      setShowEditarModal(true);
    } catch (error) {
      console.error('Erro ao obter servico para edição:', error);
    }
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

  const handleSalvarEdicao = async () => {
    if (validarEdicao()) {
      try {
        await servicosService.atualizar(servicoEditando.ID_Servico, servicoEditando);
        listarServicos();
        setShowEditarModal(false);
        setServicoEditando(null);
        setErrors({});
      } catch (error) {
          console.error('Erro ao atualizar o serviço:', error);
      }
    }
  };

  const validarEdicao = () => {
    let isValid = true;
    const { Descricao } = servicoEditando;
    let newErrors = {};

    if (!Descricao || Descricao.length > 150) {
      newErrors.descricao = "A descrição deve ter no máximo 150 caracteres";
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
            </Row>
          </Card.Body>
        </Container>
        <Container>
          <h2>Serviços Cadastrados</h2>
          <Accordion>
            {servicosFiltrados.length <= 0 ? (
              <Accordion.Item eventKey="0">
                <Accordion.Header>Nenhum serviço encontrado</Accordion.Header>
              </Accordion.Item>
            ) : (
              servicosFiltrados.map((servico) => (
                <Accordion.Item eventKey={servico.ID_Servico} key={servico.ID_Servico}>
                  <Accordion.Header>
                    <p className="m-2 text-primary"><strong>{servico.Nome_Servico}</strong></p> - {servico.Descricao}
                  </Accordion.Header>
                  <Accordion.Body>
                    <Row>
                      <Col md={4}>
                        <p><strong>ID:</strong> {servico.ID_Servico}</p>
                        <p><strong>Nome:</strong> {servico.Nome_Servico}</p>
                      </Col>
                      <Col md={4}>
                        <p><strong>Descrição:</strong> {servico.Descricao}</p>
                        <p><strong>Status:</strong> {servico.Status}</p>
                      </Col>
                      <Col md={4}>
                        <p><strong>Data Cadastro:</strong> {moment(servico.Data_De_Cadastro).format('DD/MM/YYYY')}</p>
                      </Col>
                    </Row>
                    <div className="d-flex flex-row gap-2">
                      <Button className='btn-success' as={Link} to={`/servicos/${servico.ID_Servico}/profissionais`}>
                        <FaEye /> Ver Profissionais
                      </Button>
                      <Button className='btn-primary' onClick={() => abrirModalEdicao(servico.ID_Servico)}><FaEdit /></Button>
                      <Button className='btn-danger' onClick={() => abrirModalConfirmacao(servico.ID_Servico)}><FaTrashAlt /></Button>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              ))
            )}
          </Accordion>
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
        errors={errors}
      />
    </main>
  );
}

export default Servicos;
