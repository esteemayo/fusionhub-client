import Skeleton from 'react-loading-skeleton';

import { useSkeleton } from '../../hooks/useSkeleton';

import './CategorySkeleton.scss';

const CategorySkeleton = () => {
  const { baseColor } = useSkeleton();

  return (
    <article className='category-skeleton'>
      <span className='category-skeleton__label'>
        <Skeleton width={170} baseColor={baseColor} />
      </span>
      <span className='category-skeleton__total'>
        <Skeleton width={40} baseColor={baseColor} />
      </span>
    </article>
  );
};

export default CategorySkeleton;
