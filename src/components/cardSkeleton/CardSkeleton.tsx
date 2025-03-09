import Skeleton from 'react-loading-skeleton';

import './CardSkeleton.scss';

const CardSkeleton = () => {
  return (
    <article className='card-skeleton'>
      <div className='card-skeleton__cover'>
        <Skeleton width={300} height={250} />
      </div>
      <div className='card-skeleton__footer'>
        <div className='card-skeleton__footer--box'>
          <Skeleton height={20} />
          <Skeleton height={15} count={2} />
        </div>
        <div className='card-skeleton__footer--container'>
          <Skeleton height={15} width={'70%'} />
          <Skeleton height={15} width={'45%'} />
        </div>
      </div>
    </article>
  );
};

export default CardSkeleton;
