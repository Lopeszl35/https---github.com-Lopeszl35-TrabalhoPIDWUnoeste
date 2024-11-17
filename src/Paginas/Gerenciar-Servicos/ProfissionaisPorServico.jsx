import React, { useEffect, useState } from "react";
import { Container, Form, Card, Button, Modal, ListGroup, Accordion, Row, Col, Alert, AlertHeading } from "react-bootstrap";
import { FaSearch, FaTrash, FaPlus } from "react-icons/fa";
import { TbSelect } from "react-icons/tb";
import { useParams, useOutletContext } from "react-router-dom";
import ServicosService from "../../services/servicosService";
import ProfissionaisServicoService from "../../services/profissionaisServicoService";
import './profissionaisServico.css';
import { FaCircleCheck } from "react-icons/fa6";
import { MdOutlineError } from "react-icons/md";

const servicosService = new ServicosService();
const profissionaisServicoService = new ProfissionaisServicoService();

function ProfissionaisPorServico() {
  const { show } = useOutletContext();
  const { idServico } = useParams();
  const [servico, setServico] = useState(null);
  const [profissionais, setProfissionais] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("Nome_Completo");
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("");
  const [alertIcon, setAlertIcon] = useState("");
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
            await profissionaisServicoService.deletarRelacaoProfissionalServico(idProfissional, idServico);
            setProfissionais(profissionais.filter(p => p.ID_Profissional !== profissionalSelecionado.ID_Profissional));

            setProfissionalSelecionado(null);
            handleCloseConfirmModal();
            setAlertMessage("Profissional excluido com sucesso!");
            setAlertVariant("success");
            setAlertIcon(<FaTrash />);
            setShowAlertModal(true);
        } catch (error) {
            setAlertMessage(`Erro ao excluir o profissional do serviço ${error.message}`);
            setAlertVariant("danger");
            setAlertIcon(<FaTrash />);
            setShowAlertModal(true);
            console.error("Erro ao excluir o profissional:", error);
        }
    }
};

  const handleAdicionarProfissional = async (profissional) => {
    try {
      await profissionaisServicoService.relacionarProfissionalServico(profissional.ID_Profissional, idServico);
      setProfissionais([...profissionais, profissional]);

      const updatedProfissionais = await profissionaisServicoService.obterProfissionaisPorServico(idServico);
      setProfissionais(updatedProfissionais);
      setProfissionalSelecionado(null);

      setAlertMessage("Profissional relacionado com sucesso!");
      setAlertVariant("success");
      setAlertIcon(<FaCircleCheck />);
      setShowAlertModal(true);
    } catch (error) {
      setAlertMessage(`Erro ao relacionar o profissional ao serviço ${error.message}`);
      setAlertVariant("danger");
      setAlertIcon(<MdOutlineError />);
      setShowAlertModal(true);
      console.error("Erro ao adicionar profissional:", error);
    }
  };

  const handleBuscarProfissionais = async () => {
    try {
      const results = await profissionaisServicoService.buscarProfissionais(searchTerm, searchType);
      console.log("Profissionais encontrados:", results);
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
            {/* Excluir e adicionar Profissional */}
            <div className="d-flex w-100">
              <Button variant="primary" onClick={() => setShowSearchModal(true)}>
                <FaSearch />
              </Button>
              <Form.Control
                type="text"
                placeholder="Nome do profissional"
                value={profissionalSelecionado?.Nome_Profissional || profissionalSelecionado?.Nome_Completo || ""}
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
              <div className="d-flex gap-2">
              <Button variant="success" onClick={() => handleAdicionarProfissional(profissionalSelecionado)} className="ms-2">
                <FaPlus />
              </Button>
              <Button variant="danger" onClick={handleOpenConfirmModal}>
                <FaTrash />
              </Button>
              </div>
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
                <Accordion.Header><span className="text-danger">Nenhum Profissional cadastrado</span></Accordion.Header>
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
      <Modal show={showConfirmModal} onHide={handleCloseConfirmModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Você tem certeza que deseja excluir o profissional <strong>{profissionalSelecionado?.Nome_Profissional}</strong> do serviço?
           Isso excluira todos os agendamentos relacionados a este profissional.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseConfirmModal}>Cancelar</Button>
          <Button variant="danger" onClick={handleExcluir}>Confirmar</Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de pesquisa de profissionais */}
      <Modal show={showSearchModal} onHide={() => setShowSearchModal(false)} centered>
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
            <option value="Nome_Completo">Nome</option>
            <option value="registroProfissional">Registro Profissional</option>
          </Form.Select>
          <ListGroup className="mt-3">
            {searchResults.map((profissional, index) => (
              <ListGroup.Item key={index} action onClick={() => handleSelectProfissional(profissional)}>
                <Row>
                  <p><strong className="mt-2 text-primary">Nome: </strong>{profissional.Nome_Completo}</p>
                  <p><strong className="mt-2 text-primary">Registro Profissional: </strong>{profissional.registroProfissional}</p>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowSearchModal(false)}>Fechar</Button>
          <Button variant="primary" onClick={handleBuscarProfissionais}>Buscar</Button>
        </Modal.Footer>
      </Modal>

      {/* Modal para alertas sucesso erros */}
      <Modal show={showAlertModal} onHide={() => setShowAlertModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Alerta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert
            className="mt-3"
            variant={alertVariant}
            onClose={() => setShowAlertModal(false)}
            dismissible
          >
            <AlertHeading>
              {alertIcon && <span className="me-2">{alertIcon}</span>}
              {alertMessage}
            </AlertHeading>
          </Alert>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAlertModal(false)}>Fechar</Button>
        </Modal.Footer>
      </Modal>
    </main>
  );
}

export default ProfissionaisPorServico;
