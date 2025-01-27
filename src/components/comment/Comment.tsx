import { useMemo } from 'react';

import CommentCard from '../commentCard/CommentCard';

import { comments } from '../../data';

import './Comment.scss';

const Comment = () => {
  const commentHeading = useMemo(() => {
    return comments.length > 1 ? 'Comments' : 'Comment';
  }, []);

  return (
    <div className='comment'>
      <div className='comment__container'>
        <h4 className='comment__heading'>{commentHeading}</h4>
        <figure className='comment__user'>
          <img
            src='/user-1.jpeg'
            width={50}
            height={50}
            alt='avatar'
            className='comment__user--img'
          />
          <img
            src='/user-2.jpeg'
            width={50}
            height={50}
            alt='avatar'
            className='comment__user--img'
          />
          <img
            src='/user-3.jpeg'
            width={50}
            height={50}
            alt='avatar'
            className='comment__user--img'
          />
          <img
            src='/user-4.webp'
            width={50}
            height={50}
            alt='avatar'
            className='comment__user--img'
          />
          <img
            src='/user-5.webp'
            width={50}
            height={50}
            alt='avatar'
            className='comment__user--img'
          />
        </figure>
      </div>
      {comments.map((comment) => {
        return <CommentCard key={comment.id} {...comment} />;
      })}
    </div>
  );
};

export default Comment;
