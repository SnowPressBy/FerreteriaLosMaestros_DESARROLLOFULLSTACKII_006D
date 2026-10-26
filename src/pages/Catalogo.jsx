import { useMemo, useState } from 'react';
import Encabezado from '../components/organisms/Encabezado';
import FooterComun from '../components/organisms/FooterComun';
import TarjetaProducto from '../components/TarjetaProducto';
import useProductos from '../hooks/useProductos';
import { CATEGORIAS } from '../data/productos';

export default function Catalogo() {
  const { productos } = useProductos();
  const [busqueda, setBusqueda] = useState('');
  const [categoria, setCategoria] = useState('');

  const filtrados = useMemo(() => {
    const q = busqueda.trim().toLowerCase();
    return productos.filter((p) => {
      const coincideTexto = !q || p.nombre.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q);
      const coincideCategoria = !categoria || p.categoria === categoria;
      return coincideTexto && coincideCategoria;
    });
  }, [productos, busqueda, categoria]);

  return (
    <>
      <Encabezado etiqueta="SECCIÓN: CATÁLOGO DE PRODUCTOS">
        <div className="row g-2">
          <div className="col-12 col-md-8">
            <input
              type="text"
              className="form-control form-control-sm border-dark"
              placeholder="Buscar por nombre o SKU..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              aria-label="Buscar producto"
            />
          </div>
          <div className="col-12 col-md-4">
            <select
              className="form-select form-select-sm border-dark"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              aria-label="Filtrar por categoría"
            >
              <option value="">Todas las categorías</option>
              {CATEGORIAS.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>
      </Encabezado>

      <main>
        <div className="d-flex justify-content-between align-items-center border-bottom border-dark pb-2 mb-3">
          <h5 className="fw-bold text-uppercase mb-0">Inventario de Productos</h5>
          <span className="badge bg-dark text-warning font-tech">{filtrados.length} REGISTROS</span>
        </div>

        <div className="row g-3 mb-4">
          {filtrados.length === 0 && (
            <div className="bloque-gris p-5 text-center font-tech fw-bold w-100">
              NO SE ENCONTRARON PRODUCTOS CON ESE CRITERIO.
            </div>
          )}
          {filtrados.map((p) => (
            <div className="col-12 col-sm-6 col-lg-3" key={p.id}>
              <TarjetaProducto producto={p} />
            </div>
          ))}
        </div>
      </main>

      <FooterComun />
    </>
  );
}
