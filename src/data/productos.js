export const CATEGORIAS = [
  'Herramientas',
  'Construcción',
  'Gasfitería',
  'Electricidad',
  'Pinturas',
  'Fijaciones',
];

// Precios en CLP con IVA incluido.
export const PRODUCTOS_INICIALES = [
  { id: 1, sku: 'HER-001', nombre: 'Martillo carpintero 16 oz', categoria: 'Herramientas', precio: 8990, stock: 25, destacado: true, descripcion: 'Mango de fibra de vidrio, cabeza forjada.' },
  { id: 2, sku: 'HER-002', nombre: 'Taladro percutor 650 W', categoria: 'Herramientas', precio: 39990, stock: 8, destacado: true, descripcion: 'Mandril de 13 mm con velocidad variable.' },
  { id: 3, sku: 'HER-003', nombre: 'Set destornilladores 6 piezas', categoria: 'Herramientas', precio: 6490, stock: 3, destacado: false, descripcion: 'Punta plana y cruz, mango antideslizante.' },
  { id: 4, sku: 'CON-001', nombre: 'Cemento 25 kg', categoria: 'Construcción', precio: 4990, stock: 120, destacado: true, descripcion: 'Cemento de uso general para obras y radieres.' },
  { id: 5, sku: 'CON-002', nombre: 'Plancha OSB 11 mm', categoria: 'Construcción', precio: 17990, stock: 0, destacado: false, descripcion: 'Plancha 1,22 x 2,44 m para tabiquería y pisos.' },
  { id: 6, sku: 'GAS-001', nombre: 'Llave de paso 1/2"', categoria: 'Gasfitería', precio: 5290, stock: 40, destacado: false, descripcion: 'Bronce, rosca hembra-hembra.' },
  { id: 7, sku: 'GAS-002', nombre: 'Tubo PVC sanitario 110 mm x 3 m', categoria: 'Gasfitería', precio: 7490, stock: 15, destacado: false, descripcion: 'Para desagües domiciliarios.' },
  { id: 8, sku: 'ELE-001', nombre: 'Cable eléctrico 2,5 mm² x 100 m', categoria: 'Electricidad', precio: 49990, stock: 6, destacado: true, descripcion: 'Cobre, aislación libre de halógenos.' },
  { id: 9, sku: 'ELE-002', nombre: 'Enchufe doble con tierra', categoria: 'Electricidad', precio: 2990, stock: 80, destacado: false, descripcion: 'Embutir, 10 A.' },
  { id: 10, sku: 'PIN-001', nombre: 'Látex interior blanco 1 galón', categoria: 'Pinturas', precio: 18990, stock: 18, destacado: false, descripcion: 'Rendimiento aprox. 40 m² por galón.' },
  { id: 11, sku: 'FIJ-001', nombre: 'Tornillo volcanita 6x1" (caja 100)', categoria: 'Fijaciones', precio: 2490, stock: 200, destacado: false, descripcion: 'Cabeza trompeta, punta aguda.' },
  { id: 12, sku: 'FIJ-002', nombre: 'Tarugo con tornillo 8 mm (bolsa 50)', categoria: 'Fijaciones', precio: 3290, stock: 4, destacado: true, descripcion: 'Para muros de hormigón y ladrillo.' },
];
