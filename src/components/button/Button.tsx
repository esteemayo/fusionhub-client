import Spinner from '../Spinner';

import { ButtonProps } from '../../types';

import './Button.scss';

const Button = ({
  icon,
  label,
  type = 'button',
  loading,
  disabled,
  color,
  onClick,
}: ButtonProps) => {
  return (
    <button
      type={type}
      disabled={!!disabled}
      className={`btn ${color}`}
      onClick={onClick}
    >
      {icon && !loading && <img src={icon} width={25} height={25} alt='logo' />}
      {loading ? <Spinner /> : label}
    </button>
  );
};

export default Button;
