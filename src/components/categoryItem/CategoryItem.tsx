import { useMemo } from 'react';

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
    <article className='categoryItem'>
      <span className='categoryItem__label'>{name}</span>
      <span className='categoryItem__total'>({formattedTotal})</span>
    </article>
  );
};

export default CategoryItem;
