import Button from '../button/Button';
import Input from '../input/Input';
import AcccountHeader from '../accountHeader/AccountHeader';

import { CategoryFormProps } from '../../types';

import './CategoryForm.scss';

const CategoryForm = ({
  label,
  isLoading,
  updateMutation,
  cancelBtnClasses,
  register,
  errors,
  onSubmit,
  onCancel,
}: CategoryFormProps) => {
  const hasError = Boolean(errors?.name?.message);

  return (
    <div
      className='category-form'
      role='form'
      aria-labelledby='category-form-title'
      aria-describedby='category-form-description'
    >
      <AcccountHeader
        title='Create New Category'
        subtitle='Add a new category to organize your blog posts. Enter a unique and descriptive name to help you manage your content more efficiently.'
        titleId='category-form-title'
        descriptionId='category-form-description'
      />

      {hasError && (
        <span className='sr-only' role='alert' aria-live='assertive'>
          {errors?.name?.message as string}
        </span>
      )}
      <form onSubmit={onSubmit} noValidate>
        <Input
          name='name'
          label='Category Name'
          placeholder='Category name'
          register={register}
          errors={errors}
          disabled={isLoading}
          validate
          autoFocus
          aria-required='true'
          aria-invalid={Boolean(errors.name)}
          aria-describedby={hasError ? 'category-name-error' : undefined}
        />

        {hasError && (
          <p id='category-name-error' className='sr-only' role='alert'>
            {errors?.name?.message as string}
          </p>
        )}

        <div className='category-form__actions'>
          <Button
            type='button'
            label='Cancel'
            variant='dark'
            onClick={onCancel}
            disabled={updateMutation.isPending}
            className={cancelBtnClasses}
            aria-label='Cancel updating category'
          />
          <Button
            type='submit'
            label={label}
            variant='primary'
            isLoading={isLoading}
            disabled={isLoading}
          />
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;
