import { useState } from "react";
import { Modal, Button } from "react-bootstrap";


function ModalExcluir({modalDelete, fecharModalDelete}) {
    return ( 
        <Modal show={modalDelete} onHide={() => modalDelete(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Excluir Usuário</Modal.Title>
            </Modal.Header>
            <Modal.Body>Tem certeza que deseja excluir este usuário?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => fecharModalDelete()}>
                    Cancelar
                </Button>
                <Button variant="danger" >
                    Excluir
                </Button>
            </Modal.Footer>
        </Modal>
     );
}

export default ModalExcluir;