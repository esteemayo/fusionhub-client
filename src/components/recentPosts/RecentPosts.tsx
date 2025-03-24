import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Card from '../card/Card';
import RecentSkeleton from '../recentSkeleton/RecentSkeleton';

import { postItems } from '../../data';

import './RecentPosts.scss';

const RecentPosts = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 3000);
  }, []);

  return (
    <section className='recent-posts'>
      <div className='recent-posts__container'>
        <h6 className='recent-posts__container--heading'>Recent articles</h6>
        <div className='recent-posts__wrapper'>
          {isLoading
            ? Array.from(Array(8)).map((_, index) => {
                return <RecentSkeleton key={index} />;
              })
            : postItems.slice(0, 8).map((post) => {
                return <Card key={post.id} {...post} />;
              })}
        </div>
        <div className='recent-posts__box'>
          <Link to='/posts' className='recent-posts__box--link'>
            Show more
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RecentPosts;
