import { Link } from 'react-router-dom';

import { FaXTwitter } from 'react-icons/fa6';
import { FaThreads } from 'react-icons/fa6';
import { FaFacebookF } from 'react-icons/fa';
import { FaYoutube } from 'react-icons/fa6';
import { BiLogoTiktok } from 'react-icons/bi';
import { FaInstagram } from 'react-icons/fa';

import './Follow.scss';

const Follow = () => {
  return (
    <section className='follow'>
      <div className='follow__container'>
        <h2 className='follow__container--heading'>Follow us</h2>
        <ul className='follow__container--list'>
          <li className='follow__container--list-item'>
            <Link to='/'>
              <FaFacebookF />
            </Link>
          </li>
          <li className='follow__container--list-item'>
            <Link to='/'>
              <BiLogoTiktok />
            </Link>
          </li>
          <li className='follow__container--list-item'>
            <Link to='/'>
              <FaThreads />
            </Link>
          </li>
          <li className='follow__container--list-item'>
            <Link to='/'>
              <FaXTwitter />
            </Link>
          </li>
          <li className='follow__container--list-item'>
            <Link to='/'>
              <FaInstagram />
            </Link>
          </li>
          <li className='follow__container--list-item'>
            <Link to='/'>
              <FaYoutube />
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Follow;
