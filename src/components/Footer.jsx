import { Container } from 'react-bootstrap';

const Footer = () => {
  // 📝 Reemplaza estos placeholders con tus datos reales
  const nombre = "Gaston Matias Toro";
  const email = "matiasmh@gmail.com"
  const githubUrl = "URL de tu Repositorio de GitHub"; 

  return (
    <footer className="bg-dark text-white mt-5 p-3">
      <Container className="text-center">
        {/* Sección de Presentación del Proyecto */}
        <p className="mb-1 fw-bold">Gestor de Recetas | Proyecto Final - Desarrollo Web 🎓</p>
        
        {/* Sección de Datos Personales */}
        <div className="small mt-2">
            <p className="mb-0">👨‍💻 **Desarrollado por:** {nombre}</p>
            <p className="mb-0">📧 **Contacto:** {email}</p>
            <p className="mb-0">🔗 **Código Fuente:** <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="text-warning">Ver en GitHub</a></p>
        </div>

        <p className="small text-muted mt-3 mb-0">© {new Date().getFullYear()} Derechos Reservados.</p>
      </Container>
    </footer>
  );
};

export default Footer;