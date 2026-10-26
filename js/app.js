// 1. BASE DE DATOS LOCAL INICIAL
const datosIniciales = [
  {
    id: 1,
    nombre: "Logo Ferretería Los Maestros",
    codigo: "BRAND-01",
    categoria: "Logos y Marca",
    precio: 0,
    imagenUrl: "https://placehold.co/300x100/212529/ffc107?text=LOS+MAESTROS",
    descripcion: "Logotipo oficial versión horizontal fondo oscuro."
  },
  {
    id: 2,
    nombre: "Temporada de Herramientas Industriales",
    codigo: "PROMO-01",
    categoria: "Banners y Promos",
    precio: 0,
    imagenUrl: "https://placehold.co/800x250/212529/ffc107?text=EQUIPAMIENTO+PROFESIONAL",
    descripcion: "Descuentos especiales en líneas de perforación, corte y demolición para contratistas."
  },
  {
    id: 3,
    nombre: "Taladro Percutor Inalámbrico 20V",
    codigo: "SKU-TAL20V",
    categoria: "Productos",
    precio: 54990,
    imagenUrl: "https://placehold.co/400x250/ffffff/212529?text=TALADRO+20V",
    descripcion: "Mandril metálico 13mm, incluye 2 baterías de litio 2.0Ah y maletín de transporte."
  },
  {
    id: 4,
    nombre: "Esmeril Angular 4 1/2'' 850W",
    codigo: "SKU-ESM850",
    categoria: "Productos",
    precio: 32990,
    imagenUrl: "https://placehold.co/400x250/ffffff/212529?text=ESMERIL+850W",
    descripcion: "Velocidad 11.000 RPM, caja de engranajes metálica para trabajo pesado."
  },
  {
    id: 5,
    nombre: "Juego de Llaves Punta Corona 12 Pzas",
    codigo: "SKU-LLA12P",
    categoria: "Productos",
    precio: 19990,
    imagenUrl: "https://placehold.co/400x250/ffffff/212529?text=SET+LLAVES+12+PZAS",
    descripcion: "Fabricadas en acero cromo-vanadio, medidas de 8mm a 19mm."
  },
  {
    id: 6,
    nombre: "Sierra Circular 7 1/4'' 1500W",
    codigo: "SKU-SIE1500",
    categoria: "Productos",
    precio: 64990,
    imagenUrl: "https://placehold.co/400x250/ffffff/212529?text=SIERRA+1500W",
    descripcion: "Capacidad de biselado 45 grados, incluye disco de carburo de 24 dientes."
  }
];

