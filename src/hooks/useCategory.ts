import { toast } from 'react-toastify';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { CategoriesType, ICategory } from '../types';
import * as categoryAPI from '../services/categoryService';

const fetchCategories = async () => {
  const { data } = await categoryAPI.getCategories();
  return data;
};

const createNewCategory = async (name: string) => {
  const { data } = await categoryAPI.createCategory(name);
  return data;
};

const editCategory = async <T extends string, U extends string>(
  name: T,
  categoryId: U
) => {
  const { data } = await categoryAPI.updateCategory(name, categoryId);
  return data;
};

const removeCategory = async (categoryId: string) => {
  const { data } = await categoryAPI.deleteCategory(categoryId);
  return data;
};

export const useCategory: ICategory = () => {
  const queryClient = useQueryClient();

  const { isPending, error, data } = useQuery<CategoriesType>({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  const categoryMutation = useMutation({
    mutationFn: (name: string) => createNewCategory(name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success(
        'New category added! Your category has been created successfully.'
      );
    },
    onError: (error: unknown) => {
      if (
        error instanceof Error &&
        (error as { response?: { data?: string } })?.response?.data
      ) {
        const errorMessage = (
          error as unknown as { response: { data: string } }
        ).response.data;
        toast.error(errorMessage);
      } else {
        toast.error('An error occurred');
      }
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ name, categoryId }: { name: string; categoryId: string }) =>
      editCategory(name, categoryId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success(
        'Category updated! Your changes have been saved successfully.'
      );
    },
    onError: (error: unknown) => {
      if (
        error instanceof Error &&
        (error as { response?: { data?: string } })?.response?.data
      ) {
        const errorMessage = (
          error as unknown as { response: { data: string } }
        ).response.data;
        toast.error(errorMessage);
      } else {
        toast.error('An error occurred');
      }
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (categoryId: string) => removeCategory(categoryId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success('Category has been successfully deleted.');
    },
    onError: (error: unknown) => {
      if (
        error instanceof Error &&
        (error as { response?: { data?: string } })?.response?.data
      ) {
        const errorMessage = (
          error as unknown as { response: { data: string } }
        ).response.data;
        toast.error(errorMessage);
      } else {
        toast.error('An error occurred');
      }
    },
  });

  return {
    isPending,
    error,
    data,
    categoryMutation,
    updateMutation,
    deleteMutation,
  };
};
