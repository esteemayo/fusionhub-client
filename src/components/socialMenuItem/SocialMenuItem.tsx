import { Link } from 'react-router-dom';

import { SocialMenuItemProps } from '../../types';

import './SocialMenuItem.scss';

const SocialMenuItem = ({ url, label, icon: Icon }: SocialMenuItemProps) => {
  return (
    <li className='social-menu-item' role='listitem'>
      <Link
        to={url}
        className='social-menu-item__link'
        target='_blank'
        rel='noopener noreferrer'
        aria-label={`Visit our ${label} page`}
      >
        <Icon />
      </Link>
    </li>
  );
};

export default SocialMenuItem;
