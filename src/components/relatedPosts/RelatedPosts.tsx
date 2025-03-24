import { useEffect, useState } from 'react';

import RelatedPost from '../relatedPost/RelatedPost';
import RelatedSkeleton from '../relatedSkeleton/RelatedSkeleton';

import { relatedPosts } from '../../data';

import './RelatedPosts.scss';

const RelatedPosts = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 3000);
  }, []);

  return (
    <section className='related-posts'>
      <div className='related-posts__container'>
        <h5 className='related-posts__container--heading'>Related posts</h5>
        <div className='related-posts__container--wrapper'>
          {isLoading
            ? Array.from(Array(3)).map((_, index) => {
                return <RelatedSkeleton key={index} />;
              })
            : relatedPosts.slice(0, 4).map((post) => {
                return <RelatedPost key={post.id} {...post} />;
              })}
        </div>
      </div>
    </section>
  );
};

export default RelatedPosts;
