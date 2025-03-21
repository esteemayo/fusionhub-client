import Skeleton from 'react-loading-skeleton';

import './FollowSkeleton.scss';

const FollowSkeleton = () => {
  return (
    <div className='follow-skeleton'>
      <Skeleton
        width={32}
        height={32}
        circle
        className='follow-skeleton__container'
      />
    </div>
  );
};

export default FollowSkeleton;
