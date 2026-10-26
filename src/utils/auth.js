// Autenticación SIMULADA solo para el front-end.
// Cuando exista la API (Spring Boot + JWT) esto se reemplaza por una llamada al backend.
const CLAVE = 'lm_sesion';
const USUARIOS = [{ usuario: 'admin', clave: 'admin123' }];

export function iniciarSesion(usuario, clave) {
  const valido = USUARIOS.find((u) => u.usuario === usuario.trim() && u.clave === clave);
  if (!valido) return false;
  try {
    sessionStorage.setItem(CLAVE, valido.usuario);
  } catch {
    return false;
  }
  return true;
}

export function usuarioActual() {
  try {
    return sessionStorage.getItem(CLAVE);
  } catch {
    return null;
  }
}

export function haySesion() {
  return Boolean(usuarioActual());
}

export function cerrarSesion() {
  try {
    sessionStorage.removeItem(CLAVE);
  } catch {
    // nada que hacer
  }
}
