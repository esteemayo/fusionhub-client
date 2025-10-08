import Skeleton from 'react-loading-skeleton';

import './PostActionSkeleton.scss';

const PostActionSkeleton = () => {
  return (
    <div className='post-action-skeleton'>
      <div className='post-action-skeleton__container'>
        <div className='post-action-skeleton__user'>
          <div className='post-action-skeleton__wrapper'>
            <div className='post-action-skeleton__wrap'>
              <div className='post-action-skeleton__box'>
                <Skeleton
                  width={185}
                  height={185}
                  className='post-action-skeleton__box--icon'
                />
                <Skeleton
                  width={70}
                  className='post-action-skeleton__box--label'
                />
              </div>
              <div className='post-action-skeleton__box'>
                <Skeleton
                  width={185}
                  height={185}
                  className='post-action-skeleton__box--icon'
                />
                <Skeleton
                  width={70}
                  className='post-action-skeleton__box--label'
                />
              </div>
            </div>
            <div className='post-action-skeleton__box'>
              <Skeleton
                width={185}
                height={185}
                className='post-action-skeleton__box--icon'
              />
              <Skeleton
                width={70}
                className='post-action-skeleton__box--label'
              />
            </div>
          </div>
        </div>
        <div className='post-action-skeleton__actions'>
          <div className='post-action-skeleton__actions--likes'>
            <div className='post-action-skeleton__actions--buttons'>
              <div className='post-action-skeleton__btn'>
                <Skeleton
                  width={185}
                  height={185}
                  className='post-action-skeleton__btn--icon'
                />
                <Skeleton className='post-action-skeleton__btn--label' />
              </div>
              <div className='post-action-skeleton__btn'>
                <Skeleton
                  width={185}
                  height={185}
                  className='post-action-skeleton__btn--icon'
                />
              </div>
            </div>
            <div className='post-action-skeleton__btnComment'>
              <Skeleton
                width={185}
                height={185}
                className='post-action-skeleton__btnComment--icon'
              />
              <Skeleton className='post-action-skeleton__btnComment--label' />
            </div>
          </div>
          <div className='post-action-skeleton__actions--bookmarks'>
            <Skeleton
              width={185}
              height={185}
              className='post-action-skeleton__actions--feature'
            />
            <Skeleton
              width={185}
              height={185}
              className='post-action-skeleton__actions--share'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostActionSkeleton;
