import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { FaListAlt, FaFileCsv, FaPlus } from "react-icons/fa";
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
    return (
        <div className="container-home">
            <Container>
                <Row className="mt-5">
                    <Col>
                        <h1>Bem-vindo ao Sistema de Gestão de Materiais</h1>
                        <p>Escolha uma das opções abaixo para começar:</p>
                    </Col>
                </Row>
                <Row className="mt-4">
                    <Col lg='4' className="mb-4">
                        <Card className="text-center">
                            <Card.Body>
                                <FaListAlt size={50} />
                                <Card.Title>Materiais Cadastrados</Card.Title>
                                <Card.Text>
                                    Visualize e gerencie os materiais cadastrados.
                                </Card.Text>
                                <Button as={Link} to='/materiais' variant="primary">Acessar</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col lg='4' className="mb-4">
                        <Card className="text-center">
                            <Card.Body>
                                <FaPlus size={50} />
                                <Card.Title>Cadastrar Material</Card.Title>
                                <Card.Text>
                                    Adicione novos materiais ao sistema.
                                </Card.Text>
                                <Button as={Link} to='/materiais/cadastro' variant="success">Cadastrar</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col lg='4' className="mb-4">
                        <Card className="text-center">
                            <Card.Body>
                                <FaFileCsv size={50} />
                                <Card.Title>Gerar Relatórios</Card.Title>
                                <Card.Text>
                                    Gere relatórios dos materiais cadastrados.
                                </Card.Text>
                                <Button as={Link} to='/relatorios' variant="info">Gerar</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Home;
