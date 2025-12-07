import { Link } from 'react-router-dom';

import { FollowProps } from '../../types';
import { socialMenuItems } from '../../data';

import './Follow.scss';

const Follow = ({ onClose }: FollowProps) => {
  return (
    <section className='follow' role='region' aria-labelledby='follow-heading'>
      <div className='follow__container'>
        <h2 id='follow-heading' className='follow__container--heading'>
          Follow us
        </h2>

        <ul className='follow__container--list' role='list'>
          {socialMenuItems.map((social) => {
            const { id, url, label, icon: Icon } = social;
            return (
              <li
                key={id}
                className='follow__container--list-item'
                role='listitem'
              >
                <Link
                  to={url}
                  onClick={onClose}
                  aria-label={`Visit our ${label} page`}
                >
                  <Icon role='img' aria-hidden='true' focusable='false' />

                  <span className='sr-only'>{label}</span>
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
