import { Link } from 'react-router-dom';

import Image from '../Image';

import { FeedProps } from '../../types';
import { useDate } from '../../hooks/useDate';

import './Feed.scss';

const Feed = ({ img, title, slug, createdAt, onClose }: FeedProps) => {
  const { formattedDate } = useDate(createdAt);

  return (
    <article
      role='article'
      aria-label={`Post titled ${title}`}
      className='feed'
    >
      <figure className='feed__wrapper'>
        <Image
          src={img ?? '/dafault-post.jpg'}
          width={65}
          height={65}
          alt={title ? `Thumbnail for ${title}` : 'Post thumbnail'}
          className='feed__wrapper--img'
        />
      </figure>
      <div className='feed__box'>
        <h3 className='feed__box--title'>
          <Link
            to={`/post/${slug}`}
            onClick={onClose}
            aria-label={`Read post: ${title}`}
          >
            {title}
          </Link>
        </h3>
        <time
          dateTime={createdAt}
          aria-label={`Published on ${formattedDate}`}
          className='feed__box--date'
        >
          <svg
            aria-hidden='true'
            focusable='false'
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
          <span>{formattedDate}</span>
        </time>
      </div>
    </article>
  );
};

export default Feed;
