# Ferretería Los Maestros

Aplicación web  para una ferretería de La Serena bajo el nombre de Ferreteria Los Hermanos, Región de Coquimbo. Permite ver el catálogo con stock, generar cotizaciones, confirmar pedidos con retiro o despacho, consultar el estado de un documento y administrar inventario, pedidos y pagos desde un panel interno con el fin de mejorar la estructura, sistema y manejo de la ferreteria

Proyecto de **Desarrollo Full Stack II — Frontend con React**. Esta etapa es solo frontend: no hay backend y los datos se guardan en el navegador. (Peniente el AWS y base de datos)

## Tecnologías

| Herramienta | Uso |
|---|---|
| React 19 | Interfaz y componentes |
| Vite 8 | Servidor de desarrollo y empaquetado |
| React Router DOM 7 | Rutas y ruta protegida del panel |
| Bootstrap 5 | Grilla responsiva, tablas y formularios |
| Leaflet + React-Leaflet | Mapa de la zona de despacho |
| oxlint | Revisión estática del código |

## Uso

Requiere Node.js y npm.

```bash
npm install
npm run dev
```

Otros comandos:

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Genera la versión de producción en `dist/` |
| `npm run preview` | Sirve la versión construida |
| `npm run lint` | Revisa el código con oxlint |

## Rutas

| Ruta | Descripción |
|---|---|
| `/` | Portada, familias del catálogo, productos destacados y mapa de cobertura de despacho |
| `/productos` | Catálogo público con búsqueda por nombre o SKU y filtro por categoría |
| `/carrito` | Carrito, elección entre cotización o pedido, datos del cliente, retiro o despacho y forma de pago |
| `/seguimiento` | El cliente consulta su cotización o pedido con código y RUT |
| `/login` | Acceso a la intranet |
| `/admin` | Inventario y Pedidos/Cotizaciones (requiere sesión; si no hay sesión redirige a `/login`) |
| cualquier otra | Redirige a `/` |

## Acceso de prueba (simulado en el front)

Usuario: `admin` — Contraseña: `admin123`

La sesión se guarda en `sessionStorage` y se pierde al cerrar la pestaña. Estas credenciales están en el código solo para desarrollo.

## Funcionamiento

### Catálogo e inventario

- 12 productos de ejemplo en 6 categorías: Herramientas, Construcción, Gasfitería, Electricidad, Pinturas y Fijaciones.
- Precios en pesos chilenos con IVA (19 %) incluido.
- Estado del stock: **Agotado** (0), **Stock bajo** (1 a 5) y **Disponible** (más de 5). Un producto agotado no se puede agregar al carrito y el carrito nunca supera el stock.

### Cotizador, pedidos y cuenta corriente

- **Cotización:** folio `COT-0001` y siguientes. Válida 7 días, no reserva stock y permite cotizar más unidades que el stock actual. Vencida la fecha se muestra como "Vencida". Se puede convertir en pedido (una sola vez) desde `/seguimiento`, siempre que esté vigente y haya stock.
- **Pedido:** folio `PED-0001` y siguientes. Verifica el stock, lo descuenta al confirmarse y lo devuelve si se cancela.
- **Entrega:** retiro en tienda (sin costo) o despacho a domicilio con dirección obligatoria. El costo es de $3.990 (`COSTO_DESPACHO` en `src/utils/pedidos.js`).
- **Pago:** contado (al retirar o contra entrega) o **cuenta corriente**, solo para RUT con convenio. Un pedido de contado queda como "Pago pendiente" y uno en cuenta corriente como **"Pago pendiente a fin de mes"**, hasta que el admin registra el pago.
- **Estados del pedido:** Recibido → En preparación → Listo para retiro → Retirado.
  Con despacho: Recibido → En preparación → En despacho → Entregado. También existe Cancelado.
- **Cancelación:** el cliente puede cancelar su pedido mientras esté en "Recibido"; el admin, mientras no esté finalizado.
- **Validaciones del carrito:** el RUT se valida con su dígito verificador; también se validan nombre, correo y teléfono. Los errores aparecen junto a cada campo.
- **Seguimiento:** pide código y RUT, muestra la línea de tiempo del pedido y permite imprimir el documento.

