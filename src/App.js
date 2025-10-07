import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CustomNavbar from './components/Navbar';
import Footer from './components/Footer';

// Importar las Vistas/Páginas
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import FormPage from './pages/FormPage';

const App = () => {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <CustomNavbar />
        <main className="flex-grow-1">
          <Routes>
            {/* Ruteo Estático: Página Principal/Listado */}
            <Route path="/" element={<HomePage />} />

            {/* Ruteo Estático: Página de Creación */}
            <Route path="/crear" element={<FormPage isEdit={false} />} />

            {/* Ruteo Dinámico: Página de Edición */}
            <Route path="/editar/:id" element={<FormPage isEdit={true} />} />

            {/* Ruteo Dinámico: Página de Detalle */}
            <Route path="/receta/:id" element={<DetailPage />} />

            {/* Opcional: Ruta para 404 */}
            <Route path="*" element={<h1 className="text-center mt-5">404 - Página no encontrada</h1>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;