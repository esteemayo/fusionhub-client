import { Link } from 'react-router-dom';

import { TeamItemProps } from '../../types';

import './TeamItem.scss';

const TeamItem = ({ img, name, role, socials }: TeamItemProps) => {
  return (
    <article
      className='team-item'
      role='listitem'
      aria-labelledby={`${name}-heading`}
    >
      <div className='team-item__container'>
        <img
          src={img}
          width={350}
          height={250}
          alt={`${name}'s profile picture`}
          loading='lazy'
          className='team-item__container--img'
        />
      </div>

      <div className='team-item__wrapper'>
        <h4 id={`${name}-heading`} className='team-item__wrapper--name'>
          {name}
        </h4>

        <p className='team-item__wrapper--role'>{role}</p>

        <div
          className='team-item__wrapper--socials'
          role='group'
          aria-label={`Social links for ${name}`}
        >
          {socials.map((SocialIcon, index) => {
            const label = `Visit ${name}'s ${
              SocialIcon.name || 'social'
            } profile`;

            return (
              <Link key={index} to='#' aria-label={label} title={label}>
                <SocialIcon aria-hidden='true' focusable='false' />
              </Link>
            );
          })}
        </div>
      </div>
    </article>
  );
};

export default TeamItem;
