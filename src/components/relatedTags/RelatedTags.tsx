import TagItem from '../tagItem/TagItem';
import RelatedTagSkeleton from '../relatedTagSkeleton/RelatedTagSkeleton';

import { RelatedTagsProps } from '../../types';

import './RelatedTags.scss';

const RelatedTags = ({ isLoading, tags }: RelatedTagsProps) => {
  if (tags?.length < 1) {
    return null;
  }

  return (
    <section className='related-tags'>
      <h3 className='related-tags__heading' aria-label='Related tags'>
        Related tags
      </h3>
      <div className='related-tags__container'>
        {isLoading
          ? Array.from(Array(3)).map((_, index) => {
              return <RelatedTagSkeleton key={index} />;
            })
          : tags?.map((tag, index) => {
              return <TagItem key={index} label={tag} />;
            })}
      </div>
    </section>
  );
};

export default RelatedTags;
