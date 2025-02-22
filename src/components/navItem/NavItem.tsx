import { Link } from 'react-router-dom';

import { NavItemProps } from '../../types';

import './NavItem.scss';

const NavItem = ({ url, label }: NavItemProps) => {
  return (
    <li className='nav-item'>
      <Link to={url} className='nav-item__link'>
        {label}
      </Link>
    </li>
  );
};

export default NavItem;
