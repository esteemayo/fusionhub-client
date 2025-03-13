import Skeleton from 'react-loading-skeleton';

import { useSkeleton } from '../../hooks/useSkeleton';

import './TagSkeleton.scss';

const TagSkeleton = () => {
  const { baseColor } = useSkeleton();

  return (
    <span className='tag-skeleton'>
      <Skeleton
        width={70}
        height={30}
        baseColor={baseColor}
        className='tag-skeleton__item'
      />
    </span>
  );
};

export default TagSkeleton;
