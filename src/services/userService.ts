import http from './httpService';
import { UpdateUserDataType } from '../types';

const apiEndpoint = '/users';

export const getCurrentUser = () => http.get(`${apiEndpoint}/me`);

export const getSavedPosts = () => http.get(`${apiEndpoint}/saved-posts`);

export const updateCurrentUser = (data: UpdateUserDataType) =>
  http.patch(`${apiEndpoint}/update-me`, data);

export const savePost = (postId: string) =>
  http.patch(`${apiEndpoint}/save-post/${postId}`);

export const deleteCurrentUser = () => http.delete(`${apiEndpoint}/delete-me`);

export const deleteUserImage = () =>
  http.delete(`${apiEndpoint}/delete-avatar`);

export const deleteUserBanner = () =>
  http.delete(`${apiEndpoint}/delete-banner`);
