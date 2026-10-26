import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Encabezado from '../components/organisms/Encabezado';
import FooterComun from '../components/organisms/FooterComun';
import { haySesion, iniciarSesion } from '../utils/auth';

export default function Login() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');
  const [error, setError] = useState('');

  if (haySesion()) return <Navigate to="/admin" replace />;

  const enviar = (e) => {
    e.preventDefault();
    if (!usuario.trim() || !clave) {
      setError('Ingresa usuario y contraseña.');
      return;
    }
    if (iniciarSesion(usuario, clave)) {
      navigate('/admin');
    } else {
      setError('Usuario o contraseña incorrectos.');
    }
  };

  return (
    <>
      <Encabezado etiqueta="SECCIÓN: ACCESO INTRANET" />

      <main className="row justify-content-center">
        <div className="col-12 col-md-6 col-lg-4">
          <form className="bloque-gris p-4" onSubmit={enviar} noValidate>
            <div className="font-tech small fw-bold mb-3">INICIO DE SESIÓN // ADMINISTRACIÓN</div>

            <label htmlFor="usuario" className="form-label small fw-bold">Usuario</label>
            <input
              id="usuario"
              type="text"
              className="form-control border-dark mb-3"
              autoComplete="username"
              value={usuario}
              onChange={(e) => { setUsuario(e.target.value); setError(''); }}
            />

            <label htmlFor="clave" className="form-label small fw-bold">Contraseña</label>
            <input
              id="clave"
              type="password"
              className="form-control border-dark mb-3"
              autoComplete="current-password"
              value={clave}
              onChange={(e) => { setClave(e.target.value); setError(''); }}
            />

            {error && <div className="alert alert-danger py-2 small" role="alert">{error}</div>}

            <button type="submit" className="btn-industrial w-100">Ingresar</button>
          </form>
        </div>
      </main>

      <FooterComun />
    </>
  );
}
