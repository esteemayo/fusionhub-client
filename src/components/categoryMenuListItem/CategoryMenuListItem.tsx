import { useMemo } from 'react';

import { CategoryMenuListItemProps } from '../../types';

import './CategoryMenuListItem.scss';

const CategoryMenuListItem = ({
  type,
  label,
  disabled,
  children,
  onAction,
}: CategoryMenuListItemProps) => {
  const listItemClasses = useMemo(() => {
    return type === 'delete'
      ? 'category-menu-list-item delete'
      : 'category-menu-list-item';
  }, [type]);

  return (
    <li className={listItemClasses}>
      <button
        type='button'
        onClick={onAction}
        disabled={disabled}
        aria-label={label}
        aria-disabled={disabled}
      >
        {label}
        {children}
      </button>
    </li>
  );
};

export default CategoryMenuListItem;
