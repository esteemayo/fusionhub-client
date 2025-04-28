import http from './httpService';

const apiEndpoint = '/replies';

const replyUrl = (replyId: string) => `${apiEndpoint}/${replyId}`;

export const getReplies = () => http.get(apiEndpoint);

export const getReply = (replyId: string) => http.get(replyUrl(replyId));

export const createReply = <T extends object>(reply: T) =>
  http.post(apiEndpoint, reply);

export const updateReply = <T extends object, U extends string>(
  reply: T,
  replyId: U
) => http.patch(replyUrl(replyId), reply);

export const deleteReply = (replyId: string) => http.delete(replyUrl(replyId));
