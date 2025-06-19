import { format } from 'timeago.js';
import { Link } from 'react-router-dom';

import Image from '../Image';

import { RelatedPostProps } from '../../types';

import './RelatedPost.scss';

const RelatedPost = ({
  img,
  title,
  slug,
  category,
  createdAt,
}: RelatedPostProps) => {
  return (
    <article className='related-post'>
      <div className='related-post__container'>
        <div className='related-post__container--overlay'>&nbsp;</div>
        {img && (
          <Image
            src={img}
            width={250}
            height={150}
            alt='image'
            className='related-post__container--img'
          />
        )}
        <div className='related-post__footer'>
          <Link to={`/posts/${slug}`} className='related-post__footer--link'>
            {title}
          </Link>
          <div className='related-post__footer--category'>
            <Link to={`/posts?category=${category}`}>
              <span>{category}</span>
            </Link>
            <time dateTime={createdAt}>{format(createdAt)}</time>
          </div>
        </div>
      </div>
    </article>
  );
};

export default RelatedPost;
