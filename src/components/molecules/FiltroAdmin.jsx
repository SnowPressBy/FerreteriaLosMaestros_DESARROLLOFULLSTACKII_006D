export default function FiltroAdmin({
  busqueda,
  onBusqueda,
  categoria,
  onCategoria,
  estado,
  onEstado,
  categorias,
}) {
  return (
    <div className="row g-2 mb-3">
      <div className="col-12 col-md-5">
        <input
          type="text"
          className="form-control form-control-sm border-dark"
          placeholder="Buscar por nombre o SKU..."
          value={busqueda}
          onChange={(e) => onBusqueda(e.target.value)}
          aria-label="Buscar producto"
        />
      </div>
      <div className="col-6 col-md-4">
        <select
          className="form-select form-select-sm border-dark"
          value={categoria}
          onChange={(e) => onCategoria(e.target.value)}
          aria-label="Filtrar por categoría"
        >
          <option value="">Todas las categorías</option>
          {categorias.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>
      <div className="col-6 col-md-3">
        <select
          className="form-select form-select-sm border-dark"
          value={estado}
          onChange={(e) => onEstado(e.target.value)}
          aria-label="Filtrar por estado de stock"
        >
          <option value="">Todo el stock</option>
          <option value="disponible">Disponible</option>
          <option value="bajo">Stock bajo</option>
          <option value="agotado">Agotado</option>
        </select>
      </div>
    </div>
  );
}
