import http from './httpService';
import { UpdateUserDataType } from '../types';

const apiEndpoint = '/users';

export const getCurrentUser = () => http.get(`${apiEndpoint}/me`);

export const getSavedPosts = () => http.get(`${apiEndpoint}/saved-posts`);

export const updateCurrentUser = (data: UpdateUserDataType) =>
  http.patch(`${apiEndpoint}/update-me`, data);
