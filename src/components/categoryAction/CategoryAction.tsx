import { useMemo } from 'react';

import CategoryMenu from '../CategoryMenu';
import HorizontalEllipsisIcon from '../icons/HorizontalEllipsisIcon';

import { CategoryActionProps } from '../../types';

import './CategoryAction.scss';

const CategoryAction = ({
  isOpen,
  isDisabled,
  currentUser,
  onRemove,
  onToggle,
  onUpdate,
}: CategoryActionProps) => {
  const categoryActionClasses = useMemo(() => {
    return currentUser && currentUser.role === 'admin'
      ? 'category-action show'
      : 'category-action hide';
  }, [currentUser]);

  return (
    <div className={categoryActionClasses}>
      <button
        type='button'
        onClick={onToggle}
        disabled={isDisabled}
        className='category-action__btn'
      >
        <HorizontalEllipsisIcon />
      </button>
      <CategoryMenu isOpen={isOpen} onRemove={onRemove} onUpdate={onUpdate} />
    </div>
  );
};

export default CategoryAction;
