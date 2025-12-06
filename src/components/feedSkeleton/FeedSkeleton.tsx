import Skeleton from 'react-loading-skeleton';

import './FeedSkeleton.scss';

const FeedSkeleton = () => {
  return (
    <article className='feed-skeleton' role='presentation' aria-hidden='true'>
      <div className='feed-skeleton__wrapper'>
        <Skeleton
          width={65}
          height={65}
          className='feed-skeleton__wrapper--img'
        />
      </div>
      <div className='feed-skeleton__box'>
        <div className='feed-skeleton__title'>
          <Skeleton
            width={180}
            height={15}
            className='feed-skeleton__title--main'
          />
          <Skeleton
            width={150}
            height={15}
            className='feed-skeleton__title--sub'
          />
        </div>
        <div className='feed-skeleton__wrap'>
          <Skeleton
            width={15}
            height={15}
            circle
            className='feed-skeleton__wrap--icon'
          />
          <Skeleton
            width={70}
            height={15}
            className='feed-skeleton__wrap--time'
          />
        </div>
      </div>
    </article>
  );
};

export default FeedSkeleton;
