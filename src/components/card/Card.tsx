import { useEffect, useMemo, useState } from 'react';
import { format } from 'timeago.js';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import parse from 'html-react-parser';

import Image from '../Image';

import { excerpts } from '../../utils';
import { useDate } from '../../hooks/useDate';

import { CardProps } from '../../types';

import './Card.scss';

const Card = ({ img, desc, slug, title, category, createdAt }: CardProps) => {
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const { formattedDate } = useDate(createdAt);

  const [screenSize, setScreenSize] = useState(window.innerWidth);

  const handleClick = () => {
    if (searchParams.get('category') !== category) {
      setSearchParams({
        ...Object.fromEntries(searchParams.entries()),
        category,
      });
    }
  };

  const parsedDesc = useMemo(
    () => parse(String(excerpts(desc, 60))).toString(),
    [desc]
  );

  const formattedTime = useMemo(
    () => (screenSize <= 480 ? formattedDate : format(createdAt)),
    [createdAt, formattedDate, screenSize]
  );

  useEffect(() => {
    const handleScreen = () => {
      setScreenSize(window.innerWidth);
    };

    window.addEventListener('resize', handleScreen);
    return () => window.removeEventListener('resize', handleScreen);
  }, []);

  return (
    <article
      className='card'
      role='article'
      aria-label={`Post card for ${title}`}
    >
      <figure className='card__wrapper'>
        <div className='card__wrapper--overlay'>&nbsp;</div>
        <Image
          src={img ?? '/dafault-post.jpg'}
          width={300}
          height={250}
          alt={`Thumbnail image ${title}`}
          className='card__wrapper--img'
        />
      </figure>
      <footer className='card__footer'>
        <div className='card__box'>
          <h3 className='card__box--title'>
            <Link to={`/post/${slug}`} aria-label={`Read post: ${title}`}>
              {title}
            </Link>
          </h3>
          <div aria-label='Post summary' className='card__box--desc'>
            {parse(parsedDesc)}
          </div>
        </div>
        <div className='card__container'>
          {pathname === '/posts' ? (
            <button
              onClick={handleClick}
              aria-label={`Filter posts by category: ${category}`}
              className='card__container--btn'
            >
              {category}
            </button>
          ) : (
            <Link
              to={`/posts?category=${category}`}
              aria-label={`View more posts in category: ${category}`}
            >
              <span className='card__container--category'>{category}</span>
            </Link>
          )}
          <time
            dateTime={createdAt}
            aria-label={`Post published on ${formattedDate}`}
            className='card__container--time'
          >
            {formattedTime}
          </time>
        </div>
      </footer>
    </article>
  );
};

export default Card;
