import { Link } from 'react-router-dom';

import { socialMenuItems } from '../../data';

import './Follow.scss';

const Follow = () => {
  return (
    <section className='follow'>
      <div className='follow__container'>
        <h2 className='follow__container--heading'>Follow us</h2>
        <ul className='follow__container--list'>
          {socialMenuItems.map((social) => {
            const { id, url, icon: Icon } = social;
            return (
              <li key={id} className='follow__container--list-item'>
                <Link to={url}>
                  <Icon />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default Follow;
