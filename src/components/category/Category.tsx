import { useMemo } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';

import { CategoryProps } from '../../types';

import './Category.scss';

const Category = ({ category, count }: CategoryProps) => {
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleCategory = () => {
    if (searchParams.get('category') !== category) {
      setSearchParams({
        ...Object.fromEntries(searchParams.entries()),
        category,
      });
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
    <article className='category'>
      {pathname === '/posts' ? (
        <span className='category__label' onClick={handleCategory}>
          {category}
        </span>
      ) : (
        <Link to={`/posts?category=${category}`}>
          <span className='category__label'>{category}</span>
        </Link>
      )}
      <span className='category__total'>({formattedCount})</span>
    </article>
  );
};

export default Category;
