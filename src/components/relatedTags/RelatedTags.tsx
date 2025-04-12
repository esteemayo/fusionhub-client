import { useEffect, useState } from 'react';

import TagItem from '../tagItem/TagItem';
import RelatedTagSkeleton from '../relatedTagSkeleton/RelatedTagSkeleton';

import { relatedTags } from '../../data';

import './RelatedTags.scss';

const RelatedTags = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1500);
  }, []);

  return (
    <section className='related-tags'>
      <h3 className='related-tags__heading'>Related tags</h3>
      <div className='related-tags__container'>
        {isLoading
          ? Array.from(Array(3)).map((_, index) => {
              return <RelatedTagSkeleton key={index} />;
            })
          : relatedTags.map((tag) => {
              const { id, label } = tag;
              return <TagItem key={id} label={label} />;
            })}
      </div>
    </section>
  );
};

export default RelatedTags;
