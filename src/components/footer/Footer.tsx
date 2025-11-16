import { useMemo } from 'react';

import Copyright from '../copyright/Copyright';
import FooterMenu from '../footerMenu/FooterMenu';

import Legal from '../legal/Legal';
import SocialMenu from '../socialMenu/SocialMenu';

import './Footer.scss';

const Footer = () => {
  const year = useMemo(() => {
    const date = new Date();
    return date.getFullYear();
  }, []);

  return (
    <footer className='footer' role='contentinfo' aria-label='Website footer'>
      <div className='footer__container'>
        <div
          className='footer__wrapper'
          role='navigation'
          aria-label='Footer navigation'
        >
          <FooterMenu />
          <SocialMenu />
        </div>
        <Legal />
        <Copyright value={year} />
      </div>
    </footer>
  );
};

export default Footer;
