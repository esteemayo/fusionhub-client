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

  const handleScreen = () => {
    setScreenSize(window.innerWidth);
  };

  const handleClick = () => {
    if (searchParams.get('category') !== category) {
      setSearchParams({
        ...Object.fromEntries(searchParams.entries()),
        category,
      });
    }
  };

  const parsedDesc = useMemo(() => {
    return parse(String(excerpts(desc, 60))).toString();
  }, [desc]);

  const formattedTime = useMemo(() => {
    return screenSize <= 480 ? formattedDate : format(createdAt);
  }, [createdAt, formattedDate, screenSize]);

  useEffect(() => {
    window.addEventListener('resize', handleScreen);

    return () => {
      window.removeEventListener('resize', handleScreen);
    };
  }, []);

  return (
    <article className='card'>
      <div className='card__wrapper'>
        <div className='card__wrapper--overlay'>&nbsp;</div>
        <Image
          src={img ?? '/dafault-post.jpg'}
          alt='image'
          width={300}
          height={250}
          className='card__wrapper--img'
        />
      </div>
      <div className='card__footer'>
        <div className='card__box'>
          <h3 className='card__box--title'>
            <Link to={`/post/${slug}`}>{title}</Link>
          </h3>
          <div className='card__box--desc'>{parse(parsedDesc)}</div>
        </div>
        <div className='card__container'>
          {pathname === '/posts' ? (
            <span className='card__container--category' onClick={handleClick}>
              {category}
            </span>
          ) : (
            <Link to={`/posts?category=${category}`}>
              <span className='card__container--category'>{category}</span>
            </Link>
          )}
          <time dateTime={createdAt} className='card__container--time'>
            {formattedTime}
          </time>
        </div>
      </div>
    </article>
  );
};

export default Card;
