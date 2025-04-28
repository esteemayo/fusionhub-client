import http from './httpService';

const apiEndpoint = '/categories';

const categoryUrl = (categoryId: string) => `${apiEndpoint}/${categoryId}`;

export const getCategories = () => http.get(apiEndpoint);

export const getCategory = (categoryId: string) =>
  http.get(categoryUrl(categoryId));

export const createCategory = (category: string) =>
  http.post(apiEndpoint, category);

export const updateCategory = <T extends string, U extends string>(
  category: T,
  categoryId: U
) => http.patch(categoryUrl(categoryId), category);

export const deleteCategory = (categoryId: string) =>
  http.delete(categoryUrl(categoryId));
