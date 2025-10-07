import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Alert } from 'react-bootstrap';
import { getRecetas, deleteReceta } from '../api/recetasApi';
import { Link, useNavigate } from 'react-router-dom';

const RecetaCard = ({ receta, onDelete }) => (
    <Card className="mb-3 shadow-sm">
        <Card.Body>
            <Card.Title className="text-primary">{receta.nombre}</Card.Title>
            <Card.Text>
                <p className="small text-muted mb-1">Ingredientes clave: {receta.ingredientes.substring(0, 50)}...</p>
            </Card.Text>
            <div className="d-flex justify-content-between align-items-center">
                <Button variant="outline-primary" as={Link} to={`/receta/${receta.id}`}>Ver Detalle</Button>
                <Button variant="danger" size="sm" onClick={() => onDelete(receta.id)}>Eliminar</Button>
            </div>
        </Card.Body>
    </Card>
);

const HomePage = () => {
  const [recetas, setRecetas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRecetas = async () => {
    setLoading(true);
    const data = await getRecetas();
    if (data) {
      setRecetas(data);
    } else {
      setError("Error al cargar las recetas.");
    }
    setLoading(false);
  };

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

  if (loading) return (
    <Container className="text-center py-5">
      <Spinner animation="border" variant="primary" />
      <p>Cargando recetas...</p>
    </Container>
  );

  if (error) return (
    <Container className="py-5"><Alert variant="danger">{error}</Alert></Container>
  );

     return (
        <>
            {/* ⬅️ AÑADE ESTO AQUÍ: El elemento que aplica el fondo */}
            <div className="homepage-background" aria-hidden="true"></div> 
            
            <Container className="py-5">
                <h1 className="display-4 text-center mb-5 text-primary">📚 Mi Libro de Recetas Personal 🍝</h1>
                
                {/* ... (Contenido del listado de recetas) ... */}
            </Container>
        </>
    );
};


export default HomePage;