import Skeleton from 'react-loading-skeleton';

import './HeaderSkeleton.scss';

const HeaderSkeleton = () => {
  return (
    <header className='header-skeleton'>
      <div className='header-skeleton__container'>
        <div className='header-skeleton__wrapper'>
          <div className='header-skeleton__wrapper--left'>
            <Skeleton
              width={'100%'}
              height={'100%'}
              className='header-skeleton__box'
            />
          </div>
          <div className='header-skeleton__wrapper--right'>
            <Skeleton
              width={'100%'}
              height={'100%'}
              className='header-skeleton__box small'
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderSkeleton;
