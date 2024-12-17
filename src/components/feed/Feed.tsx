import { format } from 'timeago.js';
import { Link } from 'react-router-dom';

import { FeedProps } from '../../types';

import './Feed.scss';

const Feed = ({ img, title, slug, createdAt }: FeedProps) => {
  return (
    <article className='feed'>
      <div className='feed__wrapper'>
        {img && (
          <img
            src={img}
            alt='image'
            width={80}
            height={80}
            className='feed__wrapper--img'
          />
        )}
      </div>
      <div className='feed__box'>
        <h3 className='feed__box--title'>
          <Link to={`/posts/${slug}`}>{title}</Link>
        </h3>
        <time dateTime={createdAt} className='feed__box--date'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='size-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
            />
          </svg>
          <span>{format(createdAt)}</span>
        </time>
      </div>
    </article>
  );
};

export default Feed;
