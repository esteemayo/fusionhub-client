import { useCallback, useMemo } from 'react';

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
  const handleKeyDown = useCallback(
    (e?: React.KeyboardEvent<HTMLButtonElement>) => {
      if (e?.key === 'Escape' && isOpen) {
        e?.preventDefault();
        onToggle();
      }
    },
    [isOpen, onToggle]
  );

  const categoryActionClasses = useMemo(
    () =>
      currentUser && currentUser.role === 'admin'
        ? 'category-action show'
        : 'category-action hide',
    [currentUser]
  );

  return (
    <div className={categoryActionClasses}>
      <button
        type='button'
        onClick={onToggle}
        onKeyDown={handleKeyDown}
        disabled={isDisabled}
        className='category-action__btn'
        aria-haspopup='menu'
        aria-expanded={isOpen}
        aria-controls='profile-action-menu'
        aria-label='Open profile action menu'
        aria-disabled={isOpen}
        title={`${isOpen ? 'Close' : 'Open'} category menu`}
      >
        <HorizontalEllipsisIcon />
      </button>
      <CategoryMenu isOpen={isOpen} onRemove={onRemove} onUpdate={onUpdate} />
    </div>
  );
};

export default CategoryAction;
