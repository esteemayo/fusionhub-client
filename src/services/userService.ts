import http from './httpService';
import { UpdateUserDataType } from '../types';

const apiEndpoint = '/users';

const userURI = (link: string) => `${apiEndpoint}/${link}`;

const userUrl = (userId: string) => `${apiEndpoint}/${userId}`;

export const getUser = (userId: string) => http.get(userUrl(userId));

export const getCurrentUser = () => http.get(userURI('me'));

export const getSavedPosts = () => http.get(userURI('saved-posts'));

export const updateCurrentUser = (data: UpdateUserDataType) =>
  http.patch(userURI('update-me'), data);

export const savePost = (postId: string) =>
  http.patch(`${apiEndpoint}/save-post/${postId}`);

export const deleteCurrentUser = () => http.delete(userURI('delete-me'));

export const deleteUserImage = () => http.delete(userURI('delete-avatar'));

export const deleteUserBanner = () => http.delete(userURI('delete-banner'));
