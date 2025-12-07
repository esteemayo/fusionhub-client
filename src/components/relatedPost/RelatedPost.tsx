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
  const readableDate = format(createdAt);

  return (
    <article
      className='related-post'
      role='article'
      aria-label={`Related post: ${title}`}
    >
      <div className='related-post__container'>
        <div className='related-post__container--overlay' aria-hidden='true'>
          &nbsp;
        </div>
        <Image
          src={img ?? '/dafault-post.jpg'}
          width={250}
          height={150}
          alt={title ? `Thumbnail for "${title}"` : 'Post thumbnail'}
          className='related-post__container--img'
        />
        <footer className='related-post__footer'>
          <Link
            to={`/post/${slug}`}
            className='related-post__footer--link'
            aria-label={`Read full post: ${title}`}
          >
            {title}
          </Link>
          <div className='related-post__footer--category'>
            <Link
              to={`/posts?category=${category}`}
              aria-label={`View more posts in ${category}`}
            >
              <span>{category}</span>
            </Link>
            <time
              dateTime={new Date(createdAt).toISOString()}
              aria-label={`Published ${readableDate}`}
            >
              {readableDate}
            </time>
          </div>
        </footer>
      </div>
    </article>
  );
};

export default RelatedPost;
