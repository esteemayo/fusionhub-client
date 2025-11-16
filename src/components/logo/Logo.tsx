import { useMemo } from 'react';
import { Link } from 'react-router-dom';

import Image from '../Image';

import { LogoProps } from '../../types';

import './Logo.scss';

const Logo = ({ isOpen, onClose }: LogoProps) => {
  const logoClasses = useMemo(
    () => (isOpen ? 'logo hide' : 'logo show'),
    [isOpen]
  );

  return (
    <Link
      to='/'
      onClick={onClose}
      className={logoClasses}
      aria-label='Go to FusionHub homepage'
    >
      <Image
        src='/fusion-hub-logo-4.svg'
        width={200}
        height={50}
        alt='FusionHub logo'
        className='logo__icon'
      />
    </Link>
  );
};

export default Logo;
