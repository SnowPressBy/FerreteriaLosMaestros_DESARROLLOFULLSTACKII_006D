import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('CONTRATISTA');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (email && password) {
      localStorage.setItem('token', 'mock-jwt-token-12345');
      localStorage.setItem('role', role);
      localStorage.setItem('userEmail', email);

      if (role === 'VENDEDOR') {
        navigate('/inventario');
      } else {
        navigate('/');
      }
    } else {
      alert('Por favor ingresa usuario y contraseña');
    }
  };

  return (
    <div className="container min-vh-100 d-flex align-items-center justify-content-center py-4">
      <div className="row justify-content-center w-100">
        <div className="col-12 col-sm-10 col-md-8 col-lg-5 col-xl-4">
          <div className="card shadow border-0 rounded-3">
            <div className="card-body p-4 p-sm-5">
              <div className="text-center mb-4">
                <span className="badge bg-warning text-dark px-3 py-2 fs-6 mb-2">
                  Ferretería Los Maestros
                </span>
                <h3 className="fw-bold text-dark mt-2">Iniciar Sesión</h3>
                <p className="text-muted small">
                  Portal para maestros, contratistas y personal
                </p>
              </div>

              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label className="form-label small fw-semibold">Correo Electrónico</label>
                  <input
                    type="email"
                    className="form-control form-control-lg fs-6"
                    placeholder="usuario@correo.cl"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-semibold">Contraseña</label>
                  <input
                    type="password"
                    className="form-control form-control-lg fs-6"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label small fw-semibold">Rol de acceso (modo prueba):</label>
                  <select
                    className="form-select"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="CONTRATISTA">Contratista / Cliente Frecuente</option>
                    <option value="VENDEDOR">Vendedor / Empleado</option>
                    <option value="ADMIN">Administrador / Dueño</option>
                  </select>
                </div>

                <button type="submit" className="btn btn-warning text-dark fw-bold w-100 py-2 shadow-sm">
                  Ingresar
                </button>
              </form>
            </div>
          </div>
          <div className="text-center mt-3 text-muted small">
            Ferretería Los Maestros © 2026 - La Serena
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
