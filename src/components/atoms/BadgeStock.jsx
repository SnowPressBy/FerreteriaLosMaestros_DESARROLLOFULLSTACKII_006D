export const BadgeStock = ({ stock, umbralMinimo = 5 }) => {
  if (stock === 0) {
    return <span className="badge bg-danger">Sin Stock</span>;
  }
  if (stock <= umbralMinimo) {
    return <span className="badge bg-warning text-dark">Stock Crítico ({stock})</span>;
  }
  return <span className="badge bg-success">Disponible ({stock})</span>;
};