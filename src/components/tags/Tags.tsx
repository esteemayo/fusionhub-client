import TagItem from '../tagItem/TagItem';

import { tagItems } from '../../data';

import './Tags.scss';

const Tags = () => {
  return (
    <aside className='tags'>
      <div className='tags__container'>
        <h2 className='tags__container--heading'>Tags</h2>
        <div className='tags__wrapper'>
          {tagItems.map((tag) => {
            const { id, label } = tag;
            return <TagItem key={id} label={label} />;
          })}
        </div>
      </div>
    </aside>
  );
};

export default Tags;
