import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Link, useOutletContext } from 'react-router-dom';
import CurrencyInput from 'react-currency-input-field';
import { Container, Card, Alert } from 'react-bootstrap';
import { FaRegSave, FaArrowLeft, FaCheckCircle } from 'react-icons/fa';
import { useState } from 'react';

function MateriaisNovo() {
    const { show } = useOutletContext();

    const [showMensagem, setShowMensagem] = useState(false);
    const [validated, setValidated] = useState(false);
    const [descricao, setDescricao] = useState('');
    const [dataCadastro, setDataCadastro] = useState('');
    const [preco, setPreco] = useState('');
    const [nomeMaterial, setNomeMaterial] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [fornecedor, setFornecedor] = useState('');
    const [errors, setErrors] = useState({});

    const handleDescricaoChange = (e) => {
        const value = e.target.value;
        setDescricao(value);
        if (value && value.length <= 100) {
            setErrors((prev) => ({ ...prev, descricao: null }));
        } else {
            if (value === '') {
                setErrors((prev) => ({ ...prev, descricao: 'O campo descrição é obrigatório' }));
            } else {
                setErrors((prev) => ({ ...prev, descricao: 'A descrição deve ter no máximo 100 caracteres' }));
            }
        }
    };

    const handleDataCadastroChange = (e) => {
        const value = e.target.value;
        setDataCadastro(value);
        if (value && new Date(value) <= new Date()) {
            setErrors((prev) => ({ ...prev, dataCadastro: null }));
        } else {
            if (value === '') {
                setErrors((prev) => ({ ...prev, dataCadastro: 'A data de cadastro é obrigatória' }));
            } else {
                setErrors((prev) => ({ ...prev, dataCadastro: 'Não é permitido uma data de cadastro futura' }));
            }
        }
    };

    const handlePrecoChange = (value) => {
        setPreco(value);
        if (value && parseFloat(value.replace('R$', '').replace(',', '.')) > 0) {
            setErrors((prev) => ({ ...prev, preco: null }));
        } else {
            setErrors((prev) => ({ ...prev, preco: 'O preço é obrigatório e deve ser maior que zero' }));
        }
    };

    const handleNomeMaterialChange = (e) => {
        const value = e.target.value;
        setNomeMaterial(value);
        if (value && value.length <= 100) {
            setErrors((prev) => ({ ...prev, nomeMaterial: null }));
        } else {
            if (value === '') {
                setErrors((prev) => ({ ...prev, nomeMaterial: 'O campo nome do material é obrigatório' }));
            } else {
                setErrors((prev) => ({ ...prev, nomeMaterial: 'O nome do material deve ter no máximo 100 caracteres' }));
            }
        }
    };

    const handleQuantidadeChange = (e) => {
        const value = e.target.value;
        setQuantidade(value);
        if (value && parseInt(value) > 0) {
            setErrors((prev) => ({ ...prev, quantidade: null }));
        } else {
            if (value === '') {
                setErrors((prev) => ({ ...prev, quantidade: 'O campo quantidade é obrigatório' }));
            } else {
                setErrors((prev) => ({ ...prev, quantidade: 'A quantidade deve ser um número positivo' }));
            }
        }
    };

    const handleFornecedorChange = (e) => {
        const value = e.target.value;
        setFornecedor(value);
        if (value && value.length <= 100) {
            setErrors((prev) => ({ ...prev, fornecedor: null }));
        } else {
            if (value === '') {
                setErrors((prev) => ({ ...prev, fornecedor: 'O campo fornecedor é obrigatório' }));
            } else {
                setErrors((prev) => ({ ...prev, fornecedor: 'O nome do fornecedor deve ter no máximo 100 caracteres' }));
            }
        }
    };

    function validarForm(event) {
        event.preventDefault();
        const form = event.currentTarget;
        let newErrors = {};

        if (form.checkValidity() === false) {
            event.stopPropagation();
        }

        if (!descricao) {
            newErrors.descricao = 'O campo descrição é obrigatório';
        } else if (descricao.length > 100) {
            newErrors.descricao = 'A descrição deve ter no máximo 100 caracteres';
        }

        if (!dataCadastro) {
            newErrors.dataCadastro = 'A data de cadastro é obrigatória';
        } else if (new Date(dataCadastro) > new Date()) {
            newErrors.dataCadastro = 'Não é permitido uma data de cadastro futura';
        }

        if (!preco || parseFloat(preco.replace('R$', '').replace(',', '.')) <= 0) {
            newErrors.preco = 'O preço é obrigatório e deve ser maior que zero';
        }

        if (!nomeMaterial) {
            newErrors.nomeMaterial = 'O campo nome do material é obrigatório';
        } else if (nomeMaterial.length > 100) {
            newErrors.nomeMaterial = 'O nome do material deve ter no máximo 100 caracteres';
        }

        if (!quantidade || parseInt(quantidade) <= 0) {
            newErrors.quantidade = 'A quantidade deve ser um número positivo';
        }

        if (!fornecedor) {
            newErrors.fornecedor = 'O campo fornecedor é obrigatório';
        } else if (fornecedor.length > 100) {
            newErrors.fornecedor = 'O nome do fornecedor deve ter no máximo 100 caracteres';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            const material = {
                id: 0,
                nome: nomeMaterial,
                quantidade: quantidade,
                descricao: descricao,
                dataCadastro: dataCadastro,
                fornecedor: fornecedor,
                preco: preco
            };

            const listaSalva = localStorage.getItem('materiais');
            const materiais = listaSalva == null ? [] : JSON.parse(listaSalva);
            material.id = materiais.length + 1;
            materiais.push(material);
            localStorage.setItem('materiais', JSON.stringify(materiais));

            setShowMensagem(true);
        }

        setValidated(true);
    }

    return (
        <>
            <Container>
                <Card className={`container-add-material ${show ? 'side-active-add-material' : ''}`}>
                    <Card.Header>
                        <h3>Adicionar Material</h3>
                    </Card.Header>
                    <Card.Body>
                        <Form noValidate validated={validated} onSubmit={validarForm}>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="nomeMaterial">
                                    <Form.Label className='fw-bold'>Nome do Material</Form.Label>
                                    <Form.Control type="text" placeholder="Material" id='nomeMaterial'
                                        required
                                        value={nomeMaterial}
                                        onChange={handleNomeMaterialChange}
                                        isInvalid={!!errors.nomeMaterial} />
                                    <Form.Control.Feedback type='invalid'>{errors.nomeMaterial}</Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group as={Col} controlId="quantidade">
                                    <Form.Label className='fw-bold'>Quantidade</Form.Label>
                                    <Form.Control type="number" placeholder="Quantidade" id='quantidade'
                                        required
                                        value={quantidade}
                                        onChange={handleQuantidadeChange}
                                        isInvalid={!!errors.quantidade} />
                                    <Form.Control.Feedback type='invalid'>{errors.quantidade}</Form.Control.Feedback>
                                </Form.Group>
                            </Row>

                            <Form.Group className="mb-3" controlId="descricao">
                                <Form.Label className='fw-bold'>Descrição</Form.Label>
                                <Form.Control type="text" placeholder="Descrição" id='descricao'
                                    required
                                    value={descricao}
                                    onChange={handleDescricaoChange}
                                    isInvalid={!!errors.descricao} />
                                <Form.Control.Feedback type='invalid'>{errors.descricao}</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="fornecedor">
                                <Form.Label className='fw-bold'>Fornecedor</Form.Label>
                                <Form.Control placeholder="Fornecedor" id='fornecedor'
                                    required
                                    value={fornecedor}
                                    onChange={handleFornecedorChange}
                                    isInvalid={!!errors.fornecedor} />
                                <Form.Control.Feedback type='invalid'>{errors.fornecedor}</Form.Control.Feedback>
                            </Form.Group>

                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="preco">
                                    <Form.Label className='fw-bold'>Preço</Form.Label>
                                    <CurrencyInput
                                        id="preco"
                                        name="preco"
                                        placeholder="R$"
                                        prefix="R$"
                                        decimalsLimit={2}
                                        allowNegativeValue={false}
                                        required
                                        className="form-control"
                                        value={preco}
                                        onValueChange={handlePrecoChange}
                                        isInvalid={!!errors.preco} />
                                    <Form.Control.Feedback type='invalid'>{errors.preco}</Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group as={Col} controlId="dataCadastro">
                                    <Form.Label className='fw-bold'>Data Cadastro</Form.Label>
                                    <Form.Control type="date" placeholder="Data Cadastro" id='dataCadastro'
                                        required
                                        value={dataCadastro}
                                        onChange={handleDataCadastroChange}
                                        isInvalid={!!errors.dataCadastro} />
                                    <Form.Control.Feedback type='invalid'>{errors.dataCadastro}</Form.Control.Feedback>
                                </Form.Group>
                            </Row>

                            <div className="d-flex justify-content-end">
                                <Link to={'/materiais'}>
                                    <Button variant="secondary" className='me-2'>
                                        <FaArrowLeft className='me-2' />
                                        Voltar
                                    </Button>
                                </Link>
                                <Button variant="success" type="submit">
                                    <FaRegSave className='me-2' />
                                    Salvar
                                </Button>
                            </div>
                        </Form>
                    </Card.Body>
                <Alert show={showMensagem} variant="success" className='mt-3' dismissible onClose={() => setShowMensagem(false)}>
                    <Alert.Heading>
                        <FaCheckCircle className='me-2' />
                        Material salvo com sucesso!
                    </Alert.Heading>
                </Alert>
                </Card>

            </Container>
        </>
    );
}

export default MateriaisNovo;
