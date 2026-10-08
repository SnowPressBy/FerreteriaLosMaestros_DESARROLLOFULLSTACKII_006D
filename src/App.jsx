import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Plantilla base (Template)
import { MainLayout } from './components/templates/MainLayout';

// Páginas (Pages)
import LoginPage from './pages/LoginPage';
import CatalogPage from './pages/CatalogPage';
import OrdersPage from './pages/OrdersPage';
import AccountStatusPage from './pages/AccountStatusPage';
import CoverageMapPage from './pages/CoverageMapPage';
import InventoryPage from './pages/InventoryPage';
import AdminUsersPage from './pages/AdminUsersPage';

// Componente para desarrollo: deja pasar directo a cualquier vista
const ProtectedRoute = ({ children }) => {
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
            <ProtectedRoute>
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
            <ProtectedRoute>
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
            <ProtectedRoute>
              <MainLayout>
                <OrdersPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* Cuenta corriente */}
        <Route
          path="/cuenta-corriente"
          element={
            <ProtectedRoute>
              <MainLayout>
                <AccountStatusPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* Gestión de Inventario */}
        <Route
          path="/inventario"
          element={
            <ProtectedRoute>
              <MainLayout>
                <InventoryPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* Panel de administración */}
        <Route
          path="/admin/usuarios"
          element={
            <ProtectedRoute>
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