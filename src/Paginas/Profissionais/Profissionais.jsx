import React, { useState, useEffect } from 'react';
import { Accordion, Card, Col, Container, Form, Row, Button, Table, Pagination } from "react-bootstrap";
import { useOutletContext, Link } from "react-router-dom";
import { CiCirclePlus } from "react-icons/ci";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import ProfissionaisService from "../../services/profissionaisService";
import ModalExcluir from './ModalExcluir';
import ModalEditar from './ModalEditar';
import './Profissionais.css';

const profissionaisService = new ProfissionaisService();

function Profissionais() {
  const { show } = useOutletContext();
  const [profissionais, setProfissionais] = useState([]);
  const [profissionaisFiltrados, setProfissionaisFiltrados] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("");
  const [modalDelete, setModalDelete] = useState(false);
  const [modalEditarShow, setModalEditarShow] = useState(false);
  const [profissionalEditando, setProfissionalEditando] = useState(null);
  const [profissionalADeletar, setProfissionalADeletar] = useState(null);
  const profissionaisPerPage = 10;

  const obterProfissionais = async () => {
    try {
      const profissionais = await profissionaisService.obterTodos();
      setProfissionais(profissionais);
      setProfissionaisFiltrados(profissionais);
    } catch (error) {
      console.error('Erro ao obter profissionais:', error);
    }
  };

  useEffect(() => {
    obterProfissionais();
  }, []);

  useEffect(() => {
    const filteredProfissionais = profissionais.filter((profissional) => {
      if (searchType === "1") {
        return profissional.registroProfissional.toLowerCase().includes(searchQuery.toLowerCase());
      } else if (searchType === "2") {
        return profissional.Nome_Completo.toLowerCase().includes(searchQuery.toLowerCase());
      } else if(searchType === "3") {
        return profissional.Especialidade.toLowerCase().includes(searchQuery.toLowerCase());
      }
      return true;
    });
    setProfissionaisFiltrados(filteredProfissionais);
    setCurrentPage(1);
  }, [searchQuery, searchType, profissionais]);

  const indexOfLastProfissional = currentPage * profissionaisPerPage;
  const indexOfFirstProfissional = indexOfLastProfissional - profissionaisPerPage;
  const currentProfissionais = profissionaisFiltrados.slice(indexOfFirstProfissional, indexOfLastProfissional);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const fecharModalDelete = () => {
    setModalDelete(false);
    setProfissionalADeletar(null);
  };

  const fecharModalEditar = () => {
    setModalEditarShow(false);
    setProfissionalEditando(null);
  };

  const abrirModalExcluir = (id) => {
    setProfissionalADeletar(id);
    setModalDelete(true);
  };

  const editarProfissional = async (id) => {
    try {
      const profissionalEditado = await profissionaisService.obterPorId(id);
      setProfissionalEditando(profissionalEditado);
      setModalEditarShow(true);
    } catch (error) {
      console.error('Erro ao editar profissional:', error);
    }
  };

  const salvarEdicaoProfissional = async (profissionalEditado) => {
    try {
      await profissionaisService.editarProfissional(profissionalEditado.ID_Profissional, profissionalEditado);
      obterProfissionais();
      fecharModalEditar();
      alert('Profissional editado com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar edição do profissional:', error);
    }
  };

  const excluirProfissional = async () => {
    try {
      await profissionaisService.deletarProfissional(profissionalADeletar);
      obterProfissionais();
      fecharModalDelete();
      alert('Profissional excluído com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir profissional:', error);
    }
  };

  return (
    <section>
      <Container className={`container-profissionais ${show ? "container-profissionais-active" : ""}`}>
        <Card className="card-lista-profissionais">
          <Card.Body>
            <Row>
              <Card.Title className="font-bold">Lista de Profissionais</Card.Title>
            </Row>
            <Row className="mt-4">
              <Col lg={12} className="busca">
                <Card.Text>Pesquise Por:</Card.Text>
                <Form className="busca d-flex">
                  <Form.Select 
                    aria-label="Default select example" 
                    size="sm" 
                    className="me-2"
                    value={searchType}
                    onChange={(e) => setSearchType(e.target.value)}
                  >
                    <option value="">Selecione</option>
                    <option value="1">Registro Profissional</option>
                    <option value="2">Nome</option>
                    <option value="3">Especialidade</option>
                  </Form.Select>
                  <Form.Control 
                    type="text" 
                    placeholder="Pesquisar"
                    id="pesquisar"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </Form>
                <Button className="button-cadastro-profissional mt-3" as={Link} to="/Profissionais/CadastrarProfissionais">
                  <CiCirclePlus /> Cadastrar Profissional
                </Button>
              </Col>
            </Row>
            <Row>
              <Accordion>
                {currentProfissionais.length <= 0 ? (
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>Nenhum profissional encontrado</Accordion.Header>
                  </Accordion.Item>
                ) : (
                  currentProfissionais.map((profissional) => (
                    <Accordion.Item eventKey={profissional.ID_Profissional} key={profissional.ID_Profissional}>
                      <Accordion.Header>
                        {profissional.Nome_Completo} - {profissional.Email}
                      </Accordion.Header>
                      <Accordion.Body>
                        <Row>
                          <Col md={4}>
                            <p><strong>ID:</strong> {profissional.ID_Profissional}</p>
                            <p><strong>Nome:</strong> {profissional.Nome_Completo}</p>
                            <p><strong>Data de Nascimento:</strong> {profissional.Data_Nascimento}</p>
                            <p><strong>CPF:</strong> {profissional.CPF}</p>
                          </Col>
                          <Col md={4}>
                            <p><strong>RG:</strong> {profissional.RG}</p>
                            <p><strong>Email:</strong> {profissional.Email}</p>
                            <p><strong>Telefone:</strong> {profissional.Telefone}</p>
                          </Col>
                          <Col md={4}>
                            <p><strong>Especialidade:</strong> {profissional.Especialidade}</p>
                            <p><strong>Registro Profissional:</strong> {profissional.registroProfissional}</p>
                          </Col>
                        </Row>
                        <div className="d-flex flex-row gap-2">
                          <Button className='btn-primary' onClick={() => editarProfissional(profissional.ID_Profissional)}><FaEdit /></Button>
                          <Button className='btn-danger' onClick={() => abrirModalExcluir(profissional.ID_Profissional)}><FaTrashAlt /></Button>
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>
                  ))
                )}
              </Accordion>
            </Row>
            <Row>
              <Pagination className="justify-content-center mt-3">
                {Array.from({ length: Math.ceil(profissionaisFiltrados.length / profissionaisPerPage) }, (_, index) => (
                  <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => paginate(index + 1)}>
                    {index + 1}
                  </Pagination.Item>
                ))}
              </Pagination>
            </Row>
          </Card.Body>
        </Card>
      </Container>

      <ModalExcluir 
        modalDelete={modalDelete} 
        setShow={setModalDelete}
        fecharModalDelete={fecharModalDelete}
        excluirProfissional={excluirProfissional}
        setProfissionalADeletar={setProfissionalADeletar}
        profissionalADeletar={profissionalADeletar}
      />

      <ModalEditar 
        modalEditarShow={modalEditarShow} 
        fecharModalEditar={fecharModalEditar}
        profissionalEditando={profissionalEditando}
        salvarEdicaoProfissional={salvarEdicaoProfissional}
      />
    </section>
  );
}

export default Profissionais;
