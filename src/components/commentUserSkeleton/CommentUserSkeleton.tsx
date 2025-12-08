import Skeleton from 'react-loading-skeleton';

import './CommentUserSkeleton.scss';

const CommentUserSkeleton = () => {
  return (
    <div
      className='coment-user-skeleton'
      role='presentation'
      aria-hidden='true'
    >
      <Skeleton
        width={40}
        height={40}
        circle
        className='coment-user-skeleton__img'
      />
    </div>
  );
};

export default CommentUserSkeleton;
