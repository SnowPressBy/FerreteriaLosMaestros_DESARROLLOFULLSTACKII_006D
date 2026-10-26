// Las imágenes viven en public/img/ y se sirven como archivos estáticos.
// Para cambiar el logo, reemplaza el archivo o cambia NOMBRE_LOGO.
export const NOMBRE_LOGO = 'logo.png';

const BASE = import.meta.env.BASE_URL;

export const rutaLogo = () => `${BASE}img/logos/${NOMBRE_LOGO}`;

export const rutaProducto = (archivo) =>
  archivo && archivo.trim() ? `${BASE}img/productos/${encodeURIComponent(archivo.trim())}` : null;
