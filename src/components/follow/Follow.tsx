import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import FollowSkeleton from '../followSkeleton/FollowSkeleton';

import { socialMenuItems } from '../../data';

import './Follow.scss';

const Follow = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 5000);
  }, []);

  return (
    <section className='follow'>
      <div className='follow__container'>
        <h2 className='follow__container--heading'>Follow us</h2>
        <ul className='follow__container--list'>
          {isLoading
            ? Array.from(Array(6)).map((_, index) => {
                return <FollowSkeleton key={index} />;
              })
            : socialMenuItems.map((social) => {
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
