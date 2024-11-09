import React, { useEffect, useState } from "react";
import { Container, Form, Card, Button, Modal, ListGroup } from "react-bootstrap";
import { FaSearch, FaTrash, FaPlus } from "react-icons/fa";
import { useParams, useOutletContext } from "react-router-dom";
import ServicosService from "../../services/servicosService";
import './profissionaisServico.css';

const servicosService = new ServicosService();

function ProfissionaisPorServico() {
  const { show } = useOutletContext();
  const { idServico } = useParams();
  const [servico, setServico] = useState(null);
  const [profissionais, setProfissionais] = useState([]);
  const [searchTermAdd, setSearchTermAdd] = useState(""); // Busca para adicionar
  const [searchTerm, setSearchTerm] = useState(""); // Busca para excluir
  const [searchType, setSearchType] = useState("nome"); // Tipo de busca (nome ou registro)
  const [searchTypeAdd, setSearchTypeAdd] = useState("nome"); // Tipo de busca para adicionar
  const [showSearchModal, setShowSearchModal] = useState(false); // Modal para busca de profissionais
  const [searchResults, setSearchResults] = useState([]); // Resultados da busca no modal
  const [profissionalSelecionado, setProfissionalSelecionado] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false); // Modal de confirmação

  useEffect(() => {
    async function fetchServiceDetails() {
      try {
        const servicoData = await servicosService.obterPorId(idServico);
        setServico(servicoData);
        const profData = await servicosService.obterProfissionaisPorServico(idServico);
        setProfissionais(profData);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    }
    fetchServiceDetails();
  }, [idServico]);

  const handleSearchChangeAdd = (e) => {
    setSearchTermAdd(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSelectProfissional = (profissional) => {
    setProfissionalSelecionado(profissional);
    setShowSearchModal(false); // Fechar o modal ao selecionar o profissional
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
    if (profissionalSelecionado) {
      try {
        await servicosService.deletarRelacaoProfissionalServico(idServico, profissionalSelecionado.ID_Profissional);
        setProfissionais(profissionais.filter(p => p.ID_Profissional !== profissionalSelecionado.ID_Profissional));
        setProfissionalSelecionado(null);
        handleCloseConfirmModal();
      } catch (error) {
        console.error("Erro ao excluir o profissional:", error);
      }
    }
  };

  const handleAdicionarProfissional = async (profissional) => {
    try {
      await servicosService.relacionarProfissionalServico(idServico, profissional.ID_Profissional);
      setProfissionais([...profissionais, profissional]);
    } catch (error) {
      console.error("Erro ao adicionar profissional:", error);
    }
  };

  // Função para abrir o modal de pesquisa de profissionais
  const handleOpenSearchModal = () => {
    setShowSearchModal(true);
  };

  const handleCloseSearchModal = () => {
    setSearchTerm("");
    setSearchType("nome");
    setShowSearchModal(false);
  };

  const handleBuscarProfissionais = async () => {
    try {
      const results = await servicosService.buscarProfissionais(searchTerm, searchType);
      setSearchResults(results); 
    } catch (error) {
      console.error("Erro ao buscar profissionais:", error);
    }
  };

  return (
    <Container className={`container-servicos ${show ? "container-servicos-side-active" : ""}`}>
      <h2>Profissionais Cadastrados para o Serviço {servico?.Nome_Servico}</h2>

      {/* Card único para adicionar e excluir profissionais */}
      <Card className="card-servicos">
        <Card.Body className="d-flex flex-column align-items-start">
          {/* Adicionar Profissional */}
          <div className="d-flex w-100 mb-3">
            <Button className="h-100 " variant="primary" onClick={handleOpenSearchModal}>
              <FaSearch />
            </Button>
            <Form.Control
              type="text"
              placeholder="Buscar profissionais no banco de dados"
              value={searchTermAdd}
              onChange={handleSearchChangeAdd}
              className="me-2"
            />
            <Button  variant="success" onClick={() => handleAdicionarProfissional(profissionalSelecionado)} className="ms-2 h-100 ">
              <FaPlus />
            </Button>
          </div>

          {/* Excluir Profissional */}
          <div className="d-flex w-100">
            <Button className="h-100" variant="primary" onClick={handleOpenSearchModal}>
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

            <Button className="h-100" variant="danger" onClick={handleOpenConfirmModal}>
              <FaTrash />
            </Button>
          </div>
        </Card.Body>
      </Card>

      <ul className="list-group mt-3">
        {profissionais.map((prof, index) => (
          <li key={index} onClick={() => handleSelectProfissional(prof)} className="list-group-item">
            {prof.Nome_Profissional} - {prof.registroProfissional}
          </li>
        ))}
      </ul>

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
      <Modal show={showSearchModal} onHide={handleCloseSearchModal}>
        <Modal.Header closeButton>
          <Modal.Title>Buscar Profissionais</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="text"
            placeholder="Digite o nome ou registro"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <Form.Select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            className="mt-3"
          >
            <option value="nome">Nome</option>
            <option value="registro">Registro Profissional</option>
          </Form.Select>
          {/* Lista de resultados da busca */}
          <ListGroup className="mt-3">
            {searchResults.map((profissional, index) => (
              <ListGroup.Item
                key={index}
                action
                onClick={() => handleSelectProfissional(profissional)}
              >
                {profissional.Nome_Profissional} - {profissional.registroProfissional}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseSearchModal}>Fechar</Button>
          <Button variant="primary" onClick={handleBuscarProfissionais}>Buscar</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default ProfissionaisPorServico;
