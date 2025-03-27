import { useEffect, useMemo, useState } from 'react';

import CommentSkeleton from '../commentSkeleton/CommentSkeleton';
import CommentCard from '../commentCard/CommentCard';
import CommentUserSkeleton from '../commentUserSkeleton/CommentUserSkeleton';

import Image from '../Image';

import { CommentProps } from '../../types';
import { comments, commentUsers } from '../../data';

import './Comment.scss';

const Comment = ({ onAction, onUpdate, onOpen }: CommentProps) => {
  const [isLoading, setIsLoading] = useState(true);

  const commentHeading = useMemo(() => {
    return comments.length > 1 ? 'Comments' : 'Comment';
  }, []);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 3000);
  }, []);

  return (
    <div className='comment'>
      <div className='comment__container'>
        <h4 className='comment__heading'>{commentHeading}</h4>
        <figure className='comment__user'>
          {isLoading
            ? Array.from(new Array(3)).map((_, index) => {
                return <CommentUserSkeleton key={index} />;
              })
            : commentUsers.map((user) => {
                const { id, img } = user;
                return (
                  <Image
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
      {isLoading
        ? Array.from(new Array(3)).map((_, index) => {
            return <CommentSkeleton key={index} />;
          })
        : comments.map((comment) => {
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
