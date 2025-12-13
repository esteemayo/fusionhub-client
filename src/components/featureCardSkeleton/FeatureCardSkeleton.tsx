import Skeleton from 'react-loading-skeleton';

import './FeatureCardSkeleton.scss';

const FeatureCardSkeleton = () => {
  return (
    <article
      className='feature-card-skeleton'
      role='status'
      aria-hidden='true'
      aria-label='Loading featured posts'
    >
      <div className='feature-card-skeleton__container'>
        <div className='feature-card-skeleton__cover'>
          <Skeleton
            width={110}
            height={110}
            className='feature-card-skeleton__cover--img'
          />
        </div>
        <div className='feature-card-skeleton__details'>
          <div className='feature-card-skeleton__box'>
            <div className='feature-card-skeleton__wrapper'>
              <Skeleton
                width={15}
                height={15}
                borderRadius={'0.5rem'}
                className='feature-card-skeleton__wrapper--icon'
              />
              <Skeleton
                width={73}
                height={20}
                className='feature-card-skeleton__wrapper--time'
              />
            </div>
            <div className='feature-card-skeleton__wrapper'>
              <Skeleton
                width={15}
                height={15}
                circle
                className='feature-card-skeleton__wrapper--icon'
              />
              <Skeleton
                width={15}
                height={20}
                className='feature-card-skeleton__wrapper--count'
              />
            </div>
          </div>
          <div className='feature-card-skeleton__detail'>
            <Skeleton
              width={240}
              height={17}
              className='feature-card-skeleton__detail--heading'
            />
            <Skeleton
              width={85}
              height={28.5}
              className='feature-card-skeleton__detail--link'
            />
          </div>
        </div>
      </div>
    </article>
  );
};

export default FeatureCardSkeleton;
