import { NavLink } from 'react-router-dom';

import { NavItemProps } from '../../types';

import './NavItem.scss';

const NavItem = ({ url, label }: NavItemProps) => {
  return (
    <li className='nav-item'>
      <NavLink
        to={url}
        className={({ isActive }) =>
          isActive ? 'nav-item__link active' : 'nav-item__link'
        }
      >
        {label}
      </NavLink>
    </li>
  );
};

export default NavItem;
