import { Link } from 'react-router-dom';

import { FooterMenuItemProps } from '../../types';

import './FooterMenuItem.scss';

const FooterMenuItem = ({ url, label }: FooterMenuItemProps) => {
  return (
    <li className='footer-menu-item' role='none'>
      <Link to={url} className='footer-menu-item__link' aria-label={label}>
        {label}
      </Link>
    </li>
  );
};

export default FooterMenuItem;
