import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';

const AltaAlumno = () => {
    const [data, setData] = useState({ alumnos: [], materias: [] });
    const [selectedAlumno, setSelectedAlumno] = useState('');
    const [selectedMateria, setSelectedMateria] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log(`${process.env.REACT_APP_API_BASE_URL}/VerAlumnosRegistrar`);
                
                const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/VerAlumnosRegistrar`); // Reemplaza con la ruta real de tu API
                setData(response.data);
            } catch (error) {
                console.error('Error al obtener los datos:', error);
            }
        };

        fetchData();
    }, []);

    const handleAlumnoChange = (e) => {
        setSelectedAlumno(e.target.value);
    };

    const handleMateriaChange = (e) => {
        setSelectedMateria(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (selectedAlumno && selectedMateria) {
            try {
                const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/AgregarAlumnoMateria`, {
                    idAlumno: selectedAlumno,
                    idMateria: selectedMateria
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                alert(response.data.msg);
                

            } catch (error) {
                console.error('Error al agregar el alumno a la materia:', error);
                alert(error.response?.data?.msg || 'Hubo un error al agregar el alumno a la materia');
            }
        } else {
            alert('Por favor selecciona un alumno y una materia.');
        }
    };

    return (
        <Container className="mt-5">
            <h3 className="text-center mb-4">Dar de alta alumnos</h3>

            <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Col xs={12} md={6}>
                        <Form.Group controlId="formAlumno">
                            <Form.Label>Seleccionar Alumno:</Form.Label>
                            <Form.Control
                                as="select"
                                value={selectedAlumno}
                                onChange={handleAlumnoChange}
                                required
                            >
                                <option value="" disabled>Seleccione un alumno</option>
                                {data.alumnos.map(alumno => (
                                    <option key={alumno.Id} value={alumno.Id}>
                                        {alumno.Nombre} {alumno.Apellido}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Col>

                    <Col xs={12} md={6}>
                        <Form.Group controlId="formMateria">
                            <Form.Label>Seleccionar Materia:</Form.Label>
                            <Form.Control
                                as="select"
                                value={selectedMateria}
                                onChange={handleMateriaChange}
                                required
                            >
                                <option value="" disabled>Seleccione una materia</option>
                                {data.materias.map(materia => (
                                    <option key={materia.id} value={materia.id}>
                                        {materia.Materia}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>

                <Button variant="primary" type="submit">
                    Agregar Alumno a Materia
                </Button>
            </Form>
        </Container>
    );
};

export default AltaAlumno;
