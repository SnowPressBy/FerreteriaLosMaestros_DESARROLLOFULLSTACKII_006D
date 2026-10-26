import { useState } from 'react';
import { rutaLogo } from '../../utils/imagenes';

export default function Logo() {
  const [fallo, setFallo] = useState(false);

  if (fallo) {
    return (
      <div className="fs-4 fw-black text-uppercase" style={{ letterSpacing: '-0.5px' }}>
        LOS MAESTROS
      </div>
    );
  }

  return (
    <img
      src={rutaLogo()}
      alt="Ferretería Los Maestros"
      className="img-fluid"
      style={{ maxHeight: '70px', objectFit: 'contain' }}
      onError={() => setFallo(true)}
    />
  );
}
