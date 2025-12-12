import millify from 'millify';
import { Link } from 'react-router-dom';

import CalendarDaysIcon from '../icons/CalendarDaysIcon';
import Image from '../Image';
import ChatBubbleOvalLeftIcon from '../icons/ChatBubbleOvalLeftIcon';

import { FeatureCardProps } from '../../types';
import { formatDate } from '../../utils/formatDate';

import './FeatureCard.scss';

const FeatureCard = ({
  img,
  title,
  slug,
  comments,
  createdAt,
}: FeatureCardProps) => {
  return (
    <article
      role='article'
      className='feature-card'
      aria-labelledby={`feature-card-title-${slug}`}
      aria-describedby={`feature-card-meta-${slug}`}
    >
      <div className='feature-card__container'>
        <figure className='feature-card__cover'>
          <Image
            src={img ?? '/dafault-post.jpg'}
            width={110}
            height={110}
            alt={`Thumbnail image for ${title}`}
            className='feature-card__cover--img'
          />
        </figure>

        <div className='feature-card__details'>
          <div
            id={`feature-card-meta-${slug}`}
            className='feature-card__box'
            role='group'
            aria-label={`Post metadata for ${title}`}
          >
            <div
              className='feature-card__box--date'
              aria-label={`Published on ${formatDate(createdAt)}`}
            >
              <CalendarDaysIcon />
              <time dateTime={createdAt}>{formatDate(createdAt)}</time>
            </div>
            <div
              className='feature-card__box--comments'
              aria-label={`Total comments: ${comments.length}`}
            >
              <ChatBubbleOvalLeftIcon />
              <span>{millify(comments.length)}</span>
            </div>
          </div>
          <div className='feature-card__detail'>
            <h5
              id={`feature-card-title-${slug}`}
              className='feature-card__detail--heading'
            >
              {title}
            </h5>

            <Link
              to={`/post/${slug}`}
              className='feature-card__detail--link'
              aria-label={`Read full post: ${title}`}
            >
              Read more
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};

export default FeatureCard;
