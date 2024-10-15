import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Form, Button, Spinner } from 'react-bootstrap';

const Modificar = () => {
    const [maestro, setMaestro] = useState({
        Nombre: '',
        Apellido: '',
        Telefono: '',
        Direccion: '',
        Correo: ''
    });
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchMaestroData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/ObtenerDatosMaestro`, {
                    params: { id: 1 } 
                });
                setMaestro(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error al obtener los datos del maestro:', error);
                setIsLoading(false);
            }
        };

        fetchMaestroData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMaestro((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/ModificarMaestro`, {
                id: 1, 
                ...maestro
            });

            alert(response.data.msg);
        } catch (error) {
            console.error('Error al modificar los datos del maestro:', error);
            alert('Hubo un error al modificar los datos del maestro');
        } finally {
            setIsSubmitting(false);
        }
    };

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
            <h3 className="text-center mb-4">Modificar mis datos</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formNombre">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                        type="text"
                        name="Nombre"
                        value={maestro.Nombre}
                        onChange={handleChange}
                        placeholder="Ingrese su nombre"
                    />
                </Form.Group>
                <Form.Group controlId="formApellido">
                    <Form.Label>Apellido</Form.Label>
                    <Form.Control
                        type="text"
                        name="Apellido"
                        value={maestro.Apellido}
                        onChange={handleChange}
                        placeholder="Ingrese su apellido"
                    />
                </Form.Group>
                <Form.Group controlId="formTelefono">
                    <Form.Label>Teléfono</Form.Label>
                    <Form.Control
                        type="text"
                        name="Telefono"
                        value={maestro.Telefono}
                        onChange={handleChange}
                        placeholder="Ingrese su teléfono"
                    />
                </Form.Group>
                <Form.Group controlId="formDireccion">
                    <Form.Label>Dirección</Form.Label>
                    <Form.Control
                        type="text"
                        name="Direccion"
                        value={maestro.Direccion}
                        onChange={handleChange}
                        placeholder="Ingrese su dirección"
                    />
                </Form.Group>
                <Form.Group controlId="formCorreo">
                    <Form.Label>Correo</Form.Label>
                    <Form.Control
                        type="email"
                        name="Correo"
                        value={maestro.Correo}
                        onChange={handleChange}
                        placeholder="Ingrese su correo"
                    />
                </Form.Group>
                <Button 
                    variant="primary" 
                    type="submit" 
                    disabled={isSubmitting} 
                    className="w-100 mt-3"
                >
                    {isSubmitting ? 'Actualizando...' : 'Actualizar Datos'}
                </Button>
            </Form>
        </Container>
    );
};

export default Modificar;
