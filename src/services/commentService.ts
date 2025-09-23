import http from './httpService';

const apiEndpoint = '/comments';

const commentUrl = (commentId: string) => `${apiEndpoint}/${commentId}`;

export const getComments = () => http.get(apiEndpoint);

export const getCommentsByUser = (userId: string, page: number) =>
  http.get(`${apiEndpoint}/${userId}/user`, {
    params: {
      page,
      limit: 10,
    },
  });

export const getComment = (commentId: string) =>
  http.get(commentUrl(commentId));

export const createComment = (content: string) =>
  http.post(apiEndpoint, { content });

export const updateComment = (content: string, commentId: string) =>
  http.patch(commentUrl(commentId), { content });

export const likeComment = (commentId: string) =>
  http.patch(`${commentUrl(commentId)}/like`);

export const dislikeComment = (commentId: string) =>
  http.patch(`${commentUrl(commentId)}/dislike`);

export const deleteComment = (commentId: string) =>
  http.delete(commentUrl(commentId));
