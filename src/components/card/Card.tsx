import { Link } from 'react-router-dom';

import './Card.scss';

const Card = () => {
  return (
    <article className='card'>
      <img
        src='/post-1.jpg'
        alt='post'
        width={300}
        height={300}
        className='card__img'
      />
      <div className='card__footer'>
        <div className='card__footer--container'>
          <h3 className='card__footer--container-title'>
            <Link to={`/posts/slug`}>
              It is a long established fact that a reader and
            </Link>
          </h3>
          <p className='card__footer--container-desc'>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit...
          </p>
        </div>
        <div className='card__footer--wrapper'>
          <span className='card__footer--wrapper-category'>Adventures</span>
          <time dateTime='' className='card__footer--wrapper-time'>
            2 days ago
          </time>
        </div>
      </div>
    </article>
  );
};

export default Card;
