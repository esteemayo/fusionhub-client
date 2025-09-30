import http from './httpService';

const apiEndpoint = '/posts';

const postURI = (link: string) => `${apiEndpoint}/${link}`;

const postUrl = (postId: string) => `${apiEndpoint}/${postId}`;

export const getPosts = (page: number, searchParams: URLSearchParams) => {
  const searchParamsObj = Object.fromEntries([...searchParams]);

  return http.get(apiEndpoint, {
    params: {
      page,
      limit: 10,
      ...searchParamsObj,
    },
  });
};

export const getUserPosts = () => http.get(postURI('my-posts'));

export const getRandomPosts = () => http.get(postURI('random-posts'));

export const getFeaturedPosts = () => http.get(postURI('featured-posts'));

export const getRecentPosts = () => http.get(postURI('recent-posts'));

export const getTopPosts = () => http.get(postURI('top-posts'));

export const getMostReadPosts = () => http.get(postURI('most-read'));

export const getTrendingPosts = () => http.get(postURI('trends'));

export const getRelatedPosts = (tags: Array<string>) =>
  http.get(`${apiEndpoint}/related-posts?tags=${tags}`);

export const getSavedPostsCount = (postId: string) =>
  http.get(`${postUrl(postId)}/saved-count`);

export const getPostsByUser = (userId: string, page: number) =>
  http.get(`${apiEndpoint}/${userId}/user`, {
    params: {
      page,
      limit: 10,
    },
  });

export const getPostsLikedByUser = (userId: string, page: number) =>
  http.get(`${apiEndpoint}/user/${userId}/liked-posts`, {
    params: {
      page,
      limit: 10,
    },
  });

export const getPostsDislikedByUser = (userId: string, page: number) =>
  http.get(`${apiEndpoint}/user/${userId}/disliked-posts`, {
    params: {
      page,
      limit: 10,
    },
  });

export const getLikedPosts = () => http.get(postURI('liked-posts'));

export const getDislikedPosts = () => http.get(postURI('disliked-posts'));

export const getPostComments = (postId: string) =>
  http.get(`${postUrl(postId)}/comments`);

export const getPostCommentReplies = (postId: string, commentId: string) =>
  http.get(`${apiEndpoint}/${postId}/comments/${commentId}/replies`);

export const getPostComentUsers = (postId: string) =>
  http.get(`${apiEndpoint}/comments/${postId}/users`);

export const getCountByCategory = () => http.get(postURI('count-by-category'));

export const getTags = () => http.get(postURI('tags'));

export const getPostById = (postId: string) => http.get(postUrl(postId));

export const getPostBySlug = (slug: string) =>
  http.get(`${apiEndpoint}/${slug}/details`);

export const createPost = <T extends object>(post: T) =>
  http.post(apiEndpoint, post);

export const createCommentOnPost = (content: string, postId: string) =>
  http.post(`${postUrl(postId)}/comments`, { content });

export const createReplyOnComment = (
  content: string,
  postId: string,
  commentId: string
) =>
  http.post(`${apiEndpoint}/${postId}/comments/${commentId}/replies`, {
    content,
    comment: commentId,
  });

export const updatePost = <T extends object, U extends string>(
  post: T,
  postId: U
) => http.patch(postUrl(postId), post);

export const featurePost = (postId: string) =>
  http.patch(`${postUrl(postId)}/feature-post`);

export const likePost = (postId: string) =>
  http.patch(`${postUrl(postId)}/like`);

export const dislikePost = (postId: string) =>
  http.patch(`${postUrl(postId)}/dislike`);

export const deletePost = (postId: string) => http.delete(postUrl(postId));
