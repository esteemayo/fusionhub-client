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
    <footer className='footer'>
      <div className='footer__container'>
        <div className='footer__wrapper'>
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
