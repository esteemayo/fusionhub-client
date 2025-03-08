import SocialMenuItem from '../socialMenuItem/SocialMenuItem';

import { socialMenuItems } from '../../data';

import './SocialMenu.scss';

const SocialMenu = () => {
  return (
    <article className='social-menu'>
      <ul className='social-menu__list'>
        {socialMenuItems.map((item) => {
          return <SocialMenuItem key={item.id} {...item} />;
        })}
      </ul>
    </article>
  );
};

export default SocialMenu;
