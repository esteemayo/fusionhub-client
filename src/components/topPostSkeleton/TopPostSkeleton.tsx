import Skeleton from 'react-loading-skeleton';

import { useSkeleton } from '../../hooks/useSkeleton';

import './TopPostSkeleton.scss';

const TopPostSkeleton = () => {
  const { baseColor } = useSkeleton();

  return (
    <article className='top-post-skeleton'>
      <div className='top-post-skeleton__container'>
        <div className='top-post-skeleton__container--number'>
          <Skeleton width={20} height={35} baseColor={baseColor} />
        </div>
        <div className='top-post-skeleton__wrapper'>
          <div className='top-post-skeleton__wrapper--title'>
            <Skeleton count={2} width={230} height={15} baseColor={baseColor} />
          </div>
          <div className='top-post-skeleton__wrapper--category'>
            <Skeleton width={100} height={12} baseColor={baseColor} />
            <div className='top-post-skeleton__wrapper--space'>
              <Skeleton width={25} height={12} baseColor={baseColor} />
            </div>
            <Skeleton width={100} height={12} baseColor={baseColor} />
          </div>
        </div>
      </div>
    </article>
  );
};

export default TopPostSkeleton;
