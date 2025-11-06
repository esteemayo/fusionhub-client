import { useMemo } from 'react';

import CategoryMenu from '../CategoryMenu';

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
            d='M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z'
          />
        </svg>
      </button>
      <CategoryMenu isOpen={isOpen} onRemove={onRemove} onUpdate={onUpdate} />
    </div>
  );
};

export default CategoryAction;
