import { Link } from 'react-router-dom';

import Card from '../card/Card';

import { postItems } from '../../data';

import './RecentPosts.scss';

const RecentPosts = () => {
  return (
    <div className='recent-posts'>
      <div className='recent-posts__container'>
        <h6 className='recent-posts__container--heading'>Recent articles</h6>
        <div className='recent-posts__wrapper'>
          {postItems.slice(0, 8).map((post) => {
            return <Card key={post.id} {...post} />;
          })}
        </div>
        <div className='recent-posts__box'>
          <Link to='/posts' className='recent-posts__box--link'>
            Show more
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RecentPosts;
