import Skeleton from 'react-loading-skeleton';

import './PostListSkeleton.scss';

const PostListSkeleton = () => {
  return (
    <article className='post-list-skeleton'>
      <div className='post-list-skeleton__wrapper'>
        <Skeleton className='post-list-skeleton__wrapper--img' />
      </div>
      <div className='post-list-skeleton__footer'>
        <div className='post-list-skeleton__box'>
          <Skeleton className='post-list-skeleton__box--title' />
          <Skeleton className='post-list-skeleton__box--desc' />
        </div>
        <div className='post-list-skeleton__container'>
          <Skeleton className='post-list-skeleton__container--category' />
          <Skeleton className='post-list-skeleton__container--time' />
        </div>
      </div>
    </article>
  );
};

export default PostListSkeleton;
