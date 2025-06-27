import http from './httpService';

const apiEndpoint = '/categories';

const categoryUrl = (categoryId: string) => `${apiEndpoint}/${categoryId}`;

export const getCategories = () => http.get(apiEndpoint);

export const getCategory = (categoryId: string) =>
  http.get(categoryUrl(categoryId));

export const createCategory = (name: string) =>
  http.post(apiEndpoint, { name });

export const updateCategory = <T extends string, U extends string>(
  name: T,
  categoryId: U
) => http.patch(categoryUrl(categoryId), { name });

export const deleteCategory = (categoryId: string) =>
  http.delete(categoryUrl(categoryId));
