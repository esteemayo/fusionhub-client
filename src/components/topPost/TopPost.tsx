import { useMemo } from 'react';
import { Link } from 'react-router-dom';

import { TopPostProps } from '../../types';
import { formatDate } from '../../utils/formatDate';

import './TopPost.scss';

const TopPost = ({ index, slug, title, category, createdAt }: TopPostProps) => {
  const categoryLabel = useMemo(() => {
    return category.join(', ');
  }, [category]);

  return (
    <article className='topPost'>
      <div className='topPost__container'>
        <span className='topPost__container--number'>{index + 1}</span>
        <div className='topPost__wrapper'>
          <span className='topPost__wrapper--title'>
            <Link to={`/posts/${slug}`}>{title}</Link>
          </span>
          <div className='topPost__wrapper--category'>
            <span>{categoryLabel}</span>
            <span>-</span>
            <time dateTime={createdAt}>{formatDate(createdAt)}</time>
          </div>
        </div>
      </div>
    </article>
  );
};

export default TopPost;
