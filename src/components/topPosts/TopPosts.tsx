import { useEffect, useState } from 'react';

import TopPost from '../topPost/TopPost';
import TopPostSkeleton from '../topPostSkeleton/TopPostSkeleton';

import { topPosts } from '../../data';

import './TopPosts.scss';

const TopPosts = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 5000);
  }, []);

  return (
    <section className='top-posts'>
      <div className='top-posts__container'>
        <h2 className='top-posts__container--heading'>Top posts</h2>
        {isLoading
          ? Array.from(new Array(5)).map((_, index) => {
              return <TopPostSkeleton key={index} />;
            })
          : topPosts.map((post, i) => {
              return <TopPost key={post.id} index={i} {...post} />;
            })}
      </div>
    </section>
  );
};

export default TopPosts;
