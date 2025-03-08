import { Link } from 'react-router-dom';

import { SocialMenuItemProps } from '../../types';

import './SocialMenuItem.scss';

const SocialMenuItem = ({ url, icon: Icon }: SocialMenuItemProps) => {
  return (
    <li className='social-menu-item'>
      <Link to={url} className='social-menu-item__link'>
        <Icon />
      </Link>
    </li>
  );
};

export default SocialMenuItem;
