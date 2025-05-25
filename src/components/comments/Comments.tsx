import { toast } from 'react-toastify';
import { useRef } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import Comment from '../comment/Comment';
import CommentForm from '../commentForm/CommentForm';

import { useAppDispatch } from '../../hooks/hooks';
import { onOpen } from '../../features/commentModal/commentModalSlice';

import * as postAPI from '../../services/postService';
import { CommentImageType, CommentsProps, CommentType } from '../../types';

import './Comments.scss';

const fetchPostComments = async (postId: string) => {
  const { data } = await postAPI.getPostComments(postId);
  return data;
};

const fetchPostComentUsers = async (postId: string) => {
  const { data } = await postAPI.getPostComentUsers(postId);
  return data;
};

const createComment = async (comment: string, postId: string) => {
  const { data } = await postAPI.createCommentOnPost(comment, postId);
  return data;
};

const Comments = ({ postId }: CommentsProps) => {
  const dispatch = useAppDispatch();

  const queryClient = useQueryClient();

  const { isPending, error, data } = useQuery<CommentType[]>({
    queryKey: ['comments', postId],
    queryFn: () => fetchPostComments(postId),
    enabled: !!postId,
  });

  const {
    isPending: isPendingUser,
    error: errorUser,
    data: commentUsers,
  } = useQuery<CommentImageType[]>({
    queryKey: ['commentUsers', postId],
    queryFn: () => fetchPostComentUsers(postId),
    enabled: !!postId,
  });

  const mutation = useMutation({
    mutationFn: (comment: string) => createComment(comment, postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
      toast.success('Comment posted!');
    },
    onError: (error: unknown) => {
      if (
        error instanceof Error &&
        (error as { response?: { data?: string } })?.response?.data
      ) {
        const errorMessage = (
          error as unknown as { response: { data: string } }
        ).response.data;
        toast.error(errorMessage);
      } else {
        toast.error('An error occurred');
      }
    },
  });

  const ref = useRef<HTMLTextAreaElement>(null);

  const handleReply = () => {
    const current = ref.current;

    current?.focus();
  };

  const handleUpdate = () => {
    const current = ref.current;

    current?.focus();
  };

  const handleOpen = () => {
    dispatch(onOpen());
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const target = e.target as HTMLFormElement;

    const form = new FormData(target);

    const content = form.get('content') as string;

    if (content) {
      mutation.mutate(content, {
        onSuccess: () => {
          target.reset();
        },
      });
    }
  };

  return (
    <section className='comments' id='comments'>
      <div className='comments__container'>
        <Comment
          comments={data!}
          commentUsers={commentUsers!}
          isLoading={isPending}
          isLoadingUser={isPendingUser}
          error={error}
          errorUser={errorUser}
          mutation={mutation}
          onAction={handleReply}
          onUpdate={handleUpdate}
          onOpen={handleOpen}
        />
        <CommentForm
          comments={data!}
          isLoading={mutation.isPending}
          onSubmit={handleSubmit}
          ref={ref}
        />
      </div>
    </section>
  );
};

export default Comments;
