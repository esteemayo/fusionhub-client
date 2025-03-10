import Skeleton from 'react-loading-skeleton';

import { useSkeleton } from '../../hooks/useSkeleton';

import './FeedSkeleton.scss';

const FeedSkeleton = () => {
  const { baseColor } = useSkeleton();

  return (
    <article className='feed-skeleton'>
      <div className='feed-skeleton__wrapper'>
        <Skeleton width={65} height={65} baseColor={baseColor} />
      </div>
      <div className='feed-skeleton__box'>
        <div className='feed-skeleton__title'>
          <div className='feed-skeleton__title--main'>
            <Skeleton width={180} baseColor={baseColor} />
          </div>
          <div className='feed-skeleton__title--sub'>
            <Skeleton width={150} baseColor={baseColor} />
          </div>
        </div>
        <div className='feed-skeleton__wrap'>
          <div className='feed-skeleton__wrap--icon'>
            <Skeleton width={13} height={13} circle baseColor={baseColor} />
          </div>
          <div className='feed-skeleton__wrap--time'>
            <Skeleton width={70} height={13} baseColor={baseColor} />
          </div>
        </div>
      </div>
    </article>
  );
};

export default FeedSkeleton;
