import { useMemo } from 'react';
import { Link } from 'react-router-dom';

import { FaXTwitter } from 'react-icons/fa6';
import { FaThreads } from 'react-icons/fa6';
import { FaFacebookF } from 'react-icons/fa';
import { FaYoutube } from 'react-icons/fa6';
import { BiLogoTiktok } from 'react-icons/bi';
import { FaInstagram } from 'react-icons/fa';

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
          <ul className='footer__menu'>
            <li className='footer__menu--item'>
              <Link to='/'>Terms and Conditions</Link>
            </li>
            <li className='footer__menu--item'>
              <Link to='/'>Privacy Policy</Link>
            </li>
            <li className='footer__menu--item'>
              <Link to='/'>Cookie Preferences</Link>
            </li>
            <li className='footer__menu--item'>
              <Link to='/'>License Agreement</Link>
            </li>
            <li className='footer__menu--item'>
              <Link to='/'>Website Terms</Link>
            </li>
            <li className='footer__menu--item'>
              <Link to='/'>Privacy Portal</Link>
            </li>
            <li className='footer__menu--item'>
              <Link to='/'>Help</Link>
            </li>
          </ul>
          <article className='footer__socialMenu'>
            <ul className='footer__socialMenu--list'>
              <li className='footer__socialMenu--list-item'>
                <Link to='/'>
                  <FaFacebookF />
                </Link>
              </li>
              <li className='footer__socialMenu--list-item'>
                <Link to='/'>
                  <BiLogoTiktok />
                </Link>
              </li>
              <li className='footer__socialMenu--list-item'>
                <Link to='/'>
                  <FaThreads />
                </Link>
              </li>
              <li className='footer__socialMenu--list-item'>
                <Link to='/'>
                  <FaXTwitter />
                </Link>
              </li>
              <li className='footer__socialMenu--list-item'>
                <Link to='/'>
                  <FaInstagram />
                </Link>
              </li>
              <li className='footer__socialMenu--list-item'>
                <Link to='/'>
                  <FaYoutube />
                </Link>
              </li>
            </ul>
          </article>
        </div>
        <div className='footer__legal'>
          <p className='footer__legal--text'>
            This website (www.blog.com) is copyright protected by the laws of
            Nigeria and the rest of the World Countries represented on this
            website and by International Treaties. No part of this website
            (www.blog.com) may be saved or stored, reproduced, used or
            transmitted in any form or by any electronic or mechanical means,
            including, but not limited to storage thereof by e-mail or any other
            means, and the use thereof on any other website and/or any other
            media form, without the written and express permission of Blog.
          </p>
        </div>
        <div className='footer__copyright'>
          <p className='footer__copyright--text'>
            &copy; {year} •&nbsp;All rights reserved •&nbsp;Designed & Developed
            by <b>Emmanuel Adebayo&trade;</b>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
