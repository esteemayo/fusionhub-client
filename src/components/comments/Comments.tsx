import { useRef } from 'react';
import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import Comment from '../comment/Comment';
import CommentForm from '../commentForm/CommentForm';

import { useAppDispatch } from '../../hooks/hooks';
import { onOpen } from '../../features/commentModal/commentModalSlice';

import { CommentsProps } from '../../types';
import { createCommentOnPost } from '../../services/postService';

import './Comments.scss';

const createComment = async (comment: string, postId: string) => {
  const { data } = await createCommentOnPost(comment, postId);
  return data;
};

const Comments = ({ postId }: CommentsProps) => {
  const dispatch = useAppDispatch();

  const queryClient = useQueryClient();

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
          postId={postId}
          mutation={mutation}
          onAction={handleReply}
          onUpdate={handleUpdate}
          onOpen={handleOpen}
        />
        <CommentForm
          ref={ref}
          isLoading={mutation.isPending}
          onSubmit={handleSubmit}
        />
      </div>
    </section>
  );
};

export default Comments;
