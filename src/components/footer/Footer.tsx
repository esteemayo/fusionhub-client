import { useMemo } from 'react';

import FooterMenu from '../footerMenu/FooterMenu';
import Legal from '../legal/Legal';
import SocialMenu from '../socialMenu/SocialMenu';
import Copyright from '../copyright/Copyright';

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
        <Copyright year={year} />
      </div>
    </footer>
  );
};

export default Footer;
