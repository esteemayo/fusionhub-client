import Spinner from '../Spinner';

import { ButtonProps } from '../../types';

import './Button.scss';

const Button = ({
  img,
  label,
  type = 'button',
  loading,
  disabled,
  className,
  onClick,
}: ButtonProps) => {
  return (
    <button
      type={type}
      disabled={!!disabled}
      className={`btn ${className}`}
      onClick={onClick}
    >
      {img && <img src={img} width={25} height={25} alt='logo' />}
      {loading ? <Spinner /> : label}
    </button>
  );
};

export default Button;
