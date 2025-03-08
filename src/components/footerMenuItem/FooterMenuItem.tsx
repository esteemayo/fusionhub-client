import { Link } from 'react-router-dom';

import { FooterMenuItemProps } from '../../types';

import './FooterMenuItem.scss';

const FooterMenuItem = ({ url, label }: FooterMenuItemProps) => {
  return (
    <li className='footer-menu-item'>
      <Link to={url} className='footer-menu-item__link'>
        {label}
      </Link>
    </li>
  );
};

export default FooterMenuItem;
