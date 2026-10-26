import { estadoStock } from '../../utils/formato';

const ESTADOS = {
  disponible: { texto: 'DISPONIBLE', clase: 'bg-success' },
  bajo: { texto: 'STOCK BAJO', clase: 'bg-warning text-dark' },
  agotado: { texto: 'AGOTADO', clase: 'bg-danger' },
};

export default function BadgeEstado({ stock }) {
  const { texto, clase } = ESTADOS[estadoStock(stock)];
  return <span className={`badge font-tech ${clase}`}>{texto}</span>;
}
