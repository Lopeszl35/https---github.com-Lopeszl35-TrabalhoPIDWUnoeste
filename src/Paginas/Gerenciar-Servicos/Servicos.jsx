import { useEffect, useState } from "react";
import "./Materiais.css";
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
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";
import { Link, useOutletContext } from "react-router-dom";

function Servicos() {
  const { show } = useOutletContext();
  const [listaMateriais, setListaMateriais] = useState([]);
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
  const [materialToDelete, setMaterialToDelete] = useState(null);
  const [entradaSaida, setEntradaSaida] = useState(null);

  useEffect(() => {
    const listaSalva = localStorage.getItem("materiais");
    if (listaSalva !== null) {
      setListaMateriais(JSON.parse(listaSalva));
    }
  }, []);

  const toggleEntradaSaida = (id) => {
    setEntradaSaida(entradaSaida === id ? null : id);
  };

  const handleEntrada = (id) => {
    const novaLista = listaMateriais.map((item) => {
      if (item.id === id) {
        return { ...item, quantidade: parseInt(item.quantidade) + 1 };
      }
      return item;
    });
    setListaMateriais(novaLista);
    localStorage.setItem("materiais", JSON.stringify(novaLista));
  };

  const handleSaida = (id) => {
    const novaLista = listaMateriais.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          quantidade: item.quantidade === 0 ? 0 : parseInt(item.quantidade) - 1,
        };
      }
      return item;
    });
    setListaMateriais(novaLista);
    localStorage.setItem("materiais", JSON.stringify(novaLista));
  };

  const handleExcluir = (id) => {
    const novaLista = listaMateriais.filter((item) => item.id !== id);
    setListaMateriais(novaLista);
    localStorage.setItem("materiais", JSON.stringify(novaLista));
    alert("Material excluído com sucesso!");
    setShowConfirmDeleteModal(false);
  };

  const abrirModalConfirmacao = (id) => {
    setMaterialToDelete(id);
    setShowConfirmDeleteModal(true);
  };

  const fecharModalConfirmacao = () => {
    setShowConfirmDeleteModal(false);
    setMaterialToDelete(null);
  };

  return (
    <div
      className={`container-materiais ${show ? "container-materiais-side-active" : ""}`}
    >
      <h1>
        <FaListAlt /> Materiais Cadastrados
      </h1>
      <Container>
        <Card.Body className="mt-2 card-material">
          <Row>
            <Col lg="2">
              <Button as={Link} to="/materiais/cadastro" variant="primary">
                <FaPlus /> Adicionar
              </Button>
            </Col>
            <Col lg="6">
              <Form>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Descrição"
                    id="descricao"
                  />
                </Form.Group>
              </Form>
            </Col>
            <Col lg="2">
              <Button
                as={Link}
                to="/materiais/pesquisa/{id}"
                variant="secondary"
              >
                <FaSearch /> Pesquisar
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Container>
      <Container>
        <h2>Materiais Cadastrados</h2>
        <Table striped bordered hover className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Quantidade</th>
              <th>Descrição</th>
              <th>Fornecedor</th>
              <th>Preço</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {listaMateriais.length <= 0 ? (
              <tr>
                <td colSpan={7}>Nenhum material encontrado</td>
              </tr>
            ) : (
              listaMateriais.map((material) => (
                <>
                  <tr
                    key={material.id}
                    onClick={() => toggleEntradaSaida(material.id)}
                    style={{ cursor: "pointer" }}
                  >
                    <td>{material.id}</td>
                    <td>{material.nome}</td>
                    <td>{material.quantidade}</td>
                    <td>{material.descricao}</td>
                    <td>{material.fornecedor}</td>
                    <td>{material.preco}</td>
                    <td className="d-flex flex-row">
                      <Link
                        to={`/materiais/editar/${material.id}`}
                        className="btn btn-primary m-1 w-100"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {" "}
                        <FaEdit></FaEdit> Editar
                      </Link>
                      <Button
                        className="btn btn-danger m-1 w-100"
                        onClick={(e) => {
                          e.stopPropagation();
                          abrirModalConfirmacao(material.id);
                        }}
                      >
                        {" "}
                        <FaTrashAlt></FaTrashAlt> Excluir
                      </Button>
                    </td>
                  </tr>
                  {entradaSaida === material.id && (
                    <tr key={`entradaSaida-${material.id}`}>
                      <td colSpan={7} className="p-2">
                        <Button
                          variant="success"
                          className="m-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEntrada(material.id);
                          }}
                        >
                          <FaArrowUp></FaArrowUp> Registrar Entrada
                        </Button>
                        <Button
                          variant="danger"
                          className="m-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSaida(material.id);
                          }}
                        >
                          <FaArrowDown></FaArrowDown> Registrar Saída
                        </Button>
                      </td>
                    </tr>
                  )}
                </>
              ))
            )}
          </tbody>
        </Table>
      </Container>

      {/* Modal de confirmação de exclusão */}
      <Modal show={showConfirmDeleteModal} onHide={fecharModalConfirmacao}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmação de Exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>Tem certeza que deseja excluir este material?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={fecharModalConfirmacao}>
            Cancelar
          </Button>
          <Button
            variant="danger"
            onClick={() => handleExcluir(materialToDelete)}
          >
            Excluir
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Servicos;
