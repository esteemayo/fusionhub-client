import Skeleton from 'react-loading-skeleton';

import './CardSkeleton.scss';

const CardSkeleton = () => {
  return (
    <article
      className='card-skeleton'
      role='status'
      aria-hidden='true'
      aria-label='Loading posts'
    >
      <div className='card-skeleton__cover'>
        <Skeleton
          width={300}
          height={250}
          className='card-skeleton__cover--img'
        />
      </div>
      <div className='card-skeleton__footer'>
        <div className='card-skeleton__box'>
          <Skeleton
            width={'100%'}
            height={20}
            className='card-skeleton__box--title'
          />
          <Skeleton
            width={'100%'}
            height={15}
            className='card-skeleton__box--desc'
          />
          <Skeleton
            width={'85%'}
            height={15}
            className='card-skeleton__box--subdesc'
          />
        </div>
        <div className='card-skeleton__container'>
          <Skeleton
            width={'60%'}
            height={15}
            className='card-skeleton__container--category'
          />
          <Skeleton
            width={'65%'}
            height={15}
            className='card-skeleton__container--time'
          />
        </div>
      </div>
    </article>
  );
};

export default CardSkeleton;
