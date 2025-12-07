import TagItem from '../tagItem/TagItem';
import RelatedTagSkeleton from '../relatedTagSkeleton/RelatedTagSkeleton';

import { RelatedTagsProps } from '../../types';

import './RelatedTags.scss';

const RelatedTags = ({ isLoading, tags }: RelatedTagsProps) => {
  if (!tags || tags.length < 1) return null;

  return (
    <section
      className='related-tags'
      role='region'
      aria-labelledby='related-tags-heading'
    >
      <h3
        id='related-tags-heading'
        className='related-tags__heading'
        tabIndex={0}
      >
        Related tags
      </h3>

      <div
        className='related-tags__container'
        role='list'
        aria-live={isLoading ? 'polite' : 'off'}
      >
        {isLoading
          ? Array.from(Array(3)).map((_, index) => {
              return (
                <div key={index} role='listitem'>
                  <RelatedTagSkeleton key={index} />
                </div>
              );
            })
          : tags?.map((tag) => {
              return (
                <div key={tag} role='listitem'>
                  <TagItem label={tag} />
                </div>
              );
            })}
      </div>
    </section>
  );
};

export default RelatedTags;
