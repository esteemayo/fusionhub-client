import parse from 'html-react-parser';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { useMemo } from 'react';

import Image from '../Image';

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
  const parsedDesc = useMemo(
    () => parse(excerpts(String(desc), 150)).toString(),
    [desc]
  );

  return (
    <article
      role='article'
      aria-label={`Featured post: ${title}`}
      className='feature'
    >
      <figure className='feature__cover'>
        <Image
          src={img ?? 'dafault-post.jpg'}
          width={450}
          height={300}
          alt={`Thumbnail image for ${title}`}
          className='feature__cover--img'
        />
        <div className='feature__calendar'>
          <div className='feature__calendar--wrap'>
            <span>{formatDay(createdAt)}</span>
            <span>{formatMonth(createdAt)}</span>
          </div>
        </div>
      </figure>
      <footer className='feature__footer'>
        <div className='feature__wrapper'>
          <div className='feature__wrapper--date'>
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
                d='M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z'
              />
            </svg>
            <time
              dateTime={createdAt}
              aria-label={`Published on ${formatDate(createdAt)}`}
            >
              {formatDate(createdAt)}
            </time>
          </div>
          <div className='feature__wrapper--comments'>
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
                d='M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z'
              />
            </svg>
            <span aria-label={`Total comments: ${millify(comments.length)}`}>
              {millify(comments.length)}
            </span>
          </div>
        </div>
        <div className='feature__box'>
          <h4
            aria-label={`Post title: ${title}`}
            className='feature__box--heading'
          >
            {title}
          </h4>
          <div aria-label='Post summary' className='feature__box--desc'>
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
