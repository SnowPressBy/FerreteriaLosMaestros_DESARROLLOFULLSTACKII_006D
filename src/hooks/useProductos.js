import { useCallback, useEffect, useState } from 'react';
import { cargarProductos, guardarProductos } from '../data/almacen';

export default function useProductos() {
  const [productos, setProductos] = useState(cargarProductos);

  useEffect(() => {
    guardarProductos(productos);
  }, [productos]);

  const agregar = useCallback((producto) => {
    setProductos((prev) => {
      const id = prev.reduce((max, p) => Math.max(max, p.id), 0) + 1;
      return [...prev, { ...producto, id }];
    });
  }, []);

  const actualizar = useCallback((id, cambios) => {
    setProductos((prev) => prev.map((p) => (p.id === id ? { ...p, ...cambios } : p)));
  }, []);

  const eliminar = useCallback((id) => {
    setProductos((prev) => prev.filter((p) => p.id !== id));
  }, []);

  return { productos, agregar, actualizar, eliminar };
}
