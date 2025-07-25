import Skeleton from 'react-loading-skeleton';

import './MostReadSkeleton.scss';

const MostReadSkeleton = () => {
  return (
    <article className='most-read-skeleton'>
      <div className='most-read-skeleton__container'>
        <Skeleton
          width={265}
          height={15}
          className='most-read-skeleton__container--title'
        />
        <Skeleton
          width={100}
          height={13}
          className='most-read-skeleton__container--views'
        />
      </div>
    </article>
  );
};

export default MostReadSkeleton;
