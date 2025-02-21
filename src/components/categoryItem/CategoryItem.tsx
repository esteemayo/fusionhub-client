import { useMemo } from 'react';
import { Link } from 'react-router-dom';

import { CategoryItemProps } from '../../types';

import './CategoryItem.scss';

const CategoryItem = ({ name, total }: CategoryItemProps) => {
  const formattedTotal = useMemo(() => {
    if (total < 10) {
      const formattedNumber = total.toString().padStart(2, '0');
      return formattedNumber;
    }

    return total;
  }, [total]);

  return (
    <article className='category-item'>
      <span className='category-item__label'>
        <Link
          to={`/posts?category=${name}`}
          className='category-item__label--link'
        >
          {name}
        </Link>
      </span>
      <span className='category-item__total'>({formattedTotal})</span>
    </article>
  );
};

export default CategoryItem;
