import Skeleton from 'react-loading-skeleton';

import './CategorySkeleton.scss';

const CategorySkeleton = () => {
  return (
    <article className='category-skeleton'>
      <Skeleton width={170} className='category-skeleton__label' />
      <Skeleton width={40} className='category-skeleton__total' />
    </article>
  );
};

export default CategorySkeleton;
