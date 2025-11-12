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
    <article aria-label={`Related post: ${title}`} className='related-post'>
      <div className='related-post__container'>
        <div aria-hidden='true' className='related-post__container--overlay'>
          &nbsp;
        </div>
        <Image
          src={img ?? '/dafault-post.jpg'}
          width={250}
          height={150}
          alt={`Thumbnail image for ${title}`}
          className='related-post__container--img'
        />
        <div className='related-post__footer'>
          <Link
            to={`/post/${slug}`}
            aria-label={`Read full post: ${title}`}
            className='related-post__footer--link'
          >
            {title}
          </Link>
          <div className='related-post__footer--category'>
            <Link
              to={`/posts?category=${category}`}
              aria-label={`View more posts in category: ${category}`}
            >
              <span>{category}</span>
            </Link>
            <time
              dateTime={createdAt}
              aria-label={`Published ${format(createdAt)}`}
            >
              {format(createdAt)}
            </time>
          </div>
        </div>
      </div>
    </article>
  );
};

export default RelatedPost;
