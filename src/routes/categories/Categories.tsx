import { useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import {
  FieldValues,
  SubmitHandler,
  useForm,
  UseFormRegister,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import CategoryItems from '../../components/categoryItems/CategoryItems';
import CategoryForm from '../../components/categoryForm/CategoryForm';
import AccountHeading from '../../components/accountHeading/AccountHeading';

import { useCategory } from '../../hooks/useCategory';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

import * as categoryModal from '../../features/categoryModal/categoryModalSlice';
import {
  CategoryFormData,
  categorySchema,
} from '../../validations/categorySchema';

import './Categories.scss';

const Categories = () => {
  const dispatch = useAppDispatch();
  const { user: currentUser } = useAppSelector((state) => state.auth);

  const { isPending, error, data, categoryMutation, updateMutation } =
    useCategory();

  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [category, setCategory] = useState('');
  const [activeCardId, setActiveCardId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
  });

  const onClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setActiveCardId(null);
  };

  const setCustomValue = useCallback(
    (name: keyof CategoryFormData, value: string) => {
      setValue(name, value, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      });
    },
    [setValue]
  );

  const handleClear = useCallback(() => {
    setValue('name', '');

    setCategoryId(null);
    setCategory('');
    setIsEditing(false);
  }, [setValue]);

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

  const onSubmit: SubmitHandler<CategoryFormData> = (data) => {
    if (currentUser && currentUser.role !== 'admin') return;

    if (isEditing && !categoryId) {
      toast.error('Category ID is required for updating.');
      return;
    }

    const name = data.name;

    if (categoryId) {
      updateMutation.mutate({ name, categoryId }, { onSuccess: handleClear });
    } else {
      categoryMutation.mutate(name, {
        onSuccess: () => setValue('name', ''),
      });
    }
  };

  const btnLabel = useMemo(
    () => `${isEditing && categoryId ? 'Update' : 'Add Category'}`,
    [categoryId, isEditing]
  );

  const isLoading = useMemo(
    () => categoryMutation.isPending || updateMutation.isPending,
    [categoryMutation.isPending, updateMutation.isPending]
  );

  const cancelBtnClasses = useMemo(
    () => (isEditing && categoryId ? 'show' : 'hide'),
    [categoryId, isEditing]
  );

  useEffect(() => {
    if (isEditing && categoryId) {
      setCustomValue('name', category);
    }
  }, [category, categoryId, isEditing, setCustomValue]);

  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        handleClear();
      }
    };

    window.addEventListener('keydown', handleEscKey);
    return () => window.removeEventListener('keydown', handleEscKey);
  }, [handleClear]);

  return (
    <div onClick={onClickHandler} className='categories'>
      <div className='categories__container'>
        <AccountHeading
          title='Categories'
          subtitle='Manage and organize your blog categories. Create new categories to group your posts, and easily edit or delete existing ones for better content structure and discoverability.'
          type='profile'
        />
      </div>
      <div className='categories__wrapper'>
        <CategoryForm
          label={btnLabel}
          isLoading={isLoading}
          updateMutation={updateMutation}
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
          activeCardId={activeCardId}
          isEditing={isEditing}
          currentUser={currentUser}
          updateMutation={updateMutation}
          onChangeCardId={setActiveCardId}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default Categories;
