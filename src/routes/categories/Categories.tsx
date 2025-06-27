import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import {
  FieldValues,
  SubmitHandler,
  useForm,
  UseFormRegister,
} from 'react-hook-form';

import EmptyMessage from '../../components/emptyMessage/EmptyMessage';
import Spinner from '../../components/Spinner';
import AcccountHeader from '../../components/accountHeader/AccountHeader';
import Input from '../../components/input/Input';
import AccountHeading from '../../components/accountHeading/AccountHeading';
import Button from '../../components/button/Button';

import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import * as categoryModal from '../../features/categoryModal/categoryModalSlice';

import * as categoryAPI from '../../services/categoryService';
import { categorySchema } from '../../validations/categorySchema';

import { CategoriesType } from '../../types';

import './Categories.scss';

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

type FormData = z.infer<typeof categorySchema>;

const Categories = () => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const { user: currentUser } = useAppSelector((state) => ({ ...state.auth }));

  const { isPending, error, data } = useQuery<CategoriesType>({
    queryKey: ['categories'],
    queryFn: () => fetchCategories(),
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

  const [isEditing, setIsEditing] = useState(false);
  const [category, setCategory] = useState('');
  const [categoryId, setCategoryId] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(categorySchema),
  });

  const setCustomValue = useCallback(
    (name: keyof FormData, value: string) => {
      setValue(name, value, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      });
    },
    [setValue]
  );

  const handleClear = () => {
    setValue('name', '');

    setCategoryId(null);
    setCategory('');
    setIsEditing(false);
  };

  const handleCancel = () => {
    handleClear();
  };

  const handleUpdate = (
    e: React.MouseEvent<HTMLButtonElement>,
    category: { _id: string; name: string }
  ) => {
    e.stopPropagation();

    setIsEditing(true);
    setCategory(category.name);
    setCategoryId(category._id);
  };

  const handleDelete = (
    e: React.MouseEvent<HTMLButtonElement>,
    categoryId: string
  ) => {
    e.stopPropagation();

    dispatch(categoryModal.onOpen());
    dispatch(categoryModal.updateCategoryId(categoryId));
  };

  const onSubmit: SubmitHandler<FormData> = (data) => {
    if (currentUser && currentUser.role !== 'admin') return;

    if (isEditing && !categoryId) {
      toast.error('Category ID is required for updating.');
      return;
    }

    const name = data.name;

    if (categoryId) {
      updateMutation.mutate(
        { name, categoryId },
        {
          onSuccess: handleClear,
        }
      );
    } else {
      categoryMutation.mutate(name, {
        onSuccess: () => setValue('name', ''),
      });
    }
  };

  const btnLabel = useMemo(() => {
    return `${isEditing && categoryId ? 'Update' : 'Add'} Category`;
  }, [categoryId, isEditing]);

  const isLoading = useMemo(() => {
    return categoryMutation.isPending || updateMutation.isPending;
  }, [categoryMutation.isPending, updateMutation.isPending]);

  const cancelBtnClasses = useMemo(() => {
    return isEditing && categoryId ? 'show' : 'hide';
  }, [categoryId, isEditing]);

  const categoryBtnClasses = useMemo(() => {
    return currentUser && currentUser.role === 'admin'
      ? 'categories__btn show'
      : 'categories__btn hide';
  }, [currentUser]);

  useEffect(() => {
    if (isEditing && categoryId) {
      setCustomValue('name', category);
    }
  }, [category, categoryId, isEditing, setCustomValue]);

  return (
    <div className='categories'>
      <div className='categories__container'>
        <AccountHeading
          title='Categories'
          subtitle='Manage and organize your blog categories. Create new categories to group your posts, and easily edit or delete existing ones for better content structure and discoverability.'
          type='profile'
        />
      </div>
      <div className='categories__wrapper'>
        <div className='categories__form'>
          <AcccountHeader
            title='Create New Category'
            subtitle='Add a new category to organize your blog posts. Enter a unique and descriptive name to help you manage your content more efficiently.'
          />
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              name='name'
              label='Category Name'
              placeholder='Category name'
              register={register as unknown as UseFormRegister<FieldValues>}
              errors={errors}
              disabled={isLoading}
              validate
              autoFocus
            />
            <div className='categories__form--actions'>
              <Button
                type='submit'
                label={btnLabel}
                color='primary'
                isLoading={isLoading}
                disabled={isLoading}
              />
              <Button
                type='button'
                label='Cancel'
                color='dark'
                onClick={handleCancel}
                disabled={updateMutation.isPending}
                className={cancelBtnClasses}
              />
            </div>
          </form>
        </div>
        <div className='categories__box'>
          <AcccountHeader
            title='Categories'
            subtitle='View, edit, or remove your existing categories. Keeping your categories organized helps readers find content more easily and improves your blog’s structure.'
          />
          <ul className='categories__list'>
            {(data ?? [])?.length < 1 && !isPending ? (
              <EmptyMessage
                title='No Categories Found'
                subtitle='It seems you haven’t created any categories yet. Start by adding a new category to organize your blog posts.'
              />
            ) : isPending ? (
              <div className='categories__spinner'>
                <Spinner size={30} />
              </div>
            ) : error ? (
              <EmptyMessage
                title='Failed to load categories'
                subtitle="We couldn't retrieve your categories at this time. Please check your internet connection or try refreshing the page."
              />
            ) : (
              data?.map((category) => {
                const { _id: id, name } = category;
                return (
                  <li key={id} className='categories__item'>
                    <div className='categories__wrap'>
                      <span className='categories__wrap--name'>
                        <Link to={`/posts?category=${name}`}>{name}</Link>
                      </span>
                      <div className={categoryBtnClasses}>
                        <button
                          type='button'
                          onClick={(e) => handleUpdate(e, category)}
                          disabled={
                            (isEditing && categoryId === id) ||
                            updateMutation.isPending
                          }
                          className='categories__btn--edit'
                        >
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth={1.5}
                            stroke='currentColor'
                            className='size-6'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125'
                            />
                          </svg>
                        </button>
                        <button
                          type='button'
                          onClick={(e) => handleDelete(e, id)}
                          disabled={
                            (isEditing && categoryId === id) ||
                            updateMutation.isPending
                          }
                          className='categories__btn--delete'
                        >
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth={1.5}
                            stroke='currentColor'
                            className='size-6'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0'
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Categories;
