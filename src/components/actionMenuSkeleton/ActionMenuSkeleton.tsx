import Skeleton from 'react-loading-skeleton';

import { useSkeleton } from '../../hooks/useSkeleton';

import './ActionMenuSkeleton.scss';

const ActionMenuSkeleton = () => {
  const { baseColor } = useSkeleton();

  return (
    <div className='action-menu-skeleton'>
      <div className='action-menu-skeleton__icon'>
        <Skeleton width={17.5} height={17.5} baseColor={baseColor} />
      </div>
      <div className='action-menu-skeleton__label'>
        <Skeleton width={85} height={20} baseColor={baseColor} />
      </div>
    </div>
  );
};

export default ActionMenuSkeleton;
