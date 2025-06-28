import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import {
  FieldValues,
  SubmitHandler,
  useForm,
  UseFormRegister,
} from 'react-hook-form';

import CategoryItems from '../../components/categoryItems/CategoryItems';
import CategoryForm from '../../components/categoryForm/CategoryForm';
import AccountHeading from '../../components/accountHeading/AccountHeading';

import { useCategory } from '../../hooks/useCategory';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

import { categorySchema } from '../../validations/categorySchema';
import * as categoryModal from '../../features/categoryModal/categoryModalSlice';

import './Categories.scss';

type FormData = z.infer<typeof categorySchema>;

const Categories = () => {
  const dispatch = useAppDispatch();
  const { user: currentUser } = useAppSelector((state) => ({ ...state.auth }));

  const { isPending, error, data, categoryMutation, updateMutation } =
    useCategory();

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

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
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
        <CategoryForm
          isLoading={isLoading}
          updateMutation={updateMutation}
          label={btnLabel}
          cancelBtnClasses={cancelBtnClasses}
          register={register as unknown as UseFormRegister<FieldValues>}
          errors={errors}
          onSubmit={handleSubmit(onSubmit)}
          onCancel={handleCancel}
        />
        <CategoryItems
          categories={data}
          isPending={isPending}
          error={error}
          categoryId={categoryId}
          isEditing={isEditing}
          currentUser={currentUser}
          updateMutation={updateMutation}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default Categories;
