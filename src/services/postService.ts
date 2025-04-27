import http from './httpService';

const apiEndpoint = '/posts';

export const getPosts = () => http.get(apiEndpoint);

export const getUserPosts = () => http.get(`${apiEndpoint}/my-posts`);

export const getFeaturedPosts = () => http.get(`${apiEndpoint}/featured-posts`);

export const getRandomPosts = http.get(`${apiEndpoint}/random-posts`);

export const getTopPosts = () => http.get(`${apiEndpoint}/top-posts`);

export const getTrendingPosts = () => http.get(`${apiEndpoint}/trends`);

export const getRelatedPosts = () => (tags: string) =>
  http.get(`${apiEndpoint}/related-posts?tags=${tags}`);

export const getLikedPosts = () => http.get(`${apiEndpoint}/liked-posts`);

export const getDislikedPosts = () => http.get(`${apiEndpoint}/disliked-posts`);

export const getPostComentUsers = (postId: string) =>
  http.get(`${apiEndpoint}/comments/users/${postId}`);

export const getCountByCategory = () =>
  http.get(`${apiEndpoint}/count-by-category`);

export const getTags = () => http.get(`${apiEndpoint}/tags`);

export const getPost = (slug: string) =>
  http.get(`${apiEndpoint}/${slug}/details`);

export const createPost = <T extends object>(data: T) =>
  http.post(apiEndpoint, data);

export const updatePost = <T extends object>(post: T, postId: string) =>
  http.patch(`${apiEndpoint}/${postId}`, post);

export const featurePost = (postId: string) =>
  http.patch(`${apiEndpoint}/${postId}/feature-post`);

export const likePost = (postId: string) =>
  http.patch(`${apiEndpoint}/${postId}/like`);

export const dislikePost = (postId: string) =>
  http.patch(`${apiEndpoint}/${postId}/dislike`);

export const deletePost = (postId: string) =>
  http.delete(`${apiEndpoint}/${postId}`);
