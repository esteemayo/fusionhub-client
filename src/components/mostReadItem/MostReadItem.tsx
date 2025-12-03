import { Link } from 'react-router-dom';

import { MostReadItemProps } from '../../types';

import './MostReadItem.scss';

const MostReadItem = ({ slug, title, views, onClose }: MostReadItemProps) => {
  const formattedViews = views.toLocaleString();

  return (
    <article
      className='most-read-item'
      role='article'
      aria-label={`Most read post: ${title}, ${formattedViews} views`}
    >
      <Link
        to={`/post/${slug}`}
        onClick={onClose}
        className='most-read-item__link'
        aria-label={`${title}. ${formattedViews} views. Open post`}
      >
        <span className='most-read-item__link--title'>{title}</span> {''}
        <span className='most-read-item__link--views' aria-hidden='true'>
          ({formattedViews} views)
        </span>
      </Link>
    </article>
  );
};

export default MostReadItem;
