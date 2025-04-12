import { useEffect, useState } from 'react';

import TagItem from '../tagItem/TagItem';
import TagSkeleton from '../tagSkeleton/TagSkeleton';

import { tagItems } from '../../data';

import './Tags.scss';

const Tags = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1500);
  }, []);

  return (
    <section className='tags'>
      <div className='tags__container'>
        <h2 className='tags__container--heading'>Tags</h2>
        <div className='tags__wrapper'>
          {isLoading
            ? Array.from(new Array(3)).map((_, index) => {
                return <TagSkeleton key={index} />;
              })
            : tagItems.map((tag) => {
                const { id, label } = tag;
                return <TagItem key={id} label={label} />;
              })}
        </div>
      </div>
    </section>
  );
};

export default Tags;
