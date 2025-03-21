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
            width={230}
            height={15}
            className='top-post-skeleton__wrapper--title'
          />
          <div className='top-post-skeleton__box'>
            <Skeleton
              width={100}
              height={12}
              className='top-post-skeleton__box--category'
            />
            <Skeleton
              width={25}
              height={12}
              className='top-post-skeleton__box--space'
            />
            <Skeleton
              width={100}
              height={12}
              className='top-post-skeleton__box--time'
            />
          </div>
        </div>
      </div>
    </article>
  );
};

export default TopPostSkeleton;
