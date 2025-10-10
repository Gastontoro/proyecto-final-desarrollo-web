import { Navbar as BNavbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// RUTA CORREGIDA: Asume que moviste la imagen a src/assets/
import logo from '../assets/logogenerico.jpeg'; 
// Si la imagen está directamente en src/, la ruta original '../logogenerico.jpeg' debería funcionar.

const CustomNavbar = () => {
  return (
    <BNavbar bg="light" expand="lg" className="shadow-sm">
      <Container>
        <BNavbar.Brand as={Link} to="/">
          {/* Se inserta la imagen del logo aquí, ajustando el estilo en index.css */}
          <img
            src={logo} 
            alt="Dosan Inversiones - Gestor de Recetas"
            className="d-inline-block align-top"
          />
        </BNavbar.Brand>
        <BNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">Recetas</Nav.Link>
            <Nav.Link as={Link} to="/crear" className="btn btn-primary text-black">
              ➕ Nueva Receta
            </Nav.Link>
          </Nav>
        </BNavbar.Collapse>
      </Container>
    </BNavbar>
  );
};

export default CustomNavbar;