import { useMemo } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import { MenuItemProps } from '../../types';

import './MenuItem.scss';

const MenuItem = ({ url, label, onClose }: MenuItemProps) => {
  const { pathname } = useLocation();

  const menuItemClasses = useMemo(() => {
    return url === pathname ? 'menu-item active' : 'menu-item';
  }, [pathname, url]);

  return (
    <li className={menuItemClasses} onClick={onClose}>
      <NavLink to={url} className='menu-item__link'>
        {label}
      </NavLink>
    </li>
  );
};

export default MenuItem;
