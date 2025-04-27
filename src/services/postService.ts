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

export const getPost = (slug: string) =>
  http.get(`${apiEndpoint}/${slug}/details`);

export const createPost = <T extends object>(data: T) =>
  http.post(apiEndpoint, data);

export const updatePost = <T extends object>(post: T, postId: string) =>
  http.patch(`${apiEndpoint}/${postId}`, post);
