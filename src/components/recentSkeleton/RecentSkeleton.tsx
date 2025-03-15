import Skeleton from 'react-loading-skeleton';

import './RecentSkeleton.scss';

const RecentSkeleton = () => {
  return (
    <article className='recent-skeleton'>
      <div className='recent-skeleton__wrapper'>
        <Skeleton
          width={300}
          height={250}
          className='recent-skeleton__wrapper--img'
        />
      </div>
      <div className='recent-skeleton__footer'>
        <div className='recent-skeleton__box'>
          <Skeleton height={20} className='recent-skeleton__box--title' />
          <Skeleton height={15} className='recent-skeleton__box--desc' />
          <Skeleton
            width={'85%'}
            height={15}
            className='recent-skeleton__box--subdesc'
          />
        </div>
        <div className='recent-skeleton__container'>
          <Skeleton
            width={'60%'}
            height={15}
            className='recent-skeleton__container--category'
          />
          <Skeleton
            width={'65%'}
            height={15}
            className='recent-skeleton__container--time'
          />
        </div>
      </div>
    </article>
  );
};

export default RecentSkeleton;
