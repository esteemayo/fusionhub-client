import TagItem from '../tagItem/TagItem';

import { relatedTags } from '../../data';

import './RelatedTags.scss';

const RelatedTags = () => {
  return (
    <section className='related-tags'>
      <h3 className='related-tags__heading'>Related tags</h3>
      <div className='related-tags__container'>
        {relatedTags.map((tag) => {
          const { id, label } = tag;
          return <TagItem key={id} label={label} />;
        })}
      </div>
    </section>
  );
};

export default RelatedTags;
