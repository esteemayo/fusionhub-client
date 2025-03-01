import { Link } from 'react-router-dom';

import { TeamItemProps } from '../../types';

import './TeamItem.scss';

const TeamItem = ({ img, name, role, socials }: TeamItemProps) => {
  return (
    <article className='team-item'>
      <div className='team-item__container'>
        <img
          src={img}
          width={350}
          height={250}
          alt='avatar'
          className='team-item__container--img'
        />
      </div>
      <div className='team-item__wrapper'>
        <h4 className='team-item__wrapper--name'>{name}</h4>
        <span className='team-item__wrapper--role'>{role}</span>
        <div className='team-item__wrapper--socials'>
          {socials.map((social, index) => {
            const Icon = social;
            return (
              <Link key={index} to='#'>
                <Icon />
              </Link>
            );
          })}
        </div>
      </div>
    </article>
  );
};

export default TeamItem;
