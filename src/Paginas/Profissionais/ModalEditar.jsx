import { Modal, Button, Form } from "react-bootstrap";
import { useEffect, useState } from "react";

function ModalEditar({ modalEditarShow, fecharModalEditar, profissionalEditando, salvarEdicaoProfissional }) {
    const [editandoProfissional, setEditandoProfissional] = useState(profissionalEditando);

    useEffect(() => {
        setEditandoProfissional(profissionalEditando);
    }, [profissionalEditando]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditandoProfissional({ ...editandoProfissional, [name]: value });
    };

    const handleSalvar = () => {
        salvarEdicaoProfissional(editandoProfissional);
    };

    return (
        <section>
            <Modal show={modalEditarShow} onHide={fecharModalEditar} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Profissional</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formNome">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control 
                                type="text"
                                placeholder="Nome do usuário"
                                name="Nome_Completo"
                                value={editandoProfissional?.Nome_Completo || ""}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Email do usuário"
                                name="Email"
                                value={editandoProfissional?.Email || ""}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formTelefone">
                            <Form.Label>Telefone</Form.Label>
                            <Form.Control
                                type="tel"
                                placeholder="Telefone do usuário"
                                name="Telefone"
                                value={editandoProfissional?.Telefone || ""}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formRegistroProfissional">
                            <Form.Label>Registro Profissional</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Registro Profissional do usuário"
                                name="registroProfissional"
                                value={editandoProfissional?.registroProfissional || ""}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={fecharModalEditar}>Fechar</Button>
                    <Button variant="success" onClick={handleSalvar}>Salvar</Button>
                </Modal.Footer>
            </Modal>
        </section>
    );
}

export default ModalEditar;
