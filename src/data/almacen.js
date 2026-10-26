import { PRODUCTOS_INICIALES } from './productos';

const CLAVE = 'lm_productos';

export function cargarProductos() {
  try {
    const raw = localStorage.getItem(CLAVE);
    if (raw) {
      const datos = JSON.parse(raw);
      if (Array.isArray(datos)) return datos;
    }
  } catch {
    // Si por abc motivo el almaciento no funca, se usa datos iniaciales 
  }
  return PRODUCTOS_INICIALES;
}

export function guardarProductos(lista) {
  try {
    localStorage.setItem(CLAVE, JSON.stringify(lista));
  } catch {
    // Sin almacenamiento disponible, la web funciona igual (pero no se guarda los datos)
  }
}
