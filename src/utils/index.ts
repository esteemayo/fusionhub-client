import { useLocation } from 'react-router-dom';

export const authKey = 'access_token';
export const LS_KEY = 'reply-collapse-state';

export const stripHtml = (html: string) => {
  const text = new DOMParser().parseFromString(html, 'text/html');
  return text.body.textContent || '';
};

export const excerpts = (str: string, count: number) => {
  if (typeof str === 'string' && str.length > count) {
    str = str.substring(0, count).concat('...');
  }

  return str;
};

export const getStorage = (key: string) => {
  return JSON.parse(localStorage.getItem(key) as string);
};

export const setStorage = <T extends string, U>(key: T, value: U) => {
  return localStorage.setItem(key, JSON.stringify(value));
};

export const removeStorage = (key: string) => {
  return localStorage.removeItem(key);
};

export const useQueryParams = () => {
  return new URLSearchParams(useLocation().search);
};

export const userAvatarAlt = (username: string, text: string) => {
  return `${username?.concat('’s') ?? text} avatar`;
};

export const imageSrc = (img?: string) => {
  return typeof img === 'string' && img.trim().length > 0
    ? img
    : '/default-post.jpg';
};
