import { Link } from 'react-router-dom';

import Image from '../Image';
import ClockOutlinedIcon from '../icons/ClockOutlinedIcon';

import { FeedProps } from '../../types';
import { imageSrc } from '../../utils';
import { useDate } from '../../hooks/useDate';

import './Feed.scss';

const Feed = ({ img, title, slug, createdAt, onClose }: FeedProps) => {
  const { formattedDate } = useDate(createdAt);

  return (
    <article
      className='feed'
      role='article'
      aria-label={`Trending post: ${title}`}
      aria-labelledby={`feed-title-${slug}`}
      tabIndex={0}
    >
      <figure className='feed__wrapper'>
        <Image
          src={imageSrc(img)}
          width={65}
          height={65}
          alt={title ? `Thumbnail for ${title}` : 'Post thumbnail'}
          className='feed__wrapper--img'
        />
      </figure>

      <div className='feed__box'>
        <h3 id={`feed-title-${slug}`} className='feed__box--title'>
          <Link
            to={`/post/${slug}`}
            onClick={onClose}
            aria-label={`Read full post titled: ${title}`}
          >
            {title}
          </Link>
        </h3>

        <time
          dateTime={createdAt}
          className='feed__box--date'
          aria-label={`Published on ${formattedDate}`}
        >
          <ClockOutlinedIcon />
          <span>{formattedDate}</span>
        </time>
      </div>
    </article>
  );
};

export default Feed;
