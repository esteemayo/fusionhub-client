import { Link } from 'react-router-dom';

import { LogoProps } from '../../types';

import './Logo.scss';

const Logo = ({ onClose }: LogoProps) => {
  return (
    <Link to='/' className='logo' onClick={onClose}>
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
