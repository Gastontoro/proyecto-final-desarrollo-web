import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Spinner, Alert, Card } from 'react-bootstrap';
// Nota: Asegúrate que esta ruta a la API sea correcta
import { getRecetaById } from '../api/recetasApi'; 


const DetailPage = () => {
    // 1. Obtiene el ID de la URL
    const { id } = useParams(); 
    
    const [receta, setReceta] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReceta = async () => {
            setLoading(true);
            // 2. Llama a la API usando el ID
            const data = await getRecetaById(id); 

            if (data) {
                setReceta(data);
                setError(null);
            } else {
                setError("No se pudo encontrar la receta o hubo un error de conexión.");
            }
            setLoading(false);
        };

        if (id) {
            fetchReceta();
        }
    }, [id]); // Depende del ID de la URL

    if (loading) return (
        <Container className="text-center py-5">
            <Spinner animation="border" variant="primary" />
            <p>Cargando detalle...</p>
        </Container>
    );

    if (error) return (
        <Container className="py-5"><Alert variant="danger">{error}</Alert></Container>
    );

    return (
        <Container className="py-5">
            {/* 3. Muestra los detalles de la receta */}
            <Card className="p-4 shadow-lg">
                <Card.Title as="h1" className="text-primary">{receta.nombre}</Card.Title>
                <hr />
                <Card.Body>
                    <p><strong>Ingredientes:</strong> {receta.ingredientes}</p>
                    <p><strong>Pasos:</strong> {receta.pasos}</p>
                    {/* ... Puedes añadir más detalles aquí ... */}
                </Card.Body>
            </Card>
        </Container>
    );
};

export default DetailPage;