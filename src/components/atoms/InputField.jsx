export const InputField = ({ type = 'text', className = '', ...props }) => {
  return (
    <input type={type} className={`form-control ${className}`} {...props} />
  );
};