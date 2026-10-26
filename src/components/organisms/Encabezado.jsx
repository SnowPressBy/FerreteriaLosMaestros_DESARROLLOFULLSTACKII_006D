import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { cerrarSesion, usuarioActual } from '../../utils/auth';
import Logo from '../atoms/Logo';

export default function Encabezado({ etiqueta, children }) {
  const [abierto, setAbierto] = useState(false);
  const navigate = useNavigate();
  const usuario = usuarioActual();

  const salir = () => {
    cerrarSesion();
    navigate('/');
  };

  return (
    <header className="divisor-seccion pb-4 mb-4">
      <div className="row g-2 mb-2 align-items-center">
        <div className="col-12 col-md-6">
          <div className="bg-dark text-white px-2 py-1 font-tech small">{etiqueta}</div>
        </div>
        <div className="col-12 col-md-6 d-flex justify-content-md-end align-items-center gap-3 flex-wrap">
          {usuario ? (
            <>
              <span className="font-tech small text-secondary">SESIÓN: {usuario.toUpperCase()}</span>
              <Link to="/admin" className="font-tech small text-dark fw-bold text-decoration-none border-bottom border-dark">
                PANEL ADMIN
              </Link>
              <button type="button" className="btn btn-link btn-sm p-0 font-tech text-dark" onClick={salir}>
                SALIR
              </button>
            </>
          ) : (
            <Link to="/login" className="font-tech small text-dark fw-bold text-decoration-none border-bottom border-dark">
              ACCESO INTRANET
            </Link>
          )}
        </div>
      </div>

      <div className="row g-3 align-items-stretch">
        <div className="col-12 col-md-4">
          <Link to="/" className="text-decoration-none text-dark bloque-gris p-3 h-100 d-flex flex-column justify-content-center">
            <Logo />
          </Link>
        </div>

        <div className="col-12 col-md-8">
          <div className="bloque-gris p-3 h-100 d-flex flex-wrap justify-content-between align-items-center gap-3">
            <button
              className="btn-hamburguesa"
              type="button"
              aria-expanded={abierto}
              aria-controls="menuPrincipal"
              aria-label="Abrir menú"
              onClick={() => setAbierto((v) => !v)}
            >
              &#9776; Menú
            </button>
            <nav id="menuPrincipal" className={`menu-colapsable ${abierto ? 'abierto' : ''}`}>
              <Link to="/" className="btn-industrial" onClick={() => setAbierto(false)}>Inicio</Link>
              <Link to="/productos" className="btn-industrial-naranja" onClick={() => setAbierto(false)}>Catálogo y Stock en Línea</Link>
              {!usuario && (
                <Link to="/login" className="btn-industrial-outline" onClick={() => setAbierto(false)}>Ingresar</Link>
              )}
            </nav>
            <div className="font-tech small text-md-end">
              <div>ATENCIÓN PARTICULARES Y CONTRATISTAS</div>
              <strong>RESERVA EN LÍNEA SIN LLAMAR</strong>
            </div>
            {children && <div className="w-100">{children}</div>}
          </div>
        </div>
      </div>
    </header>
  );
}
