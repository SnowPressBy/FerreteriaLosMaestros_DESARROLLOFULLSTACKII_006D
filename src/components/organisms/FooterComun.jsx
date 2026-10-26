import { Link } from 'react-router-dom';

export default function FooterComun() {
  return (
    <footer className="divisor-footer pt-4 mt-4">
      <div className="row g-3">
        <div className="col-12 col-md-4">
          <div className="bloque-gris p-3 h-100">
            <div className="font-tech small fw-bold mb-1">FERRETERÍA LOS MAESTROS</div>
            <p className="small mb-0 text-secondary">
              Negocio familiar con 22 años de trayectoria en La Serena, Region de Coquimbo. Materiales de construcción, herramientas.
            </p>
            <p className="small mb-0 mt-2 text-secondary">Valores publicados incluyen IVA.</p>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="bloque-gris p-3 h-100">
            <div className="font-tech small fw-bold mb-1">SISTEMA - INDEX </div>
            <ul className="list-unstyled small mb-0 font-tech">
              <li><Link to="/" className="text-dark text-decoration-none">- Portada Principal</Link></li>
              <li><Link to="/productos" className="text-dark fw-bold text-decoration-none">- Catálogo y Pedidos</Link></li>
              <li><Link to="/admin" className="text-secondary text-decoration-none">- Gestión Interna</Link></li>
            </ul>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="bloque-gris p-3 h-100">
            <div className="font-tech small fw-bold mb-1">EGG</div>
            <p className="small mb-0 text-secondary">
              somos la mejor tienda online eComerce de ferreteria, no dudes en contactarnos para cualquier consulta, estamos para ayudarte.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
