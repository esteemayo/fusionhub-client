import { useMemo } from 'react';
import { Link } from 'react-router-dom';

import { TopPostProps } from '../../types';

import './TopPost.scss';

const TopPost = ({ slug, title, category, createdAt }: TopPostProps) => {
  const categoryLabel = useMemo(() => {
    return category.join(', ');
  }, [category]);
  return (
    <article className='topPost'>
      <div className='topPost__container'>
        <span className='topPost__container--number'>1</span>
        <div className='topPost__wrapper'>
          <span className='topPost__wrapper--title'>
            <Link to={`/posts/${slug}`}>{title}</Link>
          </span>
          <div className='topPost__wrapper--category'>
            <span>{categoryLabel}</span>
            <span>-</span>
            <span>DEC 18, 2024</span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default TopPost;
