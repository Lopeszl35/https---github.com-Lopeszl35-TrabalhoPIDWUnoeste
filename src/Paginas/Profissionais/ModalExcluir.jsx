import { Modal, Button } from "react-bootstrap";

function ModalExcluir({ modalDelete, fecharModalDelete, setProfissionalADeletar, setShow, excluirProfissional }) {
  const handleExcluir = async (profissional) => {
      setProfissionalADeletar(profissional)
      excluirProfissional();
      setShow(false);
  };

  return (
    <Modal show={modalDelete} onHide={fecharModalDelete} centered>
      <Modal.Header closeButton>
        <Modal.Title>Excluir Profissional</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Tem certeza que deseja excluir este profissional?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={fecharModalDelete}>Fechar</Button>
        <Button variant="danger" onClick={handleExcluir}>Excluir</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalExcluir;