// --- Utilidades ---
// Escapa texto antes de meterlo en innerHTML (evita XSS y atributos rotos por comillas)
function esc(s) {
  return String(s ?? '').replace(/[&<>"']/g, c =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

const STORAGE_KEY = 'ferreteria_maestros_v4';

// Lectura segura: si el JSON está corrupto se vuelve a los datos iniciales
function cargarRecursos() {
  try {
    const guardado = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(guardado) ? guardado : datosIniciales;
  } catch (err) {
    console.warn('Datos locales corruptos, se restauran los iniciales.', err);
    return datosIniciales;
  }
}

// --- Autenticación simulada (se reemplazará por JWT de Spring Boot) ---
const USUARIOS = [
  { email: 'admin@losmaestros.cl',     password: 'admin123',    rol: 'ADMIN',      nombre: 'Administrador' },
  { email: 'vendedor@losmaestros.cl',  password: 'vendedor123', rol: 'VENDEDOR',   nombre: 'Vendedor' },
  { email: 'contratista@elqui.cl',     password: 'obra123',     rol: 'CONTRATISTA', nombre: 'Contratista Elqui' }
];
const ROLES_INTRANET = ['ADMIN', 'VENDEDOR'];

function obtenerSesion() {
  try { return JSON.parse(sessionStorage.getItem('sesion')); } catch (e) { return null; }
}

function cerrarSesion() {
  sessionStorage.removeItem('sesion');
  location.href = 'login.html';
}

function autocompletarLogin(email, password) {
  document.getElementById('loginEmail').value = email;
  document.getElementById('loginPassword').value = password;
}

// Protección de ruta: admin.html solo para ADMIN y VENDEDOR
(function guardiaDeRutas() {
  if (!location.pathname.endsWith('admin.html')) return;
  const s = obtenerSesion();
  if (!s || !ROLES_INTRANET.includes(s.rol)) {
    location.replace('login.html?acceso=denegado');
  }
})();

const formLogin = document.getElementById('formLogin');
if (formLogin) {
  if (location.search.includes('acceso=denegado')) {
    formLogin.insertAdjacentHTML('afterbegin',
      '<div class="alert alert-danger py-2 small font-tech">Debes iniciar sesión con un rol autorizado.</div>');
  }
  formLogin.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value.trim().toLowerCase();
    const pass = document.getElementById('loginPassword').value;
    const usuario = USUARIOS.find(u => u.email === email && u.password === pass);
    if (!usuario) {
      alert('Credenciales incorrectas.');
      return;
    }
    // Token simulado; con Spring Boot vendría firmado desde el servidor
    sessionStorage.setItem('sesion', JSON.stringify({
      email: usuario.email, rol: usuario.rol, nombre: usuario.nombre,
      token: 'jwt-simulado-' + Date.now()
    }));
    location.href = ROLES_INTRANET.includes(usuario.rol) ? 'admin.html' : 'productos.html';
  });
}

let recursos = cargarRecursos();
let filtroAdmin = "Todos";
let busquedaTexto = "";
let imagenBase64Temporal = "";

const modalElement = document.getElementById('modalRecurso');
const modalBootstrap = modalElement ? new bootstrap.Modal(modalElement) : null;

// 2. COMPONENTES (ÁTOMOS Y MOLÉCULAS)

function AtomoBadge(categoria) {
  const estilos = {
    "Logos y Marca": "bg-warning text-dark fw-bold",
    "Banners y Promos": "bg-danger text-white",
    "Mockups Web": "bg-secondary text-white",
    "Productos": "bg-dark text-warning"
  };
  return `<span class="badge text-uppercase ${estilos[categoria] || 'bg-secondary'}">${esc(categoria)}</span>`;
}

// Molécula Tarjeta para vista pública (index.html y productos.html)
function MoleculaTarjetaCliente(producto) {
  return `
    <div class="col-12 col-md-4">
      <div class="card h-100 shadow-sm card-recurso">
        <div class="img-preview-container">
          <img src="${esc(producto.imagenUrl)}" alt="${esc(producto.nombre)}">
          <span class="sku-tag">${esc(producto.codigo)}</span>
        </div>
        <div class="card-body d-flex flex-column">
          <h6 class="card-title fw-bold text-dark text-uppercase mb-1">${esc(producto.nombre)}</h6>
          <div class="fs-5 fw-bold text-dark border-bottom pb-2 mb-2">$${Number(producto.precio).toLocaleString('es-CL')}</div>
          <p class="card-text text-secondary small flex-grow-1">${esc(producto.descripcion)}</p>
          <button class="btn btn-dark text-warning fw-bold text-uppercase btn-sm w-100 mt-2" onclick="cotizar(${Number(producto.id)})">
            Solicitar / Cotizar
          </button>
        </div>
      </div>
    </div>
  `;
}

// Se busca el producto por id: el nombre nunca se interpola dentro de un onclick
function cotizar(id) {
  const p = recursos.find(r => r.id === id);
  if (p) alert(`Producto seleccionado: ${p.nombre} (${p.codigo})`);
}

// Molécula Tarjeta para el Administrador (admin.html)
function MoleculaTarjetaAdmin(item) {
  return `
    <div class="col-12 col-md-4">
      <div class="card h-100 shadow-sm card-recurso">
        <div class="img-preview-container">
          <img src="${esc(item.imagenUrl)}" alt="${esc(item.nombre)}">
          <span class="sku-tag">${esc(item.codigo)}</span>
        </div>
        <div class="card-body d-flex flex-column">
          <div class="mb-2">${AtomoBadge(item.categoria)}</div>
          <h6 class="card-title fw-bold text-dark text-uppercase mb-1">${esc(item.nombre)}</h6>
          ${item.precio > 0 ? `<div class="fw-bold text-dark mb-1">$${Number(item.precio).toLocaleString('es-CL')}</div>` : ''}
          <p class="card-text text-secondary small flex-grow-1">${esc(item.descripcion)}</p>
          
          <div class="d-flex justify-content-end gap-2 mt-3 pt-2 border-top">
            <button class="btn btn-sm btn-outline-dark text-uppercase fw-semibold" onclick="prepararEditar(${item.id})">
              Editar
            </button>
            <button class="btn btn-sm btn-outline-danger text-uppercase fw-semibold" onclick="eliminarRecurso(${item.id})">
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

// 3. RENDERIZADO DE VISTAS

function renderizarSitio() {
  // Cabecera / Logo
  const logoContainer = document.getElementById('headerLogoContainer');
  if (logoContainer) {
    const logoActivo = recursos.find(r => r.categoria === "Logos y Marca");
    logoContainer.innerHTML = `
      <img src="assets/logos/logo.png" alt="Logo Ferretería Los Maestros" class="logo-header">
      <div>
        <h5 class="mb-0 fw-bold text-uppercase text-warning">Los Maestros</h5>
        <small class="text-light d-block text-uppercase" style="font-size: 0.7rem;">${esc(logoActivo ? logoActivo.nombre : 'Ferretería Industrial')}</small>
      </div>
    `;
  }

  // Estado de sesión en la cabecera (index)
  const estadoHeader = document.getElementById('estadoCuentaHeader');
  if (estadoHeader) {
    const s = obtenerSesion();
    estadoHeader.innerHTML = s
      ? `${esc(s.nombre)} [${esc(s.rol)}] · <a href="#" onclick="cerrarSesion(); return false;" class="text-dark fw-bold">Salir</a>`
      : `<a href="login.html" class="text-dark fw-bold">Iniciar sesión</a>`;
  }

  // Vista: index.html
  const heroIndex = document.getElementById('heroBannerIndex');
  const destacadosIndex = document.getElementById('destacadosIndex');
  if (heroIndex && destacadosIndex) {
    const banner = recursos.find(r => r.categoria === "Banners y Promos") || datosIniciales[1];
    heroIndex.innerHTML = `
      <div class="bg-dark text-white p-4 border-start border-warning border-5">
        <div class="row align-items-center g-3">
          <div class="col-md-7">
            <span class="badge bg-warning text-dark text-uppercase mb-2">Campaña Vigente</span>
            <h2 class="fw-bold text-uppercase">${esc(banner.nombre)}</h2>
            <p class="text-light mb-3">${esc(banner.descripcion)}</p>
            <a href="productos.html" class="btn btn-warning fw-bold text-dark text-uppercase">
              Ver Catálogo de Productos
            </a>
          </div>
          <div class="col-md-5 text-center">
            <img src="${esc(banner.imagenUrl)}" alt="${esc(banner.nombre)}" class="img-fluid border border-warning" style="max-height: 160px; object-fit: cover;">
          </div>
        </div>
      </div>
    `;

    const tresProductos = recursos.filter(r => r.categoria === "Productos").slice(0, 3);
    destacadosIndex.innerHTML = tresProductos.map(p => MoleculaTarjetaCliente(p)).join('');

    // Resumen real de categorías (antes quedaba vacío)
    const resumen = document.getElementById('resumenCategoriasIndex');
    if (resumen) {
      const conteo = {};
      recursos.forEach(r => { conteo[r.categoria] = (conteo[r.categoria] || 0) + 1; });
      const cats = Object.keys(conteo);
      resumen.innerHTML = cats.map(c =>
        `<div class="col-6 col-lg-4"><div class="bg-white border border-dark p-2 d-flex justify-content-between">
           <span>${esc(c)}</span><strong>${conteo[c]}</strong></div></div>`).join('');
      const areas = document.getElementById('contadorAreas');
      if (areas) areas.innerText = `${cats.length} ÁREAS ACTIVAS`;
    }
  }

  // Vista: productos.html
  const catalogoPublico = document.getElementById('catalogoPublicoProductos');
  if (catalogoPublico) {
    const productosFiltrados = recursos.filter(r => {
      const esProd = r.categoria === "Productos";
      const coincide = r.nombre.toLowerCase().includes(busquedaTexto.toLowerCase()) ||
                       r.codigo.toLowerCase().includes(busquedaTexto.toLowerCase());
      return esProd && coincide;
    });

    const contador = document.getElementById('contadorCatalogo');
    if (contador) contador.innerText = `${productosFiltrados.length} PRODUCTOS`;

    catalogoPublico.innerHTML = productosFiltrados.length
      ? productosFiltrados.map(p => MoleculaTarjetaCliente(p)).join('')
      : `<div class="col-12 text-center py-5 text-secondary border">Sin resultados para la búsqueda actual.</div>`;
  }

  // Vista: admin.html
  const contenedorAdmin = document.getElementById('contenedorAdminCRUD');
  if (contenedorAdmin) {
    const filtradosAdmin = recursos.filter(r => {
      const coincideCat = filtroAdmin === "Todos" || r.categoria === filtroAdmin;
      const coincideTxt = r.nombre.toLowerCase().includes(busquedaTexto.toLowerCase()) ||
                          r.codigo.toLowerCase().includes(busquedaTexto.toLowerCase());
      return coincideCat && coincideTxt;
    });

    contenedorAdmin.innerHTML = filtradosAdmin.length
      ? filtradosAdmin.map(item => MoleculaTarjetaAdmin(item)).join('')
      : `<div class="col-12 text-center py-5 text-secondary border">No hay registros en esta categoría.</div>`;
  }
}

// 4. LÓGICA CRUD

function guardarEnStorage() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recursos));
  } catch (err) {
    // Normalmente QuotaExceededError por imágenes base64 muy pesadas
    alert('No se pudo guardar: el almacenamiento local está lleno. Usa una imagen más liviana o una URL.');
    console.error(err);
  }
  renderizarSitio();
}

const inputArchivo = document.getElementById('archivoImagen');
if (inputArchivo) {
  inputArchivo.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      imagenBase64Temporal = ev.target.result;
      document.getElementById('imagenUrl').value = "Archivo local cargado";
    };
    reader.readAsDataURL(file);
  });
}

function prepararCrear() {
  document.getElementById('formRecurso').reset();
  document.getElementById('recursoId').value = '';
  imagenBase64Temporal = '';
  document.getElementById('modalTitulo').innerText = 'Nuevo Registro';
}

function prepararEditar(id) {
  const item = recursos.find(r => r.id === id);
  if (!item) return;

  document.getElementById('recursoId').value = item.id;
  document.getElementById('nombre').value = item.nombre;
  document.getElementById('codigo').value = item.codigo;
  document.getElementById('categoria').value = item.categoria;
  document.getElementById('precio').value = item.precio || 0;
  document.getElementById('imagenUrl').value = item.imagenUrl.startsWith('data:image') ? 'Imagen local almacenada' : item.imagenUrl;
  document.getElementById('descripcion').value = item.descripcion;
  imagenBase64Temporal = item.imagenUrl.startsWith('data:image') ? item.imagenUrl : '';

  document.getElementById('modalTitulo').innerText = 'Editar Registro';
  modalBootstrap.show();
}

const formRecurso = document.getElementById('formRecurso');
if (formRecurso) {
  formRecurso.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.getElementById('recursoId').value;
    const inputUrl = document.getElementById('imagenUrl').value;

    const nuevoItem = {
      id: id ? Number(id) : Date.now(),
      nombre: document.getElementById('nombre').value,
      codigo: document.getElementById('codigo').value.toUpperCase(),
      categoria: document.getElementById('categoria').value,
      precio: Number(document.getElementById('precio').value) || 0,
      imagenUrl: imagenBase64Temporal || inputUrl || 'https://placehold.co/400x250?text=SIN+IMAGEN',
      descripcion: document.getElementById('descripcion').value
    };

    const duplicado = recursos.some(r => r.codigo === nuevoItem.codigo && r.id !== nuevoItem.id);
    if (duplicado) {
      alert(`El código ${nuevoItem.codigo} ya existe. Usa un SKU distinto.`);
      return;
    }

    if (id) {
      recursos = recursos.map(r => r.id === Number(id) ? nuevoItem : r);
    } else {
      recursos.unshift(nuevoItem);
    }

    guardarEnStorage();
    modalBootstrap.hide();
  });
}

function eliminarRecurso(id) {
  if (confirm('¿Confirmar eliminación del registro?')) {
    recursos = recursos.filter(r => r.id !== id);
    guardarEnStorage();
  }
}

['inputBuscarPublico', 'inputBuscarAdmin'].forEach(idInput => {
  const el = document.getElementById(idInput);
  if (el) {
    el.addEventListener('input', (e) => {
      busquedaTexto = e.target.value;
      renderizarSitio();
    });
  }
});

document.querySelectorAll('#filtrosAdmin button').forEach(btn => {
  btn.addEventListener('click', () => {
    const activo = document.querySelector('#filtrosAdmin .active');
    if (activo) {
      activo.classList.remove('active', 'btn-dark');
      activo.classList.add('btn-outline-dark');
    }
    btn.classList.remove('btn-outline-dark');
    btn.classList.add('active', 'btn-dark');
    filtroAdmin = btn.dataset.cat;
    renderizarSitio();
  });
});

renderizarSitio();

// 5. MAPA DE COBERTURA (Leaflet) - solo en index.html
function iniciarMapa() {
  const el = document.getElementById('mapaCobertura');
  if (!el || typeof L === 'undefined') return;
  const centro = [-29.9027, -71.2520]; // La Serena (aprox.; ajustar a la dirección real del local)
  const mapa = L.map(el).setView(centro, 12);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap'
  }).addTo(mapa);
  L.marker(centro).addTo(mapa).bindPopup('<b>Ferretería Los Maestros</b><br>Casa matriz, La Serena');
  L.circle(centro, { radius: 6000, color: '#ff5500', fillOpacity: 0.12 })
    .addTo(mapa).bindPopup('Zona de despacho a domicilio (radio aprox. 6 km)');
}
iniciarMapa();
