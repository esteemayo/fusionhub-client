import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

import CommentSkeleton from '../commentSkeleton/CommentSkeleton';
import CommentCard from '../commentCard/CommentCard';
import CommentUserSkeleton from '../commentUserSkeleton/CommentUserSkeleton';

import Image from '../Image';

import * as postAPI from '../../services/postService';
import { CommentProps, CommentType, CommentImageType } from '../../types';

import './Comment.scss';

const fetchPostComments = async (postId: string) => {
  const { data } = await postAPI.getPostComments(postId);
  return data;
};

const fetchPostComentUsers = async (postId: string) => {
  const { data } = await postAPI.getPostComentUsers(postId);
  return data;
};

const Comment = ({ postId, onAction, onUpdate, onOpen }: CommentProps) => {
  const { isPending, error, data } = useQuery({
    queryKey: ['comments'],
    queryFn: () => fetchPostComments(postId),
    enabled: !!postId,
  });

  const {
    isPending: isPendingUser,
    error: errorUser,
    data: commentUsers,
  } = useQuery({
    queryKey: ['commentUsers'],
    queryFn: () => fetchPostComentUsers(postId),
    enabled: !!postId,
  });

  const commentHeading = useMemo(() => {
    return data?.length > 1 ? 'Comments' : 'Comment';
  }, [data]);

  return (
    <div className='comment'>
      <div className='comment__container'>
        <h4 className='comment__heading'>{commentHeading}</h4>
        <figure className='comment__user'>
          {isPendingUser ? (
            Array.from(new Array(3)).map((_, index) => {
              return <CommentUserSkeleton key={index} />;
            })
          ) : errorUser ? (
            <span>Something went wrong! {errorUser?.message}</span>
          ) : (
            commentUsers.map((user: CommentImageType) => {
              const { _id: id, image } = user;
              return (
                <Image
                  key={id}
                  src={image}
                  width={50}
                  height={50}
                  alt='avatar'
                  className='comment__user--img'
                />
              );
            })
          )}
        </figure>
      </div>
      {isPending ? (
        Array.from(new Array(3)).map((_, index) => {
          return <CommentSkeleton key={index} />;
        })
      ) : error ? (
        <div>
          <p>Something went wrong!</p>
          <span>{error.message}</span>
        </div>
      ) : (
        data?.map((comment: CommentType) => {
          return (
            <CommentCard
              key={comment._id}
              comment={comment}
              onReply={onAction}
              onUpdate={onUpdate}
              onOpen={onOpen}
            />
          );
        })
      )}
    </div>
  );
};

export default Comment;
