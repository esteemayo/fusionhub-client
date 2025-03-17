import Skeleton from 'react-loading-skeleton';

import './PostListSkeleton.scss';

const PostListSkeleton = () => {
  return (
    <article className='post-list-skeleton'>
      <div className='post-list-skeleton__wrapper'>
        <Skeleton
          width={'100%'}
          height={'100%'}
          className='post-list-skeleton__wrapper--img'
        />
      </div>
      <div className='post-list-skeleton__footer'>
        <div className='post-list-skeleton__box'>
          <Skeleton
            width={'100%'}
            height={20}
            className='post-list-skeleton__box--title'
          />
          <Skeleton width={'100%'} className='post-list-skeleton__box--desc' />
          <Skeleton
            width={'85%'}
            className='post-list-skeleton__box--subdesc'
          />
        </div>
        <div className='post-list-skeleton__container'>
          <Skeleton
            width={'60%'}
            height={15}
            className='post-list-skeleton__container--category'
          />
          <Skeleton
            width={'65%'}
            height={15}
            className='post-list-skeleton__container--time'
          />
        </div>
      </div>
    </article>
  );
};

export default PostListSkeleton;
