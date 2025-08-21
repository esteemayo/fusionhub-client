import Image from '../Image';
import Spinner from '../Spinner';

import { ButtonProps } from '../../types';

import './Button.scss';

const Button = ({
  icon,
  label,
  type = 'button',
  color = 'primary',
  isLoading,
  disabled,
  className,
  onClick,
}: ButtonProps) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`btn ${color} ${className ?? ''}`}
      onClick={onClick}
    >
      {icon && !isLoading && (
        <Image src={icon} width={25} height={25} alt='logo' />
      )}
      {isLoading ? <Spinner /> : label}
    </button>
  );
};

export default Button;
