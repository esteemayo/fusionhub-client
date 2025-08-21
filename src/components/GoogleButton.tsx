import Button from './button/Button';

import { GoogleButtonProps } from '../types';

const GoogleButton = ({
  icon,
  label,
  color = 'outline',
  isLoading,
  disabled,
  onClick,
}: GoogleButtonProps) => {
  return (
    <Button
      icon={icon}
      label={label}
      color={color}
      onClick={onClick}
      isLoading={isLoading}
      disabled={disabled}
    />
  );
};

export default GoogleButton;
