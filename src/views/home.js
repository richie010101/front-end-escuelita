import React from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';

const Home = () => {
  return (
    <Container className="text-center mt-5">
      <h2>Bienvenido</h2>
      <Row className="justify-content-center mt-4">
        <Col xs={12} sm={6} md={4} lg={3}>
          <Button variant="primary" href="/Alta" className="w-100 mb-3">
            Alta Alumnos
          </Button>
        </Col>
        <Col xs={12} sm={6} md={4} lg={3}>
          <Button variant="secondary" href="/Modificar" className="w-100 mb-3">
            Modificar Datos
          </Button>
        </Col>
        <Col xs={12} sm={6} md={4} lg={3}>
          <Button variant="success" href="/Ver" className="w-100 mb-3">
            Mis Alumnos
          </Button>
        </Col>
        <Col xs={12} sm={6} md={4} lg={3}>
          <Button variant="danger" href="/Baja" className="w-100 mb-3">
            Baja Alumnos
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
