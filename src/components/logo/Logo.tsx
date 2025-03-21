import { useMemo } from 'react';
import { Link } from 'react-router-dom';

import { LogoProps } from '../../types';

import './Logo.scss';

const Logo = ({ isOpen, onClose }: LogoProps) => {
  const logoClasses = useMemo(() => {
    return isOpen ? 'logo hide' : 'logo show';
  }, [isOpen]);

  return (
    <Link to='/' className={logoClasses} onClick={onClose}>
      <img
        src='/svg/logo.svg'
        width={200}
        height={50}
        alt='logo'
        className='logo__icon'
      />
    </Link>
  );
};

export default Logo;
