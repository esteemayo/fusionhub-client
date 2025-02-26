import { FaLinkedinIn } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { FaGooglePlusG } from 'react-icons/fa6';
import { FaInstagram } from 'react-icons/fa';

import './TeamItem.scss';

const TeamItem = () => {
  return (
    <article className='team-item'>
      <div className='team-item__container'>
        <img
          src='/user-4.webp'
          width={350}
          height={250}
          alt='avatar'
          className='team-item__container--img'
        />
      </div>
      <div className='team-item__wrapper'>
        <h4 className='team-item__wrapper--name'>Tim kamerer</h4>
        <span className='team-item__wrapper--role'>Technical director</span>
        <div className='team-item__wrapper--social'>
          <Link to='#'>
            <FaGooglePlusG />
          </Link>
          <Link to='#'>
            <FaInstagram />
          </Link>
          <Link to='#'>
            <FaLinkedinIn />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default TeamItem;
