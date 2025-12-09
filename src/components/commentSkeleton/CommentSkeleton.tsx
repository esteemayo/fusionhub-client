import Skeleton from 'react-loading-skeleton';

import './CommentSkeleton.scss';

const CommentSkeleton = () => {
  return (
    <article
      className='comment-skeleton'
      role='presentation'
      aria-hidden='true'
    >
      <div className='comment-skeleton__container'>
        <div className='comment-skeleton__user'>
          <Skeleton
            width={80}
            height={80}
            className='comment-skeleton__user--img'
            circle
          />
        </div>
        <div className='comment-skeleton__details'>
          <div className='comment-skeleton__dateBox'>
            <Skeleton width={120} className='comment-skeleton__dateBox--time' />
            <Skeleton width={60} className='comment-skeleton__dateBox--reply' />
          </div>
          <Skeleton
            width={150}
            className='comment-skeleton__details--username'
          />
          <Skeleton
            count={3}
            width={625}
            height={15}
            className='comment-skeleton__details--desc'
          />
        </div>
      </div>
    </article>
  );
};

export default CommentSkeleton;
