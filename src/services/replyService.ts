import http from './httpService';

const apiEndpoint = '/replies';

const replyUrl = (replyId: string) => `${apiEndpoint}/${replyId}`;

export const getReplies = () => http.get(apiEndpoint);

export const getReply = (replyId: string) => http.get(replyUrl(replyId));

export const createReply = <T extends object>(reply: T) =>
  http.post(apiEndpoint, reply);

export const updateReply = (content: string, replyId: string) =>
  http.patch(replyUrl(replyId), { content });

export const deleteReply = (replyId: string) => http.delete(replyUrl(replyId));
