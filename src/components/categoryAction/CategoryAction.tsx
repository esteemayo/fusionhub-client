import { useCallback, useMemo } from 'react';

import CategoryMenu from '../CategoryMenu';
import HorizontalEllipsisIcon from '../icons/HorizontalEllipsisIcon';

import { CategoryActionProps } from '../../types';

import './CategoryAction.scss';

const CategoryAction = ({
  isOpen,
  isDisabled,
  currentUser,
  onClose,
  onRemove,
  onToggle,
  onUpdate,
  ...rest
}: CategoryActionProps) => {
  const handleKeyDown = useCallback(
    (e?: React.KeyboardEvent<HTMLButtonElement>) => {
      if (!e) return;

      if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        onToggle();
      }

      if (
        (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') &&
        !isOpen
      ) {
        e.preventDefault();
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
        {...rest}
        type='button'
        onClick={onToggle}
        onKeyDown={handleKeyDown}
        disabled={isDisabled}
        className='category-action__btn'
        aria-haspopup='menu'
        aria-expanded={isOpen}
        aria-controls='profile-action-menu'
        aria-label={rest['aria-label'] ?? 'Open profile action menu'}
        aria-disabled={isOpen}
        title={`${isOpen ? 'Close' : 'Open'} category menu`}
      >
        <HorizontalEllipsisIcon />
      </button>

      <CategoryMenu
        isOpen={isOpen}
        onClose={onClose}
        onRemove={onRemove}
        onUpdate={onUpdate}
      />
    </div>
  );
};

export default CategoryAction;
