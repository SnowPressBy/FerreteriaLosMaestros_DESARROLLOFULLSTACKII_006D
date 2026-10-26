# Ferretería Los Maestros

SPA en React + Vite + Bootstrap + Leaflet.

## Uso

```bash
npm install
npm run dev
```

## Rutas

| Ruta         | Descripción                              |
|--------------|------------------------------------------|
| `/`          | Portada, destacados y mapa de despacho   |
| `/productos` | Catálogo público con búsqueda y filtro   |
| `/login`     | Acceso a la intranet                     |
| `/admin`     | CRUD de inventario (requiere sesión)     |

## Acceso de prueba (simulado en el front)

Usuario: `admin` — Contraseña: `admin123`

Los productos se guardan en `localStorage`. Cuando exista la API (Spring Boot + JWT),
reemplazar `src/data/almacen.js` y `src/utils/auth.js` por llamadas al backend.

## Logos e imágenes de productos

```
public/
└── img/
    ├── logos/       <- logo.png (logo del header)
    └── productos/   <- fotos de los productos
```

- **Logo:** guarda `logo.png` en `public/img/logos/`. Si no existe, se muestra el texto "LOS MAESTROS".
- **Productos:** copia la foto a `public/img/productos/` y en `/admin` escribe el nombre del
  archivo en el campo "Imagen" (ej: `martillo.jpg`). El admin muestra una vista previa.
  Si el archivo no existe, la tarjeta muestra la inicial de la categoría.
- Cada carpeta tiene un `LEEME.txt` con recomendaciones de nombre y tamaño.
- Con `npm run dev`, las imágenes nuevas se ven al recargar la página.
