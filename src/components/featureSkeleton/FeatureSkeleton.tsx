import Skeleton from 'react-loading-skeleton';

import './FeatureSkeleton.scss';

const FeatureSkeleton = () => {
  return (
    <article
      className='feature-skeleton'
      role='status'
      aria-hidden='true'
      aria-label='Loading featured post'
    >
      <div className='feature-skeleton__container'>
        <Skeleton
          width={450}
          height={300}
          className='feature-skeleton__container--img'
        />
        <div className='feature-skeleton__wrap'>
          <Skeleton
            width={50}
            height={50}
            className='feature-skeleton__wrap--calendar'
          />
        </div>
      </div>
      <div className='feature-skeleton__footer'>
        <div className='feature-skeleton__wrapper'>
          <div className='feature-skeleton__date'>
            <Skeleton
              width={20}
              height={20}
              borderRadius={'0.5rem'}
              className='feature-skeleton__date--icon'
            />
            <Skeleton
              width={80}
              height={21}
              className='feature-skeleton__date--time'
            />
          </div>
          <div className='feature-skeleton__comments'>
            <Skeleton
              width={20}
              height={20}
              circle
              className='feature-skeleton__comments--icon'
            />
            <Skeleton
              width={16}
              height={21}
              className='feature-skeleton__comments--count'
            />
          </div>
        </div>
        <div className='feature-skeleton__box'>
          <Skeleton
            width={410}
            height={20}
            className='feature-skeleton__box--heading'
          />
          <Skeleton
            width={410}
            height={15}
            className='feature-skeleton__box--desc'
          />
          <Skeleton
            width={410}
            height={15}
            className='feature-skeleton__box--desc '
          />
          <Skeleton
            width={250}
            height={15}
            className='feature-skeleton__box--desc sm'
          />
          <Skeleton
            width={100}
            height={40}
            className='feature-skeleton__box--link'
          />
        </div>
      </div>
    </article>
  );
};

export default FeatureSkeleton;
