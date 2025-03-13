import Skeleton from 'react-loading-skeleton';

import './RelatedTagSkeleton.scss';

const RelatedTagSkeleton = () => {
  return (
    <span className='related-tag-skeleton'>
      <Skeleton width={70} height={30} className='related-tag-skeleton__item' />
    </span>
  );
};

export default RelatedTagSkeleton;
