import Button from '../button/Button';
import Input from '../input/Input';
import AcccountHeader from '../accountHeader/AccountHeader';

import { CategoryFormProps } from '../../types';

import './CategoryForm.scss';

const CategoryForm = ({
  isLoading,
  updateMutation,
  label,
  cancelBtnClasses,
  register,
  errors,
  onSubmit,
  onCancel,
}: CategoryFormProps) => {
  return (
    <div className='category-form'>
      <AcccountHeader
        title='Create New Category'
        subtitle='Add a new category to organize your blog posts. Enter a unique and descriptive name to help you manage your content more efficiently.'
      />
      <form onSubmit={onSubmit}>
        <Input
          name='name'
          label='Category Name'
          placeholder='Category name'
          register={register}
          errors={errors}
          disabled={isLoading}
          validate
          autoFocus
        />
        <div className='category-form__actions'>
          <Button
            type='button'
            label='Cancel'
            color='dark'
            onClick={onCancel}
            disabled={updateMutation.isPending}
            className={cancelBtnClasses}
          />
          <Button
            type='submit'
            label={label}
            color='primary'
            isLoading={isLoading}
            disabled={isLoading}
          />
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;
