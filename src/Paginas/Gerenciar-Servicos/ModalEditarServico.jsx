import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { FaRegSave } from "react-icons/fa";

function ModalEditarServico({ show, setShowEditarModal, handleSalvarEdicao, servicoEditando, setServicoEditando, handleDescricaoChange, handleProfissionalChange, errors }) {
  return (
    <Modal show={show} onHide={() => setShowEditarModal(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>Editar Serviço</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formNome">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nome do serviço"
              value={servicoEditando?.Nome_Servico || ""}
              disabled
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formDescricao">
            <Form.Label>Descrição</Form.Label>
            <Form.Control
              required
              as="textarea"
              rows={3}
              placeholder="Descrição do serviço"
              value={servicoEditando?.Descricao || ""}
              isInvalid={errors.descricao}
              onChange={handleDescricaoChange}
            />
            <Form.Control.Feedback type="invalid">
              {errors.descricao}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formStatus">
            <Form.Label>Status</Form.Label>
            <Form.Select
              value={servicoEditando?.Status || ""}
              onChange={(e) => setServicoEditando({ ...servicoEditando, Status: e.target.value })}
            >
              <option value="Ativo">Ativo</option>
              <option value="Inativo">Inativo</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formProfissional">
            <Form.Label>Profissional Responsável</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nome do profissional"
              value={servicoEditando?.Profissional_Responsavel || ""}
              isInvalid={errors.profissional}
              onChange={handleProfissionalChange}
            />
            <Form.Control.Feedback type="invalid">
              {errors.profissional}
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowEditarModal(false)}>
          Cancelar
        </Button>
        <Button variant="success" onClick={handleSalvarEdicao}>
          <FaRegSave /> Salvar Alterações
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalEditarServico;
