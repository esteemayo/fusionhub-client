import { toast } from 'react-toastify';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import * as postAPI from '../services/postService';
import { deleteComment, updateComment } from '../services/commentService';

import { CommentImageType, CommentType, IComment } from '../types';

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

const editComment = async (content: string, commentId: string) => {
  const { data } = await updateComment(content, commentId);
  return data;
};

const removeComment = async (commentId: string) => {
  const { data } = await deleteComment(commentId);
  return data;
};

export const useComment: IComment = (postId) => {
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

  const commentMutation = useMutation({
    mutationFn: (comment: string) => createComment(comment, postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
      toast.success('Your comment has been successfully posted!');
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

  const updateCommentMutation = useMutation({
    mutationFn: ({
      content,
      commentId,
    }: {
      content: string;
      commentId: string;
    }) => editComment(content, commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
      toast.success('Your comment has been successfully updated!');
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

  const deleteCommentMutation = useMutation({
    mutationFn: (commentId: string) => removeComment(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
      toast.success('Comment removed!');
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

  return {
    isPending,
    isPendingUser,
    error,
    errorUser,
    data,
    commentUsers,
    commentMutation,
    updateCommentMutation,
    deleteCommentMutation,
  };
};
