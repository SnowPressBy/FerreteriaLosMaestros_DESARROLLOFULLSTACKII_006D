import { useMemo, useState } from 'react';
import Encabezado from '../components/organisms/Encabezado';
import FooterComun from '../components/organisms/FooterComun';
import BadgeEstado from '../components/atoms/BadgeEstado';
import ImagenProducto from '../components/atoms/ImagenProducto';
import FiltroAdmin from '../components/molecules/FiltroAdmin';
import useProductos from '../hooks/useProductos';
import { CATEGORIAS } from '../data/productos';
import { estadoStock, formatoPrecio } from '../utils/formato';

const FORM_VACIO = {
  sku: '',
  nombre: '',
  categoria: CATEGORIAS[0],
  precio: '',
  stock: '',
  destacado: false,
  descripcion: '',
  imagen: '',
};

export default function Admin() {
  const { productos, agregar, actualizar, eliminar } = useProductos();

  const [busqueda, setBusqueda] = useState('');
  const [categoria, setCategoria] = useState('');
  const [estado, setEstado] = useState('');

  const [form, setForm] = useState(FORM_VACIO);
  const [editandoId, setEditandoId] = useState(null);
  const [errores, setErrores] = useState({});

  const filtrados = useMemo(() => {
    const q = busqueda.trim().toLowerCase();
    return productos.filter((p) => {
      const texto = !q || p.nombre.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q);
      const cat = !categoria || p.categoria === categoria;
      const est = !estado || estadoStock(p.stock) === estado;
      return texto && cat && est;
    });
  }, [productos, busqueda, categoria, estado]);

  const cambiar = (campo, valor) => {
    setForm((f) => ({ ...f, [campo]: valor }));
    setErrores((e) => ({ ...e, [campo]: undefined }));
  };

  const validar = () => {
    const e = {};
    const sku = form.sku.trim().toUpperCase();
    if (!sku) e.sku = 'El SKU es obligatorio.';
    else if (productos.some((p) => p.sku.toUpperCase() === sku && p.id !== editandoId)) e.sku = 'Ya existe un producto con ese SKU.';
    if (!form.nombre.trim()) e.nombre = 'El nombre es obligatorio.';
    const precio = Number(form.precio);
    if (form.precio === '' || !Number.isInteger(precio) || precio <= 0) e.precio = 'Ingresa un precio entero mayor a 0.';
    const stock = Number(form.stock);
    if (form.stock === '' || !Number.isInteger(stock) || stock < 0) e.stock = 'Ingresa un stock entero (0 o más).';
    return e;
  };

  const limpiar = () => {
    setForm(FORM_VACIO);
    setEditandoId(null);
    setErrores({});
  };

  const guardar = (ev) => {
    ev.preventDefault();
    const e = validar();
    if (Object.keys(e).length > 0) {
      setErrores(e);
      return;
    }
    const datos = {
      sku: form.sku.trim().toUpperCase(),
      nombre: form.nombre.trim(),
      categoria: form.categoria,
      precio: Number(form.precio),
      stock: Number(form.stock),
      destacado: form.destacado,
      descripcion: form.descripcion.trim(),
      imagen: form.imagen.trim(),
    };
    if (editandoId === null) agregar(datos);
    else actualizar(editandoId, datos);
    limpiar();
  };

  const editar = (p) => {
    setEditandoId(p.id);
    setForm({
      sku: p.sku,
      nombre: p.nombre,
      categoria: p.categoria,
      precio: String(p.precio),
      stock: String(p.stock),
      destacado: Boolean(p.destacado),
      descripcion: p.descripcion || '',
      imagen: p.imagen || '',
    });
    setErrores({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const borrar = (p) => {
    if (!window.confirm(`¿Eliminar "${p.nombre}" (${p.sku})?`)) return;
    eliminar(p.id);
    if (editandoId === p.id) limpiar();
  };

  const campo = (nombre) => `form-control form-control-sm border-dark ${errores[nombre] ? 'is-invalid' : ''}`;

  return (
    <>
      <Encabezado etiqueta="SECCIÓN: PANEL DE ADMINISTRACIÓN" />

      <main>
        <section className="bloque-gris p-3 mb-4">
          <div className="font-tech small fw-bold mb-3">
            {editandoId === null ? 'NUEVO PRODUCTO' : 'EDITANDO PRODUCTO'}
          </div>
          <form onSubmit={guardar} noValidate>
            <div className="row g-2">
              <div className="col-6 col-md-2">
                <label htmlFor="sku" className="form-label small fw-bold mb-1">SKU</label>
                <input id="sku" className={campo('sku')} value={form.sku} onChange={(e) => cambiar('sku', e.target.value)} />
                {errores.sku && <div className="invalid-feedback">{errores.sku}</div>}
              </div>
              <div className="col-12 col-md-5">
                <label htmlFor="nombre" className="form-label small fw-bold mb-1">Nombre</label>
                <input id="nombre" className={campo('nombre')} value={form.nombre} onChange={(e) => cambiar('nombre', e.target.value)} />
                {errores.nombre && <div className="invalid-feedback">{errores.nombre}</div>}
              </div>
              <div className="col-6 col-md-3">
                <label htmlFor="categoria" className="form-label small fw-bold mb-1">Categoría</label>
                <select id="categoria" className="form-select form-select-sm border-dark" value={form.categoria} onChange={(e) => cambiar('categoria', e.target.value)}>
                  {CATEGORIAS.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div className="col-6 col-md-2">
                <label htmlFor="precio" className="form-label small fw-bold mb-1">Precio (IVA incl.)</label>
                <input id="precio" type="number" min="1" step="1" className={campo('precio')} value={form.precio} onChange={(e) => cambiar('precio', e.target.value)} />
                {errores.precio && <div className="invalid-feedback">{errores.precio}</div>}
              </div>
              <div className="col-6 col-md-2">
                <label htmlFor="stock" className="form-label small fw-bold mb-1">Stock</label>
                <input id="stock" type="number" min="0" step="1" className={campo('stock')} value={form.stock} onChange={(e) => cambiar('stock', e.target.value)} />
                {errores.stock && <div className="invalid-feedback">{errores.stock}</div>}
              </div>
              <div className="col-12 col-md-8">
                <label htmlFor="imagen" className="form-label small fw-bold mb-1">Imagen (archivo en public/img/productos/)</label>
                <input id="imagen" className="form-control form-control-sm border-dark" placeholder="ej: martillo.jpg" value={form.imagen} onChange={(e) => cambiar('imagen', e.target.value)} />
              </div>
              <div className="col-12 col-md-4 d-flex align-items-end">
                <ImagenProducto
                  archivo={form.imagen}
                  nombre="Vista previa"
                  respaldo="Sin imagen"
                  className="border border-dark bg-white d-flex align-items-center justify-content-center small text-secondary"
                  style={{ width: '90px', height: '60px' }}
                />
              </div>
              <div className="col-12 col-md-8">
                <label htmlFor="descripcion" className="form-label small fw-bold mb-1">Descripción</label>
                <input id="descripcion" className="form-control form-control-sm border-dark" value={form.descripcion} onChange={(e) => cambiar('descripcion', e.target.value)} />
              </div>
              <div className="col-12 col-md-2 d-flex align-items-end">
                <div className="form-check">
                  <input id="destacado" type="checkbox" className="form-check-input border-dark" checked={form.destacado} onChange={(e) => cambiar('destacado', e.target.checked)} />
                  <label htmlFor="destacado" className="form-check-label small fw-bold">Destacado</label>
                </div>
              </div>
            </div>
            <div className="d-flex gap-2 mt-3">
              <button type="submit" className="btn-industrial-naranja">
                {editandoId === null ? 'Agregar producto' : 'Guardar cambios'}
              </button>
              {editandoId !== null && (
                <button type="button" className="btn-industrial-outline" onClick={limpiar}>Cancelar</button>
              )}
            </div>
          </form>
        </section>

        <div className="d-flex justify-content-between align-items-center border-bottom border-dark pb-2 mb-3">
          <h5 className="fw-bold text-uppercase mb-0">Gestión de Inventario</h5>
          <span className="badge bg-dark text-warning font-tech">{filtrados.length} / {productos.length} REGISTROS</span>
        </div>

        <FiltroAdmin
          busqueda={busqueda}
          onBusqueda={setBusqueda}
          categoria={categoria}
          onCategoria={setCategoria}
          estado={estado}
          onEstado={setEstado}
          categorias={CATEGORIAS}
        />

        <div className="table-responsive mb-4">
          <table className="table table-sm table-bordered border-dark align-middle mb-0">
            <thead className="table-dark">
              <tr className="font-tech small">
                <th>Img</th>
                <th>SKU</th>
                <th>Nombre</th>
                <th>Categoría</th>
                <th className="text-end">Precio</th>
                <th className="text-end">Stock</th>
                <th>Estado</th>
                <th className="text-end">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtrados.length === 0 && (
                <tr>
                  <td colSpan={8} className="text-center font-tech small py-4">SIN RESULTADOS.</td>
                </tr>
              )}
              {filtrados.map((p) => (
                <tr key={p.id}>
                  <td>
                    <ImagenProducto
                      archivo={p.imagen}
                      nombre={p.nombre}
                      respaldo="—"
                      className="border border-dark bg-white d-flex align-items-center justify-content-center small text-secondary"
                      style={{ width: '44px', height: '34px' }}
                    />
                  </td>
                  <td className="font-tech small">{p.sku}</td>
                  <td>{p.nombre}{p.destacado && <span className="badge bg-warning text-dark ms-2">★</span>}</td>
                  <td className="small">{p.categoria}</td>
                  <td className="text-end">{formatoPrecio(p.precio)}</td>
                  <td className="text-end">{p.stock}</td>
                  <td><BadgeEstado stock={p.stock} /></td>
                  <td className="text-end text-nowrap">
                    <button type="button" className="btn btn-outline-dark btn-sm me-1" onClick={() => editar(p)}>Editar</button>
                    <button type="button" className="btn btn-outline-danger btn-sm" onClick={() => borrar(p)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      <FooterComun />
    </>
  );
}
