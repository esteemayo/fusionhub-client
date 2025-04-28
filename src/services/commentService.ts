import http from './httpService';

const apiEndpoint = '/comments';

const commentUrl = (commentId: string) => `${apiEndpoint}/${commentId}`;

export const getComments = () => http.get(apiEndpoint);

export const getComment = (commentId: string) =>
  http.get(commentUrl(commentId));

export const createComment = <T extends object>(comment: T) =>
  http.post(apiEndpoint, comment);

export const updateComment = <T extends object, U extends string>(
  comment: T,
  commentId: U
) => http.patch(commentUrl(commentId), comment);

export const deleteComment = (commentId: string) =>
  http.delete(commentUrl(commentId));
