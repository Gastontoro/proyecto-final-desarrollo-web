import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CustomNavbar from './components/Navbar';
import Footer from './components/Footer';

// Importar las Vistas/Páginas
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import FormPage from './pages/FormPage';
import RecetasGuardadasPage from './pages/RecetasGuardadasPage'; // Asegúrate de que exista y esté importado

const App = () => {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <CustomNavbar />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/guardadas" element={<RecetasGuardadasPage />} /> {/* Rutas de Recetas Guardadas */}
            <Route path="/crear" element={<FormPage isEdit={false} />} />
            <Route path="/editar/:id" element={<FormPage isEdit={true} />} />
            <Route path="/receta/:id" element={<DetailPage />} />
            <Route path="*" element={<h1 className="text-center mt-5">404 - Página no encontrada</h1>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;