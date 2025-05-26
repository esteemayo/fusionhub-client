import http from './httpService';

const apiEndpoint = '/comments';

const commentUrl = (commentId: string) => `${apiEndpoint}/${commentId}`;

export const getComments = () => http.get(apiEndpoint);

export const getComment = (commentId: string) =>
  http.get(commentUrl(commentId));

export const createComment = (content: string) =>
  http.post(apiEndpoint, { content });

export const updateComment = (content: string, commentId: string) =>
  http.patch(commentUrl(commentId), { content });

export const deleteComment = (commentId: string) =>
  http.delete(commentUrl(commentId));
