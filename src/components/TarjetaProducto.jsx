import BadgeEstado from './atoms/BadgeEstado';
import ImagenProducto from './atoms/ImagenProducto';
import { formatoPrecio } from '../utils/formato';

export default function TarjetaProducto({ producto }) {
  const { sku, nombre, categoria, precio, stock, descripcion, imagen } = producto;

  return (
    <article className="tarjeta-producto">
      <ImagenProducto
        archivo={imagen}
        nombre={nombre}
        respaldo={categoria.charAt(0)}
        className="tarjeta-imagen"
      />
      <div className="p-3 d-flex flex-column flex-grow-1">
        <div className="font-tech small text-secondary">{sku} // {categoria.toUpperCase()}</div>
        <h6 className="fw-bold mb-1 mt-1">{nombre}</h6>
        {descripcion && <p className="small text-secondary mb-2">{descripcion}</p>}
        <div className="mt-auto d-flex justify-content-between align-items-center">
          <strong className="fs-5">{formatoPrecio(precio)}</strong>
          <BadgeEstado stock={stock} />
        </div>
        <div className="font-tech small text-secondary mt-1">
          {stock > 0 ? `${stock} un. en bodega` : 'Sin existencias'}
        </div>
      </div>
    </article>
  );
}
