import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Card, Spinner, Alert, ListGroup, Button } from 'react-bootstrap';
import { getRecetaById } from '../api/recetasApi';

const DetailPage = () => {
  const { id } = useParams(); // Obtener el ID de la URL
  const [receta, setReceta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReceta = async () => {
      setLoading(true);
      const data = await getRecetaById(id);
      if (data) {
        setReceta(data);
      } else {
        setError("Receta no encontrada.");
      }
      setLoading(false);
    };

    if (id) {
      fetchReceta();
    }
  }, [id]);

  if (loading) return (
    <Container className="text-center py-5">
      <Spinner animation="border" variant="primary" />
      <p>Cargando receta...</p>
    </Container>
  );

  if (error) return (
    <Container className="py-5"><Alert variant="danger">{error}</Alert></Container>
  );

  if (!receta) return (
    <Container className="py-5"><Alert variant="warning">No hay datos de la receta.</Alert></Container>
  );

  return (
    <Container className="py-5">
      <Card className="shadow-lg">
        <Card.Header as="h2" className="bg-primary text-white text-center">{receta.nombre}</Card.Header>
        <Card.Body>
          <p className="lead mb-4">✍️ **Autor/Fuente:** {receta.autor || 'Desconocido'}</p>
          
          <h4>Ingredientes:</h4>
          <p className="text-muted">{receta.ingredientes}</p>

          <h4 className="mt-4">Instrucciones:</h4>
          <div style={{ whiteSpace: 'pre-wrap' }}>
            {receta.instrucciones}
          </div>

        </Card.Body>
        <Card.Footer className="d-flex justify-content-between">
            <Button variant="secondary" as={Link} to="/">Volver al Listado</Button>
            <Button variant="warning" as={Link} to={`/editar/${receta.id}`}>Editar Receta</Button>
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default DetailPage;