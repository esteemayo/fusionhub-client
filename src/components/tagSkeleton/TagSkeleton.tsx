import Skeleton from 'react-loading-skeleton';

import './TagSkeleton.scss';

const TagSkeleton = () => {
  return (
    <span className='tag-skeleton'>
      <Skeleton width={70} height={30} className='tag-skeleton__item' />
    </span>
  );
};

export default TagSkeleton;
