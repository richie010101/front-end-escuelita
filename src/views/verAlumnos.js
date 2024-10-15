import React, { useState, useEffect } from 'react';
import { Container, Table, Spinner } from 'react-bootstrap';

const VerAlumno = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
       
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/VerMisAlumnos`); // Reemplaza con la ruta real de tu API
                const json = await response.json();
                setData(json.datos);
            } catch (error) {
                console.error('Error al obtener los datos de los alumnos:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    if (isLoading) {
        return (
            <Container className="text-center mt-5">
                <Spinner animation="border" />
                <p>Cargando...</p>
            </Container>
        );
    }

    return (
        <Container className="mt-5">
            <h3 className="text-center mb-4">Mis Alumnos en cruz azul</h3>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Materia</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{item.Alumno}</td>
                            <td>{item.Apellido}</td>
                            <td>{item.Materia}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default VerAlumno;
