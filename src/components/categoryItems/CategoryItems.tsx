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
  isEditing,
  currentUser,
  updateMutation,
  onUpdate,
  onDelete,
}: CategoryItemsProps) => {
  return (
    <div className='categories-items'>
      <AcccountHeader
        title='Categories'
        subtitle='View, edit, or remove your existing categories. Keeping your categories organized helps readers find content more easily and improves your blog’s structure.'
      />
      <ul className='categories-items__list'>
        {(categories ?? [])?.length < 1 && !isPending ? (
          <div className='categories-items__list--empty'>
            <EmptyMessage
              title='No Categories Found'
              subtitle='It seems you haven’t created any categories yet. Start by adding a new category to organize your blog posts.'
              center
            />
          </div>
        ) : isPending ? (
          <div className='categories-items__list--spinner'>
            <Spinner size={30} />
          </div>
        ) : error ? (
          <div className='categories-items__list--error'>
            <EmptyMessage
              title='Failed to load categories'
              subtitle="We couldn't retrieve your categories at this time. Please check your internet connection or try refreshing the page."
              center
            />
          </div>
        ) : (
          categories?.map((category) => {
            return (
              <CategoryItem
                key={category._id}
                category={category}
                categoryId={categoryId}
                isEditing={isEditing}
                currentUser={currentUser}
                isLoading={updateMutation.isPending}
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
