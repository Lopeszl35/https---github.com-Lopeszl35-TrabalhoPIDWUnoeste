import React, { useEffect, useState } from "react";
import { Container, Form, Card, Button, Modal, ListGroup, Accordion, Row, Col } from "react-bootstrap";
import { FaSearch, FaTrash, FaPlus } from "react-icons/fa";
import { TbSelect } from "react-icons/tb";
import { useParams, useOutletContext } from "react-router-dom";
import ServicosService from "../../services/servicosService";
import ProfissionaisServicoService from "../../services/profissionaisServicoService";
import './profissionaisServico.css';

const servicosService = new ServicosService();
const profissionaisServicoService = new ProfissionaisServicoService();

function ProfissionaisPorServico() {
  const { show } = useOutletContext();
  const { idServico } = useParams();
  const [servico, setServico] = useState(null);
  const [profissionais, setProfissionais] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("nome");
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [profissionalSelecionado, setProfissionalSelecionado] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    async function fetchServiceDetails() {
      try {
        const servicoData = await servicosService.obterPorId(idServico);
        setServico(servicoData);
        const profData = await profissionaisServicoService.obterProfissionaisPorServico(idServico);
        setProfissionais(profData);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    }
    fetchServiceDetails();
  }, [idServico]);

  const handleSelectProfissional = (profissional) => {
    setProfissionalSelecionado(profissional);
    setShowSearchModal(false);
  };

  const handleClearSelected = () => {
    setProfissionalSelecionado(null);
  };

  const handleOpenConfirmModal = () => {
    setShowConfirmModal(true);
  };

  const handleCloseConfirmModal = () => {
    setShowConfirmModal(false);
  };

  const handleExcluir = async () => {
    const idProfissional = profissionalSelecionado.ID_Profissional;
    if (profissionalSelecionado) {
        try {
            console.log("Profissional selecionado: ", profissionalSelecionado);
            await profissionaisServicoService.deletarRelacaoProfissionalServico(idProfissional, idServico);
            setProfissionais(profissionais.filter(p => p.ID_Profissional !== profissionalSelecionado.ID_Profissional));
            setProfissionalSelecionado(null);
            handleCloseConfirmModal();
        } catch (error) {
            alert(`Erro ao excluir o profissional do serviço: ${error.message}`);
            console.error("Erro ao excluir o profissional:", error);
        }
    }
};

  const handleAdicionarProfissional = async (profissional) => {
    try {
      await profissionaisServicoService.relacionarProfissionalServico(profissional.ID_Profissional, idServico);
      setProfissionais([...profissionais, profissional]);
    } catch (error) {
      console.error("Erro ao adicionar profissional:", error);
    }
  };

  const handleBuscarProfissionais = async () => {
    try {
      const results = await profissionaisServicoService.buscarProfissionais(searchTerm, searchType);
      setSearchResults(results);
    } catch (error) {
      console.error("Erro ao buscar profissionais:", error);
    }
  };

  return (
    <main className={`container-servicos ${show ? "container-servicos-side-active" : ""}`}>
      <header>
        <h1>Profissionais Cadastrados para o Serviço {servico?.Nome_Servico}</h1>
      </header>

      <section>
        {/* Adicionar e Excluir Profissionais */}
        <Container className="card-servicos mt-4">
          <Card.Body className="d-flex flex-column align-items-start">
            {/* Adicionar Profissional */}
            <div className="d-flex w-100 mb-3">
              <Button variant="primary" onClick={() => setShowSearchModal(true)}>
                <FaSearch />
              </Button>
              <Form.Control
                type="text"
                placeholder="Buscar profissionais no banco de dados"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="me-2"
              />
              <Button variant="success" onClick={() => handleAdicionarProfissional(profissionalSelecionado)} className="ms-2">
                <FaPlus />
              </Button>
            </div>

            {/* Excluir Profissional */}
            <div className="d-flex w-100">
              <Button variant="primary" onClick={() => setShowSearchModal(true)}>
                <FaSearch />
              </Button>
              <Form.Control
                type="text"
                placeholder="Nome do profissional"
                value={profissionalSelecionado?.Nome_Profissional || ""}
                readOnly
                className="mx-2"
              />
              <Form.Control
                type="text"
                placeholder="Registro Profissional"
                value={profissionalSelecionado?.registroProfissional || ""}
                readOnly
                className="small-input mx-2"
              />
              <Button variant="danger" onClick={handleOpenConfirmModal}>
                <FaTrash />
              </Button>
            </div>
          </Card.Body>
        </Container>
      </section>

      <section>
        <Container className="mt-4">
          <h2>Profissionais cadastrados</h2>
          <Accordion>
            {profissionais.length <= 0 ? (
              <Accordion.Item eventKey="0">
                <Accordion.Header>Nenhum profissional encontrado</Accordion.Header>
              </Accordion.Item>
            ) : (
              profissionais.map((profissional, index) => (
                <Accordion.Item key={index} eventKey={index.toString()}>
                  <Accordion.Header>
                    <p><strong className="mt-2 text-primary">{profissional.Nome_Profissional}</strong></p>
                  </Accordion.Header>
                  <Accordion.Body>
                    <Row>
                      <Col md={4}>
                        <p><strong>Registro Profissional: </strong> {profissional.registroProfissional}</p>
                        <p><strong>Email: </strong> {profissional.Email}</p>
                        <p><strong>Telefone: </strong> {profissional.Telefone}</p>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="d-flex justify-content-end">
                        <Button variant="dark" className="custom-button" onClick={() => handleSelectProfissional(profissional)}>
                          <TbSelect /> Selecionar profissional
                        </Button>
                      </Col>
                    </Row>
                  </Accordion.Body>
                </Accordion.Item>
              ))
            )}
          </Accordion>
        </Container>
      </section>

      {/* Modal de confirmação para exclusão */}
      <Modal show={showConfirmModal} onHide={handleCloseConfirmModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Você tem certeza que deseja excluir o profissional <strong>{profissionalSelecionado?.Nome_Profissional}</strong> do serviço?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseConfirmModal}>Cancelar</Button>
          <Button variant="danger" onClick={handleExcluir}>Confirmar</Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de pesquisa de profissionais */}
      <Modal show={showSearchModal} onHide={() => setShowSearchModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Buscar Profissionais</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="text"
            placeholder="Digite o nome ou registro"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Form.Select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            className="mt-3"
          >
            <option value="nome">Nome</option>
            <option value="registro">Registro Profissional</option>
          </Form.Select>
          <ListGroup className="mt-3">
            {searchResults.map((profissional, index) => (
              <ListGroup.Item key={index} action onClick={() => handleSelectProfissional(profissional)}>
                {profissional.Nome_Profissional} - {profissional.registroProfissional}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowSearchModal(false)}>Fechar</Button>
          <Button variant="primary" onClick={handleBuscarProfissionais}>Buscar</Button>
        </Modal.Footer>
      </Modal>
    </main>
  );
}

export default ProfissionaisPorServico;
