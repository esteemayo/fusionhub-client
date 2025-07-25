import Skeleton from 'react-loading-skeleton';

import './TopPostSkeleton.scss';

const TopPostSkeleton = () => {
  return (
    <article className='top-post-skeleton'>
      <div className='top-post-skeleton__container'>
        <Skeleton
          width={20}
          height={35}
          className='top-post-skeleton__container--number'
        />
        <div className='top-post-skeleton__wrapper'>
          <Skeleton
            count={2}
            width={235}
            height={15}
            className='top-post-skeleton__wrapper--title'
          />
          <div className='top-post-skeleton__box'>
            <Skeleton
              width={102.5}
              height={13}
              className='top-post-skeleton__box--category'
            />
            <Skeleton
              width={25}
              height={13}
              className='top-post-skeleton__box--space'
            />
            <Skeleton
              width={102.5}
              height={13}
              className='top-post-skeleton__box--time'
            />
          </div>
        </div>
      </div>
    </article>
  );
};

export default TopPostSkeleton;
