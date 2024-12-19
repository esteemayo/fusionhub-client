import { CategoryItemProps } from '../../types';

import './CategoryItem.scss';

const CategoryItem = ({ name, total }: CategoryItemProps) => {
  return (
    <article className='categoryItem'>
      <span className='categoryItem__label'>{name}</span>
      <span className='categoryItem__total'>({total})</span>
    </article>
  );
};

export default CategoryItem;
