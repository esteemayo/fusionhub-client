import { useEffect, useState } from 'react';

import Card from '../card/Card';
import CardSkeleton from '../cardSkeleton/CardSkeleton';

import { postItems } from '../../data';

import './PostItems.scss';

const PostItems = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 5000);
  }, []);

  return (
    <section className='postItems'>
      <div className='postItems__container'>
        {isLoading
          ? Array.from(Array(12)).map((_, index) => {
              return <CardSkeleton key={index} />;
            })
          : postItems.map((post) => {
              return <Card key={post.id} {...post} />;
            })}
      </div>
    </section>
  );
};

export default PostItems;
