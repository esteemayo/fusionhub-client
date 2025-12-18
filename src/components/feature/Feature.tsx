import parse from 'html-react-parser';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { useMemo } from 'react';

import CalendarDaysIcon from '../icons/CalendarDaysIcon';
import Image from '../Image';
import ChatBubbleOvalLeftIcon from '../icons/ChatBubbleOvalLeftIcon';

import { formatDate } from '../../utils/formatDate';
import { formatDay } from '../../utils/formatDay';
import { formatMonth } from '../../utils/formatMonth';

import { excerpts } from '../../utils';
import { FeatureProps } from '../../types';

import './Feature.scss';

const Feature = ({
  img,
  desc,
  title,
  slug,
  comments,
  createdAt,
}: FeatureProps) => {
  const imageSrc =
    typeof img === 'string' && img.trim().length > 0
      ? img
      : '/default-post.jpg';

  const parsedDesc = useMemo(
    () => parse(excerpts(String(desc), 150)).toString(),
    [desc]
  );

  return (
    <article
      className='feature'
      role='article'
      aria-labelledby={`feature-title-${slug}`}
      aria-describedby={`feature-desc-${slug}`}
    >
      <figure className='feature__cover'>
        <Image
          src={imageSrc}
          width={450}
          height={300}
          alt={`Thumbnail image for ${title}`}
          className='feature__cover--img'
        />

        <div className='feature__calendar' aria-hidden='true'>
          <div className='feature__calendar--wrap'>
            <span>{formatDay(createdAt)}</span>
            <span>{formatMonth(createdAt)}</span>
          </div>
        </div>
      </figure>

      <footer className='feature__footer'>
        <div className='feature__wrapper'>
          <div
            className='feature__wrapper--date'
            aria-label={`Published on ${formatDate(createdAt)}`}
          >
            <CalendarDaysIcon />
            <time dateTime={createdAt}>{formatDate(createdAt)}</time>
          </div>

          <div
            className='feature__wrapper--comments'
            aria-label={`Total comments: ${comments.length}`}
          >
            <ChatBubbleOvalLeftIcon />
            <span>{millify(comments.length)}</span>
          </div>
        </div>

        <div className='feature__box'>
          <h4
            id={`feature-title-${slug}`}
            className='feature__box--heading'
            aria-label='Post summary'
          >
            {title}
          </h4>

          <div
            id={`feature-desc-${slug}`}
            className='feature__box--desc'
            aria-label='Post summary'
          >
            {parse(parsedDesc)}
          </div>

          <Link
            to={`/post/${slug}`}
            aria-label={`Read full post: ${title}`}
            className='feature__box--link'
          >
            Read more
          </Link>
        </div>
      </footer>
    </article>
  );
};

export default Feature;
