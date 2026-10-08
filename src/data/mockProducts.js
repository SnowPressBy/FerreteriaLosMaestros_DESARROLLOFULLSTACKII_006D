// src/data/mockProducts.js
export const initialProducts = [
  {
    id: 1,
    codigo: 'CEM-001',
    nombre: 'Cemento Polpaico Especial 25 kg',
    categoria: 'Construcción',
    precio: 4590,
    stock: 45,
    descripcion: 'Saco de cemento tradicional para albañilería y hormigones.'
  },
  {
    id: 2,
    codigo: 'TAL-002',
    nombre: 'Taladro Percutor DeWalt 1/2" 710W',
    categoria: 'Herramientas',
    precio: 68990,
    stock: 4, // Umbral crítico para probar la alerta
    descripcion: 'Taladro percutor con velocidad variable y reversa.'
  },
  {
    id: 3,
    codigo: 'TUB-003',
    nombre: 'Tubo PVC Sanitario 110mm x 3m',
    categoria: 'Gasfitería',
    precio: 8490,
    stock: 0, // Sin stock para probar el botón deshabilitado
    descripcion: 'Tubería para desagües sanitarios domiciliarios.'
  },
  {
    id: 4,
    codigo: 'CAB-004',
    nombre: 'Cable Eléctrico THHN 2.5 mm² Rollo 100m',
    categoria: 'Electricidad',
    precio: 34990,
    stock: 15,
    descripcion: 'Conductor de cobre para instalaciones interiores.'
  },
  {
    id: 5,
    codigo: 'CLV-005',
    nombre: 'Clavo Corriente 3" Caja 1 kg',
    categoria: 'Ferretería General',
    precio: 2990,
    stock: 80,
    descripcion: 'Clavos para carpintería y estructuras de madera.'
  }
];