import Skeleton from 'react-loading-skeleton';

import { useSkeleton } from '../../hooks/useSkeleton';

import './CommentSkeleton.scss';

const CommentSkeleton = () => {
  const { baseColor } = useSkeleton();

  return (
    <article className='comment-skeleton'>
      <div className='comment-skeleton__container'>
        <div className='comment-skeleton__user'>
          <Skeleton
            width={80}
            height={80}
            baseColor={baseColor}
            className='comment-skeleton__user--img'
            circle
          />
        </div>
        <div className='comment-skeleton__details'>
          <div className='comment-skeleton__date-box'>
            <Skeleton
              width={120}
              baseColor={baseColor}
              className='comment-skeleton__date-box--time'
            />
            <Skeleton
              width={60}
              baseColor={baseColor}
              className='comment-skeleton__date-box--reply'
            />
          </div>
          <Skeleton
            width={150}
            baseColor={baseColor}
            className='comment-skeleton__details--username'
          />
          <Skeleton
            count={3}
            width={625}
            height={15}
            baseColor={baseColor}
            className='comment-skeleton__details--desc'
          />
        </div>
      </div>
    </article>
  );
};

export default CommentSkeleton;
