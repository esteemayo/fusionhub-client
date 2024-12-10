import { Link } from 'react-router-dom';
import {TiSocialFacebook} from 'react-icons/ti'
import {BiLogoTiktok} from 'react-icons/bi'
import { TfiInstagram } from "react-icons/tfi";
import { FaThreads } from "react-icons/fa6"
import { FaXTwitter } from "react-icons/fa6"
import { FaYoutube } from "react-icons/fa6"

import './Footer.scss';

const Footer = () => {
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
              <li>
                <Link to='/'>
                <TiSocialFacebook />
                </Link>
              </li>
              <li>
                <Link to='/'><BiLogoTiktok/></Link>
              </li>
              <li>
                <Link to='/'><FaThreads /></Link>
              </li>
              <li>
                <Link to='/'><FaXTwitter /></Link>
              </li>
              <li>
                <Link to='/'><TfiInstagram /></Link>
              </li>
              <li>
                <Link to='/'><FaYoutube /></Link>
              </li>
            </ul>
          </article>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
