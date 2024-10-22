import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Card, Button, Modal } from "react-bootstrap";
import { FaSearch, FaTrash } from "react-icons/fa";
import { useParams, useOutletContext } from "react-router-dom";
import ServicosService from "../../services/servicosService";
import './ProfissionaisServicos.css';

const servicosService = new ServicosService();

function ProfissionaisPorServico() {
  const { show } = useOutletContext();
  const { idServico } = useParams();
  const [servico, setServico] = useState(null);
  const [profissionais, setProfissionais] = useState([]);
  const [filteredProfissionais, setFilteredProfissionais] = useState([]);
  const [profissionalSelecionado, setProfissionalSelecionado] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchServiceDetails() {
      try {
        const servicoData = await servicosService.obterPorId(idServico);
        setServico(servicoData);
        const profData = await servicosService.obterProfissionaisPorServico(idServico);
        setProfissionais(profData);
        setFilteredProfissionais(profData);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    }
    fetchServiceDetails();
  }, [idServico]);

  const handleOpenSearchModal = () => {
    const filtered = profissionais.filter(prof =>
      prof.Nome_Profissional.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prof.registroProfissional.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProfissionais(filtered);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSelectProfissional = (profissional) => {
    setProfissionalSelecionado(profissional);
  };

  const handleClearSelected = () => {
    setProfissionalSelecionado(null);
  };

  return (
    <Container className={`container-servicos ${show ? "container-servicos-side-active" : ""}`}>
      <h2>Profissionais Cadastrados para o Serviço {servico?.Nome_Servico}</h2>
      <Row>
        <Col md={12}>
          <Card className="card-servicos">
            <Card.Body className="d-flex align-items-center">
              <Button variant="primary" onClick={handleOpenSearchModal}><FaSearch /></Button>
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
              <Button variant="danger" onClick={handleClearSelected}><FaTrash /></Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Modal show={searchTerm !== ""} onHide={() => setSearchTerm("")}>
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
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setSearchTerm("")}>Fechar</Button>
          <Button variant="primary" onClick={handleOpenSearchModal}>Buscar</Button>
        </Modal.Footer>
      </Modal>
      <ul className="list-group">
        {filteredProfissionais.map((prof, index) => (
          <li key={index} onClick={() => handleSelectProfissional(prof)} className="list-group-item">
            {prof.Nome_Profissional} - {prof.registroProfissional}
          </li>
        ))}
      </ul>
    </Container>
  );
}

export default ProfissionaisPorServico;
