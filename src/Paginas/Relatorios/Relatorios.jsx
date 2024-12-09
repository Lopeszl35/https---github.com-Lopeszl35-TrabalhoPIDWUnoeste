import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { FaCalendarCheck, FaUserInjured } from "react-icons/fa";
import { Link } from "react-router-dom";
import styles from "./Relatorios.module.css";

function Relatorios() {
  return (
    <Container className={styles.container}>
      <h1 className={`text-center my-4 ${styles.heading}`}>Relatórios</h1>
      <p className={`text-center ${styles.description}`}>
        Escolha um tipo de relatório para acessar dados detalhados.
      </p>
      <Row className="d-flex justify-content-center">
        {/* Relatório de Agendamentos */}
        <Col lg={4} md={6} className="mb-4">
          <Card className={`text-center ${styles.card}`}>
            <Card.Body>
              <FaCalendarCheck size={50} className="mb-3" />
              <Card.Title className={styles.title}>Relatórios de Agendamentos</Card.Title>
              <Card.Text className={styles.text}>
                Gere e visualize relatórios relacionados a agendamentos.
              </Card.Text>
              <Button as={Link} to="/RelatoriosAgendamento" variant="primary">
                Acessar
              </Button>
            </Card.Body>
          </Card>
        </Col>

        {/* Relatório de Pacientes */}
        <Col lg={4} md={6} className="mb-4">
          <Card className={`text-center ${styles.card}`}>
            <Card.Body>
              <FaUserInjured size={50} className="mb-3" />
              <Card.Title className={styles.title}>Relatórios de Pacientes</Card.Title>
              <Card.Text className={styles.text}>
                Gere e visualize relatórios detalhados sobre os pacientes.
              </Card.Text>
              <Button as={Link} to="/RelatoriosPacientes" variant="primary">
                Acessar
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Relatorios;
