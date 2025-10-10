import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// 👈 RUTA CORREGIDA: Esto soluciona el error de compilación.
import { getRecetas, deleteReceta } from './../api/recetasApi'; 


// Componente que renderiza cada tarjeta de receta
const RecetaCard = ({ receta, onDelete }) => (
    <Card className="mb-3 shadow-sm">
        <Card.Body>
            <Card.Title className="text-primary">{receta.nombre}</Card.Title>
            <Card.Text>
                {/* Usamos el operador ?. para evitar errores si ingredientes es nulo */}
                <p className="small text-muted mb-1">Ingredientes clave: {receta.ingredientes?.substring(0, 50)}...</p>
            </Card.Text>
            <div className="d-flex justify-content-between align-items-center">
                <Button variant="outline-primary" as={Link} to={`/receta/${receta.id}`}>Ver Detalle</Button>
                <Button variant="danger" size="sm" onClick={() => onDelete(receta.id)}>Eliminar</Button>
            </div>
        </Card.Body>
    </Card>
);


// Componente principal de la página de Recetas Guardadas (Muestra el Listado)
const RecetasGuardadasPage = () => {
    const [recetas, setRecetas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchRecetas = async () => {
        setLoading(true);
        
        // Llama a la API para obtener las recetas
        const data = await getRecetas(); 

        if (data && Array.isArray(data)) {
            if (data.length > 0) {
                setRecetas(data);
                setError(null);
            } else {
                // Si la API devuelve un array vacío
                setError("No tienes recetas guardadas para mostrar. ¡Crea una!");
                setRecetas([]); 
            }
        } else {
             // Si hay un error de conexión o la respuesta no es un array
            setError("Error al cargar las recetas. Revisa la conexión con la API/Firebase.");
            setRecetas([]);
        }
        setLoading(false);
    };

    // Cargar recetas al montar el componente
    useEffect(() => {
        fetchRecetas();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar esta receta?')) {
            const success = await deleteReceta(id);
            if (success) {
                alert('Receta eliminada con éxito.');
                fetchRecetas(); // Recargar la lista
            } else {
                alert('No se pudo eliminar la receta.');
            }
        }
    };

    // Muestra Spinner mientras carga
    if (loading) return (
        <Container className="text-center py-5">
            <Spinner animation="border" variant="primary" />
            <p>Cargando recetas...</p>
        </Container>
    );

    // Renderizado del contenido
    return (
        <Container className="py-5">
            <h1 className="display-4 text-center mb-5 text-primary">
                Mis Recetas Guardadas
            </h1> 
            
            {/* Muestra el mensaje de error o info */}
            {error && (
                <Alert variant={recetas.length === 0 ? "info" : "danger"} className="text-center">
                    {error}
                </Alert>
            )}

            {/* Mapea y muestra las tarjetas de recetas */}
            <Row>
                {recetas.map(receta => (
                    <Col md={6} lg={4} key={receta.id}>
                        <RecetaCard receta={receta} onDelete={handleDelete} />
                    </Col>
                ))}
            </Row>

        </Container>
    );
};


export default RecetasGuardadasPage;