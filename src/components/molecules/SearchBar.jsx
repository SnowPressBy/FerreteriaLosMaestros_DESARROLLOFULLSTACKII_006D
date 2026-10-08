import { InputField } from '../atoms/InputField';
import { Button } from '../atoms/Button';

export const SearchBar = ({ value, onChange, placeholder = 'Buscar producto o categoría...' }) => {
  return (
    <div className="input-group">
      <InputField
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
      <Button variant="primary" type="button">
        Buscar
      </Button>
    </div>
  );
};