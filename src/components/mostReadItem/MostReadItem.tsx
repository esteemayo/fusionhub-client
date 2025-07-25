import { Link } from 'react-router-dom';

import { MostReadItemProps } from '../../types';

import './MostReadItem.scss';

const MostReadItem = ({ slug, title, views }: MostReadItemProps) => {
  return (
    <article className='most-read-item'>
      <Link to={`/post/${slug}`} className='most-read-item__link'>
        <span className='most-read-item__link--title'>{title}</span> {''}
        <span className='most-read-item__link--views'>
          ({views.toLocaleString()} views)
        </span>
      </Link>
    </article>
  );
};

export default MostReadItem;
