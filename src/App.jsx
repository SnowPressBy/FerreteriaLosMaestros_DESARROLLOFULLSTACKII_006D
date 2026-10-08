import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Plantilla base (Template)
import { MainLayout } from './components/templates/MainLayout';

// Páginas (Pages)
// Nota: Puedes crear componentes temporales en src/pages/ mientras armas cada uno
import LoginPage from './pages/LoginPage';
import CatalogPage from './pages/CatalogPage';
import OrdersPage from './pages/OrdersPage';
import AccountStatusPage from './pages/AccountStatusPage';
import CoverageMapPage from './pages/CoverageMapPage';
import InventoryPage from './pages/InventoryPage';
import AdminUsersPage from './pages/AdminUsersPage';

// Componente para proteger rutas según token y rol
const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role'); // 'ADMIN', 'VENDEDOR', 'CONTRATISTA'

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta pública: Login */}
        <Route path="/login" element={<LoginPage />} />

        {/* Rutas con Template Principal (MainLayout) */}
        <Route
          path="/"
          element={
            <ProtectedRoute allowedRoles={['ADMIN', 'VENDEDOR', 'CONTRATISTA']}>
              <MainLayout>
                <CatalogPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* Mapa de cobertura de despacho */}
        <Route
          path="/cobertura"
          element={
            <ProtectedRoute allowedRoles={['ADMIN', 'VENDEDOR', 'CONTRATISTA']}>
              <MainLayout>
                <CoverageMapPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* Pedidos / Carrito */}
        <Route
          path="/pedidos"
          element={
            <ProtectedRoute allowedRoles={['ADMIN', 'VENDEDOR', 'CONTRATISTA']}>
              <MainLayout>
                <OrdersPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* Cuenta corriente (Solo Contratistas y Administrador) */}
        <Route
          path="/cuenta-corriente"
          element={
            <ProtectedRoute allowedRoles={['ADMIN', 'CONTRATISTA']}>
              <MainLayout>
                <AccountStatusPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* Gestión de Inventario (Solo Vendedor y Administrador) */}
        <Route
          path="/inventario"
          element={
            <ProtectedRoute allowedRoles={['ADMIN', 'VENDEDOR']}>
              <MainLayout>
                <InventoryPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* Panel de administración (Solo Administrador) */}
        <Route
          path="/admin/usuarios"
          element={
            <ProtectedRoute allowedRoles={['ADMIN']}>
              <MainLayout>
                <AdminUsersPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* Redirección por defecto */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;