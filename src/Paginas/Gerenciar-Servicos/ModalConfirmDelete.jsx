import React from "react";
import { Modal, Button } from "react-bootstrap";

function ModalConfirmDelete({ show, fecharModalConfirmacao, handleExcluir, servicoToDelete }) {
  return (
    <Modal show={show} onHide={fecharModalConfirmacao}>
      <Modal.Header closeButton>
        <Modal.Title>Confirmação de Exclusão</Modal.Title>
      </Modal.Header>
      <Modal.Body>Tem certeza que deseja excluir este serviço?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={fecharModalConfirmacao}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={() => handleExcluir(servicoToDelete)}>
          Excluir
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalConfirmDelete;
