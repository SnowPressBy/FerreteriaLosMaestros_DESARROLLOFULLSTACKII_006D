import { useState } from 'react';
import { rutaProducto } from '../../utils/imagenes';

// Muestra la foto del producto; si no hay o no carga, muestra un respaldo.
export default function ImagenProducto({ archivo, nombre, respaldo, className = '', style }) {
  const [falloArchivo, setFalloArchivo] = useState(null);
  const src = rutaProducto(archivo);

  if (!src || falloArchivo === archivo) {
    return <div className={className} style={style} aria-hidden="true">{respaldo}</div>;
  }

  return (
    <img
      src={src}
      alt={nombre}
      className={className}
      style={{ objectFit: 'cover', ...style }}
      onError={() => setFalloArchivo(archivo)}
    />
  );
}
