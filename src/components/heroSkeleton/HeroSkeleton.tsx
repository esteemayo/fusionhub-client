import Skeleton from 'react-loading-skeleton';

import './HeroSkeleton.scss';

const HeroSkeleton = () => {
  return (
    <header className='hero-skeleton'>
      <Skeleton
        width={1600}
        height={'40vw'}
        className='hero-skeleton__header'
      />
      <div className='hero-skeleton__container'>
        <div className='hero-skeleton__breadCrumbs'>
          <Skeleton width={50} className='hero-skeleton__breadCrumbs--home' />
          <Skeleton width={50} className='hero-skeleton__breadCrumbs--post' />
        </div>
        <div className='hero-skeleton__heading'>
          <Skeleton width={800} className='hero-skeleton__heading--main' />
          <Skeleton width={500} className='hero-skeleton__heading--sub' />
        </div>
      </div>
    </header>
  );
};

export default HeroSkeleton;
