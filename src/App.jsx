import { Navigate, Route, Routes } from 'react-router-dom';
import Inicio from './pages/Inicio';
import Catalogo from './pages/Catalogo';
import Login from './pages/Login';
import Admin from './pages/Admin';
import { haySesion } from './utils/auth';

function RutaProtegida({ children }) {
  return haySesion() ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <div className="container py-3">
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/productos" element={<Catalogo />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <RutaProtegida>
              <Admin />
            </RutaProtegida>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
