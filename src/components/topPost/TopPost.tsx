import { useMemo } from 'react';
import { Link } from 'react-router-dom';

import { TopPostProps } from '../../types';
import { formatDate } from '../../utils/formatDate';

import './TopPost.scss';

const TopPost = ({ index, slug, title, tags, createdAt }: TopPostProps) => {
  const tagLabel = useMemo(() => {
    return tags.slice(0, 2).join(', ');
  }, [tags]);

  return (
    <article className='top-post'>
      <div className='top-post__container'>
        <span className='top-post__container--number'>{index + 1}</span>
        <div className='top-post__wrapper'>
          <span className='top-post__wrapper--title'>
            <Link to={`/posts/${slug}`}>{title}</Link>
          </span>
          <div className='top-post__wrapper--tags'>
            <span>{tagLabel}</span>
            <span>-</span>
            <time dateTime={createdAt}>{formatDate(createdAt)}</time>
          </div>
        </div>
      </div>
    </article>
  );
};

export default TopPost;
