import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { FaRegSave } from "react-icons/fa";

function ModalAtribuirServico({ show, setShowAtribuirModal, handleAtribuirServico, servicoEditando, pacientes, pacienteSelecionado, setPacienteSelecionado }) {
  return (
    <Modal show={show} onHide={() => setShowAtribuirModal(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>Atribuir Serviço a Paciente</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formPaciente">
            <Form.Label>Selecione o Paciente</Form.Label>
            <Form.Select
              value={pacienteSelecionado}
              onChange={(e) => setPacienteSelecionado(e.target.value)}
            >
              <option value="">Selecione um paciente</option>
              {pacientes.map((paciente) => (
                <option key={paciente.id} value={paciente.nome}>
                  {paciente.nome}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowAtribuirModal(false)}>
          Cancelar
        </Button>
        <Button variant="success" onClick={handleAtribuirServico}>
          <FaRegSave /> Atribuir Serviço
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalAtribuirServico;
