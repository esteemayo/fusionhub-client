import Skeleton from 'react-loading-skeleton';

import { useSkeleton } from '../../hooks/useSkeleton';

import './FollowSkeleton.scss';

const FollowSkeleton = () => {
  const { baseColor } = useSkeleton();

  return (
    <div className='follow-skeleton'>
      <Skeleton width={32} height={32} baseColor={baseColor} circle />
    </div>
  );
};

export default FollowSkeleton;
