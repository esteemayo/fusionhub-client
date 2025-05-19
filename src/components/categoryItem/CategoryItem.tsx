import { useMemo } from 'react';
import { Link } from 'react-router-dom';

import { CategoryItemProps } from '../../types';

import './CategoryItem.scss';

const CategoryItem = ({ category, count }: CategoryItemProps) => {
  const formattedCount = useMemo(() => {
    if (count < 10) {
      const formattedNumber = count.toString().padStart(2, '0');
      return formattedNumber;
    }

    return count;
  }, [count]);

  return (
    <article className='category-item'>
      <span className='category-item__label'>
        <Link
          to={`/posts?category=${category}`}
          className='category-item__label--link'
        >
          {category}
        </Link>
      </span>
      <span className='category-item__total'>({formattedCount})</span>
    </article>
  );
};

export default CategoryItem;
