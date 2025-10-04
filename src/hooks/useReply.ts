import { toast } from 'react-toastify';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import * as postAPI from '../services/postService';
import * as replyAPI from '../services/replyService';

import { IReply, ReplyType } from '../types';

const fetchRepliesOnComment = async (commentId: string) => {
  const { data } = await replyAPI.getRepliesOnComment(commentId);
  return data;
};

// const fetchPostCommentReplies = async (postId: string, commentId: string) => {
//   const { data } = await postAPI.getPostCommentReplies(postId, commentId);
//   return data;
// };

const createCommentReply = async (
  content: string,
  postId: string,
  commentId: string
) => {
  const { data } = await postAPI.createReplyOnComment(
    content,
    postId,
    commentId
  );
  return data;
};

const createBuildReplyTree = async <T extends object>(reply: T) => {
  const { data } = await replyAPI.createReply(reply);
  console.log(data);
  return data;
};

const editReply = async (content: string, replyId: string) => {
  const { data } = await replyAPI.updateReply(content, replyId);
  return data;
};

const removeReply = async (replyId: string) => {
  const { data } = await replyAPI.deleteReply(replyId);
  return data;
};

export const useReply: IReply = (postId, commentId) => {
  const queryClient = useQueryClient();

  const { isPending, error, data } = useQuery<ReplyType[] | [] | undefined>({
    queryKey: ['replies', commentId],
    queryFn: () => fetchRepliesOnComment(commentId),
    enabled: !!commentId,
  });

  // const { isPending, error, data } = useQuery<ReplyType[] | [] | undefined>({
  //   queryKey: ['replies', commentId],
  //   queryFn: () => fetchPostCommentReplies(postId, commentId),
  //   enabled: !!commentId,
  // });

  const replyMutation = useMutation({
    mutationFn: (content: string) =>
      createCommentReply(content, postId, commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['replies', commentId] });
      toast.success('Your reply has been successfully posted!');
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

  const replyTreeMutation = useMutation({
    mutationFn: (reply: object) => createBuildReplyTree(reply),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['replies', commentId] });
      toast.success('Your reply has been successfully posted!');
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

  const updateReplyMutation = useMutation({
    mutationFn: ({ content, replyId }: { content: string; replyId: string }) =>
      editReply(content, replyId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['replies', commentId] });
      toast.success('Your reply has been successfully updated!');
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

  const deleteReplyMutation = useMutation({
    mutationFn: (replyId: string) => removeReply(replyId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['replies', commentId] });
      toast.success('Reply successfully deleted!');
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
    error,
    data,
    replyMutation,
    replyTreeMutation,
    updateReplyMutation,
    deleteReplyMutation,
  };
};
