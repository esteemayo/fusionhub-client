import Skeleton from 'react-loading-skeleton';

import './CategoryListSkeleton.scss';

const CategorySkeleton = () => {
  return (
    <article className='category-list-skeleton'>
      <Skeleton width={170} height={15} className='category-skeleton__label' />
      <Skeleton width={40} height={15} className='category-skeleton__total' />
    </article>
  );
};

export default CategorySkeleton;
