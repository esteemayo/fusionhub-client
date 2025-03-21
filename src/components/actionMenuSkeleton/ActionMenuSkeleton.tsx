import Skeleton from 'react-loading-skeleton';

import './ActionMenuSkeleton.scss';

const ActionMenuSkeleton = () => {
  return (
    <div className='action-menu-skeleton'>
      <Skeleton
        width={17.5}
        height={17.5}
        className='action-menu-skeleton__icon'
      />
      <Skeleton
        width={85}
        height={20}
        className='action-menu-skeleton__label'
      />
    </div>
  );
};

export default ActionMenuSkeleton;
