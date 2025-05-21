import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

import CommentSkeleton from '../commentSkeleton/CommentSkeleton';
import CommentCard from '../commentCard/CommentCard';
import CommentUserSkeleton from '../commentUserSkeleton/CommentUserSkeleton';

import Image from '../Image';

import * as postAPI from '../../services/postService';
import { useAppSelector } from '../../hooks/hooks';
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

const Comment = ({
  postId,
  mutation,
  onAction,
  onUpdate,
  onOpen,
}: CommentProps) => {
  const { user } = useAppSelector((state) => ({ ...state.auth }));

  const { isPending, error, data } = useQuery({
    queryKey: ['comments', postId],
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
        <>
          {mutation.isPending && (
            <CommentCard
              comment={{
                _id: new Date().getTime().toString(),
                content: `${
                  (mutation.variables as unknown as { content: string }).content
                } (Sending...)`,
                post: (mutation.variables as unknown as { postId: string })
                  .postId,
                author: {
                  _id: user?.details._id as string,
                  name: user?.details.name as string,
                  username: user?.details.username as string,
                  image: user?.details.image as string,
                },
                createdAt: new Date().toString(),
                updatedAt: new Date().toString(),
              }}
              onReply={onAction}
              onUpdate={onUpdate}
              onOpen={onOpen}
            />
          )}
          {data?.map((comment: CommentType) => {
            return (
              <CommentCard
                key={comment._id}
                comment={comment}
                onReply={onAction}
                onUpdate={onUpdate}
                onOpen={onOpen}
              />
            );
          })}
        </>
      )}
    </div>
  );
};

export default Comment;
