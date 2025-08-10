import { Link } from 'react-router-dom';

import Image from '../Image';

import { FeedProps } from '../../types';
import { useDate } from '../../hooks/useDate';

import './Feed.scss';

const Feed = ({ img, title, slug, createdAt, onClose }: FeedProps) => {
  const { formattedDate } = useDate(createdAt);

  return (
    <article className='feed'>
      <div className='feed__wrapper'>
        <Image
          src={img ?? '/dafault-post.jpg'}
          alt='image'
          width={65}
          height={65}
          className='feed__wrapper--img'
        />
      </div>
      <div className='feed__box'>
        <h3 className='feed__box--title'>
          <Link to={`/post/${slug}`} onClick={onClose}>
            {title}
          </Link>
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
          <span>{formattedDate}</span>
        </time>
      </div>
    </article>
  );
};

export default Feed;
