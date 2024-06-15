import { Modal, Button } from "react-bootstrap";

function ModalExcluir({ modalDelete, fecharModalDelete, profissionalADeletar, setShow }) {
  const handleExcluir = async () => {
    try {
      setShow(false);
      alert('Profissional excluído com sucesso!');
      window.location.reload(); 
    } catch (error) {
      console.error('Erro ao excluir profissional:', error);
    }
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
