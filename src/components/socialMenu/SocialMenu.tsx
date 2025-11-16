import SocialMenuItem from '../socialMenuItem/SocialMenuItem';

import { socialMenuItems } from '../../data';

import './SocialMenu.scss';

const SocialMenu = () => {
  return (
    <article className='social-menu' aria-label='Social media links'>
      <ul className='social-menu__list' role='list'>
        {socialMenuItems.map((item) => {
          return <SocialMenuItem key={item.id} {...item} />;
        })}
      </ul>
    </article>
  );
};

export default SocialMenu;
