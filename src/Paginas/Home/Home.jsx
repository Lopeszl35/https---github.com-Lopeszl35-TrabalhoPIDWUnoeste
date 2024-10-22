import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { FaFileCsv, } from "react-icons/fa";
import { MdOutlineMedicalServices } from "react-icons/md";
import { TbUserHeart } from "react-icons/tb";
import { LiaUserLockSolid, } from "react-icons/lia";
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
    return (
        <div className="container-home">
            <Container>
                <Row className="mt-5">
                    <Col>
                        <h1>Bem-vindo ao Sistema da <span className="text-warning">CareConnect</span></h1>
                        <p>Escolha uma das opções abaixo para começar:</p>
                    </Col>
                </Row>
                <Row className="rows">
                    <Col lg='4' className="mb-4">
                        <Card className='text-center'>
                            <Card.Body>
                                <TbUserHeart size={50} />
                                <Card.Title>Pacientes</Card.Title>
                                <Card.Text>
                                    Visualize e gerencie os pacientes do sistema.
                                </Card.Text>
                                <Button as={Link} to='/pacientes' variant="primary">Acessar</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col lg='4' className="mb-4">
                        <Card className='text-center'>
                            <Card.Body>
                                <LiaUserLockSolid size={50} />
                                <Card.Title>Profissionais</Card.Title>
                                <Card.Text>
                                    Visualize e gerencie os Profissionais da instituição.
                                </Card.Text>
                                <Button as={Link} to='/Profissionais' variant="primary">Acessar</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row className="mt-4 rows">
                    <Col lg='4' className="mb-4">
                        <Card className="text-center">
                            <Card.Body>
                                <MdOutlineMedicalServices size={50} />
                                <Card.Title>Áreas de Serviços</Card.Title>
                                <Card.Text>
                                    Visualize e gerencie os serviços cadastrados.
                                </Card.Text>
                                <Button as={Link} to='/servicos' variant="primary">Acessar</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col lg='4' className="mb-4">
                        <Card className="text-center">
                            <Card.Body>
                                <FaFileCsv size={50} />
                                <Card.Title>Gerar Relatórios</Card.Title>
                                <Card.Text>
                                    Gere relatórios dos serviços oferecidos.
                                </Card.Text>
                                <Button as={Link} to='/relatorios' variant="primary">Gerar</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Home;
