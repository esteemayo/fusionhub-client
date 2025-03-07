import { useMemo } from 'react';

import CommentCard from '../commentCard/CommentCard';

import { CommentProps } from '../../types';
import { comments, commentUsers } from '../../data';

import './Comment.scss';

const Comment = ({ onAction, onUpdate, onOpen }: CommentProps) => {
  const commentHeading = useMemo(() => {
    return comments.length > 1 ? 'Comments' : 'Comment';
  }, []);

  return (
    <div className='comment'>
      <div className='comment__container'>
        <h4 className='comment__heading'>{commentHeading}</h4>
        <figure className='comment__user'>
          {commentUsers.map((user) => {
            const { id, img } = user;
            return (
              <img
                key={id}
                src={img}
                width={50}
                height={50}
                alt='avatar'
                className='comment__user--img'
              />
            );
          })}
        </figure>
      </div>
      {comments.map((comment) => {
        return (
          <CommentCard
            key={comment.id}
            {...comment}
            onReply={onAction}
            onUpdate={onUpdate}
            onOpen={onOpen}
          />
        );
      })}
    </div>
  );
};

export default Comment;
