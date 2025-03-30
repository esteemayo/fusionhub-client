import { format } from 'timeago.js';
import { Link } from 'react-router-dom';

import Image from '../Image';

import { excerpts } from '../../utils';
import { CardProps } from '../../types';

import './Card.scss';

const Card = ({ img, desc, slug, title, category, createdAt }: CardProps) => {
  return (
    <article className='card'>
      <div className='card__wrapper'>
        <div className='card__wrapper--overlay'>&nbsp;</div>
        <Image
          src={img ?? 'https://ik.imagekit.io/devayo/default-post.jpg'}
          alt='post'
          width={300}
          height={250}
          className='card__wrapper--img'
        />
      </div>
      <div className='card__footer'>
        <div className='card__box'>
          <h3 className='card__box--title'>
            <Link to={`/posts/${slug}`}>{title}</Link>
          </h3>
          <p className='card__box--desc'>{excerpts(desc, 60)}</p>
        </div>
        <div className='card__container'>
          <span className='card__container--category'>{category}</span>
          <time dateTime={createdAt} className='card__container--time'>
            {format(createdAt)}
          </time>
        </div>
      </div>
    </article>
  );
};

export default Card;
