import React, { useState } from 'react';
import { BadgeStock } from '../atoms/BadgeStock';
import { Button } from '../atoms/Button';
import { QuantitySelector } from '../molecules/QuantitySelector';

export const ProductCard = ({ product, onAddToCart }) => {
  const [cantidad, setCantidad] = useState(1);
  const disponible = product.stock > 0;

  return (
    <div className="card h-100 shadow-sm border-0">
      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <span className="badge bg-light text-secondary border">{product.categoria}</span>
          <BadgeStock stock={product.stock} />
        </div>
        <h5 className="card-title text-truncate" title={product.nombre}>
          {product.nombre}
        </h5>
        <p className="card-text text-muted small mb-3">SKU: {product.codigo}</p>

        <div className="mt-auto">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <span className="fs-5 fw-bold text-primary">
              ${product.precio.toLocaleString('es-CL')}
            </span>
            {disponible && (
              <QuantitySelector
                quantity={cantidad}
                max={product.stock}
                onIncrease={() => setCantidad((prev) => Math.min(prev + 1, product.stock))}
                onDecrease={() => setCantidad((prev) => Math.max(prev - 1, 1))}
              />
            )}
          </div>

          <Button
            variant="primary"
            className="w-100"
            disabled={!disponible}
            onClick={() => onAddToCart({ ...product, cantidadSeleccionada: cantidad })}
          >
            {disponible ? 'Agregar al pedido' : 'Agotado'}
          </Button>
        </div>
      </div>
    </div>
  );
};