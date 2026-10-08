import React from 'react';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container-fluid container-xl">
        <Link className="navbar-brand fw-bold text-warning" to="/">
          Ferretería Los Maestros
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">Catálogo</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/cobertura">Mapa Despacho</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/pedidos">Mis Pedidos</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/cuenta-corriente">Cuenta Corriente</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/inventario">Inventario</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link btn btn-outline-warning btn-sm ms-lg-2 text-warning px-3" to="/login">
                Iniciar Sesión
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};