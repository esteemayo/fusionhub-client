import http from './httpService';

const apiEndpoint = '/replies';

const replyUrl = (replyId: string) => `${apiEndpoint}/${replyId}`;

export const getReplies = () => http.get(apiEndpoint);

export const getRepliesByUser = (userId: string, page: number) =>
  http.get(`${apiEndpoint}/user/${userId}/replies`, {
    params: {
      page,
      limit: 10,
    },
  });

export const getReply = (replyId: string) => http.get(replyUrl(replyId));

export const createReply = <T extends object>(reply: T) =>
  http.post(apiEndpoint, reply);

export const updateReply = (content: string, replyId: string) =>
  http.patch(replyUrl(replyId), { content });

export const likeReply = (replyId: string) =>
  http.patch(`${replyUrl(replyId)}/like`);

export const deleteReply = (replyId: string) => http.delete(replyUrl(replyId));
