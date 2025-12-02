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

  const handleKeyActivate = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleCategory();
    }
  };

  const formattedCount = useMemo(() => {
    if (count < 10) {
      const formattedNumber = count.toString().padStart(2, '0');
      return formattedNumber;
    }

    return count;
  }, [count]);

  return (
    <article className='category-list-item' role='article'>
      {pathname === '/posts' ? (
        <span
          onClick={handleCategory}
          onKeyDown={handleKeyActivate}
          className='category-list-item__label'
          role='button'
          tabIndex={0}
          aria-pressed={searchParams.get('category') === category}
        >
          {category}
        </span>
      ) : (
        <Link
          to={`/posts?category=${category}`}
          onClick={onClose}
          className='category-list-item__label'
          aria-label={`View posts in ${category}`}
        >
          {category}
        </Link>
      )}

      <span
        className='category-list-item__total'
        aria-label={`${formattedCount} posts`}
      >
        ({formattedCount})
      </span>
    </article>
  );
};

export default CategoryListItem;
