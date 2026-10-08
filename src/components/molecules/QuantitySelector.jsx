import { Button } from '../atoms/Button';

export const QuantitySelector = ({ quantity, onIncrease, onDecrease, max }) => {
  return (
    <div className="d-flex align-items-center">
      <Button
        variant="outline-secondary"
        className="btn-sm"
        onClick={onDecrease}
        disabled={quantity <= 1}
      >
        -
      </Button>
      <span className="mx-2 fw-bold">{quantity}</span>
      <Button
        variant="outline-secondary"
        className="btn-sm"
        onClick={onIncrease}
        disabled={quantity >= max}
      >
        +
      </Button>
    </div>
  );
};