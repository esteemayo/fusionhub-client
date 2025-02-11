import { format } from 'timeago.js';
import { Link } from 'react-router-dom';

import { excerpts } from '../../utils';
import { CardProps } from '../../types';

import './Card.scss';

const Card = ({ img, desc, slug, title, category, createdAt }: CardProps) => {
  return (
    <article className='card'>
      <div className='card__wrapper'>
        <div className='card__overlay'>&nbsp;</div>
        {img && (
          <img
            src={img}
            alt='post'
            width={300}
            height={250}
            className='card__img'
          />
        )}
      </div>
      <div className='card__footer'>
        <div className='card__footer--container'>
          <h3 className='card__footer--container-title'>
            <Link to={`/posts/${slug}`}>{title}</Link>
          </h3>
          <p className='card__footer--container-desc'>{excerpts(desc, 60)}</p>
        </div>
        <div className='card__footer--wrapper'>
          <span className='card__footer--wrapper-category'>{category}</span>
          <time dateTime={createdAt} className='card__footer--wrapper-time'>
            {format(createdAt)}
          </time>
        </div>
      </div>
    </article>
  );
};

export default Card;
