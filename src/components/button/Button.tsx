import Image from '../Image';
import Spinner from '../Spinner';

import { ButtonProps } from '../../types';

import './Button.scss';

const Button = ({
  icon,
  label,
  type = 'button',
  variant = 'primary',
  isLoading,
  disabled,
  className,
  onClick,
  ...rest
}: ButtonProps) => {
  return (
    <button
      {...rest}
      type={type}
      disabled={disabled}
      onClick={onClick}
      aria-label={rest['aria-label'] ?? label}
      aria-disabled={disabled}
      aria-busy={isLoading}
      className={`btn ${variant} ${className ?? ''}`}
    >
      {icon && !isLoading && (
        <Image src={icon} width={25} height={25} alt='logo' />
      )}
      {isLoading ? <Spinner /> : label}
    </button>
  );
};

export default Button;
