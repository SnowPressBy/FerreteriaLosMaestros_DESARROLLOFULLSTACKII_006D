// src/components/templates/MainLayout.jsx
import { Navbar } from '../organisms/Navbar';

export const MainLayout = ({ children }) => {
  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Organismo: Barra de navegación responsiva con menú hamburguesa */}
      <Navbar />

      {/* Contenedor responsivo: fluido en móvil, con márgenes en escritorio */}
      <main className="container-fluid container-xl flex-grow-1 py-4">
        {children}
      </main>

      <footer className="bg-dark text-secondary py-3 text-center mt-auto">
        <div className="container">
          <small>© 2026 Ferretería Los Maestros - La Serena | Sistema de Pedidos y Stock</small>
        </div>
      </footer>
    </div>
  );
};