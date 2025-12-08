import Skeleton from 'react-loading-skeleton';

import './RelatedSkeleton.scss';

const RelatedSkeleton = () => {
  return (
    <article
      className='related-skeleton'
      role='presentation'
      aria-hidden='true'
    >
      <div className='related-skeleton__container'>
        <Skeleton
          width={250}
          height={150}
          className='related-skeleton__container--img'
        />
        <div className='related-skeleton__footer'>
          <Skeleton
            width={220}
            borderRadius={'0.5rem'}
            className='related-skeleton__footer--link'
          />
          <div className='related-skeleton__wrap'>
            <Skeleton
              width={100}
              height={15}
              borderRadius={'0.5rem'}
              className='related-skeleton__wrap--category'
            />
            <Skeleton
              width={120}
              height={15}
              borderRadius={'0.5rem'}
              className='related-skeleton__wrap--time'
            />
          </div>
        </div>
      </div>
    </article>
  );
};

export default RelatedSkeleton;
