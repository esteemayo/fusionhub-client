import http from './httpService';
import {
  AuthCrendentialType,
  RegisterCredentialType,
  ResetPasswordType,
  UpdatePasswordType,
} from '../types';

const apiEndpoint = '/auth';

export const register = (credentials: RegisterCredentialType) =>
  http.post(`${apiEndpoint}/register`, credentials);

export const login = (credentials: AuthCrendentialType) =>
  http.post(`${apiEndpoint}/login`, credentials);

export const googleLogin = (email: { email: string }) =>
  http.post(`${apiEndpoint}/google-login`, email);

export const logout = () => http.post(`${apiEndpoint}/logout`);

export const forgotPassword = (email: { email: string }) =>
  http.post(`${apiEndpoint}/forgot-pasword`, email);

export const resetPassword = ({ credentials, token }: ResetPasswordType) =>
  http.post(`${apiEndpoint}/reset-password/${token}`, credentials);

export const updatePassword = (credentials: UpdatePasswordType) =>
  http.patch(`${apiEndpoint}/update-my-password`, credentials);
