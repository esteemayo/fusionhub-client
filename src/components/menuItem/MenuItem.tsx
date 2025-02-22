import { Link } from 'react-router-dom';

import { MenuItemProps } from '../../types';

import './MenuItem.scss';

const MenuItem = ({ url, label, onClose }: MenuItemProps) => {
  return (
    <li className='menu-item' onClick={onClose}>
      <Link to={url} className='menu-item__link'>
        {label}
      </Link>
    </li>
  );
};

export default MenuItem;
