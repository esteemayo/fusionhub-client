import { useMemo } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';

import { CategoryListItemProps } from '../../types';

import './CategoryListItem.scss';

const CategoryListItem = ({
  category,
  count,
  onClose,
}: CategoryListItemProps) => {
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleCategory = () => {
    if (searchParams.get('category') !== category) {
      setSearchParams({
        ...Object.fromEntries(searchParams.entries()),
        category,
      });
    }

    onClose?.();
  };

  const formattedCount = useMemo(() => {
    if (count < 10) {
      const formattedNumber = count.toString().padStart(2, '0');
      return formattedNumber;
    }

    return count;
  }, [count]);

  return (
    <article className='category-list-item'>
      {pathname === '/posts' ? (
        <span className='category-list-item__label' onClick={handleCategory}>
          {category}
        </span>
      ) : (
        <Link to={`/posts?category=${category}`} onClick={onClose}>
          <span className='category-list-item__label'>{category}</span>
        </Link>
      )}
      <span className='category-list-item__total'>({formattedCount})</span>
    </article>
  );
};

export default CategoryListItem;
