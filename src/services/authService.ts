import http from './httpService';
import {
  AuthCrendentialType,
  RegisterUserType,
  ResetPasswordType,
  UpdatePasswordType,
} from '../types';

const apiEndpoint = '/auth';

const authUrl = (url: string) => `${apiEndpoint}/${url}`;

export const register = <T extends RegisterUserType>(user: T) =>
  http.post(authUrl('register'), user);

export const login = <T extends AuthCrendentialType>(credentials: T) =>
  http.post(authUrl('login'), credentials);

export const googleLogin = (email: string) =>
  http.post(authUrl('google-login'), email);

export const logout = () => http.post(authUrl('logout'));

export const forgotPassword = (email: string) =>
  http.post(authUrl('forgot-password'), email);

export const resetPassword = <T extends ResetPasswordType, U extends string>(
  credentials: T,
  token: U
) => http.post(`${apiEndpoint}/reset-password/${token}`, credentials);

export const updatePassword = <T extends UpdatePasswordType>(credentials: T) =>
  http.patch(authUrl('update-my-password'), credentials);
