import React, { useState } from 'react';
import { initialProducts } from '../data/mockProducts';
import { SearchBar } from '../components/molecules/SearchBar';
import { ProductCard } from '../components/organisms/ProductCard';

export default function CatalogPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [cartCount, setCartCount] = useState(0);

  // Filtrado reactivo en memoria
  const filteredProducts = initialProducts.filter((p) =>
    p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.categoria.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddToCart = (item) => {
    setCartCount((prev) => prev + item.cantidadSeleccionada);
    alert(`Agregado: ${item.cantidadSeleccionada}x ${item.nombre}`);
  };

  return (
    <div>
      {/* Barra superior con buscador y contador de carro */}
      <div className="row g-3 align-items-center mb-4">
        <div className="col-12 col-md-6">
          <h2 className="fw-bold mb-1">Catálogo de Materiales</h2>
          <span className="badge bg-primary">Ítems en pedido: {cartCount}</span>
        </div>
        <div className="col-12 col-md-6">
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
        </div>
      </div>

      {/* Grid responsivo: 1 col (móvil ≥ 360px), 2 cols (tablet ≥ 768px), 4 cols (escritorio ≥ 1280px) */}
      <div className="row g-3 g-lg-4">
        {filteredProducts.map((prod) => (
          <div key={prod.id} className="col-12 col-md-6 col-xl-3">
            <ProductCard product={prod} onAddToCart={handleAddToCart} />
          </div>
        ))}
        {filteredProducts.length === 0 && (
          <div className="col-12 text-center py-5">
            <p className="text-muted">No se encontraron productos coincidentes.</p>
          </div>
        )}
      </div>
    </div>
  );
}