RUT de prueba con cuenta corriente (`src/data/clientes.js`): `12.345.678-5`, `76.123.456-0`, `15.234.567-4`.
Cualquier otro RUT válido (ej: `11.111.111-1`) solo puede pagar al contado.

### Panel de administración (`/admin`)

- **Inventario:** crear, editar y eliminar productos (SKU, nombre, categoría, precio, stock, descripción, imagen y destacado). El SKU no se puede repetir, el precio debe ser un entero mayor a 0 y el stock un entero de 0 o más. Se puede filtrar por texto, categoría y estado de stock.
- **Pedidos y cotizaciones:** buscar por código, cliente o RUT, filtrar por tipo, ver el detalle, avanzar el estado, registrar el pago y cancelar. Muestra los pedidos en curso, el total por cobrar de contado y el total pendiente a fin de mes por cliente.

## Datos y persistencia

No hay backend. Los datos viven en el navegador:

| Clave | Almacenamiento | Contenido |
|---|---|---|
| `lm_productos` | `localStorage` | Inventario (parte de `src/data/productos.js`) |
| `lm_pedidos` | `localStorage` | Pedidos y cotizaciones |
| `lm_carrito` | `localStorage` | Carrito en curso |
| `lm_sesion` | `sessionStorage` | Sesión del administrador |

Los datos no se comparten entre navegadores ni equipos. Para volver a los datos iniciales, borra las claves `lm_*` desde las herramientas del navegador.

Cuando exista la API (Spring Boot + JWT), hay que reemplazar por llamadas al backend:

- `src/data/almacen.js` (productos y stock)
- `src/data/almacenPedidos.js` (pedidos y cotizaciones)
- `src/data/clientes.js` (clientes con convenio)
- `src/utils/auth.js` (sesión)

## Logos e imágenes de productos

```
public/
└── img/
    ├── logos/       <- logo.png (logo del header)
    └── productos/   <- fotos de los productos
```

- **Logo:** guarda `logo.png` en `public/img/logos/`. Si no existe, se muestra el texto "LOS MAESTROS".
- **Productos:** copia la foto a `public/img/productos/` y en `/admin` escribe el nombre del archivo en el campo "Imagen" (ej: `martillo.jpg`). El admin muestra una vista previa. Si el archivo no existe, la tarjeta muestra la inicial de la categoría.
- Cada carpeta tiene un `LEEME.txt` con recomendaciones de nombre y tamaño.
- Con `npm run dev`, las imágenes nuevas se ven al recargar la página.

## Estructura del proyecto

```
src/
├── App.jsx                  rutas y ruta protegida
├── main.jsx                 punto de entrada
├── index.css                estilos propios (tema, menú, impresión)
├── components/
│   ├── atoms/               Logo, ImagenProducto, BadgeEstado, BadgeEstadoPedido, BadgePago 
│   ├── molecules/           FiltroAdmin, LineaTiempo, ResumenTotales, ResumenDocumento
│   ├── organisms/           Encabezado, FooterComun, GestionInventario, GestionPedidos
│   └── TarjetaProducto.jsx  tarjeta del catálogo
├── pages/                   Inicio, Catalogo, Carrito, Seguimiento, Login, Admin
├── context/                 CarritoContext
├── hooks/                   useProductos
├── utils/                   auth, formato, imagenes, pedidos, rut
└── data/                    productos, almacen, almacenPedidos, clientes
```

## Limitaciones de esta etapa

- No hay backend ni base de datos: cada navegador tiene sus propios datos.
- La autenticación es simulada.
- El mapa muestra la cobertura de despacho (6 km desde La Serena), pero la dirección ingresada no se valida contra esa zona.
- No hay pago en línea: el pago se registra a mano en el panel.
- No se emiten boletas ni facturas.
- No hay pruebas automatizadas.
