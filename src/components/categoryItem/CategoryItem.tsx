import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import { CategoryItemProps } from '../../types';

import './CategoryItem.scss';

const CategoryItem = ({ category, count }: CategoryItemProps) => {
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
    <article className='category-item'>
      <span className='category-item__label' onClick={handleCategory}>
        {category}
      </span>
      <span className='category-item__total'>({formattedCount})</span>
    </article>
  );
};

export default CategoryItem;
