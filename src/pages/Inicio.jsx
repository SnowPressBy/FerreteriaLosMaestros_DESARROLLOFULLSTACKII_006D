import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Circle, MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import iconoUrl from 'leaflet/dist/images/marker-icon.png';
import icono2xUrl from 'leaflet/dist/images/marker-icon-2x.png';
import sombraUrl from 'leaflet/dist/images/marker-shadow.png';
import Encabezado from '../components/organisms/Encabezado';
import FooterComun from '../components/organisms/FooterComun';
import TarjetaProducto from '../components/TarjetaProducto';
import useProductos from '../hooks/useProductos';


L.Icon.Default.mergeOptions({
  iconUrl: iconoUrl,
  iconRetinaUrl: icono2xUrl,
  shadowUrl: sombraUrl,
});

const CENTRO_LA_SERENA = [-29.9027, -71.2519];
const RADIO_DESPACHO_M = 6000;

export default function Inicio() {
  const { productos } = useProductos();

  const categorias = useMemo(() => {
    const conteo = {};
    productos.forEach((p) => {
      conteo[p.categoria] = (conteo[p.categoria] || 0) + 1;
    });
    return Object.entries(conteo);
  }, [productos]);

  const destacados = useMemo(
    () => productos.filter((p) => p.destacado).slice(0, 4),
    [productos],
  );

  return (
    <>
      <Encabezado etiqueta="CASA MATRIZ: LA SERENA, REGIÓN DE COQUIMBO | +800 REFERENCIAS" />

      <main>
        <section className="mb-3">
          <div className="bg-dark text-white p-4">
            <div className="font-tech small text-warning mb-1">22 AÑOS EN LA SERENA</div>
            <h1 className="h3 fw-black text-uppercase mb-1">Todo para tu obra, en un solo lugar</h1>
            <p className="mb-0 small">Materiales de construccion - todo para tu chamba.</p>
          </div>
        </section>

        <section className="row g-3 mb-3">
          <div className="col-12 col-md-4">
            <div className="bloque-naranja p-3 h-100 d-flex flex-column justify-content-between">
              <div>
                <div className="font-tech small mb-1">SERVICIO A CONTRATISTAS</div>
                <h5 className="fw-black text-uppercase mb-2">Consulta de Stock y Cuenta Corriente</h5>
                <p className="small mb-3">Verifica existencias reales en bodega antes de ir al local o solicita despacho directo a tu obra en La Serena.</p>
              </div>
              <Link to="/productos" className="btn-industrial w-100 text-center">
                Ir a Lista de Productos
              </Link>
            </div>
          </div>

          <div className="col-12 col-md-8">
            <div className="bloque-gris p-3 h-100 d-flex flex-column justify-content-between">
              <div className="d-flex justify-content-between align-items-center border-bottom border-dark pb-2 mb-2">
                <span className="font-tech small fw-bold">FAMILIAS DEL CATÁLOGO OFICIAL</span>
                <span className="font-tech small text-secondary">{categorias.length} ÁREAS ACTIVAS</span>
              </div>
              <div className="row g-2 font-tech small">
                {categorias.map(([nombre, cantidad]) => (
                  <div className="col-6 col-lg-4" key={nombre}>
                    <Link to="/productos" className="text-dark text-decoration-none">
                      &gt; {nombre.toUpperCase()} ({cantidad})
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mb-3">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="font-tech small fw-bold text-uppercase">SECCIÓN DESTACADOS</span>
            <Link to="/productos" className="font-tech small text-dark fw-bold text-decoration-none">VER CATÁLOGO COMPLETO &rarr;</Link>
          </div>
          <div className="row g-3">
            {destacados.length === 0 && (
              <div className="col-12 font-tech small text-secondary">NO HAY PRODUCTOS DESTACADOS.</div>
            )}
            {destacados.map((p) => (
              <div className="col-12 col-sm-6 col-lg-3" key={p.id}>
                <TarjetaProducto producto={p} />
              </div>
            ))}
          </div>
        </section>

        <section className="bloque-gris p-3 mb-4">
          <div className="row g-3 align-items-center">
            <div className="col-12 col-lg-5">
              <div className="font-tech small text-secondary mb-1">REQUISITO TÉCNICO // COBERTURA DE DESPACHO</div>
              <h5 className="fw-bold text-uppercase mb-2">Zona de Entrega en La Serena</h5>
              <p className="small text-secondary mb-3">
                Revisa en el mapa si tu obra se encuentra dentro del radio de cobertura de despacho a domicilio de <strong>Ferretería Los Maestros</strong> antes de confirmar tu pedido.
              </p>
              <Link to="/productos" className="btn-industrial-naranja">
                Hacer Pedido / Cotizar Ahora
              </Link>
            </div>
            <div className="col-12 col-lg-7">
              <MapContainer center={CENTRO_LA_SERENA} zoom={12} scrollWheelZoom={false} className="mapa-cobertura">
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Circle
                  center={CENTRO_LA_SERENA}
                  radius={RADIO_DESPACHO_M}
                  pathOptions={{ color: '#f57c00', fillColor: '#f57c00', fillOpacity: 0.2 }}
                />
                <Marker position={CENTRO_LA_SERENA}>
                  <Popup>Ferretería Los Maestros<br />Despacho hasta 6 km a la redonda.</Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>
        </section>
      </main>

      <FooterComun />
    </>
  );
}
