import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Container, Table, Button } from 'react-bootstrap';

const Baja = () => {
    const [alumnos, setAlumnos] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/VerMisAlumnos`);
                setAlumnos(response.data.datos);
            } catch (error) {
                console.error('Error al obtener los alumnos:', error);
            }
        };

        fetchData();
    }, []);

    const handleEliminar = async (idAlumno, idMateria) => {
        console.log(`Eliminando Alumno ID: ${idAlumno} de Materia ID: ${idMateria}`); 

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/EliminarAlumnoMateria`, {
                idAlumno,
                idMateria
            });

            console.log('Resultado de la eliminación:', response.data); 
            alert(response.data.msg);

           
            setAlumnos(alumnos.filter(alumno => 
                !(alumno.idAlumno === idAlumno && alumno.idMateria === idMateria)
            ));
        } catch (error) {
            console.error('Error al eliminar el alumno de la materia:', error);
        }
    };

    return (
        <Container className="mt-5">
            <h3 className="text-center mb-4">Baja de Alumnos</h3>
            
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Alumno</th>
                        <th>Materia</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {alumnos.map((alumno) => (
                        <tr key={`${alumno.idAlumno}-${alumno.idMateria}`}>
                            <td>{alumno.Alumno}</td>
                            <td>{alumno.Materia}</td>
                            <td>
                                <Button 
                                    variant="danger" 
                                    onClick={() => handleEliminar(alumno.idAlumno, alumno.idMateria)}
                                >
                                    Eliminar
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default Baja;
