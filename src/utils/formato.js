const pesos = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
  maximumFractionDigits: 0,
});

export const formatoPrecio = (valor) => pesos.format(valor);

export function estadoStock(stock) {
  if (stock <= 0) return 'agotado';
  if (stock <= 5) return 'bajo';
  return 'disponible';
}
