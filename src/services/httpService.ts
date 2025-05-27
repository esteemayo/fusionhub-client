import axios from 'axios';
import { toast } from 'react-toastify';

import logger from './logService';

const devEnv = import.meta.env.MODE !== 'production';
const { VITE_DEV_URL_ENDPOINT, VITE_PROD_URL_ENDPOINT } = import.meta.env;

const authFetch = axios.create({
  baseURL: devEnv ? VITE_DEV_URL_ENDPOINT : VITE_PROD_URL_ENDPOINT,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

authFetch.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response &&
    error.response.status < 500;

  if (!expectedError) {
    toast.error('An unexpected error occurred');
    logger.log(error);
  }

  return Promise.reject(error);
});

const http = {
  get: authFetch.get,
  post: authFetch.post,
  patch: authFetch.patch,
  delete: authFetch.delete,
};

export default http;
