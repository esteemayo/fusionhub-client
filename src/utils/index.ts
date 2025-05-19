export const authKey = 'access_token';

export const cookieName = 'auth_token';

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
