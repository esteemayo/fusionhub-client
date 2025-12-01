import CategoryItem from '../categoryItem/CategoryItem';
import EmptyMessage from '../emptyMessage/EmptyMessage';
import AcccountHeader from '../accountHeader/AccountHeader';

import Spinner from '../Spinner';

import { CategoryItemsProps } from '../../types';

import './CategoryItems.scss';

const CategoryItems = ({
  categories,
  isPending,
  error,
  categoryId,
  activeCardId,
  isEditing,
  currentUser,
  updateMutation,
  onUpdate,
  onChangeCardId,
  onDelete,
}: CategoryItemsProps) => {
  const noCategories = (categories ?? []).length < 1;

  return (
    <div
      className='categories-items'
      aria-labelledby='categories-heading'
      role='region'
      aria-describedby='categories-description'
    >
      <AcccountHeader
        title='Categories'
        subtitle='View, edit, or remove your existing categories. Keeping your categories organized helps readers find content more easily and improves your blog’s structure.'
        titleId='categories-heading'
        descriptionId='categories-description'
      />

      <header className='sr-only'>
        <h2 id='categories-heading'>Categories</h2>
        <p id='categories-description'>
          Manage your blog categories by editing, deleting, or browsing them.
        </p>
      </header>

      <ul
        className='categories-items__list'
        role='list'
        aria-live='polite'
        aria-busy={isPending}
      >
        {isPending ? (
          <li
            className='categories-items__list--spinner'
            role='status'
            aria-live='assertive'
            aria-label='Loading categories'
          >
            <Spinner size={30} />
          </li>
        ) : error ? (
          <li
            className='categories-items__list--error'
            role='alert'
            aria-label='Failed to load categories'
          >
            <EmptyMessage
              title='Failed to load categories'
              subtitle="We couldn't retrieve your categories at this time. Please check your internet connection or try refreshing the page."
              center
            />
          </li>
        ) : noCategories ? (
          <li
            className='categories-items__list--empty'
            role='status'
            aria-label='No categories found'
          >
            <EmptyMessage
              title='No Categories Found'
              subtitle='It seems you haven’t created any categories yet. Start by adding a new category to organize your blog posts.'
              center
            />
          </li>
        ) : (
          categories?.map((category) => {
            return (
              <CategoryItem
                key={category._id}
                category={category}
                categoryId={categoryId}
                activeCardId={activeCardId}
                isEditing={isEditing}
                currentUser={currentUser}
                isLoading={updateMutation.isPending}
                onChangeCardId={onChangeCardId}
                onEdit={onUpdate}
                onRemove={onDelete}
              />
            );
          })
        )}
      </ul>
    </div>
  );
};

export default CategoryItems;
