import { useEffect, useState } from 'react';

import PostList from '../../components/postList/PostList';
import AccountHeading from '../../components/accountHeading/AccountHeading';

import { postItems } from '../../data';

import './Articles.scss';

const Articles = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 3000);
  }, []);

  return (
    <div className='articles'>
      <div className='articles__container'>
        <AccountHeading
          title='My posts'
          subtitle='Stories written by me'
          type='profile'
        />
      </div>
      <div className='articles__wrapper'>
        <PostList posts={postItems} loading={isLoading} />
      </div>
    </div>
  );
};

export default Articles;
